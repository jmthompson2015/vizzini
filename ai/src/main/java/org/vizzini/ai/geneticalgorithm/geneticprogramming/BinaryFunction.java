package org.vizzini.ai.geneticalgorithm.geneticprogramming;

/**
 * Defines methods required by a function which takes two arguments.
 * 
 * @param <T> Type.
 */
public interface BinaryFunction<T> extends Function<T>
{
    /** Arity. */
    public static final int ARITY = 2;

    /**
     * @return the first child.
     */
    TreeNode<T> getChild0();

    /**
     * @return the second child.
     */
    TreeNode<T> getChild1();

    /**
     * @param child0 Child node.
     * @param child1 Child node.
     * 
     * @return a new copy of this.
     */
    BinaryFunction<T> withChildren(TreeNode<T> child0, TreeNode<T> child1);
}
