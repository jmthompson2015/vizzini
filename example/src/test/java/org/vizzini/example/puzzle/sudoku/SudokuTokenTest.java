package org.vizzini.example.puzzle.sudoku;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>SudokuToken</code> class.
 */
public class SudokuTokenTest
{
    /**
     * Test the <code>findByName()</code> method.
     */
    @Test
    public void findByName()
    {
        assertThat(SudokuToken.findByName("1"), is(SudokuToken.ONE));
        assertThat(SudokuToken.findByName("2"), is(SudokuToken.TWO));
        assertThat(SudokuToken.findByName("3"), is(SudokuToken.THREE));
        assertThat(SudokuToken.findByName("4"), is(SudokuToken.FOUR));
        assertThat(SudokuToken.findByName("5"), is(SudokuToken.FIVE));
        assertThat(SudokuToken.findByName("6"), is(SudokuToken.SIX));
        assertThat(SudokuToken.findByName("7"), is(SudokuToken.SEVEN));
        assertThat(SudokuToken.findByName("8"), is(SudokuToken.EIGHT));
        assertThat(SudokuToken.findByName("9"), is(SudokuToken.NINE));
    }
}
