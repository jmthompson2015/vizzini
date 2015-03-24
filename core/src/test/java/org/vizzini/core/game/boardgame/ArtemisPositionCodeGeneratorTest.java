package org.vizzini.core.game.boardgame;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.io.StringWriter;
import java.io.Writer;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultPositionCodeGenerator</code> class.
 */
public final class ArtemisPositionCodeGeneratorTest
{
    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndex()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = createCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.computeIndex(0, 0, 0), is(0));
        assertThat(codeGenerator.computeIndex(3, 0, 0), is(3));
        assertThat(codeGenerator.computeIndex(0, 3, 0), is(12));
        assertThat(codeGenerator.computeIndex(0, 0, 3), is(48));
        assertThat(codeGenerator.computeIndex(3, 3, 0), is(15));
        assertThat(codeGenerator.computeIndex(3, 0, 3), is(51));
        assertThat(codeGenerator.computeIndex(0, 3, 3), is(60));
        assertThat(codeGenerator.computeIndex(3, 3, 3), is(63));

        assertNull(codeGenerator.computeIndex(-1, 0, 0));
        assertNull(codeGenerator.computeIndex(0, -1, 0));
        assertNull(codeGenerator.computeIndex(0, 0, -1));
        assertNull(codeGenerator.computeIndex(4, 0, 0));
        assertNull(codeGenerator.computeIndex(0, 4, 0));
        assertNull(codeGenerator.computeIndex(0, 0, 4));
    }

    /**
     * Test the <code>createName()</code> method.
     */
    @Test
    public void createName()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = createCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.createName(0, 0, 0), is("a1A"));
        assertThat(codeGenerator.createName(3, 0, 0), is("d1A"));
        assertThat(codeGenerator.createName(0, 3, 0), is("a4A"));
        assertThat(codeGenerator.createName(0, 0, 3), is("a1D"));
        assertThat(codeGenerator.createName(3, 3, 0), is("d4A"));
        assertThat(codeGenerator.createName(3, 0, 3), is("d1D"));
        assertThat(codeGenerator.createName(0, 3, 3), is("a4D"));
        assertThat(codeGenerator.createName(3, 3, 3), is("d4D"));

        assertNull(codeGenerator.createName(-1, 0, 0));
        assertNull(codeGenerator.createName(0, -1, 0));
        assertNull(codeGenerator.createName(0, 0, -1));
        assertNull(codeGenerator.createName(4, 0, 0));
        assertNull(codeGenerator.createName(0, 4, 0));
        assertNull(codeGenerator.createName(0, 0, 4));
    }

    /**
     * Test the <code>generate()</code> method.
     */
    @Test
    public void generate()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = createCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generate(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final ArtemisPosition a1A = new ArtemisPosition(\"a1A\", 0, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition b1A = new ArtemisPosition(\"b1A\", 1, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition c1A = new ArtemisPosition(\"c1A\", 2, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition d1A = new ArtemisPosition(\"d1A\", 3, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition a2A = new ArtemisPosition(\"a2A\", 0, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition b2A = new ArtemisPosition(\"b2A\", 1, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition c2A = new ArtemisPosition(\"c2A\", 2, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition d2A = new ArtemisPosition(\"d2A\", 3, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition a3A = new ArtemisPosition(\"a3A\", 0, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition b3A = new ArtemisPosition(\"b3A\", 1, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition c3A = new ArtemisPosition(\"c3A\", 2, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition d3A = new ArtemisPosition(\"d3A\", 3, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition a4A = new ArtemisPosition(\"a4A\", 0, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition b4A = new ArtemisPosition(\"b4A\", 1, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition c4A = new ArtemisPosition(\"c4A\", 2, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition d4A = new ArtemisPosition(\"d4A\", 3, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition a1B = new ArtemisPosition(\"a1B\", 0, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition b1B = new ArtemisPosition(\"b1B\", 1, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition c1B = new ArtemisPosition(\"c1B\", 2, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition d1B = new ArtemisPosition(\"d1B\", 3, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition a2B = new ArtemisPosition(\"a2B\", 0, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition b2B = new ArtemisPosition(\"b2B\", 1, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition c2B = new ArtemisPosition(\"c2B\", 2, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition d2B = new ArtemisPosition(\"d2B\", 3, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition a3B = new ArtemisPosition(\"a3B\", 0, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition b3B = new ArtemisPosition(\"b3B\", 1, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition c3B = new ArtemisPosition(\"c3B\", 2, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition d3B = new ArtemisPosition(\"d3B\", 3, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition a4B = new ArtemisPosition(\"a4B\", 0, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition b4B = new ArtemisPosition(\"b4B\", 1, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition c4B = new ArtemisPosition(\"c4B\", 2, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition d4B = new ArtemisPosition(\"d4B\", 3, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition a1C = new ArtemisPosition(\"a1C\", 0, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition b1C = new ArtemisPosition(\"b1C\", 1, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition c1C = new ArtemisPosition(\"c1C\", 2, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition d1C = new ArtemisPosition(\"d1C\", 3, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition a2C = new ArtemisPosition(\"a2C\", 0, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition b2C = new ArtemisPosition(\"b2C\", 1, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition c2C = new ArtemisPosition(\"c2C\", 2, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition d2C = new ArtemisPosition(\"d2C\", 3, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition a3C = new ArtemisPosition(\"a3C\", 0, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition b3C = new ArtemisPosition(\"b3C\", 1, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition c3C = new ArtemisPosition(\"c3C\", 2, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition d3C = new ArtemisPosition(\"d3C\", 3, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition a4C = new ArtemisPosition(\"a4C\", 0, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition b4C = new ArtemisPosition(\"b4C\", 1, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition c4C = new ArtemisPosition(\"c4C\", 2, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition d4C = new ArtemisPosition(\"d4C\", 3, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition a1D = new ArtemisPosition(\"a1D\", 0, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition b1D = new ArtemisPosition(\"b1D\", 1, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition c1D = new ArtemisPosition(\"c1D\", 2, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition d1D = new ArtemisPosition(\"d1D\", 3, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition a2D = new ArtemisPosition(\"a2D\", 0, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition b2D = new ArtemisPosition(\"b2D\", 1, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition c2D = new ArtemisPosition(\"c2D\", 2, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition d2D = new ArtemisPosition(\"d2D\", 3, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition a3D = new ArtemisPosition(\"a3D\", 0, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition b3D = new ArtemisPosition(\"b3D\", 1, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition c3D = new ArtemisPosition(\"c3D\", 2, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition d3D = new ArtemisPosition(\"d3D\", 3, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition a4D = new ArtemisPosition(\"a4D\", 0, 3, 3);\n\n/** Position. */\npublic static final ArtemisPosition b4D = new ArtemisPosition(\"b4D\", 1, 3, 3);\n\n/** Position. */\npublic static final ArtemisPosition c4D = new ArtemisPosition(\"c4D\", 2, 3, 3);\n\n/** Position. */\npublic static final ArtemisPosition d4D = new ArtemisPosition(\"d4D\", 3, 3, 3);\n\n/** Map of index to position. */\nprivate static final Map<Integer, ArtemisPosition> INDEX_TO_POSITION = new TreeMap<Integer, ArtemisPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, a1A);\nINDEX_TO_POSITION.put(1, b1A);\nINDEX_TO_POSITION.put(2, c1A);\nINDEX_TO_POSITION.put(3, d1A);\nINDEX_TO_POSITION.put(4, a2A);\nINDEX_TO_POSITION.put(5, b2A);\nINDEX_TO_POSITION.put(6, c2A);\nINDEX_TO_POSITION.put(7, d2A);\nINDEX_TO_POSITION.put(8, a3A);\nINDEX_TO_POSITION.put(9, b3A);\nINDEX_TO_POSITION.put(10, c3A);\nINDEX_TO_POSITION.put(11, d3A);\nINDEX_TO_POSITION.put(12, a4A);\nINDEX_TO_POSITION.put(13, b4A);\nINDEX_TO_POSITION.put(14, c4A);\nINDEX_TO_POSITION.put(15, d4A);\nINDEX_TO_POSITION.put(16, a1B);\nINDEX_TO_POSITION.put(17, b1B);\nINDEX_TO_POSITION.put(18, c1B);\nINDEX_TO_POSITION.put(19, d1B);\nINDEX_TO_POSITION.put(20, a2B);\nINDEX_TO_POSITION.put(21, b2B);\nINDEX_TO_POSITION.put(22, c2B);\nINDEX_TO_POSITION.put(23, d2B);\nINDEX_TO_POSITION.put(24, a3B);\nINDEX_TO_POSITION.put(25, b3B);\nINDEX_TO_POSITION.put(26, c3B);\nINDEX_TO_POSITION.put(27, d3B);\nINDEX_TO_POSITION.put(28, a4B);\nINDEX_TO_POSITION.put(29, b4B);\nINDEX_TO_POSITION.put(30, c4B);\nINDEX_TO_POSITION.put(31, d4B);\nINDEX_TO_POSITION.put(32, a1C);\nINDEX_TO_POSITION.put(33, b1C);\nINDEX_TO_POSITION.put(34, c1C);\nINDEX_TO_POSITION.put(35, d1C);\nINDEX_TO_POSITION.put(36, a2C);\nINDEX_TO_POSITION.put(37, b2C);\nINDEX_TO_POSITION.put(38, c2C);\nINDEX_TO_POSITION.put(39, d2C);\nINDEX_TO_POSITION.put(40, a3C);\nINDEX_TO_POSITION.put(41, b3C);\nINDEX_TO_POSITION.put(42, c3C);\nINDEX_TO_POSITION.put(43, d3C);\nINDEX_TO_POSITION.put(44, a4C);\nINDEX_TO_POSITION.put(45, b4C);\nINDEX_TO_POSITION.put(46, c4C);\nINDEX_TO_POSITION.put(47, d4C);\nINDEX_TO_POSITION.put(48, a1D);\nINDEX_TO_POSITION.put(49, b1D);\nINDEX_TO_POSITION.put(50, c1D);\nINDEX_TO_POSITION.put(51, d1D);\nINDEX_TO_POSITION.put(52, a2D);\nINDEX_TO_POSITION.put(53, b2D);\nINDEX_TO_POSITION.put(54, c2D);\nINDEX_TO_POSITION.put(55, d2D);\nINDEX_TO_POSITION.put(56, a3D);\nINDEX_TO_POSITION.put(57, b3D);\nINDEX_TO_POSITION.put(58, c3D);\nINDEX_TO_POSITION.put(59, d3D);\nINDEX_TO_POSITION.put(60, a4D);\nINDEX_TO_POSITION.put(61, b4D);\nINDEX_TO_POSITION.put(62, c4D);\nINDEX_TO_POSITION.put(63, d4D);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generateMap()</code> method.
     */
    @Test
    public void generateMap()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = createCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generateMap(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Map of index to position. */\nprivate static final Map<Integer, ArtemisPosition> INDEX_TO_POSITION = new TreeMap<Integer, ArtemisPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, a1A);\nINDEX_TO_POSITION.put(1, b1A);\nINDEX_TO_POSITION.put(2, c1A);\nINDEX_TO_POSITION.put(3, d1A);\nINDEX_TO_POSITION.put(4, a2A);\nINDEX_TO_POSITION.put(5, b2A);\nINDEX_TO_POSITION.put(6, c2A);\nINDEX_TO_POSITION.put(7, d2A);\nINDEX_TO_POSITION.put(8, a3A);\nINDEX_TO_POSITION.put(9, b3A);\nINDEX_TO_POSITION.put(10, c3A);\nINDEX_TO_POSITION.put(11, d3A);\nINDEX_TO_POSITION.put(12, a4A);\nINDEX_TO_POSITION.put(13, b4A);\nINDEX_TO_POSITION.put(14, c4A);\nINDEX_TO_POSITION.put(15, d4A);\nINDEX_TO_POSITION.put(16, a1B);\nINDEX_TO_POSITION.put(17, b1B);\nINDEX_TO_POSITION.put(18, c1B);\nINDEX_TO_POSITION.put(19, d1B);\nINDEX_TO_POSITION.put(20, a2B);\nINDEX_TO_POSITION.put(21, b2B);\nINDEX_TO_POSITION.put(22, c2B);\nINDEX_TO_POSITION.put(23, d2B);\nINDEX_TO_POSITION.put(24, a3B);\nINDEX_TO_POSITION.put(25, b3B);\nINDEX_TO_POSITION.put(26, c3B);\nINDEX_TO_POSITION.put(27, d3B);\nINDEX_TO_POSITION.put(28, a4B);\nINDEX_TO_POSITION.put(29, b4B);\nINDEX_TO_POSITION.put(30, c4B);\nINDEX_TO_POSITION.put(31, d4B);\nINDEX_TO_POSITION.put(32, a1C);\nINDEX_TO_POSITION.put(33, b1C);\nINDEX_TO_POSITION.put(34, c1C);\nINDEX_TO_POSITION.put(35, d1C);\nINDEX_TO_POSITION.put(36, a2C);\nINDEX_TO_POSITION.put(37, b2C);\nINDEX_TO_POSITION.put(38, c2C);\nINDEX_TO_POSITION.put(39, d2C);\nINDEX_TO_POSITION.put(40, a3C);\nINDEX_TO_POSITION.put(41, b3C);\nINDEX_TO_POSITION.put(42, c3C);\nINDEX_TO_POSITION.put(43, d3C);\nINDEX_TO_POSITION.put(44, a4C);\nINDEX_TO_POSITION.put(45, b4C);\nINDEX_TO_POSITION.put(46, c4C);\nINDEX_TO_POSITION.put(47, d4C);\nINDEX_TO_POSITION.put(48, a1D);\nINDEX_TO_POSITION.put(49, b1D);\nINDEX_TO_POSITION.put(50, c1D);\nINDEX_TO_POSITION.put(51, d1D);\nINDEX_TO_POSITION.put(52, a2D);\nINDEX_TO_POSITION.put(53, b2D);\nINDEX_TO_POSITION.put(54, c2D);\nINDEX_TO_POSITION.put(55, d2D);\nINDEX_TO_POSITION.put(56, a3D);\nINDEX_TO_POSITION.put(57, b3D);\nINDEX_TO_POSITION.put(58, c3D);\nINDEX_TO_POSITION.put(59, d3D);\nINDEX_TO_POSITION.put(60, a4D);\nINDEX_TO_POSITION.put(61, b4D);\nINDEX_TO_POSITION.put(62, c4D);\nINDEX_TO_POSITION.put(63, d4D);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generatePositions()</code> method.
     */
    @Test
    public void generatePositions()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = createCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generatePositions(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final ArtemisPosition a1A = new ArtemisPosition(\"a1A\", 0, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition b1A = new ArtemisPosition(\"b1A\", 1, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition c1A = new ArtemisPosition(\"c1A\", 2, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition d1A = new ArtemisPosition(\"d1A\", 3, 0, 0);\n\n/** Position. */\npublic static final ArtemisPosition a2A = new ArtemisPosition(\"a2A\", 0, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition b2A = new ArtemisPosition(\"b2A\", 1, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition c2A = new ArtemisPosition(\"c2A\", 2, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition d2A = new ArtemisPosition(\"d2A\", 3, 1, 0);\n\n/** Position. */\npublic static final ArtemisPosition a3A = new ArtemisPosition(\"a3A\", 0, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition b3A = new ArtemisPosition(\"b3A\", 1, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition c3A = new ArtemisPosition(\"c3A\", 2, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition d3A = new ArtemisPosition(\"d3A\", 3, 2, 0);\n\n/** Position. */\npublic static final ArtemisPosition a4A = new ArtemisPosition(\"a4A\", 0, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition b4A = new ArtemisPosition(\"b4A\", 1, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition c4A = new ArtemisPosition(\"c4A\", 2, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition d4A = new ArtemisPosition(\"d4A\", 3, 3, 0);\n\n/** Position. */\npublic static final ArtemisPosition a1B = new ArtemisPosition(\"a1B\", 0, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition b1B = new ArtemisPosition(\"b1B\", 1, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition c1B = new ArtemisPosition(\"c1B\", 2, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition d1B = new ArtemisPosition(\"d1B\", 3, 0, 1);\n\n/** Position. */\npublic static final ArtemisPosition a2B = new ArtemisPosition(\"a2B\", 0, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition b2B = new ArtemisPosition(\"b2B\", 1, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition c2B = new ArtemisPosition(\"c2B\", 2, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition d2B = new ArtemisPosition(\"d2B\", 3, 1, 1);\n\n/** Position. */\npublic static final ArtemisPosition a3B = new ArtemisPosition(\"a3B\", 0, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition b3B = new ArtemisPosition(\"b3B\", 1, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition c3B = new ArtemisPosition(\"c3B\", 2, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition d3B = new ArtemisPosition(\"d3B\", 3, 2, 1);\n\n/** Position. */\npublic static final ArtemisPosition a4B = new ArtemisPosition(\"a4B\", 0, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition b4B = new ArtemisPosition(\"b4B\", 1, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition c4B = new ArtemisPosition(\"c4B\", 2, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition d4B = new ArtemisPosition(\"d4B\", 3, 3, 1);\n\n/** Position. */\npublic static final ArtemisPosition a1C = new ArtemisPosition(\"a1C\", 0, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition b1C = new ArtemisPosition(\"b1C\", 1, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition c1C = new ArtemisPosition(\"c1C\", 2, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition d1C = new ArtemisPosition(\"d1C\", 3, 0, 2);\n\n/** Position. */\npublic static final ArtemisPosition a2C = new ArtemisPosition(\"a2C\", 0, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition b2C = new ArtemisPosition(\"b2C\", 1, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition c2C = new ArtemisPosition(\"c2C\", 2, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition d2C = new ArtemisPosition(\"d2C\", 3, 1, 2);\n\n/** Position. */\npublic static final ArtemisPosition a3C = new ArtemisPosition(\"a3C\", 0, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition b3C = new ArtemisPosition(\"b3C\", 1, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition c3C = new ArtemisPosition(\"c3C\", 2, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition d3C = new ArtemisPosition(\"d3C\", 3, 2, 2);\n\n/** Position. */\npublic static final ArtemisPosition a4C = new ArtemisPosition(\"a4C\", 0, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition b4C = new ArtemisPosition(\"b4C\", 1, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition c4C = new ArtemisPosition(\"c4C\", 2, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition d4C = new ArtemisPosition(\"d4C\", 3, 3, 2);\n\n/** Position. */\npublic static final ArtemisPosition a1D = new ArtemisPosition(\"a1D\", 0, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition b1D = new ArtemisPosition(\"b1D\", 1, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition c1D = new ArtemisPosition(\"c1D\", 2, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition d1D = new ArtemisPosition(\"d1D\", 3, 0, 3);\n\n/** Position. */\npublic static final ArtemisPosition a2D = new ArtemisPosition(\"a2D\", 0, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition b2D = new ArtemisPosition(\"b2D\", 1, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition c2D = new ArtemisPosition(\"c2D\", 2, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition d2D = new ArtemisPosition(\"d2D\", 3, 1, 3);\n\n/** Position. */\npublic static final ArtemisPosition a3D = new ArtemisPosition(\"a3D\", 0, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition b3D = new ArtemisPosition(\"b3D\", 1, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition c3D = new ArtemisPosition(\"c3D\", 2, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition d3D = new ArtemisPosition(\"d3D\", 3, 2, 3);\n\n/** Position. */\npublic static final ArtemisPosition a4D = new ArtemisPosition(\"a4D\", 0, 3, 3);\n\n/** Position. */\npublic static final ArtemisPosition b4D = new ArtemisPosition(\"b4D\", 1, 3, 3);\n\n/** Position. */\npublic static final ArtemisPosition c4D = new ArtemisPosition(\"c4D\", 2, 3, 3);\n\n/** Position. */\npublic static final ArtemisPosition d4D = new ArtemisPosition(\"d4D\", 3, 3, 3);\n";
        assertThat(result, is(expected));
    }

    /**
     * @return a new position code generator.
     */
    private PositionCodeGenerator createCodeGenerator()
    {
        final String positionClassName = "ArtemisPosition";
        final int maxX = 4;
        final int maxY = 4;
        final int maxZ = 4;

        return new DefaultPositionCodeGenerator(positionClassName, maxX, maxY, maxZ);
    }
}
