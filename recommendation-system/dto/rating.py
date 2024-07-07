from pydantic import BaseModel

class Rating(BaseModel):
    userId: str
    rating: float
    recipeId: str

