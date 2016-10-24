package org.vizzini.example.boardgame.qubic;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a pseudo-enumeration of tokens for qubic.
 */
public final class QubicToken implements Token
{
    /** O. */
    public static final QubicToken O = new QubicToken("O", "token o", QubicTeam.O);

    /** X. */
    public static final QubicToken X = new QubicToken("X", "token x", QubicTeam.X);

    /** Values. */
    private static final QubicToken[] VALUES;

    static
    {
        VALUES = new QubicToken[2];

        int i = 0;

        VALUES[i++] = X;
        VALUES[i++] = O;
    }

    /**
     * @param name Name.
     * 
     * @return the token with the given name.
     */
    public static QubicToken findByName(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        QubicToken answer = null;

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
    public static QubicToken findByTeam(final QubicTeam team)
    {
        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        return (team == QubicTeam.X ? X : O);
    }

    /**
     * @return values.
     */
    public static QubicToken[] values()
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
    private QubicToken(final String name, final String description, final Team team)
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
    private QubicToken(final String name, final String description, final Team team, final Agent agent)
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
    public QubicTeam getTeam()
    {
        return (QubicTeam)delegate.getTeam();
    }

    /**
     * @return the opposite token.
     */
    public QubicToken opposite()
    {
        return (getTeam() == QubicTeam.X ? O : X);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public QubicToken withAgent(final Agent agent)
    {
        return new QubicToken(getName(), getDescription(), getTeam(), agent);
    }
}
