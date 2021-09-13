import {React, ReactDOM } from 'react';
import {Link} from 'react-router-dom';

import './YearSelector.scss';

export const YearSelector = ({teamName}) => {
    let years = [];
    const StartYear = process.env.REACT_APP_START_YEAR;
    const EndYear = process.env.REACT_APP_END_YEAR;

    for ( let i = StartYear; i<= EndYear; i++) {
        years.push(i);
    }

    return (
        <ol className="YearSelector">
            {years.map(year => (
                <li>
                    <Link to = {`/teams/${teamName}/matches/${year}`}>{year}</Link>
                </li>
            
            ))}
        </ol>
        
    )
}