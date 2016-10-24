package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * Provides a default implementation of a simplifier.
 * 
 * @param <T> Type.
 */
public final class DefaultSimplifier<T> implements Simplifier<T>
{
    /**
     * @param treeNode Tree node.
     * 
     * @return the tree node.
     */
    public static <T> TreeNode<T> toSimplerTreeNode(final TreeNode<T> treeNode)
    {
        TreeNode<T> answer = treeNode;

        if (treeNode instanceof Function)
        {
            final Simplifier<T> simplifier = new DefaultSimplifier<T>();
            answer = simplifier.simplify((Function<T>)treeNode);
        }

        return answer;
    }

    @Override
    public TreeNode<T> simplify(final Function<T> function)
    {
        TreeNode<T> answer = function;

        if (function instanceof UnaryFunction)
        {
            answer = simplifyUnaryFunction((UnaryFunction<T>)function);
        }
        else if (function instanceof BinaryFunction)
        {
            answer = simplifyBinaryFunction((BinaryFunction<T>)function);
        }
        else if (function instanceof TernaryFunction)
        {
            answer = simplifyTernaryFunction((TernaryFunction<T>)function);
        }

        if (!answer.equals(function) && (answer instanceof Function))
        {
            answer = simplify((Function<T>)answer);
        }

        return answer;
    }

    /**
     * @param treeNode Tree node.
     * 
     * @return a tree node.
     */
    private T evaluate(final TreeNode<T> treeNode)
    {
        final Context context = new DefaultContext();

        return treeNode.evaluate(context);
    }

