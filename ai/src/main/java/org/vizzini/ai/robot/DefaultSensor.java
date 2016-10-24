package org.vizzini.ai.robot;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides a default implementation of a sensor.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public final class DefaultSensor<I, O> implements Sensor<I, O>
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
    public DefaultSensor(final String name)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        this.name = name;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public O sense(final I input)
    {
        throw new RuntimeException("Method not implemented");
    }
}
