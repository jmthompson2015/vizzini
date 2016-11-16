package org.vizzini.runescape;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;

import org.junit.Test;

/**
 * Provides tests for the <code>IngredientBuilder</code> class.
 */
public final class IngredientBuilderTest
{
    /**
     * Test the <code>build()</code> method.
     */
    @Test
    public void build()
    {
        final IngredientBuilder builder = new IngredientBuilder();

        builder.build();

        final ItemIngredientCollection ingredients = builder.getIngredientCollection();
        assertNotNull(ingredients);
        assertThat(ingredients.size(), is(62));

        assertThat(ingredients.get(0).getName(), is("Adamant bar"));
        assertThat(ingredients.get(53).getName(), is("Silver ore"));
        assertThat(ingredients.get(61).getName(), is("Uncut sapphire"));
    }

    /**
     * Write a market data file.
     */
    @Test
    public void writeFile()
    {
        final IngredientBuilder builder = new IngredientBuilder();

        builder.build();

        final ItemIngredientCollection ingredients = builder.getIngredientCollection();

        final File file = new File("marketData.txt");
        Writer writer = null;

        try
        {
            writer = new FileWriter(file);

            for (final ItemIngredient ingredient : ingredients)
            {
                writer.write("0 0 ");
                writer.write(ingredient.getName());
                writer.write("\n");
            }

        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            if (writer != null)
            {
                try
                {
                    writer.flush();
                    writer.close();
                }
                catch (final IOException e)
                {
                    // Nothing to do.
                }
            }
        }
    }
}
