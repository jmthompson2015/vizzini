package org.vizzini.example.boardgame.reversi;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a pseudo-enumeration of tokens for reversi.
 */
public final class ReversiToken implements Token
{
    /** Black. */
    public static final ReversiToken BLACK = new ReversiToken("Black", "token black", ReversiTeam.BLACK);

    /** White. */
    public static final ReversiToken WHITE = new ReversiToken("White", "token white", ReversiTeam.WHITE);

    /** Values. */
    private static final ReversiToken[] VALUES;

    static
    {
        VALUES = new ReversiToken[2];

        int i = 0;

        VALUES[i++] = BLACK;
        VALUES[i++] = WHITE;
    }

    /**
     * @param team Team.
     * 
     * @return the token for the given team.
     */
    public static ReversiToken findByTeam(final ReversiTeam team)
    {
        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        return (team == ReversiTeam.BLACK ? BLACK : WHITE);
    }

    /**
     * @return values.
     */
    public static ReversiToken[] values()
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
    private ReversiToken(final String name, final String description, final Team team)
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
    private ReversiToken(final String name, final String description, final Team team, final Agent agent)
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
    public ReversiTeam getTeam()
    {
        return (ReversiTeam)delegate.getTeam();
    }

    /**
     * @return the opposite token.
     */
    public ReversiToken opposite()
    {
        return (getTeam() == ReversiTeam.BLACK ? WHITE : BLACK);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public ReversiToken withAgent(final Agent agent)
    {
        return new ReversiToken(getName(), getDescription(), getTeam(), agent);
    }
}
