import axios from 'axios'

export const getUser = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/user/profile`, {
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

export const getUserFavorites = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`/user/favorite`, {
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

export const updateUser = async ({ fullName, username, email, password, allergies, preferences }) => {
    const requestBody = {
        fullName,
        username,
        email,
        password,
        allergies,
        preferences
    };

    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`/user`, requestBody, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("An error occurred: ", error);
        throw error;
    }
}

export const updateAvatar = async (file) => {
    const formData = new FormData();
    formData.append('avatar', file);

    try {
        const token = localStorage.getItem('token');
        const response = await axios.patch(`/user/avatar`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 200) {
            return response.data;
        }
    } catch (error) {
        console.error("An error occurred while updating the avatar: ", error);
        throw error;
    }
};

export const updateRecipeFavorite = async (recipeId) => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            throw new Error('No token found');
        }

        const response = await axios.patch(`/user/favorite/${recipeId}`,{}, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return response.data;
    } catch (error) {
        console.error('Error updating favorite status:', error);
        throw error;
    }
};

export const deleteAccount = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`/user`, {
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
        console.error('Error deleting user account: ', error);
    }
}