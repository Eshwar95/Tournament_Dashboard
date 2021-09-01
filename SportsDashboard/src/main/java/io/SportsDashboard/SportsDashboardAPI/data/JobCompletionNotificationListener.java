package io.SportsDashboard.SportsDashboardAPI.data;

//package com.example.batchprocessing;

import io.SportsDashboard.SportsDashboardAPI.model.Team;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.batch.core.BatchStatus;
import org.springframework.batch.core.JobExecution;
import org.springframework.batch.core.listener.JobExecutionListenerSupport;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class JobCompletionNotificationListener extends JobExecutionListenerSupport {

    private static final Logger log = LoggerFactory.getLogger(JobCompletionNotificationListener.class);

    private final EntityManager em;

    @Autowired
    public JobCompletionNotificationListener(EntityManager em) {
        this.em = em;
    }

    @Override
    @Transactional
    public void afterJob(JobExecution jobExecution) {
        if(jobExecution.getStatus() == BatchStatus.COMPLETED) {
            log.info("!!! JOB FINISHED! Time to verify the results");

            //Changes added to populate team table with team stats if and when the Spring batch job completes

            Map<String, Team> teamData = new HashMap<>();
            //jpa- create query to look at each individual team in team1 column and total no of matches played as that team1 .
            //we want it as a object array - object array first element will be team1 name String and second element will be count
            //we take that object array and take it as a result list - which is a list of object arrays at this point
            //we are then streaming that obj array and mapping it to create new Team instance and save as teamName string and count long value
            //then we`re taking that and foreach val in it we`re putting it in to teamData map that we already created
            //So basically in the end it contains: teamName , number of matches played as that team as team1
            em.createQuery("select distinct  m.team1, count(m.team1) from Match m group by m.team1", Object[].class)
                    .getResultList()
                    .stream()
                    .map(e -> new Team((String)e[0], (long) e[1]))
                    .forEach(team -> teamData.put(team.getTeamName(), team));
                    //Doing the same now for team2 we are calculating  the total matches played by a team by adding matches played  by a string team as team1 and as team2
            em.createQuery("select distinct  m.team2, count(m.team2) from Match m group by m.team2", Object[].class)
                            .getResultList()
                            .stream()
                            .forEach( e -> {
                                Team team = teamData.get((String) e[0]);
                                team.setTotalMatches(team.getTotalMatches() + (long) e[1]);
                            });
                    //query to set the total wins for a team
                    // we are going to find this by querying the count of the self team name occurance in team wins column
                    //so query gets -> all the times a teams name shows up in the match winner column and the count of it
            em.createQuery("select m.matchWinner, count(m.matchWinner) from Match  m group by m.matchWinner", Object[].class)
                            .getResultList()
                            .stream()
                            .forEach( e -> {
                                Team team = teamData.get((String) e[0]);
                                if (team != null) team.setTotalWins((long) e[1]);
                            });

            //persisting after setting all the required values from database
            teamData.values().forEach(team -> em.persist(team));

            teamData.values().forEach(team -> System.out.println(team.toString()));




//            jdbcTemplate.query("SELECT team1, team2, date  FROM match",
//                    (rs, row) -> "Team 1"+ rs.getString(1)+ "Team 2" + rs.getString(2)+ "Date: " + rs.getString(3))
//                        .forEach(str -> System.out.println(str));
        }
    }
}
