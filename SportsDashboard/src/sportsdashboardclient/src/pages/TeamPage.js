import {React, useEffect, useState} from "react";
import { MatchDetailCard } from "../components/MatchDetailcard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import {BrowserRouter as router} from 'react-router-dom';
import {useParams} from "react-router-dom";
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';


export const TeamPage = () =>  {

    //creating and setting state for the response we get from the rest api
    const [team, setTeam] = useState({matches: []});
    // team= this.setTeam;

    //getting teamName from App.js using the useparams function
    const {teamName}= useParams();

    //useEffect: used to load a sideeffect when Teampage component loads( fetching out live data from the springboot rest api )
    useEffect(
      () => {
        
        const fetchMatches = async () => {
            //awaiting because fetch returns a promise by sending api request to the end point passed
            //we await for response because a promise can either be prnding, fulfilled or rejected
            const response  = await fetch(`http://localhost:8080/team/${teamName}`);
            const data = await response.json();
            setTeam(data);

            
            console.log("data", data)

            console.log("Matches check team2: ",data)

        };
        fetchMatches();
    },[teamName]
  );

  //taking care of an edge case
  if(!team || !team.teamName){
    return <h1>Team not Found!</h1>
  }

  return (
    <div className="TeamPage">
      <div className="team-name-section"><h1 className="team-name">{team.teamName}</h1></div>
      <div className="wins-losses-section"><h3>Wins / Losses</h3>
      <PieChart
  data={[
    { title: 'Losses', value: team.totalMatches - team.totalWins, color: '#ff8080' },
    { title: 'Wins', value: team.totalWins, color: '#99cc00' },
  ]}
/>
      </div>
      <div className="match-detail-section">
          <h1>Latest Matches</h1>
        <MatchDetailCard teamName = {team.teamName} match = {team.matches[0]} />
      </div>

      {team.matches.slice(1).map(match => <MatchSmallCard teamName = {team.teamName}  match = {match} /> )}

      <div className="more-Link">
        <a href="#">More-></a>
      </div>
      

    </div>
  );
} 
