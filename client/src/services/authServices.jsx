import axios from 'axios'

export const login = async (email, password) => {
    try {
        const response = await axios.post(`/auth/login`, {
            email: email,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.status === 200) {
            const { accessToken } = response.data;
            return accessToken;
        }

    } catch (error) {
        console.error("An error ocurred: ", error);
        throw error;
    }
}