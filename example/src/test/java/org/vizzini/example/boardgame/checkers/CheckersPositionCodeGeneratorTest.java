package org.vizzini.example.boardgame.checkers;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;

import java.io.StringWriter;
import java.io.Writer;

import org.junit.Test;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides tests for the <code>CheckersPositionCodeGenerator</code> class.
 */
public final class CheckersPositionCodeGeneratorTest
{
    /**
     * Test the <code>computeIndex()</code> method.
     */
    @Test
    public void computeIndex()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new CheckersPositionCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.computeIndex(1, 0, 0), is(0));
        assertThat(codeGenerator.computeIndex(2, 1, 0), is(5));
        assertThat(codeGenerator.computeIndex(3, 2, 0), is(9));
        assertThat(codeGenerator.computeIndex(4, 3, 0), is(14));
        assertThat(codeGenerator.computeIndex(5, 4, 0), is(18));
        assertThat(codeGenerator.computeIndex(6, 5, 0), is(23));
        assertThat(codeGenerator.computeIndex(7, 6, 0), is(27));
        assertThat(codeGenerator.computeIndex(6, 7, 0), is(31));

        assertNull(codeGenerator.computeIndex(-1, 0, 0));
        assertNull(codeGenerator.computeIndex(0, -1, 0));
        assertNull(codeGenerator.computeIndex(0, 0, -1));
        assertNull(codeGenerator.computeIndex(8, 0, 0));
        assertNull(codeGenerator.computeIndex(0, 8, 0));
        assertNull(codeGenerator.computeIndex(0, 0, 1));
    }

    /**
     * Test the <code>createName()</code> method.
     */
    @Test
    public void createName()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new CheckersPositionCodeGenerator();

        // Run / Verify.
        assertThat(codeGenerator.createName(1, 0, 0), is("01"));
        assertThat(codeGenerator.createName(2, 1, 0), is("06"));
        assertThat(codeGenerator.createName(3, 2, 0), is("10"));
        assertThat(codeGenerator.createName(4, 3, 0), is("15"));
        assertThat(codeGenerator.createName(5, 4, 0), is("19"));
        assertThat(codeGenerator.createName(6, 5, 0), is("24"));
        assertThat(codeGenerator.createName(7, 6, 0), is("28"));
        assertThat(codeGenerator.createName(6, 7, 0), is("32"));

        assertNull(codeGenerator.createName(-1, 0, 0));
        assertNull(codeGenerator.createName(0, -1, 0));
        assertNull(codeGenerator.createName(0, 0, -1));
        assertNull(codeGenerator.createName(8, 0, 0));
        assertNull(codeGenerator.createName(0, 8, 0));
        assertNull(codeGenerator.createName(0, 0, 1));
    }

    /**
     * Test the <code>generate()</code> method.
     */
    @Test
    public void generate()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new CheckersPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generate(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final CheckersPosition P01 = new CheckersPosition(\"01\", 1, 0);\n\n/** Position. */\npublic static final CheckersPosition P02 = new CheckersPosition(\"02\", 3, 0);\n\n/** Position. */\npublic static final CheckersPosition P03 = new CheckersPosition(\"03\", 5, 0);\n\n/** Position. */\npublic static final CheckersPosition P04 = new CheckersPosition(\"04\", 7, 0);\n\n/** Position. */\npublic static final CheckersPosition P05 = new CheckersPosition(\"05\", 0, 1);\n\n/** Position. */\npublic static final CheckersPosition P06 = new CheckersPosition(\"06\", 2, 1);\n\n/** Position. */\npublic static final CheckersPosition P07 = new CheckersPosition(\"07\", 4, 1);\n\n/** Position. */\npublic static final CheckersPosition P08 = new CheckersPosition(\"08\", 6, 1);\n\n/** Position. */\npublic static final CheckersPosition P09 = new CheckersPosition(\"09\", 1, 2);\n\n/** Position. */\npublic static final CheckersPosition P10 = new CheckersPosition(\"10\", 3, 2);\n\n/** Position. */\npublic static final CheckersPosition P11 = new CheckersPosition(\"11\", 5, 2);\n\n/** Position. */\npublic static final CheckersPosition P12 = new CheckersPosition(\"12\", 7, 2);\n\n/** Position. */\npublic static final CheckersPosition P13 = new CheckersPosition(\"13\", 0, 3);\n\n/** Position. */\npublic static final CheckersPosition P14 = new CheckersPosition(\"14\", 2, 3);\n\n/** Position. */\npublic static final CheckersPosition P15 = new CheckersPosition(\"15\", 4, 3);\n\n/** Position. */\npublic static final CheckersPosition P16 = new CheckersPosition(\"16\", 6, 3);\n\n/** Position. */\npublic static final CheckersPosition P17 = new CheckersPosition(\"17\", 1, 4);\n\n/** Position. */\npublic static final CheckersPosition P18 = new CheckersPosition(\"18\", 3, 4);\n\n/** Position. */\npublic static final CheckersPosition P19 = new CheckersPosition(\"19\", 5, 4);\n\n/** Position. */\npublic static final CheckersPosition P20 = new CheckersPosition(\"20\", 7, 4);\n\n/** Position. */\npublic static final CheckersPosition P21 = new CheckersPosition(\"21\", 0, 5);\n\n/** Position. */\npublic static final CheckersPosition P22 = new CheckersPosition(\"22\", 2, 5);\n\n/** Position. */\npublic static final CheckersPosition P23 = new CheckersPosition(\"23\", 4, 5);\n\n/** Position. */\npublic static final CheckersPosition P24 = new CheckersPosition(\"24\", 6, 5);\n\n/** Position. */\npublic static final CheckersPosition P25 = new CheckersPosition(\"25\", 1, 6);\n\n/** Position. */\npublic static final CheckersPosition P26 = new CheckersPosition(\"26\", 3, 6);\n\n/** Position. */\npublic static final CheckersPosition P27 = new CheckersPosition(\"27\", 5, 6);\n\n/** Position. */\npublic static final CheckersPosition P28 = new CheckersPosition(\"28\", 7, 6);\n\n/** Position. */\npublic static final CheckersPosition P29 = new CheckersPosition(\"29\", 0, 7);\n\n/** Position. */\npublic static final CheckersPosition P30 = new CheckersPosition(\"30\", 2, 7);\n\n/** Position. */\npublic static final CheckersPosition P31 = new CheckersPosition(\"31\", 4, 7);\n\n/** Position. */\npublic static final CheckersPosition P32 = new CheckersPosition(\"32\", 6, 7);\n\n/** Map of index to position. */\nprivate static final Map<Integer, CheckersPosition> INDEX_TO_POSITION = new TreeMap<Integer, CheckersPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, P01);\nINDEX_TO_POSITION.put(1, P02);\nINDEX_TO_POSITION.put(2, P03);\nINDEX_TO_POSITION.put(3, P04);\nINDEX_TO_POSITION.put(4, P05);\nINDEX_TO_POSITION.put(5, P06);\nINDEX_TO_POSITION.put(6, P07);\nINDEX_TO_POSITION.put(7, P08);\nINDEX_TO_POSITION.put(8, P09);\nINDEX_TO_POSITION.put(9, P10);\nINDEX_TO_POSITION.put(10, P11);\nINDEX_TO_POSITION.put(11, P12);\nINDEX_TO_POSITION.put(12, P13);\nINDEX_TO_POSITION.put(13, P14);\nINDEX_TO_POSITION.put(14, P15);\nINDEX_TO_POSITION.put(15, P16);\nINDEX_TO_POSITION.put(16, P17);\nINDEX_TO_POSITION.put(17, P18);\nINDEX_TO_POSITION.put(18, P19);\nINDEX_TO_POSITION.put(19, P20);\nINDEX_TO_POSITION.put(20, P21);\nINDEX_TO_POSITION.put(21, P22);\nINDEX_TO_POSITION.put(22, P23);\nINDEX_TO_POSITION.put(23, P24);\nINDEX_TO_POSITION.put(24, P25);\nINDEX_TO_POSITION.put(25, P26);\nINDEX_TO_POSITION.put(26, P27);\nINDEX_TO_POSITION.put(27, P28);\nINDEX_TO_POSITION.put(28, P29);\nINDEX_TO_POSITION.put(29, P30);\nINDEX_TO_POSITION.put(30, P31);\nINDEX_TO_POSITION.put(31, P32);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generateMap()</code> method.
     */
    @Test
    public void generateMap()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new CheckersPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generateMap(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Map of index to position. */\nprivate static final Map<Integer, CheckersPosition> INDEX_TO_POSITION = new TreeMap<Integer, CheckersPosition>();\n\nstatic\n{\nINDEX_TO_POSITION.put(0, P01);\nINDEX_TO_POSITION.put(1, P02);\nINDEX_TO_POSITION.put(2, P03);\nINDEX_TO_POSITION.put(3, P04);\nINDEX_TO_POSITION.put(4, P05);\nINDEX_TO_POSITION.put(5, P06);\nINDEX_TO_POSITION.put(6, P07);\nINDEX_TO_POSITION.put(7, P08);\nINDEX_TO_POSITION.put(8, P09);\nINDEX_TO_POSITION.put(9, P10);\nINDEX_TO_POSITION.put(10, P11);\nINDEX_TO_POSITION.put(11, P12);\nINDEX_TO_POSITION.put(12, P13);\nINDEX_TO_POSITION.put(13, P14);\nINDEX_TO_POSITION.put(14, P15);\nINDEX_TO_POSITION.put(15, P16);\nINDEX_TO_POSITION.put(16, P17);\nINDEX_TO_POSITION.put(17, P18);\nINDEX_TO_POSITION.put(18, P19);\nINDEX_TO_POSITION.put(19, P20);\nINDEX_TO_POSITION.put(20, P21);\nINDEX_TO_POSITION.put(21, P22);\nINDEX_TO_POSITION.put(22, P23);\nINDEX_TO_POSITION.put(23, P24);\nINDEX_TO_POSITION.put(24, P25);\nINDEX_TO_POSITION.put(25, P26);\nINDEX_TO_POSITION.put(26, P27);\nINDEX_TO_POSITION.put(27, P28);\nINDEX_TO_POSITION.put(28, P29);\nINDEX_TO_POSITION.put(29, P30);\nINDEX_TO_POSITION.put(30, P31);\nINDEX_TO_POSITION.put(31, P32);\n}\n";
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>generatePositions()</code> method.
     */
    @Test
    public void generatePositions()
    {
        // Setup.
        final PositionCodeGenerator codeGenerator = new CheckersPositionCodeGenerator();
        final Writer writer = new StringWriter();

        // Run.
        codeGenerator.generatePositions(writer);

        // Verify.
        final String result = writer.toString();
        assertNotNull(result);
        final String expected = "\n/** Position. */\npublic static final CheckersPosition P01 = new CheckersPosition(\"01\", 1, 0);\n\n/** Position. */\npublic static final CheckersPosition P02 = new CheckersPosition(\"02\", 3, 0);\n\n/** Position. */\npublic static final CheckersPosition P03 = new CheckersPosition(\"03\", 5, 0);\n\n/** Position. */\npublic static final CheckersPosition P04 = new CheckersPosition(\"04\", 7, 0);\n\n/** Position. */\npublic static final CheckersPosition P05 = new CheckersPosition(\"05\", 0, 1);\n\n/** Position. */\npublic static final CheckersPosition P06 = new CheckersPosition(\"06\", 2, 1);\n\n/** Position. */\npublic static final CheckersPosition P07 = new CheckersPosition(\"07\", 4, 1);\n\n/** Position. */\npublic static final CheckersPosition P08 = new CheckersPosition(\"08\", 6, 1);\n\n/** Position. */\npublic static final CheckersPosition P09 = new CheckersPosition(\"09\", 1, 2);\n\n/** Position. */\npublic static final CheckersPosition P10 = new CheckersPosition(\"10\", 3, 2);\n\n/** Position. */\npublic static final CheckersPosition P11 = new CheckersPosition(\"11\", 5, 2);\n\n/** Position. */\npublic static final CheckersPosition P12 = new CheckersPosition(\"12\", 7, 2);\n\n/** Position. */\npublic static final CheckersPosition P13 = new CheckersPosition(\"13\", 0, 3);\n\n/** Position. */\npublic static final CheckersPosition P14 = new CheckersPosition(\"14\", 2, 3);\n\n/** Position. */\npublic static final CheckersPosition P15 = new CheckersPosition(\"15\", 4, 3);\n\n/** Position. */\npublic static final CheckersPosition P16 = new CheckersPosition(\"16\", 6, 3);\n\n/** Position. */\npublic static final CheckersPosition P17 = new CheckersPosition(\"17\", 1, 4);\n\n/** Position. */\npublic static final CheckersPosition P18 = new CheckersPosition(\"18\", 3, 4);\n\n/** Position. */\npublic static final CheckersPosition P19 = new CheckersPosition(\"19\", 5, 4);\n\n/** Position. */\npublic static final CheckersPosition P20 = new CheckersPosition(\"20\", 7, 4);\n\n/** Position. */\npublic static final CheckersPosition P21 = new CheckersPosition(\"21\", 0, 5);\n\n/** Position. */\npublic static final CheckersPosition P22 = new CheckersPosition(\"22\", 2, 5);\n\n/** Position. */\npublic static final CheckersPosition P23 = new CheckersPosition(\"23\", 4, 5);\n\n/** Position. */\npublic static final CheckersPosition P24 = new CheckersPosition(\"24\", 6, 5);\n\n/** Position. */\npublic static final CheckersPosition P25 = new CheckersPosition(\"25\", 1, 6);\n\n/** Position. */\npublic static final CheckersPosition P26 = new CheckersPosition(\"26\", 3, 6);\n\n/** Position. */\npublic static final CheckersPosition P27 = new CheckersPosition(\"27\", 5, 6);\n\n/** Position. */\npublic static final CheckersPosition P28 = new CheckersPosition(\"28\", 7, 6);\n\n/** Position. */\npublic static final CheckersPosition P29 = new CheckersPosition(\"29\", 0, 7);\n\n/** Position. */\npublic static final CheckersPosition P30 = new CheckersPosition(\"30\", 2, 7);\n\n/** Position. */\npublic static final CheckersPosition P31 = new CheckersPosition(\"31\", 4, 7);\n\n/** Position. */\npublic static final CheckersPosition P32 = new CheckersPosition(\"32\", 6, 7);\n";
        assertThat(result, is(expected));
    }
}
