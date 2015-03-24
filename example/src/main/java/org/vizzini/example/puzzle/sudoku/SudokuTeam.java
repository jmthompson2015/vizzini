package org.vizzini.example.puzzle.sudoku;

import org.vizzini.core.game.Team;

/**
 * Provides a team for Sudoku.
 */
public class SudokuTeam implements Team
{
    /** Team. */
    public static final SudokuTeam TEAM = new SudokuTeam();

    /**
     * Construct this object.
     */
    private SudokuTeam()
    {
        // Nothing to do.
    }

    @Override
    public String getDescription()
    {
        return "A puzzler team.";
    }

    @Override
    public String getName()
    {
        return "Puzzler";
    }
}
