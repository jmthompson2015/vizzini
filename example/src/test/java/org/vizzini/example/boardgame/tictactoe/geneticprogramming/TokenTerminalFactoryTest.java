package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.RandomGenerator;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;

/**
 * Provides tests for the <code>TokenTerminalFactory</code> class.
 */
public final class TokenTerminalFactoryTest
{
    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /** Random generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void create()
    {
        // Setup.
        final TokenTerminalFactory factory = new TokenTerminalFactory(converter, generator);

        // Run.
        final TokenTerminal result = factory.create();

        // Verify.
        assertNotNull(result);
        final TTTPosition position = result.getPosition();
        assertNotNull(position);
        assertTrue((0 <= position.getIndex()) && (position.getIndex() < 9));
    }
}
