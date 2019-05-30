//Refresh cities
import forecastApi from "../api/forecastApi";
import calculateAvg from "./calculateAvg";

export default (units, cities, setCities) => {
    const citiesPromises = cities.map(async ({id}) => {
        try {
            return await forecastApi.get('', {params: {id, units }});
        } catch(error) {
            /** TODO Handle errors here **/
        }
    });
    Promise.all(citiesPromises).then(newCities => {
        const newState = newCities.map(cityObj => {
            console.log("cityObj", cityObj);
            return {
                id: cityObj.data.city.id,
                name: cityObj.data.city.name,
                temperature: calculateAvg(cityObj.data.list)
            }
        })
        setCities(newState);
    }).catch(error => {/** TODO Handle error here **/});
}
