import axios from 'axios';

export default axios.create({
    method: 'get',
    baseURL: 'https://api.openweathermap.org/data/2.5/forecast',
    params: {
        appid: 'abfefee8d62ac2088a5c0ba9d34e1b8c'
    }
});
