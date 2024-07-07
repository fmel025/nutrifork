from fastapi import FastAPI
from fastapi import Body
from prisma import Prisma
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
from contextlib import asynccontextmanager
import pandas as pd

prisma = Prisma()
model = SVD()

# Function to format data for Surprise
def format_data_for_surprise(data):
    new_data = []
    for item in data:
        new_data.append({'userId': item.userId,'recipeId': item.recipeId, 'rating': item.rating})
    df = pd.DataFrame(new_data)
    reader = Reader(rating_scale=(1, 5))
    dataset = Dataset.load_from_df(df[['userId', 'recipeId', 'rating']], reader)
    trainset = dataset.build_full_trainset()
    return trainset

# Function to format data from prisma to dictionaries.
def format_db_data(data): 
    return [{'userId': item.userId,'recipeId': item.recipeId, 'rating': item.rating} for item in data]

# This runs when the app is initialized, so we poblify the model
@asynccontextmanager
async def main(app: FastAPI):
    await prisma.connect()
    
    data = await prisma.rating.find_many()
    
    trainset = format_data_for_surprise(data)
    model.fit(trainset)
    print(':: Info model trained successfully')

    yield

    await prisma.disconnect()

app = FastAPI(lifespan=main)



@app.get("/recommend")
async def recommend(user_id: str, num_recommendations: int = 5):
    data = await prisma.rating.find_many()
    formatted_data = format_db_data(data)
    
    df = pd.DataFrame(formatted_data)
    all_items = df['recipeId'].unique()
    
    # Check if user exists
    user_data = df[df['userId'] == user_id]
    if user_data.empty:
        return {"message": "User not found"}
    
    # Generate recommendations
    user_rated_items = user_data['recipeId'].values
    items_to_predict = [item for item in all_items if item not in user_rated_items]
    
    predictions = [model.predict(user_id, item) for item in items_to_predict]
    predictions.sort(key=lambda x: x.est, reverse=True)
    
    recommendations = [pred.iid for pred in predictions[:num_recommendations]]
    
    return {"recommendations": recommendations}
