package org.vizzini.core.game;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a default implementation of a game.
 */
public final class DefaultGame implements Game
{
    /** Adjudicator. */
    private final Adjudicator adjudicator;

    /** Agents. */
    private final List<Agent> agents = new ArrayList<Agent>();

    /** Description. */
    private final String description;

    /** Engine. */
    private final Engine engine;

    /** Environment. */
    private final Environment environment;

    /** Name. */
    private final String name;

    /** Teams. */
    private final List<Team> teams;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     * @param engine Engine.
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param teams Teams.
     */
    @SuppressWarnings("hiding")
    public DefaultGame(final String name, final String description, final Engine engine, final Environment environment,
            final Adjudicator adjudicator, final List<Team> teams)
    {
        this.name = name;
        this.description = description;
        this.engine = engine;
        this.environment = environment;
        this.adjudicator = adjudicator;
        this.teams = new ArrayList<Team>(teams);
    }

    @Override
    public Adjudicator getAdjudicator()
    {
        return adjudicator;
    }

    @Override
    public List<Agent> getAgents()
    {
        return agents;
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    @Override
    public Engine getEngine()
    {
        return engine;
    }

    @Override
    public Environment getEnvironment()
    {
        return environment;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public List<Team> getTeams()
    {
        return new ArrayList<Team>(teams);
    }

    @Override
    public void start()
    {
        getEngine().start(getEnvironment(), getAdjudicator(), getTeams(), getAgents());
    }
}
