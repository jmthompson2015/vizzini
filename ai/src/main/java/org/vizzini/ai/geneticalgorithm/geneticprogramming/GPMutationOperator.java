package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.ListGenome;
import org.vizzini.ai.geneticalgorithm.MutationOperator;
import org.vizzini.core.RandomGenerator;

/**
 * Provides an implementation of a mutation operator for genetic programming.
 * 
 * @param <T> Type.
 */
public final class GPMutationOperator<T> implements MutationOperator<TreeNode<T>>
{
    /** Random number generator. */
    private final RandomGenerator generator;

    /** Function factory. */
    private final FunctionFactory<T> functionFactory;

    /** Tree node utilities. */
    private final TreeNodeUtilities<T> treeNodeUtils;

    /**
     * Construct this object.
     * 
     * @param treeNodeUtils Tree node utilities.
     * @param functionFactory Function factory.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public GPMutationOperator(final TreeNodeUtilities<T> treeNodeUtils, final FunctionFactory<T> functionFactory,
            final RandomGenerator generator)
    {
        if (treeNodeUtils == null)
        {
            throw new IllegalArgumentException("treeNodeUtils is null");
        }

        if (functionFactory == null)
        {
            throw new IllegalArgumentException("functionFactory is null");
        }

        if (generator == null)
        {
            throw new IllegalArgumentException("generator is null");
        }

        this.treeNodeUtils = treeNodeUtils;
        this.functionFactory = functionFactory;
        this.generator = generator;
    }

    @Override
    public Genome<TreeNode<T>> mutate(final Genome<TreeNode<T>> genome)
    {
        final Function<T> function = (Function<T>)genome.get(0);

        final int index = selectPosition(function);
        final TreeNode<T> replacement = functionFactory.create();
        final TreeNode<T> newFunction = treeNodeUtils.copyAndReplaceNode(function, index, replacement);

        final Genome<TreeNode<T>> answer = new ListGenome<TreeNode<T>>(1);
        answer.add(newFunction);

        return answer;
    }

    /**
     * @param function Function.
     * 
     * @return a non-root position.
     */
    private int selectPosition(final Function<T> function)
    {
        final TreeNodeInspector<T> inspector = new TreeNodeInspector<T>();
        function.accept(inspector);
        final int nodeCount = inspector.getNodeCount();

        final int answer;

        if (nodeCount <= 2)
        {
            answer = 1;
        }
        else
        {
            answer = generator.generateInt(1, nodeCount - 1);
        }

        return answer;
    }
}
