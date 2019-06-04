import {useState, useEffect} from 'react';
import refreshCitiesTemperatureAndSetState from "../utils/refreshCitiesTemperatureAndSetState";
import forecastApi from "../api/forecastApi";
import calculateAvg from "../utils/calculateAvg";
import handleError from "../utils/handleError";

export default () => {
    const storage = window.localStorage;

    const [error, setError] = useState(null);

    //State for unit context
    const [unit, changeUnit] = useState("metric");

    //State for loading context
    const [loading, setLoading] = useState(true);

    //Cities state
    const [cities, setCities] = useState([]);

    /**** On load ****/
    useEffect(() => {
            /**** Get cities from localStorage, and store them in state ****/
            const citiesFromStorage = JSON.parse(storage.getItem("cities"));
            const unitParam = checkUnit();

            /**** If online refresh temperatures on page load else if offline set cities from localStorage if available ****/
            if(citiesFromStorage && navigator.onLine)
                refreshCitiesTemperatureAndSetState(unitParam, citiesFromStorage, setCities, setError, setLoading);
            else if (citiesFromStorage && !navigator.onLine) {
                setCities(citiesFromStorage);
                setLoading(false);
            }
            else {
                setLoading(false);
            }
        },
        // eslint-disable-next-line
        []);

    /**** Units methods ****/
    const toggleUnit = () => {
        if(navigator.onLine) {
            const unitParam = unit === "metric" ? "imperial" : "metric";
            localStorage.setItem("unit", unitParam);
            changeUnit(unitParam);
            refreshCitiesTemperatureAndSetState(unitParam, cities, setCities, setError, setLoading);
        } else {
            setError("Zmiana jednostki niemożliwa w trybie offline! Spróbuj później")
        }
    }

    const checkUnit = () => {
        let unitParam = storage.getItem("unit");
        /**** If unit param is set in localStorage, set it in state, else use default value ****/
        if(unitParam)
            changeUnit(unitParam);
        else
            unitParam = unit;

        return unitParam;
    }

    /**** Cities methods ****/
    const onAddCity = async city =>{
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
    return [loading, unit, toggleUnit, onAddCity, onRemoveCity, cities, error, setError];
}
