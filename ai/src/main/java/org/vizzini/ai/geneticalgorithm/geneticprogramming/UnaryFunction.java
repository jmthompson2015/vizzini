package org.vizzini.ai.geneticalgorithm.geneticprogramming;

/**
 * Defines methods required by a function which takes one argument.
 * 
 * @param <T> Type.
 */
public interface UnaryFunction<T> extends Function<T>
{
    /** Arity. */
    public static final int ARITY = 1;

    /**
     * @return the child.
     */
    TreeNode<T> getChild();

    /**
     * @param child Child node.
     * 
     * @return a new copy of this.
     */
    UnaryFunction<T> withChild(TreeNode<T> child);
}
