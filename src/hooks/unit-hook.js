import {useState} from "react";

export default () => {
    const [unit, setUnit] = useState("metric");

    /**** Units methods ****/
    const toggleUnit = () => {
        const unitParam = unit === "metric" ? "imperial" : "metric";
        localStorage.setItem("unit", unitParam);
        setUnit(unitParam);
    }

    return [unit, toggleUnit, setUnit];
}
