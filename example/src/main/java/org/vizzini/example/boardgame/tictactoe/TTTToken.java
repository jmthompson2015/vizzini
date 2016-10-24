package org.vizzini.example.boardgame.tictactoe;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a pseudo-enumeration of tokens for tic-tac-toe.
 */
public final class TTTToken implements Token
{
    /** X. */
    public static final TTTToken X = new TTTToken("X", "token x", TTTTeam.X);

    /** O. */
    public static final TTTToken O = new TTTToken("O", "token o", TTTTeam.O);

    /** Values. */
    private static final TTTToken[] VALUES;

    static
    {
        VALUES = new TTTToken[2];

        int i = 0;

        VALUES[i++] = X;
        VALUES[i++] = O;
    }

    /**
     * @param name Name.
     * 
     * @return the token with the given name.
     */
    public static TTTToken findByName(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        TTTToken answer = null;

        if (X.getName().equals(name))
        {
            answer = X;
        }
        else if (O.getName().equals(name))
        {
            answer = O;
        }

        return answer;
    }

    /**
     * @param team Team.
     * 
     * @return the token for the given team.
     */
    public static TTTToken findByTeam(final TTTTeam team)
    {
        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        return (team == TTTTeam.X ? X : O);
    }

    /**
     * @return values.
     */
    public static TTTToken[] values()
    {
        return VALUES;
    }

    /** Delegate. */
    private final Token delegate;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param team Team.
     */
    private TTTToken(final String name, final String description, final Team team)
    {
        this(name, description, team, null);
    }

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param team Team.
     * @param agent Agent.
     */
    private TTTToken(final String name, final String description, final Team team, final Agent agent)
    {
        delegate = new DefaultToken(name, description, team, agent);
    }

    @Override
    public Agent getAgent()
    {
        return delegate.getAgent();
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public TTTTeam getTeam()
    {
        return (TTTTeam)delegate.getTeam();
    }

    /**
     * @return the opposite token.
     */
    public TTTToken opposite()
    {
        return (getTeam() == TTTTeam.X ? O : X);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public TTTToken withAgent(final Agent agent)
    {
        return new TTTToken(getName(), getDescription(), getTeam(), agent);
    }
}
