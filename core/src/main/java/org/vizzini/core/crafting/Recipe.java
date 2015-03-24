package org.vizzini.core.crafting;

import org.vizzini.core.NamedObject;
import org.vizzini.core.Visitable;

/**
 * Defines methods required by a recipe.
 * 
 * @param <I> Ingredient type.
 */
public interface Recipe<I extends Ingredient> extends Comparable<Recipe<I>>, NamedObject, Visitable<Recipe<I>>
{
    /**
     * @param index Index.
     * 
     * @return the component at the given index.
     */
    Component<I> getComponent(int index);

    /**
     * @return the number of components.
     */
    int getComponentCount();

    /**
     * @return a new string.
     */
    String getComponentsString();
}
