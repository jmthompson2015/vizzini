package org.vizzini.swingui.game.boardgame.checkers;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.checkers.CheckersActionGenerator;
import org.vizzini.example.boardgame.checkers.CheckersEnvironmentEvaluator;
import org.vizzini.example.boardgame.checkers.CheckersSearchAgent;
import org.vizzini.example.boardgame.checkers.CheckersTeam;
import org.vizzini.example.boardgame.checkers.SimpleAgent;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides a factory to create an agent.
 */
public final class CheckersAgentFactory implements AgentFactory
{
    /** Action generator. */
    private final CheckersActionGenerator actionGenerator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public CheckersAgentFactory(final CheckersActionGenerator actionGenerator)
    {
        if (actionGenerator == null)
        {
            throw new IllegalArgumentException("actionGenerator is null");
        }

        this.actionGenerator = actionGenerator;
    }

    @Override
    public Agent create(final Class<?> agentType, final String name, final Team team)
    {
        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        String agentName = name;

        if (StringUtils.isEmpty(name))
        {
            agentName = team.getName();
        }

        final CheckersTeam cTeam = (CheckersTeam)team;

        Agent answer = null;

        if (agentType == CheckersSearchAgent.class)
        {
            final CheckersEnvironmentEvaluator environmentEvaluator = new CheckersEnvironmentEvaluator();
            final Search search = new AlphaBetaSearch(actionGenerator, environmentEvaluator);
            final int maxPlies = 4;

            answer = new CheckersSearchAgent(agentName, cTeam, search, maxPlies);
        }
        else if (agentType == MouseAgent.class)
        {
            answer = new MouseAgent(agentName, agentName, cTeam);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(agentName, cTeam, actionGenerator);
        }
        else
        {
            throw new RuntimeException("Unknown agent type: " + agentType);
        }

        return answer;
    }

    @Override
    public Agent create(final Class<?> agentType, final Team team)
    {
        return create(agentType, null, team);
    }

    @Override
    public List<Class<?>> getAgentTypes()
    {
        final List<Class<?>> answer = new ArrayList<Class<?>>();

        answer.add(SimpleAgent.class);
        answer.add(CheckersSearchAgent.class);
        answer.add(MouseAgent.class);

        return answer;
    }

    @Override
    public int getFirstSelectedIndex()
    {
        return 2;
    }

    @Override
    public Team getFirstTeam()
    {
        return CheckersTeam.RED;
    }

    @Override
    public int getSecondSelectedIndex()
    {
        return 1;
    }

    @Override
    public Team getSecondTeam()
    {
        return CheckersTeam.WHITE;
    }
}
