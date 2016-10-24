package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import java.util.Set;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultContext;

/**
 * Provides a context for the artificial ant problem.
 */
final class AntContext implements Context
{
    /** Delegate. */
    private final Context delegate = new DefaultContext();

    /**
     * Construct this object.
     */
    public AntContext()
    {
        putVariable("time", 0);
        putVariable("x", 0);
        putVariable("y", 0);
        putVariable("direction", Direction.EAST);
        putVariable("environment", new SantaFeTrail());
    }

    /**
     * @return x
     */
    public Direction getDirection()
    {
        return (Direction)getVariable("direction");
    }

    /**
     * @return environment
     */
    public SantaFeTrail getEnvironment()
    {
        return (SantaFeTrail)getVariable("environment");
    }

    /**
     * @return time
     */
    public Integer getTime()
    {
        return (Integer)getVariable("time");
    }

    @Override
    public Object getVariable(final String name)
    {
        return delegate.getVariable(name);
    }

    @Override
    public Set<String> getVariableNames()
    {
        return delegate.getVariableNames();
    }

    /**
     * @return x
     */
    public Integer getX()
    {
        return (Integer)getVariable("x");
    }

    /**
     * @return y
     */
    public Integer getY()
    {
        return (Integer)getVariable("y");
    }

    /**
     * @return incremented time.
     */
    public Integer incrementTime()
    {
        final Integer newTime = getTime() + 1;
        putVariable("time", newTime);

        return newTime;
    }

    @Override
    public Context putVariable(final String name, final Object value)
    {
        return delegate.putVariable(name, value);
    }

    /**
     * @param direction Value to set.
     */
    public void setDirection(final Direction direction)
    {
        putVariable("direction", direction);
    }

    /**
     * @param x Value to set.
     */
    public void setX(final Integer x)
    {
        putVariable("x", x);
    }

    /**
     * @param y Value to set.
     */
    public void setY(final Integer y)
    {
        putVariable("y", y);
    }
}
