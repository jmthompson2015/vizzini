package org.vizzini.core;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>TimePrinter</code> class.
 */
public final class TimePrinterTest
{
    /**
     * Test the <code>formatElapsedTime()</code> method.
     */
    @Test
    public void formatElapsedTime100()
    {
        final String title = "Test";
        final long start = 1;
        final long end = 101;
        final TimePrinter timePrinter = new TimePrinter();

        final String result = timePrinter.formatElapsedTime(title, start, end);

        assertNotNull(result);
        assertThat(result, is("Test elapsed time 0:00 (100 ms)"));
    }

    /**
     * Test the <code>formatElapsedTime()</code> method.
     */
    @Test
    public void formatElapsedTime10000()
    {
        final String title = "Test";
        final long start = 1;
        final long end = 10001;
        final TimePrinter timePrinter = new TimePrinter();

        final String result = timePrinter.formatElapsedTime(title, start, end);

        assertNotNull(result);
        assertThat(result, is("Test elapsed time 0:10 (10000 ms)"));
    }

    /**
     * Test the <code>formatElapsedTime()</code> method.
     */
    @Test
    public void formatElapsedTime100000()
    {
        final String title = "Test";
        final long start = 1;
        final long end = 100001;
        final TimePrinter timePrinter = new TimePrinter();

        final String result = timePrinter.formatElapsedTime(title, start, end);

        assertNotNull(result);
        assertThat(result, is("Test elapsed time 1:40 (100000 ms)"));
    }

    /**
     * Test the <code>formatElapsedTime()</code> method.
     */
    @Test
    public void formatElapsedTime1000000()
    {
        final String title = "Test";
        final long start = 1;
        final long end = 1000001;
        final TimePrinter timePrinter = new TimePrinter();

        final String result = timePrinter.formatElapsedTime(title, start, end);

        assertNotNull(result);
        assertThat(result, is("Test elapsed time 16:40 (1000000 ms)"));
    }

    /**
     * Test the <code>formatElapsedTime()</code> method.
     */
    @Test
    public void formatElapsedTimeBadOrder()
    {
        final String title = "Test";
        final long start = 10001;
        final long end = 1;
        final TimePrinter timePrinter = new TimePrinter();

        final String result = timePrinter.formatElapsedTime(title, start, end);

        assertNotNull(result);
        assertThat(result, is("Test elapsed time 0:10 (10000 ms)"));
    }

    /**
     * Test the <code>formatElapsedTime()</code> method.
     */
    @Test
    public void formatElapsedTimeTitleEmpty()
    {
        final String title = "";
        final long start = 1;
        final long end = 10001;
        final TimePrinter timePrinter = new TimePrinter();

        final String result = timePrinter.formatElapsedTime(title, start, end);

        assertNotNull(result);
        assertThat(result, is("Elapsed time 0:10 (10000 ms)"));
    }

    /**
     * Test the <code>formatElapsedTime()</code> method.
     */
    @Test
    public void formatElapsedTimeTitleNull()
    {
        final String title = null;
        final long start = 1;
        final long end = 10001;
        final TimePrinter timePrinter = new TimePrinter();

        final String result = timePrinter.formatElapsedTime(title, start, end);

        assertNotNull(result);
        assertThat(result, is("Elapsed time 0:10 (10000 ms)"));
    }
}
