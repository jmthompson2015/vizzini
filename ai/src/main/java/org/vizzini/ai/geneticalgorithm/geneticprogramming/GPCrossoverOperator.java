package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.ai.geneticalgorithm.CrossoverOperator;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.ListGenome;
import org.vizzini.core.RandomGenerator;

/**
 * Provides an implementation of a crossover operator for genetic programming.
 * 
 * @param <T> Type.
 */
public final class GPCrossoverOperator<T> implements CrossoverOperator<TreeNode<T>>
{
    /** Random number generator. */
    private final RandomGenerator generator;

    /** Tree node utilities. */
    private final TreeNodeUtilities<T> treeNodeUtils;

    /**
     * Construct this object.
     * 
     * @param treeNodeUtils Tree node utilities.
     * @param generator Random number generator.
     */
    @SuppressWarnings("hiding")
    public GPCrossoverOperator(final TreeNodeUtilities<T> treeNodeUtils, final RandomGenerator generator)
    {
        if (treeNodeUtils == null)
        {
            throw new IllegalArgumentException("treeNodeUtils is null");
        }

        if (generator == null)
        {
            throw new IllegalArgumentException("generator is null");
        }

        this.treeNodeUtils = treeNodeUtils;
        this.generator = generator;
    }

    @Override
    public Genome<TreeNode<T>> crossover(final Genome<TreeNode<T>> genome1, final Genome<TreeNode<T>> genome2)
    {
        final Function<T> function1 = (Function<T>)genome1.get(0);
        final int index1 = selectPosition(function1);

        final TreeNode<T> replacement = selectReplacement((Function<T>)genome2.get(0));

        final TreeNode<T> newFunction = treeNodeUtils.copyAndReplaceNode(function1, index1, replacement);

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

    /**
     * @param function Function.
     * 
     * @return a subnode.
     */
    private TreeNode<T> selectReplacement(final Function<T> function)
    {
        final TreeNodeInspector<T> inspector = new TreeNodeInspector<T>();
        function.accept(inspector);
        final int nodeCount = inspector.getNodeCount();

        int index;

        if (nodeCount <= 1)
        {
            index = 0;
        }
        else
        {
            index = generator.generateInt(0, nodeCount - 1);
        }

        return inspector.getNode(index).copy();
    }
}
