package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.Copyable;
import org.vizzini.core.Visitable;

/**
 * Defines methods required by a tree node in genetic programming.
 * 
 * @param <T> Type.
 */
public interface TreeNode<T> extends Copyable<TreeNode<T>>, Visitable<TreeNode<T>>
{
    /**
     * @param context Context in which to evaluate.
     * 
     * @return the evaluation.
     */
    T evaluate(Context context);

    /**
     * @return the converter
     */
    Converter<T> getConverter();

    /**
     * @return the parent
     */
    TreeNode<T> getParent();

    /**
     * @return the returnType.
     */
    Class<T> getReturnType();

    /**
     * @return the symbol
     */
    String getSymbol();

    /**
     * @param parent the parent to set.
     */
    void setParent(final TreeNode<T> parent);
}
