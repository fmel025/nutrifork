import axios from "axios";

export const getAllergies = async () => {
    try {
        const response = await axios.get(`/category/allergies`);

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

export const getFoodOptions = async () => {
    try {
        const response = await axios.get(`/category/categories`);

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

export const getAllCategories = async () => {
    try {
        const response = await axios.get(`/category/all`);

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