const checkUnit = (unit, setUnit) => {
    const storage = window.localStorage;
    let unitParam = storage.getItem("unit");
    /**** If unit param is set in localStorage, set it in state, else use default value ****/
    if(unitParam)
        setUnit(unitParam);
    else
        unitParam = unit;

    return unitParam;
}

export default checkUnit;
