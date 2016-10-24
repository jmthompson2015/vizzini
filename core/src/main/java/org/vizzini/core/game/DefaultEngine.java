package org.vizzini.core.game;

import java.util.List;

/**
 * Provides a default implementation of an engine.
 */
public final class DefaultEngine implements Engine
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
    public DefaultEngine(final String name, final String description)
    {
        this.name = name;
        this.description = description;
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
    public void start(final Environment environment, final Adjudicator adjudicator, final List<Team> teams,
            final List<Agent> agents)
    {
        // Nothing to do.
    }
}
