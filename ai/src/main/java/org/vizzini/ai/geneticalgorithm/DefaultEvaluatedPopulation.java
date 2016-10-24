package org.vizzini.ai.geneticalgorithm;

import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;

/**
 * Provides a default implementation of an evaluated population.
 * 
 * @param <E> Element type.
 */
public final class DefaultEvaluatedPopulation<E> implements EvaluatedPopulation<E>
{
    /** Map of evaluation to genome. */
    private final Map<E, Double> map = new HashMap<E, Double>();

    @Override
    public Entry<E, Double> bestEntry()
    {
        // return map.firstEntry();
        Entry<E, Double> answer = null;
        Double max = -Double.MAX_VALUE;

        for (final Entry<E, Double> entry : map.entrySet())
        {
            final Double eval = entry.getValue();

            if (eval > max)
            {
                max = eval;
                answer = entry;
            }
        }

        return answer;
    }

    @Override
    public Double get(final E genome)
    {
        return map.get(genome);
    }

    @Override
    public void put(final E genome, final Double eval)
    {
        map.put(genome, eval);
    }
}
