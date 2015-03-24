package org.vizzini.ai.geneticalgorithm.geneticprogramming;

/**
 * Defines methods required by a class to convert a function into a simpler form.
 * 
 * @param <T> Type.
 */
public interface Simplifier<T>
{
    /**
     * @param function Function.
     * 
     * @return a function.
     */
    TreeNode<T> simplify(final Function<T> function);
}
