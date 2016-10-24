package org.vizzini.ai.geneticalgorithm;

import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.RandomGenerator;

/**
 * Provides a default implementation of a selection operator. This implementation randomly selects from the top
 * <code>selectionCount</code> of <code>population</code>.
 * 
 * @param <E> Element type.
 */
public class DefaultSelectionOperator<E> implements SelectionOperator<E>
{
    /** Selection count. */
    private final int selectionCount;

    /** Random generator. */
    private final RandomGenerator randomGenerator = new DefaultRandomGenerator();

    /**
     * @param selectionCount Number of top genomes from which to select.
     */
    @SuppressWarnings("hiding")
    public DefaultSelectionOperator(final int selectionCount)
    {
        this.selectionCount = selectionCount;
    }

    @Override
    public Genome<E> select(final Population<E> population)
    {
        final int index = randomGenerator.generateInt(0, selectionCount - 1);

        return population.get(index);
    }
}
