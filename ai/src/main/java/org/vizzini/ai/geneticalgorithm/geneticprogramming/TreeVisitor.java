package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.Visitor;

/**
 * Provides a visitor to print a tree as a tree.
 * 
 * @param <T> Type.
 */
public final class TreeVisitor<T> implements Visitor<TreeNode<T>>
{
    /**
     * @param treeNode Tree node.
     * 
     * @return the description.
     */
    public static <T> String toDescription(final TreeNode<T> treeNode)
    {
        final TreeVisitor<T> visitor = new TreeVisitor<T>();
        treeNode.accept(visitor);

        return visitor.getDescription();
    }

    /** Level. */
    private int level = 0;

    /** Node count. */
    private int nodeCount = 0;

    /** String builder. */
    private StringBuilder sb = new StringBuilder();

    /**
     * @return the description.
     */
    public String getDescription()
    {
        return sb.toString();
    }

    /**
     * @return the nodeCount
     */
    public int getNodeCount()
    {
        return nodeCount;
    }

    @Override
    public void visit(final TreeNode<T> treeNode)
    {
        sb.append(StringUtils.repeat("  ", level));
        sb.append(nodeCount);
        sb.append(": ");
        sb.append(treeNode.getSymbol());
        sb.append(" ");
        sb.append(treeNode.getClass().getSimpleName());
        sb.append("\n");

        nodeCount++;

        if (treeNode instanceof Function)
        {
            level++;

            final Function<T> function = (Function<T>)treeNode;
            final int size = function.getArity();

            for (int i = 0; i < size; i++)
            {
                final TreeNode<T> child = function.getChildAt(i);
                child.accept(this);
            }

            level--;
        }
    }
}
