import axios from 'axios'

export const getAllRecipes = async () => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("No hay token")
            const response = await axios.get(`/recipe`);

            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        }

        const response = await axios.get(`recipe/user`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
};

export const getRecipeById = async (recipeId) => {
    try {
        const token = localStorage.getItem('token');

        if (!token) {
            console.log("No hay token")
            const response = await axios.get(`/recipe/${recipeId}`);

            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        }

        const response = await axios.get(`recipe/user/${recipeId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });


        if (response.status === 200) {
            return response.data;
        } else {
            return [];
        }
    } catch (error) {
        console.error("An error occurred:", error);
        return [];
    }
};

export const updateRating = async (id, rating) => {
    try {
        const token = localStorage.getItem('token');

        const response = await axios.patch(`/rating`, {
            recipeId: id,
            rating: rating,
        },{
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        if (response.status === 200) {
            return response.data;
        }

    } catch (error) {
        console.error("An error ocurred: ", error);
        throw error;
    }
};
