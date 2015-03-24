package org.vizzini.ai.geneticalgorithm;

/**
 * Provides a default implementation of a phenotype.
 * 
 * @param <E> Genome element type.
 * @param <P> Phenome type.
 */
public final class DefaultPhenotype<E, P> implements Phenotype<E, P>
{
    /** Genome. */
    private final Genome<E> genome;

    /** Phenome. */
    private final P phenome;

    /**
     * Construct this object.
     * 
     * @param genome Genome.
     * @param phenome Phenome.
     */
    @SuppressWarnings("hiding")
    public DefaultPhenotype(final Genome<E> genome, final P phenome)
    {
        this.genome = genome;
        this.phenome = phenome;
    }

    @Override
    public Genome<E> getGenome()
    {
        return genome;
    }

    @Override
    public P getPhenome()
    {
        return phenome;
    }
}
