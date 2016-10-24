package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.instanceOf;
import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>TreeNodeComparator</code> class.
 */
public final class TreeNodeComparatorTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>compare()</code> method.
     */
    @Test
    public void compareAll()
    {
        // Setup.
        final List<TreeNode<Double>> list = new ArrayList<TreeNode<Double>>();

        list.add(new ConstantTerminal<Double>(converterDouble, 2.0));
        list.add(new VariableTerminal<Double>(converterDouble, "x"));
        {
            final List<TreeNode<Double>> children = createChildrenDouble2();
            list.add(new AddFunction<Double>(converterDouble, children.get(0), children.get(1)));
        }
        {
            final List<TreeNode<Double>> children = createChildrenDouble3();
            list.add(new IfFunction<Double>(converterDouble, children.get(0), children.get(1), children.get(2)));
        }
        {
            final List<TreeNode<Double>> children = createChildrenDouble2();
            list.add(new SubtractFunction<Double>(converterDouble, children.get(0), children.get(1)));
        }
        {
            final List<TreeNode<Double>> children = createChildrenDouble2();
            list.add(new MultiplyFunction<Double>(converterDouble, children.get(0), children.get(1)));
        }
        {
            final List<TreeNode<Double>> children = createChildrenDouble2();
            list.add(new DivideFunction<Double>(converterDouble, children.get(0), children.get(1)));
        }
        {
            final List<TreeNode<Double>> children = createChildrenDouble2();
            list.add(new GreaterThanFunction<Double>(converterDouble, children.get(0), children.get(1)));
        }
        {
            final List<TreeNode<Double>> children = createChildrenDouble2();
            list.add(new PowerFunction<Double>(converterDouble, children.get(0), children.get(1)));
        }
        list.add(new PutVariableFunction<Double>(converterDouble, "y", createChildDouble()));
        list.add(new SineFunction<Double>(converterDouble, createChildDouble()));
        Collections.shuffle(list);
        final TreeNodeComparator<Double> comparator = new TreeNodeComparator<Double>();

        // Run.
        Collections.sort(list, comparator);

        // Verify.
        int i = 0;

        // Terminals.
        assertThat(list.get(i++), instanceOf(ConstantTerminal.class));
        assertThat(list.get(i++), instanceOf(VariableTerminal.class));

        // Functions arity 1.
        assertThat(list.get(i++), instanceOf(PutVariableFunction.class));
        assertThat(list.get(i++), instanceOf(SineFunction.class));

        // Functions arity 2.
        assertThat(list.get(i++), instanceOf(AddFunction.class));
        assertThat(list.get(i++), instanceOf(DivideFunction.class));
        assertThat(list.get(i++), instanceOf(GreaterThanFunction.class));
        assertThat(list.get(i++), instanceOf(MultiplyFunction.class));
        assertThat(list.get(i++), instanceOf(PowerFunction.class));
        assertThat(list.get(i++), instanceOf(SubtractFunction.class));

        // Functions arity 3.
        assertThat(list.get(i++), instanceOf(IfFunction.class));
    }

    /**
     * Test the <code>compare()</code> method.
     */
    @Test
    public void compareTerminals()
    {
        // Setup.
        final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>();
        children.add(new VariableTerminal<Integer>(converterInteger, "y"));
        children.add(new ConstantTerminal<Integer>(converterInteger, 3));
        children.add(new VariableTerminal<Integer>(converterInteger, "x"));
        children.add(new ConstantTerminal<Integer>(converterInteger, 2));
        children.add(new VariableTerminal<Integer>(converterInteger, "x"));
        final TreeNodeComparator<Integer> comparator = new TreeNodeComparator<Integer>();

        // Run.
        Collections.sort(children, comparator);

        // Verify.
        assertThat(children.size(), is(5));
        assertThat(children.get(0), instanceOf(ConstantTerminal.class));
        assertThat(((ConstantTerminal<Integer>)children.get(0)).getValue(), is(2));
        assertThat(children.get(1), instanceOf(ConstantTerminal.class));
        assertThat(((ConstantTerminal<Integer>)children.get(1)).getValue(), is(3));
        assertThat(children.get(2), instanceOf(VariableTerminal.class));
        assertThat(((VariableTerminal<Integer>)children.get(2)).getVariableName(), is("x"));
        assertThat(children.get(3), instanceOf(VariableTerminal.class));
        assertThat(((VariableTerminal<Integer>)children.get(3)).getVariableName(), is("x"));
        assertThat(children.get(4), instanceOf(VariableTerminal.class));
        assertThat(((VariableTerminal<Integer>)children.get(4)).getVariableName(), is("y"));
    }

    /**
     * @return a new list of children.
     */
    private TreeNode<Double> createChildDouble()
    {
        return new ConstantTerminal<Double>(converterDouble, 1.0);
    }

    /**
     * @return a new list of children.
     */
    private List<TreeNode<Double>> createChildrenDouble2()
    {
        final List<TreeNode<Double>> answer = new ArrayList<TreeNode<Double>>();

        answer.add(new ConstantTerminal<Double>(converterDouble, 1.0));
        answer.add(new ConstantTerminal<Double>(converterDouble, 2.0));

        return answer;
    }

    /**
     * @return a new list of children.
     */
    private List<TreeNode<Double>> createChildrenDouble3()
    {
        final List<TreeNode<Double>> answer = new ArrayList<TreeNode<Double>>();

        answer.add(new ConstantTerminal<Double>(converterDouble, 1.0));
        answer.add(new ConstantTerminal<Double>(converterDouble, 2.0));
        answer.add(new ConstantTerminal<Double>(converterDouble, 3.0));

        return answer;
    }
}
