from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from prisma import Prisma
from contextlib import asynccontextmanager


from dto.rating import Rating

prisma = Prisma()

@asynccontextmanager
async def main(app: FastAPI):    
    await prisma.connect()
    ratings = await prisma.rating.find_many()
    for rating in ratings:
        print(rating.userId)
    yield
    await prisma.disconnect()

app = FastAPI(
    title='Recomendation system for Nutrifork', 
    description='This is the recommendation system based on colaborative filtering with ML.',
    lifespan=main
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post('/rate', response_model=Rating)
def rate_recipe(rating: Rating):
    print(rating.recipeId)
    return rating

@app.get('/recommendations/{userId}', response_model=List[str])
async def get_recommendations(userId: str):
    # Implement recommendation logic here
    return ['Recipe 1', 'Recipe 2', 'Recipe 3']