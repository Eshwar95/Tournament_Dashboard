import './App.scss';
import { TeamPage } from './pages/TeamPage';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MatchPage} from './pages/MatchPage';
import {HomePage} from './pages/HomePage';


function App() {
  return (
    <div className="App">
      <h1>Sports Dashboard</h1>
      <Router>
        <Switch>
          //we add match page first because switch picks up the first route and decides based on it. So we add Matchpage first because its end point is bigger and is a super set of Teampage
        <Route path = "/teams/:teamName/matches/:year">
            <MatchPage />
          </Route>
          <Route path = "/teams/:teamName">
            <TeamPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
