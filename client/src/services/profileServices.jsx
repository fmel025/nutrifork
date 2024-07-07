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

export const updateUser = async ({ fullName, username, email, password }) => {
    const requestBody = {
        fullName,
        username,
        email,
        password
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