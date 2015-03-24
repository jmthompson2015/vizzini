package org.vizzini.ai.robot;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a default implementation of an actuator.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public final class DefaultActuator<I, O> implements Actuator<I, O>
{
    /** Name. */
    private final String name;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * 
     * @throws IllegalArgumentException if name is null or empty.
     */
    @SuppressWarnings("hiding")
    public DefaultActuator(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        this.name = name;
    }

    @Override
    public O actuate(final I input)
    {
        throw new RuntimeException("Method not implemented");
    }

    @Override
    public String getName()
    {
        return name;
    }
}
