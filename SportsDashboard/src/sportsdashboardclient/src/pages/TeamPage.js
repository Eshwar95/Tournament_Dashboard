import {React, useEffect, useState} from "react";
import { MatchDetailCard } from "../components/MatchDetailcard";
import { MatchSmallCard } from "../components/MatchSmallCard";



export const TeamPage = () =>  {

    //creating and setting state for the response we get from the rest api
    const [team, setTeam] = useState({matches: []});
    // team= this.setTeam;

    //useEffect: used to load a sideeffect when Teampage component loads( fetching out live data from the springboot rest api )
    useEffect(
      () => {
        
        const fetchMatches = async () => {
            //awaiting because fetch returns a promise by sending api request to the end point passed
            //we await for response because a promise can either be prnding, fulfilled or rejected
            const response  = await fetch('http://localhost:8080/team/Delhi%20Capitals');
            const data = await response.json();
            setTeam(data);

            
            console.log("data", data)

        };
        fetchMatches();
    },[]
  );

  return (
    <div className="TeamPage">
      <h1>{team.teamName}</h1>
      <MatchDetailCard match = {team.matches[0]} />

      {team.matches.slice(1).map(match => <MatchSmallCard match = {match} /> )}
      

    </div>
  );
} 
