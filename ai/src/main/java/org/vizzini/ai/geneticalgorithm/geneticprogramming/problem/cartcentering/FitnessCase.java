package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.cartcentering;

/**
 * Provides a fitness case for the cart centering problem.
 */
final class FitnessCase
{
    /** Initial v. */
    private final double v0;

    /** Initial x. */
    private final double x0;

    /**
     * Construct this object.
     * 
     * @param x0 Initial x.
     * @param v0 Initial v.
     */
    @SuppressWarnings("hiding")
    public FitnessCase(final double x0, final double v0)
    {
        this.x0 = x0;
        this.v0 = v0;
    }

    /**
     * @return the v0
     */
    public double getV0()
    {
        return v0;
    }

    /**
     * @return the x0
     */
    public double getX0()
    {
        return x0;
    }
}
