package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;

/**
 * Provides a factory for a token terminal.
 */
public final class TokenTerminalFactory implements Factory<Terminal<Integer>>
{
    /** Converter. */
    private final Converter<Integer> converter;

    /** Random number generator. */
    private final RandomGenerator generator;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public TokenTerminalFactory(final Converter<Integer> converter, final RandomGenerator generator)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (generator == null)
        {
            throw new IllegalArgumentException("generator is null");
        }

        this.converter = converter;
        this.generator = generator;
    }

    @Override
    public TokenTerminal create()
    {
        return new TokenTerminal(converter, selectPosition());
    }

    /**
     * @return the converter
     */
    public Converter<Integer> getConverter()
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
     * @return a randomly selected position.
     */
    private TTTPosition selectPosition()
    {
        final TTTPosition[] values = TTTPosition.values();
        final int size = values.length;
        final int index = generator.generateInt(0, size - 1);

        return values[index];
    }
}
