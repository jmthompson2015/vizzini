package org.vizzini.core.game;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides a default implementation of a team.
 */
public final class DefaultTeam implements Team
{
    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param description Description. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultTeam(final String name, final String description)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (StringUtils.isEmpty(description))
        {
            throw new IllegalArgumentException("description is null or empty");
        }

        this.name = name;
        this.description = description;
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
            final DefaultTeam another = (DefaultTeam)object;

            answer = name.equals(another.name);

            if (answer)
            {
                answer = description.equals(another.description);
            }
        }

        return answer;
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
    public int hashCode()
    {
        int answer = 0;

        final int[] primes = { 2, 3, };
        int i = 0;

        answer += primes[i++] * name.hashCode();
        answer += primes[i++] * description.hashCode();

        return answer;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
