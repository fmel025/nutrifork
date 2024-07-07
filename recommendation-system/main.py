from fastapi import FastAPI
from fastapi import Body
from prisma import Prisma
from lightfm import LightFM
from lightfm.data import Dataset
from lightfm.evaluation import precision_at_k
from scipy.sparse import coo_matrix
from contextlib import asynccontextmanager
import numpy as np



prisma = Prisma()
model = LightFM(loss='warp')
user_id_mapping = {}
recipe_id_mapping = {}
reverse_user_id_mapping = {}
reverse_recipe_id_mapping = {}
interactions_global = None

# Function to format data for LightFM
def format_data_for_lightfm(data):
    global user_id_mapping, recipe_id_mapping, reverse_user_id_mapping, reverse_recipe_id_mapping

    user_ids = []
    recipe_ids = []
    ratings = []

    for entry in data:
        user_ids.append(dict(entry)['userId'])
        recipe_ids.append(dict(entry)['recipeId'])
        ratings.append(dict(entry)['rating'])

    user_id_mapping = {user_id: index for index, user_id in enumerate(set(user_ids))}
    recipe_id_mapping = {recipe_id: index for index, recipe_id in enumerate(set(recipe_ids))}
    
    reverse_user_id_mapping = {index: user_id for user_id, index in user_id_mapping.items()}
    reverse_recipe_id_mapping = {index: recipe_id for recipe_id, index in recipe_id_mapping.items()}

    user_indices = [user_id_mapping[user_id] for user_id in user_ids]
    recipe_indices = [recipe_id_mapping[recipe_id] for recipe_id in recipe_ids]

    interactions = coo_matrix((ratings, (user_indices, recipe_indices)), 
                              shape=(len(user_id_mapping), len(recipe_id_mapping)))

    global interactions_global
    interactions_global = interactions
    weights = None

    return interactions, weights, user_id_mapping, recipe_id_mapping

@asynccontextmanager
async def main(app: FastAPI):
    await prisma.connect()
    
    data = await prisma.rating.find_many()
    
    interactions, weights, _, _ = format_data_for_lightfm(data)
    model.fit(interactions, sample_weight=weights, epochs=30)
    print(':: Info model trained successfully')

    yield
    await prisma.disconnect()

app = FastAPI(lifespan=main)

@app.post("/rate")
async def rate(recipe_id: str, user_id: str, rating: float):
    await prisma.rating.create(data={"userId": user_id, "recipeId": recipe_id, "rating": rating})
    
    new_data = [{"userId": user_id, "recipeId": recipe_id, "rating": rating}]
    interactions, weights, _, _ = format_data_for_lightfm(new_data)
    model.fit_partial(interactions, sample_weight=weights, epochs=1)
    
    return {"message": "Rating added and model updated"}

@app.put("/rate")
async def update_rating(recipe_id: str, user_id: str, rating: float):
    await prisma.rating.update(where={"userId_recipeId": {"userId": user_id, "recipeId": recipe_id}}, data={"rating": rating})
    
    updated_data = [{"userId": user_id, "recipeId": recipe_id, "rating": rating}]
    interactions, weights, _, _ = format_data_for_lightfm(updated_data)
    model.fit_partial(interactions, sample_weight=weights, epochs=1)
    
    return {"message": "Rating updated and model updated"}

@app.get("/recommend")
async def recommend(user_id: str, num_recommendations: int = 5):
    user_index = user_id_mapping.get(user_id)
    if user_index is None:
        return {"message": "User not found"}

    # Generate recommendations
    n_users, n_items = model.user_embeddings.shape[0], model.item_embeddings.shape[0]
    scores = model.predict(user_index, np.arange(n_items))

    global interactions_global
    # Get the list of items the user has already rated
    user_rated_items = interactions_global.tocsr()[user_index].indices

    # Exclude already rated items
    scores[user_rated_items] = -np.inf

    top_items = np.argsort(-scores)[:num_recommendations]
    recommendations = [reverse_recipe_id_mapping[item] for item in top_items]
    
    return {"recommendations": recommendations}

