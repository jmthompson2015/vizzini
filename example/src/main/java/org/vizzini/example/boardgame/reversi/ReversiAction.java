package org.vizzini.example.boardgame.reversi;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.PlaceAction;
import org.vizzini.core.game.Token;

/**
 * Provides an implementation of a place action for reversi.
 */
public final class ReversiAction implements PlaceAction
{
    /** Environment. */
    private final ReversiEnvironment environment;

    /** Environment. */
    private ReversiEnvironment originalEnvironment;

    /** Position. */
    private final ReversiPosition position;

    /** Token. */
    private final ReversiToken token;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param position Position.
     * @param token Token.
     */
    @SuppressWarnings("hiding")
    public ReversiAction(final ReversiEnvironment environment, final ReversiPosition position, final ReversiToken token)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (position == null)
        {
            throw new IllegalArgumentException("position is null");
        }

        if (token == null)
        {
            throw new IllegalArgumentException("token is null");
        }

        this.environment = environment;
        this.position = position;
        this.token = token;
    }

    @Override
    public boolean doIt()
    {
        originalEnvironment = environment.copy();
        final Agent agent = getToken().getAgent();
        final ReversiTeam team = getToken().getTeam();

        for (final int[] direction : ReversiAdjudicator.DIRECTIONS)
        {
            final int length = environment.determineLineLength(team, getPosition(), direction);

            if (length > 0)
            {
                for (int i = 1; i <= length; i++)
                {
                    final int x = getPosition().getX() + (i * direction[0]);
                    final int y = getPosition().getY() + (i * direction[1]);
                    final ReversiPosition position2 = ReversiPosition.findByCoordinates(x, y);

                    if (agent.getTeam() == environment.getTokenAt(position2).getTeam())
                    {
                        System.out.println("Agent mismatch on flip position2 = " + position2);
                    }

                    environment.flipTokenAt(position2);
                }
            }
        }

        environment.placeToken(getPosition(), getToken());
        environment.fireDoActionPropertyChange(null, this);

        return true;
    }

    @Override
    public Agent getAgent()
    {
        return token.getAgent();
    }

    @Override
    public ReversiEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public ReversiPosition getPosition()
    {
        return position;
    }

    @Override
    public ReversiToken getToken()
    {
        return token;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public boolean undoIt()
    {
        environment.removeToken(position);

        final ReversiPosition[] values = ReversiPosition.values();

        for (final ReversiPosition myPosition : values)
        {
            final Token myToken = originalEnvironment.getTokenAt(myPosition);

            if (myToken != null)
            {
                environment.placeToken(myPosition, myToken);
            }
        }

        environment.fireUndoActionPropertyChange(null, this);

        return true;
    }
}
