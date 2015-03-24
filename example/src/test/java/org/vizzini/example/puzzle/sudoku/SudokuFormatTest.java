package org.vizzini.example.puzzle.sudoku;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>SudokuFormat</code> class.
 */
public class SudokuFormatTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatEasy()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final SudokuFormat formatter = new SudokuFormat();

        // Run.
        final String result = formatter.format(environment);

        // Verify.
        assertNotNull(result);
        final String expected = " ,  , 6,  ,  , 8,  , 7, 4, \n ,  , 5,  ,  ,  , 1,  , 9, \n9,  , 7, 4,  , 1, 6,  , 5, \n , 3,  , 1,  ,  ,  , 4, 6, \n ,  ,  ,  ,  ,  ,  ,  ,  , \n1, 6,  ,  ,  , 9,  , 2,  , \n2,  , 3, 6,  , 5, 4,  , 8, \n7,  , 4,  ,  ,  , 9,  ,  , \n6, 8,  , 9,  ,  , 3,  ,  , \n";
        // System.out.println("expected =\n" + expected);
        // System.out.println("result =\n" + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatHard()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentHard();
        final SudokuFormat formatter = new SudokuFormat();

        // Run.
        final String result = formatter.format(environment);

        // Verify.
        assertNotNull(result);
        final String expected = " , 8, 7, 6, 2,  ,  ,  , 5, \n ,  ,  , 3, 1,  ,  ,  ,  , \n ,  , 6,  ,  , 7,  ,  ,  , \n7, 1,  ,  ,  ,  , 5,  , 8, \n , 6,  ,  ,  ,  ,  , 7,  , \n8,  , 4,  ,  ,  ,  , 1, 3, \n ,  ,  , 7,  ,  , 3,  ,  , \n ,  ,  ,  , 9, 3,  ,  ,  , \n5,  ,  ,  , 8, 6, 9, 2,  , \n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatMedium()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();
        final SudokuFormat formatter = new SudokuFormat();

        // Run.
        final String result = formatter.format(environment);

        // Verify.
        assertNotNull(result);
        final String expected = " ,  ,  ,  ,  ,  ,  , 8, 9, \n9,  ,  , 4, 8, 7,  ,  , 5, \n ,  ,  ,  ,  ,  , 3, 6,  , \n5, 3,  ,  ,  , 9,  , 2,  , \n1,  ,  , 2,  , 5,  ,  , 6, \n , 7,  , 6,  ,  ,  , 4, 3, \n , 2, 7,  ,  ,  ,  ,  ,  , \n8,  ,  , 5, 6, 3,  ,  , 2, \n6, 1,  ,  ,  ,  ,  ,  ,  , \n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parseEasy()
    {
        // Setup.
        final String source = " ,  , 6,  ,  , 8,  , 7, 4, \n ,  , 5,  ,  ,  , 1,  , 9, \n9,  , 7, 4,  , 1, 6,  , 5, \n , 3,  , 1,  ,  ,  , 4, 6, \n ,  ,  ,  ,  ,  ,  ,  ,  , \n1, 6,  ,  ,  , 9,  , 2,  , \n2,  , 3, 6,  , 5, 4,  , 8, \n7,  , 4,  ,  ,  , 9,  ,  , \n6, 8,  , 9,  ,  , 3,  ,  , \n";
        final SudokuFormat formatter = new SudokuFormat();

        // Run.
        final SudokuEnvironment result = formatter.parse(source);

        // Verify.
        assertNotNull(result);

        {
            final SudokuToken token = result.getTokenAt(SudokuPosition.a1);
            assertThat(token, is(SudokuToken.SIX));
            assertNull(token.getAgent());
        }

        {
            final SudokuToken token = result.getTokenAt(SudokuPosition.a2);
            assertThat(token, is(SudokuToken.SEVEN));
            assertNull(token.getAgent());
        }

        {
            final SudokuToken token = result.getTokenAt(SudokuPosition.a3);
            assertThat(token, is(SudokuToken.TWO));
            assertNull(token.getAgent());
        }

        {
            final SudokuToken token = result.getTokenAt(SudokuPosition.b1);
            assertThat(token, is(SudokuToken.EIGHT));
            assertNull(token.getAgent());
        }

        assertNull(result.getTokenAt(SudokuPosition.c1));
        assertNull(result.getTokenAt(SudokuPosition.e2));
        assertNull(result.getTokenAt(SudokuPosition.h2));
        assertNull(result.getTokenAt(SudokuPosition.b5));
        assertNull(result.getTokenAt(SudokuPosition.e5));
        assertNull(result.getTokenAt(SudokuPosition.h5));
        assertNull(result.getTokenAt(SudokuPosition.b8));
        assertNull(result.getTokenAt(SudokuPosition.e8));
        assertNull(result.getTokenAt(SudokuPosition.h8));
    }

    /**
     * Test the <code>format()</code> and <code>parse()</code> methods.
     */
    @Test
    public void testRoundTripEasy()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final SudokuFormat formatter = new SudokuFormat();

        // Run.
        final String result0 = formatter.format(environment);

        // Verify.
        assertNotNull(result0);
        final String expected = " ,  , 6,  ,  , 8,  , 7, 4, \n ,  , 5,  ,  ,  , 1,  , 9, \n9,  , 7, 4,  , 1, 6,  , 5, \n , 3,  , 1,  ,  ,  , 4, 6, \n ,  ,  ,  ,  ,  ,  ,  ,  , \n1, 6,  ,  ,  , 9,  , 2,  , \n2,  , 3, 6,  , 5, 4,  , 8, \n7,  , 4,  ,  ,  , 9,  ,  , \n6, 8,  , 9,  ,  , 3,  ,  , \n";
        assertThat(result0, is(expected));

        // Run.
        final SudokuEnvironment result1 = formatter.parse(result0);

        // Verify.
        assertNotNull(result1);

        for (final SudokuPosition position : SudokuPosition.values())
        {
            final SudokuToken token0 = environment.getTokenAt(position);
            final SudokuToken token1 = result1.getTokenAt(position);

            assertThat(token0, is(token1));
        }
    }

    /**
     * Test the <code>format()</code> and <code>parse()</code> methods.
     */
    @Test
    public void testRoundTripHard()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentHard();
        final SudokuFormat formatter = new SudokuFormat();

        // Run.
        final String result0 = formatter.format(environment);

        // Verify.
        assertNotNull(result0);
        final String expected = " , 8, 7, 6, 2,  ,  ,  , 5, \n ,  ,  , 3, 1,  ,  ,  ,  , \n ,  , 6,  ,  , 7,  ,  ,  , \n7, 1,  ,  ,  ,  , 5,  , 8, \n , 6,  ,  ,  ,  ,  , 7,  , \n8,  , 4,  ,  ,  ,  , 1, 3, \n ,  ,  , 7,  ,  , 3,  ,  , \n ,  ,  ,  , 9, 3,  ,  ,  , \n5,  ,  ,  , 8, 6, 9, 2,  , \n";
        assertThat(result0, is(expected));

        // Run.
        final SudokuEnvironment result1 = formatter.parse(result0);

        // Verify.
        assertNotNull(result1);

        for (final SudokuPosition position : SudokuPosition.values())
        {
            final SudokuToken token0 = environment.getTokenAt(position);
            final SudokuToken token1 = result1.getTokenAt(position);

            assertThat(token0, is(token1));
        }
    }

    /**
     * Test the <code>format()</code> and <code>parse()</code> methods.
     */
    @Test
    public void testRoundTripMedium()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();
        final SudokuFormat formatter = new SudokuFormat();

        // Run.
        final String result0 = formatter.format(environment);

        // Verify.
        assertNotNull(result0);
        final String expected = " ,  ,  ,  ,  ,  ,  , 8, 9, \n9,  ,  , 4, 8, 7,  ,  , 5, \n ,  ,  ,  ,  ,  , 3, 6,  , \n5, 3,  ,  ,  , 9,  , 2,  , \n1,  ,  , 2,  , 5,  ,  , 6, \n , 7,  , 6,  ,  ,  , 4, 3, \n , 2, 7,  ,  ,  ,  ,  ,  , \n8,  ,  , 5, 6, 3,  ,  , 2, \n6, 1,  ,  ,  ,  ,  ,  ,  , \n";
        assertThat(result0, is(expected));

        // Run.
        final SudokuEnvironment result1 = formatter.parse(result0);

        // Verify.
        assertNotNull(result1);

        for (final SudokuPosition position : SudokuPosition.values())
        {
            final SudokuToken token0 = environment.getTokenAt(position);
            final SudokuToken token1 = result1.getTokenAt(position);

            assertThat(token0, is(token1));
        }
    }
}
