package io.SportsDashboard.SportsDashboardAPI.controller;


import io.SportsDashboard.SportsDashboardAPI.Repository.MatchRepository;
import io.SportsDashboard.SportsDashboardAPI.Repository.TeamRepository;
import io.SportsDashboard.SportsDashboardAPI.model.Team;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TeamController {

    private TeamRepository teamRepository;

    private MatchRepository matchRepository;


    public TeamController(TeamRepository teamRepository, MatchRepository matchRepository) {
        this.teamRepository = teamRepository;
        this.matchRepository = matchRepository;
    }

    @GetMapping("/team/{teamName}")
    public Team getTeam(@PathVariable String teamName){
        Team team =  this.teamRepository.findByTeamName(teamName);
        team.setMatches(matchRepository.findLatestMatchesbyTeam(teamName, 4));

        return team;



    }


}
