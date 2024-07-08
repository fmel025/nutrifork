from fastapi import FastAPI
from fastapi import Body
from prisma import Prisma
from surprise import Dataset, Reader, SVD
from surprise.model_selection import train_test_split
from surprise import accuracy
from contextlib import asynccontextmanager
import pandas as pd
from fastapi_utilities import repeat_at, repeat_every

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

    await update_model()
    yield

    await prisma.disconnect()

app = FastAPI(lifespan=main, description='Sistema de recomendaciones de nutrifork', title='Nutrifork ML API')

# Cronjob to retrain the model
@repeat_every(seconds=60*10)
async def update_model():
    print(":: Updating model")
    data = await prisma.rating.find_many()
    trainset = format_data_for_surprise(data)
    model.fit(trainset)
    print(':: Info model updated successfully')

@app.get("/recommend", tags=['Recomendaciones'], description='Use it to get recommendations', summary='Get recommendations')
async def recommend(user_id: str, num_recommendations: int = 5):
    data = await prisma.rating.find_many()

    formated_data = format_db_data(data)

    df = pd.DataFrame(formated_data)
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
