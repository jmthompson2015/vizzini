package org.vizzini.example.puzzle.sudoku;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Ignore;
import org.junit.Test;

/**
 * Test the ability to solve puzzles.
 */
public class SolvePuzzleIntegrationTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test.
     */
    @Test
    public void solvePuzzleEasy()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentEasy();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
        final SimpleAgent agent = new SimpleAgent();

        // Run.
        solve("Easy", environment, adjudicator, agent);
    }

    /**
     * Test.
     */
    @Ignore
    @Test
    public void solvePuzzleHard()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentHard();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
        final SimpleAgent agent = new SimpleAgent();

        // Run.
        solve("Hard", environment, adjudicator, agent);
    }

    /**
     * Test.
     */
    @Test
    public void solvePuzzleMedium()
    {
        // Setup.
        final SudokuEnvironment environment = testData.createEnvironmentMedium();
        final SudokuAdjudicator adjudicator = new SudokuAdjudicator();
        final SimpleAgent agent = new SimpleAgent();

        // Run.
        solve("Medium", environment, adjudicator, agent);
    }

    /**
     * @param title Title.
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     */
    private void solve(final String title, final SudokuEnvironment environment, final SudokuAdjudicator adjudicator,
            final SimpleAgent agent)
    {
        // System.out.println(title + "\n" + environment);
        // System.out.println(title + " environment.getTokenCount() = " + environment.getTokenCount());

        while (!adjudicator.isGameOver(environment))
        {
            final SudokuAction action = agent.getAction(environment, adjudicator);
            assertNotNull(action);
            action.doIt();
        }

        // System.out.println(title + "\n" + environment);
        // System.out.println(title + " environment.getTokenCount() = " + environment.getTokenCount());

        assertThat(environment.getTokenCount(), is(81));
    }
}
