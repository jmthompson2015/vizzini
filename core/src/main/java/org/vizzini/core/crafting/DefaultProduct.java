package org.vizzini.core.crafting;

import org.vizzini.core.Visitor;

/**
 * Provides a default implementation of a product.
 * 
 * @param <I> Ingredient type.
 * @param <R> Recipe type.
 */
public final class DefaultProduct<I extends Ingredient, R extends Recipe<I>> implements Product<I, R>
{
    /** Ask price. */
    private final double ask;

    /** Bid price. */
    private final double bid;

    /** Ingredient. */
    private final I ingredient;

    /** Recipe. */
    private final R recipe;

    /**
     * Construct this object.
     * 
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     */
    @SuppressWarnings("hiding")
    public DefaultProduct(final I ingredient, final double ask, final double bid)
    {
        this(ingredient, ask, bid, null);
    }

    /**
     * Construct this object.
     * 
     * @param ingredient Ingredient. (required)
     * @param ask Ask price.
     * @param bid Bid price.
     * @param recipe Recipe. (optional)
     */
    @SuppressWarnings("hiding")
    public DefaultProduct(final I ingredient, final double ask, final double bid, final R recipe)
    {
        if (ingredient == null)
        {
            throw new IllegalArgumentException("ingredient is null");
        }

        this.ingredient = ingredient;
        this.ask = ask;
        this.bid = bid;
        this.recipe = recipe;
    }

    @Override
    public void accept(final Visitor<Product<I, R>> visitor)
    {
        if (visitor == null)
        {
            throw new IllegalArgumentException("visitor is null");
        }

        visitor.visit(this);
    }

    @Override
    public int compareTo(final Product<I, R> another)
    {
        int answer = getName().compareTo(another.getName());

        if ((answer == 0) && (getRecipe() != null))
        {
            answer = getRecipe().compareTo(another.getRecipe());
        }

        return answer;
    }

    @Override
    public double getAsk()
    {
        return ask;
    }

    @Override
    public double getBid()
    {
        return bid;
    }

    @Override
    public String getComponentsString()
    {
        String answer = "";

        if (recipe != null)
        {
            answer = recipe.getComponentsString();
        }

        return answer;
    }

    @Override
    public I getIngredient()
    {
        return ingredient;
    }

    @Override
    public String getName()
    {
        return ingredient.getName();
    }

    @Override
    public R getRecipe()
    {
        return recipe;
    }

    @Override
    public boolean isCrafted()
    {
        return recipe != null;
    }
}
