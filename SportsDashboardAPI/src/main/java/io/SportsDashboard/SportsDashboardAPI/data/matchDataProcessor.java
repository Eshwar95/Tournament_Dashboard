package io.SportsDashboard.SportsDashboardAPI.data;

import io.SportsDashboard.SportsDashboardAPI.model.Match;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.batch.item.ItemProcessor;

import java.time.LocalDate;

public class matchDataProcessor implements ItemProcessor<matchInput, Match> {

    private static final Logger log = LoggerFactory.getLogger(matchDataProcessor.class);

    @Override
    public Match process(final matchInput matchInput) throws Exception {
        Match match  = new Match();

        match.setId(Long.parseLong(matchInput.getId()));

        match.setCity(matchInput.getCity());

        match.setDate(LocalDate.parse(matchInput.getDate()));

        match.setPlayerofMatch(matchInput.getPlayer_of_match());

        match.setVenue(matchInput.getVenue());

        String firstInningsTeam, secondInningsTeam;

        if("bat".equals(matchInput.getToss_decision())){
            firstInningsTeam = matchInput.getTeam1();
            secondInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2(): matchInput.getTeam1();
        }
        else{
            secondInningsTeam = matchInput.getTeam1();
            firstInningsTeam = matchInput.getToss_winner().equals(matchInput.getTeam1()) ? matchInput.getTeam2(): matchInput.getTeam1();
        }

        match.setTeam1(firstInningsTeam);
        match.setTeam2(secondInningsTeam);

        match.setTossWinner(matchInput.getToss_winner());

        match.setMatchWinner(matchInput.getWinner());

        match.setTossDecision(matchInput.getToss_decision());

        match.setResultMargin(matchInput.getResult_margin());

        match.setUmpire1(matchInput.getUmpire1());

        match.setUmpire2(matchInput.getUmpire2());

        return match;
    }

}