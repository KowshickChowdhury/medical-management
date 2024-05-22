const WithDrawApis = {};

WithDrawApis.index = async() => {
    const res = await axios.get("/api/withdrawal")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

WithDrawApis.transac = async() => {
    const res = await axios.get("/api/transactions")
        .then(response => {
            return response.data;
        })
        .catch(error => {
            return error;
        });
    return res;
};

WithDrawApis.save = async (data) => {
    let url = "/api/withdrawal";
    const res = await axios.post(url, data)
        .then(response => {
            return response.data;
        }).catch(error => { 
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                return {
                    errors: error.response.data.errors,
                    message: error.response.data.message
                };
            } else if (error.request) {
                // The request was made but no response was received
                return {
                    message: "No response received from the server."
                };
            } else {
                // Something happened in setting up the request that triggered an Error
                return {
                    message: "An error occurred while processing the request."
                };
            } 
        });
    return res;
}

WithDrawApis.update = async(data) => {
    let url = `/api/category-update`;
    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            return {
                errors: error.response.data.errors,
                message: error.response.data.message
            };
        } else if (error.request) {
            // The request was made but no response was received
            return {
                message: "No response received from the server."
            };
        } else {
            // Something happened in setting up the request that triggered an Error
            return {
                message: "An error occurred while processing the request."
            };
        }
    }
}

WithDrawApis.delete = async (id) => {
    const url = `/api/category/${id}`;
    try {
        const response = await axios.delete(url);
        return response.data;
    } catch (error) {
        console.error(error);
        return [];
    }
};

export default WithDrawApis;