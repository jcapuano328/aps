module.exports = (response) => {
    if (response.status != 200 && response.status != 201) {
        throw {status: response.status, message: response.statusText};
    }
    return response.json();
}
