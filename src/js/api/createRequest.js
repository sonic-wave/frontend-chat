const createRequest = async (options) => {
    const postOptions = {
        method: 'POST',
        body: JSON.stringify(options),
        headers: {
            'Content-Type': 'application/json',
        },
    }
    const response = await fetch('http://localhost:3000/new-user', postOptions);
        // Преобразуем данные в JSON формат

    const result = await response.json();
    console.log(result);
    return result;
};

export default createRequest;
