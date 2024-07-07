from typing import Union, List, Optional
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from dto.rating import Rating

app = FastAPI(
    title='Recomendation system for Nutrifork', 
    description='This is the recommendation system based on colaborative filtering with ML.'
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
def get_recommendations(userId: str):
    # Implement recommendation logic here
    return ['Recipe 1', 'Recipe 2', 'Recipe 3']