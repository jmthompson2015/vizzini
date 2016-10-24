package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.Visitor;

/**
 * Provides a visitor to print a tree as an equation in prefix notation.
 * 
 * @param <T> Type.
 */
public final class PrefixNotationVisitor<T> implements Visitor<TreeNode<T>>
{
    /**
     * @param treeNode Tree node.
     * 
     * @return the equation.
     */
    public static <T> String toEquation(final TreeNode<T> treeNode)
    {
        final PrefixNotationVisitor<T> visitor = new PrefixNotationVisitor<T>();
        treeNode.accept(visitor);

        return visitor.getEquation();
    }

    /** String builder. */
    private StringBuilder sb = new StringBuilder();

    /**
     * @return the equation.
     */
    public String getEquation()
    {
        return sb.toString();
    }

    @Override
    public void visit(final TreeNode<T> treeNode)
    {
        if (treeNode instanceof Function)
        {
            appendFunction((Function<T>)treeNode);
        }
        else if (treeNode instanceof Terminal)
        {
            sb.append(treeNode.getSymbol());
        }
        else
        {
            throw new RuntimeException("Unknown tree node type: " + treeNode.getClass().getName());
        }
    }

    /**
     * @param function Function.
     */
    private void appendFunction(final Function<T> function)
    {
        sb.append(function.getSymbol());
        sb.append(" ");

        final int arity = function.getArity();

        for (int i = 0; i < arity; i++)
        {
            function.getChildAt(i).accept(this);

            if (i < (arity - 1))
            {
                sb.append(" ");
            }
        }
    }
}
