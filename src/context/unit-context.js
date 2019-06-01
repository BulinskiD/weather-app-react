import React from 'react';

const UnitContext = React.createContext({
    unit: 'metric',
    toggleUnit: () => {}
});

export default UnitContext;
