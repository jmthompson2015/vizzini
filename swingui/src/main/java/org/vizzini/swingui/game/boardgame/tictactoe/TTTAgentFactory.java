package org.vizzini.swingui.game.boardgame.tictactoe;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.tictactoe.EnvironmentStringifier;
import org.vizzini.example.boardgame.tictactoe.LearningAgent;
import org.vizzini.example.boardgame.tictactoe.MediumAgent;
import org.vizzini.example.boardgame.tictactoe.MonteCarloAgent;
import org.vizzini.example.boardgame.tictactoe.SimpleAgent;
import org.vizzini.example.boardgame.tictactoe.TTTActionGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironmentEvaluator;
import org.vizzini.example.boardgame.tictactoe.TTTSearchAgent;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides a factory to create an agent.
 */
public final class TTTAgentFactory implements AgentFactory
{
    /** Action generator. */
    private final TTTActionGenerator actionGenerator;

    /** Environment stringifier. */
    private final EnvironmentStringifier environmentStringifier;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator.
     * @param environmentStringifier Environment stringifier.
     */
    @SuppressWarnings("hiding")
    public TTTAgentFactory(final TTTActionGenerator actionGenerator, final EnvironmentStringifier environmentStringifier)
    {
        this.actionGenerator = actionGenerator;
        this.environmentStringifier = environmentStringifier;
    }

    /**
     * @param agentType Agent type.
     * @param name Agent name.
     * @param team Team.
     * 
     * @return a new agent.
     */
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

        final TTTTeam tTeam = (TTTTeam)team;

        Agent answer = null;

        if (agentType == LearningAgent.class)
        {
            answer = new LearningAgent(agentName, tTeam, actionGenerator, environmentStringifier);
        }
        else if (agentType == MediumAgent.class)
        {
            answer = new MediumAgent(agentName, tTeam, actionGenerator, environmentStringifier);
        }
        else if (agentType == MonteCarloAgent.class)
        {
            final int trialCount = 10000;
            answer = new MonteCarloAgent(agentName, tTeam, actionGenerator, trialCount);
        }
        else if (agentType == MouseAgent.class)
        {
            answer = new MouseAgent(agentName, tTeam);
        }
        else if (agentType == TTTSearchAgent.class)
        {
            final EnvironmentEvaluator environmentEvaluator = new TTTEnvironmentEvaluator();
            final Search search = new AlphaBetaSearch(actionGenerator, environmentEvaluator);
            final int maxPlies = 6;
            answer = new TTTSearchAgent(agentName, tTeam, search, maxPlies);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(agentName, tTeam, actionGenerator);
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
        answer.add(MouseAgent.class);
        answer.add(TTTSearchAgent.class);
        answer.add(MonteCarloAgent.class);
        answer.add(LearningAgent.class);

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
        return TTTTeam.X;
    }

    @Override
    public int getSecondSelectedIndex()
    {
        return 3;
    }

    @Override
    public Team getSecondTeam()
    {
        return TTTTeam.O;
    }
}
