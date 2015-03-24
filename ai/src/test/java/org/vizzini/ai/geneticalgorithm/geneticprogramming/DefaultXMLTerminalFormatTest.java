package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.vizzini.core.XMLFormat;

/**
 * Provides tests for the <code>XMLTerminalFormat</code> class.
 */
public final class DefaultXMLTerminalFormatTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /** XML formatter. */
    private final XMLFormat xmlFormatter = new XMLFormat();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatConstantDouble()
    {
        // Setup.
        final ConstantTerminal<Double> terminal = new ConstantTerminal<Double>(converterDouble, 1.0);
        final XMLTerminalFormat<Double> formatter = new DefaultXMLTerminalFormat<Double>(xmlFormatter);

        // Run.
        final String result = formatter.format(terminal);

        // Verify.
        assertNotNull(result);
        final String expected = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Double\"><value>1.0</value></terminal>";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatConstantInteger()
    {
        // Setup.
        final ConstantTerminal<Integer> terminal = new ConstantTerminal<Integer>(converterInteger, 1);
        final XMLTerminalFormat<Integer> formatter = new DefaultXMLTerminalFormat<Integer>(xmlFormatter);

        // Run.
        final String result = formatter.format(terminal);

        // Verify.
        assertNotNull(result);
        final String expected = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal>";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatVariableDouble()
    {
        // Setup.
        final VariableTerminal<Double> terminal = new VariableTerminal<Double>(converterDouble, "x");
        final XMLTerminalFormat<Double> formatter = new DefaultXMLTerminalFormat<Double>(xmlFormatter);

        // Run.
        final String result = formatter.format(terminal);

        // Verify.
        assertNotNull(result);
        final String expected = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Double\"><variableName>x</variableName></terminal>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatVariableInteger()
    {
        // Setup.
        final VariableTerminal<Integer> terminal = new VariableTerminal<Integer>(converterInteger, "x");
        final XMLTerminalFormat<Integer> formatter = new DefaultXMLTerminalFormat<Integer>(xmlFormatter);

        // Run.
        final String result = formatter.format(terminal);

        // Verify.
        assertNotNull(result);
        final String expected = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal>";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseConstantDouble()
    {
        // Setup.
        final String source = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Double\"><value>1.0</value></terminal>";
        final XMLTerminalFormat<Double> formatter = new DefaultXMLTerminalFormat<Double>(xmlFormatter);

        // Run.
        final Terminal<Double> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(ConstantTerminal.class));
        assertThat(((ConstantTerminal<Double>)result).getValue(), is(1.0));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseConstantInteger()
    {
        // Setup.
        final String source = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal\" returnType=\"java.lang.Integer\"><value>1</value></terminal>";
        final XMLTerminalFormat<Integer> formatter = new DefaultXMLTerminalFormat<Integer>(xmlFormatter);

        // Run.
        final Terminal<Integer> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(ConstantTerminal.class));
        assertThat(((ConstantTerminal<Integer>)result).getValue(), is(1));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseVariableDouble()
    {
        // Setup.
        final String source = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Double\"><variableName>x</variableName></terminal>";
        final XMLTerminalFormat<Double> formatter = new DefaultXMLTerminalFormat<Double>(xmlFormatter);

        // Run.
        final Terminal<Double> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(VariableTerminal.class));
        assertThat(((VariableTerminal<Double>)result).getVariableName(), is("x"));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseVariableInteger()
    {
        // Setup.
        final String source = "<terminal class=\"org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal\" returnType=\"java.lang.Integer\"><variableName>x</variableName></terminal>";
        final XMLTerminalFormat<Integer> formatter = new DefaultXMLTerminalFormat<Integer>(xmlFormatter);

        // Run.
        final Terminal<Integer> result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result, instanceOf(VariableTerminal.class));
        assertThat(((VariableTerminal<Integer>)result).getVariableName(), is("x"));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new DefaultXMLTerminalFormat<Integer>(null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("xmlFormatter is null"));
        }
    }
}
