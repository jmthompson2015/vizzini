package org.vizzini.ai.geneticalgorithm.geneticprogramming;

/**
 * Defines methods required by a function which takes three arguments.
 * 
 * @param <T> Type.
 */
public interface TernaryFunction<T> extends Function<T>
{
    /** Arity. */
    public static final int ARITY = 3;

    /**
     * @return the first child.
     */
    TreeNode<T> getChild0();

    /**
     * @return the second child.
     */
    TreeNode<T> getChild1();

    /**
     * @return the third child.
     */
    TreeNode<T> getChild2();

    /**
     * @param child0 Child node.
     * @param child1 Child node.
     * @param child2 Child node.
     * 
     * @return a new copy of this.
     */
    TernaryFunction<T> withChildren(TreeNode<T> child0, TreeNode<T> child1, TreeNode<T> child2);
}
