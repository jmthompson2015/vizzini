package org.vizzini.example.boardgame.reversi;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.io.StringWriter;
import java.io.Writer;

import org.junit.Test;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides tests for the <code>ReversiPositionCodeGenerator</code> class.
 */
public final class ReversiPositionCodeGeneratorTest
{
    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndex()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new ReversiPositionCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.computeIndex(0, 0, 0), is(0));
        assertThat(codeGenerator.computeIndex(7, 0, 0), is(7));
        assertThat(codeGenerator.computeIndex(0, 7, 0), is(56));
        assertThat(codeGenerator.computeIndex(7, 7, 0), is(63));

        assertNull(codeGenerator.computeIndex(-1, 0, 0));
        assertNull(codeGenerator.computeIndex(0, -1, 0));
        assertNull(codeGenerator.computeIndex(0, 0, -1));
        assertNull(codeGenerator.computeIndex(8, 0, 0));
        assertNull(codeGenerator.computeIndex(0, 8, 0));
        assertNull(codeGenerator.computeIndex(0, 0, 8));
    }

    /**
     * Test the <code>createName()</code> method.
     */
    @Test
    public void createName()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new ReversiPositionCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.createName(0, 0, 0), is("a1"));
        assertThat(codeGenerator.createName(0, 7, 0), is("a8"));
        assertThat(codeGenerator.createName(7, 0, 0), is("h1"));
        assertThat(codeGenerator.createName(7, 7, 0), is("h8"));

        assertNull(codeGenerator.createName(-1, 0, 0));
        assertNull(codeGenerator.createName(0, -1, 0));
        assertNull(codeGenerator.createName(0, 0, -1));
        assertNull(codeGenerator.createName(8, 0, 0));
        assertNull(codeGenerator.createName(0, 8, 0));
        assertNull(codeGenerator.createName(0, 0, 8));
    }

    /**
     * Test the <code>generate()</code> method.
     */
    @Test
    public void generate()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new ReversiPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generate(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final ReversiPosition a1 = new ReversiPosition(\"a1\", 0, 0);\n\n/** Position. */\npublic static final ReversiPosition b1 = new ReversiPosition(\"b1\", 1, 0);\n\n/** Position. */\npublic static final ReversiPosition c1 = new ReversiPosition(\"c1\", 2, 0);\n\n/** Position. */\npublic static final ReversiPosition d1 = new ReversiPosition(\"d1\", 3, 0);\n\n/** Position. */\npublic static final ReversiPosition e1 = new ReversiPosition(\"e1\", 4, 0);\n\n/** Position. */\npublic static final ReversiPosition f1 = new ReversiPosition(\"f1\", 5, 0);\n\n/** Position. */\npublic static final ReversiPosition g1 = new ReversiPosition(\"g1\", 6, 0);\n\n/** Position. */\npublic static final ReversiPosition h1 = new ReversiPosition(\"h1\", 7, 0);\n\n/** Position. */\npublic static final ReversiPosition a2 = new ReversiPosition(\"a2\", 0, 1);\n\n/** Position. */\npublic static final ReversiPosition b2 = new ReversiPosition(\"b2\", 1, 1);\n\n/** Position. */\npublic static final ReversiPosition c2 = new ReversiPosition(\"c2\", 2, 1);\n\n/** Position. */\npublic static final ReversiPosition d2 = new ReversiPosition(\"d2\", 3, 1);\n\n/** Position. */\npublic static final ReversiPosition e2 = new ReversiPosition(\"e2\", 4, 1);\n\n/** Position. */\npublic static final ReversiPosition f2 = new ReversiPosition(\"f2\", 5, 1);\n\n/** Position. */\npublic static final ReversiPosition g2 = new ReversiPosition(\"g2\", 6, 1);\n\n/** Position. */\npublic static final ReversiPosition h2 = new ReversiPosition(\"h2\", 7, 1);\n\n/** Position. */\npublic static final ReversiPosition a3 = new ReversiPosition(\"a3\", 0, 2);\n\n/** Position. */\npublic static final ReversiPosition b3 = new ReversiPosition(\"b3\", 1, 2);\n\n/** Position. */\npublic static final ReversiPosition c3 = new ReversiPosition(\"c3\", 2, 2);\n\n/** Position. */\npublic static final ReversiPosition d3 = new ReversiPosition(\"d3\", 3, 2);\n\n/** Position. */\npublic static final ReversiPosition e3 = new ReversiPosition(\"e3\", 4, 2);\n\n/** Position. */\npublic static final ReversiPosition f3 = new ReversiPosition(\"f3\", 5, 2);\n\n/** Position. */\npublic static final ReversiPosition g3 = new ReversiPosition(\"g3\", 6, 2);\n\n/** Position. */\npublic static final ReversiPosition h3 = new ReversiPosition(\"h3\", 7, 2);\n\n/** Position. */\npublic static final ReversiPosition a4 = new ReversiPosition(\"a4\", 0, 3);\n\n/** Position. */\npublic static final ReversiPosition b4 = new ReversiPosition(\"b4\", 1, 3);\n\n/** Position. */\npublic static final ReversiPosition c4 = new ReversiPosition(\"c4\", 2, 3);\n\n/** Position. */\npublic static final ReversiPosition d4 = new ReversiPosition(\"d4\", 3, 3);\n\n/** Position. */\npublic static final ReversiPosition e4 = new ReversiPosition(\"e4\", 4, 3);\n\n/** Position. */\npublic static final ReversiPosition f4 = new ReversiPosition(\"f4\", 5, 3);\n\n/** Position. */\npublic static final ReversiPosition g4 = new ReversiPosition(\"g4\", 6, 3);\n\n/** Position. */\npublic static final ReversiPosition h4 = new ReversiPosition(\"h4\", 7, 3);\n\n/** Position. */\npublic static final ReversiPosition a5 = new ReversiPosition(\"a5\", 0, 4);\n\n/** Position. */\npublic static final ReversiPosition b5 = new ReversiPosition(\"b5\", 1, 4);\n\n/** Position. */\npublic static final ReversiPosition c5 = new ReversiPosition(\"c5\", 2, 4);\n\n/** Position. */\npublic static final ReversiPosition d5 = new ReversiPosition(\"d5\", 3, 4);\n\n/** Position. */\npublic static final ReversiPosition e5 = new ReversiPosition(\"e5\", 4, 4);\n\n/** Position. */\npublic static final ReversiPosition f5 = new ReversiPosition(\"f5\", 5, 4);\n\n/** Position. */\npublic static final ReversiPosition g5 = new ReversiPosition(\"g5\", 6, 4);\n\n/** Position. */\npublic static final ReversiPosition h5 = new ReversiPosition(\"h5\", 7, 4);\n\n/** Position. */\npublic static final ReversiPosition a6 = new ReversiPosition(\"a6\", 0, 5);\n\n/** Position. */\npublic static final ReversiPosition b6 = new ReversiPosition(\"b6\", 1, 5);\n\n/** Position. */\npublic static final ReversiPosition c6 = new ReversiPosition(\"c6\", 2, 5);\n\n/** Position. */\npublic static final ReversiPosition d6 = new ReversiPosition(\"d6\", 3, 5);\n\n/** Position. */\npublic static final ReversiPosition e6 = new ReversiPosition(\"e6\", 4, 5);\n\n/** Position. */\npublic static final ReversiPosition f6 = new ReversiPosition(\"f6\", 5, 5);\n\n/** Position. */\npublic static final ReversiPosition g6 = new ReversiPosition(\"g6\", 6, 5);\n\n/** Position. */\npublic static final ReversiPosition h6 = new ReversiPosition(\"h6\", 7, 5);\n\n/** Position. */\npublic static final ReversiPosition a7 = new ReversiPosition(\"a7\", 0, 6);\n\n/** Position. */\npublic static final ReversiPosition b7 = new ReversiPosition(\"b7\", 1, 6);\n\n/** Position. */\npublic static final ReversiPosition c7 = new ReversiPosition(\"c7\", 2, 6);\n\n/** Position. */\npublic static final ReversiPosition d7 = new ReversiPosition(\"d7\", 3, 6);\n\n/** Position. */\npublic static final ReversiPosition e7 = new ReversiPosition(\"e7\", 4, 6);\n\n/** Position. */\npublic static final ReversiPosition f7 = new ReversiPosition(\"f7\", 5, 6);\n\n/** Position. */\npublic static final ReversiPosition g7 = new ReversiPosition(\"g7\", 6, 6);\n\n/** Position. */\npublic static final ReversiPosition h7 = new ReversiPosition(\"h7\", 7, 6);\n\n/** Position. */\npublic static final ReversiPosition a8 = new ReversiPosition(\"a8\", 0, 7);\n\n/** Position. */\npublic static final ReversiPosition b8 = new ReversiPosition(\"b8\", 1, 7);\n\n/** Position. */\npublic static final ReversiPosition c8 = new ReversiPosition(\"c8\", 2, 7);\n\n/** Position. */\npublic static final ReversiPosition d8 = new ReversiPosition(\"d8\", 3, 7);\n\n/** Position. */\npublic static final ReversiPosition e8 = new ReversiPosition(\"e8\", 4, 7);\n\n/** Position. */\npublic static final ReversiPosition f8 = new ReversiPosition(\"f8\", 5, 7);\n\n/** Position. */\npublic static final ReversiPosition g8 = new ReversiPosition(\"g8\", 6, 7);\n\n/** Position. */\npublic static final ReversiPosition h8 = new ReversiPosition(\"h8\", 7, 7);\n\n/** Alternate position name. */\npublic static final ReversiPosition CENTER0 = d4;\n\n/** Alternate position name. */\npublic static final ReversiPosition CENTER1 = e4;\n\n/** Alternate position name. */\npublic static final ReversiPosition CENTER2 = d5;\n\n/** Alternate position name. */\npublic static final ReversiPosition CENTER3 = e5;\n\n/** Alternate position name. */\npublic static final ReversiPosition CORNER0 = a1;\n\n/** Alternate position name. */\npublic static final ReversiPosition CORNER1 = h1;\n\n/** Alternate position name. */\npublic static final ReversiPosition CORNER2 = a8;\n\n/** Alternate position name. */\npublic static final ReversiPosition CORNER3 = h8;\n\n/** Map of index to position. */\nprivate static final Map<Integer, ReversiPosition> INDEX_TO_POSITION = new TreeMap<Integer, ReversiPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, a1);\nINDEX_TO_POSITION.put(1, b1);\nINDEX_TO_POSITION.put(2, c1);\nINDEX_TO_POSITION.put(3, d1);\nINDEX_TO_POSITION.put(4, e1);\nINDEX_TO_POSITION.put(5, f1);\nINDEX_TO_POSITION.put(6, g1);\nINDEX_TO_POSITION.put(7, h1);\nINDEX_TO_POSITION.put(8, a2);\nINDEX_TO_POSITION.put(9, b2);\nINDEX_TO_POSITION.put(10, c2);\nINDEX_TO_POSITION.put(11, d2);\nINDEX_TO_POSITION.put(12, e2);\nINDEX_TO_POSITION.put(13, f2);\nINDEX_TO_POSITION.put(14, g2);\nINDEX_TO_POSITION.put(15, h2);\nINDEX_TO_POSITION.put(16, a3);\nINDEX_TO_POSITION.put(17, b3);\nINDEX_TO_POSITION.put(18, c3);\nINDEX_TO_POSITION.put(19, d3);\nINDEX_TO_POSITION.put(20, e3);\nINDEX_TO_POSITION.put(21, f3);\nINDEX_TO_POSITION.put(22, g3);\nINDEX_TO_POSITION.put(23, h3);\nINDEX_TO_POSITION.put(24, a4);\nINDEX_TO_POSITION.put(25, b4);\nINDEX_TO_POSITION.put(26, c4);\nINDEX_TO_POSITION.put(27, d4);\nINDEX_TO_POSITION.put(28, e4);\nINDEX_TO_POSITION.put(29, f4);\nINDEX_TO_POSITION.put(30, g4);\nINDEX_TO_POSITION.put(31, h4);\nINDEX_TO_POSITION.put(32, a5);\nINDEX_TO_POSITION.put(33, b5);\nINDEX_TO_POSITION.put(34, c5);\nINDEX_TO_POSITION.put(35, d5);\nINDEX_TO_POSITION.put(36, e5);\nINDEX_TO_POSITION.put(37, f5);\nINDEX_TO_POSITION.put(38, g5);\nINDEX_TO_POSITION.put(39, h5);\nINDEX_TO_POSITION.put(40, a6);\nINDEX_TO_POSITION.put(41, b6);\nINDEX_TO_POSITION.put(42, c6);\nINDEX_TO_POSITION.put(43, d6);\nINDEX_TO_POSITION.put(44, e6);\nINDEX_TO_POSITION.put(45, f6);\nINDEX_TO_POSITION.put(46, g6);\nINDEX_TO_POSITION.put(47, h6);\nINDEX_TO_POSITION.put(48, a7);\nINDEX_TO_POSITION.put(49, b7);\nINDEX_TO_POSITION.put(50, c7);\nINDEX_TO_POSITION.put(51, d7);\nINDEX_TO_POSITION.put(52, e7);\nINDEX_TO_POSITION.put(53, f7);\nINDEX_TO_POSITION.put(54, g7);\nINDEX_TO_POSITION.put(55, h7);\nINDEX_TO_POSITION.put(56, a8);\nINDEX_TO_POSITION.put(57, b8);\nINDEX_TO_POSITION.put(58, c8);\nINDEX_TO_POSITION.put(59, d8);\nINDEX_TO_POSITION.put(60, e8);\nINDEX_TO_POSITION.put(61, f8);\nINDEX_TO_POSITION.put(62, g8);\nINDEX_TO_POSITION.put(63, h8);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generateMap()</code> method.
     */
    @Test
    public void generateMap()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new ReversiPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generateMap(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Map of index to position. */\nprivate static final Map<Integer, ReversiPosition> INDEX_TO_POSITION = new TreeMap<Integer, ReversiPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, a1);\nINDEX_TO_POSITION.put(1, b1);\nINDEX_TO_POSITION.put(2, c1);\nINDEX_TO_POSITION.put(3, d1);\nINDEX_TO_POSITION.put(4, e1);\nINDEX_TO_POSITION.put(5, f1);\nINDEX_TO_POSITION.put(6, g1);\nINDEX_TO_POSITION.put(7, h1);\nINDEX_TO_POSITION.put(8, a2);\nINDEX_TO_POSITION.put(9, b2);\nINDEX_TO_POSITION.put(10, c2);\nINDEX_TO_POSITION.put(11, d2);\nINDEX_TO_POSITION.put(12, e2);\nINDEX_TO_POSITION.put(13, f2);\nINDEX_TO_POSITION.put(14, g2);\nINDEX_TO_POSITION.put(15, h2);\nINDEX_TO_POSITION.put(16, a3);\nINDEX_TO_POSITION.put(17, b3);\nINDEX_TO_POSITION.put(18, c3);\nINDEX_TO_POSITION.put(19, d3);\nINDEX_TO_POSITION.put(20, e3);\nINDEX_TO_POSITION.put(21, f3);\nINDEX_TO_POSITION.put(22, g3);\nINDEX_TO_POSITION.put(23, h3);\nINDEX_TO_POSITION.put(24, a4);\nINDEX_TO_POSITION.put(25, b4);\nINDEX_TO_POSITION.put(26, c4);\nINDEX_TO_POSITION.put(27, d4);\nINDEX_TO_POSITION.put(28, e4);\nINDEX_TO_POSITION.put(29, f4);\nINDEX_TO_POSITION.put(30, g4);\nINDEX_TO_POSITION.put(31, h4);\nINDEX_TO_POSITION.put(32, a5);\nINDEX_TO_POSITION.put(33, b5);\nINDEX_TO_POSITION.put(34, c5);\nINDEX_TO_POSITION.put(35, d5);\nINDEX_TO_POSITION.put(36, e5);\nINDEX_TO_POSITION.put(37, f5);\nINDEX_TO_POSITION.put(38, g5);\nINDEX_TO_POSITION.put(39, h5);\nINDEX_TO_POSITION.put(40, a6);\nINDEX_TO_POSITION.put(41, b6);\nINDEX_TO_POSITION.put(42, c6);\nINDEX_TO_POSITION.put(43, d6);\nINDEX_TO_POSITION.put(44, e6);\nINDEX_TO_POSITION.put(45, f6);\nINDEX_TO_POSITION.put(46, g6);\nINDEX_TO_POSITION.put(47, h6);\nINDEX_TO_POSITION.put(48, a7);\nINDEX_TO_POSITION.put(49, b7);\nINDEX_TO_POSITION.put(50, c7);\nINDEX_TO_POSITION.put(51, d7);\nINDEX_TO_POSITION.put(52, e7);\nINDEX_TO_POSITION.put(53, f7);\nINDEX_TO_POSITION.put(54, g7);\nINDEX_TO_POSITION.put(55, h7);\nINDEX_TO_POSITION.put(56, a8);\nINDEX_TO_POSITION.put(57, b8);\nINDEX_TO_POSITION.put(58, c8);\nINDEX_TO_POSITION.put(59, d8);\nINDEX_TO_POSITION.put(60, e8);\nINDEX_TO_POSITION.put(61, f8);\nINDEX_TO_POSITION.put(62, g8);\nINDEX_TO_POSITION.put(63, h8);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generatePositions()</code> method.
     */
    @Test
    public void generatePositions()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new ReversiPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generatePositions(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final ReversiPosition a1 = new ReversiPosition(\"a1\", 0, 0);\n\n/** Position. */\npublic static final ReversiPosition b1 = new ReversiPosition(\"b1\", 1, 0);\n\n/** Position. */\npublic static final ReversiPosition c1 = new ReversiPosition(\"c1\", 2, 0);\n\n/** Position. */\npublic static final ReversiPosition d1 = new ReversiPosition(\"d1\", 3, 0);\n\n/** Position. */\npublic static final ReversiPosition e1 = new ReversiPosition(\"e1\", 4, 0);\n\n/** Position. */\npublic static final ReversiPosition f1 = new ReversiPosition(\"f1\", 5, 0);\n\n/** Position. */\npublic static final ReversiPosition g1 = new ReversiPosition(\"g1\", 6, 0);\n\n/** Position. */\npublic static final ReversiPosition h1 = new ReversiPosition(\"h1\", 7, 0);\n\n/** Position. */\npublic static final ReversiPosition a2 = new ReversiPosition(\"a2\", 0, 1);\n\n/** Position. */\npublic static final ReversiPosition b2 = new ReversiPosition(\"b2\", 1, 1);\n\n/** Position. */\npublic static final ReversiPosition c2 = new ReversiPosition(\"c2\", 2, 1);\n\n/** Position. */\npublic static final ReversiPosition d2 = new ReversiPosition(\"d2\", 3, 1);\n\n/** Position. */\npublic static final ReversiPosition e2 = new ReversiPosition(\"e2\", 4, 1);\n\n/** Position. */\npublic static final ReversiPosition f2 = new ReversiPosition(\"f2\", 5, 1);\n\n/** Position. */\npublic static final ReversiPosition g2 = new ReversiPosition(\"g2\", 6, 1);\n\n/** Position. */\npublic static final ReversiPosition h2 = new ReversiPosition(\"h2\", 7, 1);\n\n/** Position. */\npublic static final ReversiPosition a3 = new ReversiPosition(\"a3\", 0, 2);\n\n/** Position. */\npublic static final ReversiPosition b3 = new ReversiPosition(\"b3\", 1, 2);\n\n/** Position. */\npublic static final ReversiPosition c3 = new ReversiPosition(\"c3\", 2, 2);\n\n/** Position. */\npublic static final ReversiPosition d3 = new ReversiPosition(\"d3\", 3, 2);\n\n/** Position. */\npublic static final ReversiPosition e3 = new ReversiPosition(\"e3\", 4, 2);\n\n/** Position. */\npublic static final ReversiPosition f3 = new ReversiPosition(\"f3\", 5, 2);\n\n/** Position. */\npublic static final ReversiPosition g3 = new ReversiPosition(\"g3\", 6, 2);\n\n/** Position. */\npublic static final ReversiPosition h3 = new ReversiPosition(\"h3\", 7, 2);\n\n/** Position. */\npublic static final ReversiPosition a4 = new ReversiPosition(\"a4\", 0, 3);\n\n/** Position. */\npublic static final ReversiPosition b4 = new ReversiPosition(\"b4\", 1, 3);\n\n/** Position. */\npublic static final ReversiPosition c4 = new ReversiPosition(\"c4\", 2, 3);\n\n/** Position. */\npublic static final ReversiPosition d4 = new ReversiPosition(\"d4\", 3, 3);\n\n/** Position. */\npublic static final ReversiPosition e4 = new ReversiPosition(\"e4\", 4, 3);\n\n/** Position. */\npublic static final ReversiPosition f4 = new ReversiPosition(\"f4\", 5, 3);\n\n/** Position. */\npublic static final ReversiPosition g4 = new ReversiPosition(\"g4\", 6, 3);\n\n/** Position. */\npublic static final ReversiPosition h4 = new ReversiPosition(\"h4\", 7, 3);\n\n/** Position. */\npublic static final ReversiPosition a5 = new ReversiPosition(\"a5\", 0, 4);\n\n/** Position. */\npublic static final ReversiPosition b5 = new ReversiPosition(\"b5\", 1, 4);\n\n/** Position. */\npublic static final ReversiPosition c5 = new ReversiPosition(\"c5\", 2, 4);\n\n/** Position. */\npublic static final ReversiPosition d5 = new ReversiPosition(\"d5\", 3, 4);\n\n/** Position. */\npublic static final ReversiPosition e5 = new ReversiPosition(\"e5\", 4, 4);\n\n/** Position. */\npublic static final ReversiPosition f5 = new ReversiPosition(\"f5\", 5, 4);\n\n/** Position. */\npublic static final ReversiPosition g5 = new ReversiPosition(\"g5\", 6, 4);\n\n/** Position. */\npublic static final ReversiPosition h5 = new ReversiPosition(\"h5\", 7, 4);\n\n/** Position. */\npublic static final ReversiPosition a6 = new ReversiPosition(\"a6\", 0, 5);\n\n/** Position. */\npublic static final ReversiPosition b6 = new ReversiPosition(\"b6\", 1, 5);\n\n/** Position. */\npublic static final ReversiPosition c6 = new ReversiPosition(\"c6\", 2, 5);\n\n/** Position. */\npublic static final ReversiPosition d6 = new ReversiPosition(\"d6\", 3, 5);\n\n/** Position. */\npublic static final ReversiPosition e6 = new ReversiPosition(\"e6\", 4, 5);\n\n/** Position. */\npublic static final ReversiPosition f6 = new ReversiPosition(\"f6\", 5, 5);\n\n/** Position. */\npublic static final ReversiPosition g6 = new ReversiPosition(\"g6\", 6, 5);\n\n/** Position. */\npublic static final ReversiPosition h6 = new ReversiPosition(\"h6\", 7, 5);\n\n/** Position. */\npublic static final ReversiPosition a7 = new ReversiPosition(\"a7\", 0, 6);\n\n/** Position. */\npublic static final ReversiPosition b7 = new ReversiPosition(\"b7\", 1, 6);\n\n/** Position. */\npublic static final ReversiPosition c7 = new ReversiPosition(\"c7\", 2, 6);\n\n/** Position. */\npublic static final ReversiPosition d7 = new ReversiPosition(\"d7\", 3, 6);\n\n/** Position. */\npublic static final ReversiPosition e7 = new ReversiPosition(\"e7\", 4, 6);\n\n/** Position. */\npublic static final ReversiPosition f7 = new ReversiPosition(\"f7\", 5, 6);\n\n/** Position. */\npublic static final ReversiPosition g7 = new ReversiPosition(\"g7\", 6, 6);\n\n/** Position. */\npublic static final ReversiPosition h7 = new ReversiPosition(\"h7\", 7, 6);\n\n/** Position. */\npublic static final ReversiPosition a8 = new ReversiPosition(\"a8\", 0, 7);\n\n/** Position. */\npublic static final ReversiPosition b8 = new ReversiPosition(\"b8\", 1, 7);\n\n/** Position. */\npublic static final ReversiPosition c8 = new ReversiPosition(\"c8\", 2, 7);\n\n/** Position. */\npublic static final ReversiPosition d8 = new ReversiPosition(\"d8\", 3, 7);\n\n/** Position. */\npublic static final ReversiPosition e8 = new ReversiPosition(\"e8\", 4, 7);\n\n/** Position. */\npublic static final ReversiPosition f8 = new ReversiPosition(\"f8\", 5, 7);\n\n/** Position. */\npublic static final ReversiPosition g8 = new ReversiPosition(\"g8\", 6, 7);\n\n/** Position. */\npublic static final ReversiPosition h8 = new ReversiPosition(\"h8\", 7, 7);\n";
        assertThat(result, is(expected));
    }
}
