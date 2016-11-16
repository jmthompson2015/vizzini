package org.vizzini.runescape;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.Visitor;
import org.vizzini.core.crafting.Component;
import org.vizzini.core.crafting.DefaultRecipe;
import org.vizzini.core.crafting.Recipe;

/**
 * Provides an implementation of an item recipe.
 */
public final class ItemRecipe implements Recipe<ItemIngredient>
{
    /** Delegate. */
    private final Recipe<ItemIngredient> delegate;

    /** Skill. */
    private final Skill skill;

    /** Minimum skill level. */
    private final int level;

    /** Experience. (XP) */
    private final double xp;

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param components Components. (required)
     */
    @Deprecated
    public ItemRecipe(final String name, final List<ItemComponent> components)
    {
        this(name, Skill.AGILITY, 0, 0.0, components);
    }

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param skill Skill.
     * @param level Minimum skill level.
     * @param xp Experience.
     * @param components Components. (required)
     */
    @SuppressWarnings("hiding")
    public ItemRecipe(final String name, final Skill skill, final int level, final double xp,
            final ItemComponent... components)
    {
        delegate = new DefaultRecipe<ItemIngredient>(name, components);
        this.skill = skill;
        this.level = level;
        this.xp = xp;
    }

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param components Components. (required)
     * @param skill Skill.
     * @param level Minimum skill level.
     * @param xp Experience.
     */
    @Deprecated
    @SuppressWarnings("hiding")
    public ItemRecipe(final String name, final Skill skill, final int level, final double xp,
            final List<ItemComponent> components)
    {
        final List<Component<ItemIngredient>> list = new ArrayList<Component<ItemIngredient>>();
        for (final ItemComponent component : components)
        {
            list.add(component);
        }
        delegate = new DefaultRecipe<ItemIngredient>(name, list);
        // delegate = new DefaultRecipe<ItemIngredient>(name, components);
        this.skill = skill;
        this.level = level;
        this.xp = xp;
    }

    @Override
    public void accept(final Visitor<Recipe<ItemIngredient>> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public int compareTo(final Recipe<ItemIngredient> o)
    {
        return delegate.compareTo(o);
    }

    @Override
    public Component<ItemIngredient> getComponent(final int index)
    {
        return delegate.getComponent(index);
    }

    @Override
    public int getComponentCount()
    {
        return delegate.getComponentCount();
    }

    @Override
    public String getComponentsString()
    {
        return delegate.getComponentsString();
    }

    /**
     * @return the level
     */
    public int getLevel()
    {
        return level;
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    /**
     * @return the skill
     */
    public Skill getSkill()
    {
        return skill;
    }

    /**
     * @return the xp
     */
    public double getXp()
    {
        return xp;
    }

    @Override
    public String toString()
    {
        // return delegate.toString();
        final StringBuilder sb = new StringBuilder();

        // sb.append(getClass().getName());
        // sb.append(" [");
        sb.append("name=").append(getName());
        // sb.append(",components=").append(components);
        // sb.append("]");
        // for(int i=0;i<getComponentCount();i++)
        // {
        // sb.append(getComp)
        // }
        sb.append(",components=").append(getComponentsString());

        return sb.toString();
    }
}
