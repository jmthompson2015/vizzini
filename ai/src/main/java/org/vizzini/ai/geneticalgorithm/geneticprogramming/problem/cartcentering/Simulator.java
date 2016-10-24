package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.cartcentering;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides a simulator for the cart centering problem.
 */
final class Simulator
{
    /** V threshold. */
    private final double vThreshold;

    /** X threshold. */
    private final double xThreshold;

    /** Time step. */
    private static final double TAU = 0.02;

    /**
     * Construct this object.
     * 
     * @param xThreshold X threshold.
     * @param vThreshold V threshold.
     */
    @SuppressWarnings("hiding")
    public Simulator(final double xThreshold, final double vThreshold)
    {
        this.xThreshold = xThreshold;
        this.vThreshold = vThreshold;
    }

    /**
     * @param x0 Initial position.
     * @param v0 Initial velocity.
     * @param function Function.
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return the time to center.
     */
    public double run(final double x0, final double v0, final TreeNode<Double> function, final boolean isVerbose)
    {
        final CartContext context = new CartContext(x0, v0);
        boolean isDone = false;

        while (!isDone && (context.getTime() < 10.0))
        {
            final double a = wrap(function.getConverter(), function.evaluate(context));
            context.setTime(context.getTime() + TAU);
            context.setX(context.getX() + (TAU * context.getV())); // old v
            context.setV(context.getV() + (TAU * a));

            if (isVerbose)
            {
                System.out
                        .println(String.format("%5.2f %8.4f %8.4f", context.getTime(), context.getX(), context.getV()));
            }

            isDone = (Math.abs(context.getX()) < xThreshold) && (Math.abs(context.getV()) < vThreshold);
        }

        return context.getTime();
    }

    /**
     * @param converter Converter.
     * @param value Value.
     * 
     * @return the wrapped value.
     */
    private Double wrap(final Converter<Double> converter, final Double value)
    {
        Double answer;

        final double myValue = converter.toDouble(value);

        if (myValue > 0)
        {
            answer = converter.toT(1.0);
        }
        else
        {
            answer = converter.toT(-1.0);
        }

        return answer;
    }
}
