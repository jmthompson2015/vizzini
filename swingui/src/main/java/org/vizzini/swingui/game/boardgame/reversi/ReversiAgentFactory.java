package org.vizzini.swingui.game.boardgame.reversi;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.reversi.MediumAgent;
import org.vizzini.example.boardgame.reversi.ReversiActionGenerator;
import org.vizzini.example.boardgame.reversi.ReversiEnvironmentEvaluator;
import org.vizzini.example.boardgame.reversi.ReversiSearchAgent;
import org.vizzini.example.boardgame.reversi.ReversiTeam;
import org.vizzini.example.boardgame.reversi.SimpleAgent;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides a factory to create a reversi agent.
 */
public class ReversiAgentFactory implements AgentFactory
{
    /** Action generator. */
    private final ReversiActionGenerator actionGenerator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator.
     */
    @SuppressWarnings("hiding")
    public ReversiAgentFactory(final ReversiActionGenerator actionGenerator)
    {
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

        Agent answer = null;

        if (agentType == MediumAgent.class)
        {
            answer = new MediumAgent(agentName, (ReversiTeam)team, actionGenerator);
        }
        else if (agentType == MouseAgent.class)
        {
            answer = new MouseAgent(agentName, agentName, (ReversiTeam)team);
        }
        else if (agentType == ReversiSearchAgent.class)
        {
            final EnvironmentEvaluator environmentEvaluator = new ReversiEnvironmentEvaluator();
            final Search search = new AlphaBetaSearch(actionGenerator, environmentEvaluator);
            final int maxPlies = 7;
            answer = new ReversiSearchAgent(agentName, (ReversiTeam)team, search, maxPlies);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(agentName, (ReversiTeam)team, actionGenerator);
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
        answer.add(MediumAgent.class);
        answer.add(ReversiSearchAgent.class);
        answer.add(MouseAgent.class);

        return answer;
    }

    @Override
    public int getFirstSelectedIndex()
    {
        return 3;
    }

    @Override
    public Team getFirstTeam()
    {
        return ReversiTeam.BLACK;
    }

    @Override
    public int getSecondSelectedIndex()
    {
        return 2;
    }

    @Override
    public Team getSecondTeam()
    {
        return ReversiTeam.WHITE;
    }
}
