package org.vizzini.core.game;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides a default implementation of a token.
 */
public final class DefaultToken implements Token
{
    /** Agent. */
    private final Agent agent;

    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /** Team. */
    private final Team team;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param description Description. (required)
     * @param team Team. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultToken(final String name, final String description, final Team team)
    {
        this(name, description, team, null);
    }

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param description Description. (required)
     * @param team Team. (optional)
     * @param agent Agent. (optional)
     */
    @SuppressWarnings("hiding")
    public DefaultToken(final String name, final String description, final Team team, final Agent agent)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (StringUtils.isEmpty(description))
        {
            throw new IllegalArgumentException("description is null or empty");
        }

        if ((agent != null) && (team != null) && !team.equals(agent.getTeam()))
        {
            throw new IllegalArgumentException("Agent does not belong to team: " + agent + " " + team);
        }

        this.name = name;
        this.description = description;
        this.team = team;
        this.agent = agent;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final DefaultToken another = (DefaultToken)object;

            answer = name.equals(another.name);

            if (answer)
            {
                answer = description.equals(another.description);
            }

            if (answer)
            {
                answer = team.equals(another.team);
            }
        }

        return answer;
    }

    @Override
    public Agent getAgent()
    {
        return agent;
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public Team getTeam()
    {
        return team;
    }

    @Override
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, 5, };
        int i = 0;

        answer += primes[i++] * name.hashCode();
        answer += primes[i++] * description.hashCode();

        if (team != null)
        {
            answer += primes[i++] * team.hashCode();
        }

        return answer;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    @SuppressWarnings("hiding")
    public Token withAgent(final Agent agent)
    {
        return new DefaultToken(getName(), getDescription(), getTeam(), agent);
    }
}
