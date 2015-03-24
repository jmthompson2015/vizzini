package org.vizzini.swingui.game.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.core.game.Agent;
import org.vizzini.example.boardgame.reversi.ReversiTeam;

/**
 * Provides tests for the <code>MouseAgent</code> class.
 */
public final class MouseAgentTest
{
    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Agent token0 = create0();
        final Agent token1 = create1();
        final Agent token2 = create0();

        assertTrue(token0.equals(token0));
        assertFalse(token0.equals(token1));
        assertTrue(token0.equals(token2));

        assertFalse(token1.equals(token0));
        assertTrue(token1.equals(token1));
        assertFalse(token1.equals(token2));

        assertTrue(token2.equals(token0));
        assertFalse(token2.equals(token1));
        assertTrue(token2.equals(token2));

        assertFalse(token0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Agent token0 = create0();
        final Agent token1 = create1();
        final Agent token2 = create0();

        assertTrue(token0.hashCode() == token0.hashCode());
        assertFalse(token0.hashCode() == token1.hashCode());
        assertTrue(token0.hashCode() == token2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToString()
    {
        final Agent token0 = create0();

        final String result = token0.toString();

        assertNotNull(result);
        final String expected = "MouseAgent[name=token0,team=ReversiTeam[description=team black,name=Black]]";
        assertThat(result, is(expected));
    }

    /**
     * @return a new agent.
     */
    private Agent create0()
    {
        return new MouseAgent("token0", "some token 0", ReversiTeam.BLACK);
    }

    /**
     * @return a new agent.
     */
    private Agent create1()
    {
        return new MouseAgent("token1", "some token 1", ReversiTeam.WHITE);
    }
}
