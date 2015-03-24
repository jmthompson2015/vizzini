package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.Visitor;

/**
 * Provides a visitor to print a tree as an equation in infix notation.
 * 
 * @param <T> Type.
 */
public final class InfixNotationVisitor<T> implements Visitor<TreeNode<T>>
{
    /**
     * @param treeNode Tree node.
     * 
     * @return the equation.
     */
    public static <T> String toEquation(final TreeNode<T> treeNode)
    {
        final InfixNotationVisitor<T> visitor = new InfixNotationVisitor<T>();
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
            if (treeNode instanceof UnaryFunction)
            {
                appendUnaryFunction((UnaryFunction<T>)treeNode);
            }
            else if (treeNode instanceof BinaryFunction)
            {
                appendBinaryFunction((BinaryFunction<T>)treeNode);
            }
            else if (treeNode instanceof TernaryFunction)
            {
                appendTernaryFunction((TernaryFunction<T>)treeNode);
            }
            else if (treeNode instanceof SequenceFunction)
            {
                appendSequenceFunction((SequenceFunction<T>)treeNode);
            }
            else
            {
                throw new RuntimeException("Unknown function type: " + treeNode.getClass().getName());
            }
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
    private void appendBinaryFunction(final BinaryFunction<T> function)
    {
        final TreeNode<T> child0 = function.getChild0();
        final TreeNode<T> child1 = function.getChild1();

        sb.append("(");
        child0.accept(this);
        sb.append(" ");
        sb.append(function.getSymbol());
        sb.append(" ");
        child1.accept(this);
        sb.append(")");
    }

    /**
     * @param function Function.
     */
    private void appendSequenceFunction(final SequenceFunction<T> function)
    {
        sb.append(function.getSymbol());
        sb.append("(");

        final int arity = function.getArity();

        for (int i = 0; i < arity; i++)
        {
            function.getChildAt(i).accept(this);

            if (i < (arity - 1))
            {
                sb.append(", ");
            }
        }

        sb.append(")");
    }

    /**
     * @param function Function.
     */
    private void appendTernaryFunction(final TernaryFunction<T> function)
    {
        final TreeNode<T> child0 = function.getChild0();
        final TreeNode<T> child1 = function.getChild1();
        final TreeNode<T> child2 = function.getChild2();

        sb.append(function.getSymbol());
        sb.append("(");
        child0.accept(this);
        sb.append(" ? ");
        child1.accept(this);
        sb.append(" : ");
        child2.accept(this);
        sb.append(")");
    }

    /**
     * @param function Function.
     */
    private void appendUnaryFunction(final UnaryFunction<T> function)
    {
        final TreeNode<T> child = function.getChild();

        sb.append(function.getSymbol());
        sb.append("(");

        if (function instanceof PutVariableFunction)
        {
            sb.append(((PutVariableFunction<T>)function).getVariableName());
            sb.append(", ");
        }

        child.accept(this);
        sb.append(")");
    }
}
