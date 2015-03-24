package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.List;

/**
 * Defines methods required by a function in genetic programming.
 * 
 * @param <T> Type.
 */
public interface Function<T> extends TreeNode<T>
{
    /**
     * @return the arity
     */
    int getArity();

    /**
     * @param index Child index.
     * 
     * @return the child at the given index.
     */
    TreeNode<T> getChildAt(int index);

    /**
     * @return a new list of children.
     */
    List<TreeNode<T>> getChildren();

    /**
     * @param child Child node.
     * 
     * @return the index of <code>child</code> in the receivers children. If the receiver does not contain
     *         <code>child</code>, -1 will be returned.
     */
    int indexOf(TreeNode<T> child);

    /**
     * @param children Child nodes.
     * 
     * @return a new copy of this.
     */
    Function<T> withChildren(List<TreeNode<T>> children);
}
