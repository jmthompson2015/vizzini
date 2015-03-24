package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.apache.commons.collections.CollectionUtils;
import org.vizzini.core.RandomGenerator;

/**
 * Provides a default implementation of a function factory.
 * 
 * @param <T> Type.
 */
public final class DefaultFunctionFactory<T> implements FunctionFactory<T>
{
    /** Function factories. */
    private final List<Function<T>> exemplars;

    /** Random number generator. */
    private final RandomGenerator generator;

    /** Maximum level count. */
    private final int maxLevelCount;

    /** Terminal factory. */
    private final TerminalFactory<T> terminalFactory;

    /**
     * Construct this object.
     * 
     * @param exemplars Function exemplars.
     * @param maxLevelCount Maximum level count.
     * @param terminalFactory Terminal factory.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public DefaultFunctionFactory(final Set<Function<T>> exemplars, final int maxLevelCount,
            final TerminalFactory<T> terminalFactory, final RandomGenerator generator)
    {
        if (CollectionUtils.isEmpty(exemplars))
        {
            throw new IllegalArgumentException("exemplars is null or empty");
        }

        if (terminalFactory == null)
        {
            throw new IllegalArgumentException("terminalFactory is null");
        }

        if (generator == null)
        {
            throw new IllegalArgumentException("generator is null");
        }

        this.exemplars = new ArrayList<Function<T>>(exemplars);
        this.maxLevelCount = maxLevelCount;
        this.terminalFactory = terminalFactory;
        this.generator = generator;
    }

    @Override
    public Function<T> create()
    {
        return createFunction(0);
    }

    @Override
    public int getMaxLevelCount()
    {
        return maxLevelCount;
    }

    @Override
    public Class<T> getReturnType()
    {
        return terminalFactory.getReturnType();
    }

    @Override
    public TerminalFactory<T> getTerminalFactory()
    {
        return terminalFactory;
    }

    /**
     * @param level Level.
     * @param childCount Child count.
     * 
     * @return a new list of children.
     */
    private List<TreeNode<T>> createChildren(final int level, final int childCount)
    {
        final List<TreeNode<T>> answer = new ArrayList<TreeNode<T>>();

        // FIXME: pick a random number of levels.
        final int levelCount = maxLevelCount;
        final boolean isTerminalsOnly = level >= levelCount;

        for (int i = 0; i < childCount; i++)
        {
            if (isTerminalsOnly)
            {
                answer.add(createTerminal());
            }
            else
            {
                // FIXME: add a function ratio and terminal ratio?
                final int index = generator.generateInt(0, 1);

                switch (index)
                {
                case 0:
                    answer.add(createFunction(level));
                    break;
                case 1:
                    answer.add(createTerminal());
                    break;
                }
            }
        }

        return answer;
    }

    /**
     * @param level Level.
     * 
     * @return a new randomly created function.
     */
    private Function<T> createFunction(final int level)
    {
        Function<T> exemplar;
        final int size = exemplars.size();

        if (size == 1)
        {
            exemplar = exemplars.get(0);
        }
        else
        {
            final int index = generator.generateInt(0, size - 1);
            exemplar = exemplars.get(index);
        }

        final List<TreeNode<T>> children = createChildren(level + 1, exemplar.getArity());

        return exemplar.withChildren(children);
    }

    /**
     * @return a new randomly created terminal.
     */
    private Terminal<T> createTerminal()
    {
        return terminalFactory.create();
    }
}
