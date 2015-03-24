package org.vizzini.ai.neuralnetwork;

/**
 * Provides a composite filter.
 * 
 * @param <I> Input type.
 * @param <C> Common type.
 * @param <O> Output type.
 */
public final class CompositeFilter<I, C, O> implements Filter<I, O>
{
    /** Filter. */
    private final Filter<I, C> filter1;

    /** Filter. */
    private final Filter<C, O> filter2;

    /**
     * Construct this object.
     * 
     * @param filter1 Filter.
     * @param filter2 Filter.
     */
    @SuppressWarnings("hiding")
    public CompositeFilter(final Filter<I, C> filter1, final Filter<C, O> filter2)
    {
        this.filter1 = filter1;
        this.filter2 = filter2;
    }

    @Override
    public O filter(final I input)
    {
        return filter2.filter(filter1.filter(input));
    }

    @Override
    public I reverseFilter(final O output)
    {
        return filter1.reverseFilter(filter2.reverseFilter(output));
    }
}
