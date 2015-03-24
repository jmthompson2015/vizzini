package org.vizzini.core.game;

/**
 * Provides a default implementation of an action.
 */
public final class DefaultAction implements Action
{
    /** Agent. */
    private final Agent agent;

    /** Environment. */
    private final Environment environment;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    public DefaultAction(final Environment environment, final Agent agent)
    {
        this.environment = environment;
        this.agent = agent;
    }

    @Override
    public boolean doIt()
    {
        return false;
    }

    @Override
    public Agent getAgent()
    {
        return agent;
    }

    @Override
    public Environment getEnvironment()
    {
        return environment;
    }

    @Override
    public boolean undoIt()
    {
        return false;
    }
}
