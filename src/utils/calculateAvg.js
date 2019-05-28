export default (data) =>{
    let avg = 0;
    if(!data)
        throw Error("Data cannot be null");

    if(data.length === 0)
        return avg.toFixed(2);

    data.forEach( item => {
        avg += item.main.temp;
    });
    avg = avg / data.length;
    return avg.toFixed(2);
}
