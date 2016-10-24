package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import java.util.Set;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultContext;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTTeam;

/**
 * Provides a context for the tic-tac-toe problem.
 */
public final class TTTContext implements Context
{
    /** Delegate. */
    private final Context delegate = new DefaultContext();

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param whoseMove Team.
     */
    public TTTContext(final TTTEnvironment environment, final TTTTeam whoseMove)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (whoseMove == null)
        {
            throw new IllegalArgumentException("whoseMove is null");
        }

        putVariable("environment", environment);
        putVariable("whoseMove", whoseMove);
    }

    /**
     * @return environment
     */
    public TTTEnvironment getEnvironment()
    {
        return (TTTEnvironment)getVariable("environment");
    }

    @Override
    public Object getVariable(final String name)
    {
        return delegate.getVariable(name);
    }

    @Override
    public Set<String> getVariableNames()
    {
        return delegate.getVariableNames();
    }

    /**
     * @return whoseMove
     */
    public TTTTeam getWhoseMove()
    {
        return (TTTTeam)getVariable("whoseMove");
    }

    @Override
    public Context putVariable(final String name, final Object value)
    {
        return delegate.putVariable(name, value);
    }
}
