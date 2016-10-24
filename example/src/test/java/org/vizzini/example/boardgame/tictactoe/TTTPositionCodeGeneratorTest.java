package org.vizzini.example.boardgame.tictactoe;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.io.StringWriter;
import java.io.Writer;

import org.junit.Test;

/**
 * Provides tests for the <code>TTTPositionCodeGenerator</code> class.
 */
public final class TTTPositionCodeGeneratorTest
{
    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndex()
    {
        // Setup.
        final TTTPositionCodeGenerator codeGenerator = new TTTPositionCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.computeIndex(0, 0, 0), is(0));
        assertThat(codeGenerator.computeIndex(2, 0, 0), is(2));
        assertThat(codeGenerator.computeIndex(0, 2, 0), is(6));
        assertThat(codeGenerator.computeIndex(2, 2, 0), is(8));

        assertNull(codeGenerator.computeIndex(-1, 0, 0));
        assertNull(codeGenerator.computeIndex(0, -1, 0));
        assertNull(codeGenerator.computeIndex(0, 0, -1));
        assertNull(codeGenerator.computeIndex(3, 0, 0));
        assertNull(codeGenerator.computeIndex(0, 3, 0));
        assertNull(codeGenerator.computeIndex(0, 0, 3));
    }

    /**
     * Test the <code>createName()</code> method.
     */
    @Test
    public void createName()
    {
        // Setup.
        final TTTPositionCodeGenerator codeGenerator = new TTTPositionCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.createName(0, 0, 0), is("a1"));
        assertThat(codeGenerator.createName(0, 2, 0), is("a3"));
        assertThat(codeGenerator.createName(2, 0, 0), is("c1"));
        assertThat(codeGenerator.createName(2, 2, 0), is("c3"));

        assertNull(codeGenerator.createName(-1, 0, 0));
        assertNull(codeGenerator.createName(0, -1, 0));
        assertNull(codeGenerator.createName(0, 0, -1));
        assertNull(codeGenerator.createName(3, 0, 0));
        assertNull(codeGenerator.createName(0, 3, 0));
        assertNull(codeGenerator.createName(0, 0, 3));
    }

    /**
     * Test the <code>generate()</code> method.
     */
    @Test
    public void generate()
    {
        // Setup.
        final TTTPositionCodeGenerator codeGenerator = new TTTPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generate(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final TTTPosition a1 = new TTTPosition(\"a1\", 0, 0);\n\n/** Position. */\npublic static final TTTPosition b1 = new TTTPosition(\"b1\", 1, 0);\n\n/** Position. */\npublic static final TTTPosition c1 = new TTTPosition(\"c1\", 2, 0);\n\n/** Position. */\npublic static final TTTPosition a2 = new TTTPosition(\"a2\", 0, 1);\n\n/** Position. */\npublic static final TTTPosition b2 = new TTTPosition(\"b2\", 1, 1);\n\n/** Position. */\npublic static final TTTPosition c2 = new TTTPosition(\"c2\", 2, 1);\n\n/** Position. */\npublic static final TTTPosition a3 = new TTTPosition(\"a3\", 0, 2);\n\n/** Position. */\npublic static final TTTPosition b3 = new TTTPosition(\"b3\", 1, 2);\n\n/** Position. */\npublic static final TTTPosition c3 = new TTTPosition(\"c3\", 2, 2);\n\n/** Alternate position name. */\npublic static final TTTPosition CENTER = b2;\n\n/** Alternate position name. */\npublic static final TTTPosition CORNER0 = a1;\n\n/** Alternate position name. */\npublic static final TTTPosition CORNER1 = c1;\n\n/** Alternate position name. */\npublic static final TTTPosition CORNER2 = a3;\n\n/** Alternate position name. */\npublic static final TTTPosition CORNER3 = c3;\n\n/** Map of index to position. */\nprivate static final Map<Integer, TTTPosition> INDEX_TO_POSITION = new TreeMap<Integer, TTTPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, a1);\nINDEX_TO_POSITION.put(1, b1);\nINDEX_TO_POSITION.put(2, c1);\nINDEX_TO_POSITION.put(3, a2);\nINDEX_TO_POSITION.put(4, b2);\nINDEX_TO_POSITION.put(5, c2);\nINDEX_TO_POSITION.put(6, a3);\nINDEX_TO_POSITION.put(7, b3);\nINDEX_TO_POSITION.put(8, c3);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generateMap()</code> method.
     */
    @Test
    public void generateMap()
    {
        // Setup.
        final TTTPositionCodeGenerator codeGenerator = new TTTPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generateMap(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Map of index to position. */\nprivate static final Map<Integer, TTTPosition> INDEX_TO_POSITION = new TreeMap<Integer, TTTPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, a1);\nINDEX_TO_POSITION.put(1, b1);\nINDEX_TO_POSITION.put(2, c1);\nINDEX_TO_POSITION.put(3, a2);\nINDEX_TO_POSITION.put(4, b2);\nINDEX_TO_POSITION.put(5, c2);\nINDEX_TO_POSITION.put(6, a3);\nINDEX_TO_POSITION.put(7, b3);\nINDEX_TO_POSITION.put(8, c3);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generatePositions()</code> method.
     */
    @Test
    public void generatePositions()
    {
        // Setup.
        final TTTPositionCodeGenerator codeGenerator = new TTTPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generatePositions(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final TTTPosition a1 = new TTTPosition(\"a1\", 0, 0);\n\n/** Position. */\npublic static final TTTPosition b1 = new TTTPosition(\"b1\", 1, 0);\n\n/** Position. */\npublic static final TTTPosition c1 = new TTTPosition(\"c1\", 2, 0);\n\n/** Position. */\npublic static final TTTPosition a2 = new TTTPosition(\"a2\", 0, 1);\n\n/** Position. */\npublic static final TTTPosition b2 = new TTTPosition(\"b2\", 1, 1);\n\n/** Position. */\npublic static final TTTPosition c2 = new TTTPosition(\"c2\", 2, 1);\n\n/** Position. */\npublic static final TTTPosition a3 = new TTTPosition(\"a3\", 0, 2);\n\n/** Position. */\npublic static final TTTPosition b3 = new TTTPosition(\"b3\", 1, 2);\n\n/** Position. */\npublic static final TTTPosition c3 = new TTTPosition(\"c3\", 2, 2);\n";
        assertThat(result, is(expected));
    }
}
