package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import org.junit.Test;

/**
 * Provides tests for the <code>IngredientRecipeBuilder</code> class.
 */
public final class IngredientRecipeBuilderTest
{
    /**
     * Test the <code>build()</code> method.
     */
    @Test
    public void build()
    {
        // Setup.
        final Reader jsFileReader = createReader();
        final IngredientRecipeBuilder builder = new IngredientRecipeBuilder(jsFileReader);

        // Run.
        builder.build();

        // Verify.
        final ResourceIngredientCollection elements = builder.getIngredientCollection();
        assertNotNull(elements);
        assertThat(elements.size(), is(343));

        verifyElementHorse(elements.findByName("Horse"));
        verifyElementSpear(elements.findByName("Spear"));
        verifyElementSword(elements.findByName("Sword"));
        verifyElementBow(elements.findByName("Bow"));

        final ResourceRecipeCollection recipes = builder.getRecipeCollection();
        assertNotNull(recipes);
        assertThat(recipes.size(), is(155));

        verifyRecipeBattleSword(recipes.findByName("Battle Sword"));
        verifyRecipeLivestock(recipes.findByName("Livestock"));
    }

    /**
     * Test the <code>IngredientRecipeBuilder()</code> method.
     */
    @Test
    public void testConstructor()
    {
        // Setup.
        final Reader jsFileReader = createReader();

        // Run.
        final IngredientRecipeBuilder builder = new IngredientRecipeBuilder(jsFileReader);

        // Verify.
        assertTrue(builder.getIngredientCollection().isEmpty());
        assertTrue(builder.getRecipeCollection().isEmpty());
    }

    /**
     * @return a new reader.
     */
    private Reader createReader()
    {
        final String filename = "crafting.js";
        final InputStream inputStream = IngredientRecipeBuilder.class.getClassLoader().getResourceAsStream(filename);

        return new InputStreamReader(inputStream);
    }

    /**
     * @param element Element.
     */
    private void verifyElementBow(final ResourceIngredient element)
    {
        assertNotNull(element);
        assertThat(element.getId(), is(4L));
        assertThat(element.getName(), is("Bow"));
        assertThat(element.getType(), is(ResourceType.BOW));
    }

    /**
     * @param element Element.
     */
    private void verifyElementHorse(final ResourceIngredient element)
    {
        assertNotNull(element);
        assertThat(element.getId(), is(1L));
        assertThat(element.getName(), is("Horse"));
        assertThat(element.getType(), is(ResourceType.MOUNT));
    }

    /**
     * @param element Element.
     */
    private void verifyElementSpear(final ResourceIngredient element)
    {
        assertNotNull(element);
        assertThat(element.getId(), is(5L));
        assertThat(element.getName(), is("Spear"));
        assertThat(element.getType(), is(ResourceType.SPEAR));
    }

    /**
     * @param element Element.
     */
    private void verifyElementSword(final ResourceIngredient element)
    {
        assertNotNull(element);
        assertThat(element.getId(), is(3L));
        assertThat(element.getName(), is("Sword"));
        assertThat(element.getType(), is(ResourceType.SWORD));
    }

    /**
     * @param recipe Recipe.
     */
    private void verifyRecipeBattleSword(final ResourceRecipe recipe)
    {
        assertNotNull(recipe);
        assertThat(recipe.getId(), is(42L));
        assertThat(recipe.getName(), is("Battle Sword"));
        assertThat(recipe.getComponentCount(), is(4));
        assertThat(recipe.getComponent(0).getIngredient().getName(), is("Sword"));
        assertThat(recipe.getComponent(1).getIngredient().getName(), is("Gold"));
        assertThat(recipe.getComponent(2).getIngredient().getName(), is("Puma Fur"));
        assertThat(recipe.getComponent(3).getIngredient().getName(), is("Mineral"));
    }

    /**
     * @param recipe Recipe.
     */
    private void verifyRecipeLivestock(final ResourceRecipe recipe)
    {
        assertNotNull(recipe);
        assertThat(recipe.getId(), is(1003L));
        assertThat(recipe.getName(), is("Livestock"));
        assertThat(recipe.getComponentCount(), is(3));
    }
}
