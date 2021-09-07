import {React} from "react";
import {Link} from 'react-router-dom';
import './MatchSmallCard.scss';



export const MatchSmallCard = ({match, teamName}) =>  {
  if(!match) return null || "Matches Not Found";

  const otherTeam = match.team1 === teamName  ?  match.team2 : match.team1;
  const isMatchWon = teamName  === match.matchWinner;

  const otherTeamRoute = `/teams/${otherTeam}`;
  return (
    <div className={isMatchWon? 'MatchSmallCard won-card' : 'MatchSmallCard lost-card'}>
      <h3>vs</h3>
      <h1><Link to={otherTeamRoute}>{otherTeam}</Link></h1>
      <h3 className="match-result">{match.matchWinner} won by {match.resultMargin} {match.result}</h3>
    </div>
  );
} 
