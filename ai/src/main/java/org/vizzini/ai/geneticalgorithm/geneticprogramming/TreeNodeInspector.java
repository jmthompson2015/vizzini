package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.vizzini.core.Visitor;

/**
 * Provides a visitor to inspect the nodes in a tree.
 * 
 * @param <T> Type.
 */
public final class TreeNodeInspector<T> implements Visitor<TreeNode<T>>
{
    /** Map of index to node. */
    private Map<Integer, TreeNode<T>> indexToNode = new TreeMap<Integer, TreeNode<T>>();

    /** Level. */
    private int level = 0;

    /** Maximum levels. */
    private int maxLevels = 0;

    /** Node count. */
    private int nodeCount = 0;

    /**
     * @return the level
     */
    public int getLevel()
    {
        return level;
    }

    /**
     * @return the maxLevels
     */
    public int getMaxLevels()
    {
        return maxLevels;
    }

    /**
     * @param index Index.
     * 
     * @return the tree node at the given index.
     */
    public TreeNode<T> getNode(final int index)
    {
        return indexToNode.get(index);
    }

    /**
     * @return the nodeCount
     */
    public int getNodeCount()
    {
        return nodeCount;
    }

    /**
     * @param treeNode Tree node.
     * 
     * @return the index of the given parameter, or -1 if not found.
     */
    public int indexOf(final TreeNode<T> treeNode)
    {
        int answer = -1;

        for (final Entry<Integer, TreeNode<T>> entry : indexToNode.entrySet())
        {
            final TreeNode<T> value = entry.getValue();

            if ((value == treeNode) || value.equals(treeNode))
            {
                answer = entry.getKey();
                break;
            }
        }

        return answer;
    }

    @Override
    public void visit(final TreeNode<T> treeNode)
    {
        indexToNode.put(nodeCount, treeNode);

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

            maxLevels = Math.max(maxLevels, level);
            level--;
        }
    }
}
