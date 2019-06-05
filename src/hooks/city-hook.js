import {useState} from 'react';
import forecastApi from "../api/forecastApi";
import calculateAvg from "../utils/calculateAvg";
import handleError from "../utils/handleError";

export default () => {
    const storage = window.localStorage;

    const [error, setError] = useState(null);

    //State for loading context
    const [loading, setLoading] = useState(true);

    //Cities state
    const [cities, setCities] = useState([]);

    /**** Cities methods ****/
    const onAddCity = async (city, unit) =>{
        setLoading(true);
        try {
            const {data} = await forecastApi.get('', {params: {q: city, units: unit}});
            const newCity = {  id: data.city.id, name: data.city.name, temperature: calculateAvg(data.list) }
            if(cities.filter(item => newCity.id === item.id).length !== 0 ){
                setError("Miasto znajduje się już na liście!");
            } else {
                setCities([...cities, newCity]);
                storage.setItem("cities", JSON.stringify([...cities, newCity]));
            }
            setLoading(false);
        } catch(error) {
            setError(handleError(error, setLoading));
        }
    }

    const onRemoveCity = (city) => {
        setCities(cities.filter(cityItem => cityItem.id !== city.id));
        storage.setItem("cities", JSON.stringify(cities.filter(cityItem => cityItem.id !== city.id)));
    }

    /**** Return values ****/
    return [loading, setLoading, onAddCity, onRemoveCity, cities, setCities, error, setError];
}
