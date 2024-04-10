const createRequest = async (options) => {
    const postOptions = {
        method: 'POST',
        body: JSON.stringify(options),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch('https://backend-chat-gov0.onrender.com/new-user', postOptions);

    const result = await response.json();

    return result;
};

export default createRequest;