    /**
     * @param treeNode Tree node.
     * 
     * @return variable name.
     */
    private String getVariableName(final TreeNode<T> treeNode)
    {
        String answer = null;

        if (treeNode instanceof VariableTerminal)
        {
            answer = ((VariableTerminal<T>)treeNode).getVariableName();
        }
        else if (treeNode instanceof PutVariableFunction)
        {
            answer = ((PutVariableFunction<T>)treeNode).getVariableName();
        }

        return answer;
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyBinaryFunction(final BinaryFunction<T> function)
    {
        TreeNode<T> answer = function;

        final TreeNode<T> child0 = function.getChild0();
        final TreeNode<T> child1 = function.getChild1();

        if ((child0 instanceof ConstantTerminal) && (child1 instanceof ConstantTerminal))
        {
            answer = simplifyConstants(function);
        }
        else if ((child0 instanceof VariableTerminal) && (child1 instanceof VariableTerminal)
                && getVariableName(child0).equals(getVariableName(child1)))
        {
            answer = simplifyVariables(function);
        }
        else if ((child0 instanceof VariableTerminal) && (child1 instanceof PowerFunction))
        {
            answer = simplifyVariablePower(function);
        }
        else if ((function instanceof AddFunction) && (child0 instanceof Terminal) && (child1 instanceof AddFunction))
        {
            answer = simplifyBinaryFunctionTerminalFunction(function);
        }
        else if ((function instanceof AddFunction) && (child0 instanceof AddFunction)
                && (child1 instanceof AddFunction))
        {
            answer = simplifyBinaryFunctionX3(function);
        }
        else if ((function instanceof MultiplyFunction) && (child0 instanceof Terminal)
                && (child1 instanceof MultiplyFunction))
        {
            answer = simplifyBinaryFunctionTerminalFunction(function);
        }
        else if ((function instanceof MultiplyFunction) && (child0 instanceof MultiplyFunction)
                && (child1 instanceof MultiplyFunction))
        {
            answer = simplifyBinaryFunctionX3(function);
        }
        else if ((child0 instanceof Terminal) && (child1 instanceof Function))
        {
            final TreeNode<T> newChild1 = simplify((Function<T>)child1);
            answer = function.withChildren(child0, newChild1);
        }
        else if ((child0 instanceof Function) && (child1 instanceof Function))
        {
            final TreeNode<T> newChild0 = simplify((Function<T>)child0);
            final TreeNode<T> newChild1 = simplify((Function<T>)child1);
            answer = function.withChildren(newChild0, newChild1);
        }

        // if (!answer.equals(function))
        // {
        // System.out.println("answer = " + PrefixNotationVisitor.toEquation(answer));
        // }

        return answer;
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyBinaryFunctionTerminalFunction(final BinaryFunction<T> function)
    {
        final Terminal<T> child0 = (Terminal<T>)function.getChild0();
        final Function<T> child1 = (Function<T>)function.getChild1();

        final List<TreeNode<T>> grandchildren = new ArrayList<TreeNode<T>>();
        grandchildren.add(child0);
        grandchildren.addAll(child1.getChildren());
        Collections.sort(grandchildren, new TreeNodeComparator<T>());

        TreeNode<T> newChild0;
        TreeNode<T> newChild1;

        if (grandchildren.get(1) instanceof ConstantTerminal)
        {
            final Function<T> function0 = function.withChildren(grandchildren.get(0), grandchildren.get(1));

            newChild0 = simplify(function0);
            newChild1 = grandchildren.get(2).copy();
        }
        else
        {
            final Function<T> function1 = function.withChildren(grandchildren.get(1), grandchildren.get(2));

            newChild0 = grandchildren.get(0).copy();
            newChild1 = simplify(function1);
        }

        return function.withChildren(newChild0, newChild1);
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyBinaryFunctionX3(final BinaryFunction<T> function)
    {
        final Function<T> child0 = (Function<T>)function.getChild0();
        final Function<T> child1 = (Function<T>)function.getChild1();

        final List<TreeNode<T>> grandchildren = new ArrayList<TreeNode<T>>();
        grandchildren.addAll(child0.getChildren());
        grandchildren.addAll(child1.getChildren());
        Collections.sort(grandchildren, new TreeNodeComparator<T>());

        final Function<T> function0 = function.withChildren(grandchildren.get(0), grandchildren.get(1));
        final Function<T> function1 = function.withChildren(grandchildren.get(2), grandchildren.get(3));

        final TreeNode<T> newChild0 = simplify(function0);
        final TreeNode<T> newChild1 = simplify(function1);

        return function.withChildren(newChild0, newChild1);
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyConstants(final Function<T> function)
    {
        final T newValue = evaluate(function);

        return new ConstantTerminal<T>(function.getConverter(), newValue);
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyTernaryFunction(final TernaryFunction<T> function)
    {
        TreeNode<T> answer = function;

        final TreeNode<T> child0 = function.getChild0();
        final TreeNode<T> child1 = function.getChild1();
        final TreeNode<T> child2 = function.getChild2();

        if ((child0 instanceof ConstantTerminal) && (child1 instanceof ConstantTerminal)
                && (child2 instanceof ConstantTerminal))
        {
            answer = simplifyConstants(function);
        }
        else if ((function instanceof IfFunction) && (child0 instanceof ConstantTerminal))
        {
            final T eval0 = evaluate(child0);
            final Converter<T> converter = function.getConverter();
            final boolean isCondition = converter.toBoolean(eval0);
            answer = (isCondition ? child1 : child2);
        }

        return answer;
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyUnaryFunction(final UnaryFunction<T> function)
    {
        TreeNode<T> answer = function;

        final TreeNode<T> child = function.getChild();

        if (child instanceof ConstantTerminal)
        {
            answer = simplifyConstants(function);
        }
        else if (child instanceof Function)
        {
            final TreeNode<T> newChild = simplify((Function<T>)child);
            answer = function.withChild(newChild);
        }

        return answer;
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyVariablePower(final BinaryFunction<T> function)
    {
        TreeNode<T> answer = function;

        final VariableTerminal<T> child0 = (VariableTerminal<T>)function.getChild0();
        final PowerFunction<T> child1 = (PowerFunction<T>)function.getChild1();

        if (function instanceof MultiplyFunction)
        {
            if ((child1.getChild0() instanceof VariableTerminal)
                    && getVariableName(child0).equals(getVariableName(child1.getChild0())))
            {
                final Converter<T> converter = function.getConverter();
                final ConstantTerminal<T> exponent = (ConstantTerminal<T>)child1.getChild1();
                final T newValue = converter.increment(exponent.getValue());

                final TreeNode<T> newChild0 = child0.copy();
                final TreeNode<T> newChild1 = new ConstantTerminal<T>(converter, newValue);
                answer = new PowerFunction<T>(converter, newChild0, newChild1);
            }
        }
        else
        {
            final TreeNode<T> newChild1 = simplify(child1);
            answer = function.withChildren(child0, newChild1);
        }

        return answer;
    }

    /**
     * @param function Function.
     * 
     * @return a tree node.
     */
    private TreeNode<T> simplifyVariables(final BinaryFunction<T> function)
    {
        TreeNode<T> answer = function;

        final VariableTerminal<T> child0 = (VariableTerminal<T>)function.getChild0();
        final VariableTerminal<T> child1 = (VariableTerminal<T>)function.getChild1();

        final Converter<T> converter = function.getConverter();

        if (function instanceof AddFunction)
        {
            final TreeNode<T> newChild0 = new ConstantTerminal<T>(converter, converter.toT(2));
            final TreeNode<T> newChild1 = child1.copy();
            answer = new MultiplyFunction<T>(converter, newChild0, newChild1);
        }
        else if (function instanceof DivideFunction)
        {
            answer = new ConstantTerminal<T>(converter, converter.toT(1));
        }
        else if (function instanceof MultiplyFunction)
        {
            final TreeNode<T> newChild0 = child0.copy();
            final TreeNode<T> newChild1 = new ConstantTerminal<T>(converter, converter.toT(2));
            answer = new PowerFunction<T>(converter, newChild0, newChild1);
        }
        else if (function instanceof SubtractFunction)
        {
            answer = new ConstantTerminal<T>(converter, converter.toT(0));
        }

        return answer;
    }
}
