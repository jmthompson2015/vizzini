package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>InfixNotationVisitor</code> class.
 */
public final class InfixNotationVisitorTest
{
    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationBinaryAdd()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 4);
        final TreeNode<Integer> function = new AddFunction<Integer>(converterInteger, child0, child1);

        // Run.
        final String result = InfixNotationVisitor.toEquation(function);

        // Verify.
        assertNotNull(result);
        final String expected = "(3 + 4)";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationBinaryMultiply()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 4);
        final TreeNode<Integer> function = new MultiplyFunction<Integer>(converterInteger, child0, child1);

        // Run.
        final String result = InfixNotationVisitor.toEquation(function);

        // Verify.
        assertNotNull(result);
        final String expected = "(3 * 4)";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationConstant()
    {
        // Setup.
        final TreeNode<Integer> terminal = new ConstantTerminal<Integer>(converterInteger, 3);

        // Run.
        final String result = InfixNotationVisitor.toEquation(terminal);

        // Verify.
        assertNotNull(result);
        final String expected = "3";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationTernary()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 4);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 5);
        final TreeNode<Integer> function = new IfFunction<Integer>(converterInteger, child0, child1, child2);

        // Run.
        final String result = InfixNotationVisitor.toEquation(function);

        // Verify.
        assertNotNull(result);
        final String expected = "if(3 ? 4 : 5)";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationUnaryAbsoluteValue()
    {
        // Setup.
        final TreeNode<Integer> child = new ConstantTerminal<Integer>(converterInteger, -3);
        final TreeNode<Integer> function = new AbsoluteValueFunction<Integer>(converterInteger, child);

        // Run.
        final String result = InfixNotationVisitor.toEquation(function);

        // Verify.
        assertNotNull(result);
        final String expected = "abs(-3)";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationUnaryPutVariable()
    {
        // Setup.
        final TreeNode<Integer> child = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> function = new PutVariableFunction<Integer>(converterInteger, "x", child);

        // Run.
        final String result = InfixNotationVisitor.toEquation(function);

        // Verify.
        assertNotNull(result);
        final String expected = "put(x, 3)";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationUnarySine()
    {
        // Setup.
        final TreeNode<Integer> child = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> function = new SineFunction<Integer>(converterInteger, child);

        // Run.
        final String result = InfixNotationVisitor.toEquation(function);

        // Verify.
        assertNotNull(result);
        final String expected = "sin(3)";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>toEquation()</code> method.
     */
    @Test
    public void toEquationVariable()
    {
        // Setup.
        final TreeNode<Integer> terminal = new VariableTerminal<Integer>(converterInteger, "x");

        // Run.
        final String result = InfixNotationVisitor.toEquation(terminal);

        // Verify.
        assertNotNull(result);
        final String expected = "x";
        // System.out.println("expected = " + expected);
        // System.out.println("result   = " + result);
        assertThat(result, is(expected));
    }
}
