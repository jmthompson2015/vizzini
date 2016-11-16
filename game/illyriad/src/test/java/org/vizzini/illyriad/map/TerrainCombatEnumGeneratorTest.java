package org.vizzini.illyriad.map;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.io.StringWriter;

import org.junit.Test;

/**
 * Provides tests for the <code>TerrainCombatEnumGenerator</code> class.
 */
public final class TerrainCombatEnumGeneratorTest
{
    /**
     * Test the <code>generate()</code> method.
     */
    @Test
    public void generate()
    {
        final StringWriter writer = new StringWriter();
        final TerrainCombatEnumGenerator generator = new TerrainCombatEnumGenerator(writer);

        generator.generate();

        final String expected = "\n/** Terrain combat. */\nLARGE_MOUNTAIN(1, \"Large Mountain\"),\n\n/** Terrain combat. */\nSMALL_MOUNTAIN(2, \"Small Mountain\"),\n\n/** Terrain combat. */\nLARGE_HILL(3, \"Large Hill\"),\n\n/** Terrain combat. */\nSMALL_HILL(4, \"Small Hill\"),\n\n/** Terrain combat. */\nIMPASSABLE(5, \"Impassable\"),\n\n/** Terrain combat. */\nSMALL_FOREST(6, \"Small Forest\"),\n\n/** Terrain combat. */\nPLAINS(7, \"Plains\"),\n\n/** Terrain combat. */\nBUILDINGS(8, \"Buildings\"),\n\n/** Terrain combat. */\nNPC_STRUCTURE(9, \"NPC Structure\"),\n\n/** Terrain combat. */\nLARGE_FOREST(10, \"Large Forest\"),\n\n/** Terrain combat. */\nFRESH_WATER(11, \"Fresh Water\"),\n\n/** Terrain combat. */\nTIDAL_WATER(12, \"Tidal Water\"),\n\n/** Terrain combat. */\nSHALLOW_SALT_WATER(13, \"Shallow Salt Water\"),\n\n/** Terrain combat. */\nOCEAN(14, \"Ocean\"),\n\n/** Terrain combat. */\nOBSIDIAN_MOUNTAINS(15, \"Obsidian Mountains\");\n";
        final String result = writer.toString();
        // System.out.println("expected =\n" + expected);
        // System.out.println("result   =\n" + result);

        assertThat(result, is(expected));
    }
}
