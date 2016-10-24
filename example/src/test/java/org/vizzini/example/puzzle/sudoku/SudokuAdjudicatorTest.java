package org.vizzini.example.puzzle.sudoku;

import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>SudokuAdjudicator</code> class.
 */
public class SudokuAdjudicatorTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalComplete()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentComplete();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run / Verify.
        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.a1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.b1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Legal.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Already a six in the row.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.SIX);
            assertFalse(adjudicator.isActionLegal(action));
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalEasy()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run / Verify.
        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.a1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.b1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Legal.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.ONE);
            assertTrue(adjudicator.isActionLegal(action));
        }

        {
            // Already a six in the row.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.SIX);
            assertFalse(adjudicator.isActionLegal(action));
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalHard()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentHard();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run / Verify.
        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.a1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.b1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Legal.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.ONE);
            assertTrue(adjudicator.isActionLegal(action));
        }

        {
            // Already a six in the row.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.SIX);
            assertFalse(adjudicator.isActionLegal(action));
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalMedium()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run / Verify.
        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.a1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Already occupied.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.b1, SudokuToken.ONE);
            assertFalse(adjudicator.isActionLegal(action));
        }

        {
            // Legal.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.FIVE);
            assertTrue(adjudicator.isActionLegal(action));
        }

        {
            // Already a six in the row.
            final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.SIX);
            assertFalse(adjudicator.isActionLegal(action));
        }
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isGameOverComplete()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentComplete();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isGameOver(environment));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    // @Test
    // public void isActionLegalFalse()
    // {
    // // Setup.
    // final SudokuEnvironment environment = testData.createEnvironmentEasy();
    // final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
    // final SudokuAction action = new SudokuAction(environment, SudokuPosition.a1, SudokuToken.ONE);
    //
    // // Run.
    // final boolean result = adjudicator.isActionLegal(action);
    //
    // // Verify.
    // assertFalse(result);
    // }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    // @Test
    // public void isActionLegalTrue()
    // {
    // // Setup.
    // final SudokuEnvironment environment = testData.createEnvironmentEasy();
    // final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
    // final SudokuAction action = new SudokuAction(environment, SudokuPosition.c1, SudokuToken.ONE);
    //
    // // Run.
    // final boolean result = adjudicator.isActionLegal(action);
    //
    // // Verify.
    // assertTrue(result);
    // }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverEasy()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run.
        // final Set<SudokuToken> result = environment.getPossibleTokens(SudokuPosition.a1);
        final boolean result = adjudicator.isGameOver(environment);

        // Verify.
        // assertThat(result.size(), is(0));
        // assertTrue(result.contains(SudokuToken.ONE));
        assertFalse(result);
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverHard()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentHard();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run.
        final boolean result = adjudicator.isGameOver(environment);

        // Verify.
        assertFalse(result);
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverMedium()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();

        // Run.
        final boolean result = adjudicator.isGameOver(environment);

        // Verify.
        assertFalse(result);
    }
}
