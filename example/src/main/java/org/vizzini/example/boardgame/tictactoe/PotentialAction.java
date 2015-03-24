package org.vizzini.example.boardgame.tictactoe;

import org.vizzini.core.game.Agent;

/**
 * Provides a potential action for tic-tac-toe.
 */
public final class PotentialAction
{
    /** Action. */
    private final TTTAction action;

    /** Statistics. */
    private final Statistics statistics = new Statistics();

    /**
     * Construct this object.
     * 
     * @param action Action.
     */
    @SuppressWarnings("hiding")
    public PotentialAction(final TTTAction action)
    {
        if (action == null)
        {
            throw new IllegalArgumentException("action is null");
        }

        this.action = action;
    }

    /**
     * @param environment Environment.
     * @param agent Agent.
     * @return a new <code>PlacementAction</code>.
     */
    public TTTAction createAction(final TTTEnvironment environment, final Agent agent)
    {
        final String name = agent.getTeam().getName();
        final TTTToken token = TTTToken.findByName(name).withAgent(agent);

        return new TTTAction(environment, action.getPosition(), token);
    }

    /**
     * @return the action
     */
    public TTTAction getAction()
    {
        return action;
    }

    /**
     * @return the statistics
     */
    public Statistics getStatistics()
    {
        return statistics;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("PotentialAction [");
        sb.append(action.getPosition());
        sb.append(" ");
        sb.append(statistics.getWinCount());
        sb.append("/");
        sb.append(statistics.getLossCount());
        sb.append("/");
        sb.append(statistics.getDrawCount());
        sb.append(" ");
        sb.append(statistics.getRating());
        sb.append("]");

        return sb.toString();
    }
}
