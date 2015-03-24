package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides a factory for a constant terminal.
 * 
 * @param <T> Type.
 */
public final class ConstantTerminalFactory<T> implements Factory<Terminal<T>>
{
    /** Converter. */
    private final Converter<T> converter;

    /** Random number generator. */
    private final RandomGenerator generator;

    /** Maximum constant. */
    private final T maximumConstant;

    /** Minimum constant. */
    private final T minimumConstant;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param value Constant value.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public ConstantTerminalFactory(final Converter<T> converter, final T value, final RandomGenerator generator)
    {
        this(converter, value, value, generator);
    }

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param minimumConstant Minimum constant.
     * @param maximumConstant Maximum constant.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public ConstantTerminalFactory(final Converter<T> converter, final T minimumConstant, final T maximumConstant,
            final RandomGenerator generator)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (minimumConstant == null)
        {
            throw new IllegalArgumentException("minimumConstant is null");
        }

        if (maximumConstant == null)
        {
            throw new IllegalArgumentException("maximumConstant is null");
        }

        if (generator == null)
        {
            throw new IllegalArgumentException("generator is null");
        }

        this.converter = converter;
        this.minimumConstant = minimumConstant;
        this.maximumConstant = maximumConstant;
        this.generator = generator;
    }

    @Override
    public ConstantTerminal<T> create()
    {
        return new ConstantTerminal<T>(converter, createValue());
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
     * @return the maximumConstant
     */
    public T getMaximumConstant()
    {
        return maximumConstant;
    }

    /**
     * @return the minimumConstant
     */
    public T getMinimumConstant()
    {
        return minimumConstant;
    }

    /**
     * @return the returnType.
     */
    public Class<?> getReturnType()
    {
        return converter.getReturnType();
    }

    /**
     * @return a randomly generated value.
     */
    private T createValue()
    {
        T answer = null;

        if (minimumConstant == maximumConstant)
        {
            answer = minimumConstant;
        }
        else
        {
            final Class<?> returnType = getReturnType();

            if (returnType == Boolean.class)
            {
                final int index = generator.generateInt(0, 1);
                answer = (index == 0 ? minimumConstant : maximumConstant);
            }
            else if (returnType == Double.class)
            {
                answer = converter.toT(generator.generateDouble((Double)minimumConstant, (Double)maximumConstant));
            }
            else if (returnType == Integer.class)
            {
                answer = converter.toT(generator.generateInt((Integer)minimumConstant, (Integer)maximumConstant));
            }
            else if (returnType == String.class)
            {
                final char min = converter.toString(minimumConstant).charAt(0);
                final char max = converter.toString(maximumConstant).charAt(0);
                final int range = max - min;
                final int index = generator.generateInt(0, range);
                answer = converter.toT(String.valueOf((char)(min + index)));
            }
            else
            {
                throw new RuntimeException("Unsupported value type: " + minimumConstant.getClass().getName());
            }
        }

        return answer;
    }
}
