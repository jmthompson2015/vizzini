package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

import org.junit.Test;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides tests for the <code>DefaultTerminalFactory</code> class.
 */
public final class DefaultTerminalFactoryTest
{
    /** Converter. */
    private final Converter<Boolean> converterBoolean = new Converter<Boolean>(Boolean.class);

    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /** Converter. */
    private final Converter<String> converterString = new Converter<String>(String.class);

    /** Random number generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /** Variable names. */
    private final Set<String> variableNames = new TreeSet<String>(Arrays.asList(new String[] { "x", "y", }));

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createBoolean()
    {
        // Setup.
        final TerminalFactory<Boolean> factory = createFactoryBoolean();

        // Run.
        final Terminal<Boolean> result = factory.create();

        // Verify.
        assertNotNull(result);

        if (result instanceof ConstantTerminal)
        {
            final ConstantTerminal<Boolean> terminal = (ConstantTerminal<Boolean>)result;
            assertTrue((Boolean.TRUE == terminal.getValue()) || (terminal.getValue() == Boolean.FALSE));
        }
        else if (result instanceof VariableTerminal)
        {
            final VariableTerminal<Boolean> terminal = (VariableTerminal<Boolean>)result;
            assertTrue(variableNames.contains(terminal.getVariableName()));
        }
        else
        {
            fail("Unknown terminal type: " + result.getClass().getName());
        }
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createDouble()
    {
        // Setup.
        final TerminalFactory<Double> factory = createFactoryDouble();

        // Run.
        final Terminal<Double> result = factory.create();

        // Verify.
        assertNotNull(result);

        if (result instanceof ConstantTerminal)
        {
            final ConstantTerminal<Double> terminal = (ConstantTerminal<Double>)result;
            assertTrue((-10.0 <= terminal.getValue()) && (terminal.getValue() <= 10.0));
        }
        else if (result instanceof VariableTerminal)
        {
            final VariableTerminal<Double> terminal = (VariableTerminal<Double>)result;
            assertTrue(variableNames.contains(terminal.getVariableName()));
        }
        else
        {
            fail("Unknown terminal type: " + result.getClass().getName());
        }
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createInteger()
    {
        // Setup.
        final TerminalFactory<Integer> factory = createFactoryInteger();

        // Run.
        final Terminal<Integer> result = factory.create();

        // Verify.
        assertNotNull(result);

        if (result instanceof ConstantTerminal)
        {
            final ConstantTerminal<Integer> terminal = (ConstantTerminal<Integer>)result;
            assertTrue((-10 <= terminal.getValue()) && (terminal.getValue() <= 10));
        }
        else if (result instanceof VariableTerminal)
        {
            final VariableTerminal<Integer> terminal = (VariableTerminal<Integer>)result;
            assertTrue(variableNames.contains(terminal.getVariableName()));
        }
        else
        {
            fail("Unknown terminal type: " + result.getClass().getName());
        }
    }

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void createString()
    {
        // Setup.
        final TerminalFactory<String> factory = createFactoryString();

        // Run.
        final Terminal<String> result = factory.create();

        // Verify.
        assertNotNull(result);

        if (result instanceof ConstantTerminal)
        {
            final ConstantTerminal<String> terminal = (ConstantTerminal<String>)result;
            assertTrue(("a".compareTo(terminal.getValue()) <= 0) && ("z".compareTo(terminal.getValue()) >= 0));
        }
        else if (result instanceof VariableTerminal)
        {
            final VariableTerminal<String> terminal = (VariableTerminal<String>)result;
            assertTrue(variableNames.contains(terminal.getVariableName()));
        }
        else
        {
            fail("Unknown terminal type: " + result.getClass().getName());
        }
    }

    /**
     * @return a new terminal factory.
     */
    private TerminalFactory<Boolean> createFactoryBoolean()
    {
        final Set<Factory<Terminal<Boolean>>> factories = new HashSet<Factory<Terminal<Boolean>>>();
        factories.add(new ConstantTerminalFactory<Boolean>(converterBoolean, Boolean.FALSE, Boolean.TRUE, generator));
        factories.add(new VariableTerminalFactory<Boolean>(converterBoolean, variableNames, generator));

        return new DefaultTerminalFactory<Boolean>(factories, converterBoolean, generator);
    }

    /**
     * @return a new terminal factory.
     */
    private TerminalFactory<Double> createFactoryDouble()
    {
        final Set<Factory<Terminal<Double>>> factories = new HashSet<Factory<Terminal<Double>>>();
        factories.add(new ConstantTerminalFactory<Double>(converterDouble, -10.0, 10.0, generator));
        factories.add(new VariableTerminalFactory<Double>(converterDouble, variableNames, generator));

        return new DefaultTerminalFactory<Double>(factories, converterDouble, generator);
    }

    /**
     * @return a new terminal factory.
     */
    private TerminalFactory<Integer> createFactoryInteger()
    {
        final Set<Factory<Terminal<Integer>>> factories = new HashSet<Factory<Terminal<Integer>>>();
        factories.add(new ConstantTerminalFactory<Integer>(converterInteger, -10, 10, generator));
        factories.add(new VariableTerminalFactory<Integer>(converterInteger, variableNames, generator));

        return new DefaultTerminalFactory<Integer>(factories, converterInteger, generator);
    }

    /**
     * @return a new terminal factory.
     */
    private TerminalFactory<String> createFactoryString()
    {
        final Set<Factory<Terminal<String>>> factories = new HashSet<Factory<Terminal<String>>>();
        factories.add(new ConstantTerminalFactory<String>(converterString, "a", "z", generator));
        factories.add(new VariableTerminalFactory<String>(converterString, variableNames, generator));

        return new DefaultTerminalFactory<String>(factories, converterString, generator);
    }
}
