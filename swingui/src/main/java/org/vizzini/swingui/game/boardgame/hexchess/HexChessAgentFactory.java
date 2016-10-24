package org.vizzini.swingui.game.boardgame.hexchess;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.hexchess.HexChessActionGenerator;
import org.vizzini.example.boardgame.hexchess.HexChessEnvironmentEvaluator;
import org.vizzini.example.boardgame.hexchess.HexChessSearchAgent;
import org.vizzini.example.boardgame.hexchess.HexChessTeam;
import org.vizzini.example.boardgame.hexchess.SimpleAgent;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides a factory to create an agent.
 */
public final class HexChessAgentFactory implements AgentFactory
{
    /** Action generator. */
    private final HexChessActionGenerator actionGenerator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public HexChessAgentFactory(final HexChessActionGenerator actionGenerator)
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

        final HexChessTeam hTeam = (HexChessTeam)team;

        Agent answer = null;

        if (agentType == HexChessSearchAgent.class)
        {
            final HexChessEnvironmentEvaluator environmentEvaluator = new HexChessEnvironmentEvaluator();
            final Search search = new AlphaBetaSearch(actionGenerator, environmentEvaluator);
            final int maxPlies = 4;

            answer = new HexChessSearchAgent(agentName, hTeam, search, maxPlies);
        }
        else if (agentType == MouseAgent.class)
        {
            answer = new MouseAgent(agentName, agentName, hTeam);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(agentName, hTeam, actionGenerator);
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
        answer.add(HexChessSearchAgent.class);
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
        return HexChessTeam.WHITE;
    }

    @Override
    public int getSecondSelectedIndex()
    {
        return 0;
    }

    @Override
    public Team getSecondTeam()
    {
        return HexChessTeam.BLACK;
    }
}
