from typing import Union, List, Optional
from pydantic import BaseModel
from fastapi import FastAPI

from dto.rating import Rating

app = FastAPI(title='Recomendation system for Nutrifork',description='This is the recommendation system based on colaborative filtering with ML.')

@app.post('/rate', response_model=Rating)
def rate_recipe(rating: Rating):
    print(rating.recipeId)
    return rating