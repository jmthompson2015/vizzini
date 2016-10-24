package org.vizzini.example.puzzle.sudoku;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>SudokuPosition</code> class.
 */
public class SudokuPositionTest
{
    /**
     * Test the <code>getBlock()</code> method.
     */
    @Test
    public void getBlock()
    {
        assertThat(SudokuPosition.a1.getBlock(), is(0));
        assertThat(SudokuPosition.a2.getBlock(), is(0));
        assertThat(SudokuPosition.a3.getBlock(), is(0));
        assertThat(SudokuPosition.b1.getBlock(), is(0));
        assertThat(SudokuPosition.b2.getBlock(), is(0));
        assertThat(SudokuPosition.b3.getBlock(), is(0));
        assertThat(SudokuPosition.c1.getBlock(), is(0));
        assertThat(SudokuPosition.c2.getBlock(), is(0));
        assertThat(SudokuPosition.c3.getBlock(), is(0));

        assertThat(SudokuPosition.d1.getBlock(), is(1));
        assertThat(SudokuPosition.e1.getBlock(), is(1));
        assertThat(SudokuPosition.f1.getBlock(), is(1));

        assertThat(SudokuPosition.g1.getBlock(), is(2));
        assertThat(SudokuPosition.h1.getBlock(), is(2));
        assertThat(SudokuPosition.i1.getBlock(), is(2));

        assertThat(SudokuPosition.a4.getBlock(), is(3));
        assertThat(SudokuPosition.b4.getBlock(), is(3));
        assertThat(SudokuPosition.c4.getBlock(), is(3));

        assertThat(SudokuPosition.d5.getBlock(), is(4));
        assertThat(SudokuPosition.e5.getBlock(), is(4));
        assertThat(SudokuPosition.f5.getBlock(), is(4));

        assertThat(SudokuPosition.g5.getBlock(), is(5));
        assertThat(SudokuPosition.h5.getBlock(), is(5));
        assertThat(SudokuPosition.i5.getBlock(), is(5));

        assertThat(SudokuPosition.a9.getBlock(), is(6));
        assertThat(SudokuPosition.b9.getBlock(), is(6));
        assertThat(SudokuPosition.c9.getBlock(), is(6));

        assertThat(SudokuPosition.d9.getBlock(), is(7));
        assertThat(SudokuPosition.e9.getBlock(), is(7));
        assertThat(SudokuPosition.f9.getBlock(), is(7));

        assertThat(SudokuPosition.g9.getBlock(), is(8));
        assertThat(SudokuPosition.h9.getBlock(), is(8));
        assertThat(SudokuPosition.i9.getBlock(), is(8));
    }

    /**
     * Test the <code>getX()</code> method.
     */
    @Test
    public void getX()
    {
        assertThat(SudokuPosition.a1.getX(), is(0));
        assertThat(SudokuPosition.a2.getX(), is(0));
        assertThat(SudokuPosition.a3.getX(), is(0));
        assertThat(SudokuPosition.a4.getX(), is(0));

        assertThat(SudokuPosition.b1.getX(), is(1));
        assertThat(SudokuPosition.b2.getX(), is(1));
        assertThat(SudokuPosition.b3.getX(), is(1));
        assertThat(SudokuPosition.b4.getX(), is(1));
    }

    /**
     * Test the <code>getY()</code> method.
     */
    @Test
    public void getY()
    {
        assertThat(SudokuPosition.a1.getY(), is(0));
        assertThat(SudokuPosition.a2.getY(), is(1));
        assertThat(SudokuPosition.a3.getY(), is(2));
        assertThat(SudokuPosition.a4.getY(), is(3));

        assertThat(SudokuPosition.b1.getY(), is(0));
        assertThat(SudokuPosition.b2.getY(), is(1));
        assertThat(SudokuPosition.b3.getY(), is(2));
        assertThat(SudokuPosition.b4.getY(), is(3));
    }

    /**
     * Test the <code>values()</code> method.
     */
    @Test
    public void values()
    {
        final SudokuPosition[] values = SudokuPosition.values();

        assertNotNull(values);
        assertThat(values.length, is(81));

        for (int i = 0; i < 81; i++)
        {
            assertThat(values[i].getIndex(), is(i));
        }
    }

    /**
     * Test the <code>valuesByBlock()</code> method.
     */
    @Test
    public void valuesByBlock()
    {
        for (int block = 0; block < SudokuPosition.MAX_BLOCK; block++)
        {
            final SudokuPosition[] values = SudokuPosition.valuesByBlock(block);
            assertThat(values.length, is(9));

            for (final SudokuPosition position : values)
            {
                assertThat(position.getBlock(), is(block));
            }
        }
    }

    /**
     * Test the <code>valuesByBlock()</code> method.
     */
    @Test
    public void valuesByBlockOutOfRange()
    {
        int block = -1;

        try
        {
            SudokuPosition.valuesByBlock(block);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("block out of bounds [0, 9]: -1"));
        }

        block = 10;

        try
        {
            SudokuPosition.valuesByBlock(block);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("block out of bounds [0, 9]: 10"));
        }
    }

    /**
     * Test the <code>valuesByFile()</code> method.
     */
    @Test
    public void valuesByFile()
    {
        for (int file = 0; file < SudokuPosition.MAX_X; file++)
        {
            final SudokuPosition[] values = SudokuPosition.valuesByFile(file);
            assertThat(values.length, is(9));

            for (final SudokuPosition position : values)
            {
                assertThat(position.getX(), is(file));
            }
        }
    }

    /**
     * Test the <code>valuesByFile()</code> method.
     */
    @Test
    public void valuesByFileOutOfRange()
    {
        int file = -1;

        try
        {
            SudokuPosition.valuesByFile(file);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("file out of bounds [0, 9]: -1"));
        }

        file = 10;

        try
        {
            SudokuPosition.valuesByFile(file);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("file out of bounds [0, 9]: 10"));
        }
    }

    /**
     * Test the <code>valuesByRank()</code> method.
     */
    @Test
    public void valuesByRank()
    {
        for (int rank = 0; rank < SudokuPosition.MAX_Y; rank++)
        {
            final SudokuPosition[] values = SudokuPosition.valuesByRank(rank);
            assertThat(values.length, is(9));

            for (final SudokuPosition position : values)
            {
                assertThat(position.getY(), is(rank));
            }
        }
    }

    /**
     * Test the <code>valuesByRank()</code> method.
     */
    @Test
    public void valuesByRankOutOfRange()
    {
        int rank = -1;

        try
        {
            SudokuPosition.valuesByRank(rank);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("rank out of bounds [0, 9]: -1"));
        }

        rank = 10;

        try
        {
            SudokuPosition.valuesByRank(rank);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("rank out of bounds [0, 9]: 10"));
        }
    }
}
