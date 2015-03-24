package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides utility methods for a tree node.
 * 
 * @param <T> Type.
 */
public final class TreeNodeUtilities<T>
{
    /**
     * @param owner Owner.
     * @param index Index.
     * @param replacementNode Replacement node.
     * 
     * @return a new copy of this.
     */
    public Function<T> copyAndReplaceNode(final Function<T> owner, final int index, final TreeNode<T> replacementNode)
    {
        if (index <= 0)
        {
            throw new IllegalArgumentException("Error: can't replace parent node (index = " + index + ")");
        }

        final TreeNodeInspector<T> inspector = new TreeNodeInspector<T>();
        owner.accept(inspector);
        final TreeNode<T> oldNode = inspector.getNode(index);

        if (oldNode == null)
        {
            throw new IllegalArgumentException("index = " + index + " out of bounds (0," + inspector.getNodeCount()
                    + ")");
        }

        final Function<T> parent = (Function<T>)oldNode.getParent();
        final List<TreeNode<T>> newChildren = createNewChildren(parent, oldNode, replacementNode);
        final Function<T> newParent = parent.withChildren(newChildren);

        Function<T> answer = null;

        if (parent.getParent() == null)
        {
            answer = newParent;
        }
        else
        {
            final int parentIndex = inspector.indexOf(parent);

            if (parentIndex <= 0)
            {
                System.out.println("owner =\n" + TreeVisitor.toDescription(owner));
                throw new RuntimeException("Can't locate parent node parentIndex = " + parentIndex + " parent = "
                        + parent);
            }

            answer = copyAndReplaceNode(owner, parentIndex, newParent);
        }

        return answer;
    }

    /**
     * @param parent Parent node.
     * @param oldChild Old child node.
     * @param replacementNode Replacement node.
     * 
     * @return a new list of children.
     */
    private List<TreeNode<T>> createNewChildren(final Function<T> parent, final TreeNode<T> oldChild,
            final TreeNode<T> replacementNode)
    {
        final int size = parent.getArity();

        final List<TreeNode<T>> answer = new ArrayList<TreeNode<T>>(size);

        final int index = parent.indexOf(oldChild);

        for (int i = 0; i < index; i++)
        {
            answer.add(parent.getChildAt(i).copy());
        }

        answer.add(replacementNode);

        for (int i = index + 1; i < size; i++)
        {
            answer.add(parent.getChildAt(i).copy());
        }

        return answer;
    }
}
