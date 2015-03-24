package org.vizzini.core.crafting;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultRecipe</code> class.
 */
public final class DefaultRecipeTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>getComponentCount()</code> method.
     */
    @Test
    public void getComponent0()
    {
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        final Component<Ingredient> result = recipe.getComponent(0);

        assertNotNull(result);
        assertThat(result, is(testData.createWoodComponent50()));
    }

    /**
     * Test the <code>getComponentCount()</code> method.
     */
    @Test
    public void getComponent1()
    {
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        final Component<Ingredient> result = recipe.getComponent(1);

        assertNotNull(result);
        assertThat(result, is(testData.createClayComponent05()));
    }

    /**
     * Test the <code>getComponentCount()</code> method.
     */
    @Test
    public void getComponent2()
    {
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        final Component<Ingredient> result = recipe.getComponent(2);

        assertNotNull(result);
        assertThat(result, is(testData.createIronComponent15()));
    }

    /**
     * Test the <code>getComponentCount()</code> method.
     */
    @Test
    public void getComponent3()
    {
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        final Component<Ingredient> result = recipe.getComponent(3);

        assertNotNull(result);
        assertThat(result, is(testData.createGoldComponent02()));
    }

    /**
     * Test the <code>getComponentCount()</code> method.
     */
    @Test
    public void getComponentCount()
    {
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        final int result = recipe.getComponentCount();

        assertThat(result, is(4));
    }

    /**
     * Test the <code>getComponentCount()</code> method.
     */
    @Test
    public void getComponentOutOfRange()
    {
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        try
        {
            recipe.getComponent(-1);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("-1"));
        }

        try
        {
            recipe.getComponent(4);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("Index: 4, Size: 4"));
        }
    }

    /**
     * Test the <code>DefaultRecipe()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final Recipe<Ingredient> result = testData.getBowRecipe();

        assertThat(result.getName(), is(TestData.BOW_NAME));
        assertThat(result.getComponentCount(), is(4));
    }

    /**
     * Test the <code>DefaultRecipe()</code> method.
     */
    @Test
    public void testConstructor2()
    {
        final String name = "someName";
        final Ingredient ingredient0 = new DefaultIngredient("ingredient0");
        final Ingredient ingredient1 = new DefaultIngredient("ingredient1");
        final Component<Ingredient> component0 = new DefaultComponent<Ingredient>(1, ingredient0);
        final Component<Ingredient> component1 = new DefaultComponent<Ingredient>(2, ingredient1);

        @SuppressWarnings("unchecked")
        final Recipe<Ingredient> result = new DefaultRecipe<Ingredient>(name, component0, component1);

        assertThat(result.getName(), is(name));
        assertThat(result.getComponentCount(), is(2));
        assertThat(result.getComponent(0).getQuantity(), is(1.0));
        assertThat(result.getComponent(0).getIngredient().getName(), is("ingredient0"));
        assertThat(result.getComponent(1).getQuantity(), is(2.0));
        assertThat(result.getComponent(1).getIngredient().getName(), is("ingredient1"));
    }

    /**
     * Test the <code>DefaultRecipe()</code> method.
     */
    @SuppressWarnings("unchecked")
    @Test
    public void testConstructor2Null()
    {
        final String name = "someName";
        final Ingredient ingredient0 = new DefaultIngredient("ingredient0");
        final Ingredient ingredient1 = new DefaultIngredient("ingredient1");
        final Component<Ingredient> component0 = new DefaultComponent<Ingredient>(1, ingredient0);
        final Component<Ingredient> component1 = new DefaultComponent<Ingredient>(2, ingredient1);

        try
        {
            new DefaultRecipe<Ingredient>(null, component0, component1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultRecipe<Ingredient>(name);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("components is empty"));
        }

        try
        {
            new DefaultRecipe<Ingredient>(name, (Component<Ingredient>)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("components[0] is null"));
        }
    }

    /**
     * Test the <code>DefaultRecipe()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final String name = "someName";
        final Ingredient ingredient0 = new DefaultIngredient("ingredient0");
        final Ingredient ingredient1 = new DefaultIngredient("ingredient1");
        final Component<Ingredient> component0 = new DefaultComponent<Ingredient>(1, ingredient0);
        final Component<Ingredient> component1 = new DefaultComponent<Ingredient>(2, ingredient1);
        final List<Component<Ingredient>> list = new ArrayList<Component<Ingredient>>();
        list.add(component0);
        list.add(component1);

        try
        {
            new DefaultRecipe<Ingredient>(null, list);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }

        try
        {
            new DefaultRecipe<Ingredient>(name, (List<Component<Ingredient>>)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("components is null"));
        }

        try
        {
            new DefaultRecipe<Ingredient>(name, new ArrayList<Component<Ingredient>>());
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("components is empty"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Recipe<Ingredient> recipe0 = testData.getBowRecipe();
        final Recipe<Ingredient> recipe1 = testData.getSwordRecipe();
        final Recipe<Ingredient> recipe2 = testData.getBowRecipe();

        assertTrue(recipe0.equals(recipe0));
        assertFalse(recipe0.equals(recipe1));
        assertTrue(recipe0.equals(recipe2));

        assertFalse(recipe1.equals(recipe0));
        assertTrue(recipe1.equals(recipe1));
        assertFalse(recipe1.equals(recipe2));

        assertTrue(recipe2.equals(recipe0));
        assertFalse(recipe2.equals(recipe1));
        assertTrue(recipe2.equals(recipe2));

        assertFalse(recipe0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Recipe<Ingredient> recipe0 = testData.getBowRecipe();
        final Recipe<Ingredient> recipe1 = testData.getSwordRecipe();
        final Recipe<Ingredient> recipe2 = testData.getBowRecipe();

        assertTrue(recipe0.hashCode() == recipe0.hashCode());
        assertFalse(recipe0.hashCode() == recipe1.hashCode());
        assertTrue(recipe0.hashCode() == recipe2.hashCode());
    }

    /**
     * Test the <code>toString()</code> method.
     */
    @Test
    public void testToStringBow()
    {
        final Recipe<Ingredient> recipe = testData.getBowRecipe();

        final String expected = "org.vizzini.core.crafting.DefaultRecipe [name=Bow,components=[org.vizzini.core.crafting.DefaultComponent [quantity=50.0,ingredient=org.vizzini.core.crafting.DefaultIngredient [name=Wood]], org.vizzini.core.crafting.DefaultComponent [quantity=5.0,ingredient=org.vizzini.core.crafting.DefaultIngredient [name=Clay]], org.vizzini.core.crafting.DefaultComponent [quantity=15.0,ingredient=org.vizzini.core.crafting.DefaultIngredient [name=Iron]], org.vizzini.core.crafting.DefaultComponent [quantity=2.0,ingredient=org.vizzini.core.crafting.DefaultIngredient [name=Gold]]]]";
        final String result = recipe.toString();

        assertNotNull(result);
        assertThat(result, is(expected));
    }
}
