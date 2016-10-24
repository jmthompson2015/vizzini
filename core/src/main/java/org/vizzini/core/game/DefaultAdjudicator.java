package org.vizzini.core.game;

/**
 * Provides a default implementation of an adjudicator.
 */
public final class DefaultAdjudicator implements Adjudicator
{
    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     */
    @SuppressWarnings("hiding")
    public DefaultAdjudicator(final String name, final String description)
    {
        this.name = name;
        this.description = description;
    }

    @Override
    public Agent determineWinner(final Environment environment)
    {
        return null;
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        return true;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        return false;
    }
}
