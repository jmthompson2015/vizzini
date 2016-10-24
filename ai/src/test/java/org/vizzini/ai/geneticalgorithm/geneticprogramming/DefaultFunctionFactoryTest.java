package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.junit.Assert.assertNotNull;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

import org.junit.Test;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides tests for the <code>NumberFunctionBuilder</code> class.
 */
public final class DefaultFunctionFactoryTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Random number generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Test the <code>create()</code> method.
     */
    @Test
    public void create()
    {
        // Setup.
        final FunctionFactory<Double> functionFactory = createFunctionFactory();

        // Run.
        final Function<Double> result = functionFactory.create();

        // Verify.
        assertNotNull(result);
        // System.out.println("equation     = " + InfixNotationVisitor.toEquation(result));
    }

    /**
     * @return a new function factory.
     */
    private FunctionFactory<Double> createFunctionFactory()
    {
        final TerminalFactory<Double> terminalFactory = createTerminalFactory();

        final Converter<Double> converter = terminalFactory.getConverter();
        final TreeNode<Double> one = new ConstantTerminal<Double>(converter, 1.0);
        final TreeNode<Double> two = new ConstantTerminal<Double>(converter, 2.0);

        final Set<Function<Double>> exemplars = new HashSet<Function<Double>>();
        exemplars.add(new AbsoluteValueFunction<Double>(converter, one));
        exemplars.add(new AddFunction<Double>(converter, one, two));
        exemplars.add(new DivideFunction<Double>(converter, one, two));
        exemplars.add(new GreaterThanFunction<Double>(converter, one, two));
        exemplars.add(new MultiplyFunction<Double>(converter, one, two));
        exemplars.add(new SubtractFunction<Double>(converter, one, two));

        return new DefaultFunctionFactory<Double>(exemplars, 3, terminalFactory, generator);
    }

    /**
     * @return a new terminal factory.
     */
    private TerminalFactory<Double> createTerminalFactory()
    {
        final Set<String> variableNames = new TreeSet<String>(Arrays.asList(new String[] { "x", "y", }));

        final Factory<Terminal<Double>> factory0 = new ConstantTerminalFactory<Double>(converterDouble, -10.0, 10.0,
                generator);
        final Factory<Terminal<Double>> factory1 = new VariableTerminalFactory<Double>(converterDouble, variableNames,
                generator);
        final Set<Factory<Terminal<Double>>> factories = new HashSet<Factory<Terminal<Double>>>();
        factories.add(factory0);
        factories.add(factory1);

        return new DefaultTerminalFactory<Double>(factories, converterDouble, generator);
    }
}
