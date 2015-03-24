package org.vizzini.ai.geneticalgorithm;

import java.util.EventObject;

/**
 * Provides a generation event.
 */
public final class GenerationEvent extends EventObject
{
    /** Average evaluation. */
    private final Double averageEval;

    /** Best evaluation. */
    private final Double bestEval;

    /** Generation number. */
    private final int generationNumber;

    /** Maximum evaluation. */
    private final Double maxEval;

    /** Minimum evaluation. */
    private final Double minEval;

    /**
     * Construct this object.
     * 
     * @param source The object on which the Event initially occurred.
     * @param generationNumber Generation number.
     * @param bestEval Best evaluation.
     * @param averageEval Average evaluation.
     * @param minEval Minimum evaluation.
     * @param maxEval Maximum evaluation.
     */
    @SuppressWarnings("hiding")
    public GenerationEvent(final Object source, final int generationNumber, final Double bestEval,
            final Double averageEval, final Double minEval, final Double maxEval)
    {
        super(source);

        if (bestEval == null)
        {
            throw new IllegalArgumentException("bestEval is null");
        }

        if (averageEval == null)
        {
            throw new IllegalArgumentException("averageEval is null");
        }

        if (minEval == null)
        {
            throw new IllegalArgumentException("minEval is null");
        }

        if (maxEval == null)
        {
            throw new IllegalArgumentException("maxEval is null");
        }

        this.generationNumber = generationNumber;
        this.bestEval = bestEval;
        this.averageEval = averageEval;
        this.minEval = minEval;
        this.maxEval = maxEval;
    }

    /**
     * @return the averageEval
     */
    public Double getAverageEval()
    {
        return averageEval;
    }

    /**
     * @return the bestEval
     */
    public Double getBestEval()
    {
        return bestEval;
    }

    /**
     * @return the generationNumber
     */
    public int getGenerationNumber()
    {
        return generationNumber;
    }

    /**
     * @return the maxEval
     */
    public Double getMaxEval()
    {
        return maxEval;
    }

    /**
     * @return the minEval
     */
    public Double getMinEval()
    {
        return minEval;
    }

    @Override
    public String toString()
    {
        final double myBest = bestEval;
        final double myMin = minEval;

        final String extremeLabel = (myBest == myMin ? "max" : "min");
        final Double extreme = (myBest == myMin ? maxEval : minEval);

        String format;

        if (extreme < 1.0E+05)
        {
            format = "%3d bestEval = %8.4f (ave = %8.4f %s = %8.4f)";
        }
        else
        {
            format = "%3d bestEval = %8.4E (ave = %8.4E %s = %8.4E)";
        }

        return String.format(format, generationNumber, bestEval, averageEval, extremeLabel, extreme);
    }
}
