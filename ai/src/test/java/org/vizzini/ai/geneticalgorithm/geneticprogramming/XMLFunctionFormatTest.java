package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.XMLFormat;

/**
 * Provides tests for the <code>XMLFunctionFormat</code> class.
 */
public final class XMLFunctionFormatTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /** XML formatter. */
    private final XMLFormat xmlFormatter = new XMLFormat();

    /** Terminal formatter. */
    private final XMLTerminalFormat<Double> terminalFormatterDouble = new DefaultXMLTerminalFormat<Double>(xmlFormatter);

    /** Terminal formatter. */
    private final XMLTerminalFormat<Integer> terminalFormatterInteger = new DefaultXMLTerminalFormat<Integer>(
            xmlFormatter);

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatAddDouble()
    {
        // Setup.
        Function<Double> function;
        {
            final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 1.0);
            final TreeNode<Double> child1 = new VariableTerminal<Double>(converterDouble, "x");
            function = new AddFunction<Double>(converterDouble, child0, child1);
        }
        final XMLFunctionFormat<Double> formatter = new XMLFunctionFormat<Double>(terminalFormatterDouble);

        // Run.
        final String result = formatter.format(function);

        // Verify.
        assertNotNull(result);
        final String expected = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction\" returnType=\"java.lang.Double\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Double\"><value>1.0</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Double\"><variableName>x</variableName></terminal></children></function>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        // System.out.println("result   =\n" + xmlFormatter.format(xmlFormatter.parse(result)));
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatAddInteger()
    {
        // Setup.
        Function<Integer> function;
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
            function = new AddFunction<Integer>(converterInteger, child0, child1);
        }
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final String result = formatter.format(function);

        // Verify.
        assertNotNull(result);
        final String expected = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal></children></function>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        // System.out.println("result   =\n" + xmlFormatter.format(xmlFormatter.parse(result)));
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatIfInteger()
    {
        // Setup.
        Function<Integer> function;
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
            final TreeNode<Integer> child2 = new VariableTerminal<Integer>(converterInteger, "y");
            function = new IfFunction<Integer>(converterInteger, child0, child1, child2);
        }
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final String result = formatter.format(function);

        // Verify.
        assertNotNull(result);
        final String expected = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.IfFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>y</variableName></terminal></children></function>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        // System.out.println("result   =\n" + xmlFormatter.format(xmlFormatter.parse(result)));
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatMultiplyInteger()
    {
        // Setup.
        Function<Integer> function;
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
            function = new MultiplyFunction<Integer>(converterInteger, child0, child1);
        }
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final String result = formatter.format(function);

        // Verify.
        assertNotNull(result);
        final String expected = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.MultiplyFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal></children></function>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        // System.out.println("result   =\n" + xmlFormatter.format(xmlFormatter.parse(result)));
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatPowerInteger()
    {
        // Setup.
        Function<Integer> function;
        {
            final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
            final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
            function = new PowerFunction<Integer>(converterInteger, child0, child1);
        }
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final String result = formatter.format(function);

        // Verify.
        assertNotNull(result);
        final String expected = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.PowerFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal></children></function>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        // System.out.println("result   =\n" + xmlFormatter.format(xmlFormatter.parse(result)));
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatPutVariableInteger()
    {
        // Setup.
        Function<Integer> function;
        {
            final TreeNode<Integer> child = new ConstantTerminal<Integer>(converterInteger, 1);
            function = new PutVariableFunction<Integer>(converterInteger, "x", child);
        }
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final String result = formatter.format(function);

        // Verify.
        assertNotNull(result);
        final String expected = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.PutVariableFunction\" returnType=\"java.lang.Integer\" variableName=\"x\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal></children></function>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        // System.out.println("result   =\n" + xmlFormatter.format(xmlFormatter.parse(result)));
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatSine()
    {
        // Setup.
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, 1.0);
        final Function<Double> function = new SineFunction<Double>(converterDouble, child);
        final XMLFunctionFormat<Double> formatter = new XMLFunctionFormat<Double>(terminalFormatterDouble);

        // Run.
        final String result = formatter.format(function);

        // Verify.
        assertNotNull(result);
        final String expected = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.SineFunction\" returnType=\"java.lang.Double\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Double\"><value>1.0</value></terminal></children></function>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        // System.out.println("result   =\n" + xmlFormatter.format(xmlFormatter.parse(result)));
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseAddDouble()
    {
        // Setup.
        final String source = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction\" returnType=\"java.lang.Double\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Double\"><value>1.0</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Double\"><variableName>x</variableName></terminal></children></function>";
        final XMLFunctionFormat<Double> formatter = new XMLFunctionFormat<Double>(terminalFormatterDouble);

        // Run.
        final Function<Double> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(AddFunction.class));
        assertThat(result.getArity(), is(2));
        {
            assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
            final ConstantTerminal<Double> terminal = (ConstantTerminal<Double>)result.getChildAt(0);
            assertThat(terminal.getValue(), is(1.0));
        }
        {
            assertThat(result.getChildAt(1), instanceOf(VariableTerminal.class));
            final VariableTerminal<Double> terminal = (VariableTerminal<Double>)result.getChildAt(1);
            assertThat(terminal.getVariableName(), is("x"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseAddInteger()
    {
        // Setup.
        final String source = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal></children></function>";
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final Function<Integer> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(AddFunction.class));
        assertThat(result.getArity(), is(2));
        {
            assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
            final ConstantTerminal<Integer> terminal = (ConstantTerminal<Integer>)result.getChildAt(0);
            assertThat(terminal.getValue(), is(1));
        }
        {
            assertThat(result.getChildAt(1), instanceOf(VariableTerminal.class));
            final VariableTerminal<Integer> terminal = (VariableTerminal<Integer>)result.getChildAt(1);
            assertThat(terminal.getVariableName(), is("x"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseIfInteger()
    {
        // Setup.
        final String source = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.IfFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>y</variableName></terminal></children></function>";
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final Function<Integer> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(IfFunction.class));
        assertThat(result.getArity(), is(3));
        {
            assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
            final ConstantTerminal<Integer> terminal = (ConstantTerminal<Integer>)result.getChildAt(0);
            assertThat(terminal.getValue(), is(1));
        }
        {
            assertThat(result.getChildAt(1), instanceOf(VariableTerminal.class));
            final VariableTerminal<Integer> terminal = (VariableTerminal<Integer>)result.getChildAt(1);
            assertThat(terminal.getVariableName(), is("x"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseMultiplyInteger()
    {
        // Setup.
        final String source = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.MultiplyFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal></children></function>";
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final Function<Integer> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(MultiplyFunction.class));
        assertThat(result.getArity(), is(2));
        {
            assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
            final ConstantTerminal<Integer> terminal = (ConstantTerminal<Integer>)result.getChildAt(0);
            assertThat(terminal.getValue(), is(1));
        }
        {
            assertThat(result.getChildAt(1), instanceOf(VariableTerminal.class));
            final VariableTerminal<Integer> terminal = (VariableTerminal<Integer>)result.getChildAt(1);
            assertThat(terminal.getVariableName(), is("x"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parsePowerInteger()
    {
        // Setup.
        final String source = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.PowerFunction\" returnType=\"java.lang.Integer\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal></children></function>";
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final Function<Integer> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(PowerFunction.class));
        assertThat(result.getArity(), is(2));
        {
            assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
            final ConstantTerminal<Integer> terminal = (ConstantTerminal<Integer>)result.getChildAt(0);
            assertThat(terminal.getValue(), is(1));
        }
        {
            assertThat(result.getChildAt(1), instanceOf(VariableTerminal.class));
            final VariableTerminal<Integer> terminal = (VariableTerminal<Integer>)result.getChildAt(1);
            assertThat(terminal.getVariableName(), is("x"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parsePutVariableInteger()
    {
        // Setup.
        final String source = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.PutVariableFunction\" returnType=\"java.lang.Integer\" variableName=\"x\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal></children></function>";
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(terminalFormatterInteger);

        // Run.
        final Function<Integer> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(PutVariableFunction.class));
        assertThat(((PutVariableFunction<Integer>)result).getVariableName(), is("x"));
        assertThat(result.getArity(), is(1));
        {
            assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
            final ConstantTerminal<Integer> terminal = (ConstantTerminal<Integer>)result.getChildAt(0);
            assertThat(terminal.getValue(), is(1));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseSine()
    {
        // Setup.
        final String source = "<function class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.SineFunction\" returnType=\"java.lang.Double\"><children><terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Double\"><value>1.0</value></terminal></children></function>";
        final XMLFunctionFormat<Double> formatter = new XMLFunctionFormat<Double>(terminalFormatterDouble);

        // Run.
        final Function<Double> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(SineFunction.class));
        assertThat(result.getArity(), is(1));
        {
            assertThat(result.getChildAt(0), instanceOf(ConstantTerminal.class));
            final ConstantTerminal<Double> terminal = (ConstantTerminal<Double>)result.getChildAt(0);
            assertThat(terminal.getValue(), is(1.0));
        }
    }
}
