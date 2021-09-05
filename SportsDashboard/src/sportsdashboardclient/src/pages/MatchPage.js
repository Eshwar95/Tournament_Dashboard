import {React, useEffect, useState} from "react";
import { MatchDetailCard } from "../components/MatchDetailcard";
import { MatchSmallCard } from "../components/MatchSmallCard";
import {BrowserRouter as router} from 'react-router-dom';
import {useParams} from "react-router-dom";


export const MatchPage = () =>  {
    const [matches, setMatches] = useState([]);
    //getting teamName from App.js using the useparams function
    const {teamName, year}= useParams();

    useEffect(
        () => {
          
          const fetchMatches = async () => {
              //awaiting because fetch returns a promise by sending api request to the end point passed
              //we await for response because a promise can either be prnding, fulfilled or rejected
              const response  = await fetch(`http://localhost:8080/team/${teamName}/matches?year=${year}`);
              const data = await response.json();
              setMatches(data);
  
              
              console.log("data", data)
  
          };
          fetchMatches();
      },[]

    );
  return (
    <div className="MatchPage">
      
      <h1>Match Page</h1>
      {
          matches.map(match => <MatchDetailCard teamName = {teamName}  match = {match} /> )
      }
    </div>
  );
} 
