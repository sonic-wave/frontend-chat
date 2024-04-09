const createRequest = async (options) => {
    const postOptions = {
        method: 'POST',
        body: JSON.stringify(options),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch('http://localhost:10000/new-user', postOptions);

    const result = await response.json();

    return result;
};

export default createRequest;
