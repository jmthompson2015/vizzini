package org.vizzini.swingui.game.boardgame.qubic;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.boardgame.AlphaBetaSearch;
import org.vizzini.core.game.boardgame.EnvironmentEvaluator;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.example.boardgame.qubic.QubicActionGenerator;
import org.vizzini.example.boardgame.qubic.QubicEnvironmentEvaluator;
import org.vizzini.example.boardgame.qubic.QubicSearchAgent;
import org.vizzini.example.boardgame.qubic.QubicTeam;
import org.vizzini.example.boardgame.qubic.SimpleAgent;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides a factory to create an agent.
 */
public final class QubicAgentFactory implements AgentFactory
{
    /** Action generator. */
    private final QubicActionGenerator actionGenerator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public QubicAgentFactory(final QubicActionGenerator actionGenerator)
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

        final QubicTeam qTeam = (QubicTeam)team;

        Agent answer = null;

        if (agentType == MouseAgent.class)
        {
            answer = new MouseAgent(name, "description", qTeam);
        }
        else if (agentType == QubicSearchAgent.class)
        {
            final EnvironmentEvaluator environmentEvaluator = new QubicEnvironmentEvaluator();
            final Search search = new AlphaBetaSearch(actionGenerator, environmentEvaluator);
            final int maxPlies = 3;
            answer = new QubicSearchAgent(name, qTeam, search, maxPlies);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(name, qTeam, actionGenerator);
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
        answer.add(QubicSearchAgent.class);
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
        return QubicTeam.X;
    }

    @Override
    public int getSecondSelectedIndex()
    {
        return 1;
    }

    @Override
    public Team getSecondTeam()
    {
        return QubicTeam.O;
    }
}
