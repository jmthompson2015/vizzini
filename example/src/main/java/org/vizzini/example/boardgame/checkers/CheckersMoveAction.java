package org.vizzini.example.boardgame.checkers;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Token;

/**
 * Provides a move action for checkers.
 */
public final class CheckersMoveAction extends CheckersAction
{
    /** Environment. */
    private CheckersEnvironment originalEnvironment;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param agent Agent.
     * @param fromPosition From position.
     * @param toPosition To position.
     */
    public CheckersMoveAction(final CheckersEnvironment environment, final Agent agent,
            final CheckersPosition fromPosition, final CheckersPosition toPosition)
    {
        super(environment, agent, fromPosition, toPosition);
    }

    @Override
    public boolean doIt()
    {
        originalEnvironment = getEnvironment().copy();

        Token token;

        if (isPawnPromotion())
        {
            final CheckersTeam team = (CheckersTeam)getAgent().getTeam();
            token = King.findByTeam(team).withAgent(getAgent());
        }
        else
        {
            token = getEnvironment().getTokenAt(getFromPosition());
        }

        getEnvironment().removeToken(getFromPosition());
        getEnvironment().placeToken(getToPosition(), token);
        getEnvironment().fireDoActionPropertyChange(null, this);

        return true;
    }

    @Override
    public boolean undoIt()
    {
        getEnvironment().removeToken(getToPosition());

        final CheckersPosition[] values = CheckersPosition.values();

        for (final CheckersPosition myPosition : values)
        {
            final Token myToken = originalEnvironment.getTokenAt(myPosition);

            if (myToken != null)
            {
                getEnvironment().placeToken(myPosition, myToken);
            }
        }

        getEnvironment().fireUndoActionPropertyChange(null, this);

        return true;
    }
}
