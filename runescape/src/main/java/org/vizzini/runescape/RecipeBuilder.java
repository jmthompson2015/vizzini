package org.vizzini.runescape;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a builder for recipes.
 */
public final class RecipeBuilder
{
    /** Item recipe registry. */
    private final ItemRecipeRegistry recipeRegistry = new ItemRecipeRegistry();

    /** Item ingredient collection. */
    private final ItemIngredientCollection ingredients;

    /**
     * Construct this object.
     * 
     * @param ingredients Item ingredient collection.
     */
    @SuppressWarnings("hiding")
    public RecipeBuilder(final ItemIngredientCollection ingredients)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        this.ingredients = ingredients;
    }

    /**
     * Build.
     * 
     * @return this object.
     */
    public RecipeBuilder build()
    {
        return build(false);
    }

    /**
     * @param isVerbose Flag indicating whether to provide output.
     * 
     * @return this object.
     */
    public RecipeBuilder build(final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        addMetals();
        addJewels();

        final long end = System.currentTimeMillis();

        if (isVerbose)
        {
            System.out.println("Loaded " + getRecipeCollection().size() + " resource recipes in " + (end - start)
                    + " msec.");
        }

        return this;
    }

    /**
     * @return the recipeCollection
     */
    public ItemRecipeCollection getRecipeCollection()
    {
        return recipeRegistry.getCollection();
    }

    //
    // /**
    // * @param name Name.
    // * @param component Component.
    // */
    // @Deprecated
    // private void addItem(final String name, final ItemComponent component)
    // {
    // recipeRegistry.getInstance(name, Collections.singletonList(component));
    // }
    //
    // /**
    // * @param name Name.
    // * @param component Component.
    // */
    // private void addItem(final String name, final ItemComponent component, final Skill skill,
    // final int level, final int xp)
    // {
    // recipeRegistry.getInstance(name, Collections.singletonList(component), skill, level, xp);
    // }
    //
    // /**
    // * @param name Name.
    // * @param component Component.
    // */
    // private void addItem(final String name, final Skill skill, final int level, final int xp,
    // final ItemComponent component)
    // {
    // recipeRegistry.getInstance(name, skill, level, xp, component);
    // }

    /**
     * Add jewels.
     */
    private void addJewels()
    {
        final ItemIngredient gold = ingredients.findByName("Gold bar");

        final String[] names = { "Ruby", "Diamond", "Dragonstone", "Onxy" };
        final String[] types = { "ring", "necklace", "bracelet", "amulet" };

        for (final String name : names)
        {
            final ItemIngredient ingredient = ingredients.findByName("Uncut " + name.toLowerCase());
            // addItem(name, new ItemComponent(1, ingredient), Skill.CRAFTING, 20, 50);
            recipeRegistry.getInstance(name, new ItemComponent(1, ingredient));

            for (final String type : types)
            {
                final List<ItemComponent> list = new ArrayList<ItemComponent>();
                list.add(new ItemComponent(1, gold));
                list.add(new ItemComponent(1, ingredients.findByName(name)));
                recipeRegistry.getInstance(name + " " + type, list);
            }
        }

        final ItemComponent goldComp = new ItemComponent(1, gold);

        // Gold jewelry
        {
            final String name = "Gold";
            recipeRegistry.getInstance(name + " ring", Skill.CRAFTING, 5, 15, goldComp);
            recipeRegistry.getInstance(name + " necklace", Skill.CRAFTING, 6, 20, goldComp);
            recipeRegistry.getInstance(name + " bracelet", Skill.CRAFTING, 7, 25, goldComp);
            recipeRegistry.getInstance(name + " amulet", Skill.CRAFTING, 8, 30, goldComp);
        }

        // Sapphire jewelry
        {
            final String name = "Sapphire";
            final ItemIngredient uncutGem = ingredients.findByName("Uncut " + name.toLowerCase());
            recipeRegistry.getInstance(name, Skill.CRAFTING, 20, 50, new ItemComponent(1, uncutGem));
            final ItemIngredient gem = ingredients.findByName(name);
            final ItemComponent gemComp = new ItemComponent(1, gem);
            recipeRegistry.getInstance(name + " ring", Skill.CRAFTING, 20, 50, goldComp, gemComp);
            recipeRegistry.getInstance(name + " necklace", Skill.CRAFTING, 22, 55, goldComp, gemComp);
            recipeRegistry.getInstance(name + " bracelet", Skill.CRAFTING, 23, 60, goldComp, gemComp);
            recipeRegistry.getInstance(name + " amulet", Skill.CRAFTING, 24, 65, goldComp, gemComp);
        }

        // Emerald jewelry
        {
            final String name = "Emerald";
            final ItemIngredient uncutGem = ingredients.findByName("Uncut " + name.toLowerCase());
            recipeRegistry.getInstance(name, Skill.CRAFTING, 27, 67.5, new ItemComponent(1, uncutGem));
            final ItemIngredient gem = ingredients.findByName(name);
            final ItemComponent gemComp = new ItemComponent(1, gem);
            recipeRegistry.getInstance(name + " ring", Skill.CRAFTING, 27, 55, goldComp, gemComp);
            recipeRegistry.getInstance(name + " necklace", Skill.CRAFTING, 29, 60, goldComp, gemComp);
            recipeRegistry.getInstance(name + " bracelet", Skill.CRAFTING, 30, 65, goldComp, gemComp);
            recipeRegistry.getInstance(name + " amulet", Skill.CRAFTING, 31, 70, goldComp, gemComp);
        }
    }

    /**
     * Add metals.
     * 
     * @see "http://runescape.wikia.com/wiki/Metal"
     */
    private void addMetals()
    {
        // Bronze bar.
        recipeRegistry.getInstance("Bronze bar", Skill.SMITHING, 1, 6.2,
                new ItemComponent(1, ingredients.findByName("Copper ore")),
                new ItemComponent(1, ingredients.findByName("Tin ore")));

        // Iron bar.
        final ItemComponent ironComp = new ItemComponent(1, ingredients.findByName("Iron ore"));
        recipeRegistry.getInstance("Iron bar", Skill.SMITHING, 15, 12.5, ironComp);

        // Silver bar.
        recipeRegistry.getInstance("Silver bar", Skill.SMITHING, 20, 13.7,
                new ItemComponent(1, ingredients.findByName("Silver ore")));

        // Steel bar.
        final ItemIngredient coal = ingredients.findByName("Coal");
        recipeRegistry.getInstance("Steel bar", Skill.SMITHING, 30, 17.5, ironComp, new ItemComponent(2, coal));

        // Gold bar.
        recipeRegistry.getInstance("Gold bar", Skill.SMITHING, 40, 22.5,
                new ItemComponent(1, ingredients.findByName("Gold ore")));

        // Mithril bar.
        recipeRegistry.getInstance("Mithril bar", Skill.SMITHING, 50, 30,
                new ItemComponent(1, ingredients.findByName("Mithril ore")), new ItemComponent(4, coal));

        // Adamant bar.
        recipeRegistry.getInstance("Adamant bar", Skill.SMITHING, 70, 37.5,
                new ItemComponent(1, ingredients.findByName("Adamantite ore")), new ItemComponent(6, coal));

        // Rune bar.
        recipeRegistry.getInstance("Rune bar", Skill.SMITHING, 85, 50,
                new ItemComponent(1, ingredients.findByName("Runite ore")), new ItemComponent(8, coal));
    }
}
