package org.vizzini.example.puzzle.sudoku;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>SimpleAgent</code> class.
 */
public class SimpleAgentTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionEasy()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
        final SimpleAgent agent = new SimpleAgent();

        // Run.
        final SudokuAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPosition(), is(SudokuPosition.g9));
        assertThat(result.getToken(), is(SudokuToken.TWO));
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionHard()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentHard();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
        final SimpleAgent agent = new SimpleAgent();

        // Run.
        final SudokuAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPosition(), is(SudokuPosition.e4));
        assertThat(result.getToken(), is(SudokuToken.SEVEN));

        // assertNull(result);
    }

    /**
     * Test the <code>getAction()</code> method.
     */
    @Test
    public void getActionMedium()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
        final SimpleAgent agent = new SimpleAgent();

        // Run.
        final SudokuAction result = agent.getAction(environment, adjudicator);

        // Verify.
        assertNotNull(result);
        assertThat(result.getPosition(), is(SudokuPosition.h8));
        assertThat(result.getToken(), is(SudokuToken.ONE));
    }
}
