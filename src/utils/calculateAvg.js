export default (data) =>{
    let avg = 0;
    data.forEach( item => {
        avg += item.main.temp;
    });
    avg = avg / data.length;
    return avg.toFixed(2);
}
