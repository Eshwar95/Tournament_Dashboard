import {React, useEffect, useState} from "react";
import { MatchDetailCard } from "../components/MatchDetailcard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import {BrowserRouter as router} from 'react-router-dom';
import {useParams} from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';
import {Link} from 'react-router-dom';
import {TeamTile} from '../components/TeamTile';

import './HomePage.scss';


export const HomePage = () =>  {

    //creating and setting state for the response we get from the rest api
    const [team, setTeams] = useState([]);


    //useEffect: used to load a sideeffect when Teampage component loads( fetching out live data from the springboot rest api )
    useEffect(
      () => {
        
        const fetchTeams = async () => {
            //awaiting because fetch returns a promise by sending api request to the end point passed
            //we await for response because a promise can either be prnding, fulfilled or rejected
            const response  = await fetch(`http://localhost:8080/team/`);
            const data = await response.json();
            setTeams(data);
        };
        fetchTeams();
    },[]
  );

  return (
    <div className="HomePage">
        <div className="header-section">
        <div className="app-name"><h3>IPL Teams Dashboard</h3>
            <div className="team-grid">
                {team.map(team => <TeamTile teamName= {team.teamName} /> )}
            </div>
        </div>

        </div>    

    </div>
  );
} 
