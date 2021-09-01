package io.SportsDashboard.SportsDashboardAPI.Repository;

import io.SportsDashboard.SportsDashboardAPI.model.Team;
import org.springframework.data.repository.CrudRepository;

public interface TeamRepository extends CrudRepository<Team, Long> {

    Team findByTeamName(String teamName);
}
