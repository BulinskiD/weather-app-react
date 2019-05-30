//Refresh cities
import forecastApi from "../api/forecastApi";
import calculateAvg from "./calculateAvg";
import handleError from "./handleError";

export default (units, cities, setCities, setError) => {
    const citiesPromises = cities.map(async ({id}) => {
        try {
            return await forecastApi.get('', {params: {id, units }});
        } catch(error) {
            setError(handleError(error));
        }
    });
    Promise.all(citiesPromises).then(newCities => {
        const newState = newCities.map(cityObj => {
            return {
                id: cityObj.data.city.id,
                name: cityObj.data.city.name,
                temperature: calculateAvg(cityObj.data.list)
            }
        })
        setCities(newState);
    }).catch(error => {
        setError(handleError(error));
    });
}
