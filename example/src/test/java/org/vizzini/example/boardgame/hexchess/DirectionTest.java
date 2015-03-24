package org.vizzini.example.boardgame.hexchess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>Direction</code> class.
 */
public final class DirectionTest
{
    /**
     * Test the <code>findByComponents()</code> method.
     */
    @Test
    public void findByComponents()
    {
        assertThat(Direction.findByComponents(1, -1, 0), is(Direction.X_PLUS));
        assertThat(Direction.findByComponents(1, 0, -1), is(Direction.Y_PLUS));
        assertThat(Direction.findByComponents(0, 1, -1), is(Direction.Z_PLUS));
    }

    /**
     * Test the <code>getBiaxialDirections()</code> method.
     */
    @Test
    public void getBiaxialDirections()
    {
        final Direction[] result = Direction.getBiaxialDirections();

        assertThat(result.length, is(6));

        for (final Direction d : result)
        {
            final int dx = d.getDx();
            final int dy = d.getDy();
            final int dz = d.getDz();

            assertTrue(d.name(), ((dx == dy) && (Math.abs(dz) == 2)) || ((dx == dz) && (Math.abs(dy) == 2))
                    || ((dy == dz) && (Math.abs(dx) == 2)));
        }
    }

    /**
     * Test the <code>getUniaxialDirections()</code> method.
     */
    @Test
    public void getUniaxialDirections()
    {
        final Direction[] result = Direction.getUniaxialDirections();

        assertThat(result.length, is(6));

        for (final Direction d : result)
        {
            // {
            // final int dx = Math.abs(d.getDx());
            // final int dy = Math.abs(d.getDy());
            // final int dz = Math.abs(d.getDz());
            //
            // assertTrue(d.name(), ((dx == 1) && (dy == 1) && (dz == 0)) || ((dx == 1) && (dy == 0) && (dz == 1))
            // || ((dx == 0) && (dy == 1) && (dz == 1)));
            // }
            // {
            final int dx = d.getDx();
            final int dy = d.getDy();
            final int dz = d.getDz();

            assertTrue(d.name(), (((dx + dy) == 0) && (dz == 0)) || (((dx + dz) == 0) && (dy == 0))
                    || (((dy + dz) == 0) && (dx == 0)));
            // }
        }
    }

    /**
     * Test the <code>getDx()</code> method.
     */
    @Test
    public void sumIsZero()
    {
        for (final Direction d : Direction.values())
        {
            final int sum = d.getDx() + d.getDy() + d.getDz();
            assertThat(d.name(), sum, is(0));
        }
    }
}
