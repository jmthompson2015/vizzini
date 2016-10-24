package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides a factory for a variable terminal.
 * 
 * @param <T> Type.
 */
public final class VariableTerminalFactory<T> implements Factory<Terminal<T>>
{
    /** Converter. */
    private final Converter<T> converter;

    /** Random number generator. */
    private final RandomGenerator generator;

    /** Candidate variable names. */
    private final List<String> variableNames;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param variableNames Candidate variable names.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public VariableTerminalFactory(final Converter<T> converter, final Set<String> variableNames,
            final RandomGenerator generator)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (CollectionUtils.isEmpty(variableNames))
        {
            throw new IllegalArgumentException("variableNames is null or empty");
        }

        if (generator == null)
        {
            throw new IllegalArgumentException("generator is null");
        }

        this.converter = converter;
        this.variableNames = new ArrayList<String>(variableNames);
        this.generator = generator;
    }

    @Override
    public VariableTerminal<T> create()
    {
        return new VariableTerminal<T>(converter, selectVariableName());
    }

    /**
     * @return the converter
     */
    public Converter<T> getConverter()
    {
        return converter;
    }

    /**
     * @return the generator
     */
    public RandomGenerator getGenerator()
    {
        return generator;
    }

    /**
     * @return the returnType.
     */
    public Class<?> getReturnType()
    {
        return converter.getReturnType();
    }

    /**
     * @return a randomly selected variable name.
     */
    private String selectVariableName()
    {
        String answer;

        final int size = variableNames.size();

        if (size == 1)
        {
            answer = variableNames.get(0);
        }
        else
        {
            final int index = generator.generateInt(0, size - 1);
            answer = variableNames.get(index);
        }

        return answer;
    }
}
