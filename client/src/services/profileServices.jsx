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