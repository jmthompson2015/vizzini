package org.vizzini.example.puzzle.sudoku;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.Set;

import org.junit.Test;

/**
 * Provides tests for the <code>SudokuEnvironment</code> class.
 */
public class SudokuEnvironmentTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>getBlockPossibleTokenCount()</code> method.
     */
    @Test
    public void getBlockPossibleTokenCountEasy0()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final int block = 0;

        // Run / Verify.
        final int[] counts = { 3, 0, 0, 0, 1, 0, 0, 0, 1, };

        for (final SudokuToken token : SudokuToken.values())
        {
            final int index = Integer.parseInt(token.getName()) - 1;
            assertThat("token = " + token, environment.getBlockPossibleTokenCount(block, token), is(counts[index]));
        }
    }

    /**
     * Test the <code>getBlockPossibleTokenCount()</code> method.
     */
    @Test
    public void getBlockPossibleTokenCountEasy1()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final int block = 1;

        // Run / Verify.
        final int[] counts = { 3, 5, 3, 2, 0, 0, 3, 2, 0, };

        for (final SudokuToken token : SudokuToken.values())
        {
            final int index = Integer.parseInt(token.getName()) - 1;
            assertThat("token = " + token, environment.getBlockPossibleTokenCount(block, token), is(counts[index]));
        }
    }

    /**
     * Test the <code>getFilePossibleTokenCount()</code> method.
     */
    @Test
    public void getFilePossibleTokenCountEasy0()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final int file = 0;

        // Run / Verify.
        final int[] counts = { 0, 0, 2, 2, 2, 0, 0, 3, 0, };

        for (final SudokuToken token : SudokuToken.values())
        {
            final int index = Integer.parseInt(token.getName()) - 1;
            assertThat("token = " + token, environment.getFilePossibleTokenCount(file, token), is(counts[index]));
        }
    }

    /**
     * Test the <code>getFilePossibleTokenCount()</code> method.
     */
    @Test
    public void getFilePossibleTokenCountEasy1()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final int file = 1;

        // Run / Verify.
        final int[] counts = { 3, 4, 0, 2, 2, 0, 1, 0, 2, };

        for (final SudokuToken token : SudokuToken.values())
        {
            final int index = Integer.parseInt(token.getName()) - 1;
            assertThat("token = " + token, environment.getFilePossibleTokenCount(file, token), is(counts[index]));
        }
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensEasyA1()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();

        // Run.
        final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.a1);

        // Verify.
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensEasyB2()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();

        // Run.
        final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.b2);

        // Verify.
        assertThat(result.size(), is(2));
        assertTrue(result.contains(SudokuToken.ONE));
        assertTrue(result.contains(SudokuToken.FIVE));
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensEasyB3()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();

        // Run.
        final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.b3);

        // Verify.
        assertThat(result.size(), is(2));
        assertTrue(result.contains(SudokuToken.ONE));
        assertTrue(result.contains(SudokuToken.NINE));
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensEasyC1()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();

        // Run.
        final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.c1);

        // Verify.
        assertThat(result.size(), is(1));
        assertTrue(result.contains(SudokuToken.ONE));
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensHardC1()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentHard();

        // Run.
        final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.c1);

        // Verify.
        assertThat(result.size(), is(2));
        assertTrue(result.contains(SudokuToken.ONE));
        assertTrue(result.contains(SudokuToken.THREE));
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensMediumA3()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();

        // Run.
        final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.a3);

        // Verify.
        assertThat(result.size(), is(2));
        assertTrue(result.contains(SudokuToken.THREE));
        assertTrue(result.contains(SudokuToken.FOUR));
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensMediumC1()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();

        // Run.
        final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.c1);

        // Verify.
        assertThat(result.size(), is(4));
        assertTrue(result.contains(SudokuToken.THREE));
        assertTrue(result.contains(SudokuToken.FOUR));
        assertTrue(result.contains(SudokuToken.FIVE));
        assertTrue(result.contains(SudokuToken.NINE));
    }

    /**
     * Test the <code>getPossibleTokens()</code> method.
     */
    @Test
    public void getPossibleTokensNull()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();

        // Run / Verify.
        try
        {
            environment.getPossibleTokens(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("position is null"));
        }
    }

    /**
     * Test the <code>getRankPossibleTokenCount()</code> method.
     */
    @Test
    public void getRankPossibleTokenCountEasy0()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final int rank = 0;

        // Run / Verify.
        final int[] counts = { 4, 3, 0, 2, 1, 0, 3, 0, 0, };

        for (final SudokuToken token : SudokuToken.values())
        {
            final int index = Integer.parseInt(token.getName()) - 1;
            assertThat("token = " + token, environment.getRankPossibleTokenCount(rank, token), is(counts[index]));
        }
    }

    /**
     * Test the <code>getRankPossibleTokenCount()</code> method.
     */
    @Test
    public void getRankPossibleTokenCountEasy1()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final int rank = 1;

        // Run / Verify.
        final int[] counts = { 4, 4, 3, 0, 2, 1, 0, 2, 0, };

        for (final SudokuToken token : SudokuToken.values())
        {
            final int index = Integer.parseInt(token.getName()) - 1;
            assertThat("token = " + token, environment.getRankPossibleTokenCount(rank, token), is(counts[index]));
        }
    }

    /**
     * Test the <code>getTokenAt()</code> method.
     */
    @Test
    public void getTokenAt()
    {
        final SudokuEnvironment environment = testData.createEnvironmentEasy();

        {
            final SudokuToken token = environment.getTokenAt(SudokuPosition.a1);
            assertThat(token, is(SudokuToken.SIX));
            assertNull(token.getAgent());
        }

        {
            final SudokuToken token = environment.getTokenAt(SudokuPosition.a2);
            assertThat(token, is(SudokuToken.SEVEN));
            assertNull(token.getAgent());
        }

        {
            final SudokuToken token = environment.getTokenAt(SudokuPosition.a3);
            assertThat(token, is(SudokuToken.TWO));
            assertNull(token.getAgent());
        }

        {
            final SudokuToken token = environment.getTokenAt(SudokuPosition.b1);
            assertThat(token, is(SudokuToken.EIGHT));
            assertNull(token.getAgent());
        }

        assertNull(environment.getTokenAt(SudokuPosition.c1));
        assertNull(environment.getTokenAt(SudokuPosition.e2));
        assertNull(environment.getTokenAt(SudokuPosition.h2));
        assertNull(environment.getTokenAt(SudokuPosition.b5));
        assertNull(environment.getTokenAt(SudokuPosition.e5));
        assertNull(environment.getTokenAt(SudokuPosition.h5));
        assertNull(environment.getTokenAt(SudokuPosition.b8));
        assertNull(environment.getTokenAt(SudokuPosition.e8));
        assertNull(environment.getTokenAt(SudokuPosition.h8));
    }

    /**
     * Test the <code>getTokenAt()</code> method.
     */
    @Test
    public void testToString()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();

        // Run.
        final String result = environment.toString();

        // Verify.
        final String expected = "9 | | |6| | |8| |7|4|\n8 | | |5| | | |1| |9|\n7 |9| |7|4| |1|6| |5|\n  +-----+-----+-----+\n6 | |3| |1| | | |4|6|\n5 | | | | | | | | | |\n4 |1|6| | | |9| |2| |\n  +-----+-----+-----+\n3 |2| |3|6| |5|4| |8|\n2 |7| |4| | | |9| | |\n1 |6|8| |9| | |3| | |\n   a b c d e f g h i\n";
        assertThat(result, is(expected));
    }
}
