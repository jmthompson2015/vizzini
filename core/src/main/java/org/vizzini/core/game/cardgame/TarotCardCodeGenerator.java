package org.vizzini.core.game.cardgame;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Provides a code generator for a tarot card class.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Tarot_cards">Tarot (Wikipedia)</a>
 */
public final class TarotCardCodeGenerator
{
    /** Map of rank to rank name. */
    private static final Map<Integer, String> RANK_TO_NAME = new HashMap<Integer, String>();

    static
    {
        RANK_TO_NAME.put(1, "Ace");
        RANK_TO_NAME.put(2, "Two");
        RANK_TO_NAME.put(3, "Three");
        RANK_TO_NAME.put(4, "Four");
        RANK_TO_NAME.put(5, "Five");
        RANK_TO_NAME.put(6, "Six");
        RANK_TO_NAME.put(7, "Seven");
        RANK_TO_NAME.put(8, "Eight");
        RANK_TO_NAME.put(9, "Nine");
        RANK_TO_NAME.put(10, "Ten");
        RANK_TO_NAME.put(11, "Page");
        RANK_TO_NAME.put(12, "Knight");
        RANK_TO_NAME.put(13, "Queen");
        RANK_TO_NAME.put(14, "King");
    }

    /** Major arcana names. */
    private static final List<String> MAJOR_ARCANA_NAMES = Arrays.asList(new String[] { "The Fool", "The Magician",
            "The High Priestess", "The Empress", "The Emperor", "The Hierophant", "The Lovers", "The Chariot",
            "Strength", "The Hermit", "Wheel of Fortune", "Justice", "The Hanged Man", "Death", "Temperance",
            "The Devil", "The Tower", "The Star", "The Moon", "The Sun", "Judgement", "The World", });

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final TarotCardCodeGenerator generator = new TarotCardCodeGenerator();

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }

    /**
     * Generate code.
     * 
     * @param writer Writer.
     */
    public void generate(final Writer writer)
    {
        generateMinorArcana(writer);

        generateMajorArcana(writer);

        generateAlternateNames(writer);

        generateValues(writer);
    }

    /**
     * @param suit Suit.
     * @param value Value.
     * 
     * @return a name.
     */
    private String createVariableName(final TarotSuit suit, final int value)
    {
        return suit.getSymbol() + String.valueOf(value);
    }

    /**
     * @param writer Writer.
     */
    private void generateAlternateNames(final Writer writer)
    {
        int rank = 0;

        try
        {
            for (final String name : MAJOR_ARCANA_NAMES)
            {
                String variableName = name.toUpperCase();
                variableName = variableName.replaceAll("[ ]", "_");

                if (variableName.startsWith("THE_"))
                {
                    variableName = variableName.substring(4);
                }

                final String variableName0 = "M" + rank;
                writer.write("\n/** Alternate card name. */\n");
                writer.write("public static final TarotCard " + variableName + " = " + variableName0 + ";\n");
                rank++;
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     */
    private void generateMajorArcana(final Writer writer)
    {
        int rank = 0;

        try
        {
            for (final String name : MAJOR_ARCANA_NAMES)
            {
                final String variableName = "M" + rank;
                writer.write("\n/** Card. */\n");
                writer.write("public static final TarotCard " + variableName + " = new TarotCard(\"" + name + "\", "
                        + rank + ");\n");
                rank++;
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     */
    private void generateMinorArcana(final Writer writer)
    {
        try
        {
            for (final TarotSuit suit : TarotSuit.values())
            {
                for (int rank = 1; rank <= 14; rank++)
                {
                    final String variableName = createVariableName(suit, rank);
                    writer.write("\n/** Card. */\n");
                    final String rankName = RANK_TO_NAME.get(rank);
                    writer.write("public static final TarotCard " + variableName + " = new TarotCard(" + "TarotSuit."
                            + suit.name() + ", \"" + rankName + "\", " + rank + ");\n");
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     */
    private void generateValues(final Writer writer)
    {
        try
        {
            writer.write("\n");
            writer.write("/** Values. */\n");
            writer.write("private static final TarotCard[] VALUES;\n");
            writer.write("\n");
            writer.write("static\n");
            writer.write("{\n");
            writer.write("VALUES = new TarotCard[78];\n");
            writer.write("\n");
            writer.write("int i = 0;\n");

            for (final TarotSuit suit : TarotSuit.values())
            {
                for (int i = 1; i <= 14; i++)
                {
                    final String variableName = createVariableName(suit, i);
                    writer.write("VALUES[i++] = " + variableName + ";\n");
                }
            }

            for (int i = 0; i < 22; i++)
            {
                final String variableName = "M" + i;
                writer.write("VALUES[i++] = " + variableName + ";\n");
            }

            writer.write("}\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
