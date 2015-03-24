package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>NumberUtilities</code> class.
 */
public final class ConverterTest
{
    /**
     * Test the <code>add()</code> method.
     */
    @Test
    public void addInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run.
        final Integer result = converter.add(2, 3);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(5));
    }

    /**
     * Test the <code>getDefaultValue()</code> method.
     */
    @Test
    public void getDefaultValueBoolean()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run.
        final Boolean result = converter.getDefaultValue();

        // Verify.
        assertNotNull(result);
        assertThat(result, is(Boolean.FALSE));
    }

    /**
     * Test the <code>getDefaultValue()</code> method.
     */
    @Test
    public void getDefaultValueDouble()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run.
        final Double result = converter.getDefaultValue();

        // Verify.
        assertNotNull(result);
        assertThat(result, is(0.0));
    }

    /**
     * Test the <code>getDefaultValue()</code> method.
     */
    @Test
    public void getDefaultValueInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run.
        final Integer result = converter.getDefaultValue();

        // Verify.
        assertNotNull(result);
        assertThat(result, is(0));
    }

    /**
     * Test the <code>getDefaultValue()</code> method.
     */
    @Test
    public void getDefaultValueString()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run.
        final String result = converter.getDefaultValue();

        // Verify.
        assertNotNull(result);
        assertThat(result, is(""));
    }

    /**
     * Test the <code>increment()</code> method.
     */
    @Test
    public void incrementInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run.
        final Integer result = converter.increment(2);

        // Verify.
        assertNotNull(result);
        assertThat(result, is(3));
    }

    /**
     * Test the <code>toBoolean()</code> method.
     */
    @Test
    public void toBooleanFromBoolean()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toBoolean(Boolean.FALSE), is(false));
        assertThat(converter.toBoolean(Boolean.TRUE), is(true));
    }

    /**
     * Test the <code>toBoolean()</code> method.
     */
    @Test
    public void toBooleanFromDouble()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toBoolean(Double.valueOf(-2.0)), is(false));
        assertThat(converter.toBoolean(Double.valueOf(-1.0)), is(false));
        assertThat(converter.toBoolean(Double.valueOf(0.0)), is(true));
        assertThat(converter.toBoolean(Double.valueOf(1.0)), is(true));
        assertThat(converter.toBoolean(Double.valueOf(2.0)), is(true));
    }

    /**
     * Test the <code>toBoolean()</code> method.
     */
    @Test
    public void toBooleanFromInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toBoolean(Integer.valueOf(-2)), is(false));
        assertThat(converter.toBoolean(Integer.valueOf(-1)), is(false));
        assertThat(converter.toBoolean(Integer.valueOf(0)), is(true));
        assertThat(converter.toBoolean(Integer.valueOf(1)), is(true));
        assertThat(converter.toBoolean(Integer.valueOf(2)), is(true));
    }

    /**
     * Test the <code>toBoolean()</code> method.
     */
    @Test
    public void toBooleanFromString()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toBoolean("false"), is(false));
        assertThat(converter.toBoolean("bogus"), is(false));
        assertThat(converter.toBoolean("true"), is(true));
    }

    /**
     * Test the <code>toDouble()</code> method.
     */
    @Test
    public void toDoubleFromBoolean()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toDouble(Boolean.FALSE), is(-1.0));
        assertThat(converter.toDouble(Boolean.TRUE), is(1.0));
    }

    /**
     * Test the <code>toDouble()</code> method.
     */
    @Test
    public void toDoubleFromDouble()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toDouble(Double.valueOf(-1.0)), is(-1.0));
        assertThat(converter.toDouble(Double.valueOf(0.0)), is(0.0));
        assertThat(converter.toDouble(Double.valueOf(1.0)), is(1.0));
    }

    /**
     * Test the <code>toDouble()</code> method.
     */
    @Test
    public void toDoubleFromInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toDouble(Integer.valueOf(-1)), is(-1.0));
        assertThat(converter.toDouble(Integer.valueOf(0)), is(0.0));
        assertThat(converter.toDouble(Integer.valueOf(1)), is(1.0));
    }

    /**
     * Test the <code>toDouble()</code> method.
     */
    @Test
    public void toDoubleFromString()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toDouble("-1.0"), is(-1.0));
        assertThat(converter.toDouble("0.0"), is(0.0));
        assertThat(converter.toDouble("1.0"), is(1.0));
    }

    /**
     * Test the <code>toInteger()</code> method.
     */
    @Test
    public void toIntegerFromBoolean()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toInteger(Boolean.FALSE), is(-1));
        assertThat(converter.toInteger(Boolean.TRUE), is(1));
    }

    /**
     * Test the <code>toInteger()</code> method.
     */
    @Test
    public void toIntegerFromDouble()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toInteger(Double.valueOf(-1.0)), is(-1));
        assertThat(converter.toInteger(Double.valueOf(0.0)), is(0));
        assertThat(converter.toInteger(Double.valueOf(1.0)), is(1));
    }

    /**
     * Test the <code>toInteger()</code> method.
     */
    @Test
    public void toIntegerFromInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toInteger(Integer.valueOf(-1)), is(-1));
        assertThat(converter.toInteger(Integer.valueOf(0)), is(0));
        assertThat(converter.toInteger(Integer.valueOf(1)), is(1));
    }

    /**
     * Test the <code>toInteger()</code> method.
     */
    @Test
    public void toIntegerFromString()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toInteger("-1"), is(-1));
        assertThat(converter.toInteger("0"), is(0));
        assertThat(converter.toInteger("1"), is(1));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void toStringFromBoolean()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toString(Boolean.FALSE), is("false"));
        assertThat(converter.toString(Boolean.TRUE), is("true"));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void toStringFromDouble()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toString(Double.valueOf(-1.0)), is("-1.0"));
        assertThat(converter.toString(Double.valueOf(0.0)), is("0.0"));
        assertThat(converter.toString(Double.valueOf(1.0)), is("1.0"));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void toStringFromInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toString(Integer.valueOf(-1)), is("-1"));
        assertThat(converter.toString(Integer.valueOf(0)), is("0"));
        assertThat(converter.toString(Integer.valueOf(1)), is("1"));
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void toStringFromString()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toString("hound"), is("hound"));
        assertThat(converter.toString("dog"), is("dog"));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTBooleanFromBoolean()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toT(false), is(Boolean.FALSE));
        assertThat(converter.toT(true), is(Boolean.TRUE));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTBooleanFromDouble()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toT(-1.0), is(Boolean.FALSE));
        assertThat(converter.toT(1.0), is(Boolean.TRUE));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTBooleanFromInteger()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toT(-1), is(Boolean.FALSE));
        assertThat(converter.toT(1), is(Boolean.TRUE));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTBooleanFromString()
    {
        // Setup.
        final Converter<Boolean> converter = new Converter<Boolean>(Boolean.class);

        // Run / Verify.
        assertThat(converter.toT("false"), is(Boolean.FALSE));
        assertThat(converter.toT("true"), is(Boolean.TRUE));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTDoubleFromBoolean()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toT(Boolean.FALSE), is(Double.valueOf(-1.0)));
        assertThat(converter.toT(Boolean.TRUE), is(Double.valueOf(1.0)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTDoubleFromDouble()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toT(-1.0), is(Double.valueOf(-1.0)));
        assertThat(converter.toT(0.0), is(Double.valueOf(0.0)));
        assertThat(converter.toT(1.0), is(Double.valueOf(1.0)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTDoubleFromInteger()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toT(-1), is(Double.valueOf(-1.0)));
        assertThat(converter.toT(0), is(Double.valueOf(0.0)));
        assertThat(converter.toT(1), is(Double.valueOf(1.0)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTDoubleFromString()
    {
        // Setup.
        final Converter<Double> converter = new Converter<Double>(Double.class);

        // Run / Verify.
        assertThat(converter.toT("-1.0"), is(Double.valueOf(-1.0)));
        assertThat(converter.toT("0.0"), is(Double.valueOf(0.0)));
        assertThat(converter.toT("1.0"), is(Double.valueOf(1.0)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTIntegerFromBoolean()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toT(Boolean.FALSE), is(Integer.valueOf(-1)));
        assertThat(converter.toT(Boolean.TRUE), is(Integer.valueOf(1)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTIntegerFromDouble()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toT(-1.0), is(Integer.valueOf(-1)));
        assertThat(converter.toT(0.0), is(Integer.valueOf(0)));
        assertThat(converter.toT(1.0), is(Integer.valueOf(1)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTIntegerFromInteger()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toT(-1), is(Integer.valueOf(-1)));
        assertThat(converter.toT(0), is(Integer.valueOf(0)));
        assertThat(converter.toT(1), is(Integer.valueOf(1)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTIntegerFromString()
    {
        // Setup.
        final Converter<Integer> converter = new Converter<Integer>(Integer.class);

        // Run / Verify.
        assertThat(converter.toT("-1"), is(Integer.valueOf(-1)));
        assertThat(converter.toT("0"), is(Integer.valueOf(0)));
        assertThat(converter.toT("1"), is(Integer.valueOf(1)));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTStringFromBoolean()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toT(Boolean.FALSE), is("false"));
        assertThat(converter.toT(Boolean.TRUE), is("true"));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTStringFromDouble()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toT(-1.0), is("-1.0"));
        assertThat(converter.toT(0.0), is("0.0"));
        assertThat(converter.toT(1.0), is("1.0"));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTStringFromInteger()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toT(-1), is("-1"));
        assertThat(converter.toT(0), is("0"));
        assertThat(converter.toT(1), is("1"));
    }

    /**
     * Test the <code>toT()</code> method.
     */
    @Test
    public void toTStringFromString()
    {
        // Setup.
        final Converter<String> converter = new Converter<String>(String.class);

        // Run / Verify.
        assertThat(converter.toT("hound"), is("hound"));
        assertThat(converter.toT("dog"), is("dog"));
    }
}
