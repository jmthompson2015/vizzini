package org.vizzini.core.game;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides a default implementation of an agent.
 */
public final class DefaultAgent implements Agent
{
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
    public DefaultAgent(final String name, final String description, final Team team)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (StringUtils.isEmpty(description))
        {
            throw new IllegalArgumentException("description is null or empty");
        }

        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        this.name = name;
        this.description = description;
        this.team = team;
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
            final DefaultAgent another = (DefaultAgent)object;

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
    public Action getAction(final Environment environment, final Adjudicator adjudicator)
    {
        return null;
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
        answer += primes[i++] * team.hashCode();

        return answer;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
