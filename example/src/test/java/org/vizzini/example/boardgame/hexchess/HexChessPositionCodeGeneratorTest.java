package org.vizzini.example.boardgame.hexchess;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;

/**
 * Provides tests for the <code>HexChessPositionCodeGenerator</code> class.
 */
public final class HexChessPositionCodeGeneratorTest
{
    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndex()
    {
        // Setup.
        final HexChessPositionCodeGenerator codeGenerator = new HexChessPositionCodeGenerator();

        // Run / Verify.
        // Bottom perimeter.
        assertThat(codeGenerator.computeIndex(-5, 5), is(0));
        assertThat(codeGenerator.computeIndex(-4, 5), is(1));
        assertThat(codeGenerator.computeIndex(-3, 5), is(2));
        assertThat(codeGenerator.computeIndex(-2, 5), is(3));
        assertThat(codeGenerator.computeIndex(-1, 5), is(4));
        assertThat(codeGenerator.computeIndex(0, 5), is(5));
        assertThat(codeGenerator.computeIndex(1, 4), is(17));
        assertThat(codeGenerator.computeIndex(2, 3), is(29));
        assertThat(codeGenerator.computeIndex(3, 2), is(41));
        assertThat(codeGenerator.computeIndex(4, 1), is(53));
        assertThat(codeGenerator.computeIndex(5, 0), is(65));

        // Center.
        assertThat(codeGenerator.computeIndex(0, 0), is(60));

        // Top perimeter.
        assertThat(codeGenerator.computeIndex(-5, 0), is(55));
        assertThat(codeGenerator.computeIndex(-4, -1), is(67));
        assertThat(codeGenerator.computeIndex(-3, -2), is(79));
        assertThat(codeGenerator.computeIndex(-2, -3), is(91));
        assertThat(codeGenerator.computeIndex(-1, -4), is(103));
        assertThat(codeGenerator.computeIndex(0, -5), is(115));
        assertThat(codeGenerator.computeIndex(1, -5), is(116));
        assertThat(codeGenerator.computeIndex(2, -5), is(117));
        assertThat(codeGenerator.computeIndex(3, -5), is(118));
        assertThat(codeGenerator.computeIndex(4, -5), is(119));
        assertThat(codeGenerator.computeIndex(5, -5), is(120));
    }

    /**
     * Test the <code>createName()</code> method.
     */
    @Test
    public void createName()
    {
        // Setup.
        final HexChessPositionCodeGenerator codeGenerator = new HexChessPositionCodeGenerator();

        // Run / Verify.
        // Bottom perimeter.
        assertThat(codeGenerator.createName(-5, 5), is("a1"));
        assertThat(codeGenerator.createName(-4, 5), is("b1"));
        assertThat(codeGenerator.createName(-3, 5), is("c1"));
        assertThat(codeGenerator.createName(-2, 5), is("d1"));
        assertThat(codeGenerator.createName(-1, 5), is("e1"));
        assertThat(codeGenerator.createName(0, 5), is("f1"));
        assertThat(codeGenerator.createName(1, 4), is("g1"));
        assertThat(codeGenerator.createName(2, 3), is("h1"));
        assertThat(codeGenerator.createName(3, 2), is("i1"));
        assertThat(codeGenerator.createName(4, 1), is("k1"));
        assertThat(codeGenerator.createName(5, 0), is("l1"));

        // Center.
        assertThat(codeGenerator.createName(0, 0), is("f6"));

        // Top perimeter.
        assertThat(codeGenerator.createName(-5, 0), is("a6"));
        assertThat(codeGenerator.createName(-4, -1), is("b7"));
        assertThat(codeGenerator.createName(-3, -2), is("c8"));
        assertThat(codeGenerator.createName(-2, -3), is("d9"));
        assertThat(codeGenerator.createName(-1, -4), is("e10"));
        assertThat(codeGenerator.createName(0, -5), is("f11"));
        assertThat(codeGenerator.createName(1, -5), is("g10"));
        assertThat(codeGenerator.createName(2, -5), is("h9"));
        assertThat(codeGenerator.createName(3, -5), is("i8"));
        assertThat(codeGenerator.createName(4, -5), is("k7"));
        assertThat(codeGenerator.createName(5, -5), is("l6"));
    }

    /**
     * Test the <code>isUsable()</code> method.
     */
    @Test
    public void isUsable()
    {
        // Setup.
        final HexChessPositionCodeGenerator codeGenerator = new HexChessPositionCodeGenerator();

        // Run / Verify.
        // Bottom perimeter.
        assertTrue(codeGenerator.isUsable(-5, 5));
        assertTrue(codeGenerator.isUsable(-4, 5));
        assertTrue(codeGenerator.isUsable(-3, 5));
        assertTrue(codeGenerator.isUsable(-2, 5));
        assertTrue(codeGenerator.isUsable(-1, 5));
        assertTrue(codeGenerator.isUsable(0, 5));
        assertTrue(codeGenerator.isUsable(1, 4));
        assertTrue(codeGenerator.isUsable(2, 3));
        assertTrue(codeGenerator.isUsable(3, 2));
        assertTrue(codeGenerator.isUsable(4, 1));
        assertTrue(codeGenerator.isUsable(5, 0));

        // Center.
        assertTrue(codeGenerator.isUsable(0, 0));

        // Top perimeter.
        assertTrue(codeGenerator.isUsable(-5, 0));
        assertTrue(codeGenerator.isUsable(-4, -1));
        assertTrue(codeGenerator.isUsable(-3, -2));
        assertTrue(codeGenerator.isUsable(-2, -3));
        assertTrue(codeGenerator.isUsable(-1, -4));
        assertTrue(codeGenerator.isUsable(0, -5));
        assertTrue(codeGenerator.isUsable(1, -5));
        assertTrue(codeGenerator.isUsable(2, -5));
        assertTrue(codeGenerator.isUsable(3, -5));
        assertTrue(codeGenerator.isUsable(4, -5));
        assertTrue(codeGenerator.isUsable(5, -5));
    }
}
