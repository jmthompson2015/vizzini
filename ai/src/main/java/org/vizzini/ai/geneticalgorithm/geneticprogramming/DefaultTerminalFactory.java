package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides a default implementation of a terminal factory. This factory randomly generates different classes of
 * terminals.
 * 
 * @param <T> Type.
 */
public final class DefaultTerminalFactory<T> implements TerminalFactory<T>
{
    /** Converter. */
    private final Converter<T> converter;

    /** Terminal factories. */
    private final List<Factory<Terminal<T>>> factories;

    /** Random number generator. */
    private final RandomGenerator generator;

    /**
     * Construct this object.
     * 
     * @param factories Terminal factories.
     * @param converter Converter.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public DefaultTerminalFactory(final Set<Factory<Terminal<T>>> factories, final Converter<T> converter,
            final RandomGenerator generator)
    {
        if (CollectionUtils.isEmpty(factories))
        {
            throw new IllegalArgumentException("factories is null or empty");
        }

        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (generator == null)
        {
            throw new IllegalArgumentException("generator is null");
        }

        this.factories = new ArrayList<Factory<Terminal<T>>>(factories);
        this.converter = converter;
        this.generator = generator;
    }

    @Override
    public Terminal<T> create()
    {
        Terminal<T> answer;

        final int size = factories.size();

        if (size == 1)
        {
            answer = factories.get(0).create();
        }
        else
        {
            final int index = generator.generateInt(0, size - 1);
            answer = factories.get(index).create();
        }

        return answer;
    }

    @Override
    public Converter<T> getConverter()
    {
        return converter;
    }

    @Override
    public RandomGenerator getGenerator()
    {
        return generator;
    }

    @Override
    public Class<T> getReturnType()
    {
        return converter.getReturnType();
    }
}
