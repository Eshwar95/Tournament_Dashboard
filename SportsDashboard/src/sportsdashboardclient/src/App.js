import './App.css';
import { TeamPage } from './pages/TeamPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MatchPage} from './pages/MatchPage';


function App() {
  return (
    <div className="App">
      <h1>IPL Dashboard</h1>
      <Router>
        <Switch>
          //we add match page first because switch picks up the first route and decides based on it. So we add Matchpage first because its end point is bigger and is a super set of Teampage
        <Route path = "/team/:teamName/matches/:year">
            <MatchPage />
          </Route>
          <Route path = "/teams/:teamName">
            <TeamPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
