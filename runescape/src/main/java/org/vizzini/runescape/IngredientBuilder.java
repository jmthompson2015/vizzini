package org.vizzini.runescape;

/**
 * Provides a builder for ingredients.
 */
public final class IngredientBuilder
{
    /** Item ingredient registry. */
    private final ItemIngredientRegistry ingredientRegistry = new ItemIngredientRegistry();

    /**
     * Build.
     * 
     * @return this object.
     */
    public IngredientBuilder build()
    {
        return build(false);
    }

    /**
     * @param isVerbose Flag indicating whether to provide output.
     * 
     * @return this object.
     */
    public IngredientBuilder build(final boolean isVerbose)
    {
        final long start = System.currentTimeMillis();

        ingredientRegistry.getInstance("Gold piece");

        addMetals();
        addJewels();

        final long end = System.currentTimeMillis();

        if (isVerbose)
        {
            System.out.println("Loaded " + getIngredientCollection().size() + " resource ingredients in "
                    + (end - start) + " msec.");
        }

        return this;
    }

    /**
     * @return the ingredientCollection
     */
    public ItemIngredientCollection getIngredientCollection()
    {
        return ingredientRegistry.getCollection();
    }

    /**
     * Add jewels.
     * 
     * @see "http://runescape.wikia.com/wiki/Jewellery"
     */
    private void addJewels()
    {
        ingredientRegistry.getInstance("Gold ring");
        ingredientRegistry.getInstance("Gold necklace");
        ingredientRegistry.getInstance("Gold bracelet");
        ingredientRegistry.getInstance("Gold amulet");

        final String[] jewelNames = { "Sapphire", "Emerald", "Ruby", "Diamond", "Dragonstone", "Onxy" };

        for (final String name : jewelNames)
        {
            ingredientRegistry.getInstance("Uncut " + name.toLowerCase());
            ingredientRegistry.getInstance(name);
            ingredientRegistry.getInstance(name + " ring");
            ingredientRegistry.getInstance(name + " necklace");
            ingredientRegistry.getInstance(name + " bracelet");
            ingredientRegistry.getInstance(name + " amulet");
        }
    }

    /**
     * Add metals.
     * 
     * @see "http://runescape.wikia.com/wiki/Metal"
     */
    private void addMetals()
    {
        // Ores.
        ingredientRegistry.getInstance("Coal");
        ingredientRegistry.getInstance("Copper ore");
        ingredientRegistry.getInstance("Tin ore");
        ingredientRegistry.getInstance("Iron ore");
        ingredientRegistry.getInstance("Silver ore");
        ingredientRegistry.getInstance("Gold ore");
        ingredientRegistry.getInstance("Mithril ore");
        ingredientRegistry.getInstance("Adamantite ore");
        ingredientRegistry.getInstance("Runite ore");

        // Bars.
        ingredientRegistry.getInstance("Bronze bar");
        ingredientRegistry.getInstance("Iron bar");
        ingredientRegistry.getInstance("Silver bar");
        ingredientRegistry.getInstance("Steel bar");
        ingredientRegistry.getInstance("Gold bar");
        ingredientRegistry.getInstance("Mithril bar");
        ingredientRegistry.getInstance("Adamant bar");
        ingredientRegistry.getInstance("Rune bar");

        // Other metals.
        ingredientRegistry.getInstance("Blurite ore");
        ingredientRegistry.getInstance("Blurite bar");
        ingredientRegistry.getInstance("Elemental ore");
        ingredientRegistry.getInstance("Elemental bar");
    }
}
