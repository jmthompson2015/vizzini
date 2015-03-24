package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.Comparator;

/**
 * Provides a comparator for tree nodes.
 * 
 * @param <T> Type.
 */
public final class TreeNodeComparator<T> implements Comparator<TreeNode<T>>
{
    @Override
    public int compare(final TreeNode<T> treeNode1, final TreeNode<T> treeNode2)
    {
        int answer = 0;

        if (treeNode1 instanceof Terminal)
        {
            final Terminal<T> terminal1 = (Terminal<T>)treeNode1;

            if (treeNode2 instanceof Terminal)
            {
                final Terminal<T> terminal2 = (Terminal<T>)treeNode2;
                answer = compareTerminals(terminal1, terminal2);
            }
            else if (treeNode2 instanceof Function)
            {
                answer = -1;
            }
            else
            {
                throw new RuntimeException("Unknown tree node type: " + treeNode2.getClass().getName());
            }
        }
        else if (treeNode1 instanceof Function)
        {
            final Function<T> function1 = (Function<T>)treeNode1;

            if (treeNode2 instanceof Terminal)
            {
                answer = 1;
            }
            else if (treeNode2 instanceof Function)
            {
                final Function<T> function2 = (Function<T>)treeNode2;
                answer = compareFunctions(function1, function2);
            }
            else
            {
                throw new RuntimeException("Unknown tree node type: " + treeNode2.getClass().getName());
            }
        }
        else
        {
            throw new RuntimeException("Unknown tree node type: " + treeNode1.getClass().getName());
        }

        return answer;
    }

    /**
     * @param treeNode1 First tree node.
     * @param treeNode2 Second tree node.
     * 
     * @return -1, 0, 1 if treeNode1 is less than, equal to, or greater than treeNode2.
     */
    private int compareClassNames(final TreeNode<T> treeNode1, final TreeNode<T> treeNode2)
    {
        final String name1 = treeNode1.getClass().getName();
        final String name2 = treeNode2.getClass().getName();

        return name1.compareTo(name2);
    }

    /**
     * @param treeNode1 First tree node.
     * @param treeNode2 Second tree node.
     * 
     * @return -1, 0, 1 if treeNode1 is less than, equal to, or greater than treeNode2.
     */
    private int compareFunctions(final Function<T> treeNode1, final Function<T> treeNode2)
    {
        int answer = treeNode1.getArity() - treeNode2.getArity();

        if (answer == 0)
        {
            final int size = treeNode1.getArity();

            for (int i = 0; (answer == 0) && (i < size); i++)
            {
                answer = compare(treeNode1.getChildAt(i), treeNode2.getChildAt(i));
            }
        }

        if (answer == 0)
        {
            answer = compareClassNames(treeNode1, treeNode2);
        }

        return answer;
    }

    /**
     * @param treeNode1 First tree node.
     * @param treeNode2 Second tree node.
     * 
     * @return -1, 0, 1 if treeNode1 is less than, equal to, or greater than treeNode2.
     */
    private int compareTerminals(final Terminal<T> treeNode1, final Terminal<T> treeNode2)
    {
        int answer = 0;

        if ((treeNode1 instanceof ConstantTerminal) && (treeNode2 instanceof ConstantTerminal))
        {
            final ConstantTerminal<T> terminal1 = (ConstantTerminal<T>)treeNode1;
            final ConstantTerminal<T> terminal2 = (ConstantTerminal<T>)treeNode2;

            final T value1 = terminal1.getValue();

            if (value1 instanceof Comparable)
            {
                @SuppressWarnings("unchecked")
                final Comparable<T> comparable = (Comparable<T>)value1;
                answer = comparable.compareTo(terminal2.getValue());
            }
        }
        else if ((treeNode1 instanceof VariableTerminal) && (treeNode2 instanceof VariableTerminal))
        {
            final VariableTerminal<T> terminal1 = (VariableTerminal<T>)treeNode1;
            final VariableTerminal<T> terminal2 = (VariableTerminal<T>)treeNode2;

            answer = terminal1.getVariableName().compareTo(terminal2.getVariableName());
        }

        if (answer == 0)
        {
            answer = compareClassNames(treeNode1, treeNode2);
        }

        return answer;
    }
}
