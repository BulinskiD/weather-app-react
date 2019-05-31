export default (error, setLoading) => {
    console.log(error);
    let errorMessage;
    switch(error.response.status) {
        case 404:
            errorMessage = "Nie znaleziono miasta";
            break;
        case 500:
            errorMessage = "Serwer jest chwilowo niedostępny, spróbuj później!"
            break;
        default:
            errorMessage = "Coś poszło nie tak..."
    }
    setLoading(false);
    return errorMessage;
}
