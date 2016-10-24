package org.vizzini.swingui.game.boardgame.chess;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.chess.ChessActionGenerator;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.SimpleAgent;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;
import org.vizzini.swingui.game.boardgame.AgentFactory;

/**
 * Provides a factory to create an agent.
 */
public final class ChessAgentFactory implements AgentFactory
{
    /** Action generator. */
    private final ChessActionGenerator actionGenerator;

    /**
     * Construct this object.
     * 
     * @param actionGenerator Action generator. (required)
     */
    @SuppressWarnings("hiding")
    public ChessAgentFactory(final ChessActionGenerator actionGenerator)
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

        final ChessTeam cTeam = (ChessTeam)team;

        Agent answer = null;

        if (agentType == MouseAgent.class)
        {
            answer = new MouseAgent(name, "description", cTeam);
        }
        else if (agentType == SimpleAgent.class)
        {
            answer = new SimpleAgent(name, cTeam, actionGenerator);
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
        answer.add(MouseAgent.class);

        return answer;
    }

    @Override
    public int getFirstSelectedIndex()
    {
        return 1;
    }

    @Override
    public Team getFirstTeam()
    {
        return ChessTeam.WHITE;
    }

    @Override
    public int getSecondSelectedIndex()
    {
        return 0;
    }

    @Override
    public Team getSecondTeam()
    {
        return ChessTeam.BLACK;
    }
}
