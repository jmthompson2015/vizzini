package org.vizzini.core.game.cardgame;

import java.io.IOException;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;

/**
 * Provides a code generator for a poker card class.
 */
public final class PokerCardCodeGenerator
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
        RANK_TO_NAME.put(11, "Jack");
        RANK_TO_NAME.put(12, "Queen");
        RANK_TO_NAME.put(13, "King");
    }

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final PokerCardCodeGenerator generator = new PokerCardCodeGenerator();

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
        generateCards(writer);

        generateValues(writer);
    }

    /**
     * @param suit Suit.
     * @param value Value.
     * 
     * @return a name.
     */
    private String createVariableName(final PokerSuit suit, final int value)
    {
        return suit.getSymbol() + String.valueOf(value);
    }

    /**
     * @param writer Writer.
     */
    private void generateCards(final Writer writer)
    {
        try
        {
            for (final PokerSuit suit : PokerSuit.values())
            {
                for (int rank = 1; rank <= 13; rank++)
                {
                    final String variableName = createVariableName(suit, rank);
                    writer.write("\n/** Card. */\n");
                    final String rankName = RANK_TO_NAME.get(rank);

                    // if (rankName == null)
                    // {
                    // writer.write("public static final PokerCard " + variableName + " = new PokerCard(PokerSuit."
                    // + suit.name() + ", " + rank + ");\n");
                    // }
                    // else
                    // {
                    writer.write("public static final PokerCard " + variableName + " = new PokerCard(" + "PokerSuit."
                            + suit.name() + ", \"" + rankName + "\", " + rank + ");\n");
                    // }
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
            writer.write("private static final PokerCard[] VALUES;\n");
            writer.write("\n");
            writer.write("static\n");
            writer.write("{\n");
            writer.write("VALUES = new PokerCard[52];\n");
            writer.write("\n");
            writer.write("int i = 0;\n");

            for (final PokerSuit suit : PokerSuit.values())
            {
                for (int i = 1; i <= 13; i++)
                {
                    final String variableName = createVariableName(suit, i);
                    writer.write("VALUES[i++] = " + variableName + ";\n");
                }
            }

            writer.write("}\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
