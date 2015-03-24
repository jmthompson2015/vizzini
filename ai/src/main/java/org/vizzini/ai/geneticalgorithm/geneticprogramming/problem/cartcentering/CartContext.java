package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.cartcentering;

import java.util.Set;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultContext;

/**
 * Provides a context for the cart centering problem.
 */
final class CartContext implements Context
{
    /** Delegate. */
    private final Context delegate = new DefaultContext();

    /**
     * Construct this object.
     * 
     * @param x0 Initial position.
     * @param v0 Initial velocity.
     */
    public CartContext(final double x0, final double v0)
    {
        putVariable("time", 0.0);
        putVariable("x", x0);
        putVariable("v", v0);
    }

    /**
     * @return time
     */
    public Double getTime()
    {
        return (Double)getVariable("time");
    }

    /**
     * @return v
     */
    public Double getV()
    {
        return (Double)getVariable("v");
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
    public Double getX()
    {
        return (Double)getVariable("x");
    }

    @Override
    public Context putVariable(final String name, final Object value)
    {
        return delegate.putVariable(name, value);
    }

    /**
     * @param time Value to set.
     */
    public void setTime(final Double time)
    {
        putVariable("time", time);
    }

    /**
     * @param v Value to set.
     */
    public void setV(final Double v)
    {
        putVariable("v", v);
    }

    /**
     * @param x Value to set.
     */
    public void setX(final Double x)
    {
        putVariable("x", x);
    }
}
