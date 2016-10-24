package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.RandomGenerator;

/**
 * Provides tests for the <code>ConstantTerminalFactory</code> class.
 */
public final class ConstantTerminalFactoryTest
{
    /** Converter. */
    private final Converter<Boolean> converterBoolean = new Converter<Boolean>(Boolean.class);

    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /** Converter. */
    private final Converter<String> converterString = new Converter<String>(String.class);

    /** Random generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createBoolean()
    {
        // Setup.
        final Boolean minimumConstant = Boolean.FALSE;
        final Boolean maximumConstant = Boolean.TRUE;
        final ConstantTerminalFactory<Boolean> factory = new ConstantTerminalFactory<Boolean>(converterBoolean,
                minimumConstant, maximumConstant, generator);

        // Run.
        final ConstantTerminal<Boolean> result = factory.create();

        // Verify.
        assertNotNull(result);
        assertTrue((result.getValue() == minimumConstant) || (result.getValue() == maximumConstant));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createDouble()
    {
        // Setup.
        final Double minimumConstant = -10.0;
        final Double maximumConstant = 10.0;
        final ConstantTerminalFactory<Double> factory = new ConstantTerminalFactory<Double>(converterDouble,
                minimumConstant, maximumConstant, generator);

        // Run.
        final ConstantTerminal<Double> result = factory.create();

        // Verify.
        assertNotNull(result);
        assertTrue((minimumConstant <= result.getValue()) && (result.getValue() <= maximumConstant));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createInteger()
    {
        // Setup.
        final Integer minimumConstant = -10;
        final Integer maximumConstant = 10;
        final ConstantTerminalFactory<Integer> factory = new ConstantTerminalFactory<Integer>(converterInteger,
                minimumConstant, maximumConstant, generator);

        // Run.
        final ConstantTerminal<Integer> result = factory.create();

        // Verify.
        assertNotNull(result);
        assertTrue((minimumConstant <= result.getValue()) && (result.getValue() <= maximumConstant));
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createString()
    {
        // Setup.
        final String minimumConstant = "a";
        final String maximumConstant = "z";
        final ConstantTerminalFactory<String> factory = new ConstantTerminalFactory<String>(converterString,
                minimumConstant, maximumConstant, generator);

        // Run.
        final ConstantTerminal<String> result = factory.create();

        // Verify.
        assertNotNull(result);
        assertTrue(("a".compareTo(result.getValue()) <= 0) && ("z".compareTo(result.getValue()) >= 0));
    }
}
