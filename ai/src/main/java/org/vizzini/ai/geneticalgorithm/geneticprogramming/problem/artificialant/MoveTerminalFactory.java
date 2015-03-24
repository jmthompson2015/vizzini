package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.core.Factory;

/**
 * Provides a factory for a move terminal.
 */
public final class MoveTerminalFactory implements Factory<Terminal<Integer>>
{
    /** Converter. */
    private final Converter<Integer> converter;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     */
    @SuppressWarnings("hiding")
    public MoveTerminalFactory(final Converter<Integer> converter)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        this.converter = converter;
    }

    @Override
    public MoveTerminal create()
    {
        return new MoveTerminal(converter);
    }

    /**
     * @return the converter
     */
    public Converter<Integer> getConverter()
    {
        return converter;
    }

    /**
     * @return the returnType.
     */
    public Class<?> getReturnType()
    {
        return converter.getReturnType();
    }
}
