import axios from 'axios';

export default axios.create({
    method: 'get',
    baseURL: 'api.openweathermap.org/data/2.5/appid=abfefee8d62ac2088a5c0ba9d34e1b8c'
});
