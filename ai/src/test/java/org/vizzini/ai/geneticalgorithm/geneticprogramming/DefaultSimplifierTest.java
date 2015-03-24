package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>DefaultSimplifier</code> class.
 */
public final class DefaultSimplifierTest
{
    /** Converter. */
    private final Converter<Double> converterDouble = new Converter<Double>(Double.class);

    /** Converter. */
    private final Converter<Integer> converterInteger = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAbsoluteValueAbsoluteValueConstant()
    {
        // Setup.
        final TreeNode<Integer> child = new ConstantTerminal<Integer>(converterInteger, -2);
        final Function<Integer> function0 = new AbsoluteValueFunction<Integer>(converterInteger, child);
        final Function<Integer> function = new AbsoluteValueFunction<Integer>(converterInteger, function0);
        assertThat(PrefixNotationVisitor.toEquation(function), is("abs abs -2"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "2";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAbsoluteValueConstant()
    {
        // Setup.
        final TreeNode<Integer> child = new ConstantTerminal<Integer>(converterInteger, -2);
        final Function<Integer> function = new AbsoluteValueFunction<Integer>(converterInteger, child);
        assertThat(PrefixNotationVisitor.toEquation(function), is("abs -2"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "2";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAddConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final Function<Integer> function = new AddFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("+ 2 3"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "5";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAddConstants3()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 4);
        final Function<Integer> function0 = new AddFunction<Integer>(converterInteger, child1, child2);
        final Function<Integer> function = new AddFunction<Integer>(converterInteger, child0, function0);
        assertThat(PrefixNotationVisitor.toEquation(function), is("+ 2 + 3 4"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "9";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAddConstants4()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 4);
        final TreeNode<Integer> child3 = new ConstantTerminal<Integer>(converterInteger, 5);
        final Function<Integer> function0 = new AddFunction<Integer>(converterInteger, child0, child1);
        final Function<Integer> function1 = new AddFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function = new AddFunction<Integer>(converterInteger, function0, function1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("+ + 2 3 + 4 5"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "14";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAddConstantVariable0()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child3 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function0 = new AddFunction<Integer>(converterInteger, child0, child1);
        final Function<Integer> function1 = new AddFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function = new AddFunction<Integer>(converterInteger, function0, function1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("+ + 2 x + 3 x"));
        assertThat(InfixNotationVisitor.toEquation(function), is("((2 + x) + (3 + x))"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "+ 5 * 2 x";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
        final String expected1 = "(5 + (2 * x))";
        assertThat(InfixNotationVisitor.toEquation(result), is(expected1));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAddConstantVariable1()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child3 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function1 = new AddFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function0 = new AddFunction<Integer>(converterInteger, child1, function1);
        final Function<Integer> function = new AddFunction<Integer>(converterInteger, child0, function0);
        assertThat(PrefixNotationVisitor.toEquation(function), is("+ 2 + x + 3 x"));
        assertThat(InfixNotationVisitor.toEquation(function), is("(2 + (x + (3 + x)))"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "+ 5 * 2 x";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
        final String expected1 = "(5 + (2 * x))";
        assertThat(InfixNotationVisitor.toEquation(result), is(expected1));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAddMultiplyConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 4);
        final TreeNode<Integer> child3 = new ConstantTerminal<Integer>(converterInteger, 5);
        final Function<Integer> function0 = new MultiplyFunction<Integer>(converterInteger, child0, child1);
        final Function<Integer> function1 = new MultiplyFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function = new AddFunction<Integer>(converterInteger, function0, function1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("+ * 2 3 * 4 5"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "26";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyAddVariables()
    {
        // Setup.
        final TreeNode<Integer> child0 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function = new AddFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("+ x x"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "* 2 x";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyDivideConstants()
    {
        // Setup.
        final TreeNode<Double> child0 = new ConstantTerminal<Double>(converterDouble, 2.0);
        final TreeNode<Double> child1 = new ConstantTerminal<Double>(converterDouble, 3.0);
        final Function<Double> function = new DivideFunction<Double>(converterDouble, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("/ 2.0 3.0"));
        final Simplifier<Double> simplifier = new DefaultSimplifier<Double>();

        // Run.
        final TreeNode<Double> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "0.6666666666666666";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyDivideVariables()
    {
        // Setup.
        final TreeNode<Integer> child0 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function = new DivideFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("/ x x"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "1";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyGreaterThanConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final Function<Integer> function = new GreaterThanFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("> 2 3"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "-1";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyIfConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 3);
        final Function<Integer> function = new IfFunction<Integer>(converterInteger, child0, child1, child2);
        assertThat(PrefixNotationVisitor.toEquation(function), is("if 1 2 3"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "2";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyIfConstantVariablesFalse()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, -1);
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child2 = new VariableTerminal<Integer>(converterInteger, "y");
        final Function<Integer> function = new IfFunction<Integer>(converterInteger, child0, child1, child2);
        assertThat(PrefixNotationVisitor.toEquation(function), is("if -1 x y"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "y";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyIfConstantVariablesTrue()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 1);
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child2 = new VariableTerminal<Integer>(converterInteger, "y");
        final Function<Integer> function = new IfFunction<Integer>(converterInteger, child0, child1, child2);
        assertThat(PrefixNotationVisitor.toEquation(function), is("if 1 x y"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "x";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyAddConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 4);
        final TreeNode<Integer> child3 = new ConstantTerminal<Integer>(converterInteger, 5);
        final Function<Integer> function0 = new AddFunction<Integer>(converterInteger, child0, child1);
        final Function<Integer> function1 = new AddFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, function0, function1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* + 2 3 + 4 5"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "45";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* 2 3"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "6";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyConstants3()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 4);
        final Function<Integer> function0 = new MultiplyFunction<Integer>(converterInteger, child1, child2);
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, child0, function0);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* 2 * 3 4"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "24";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyConstants4()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 4);
        final TreeNode<Integer> child3 = new ConstantTerminal<Integer>(converterInteger, 5);
        final Function<Integer> function0 = new MultiplyFunction<Integer>(converterInteger, child0, child1);
        final Function<Integer> function1 = new MultiplyFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, function0, function1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* * 2 3 * 4 5"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "120";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyConstantVariable0()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child3 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function0 = new MultiplyFunction<Integer>(converterInteger, child0, child1);
        final Function<Integer> function1 = new MultiplyFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, function0, function1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* * 2 x * 3 x"));
        assertThat(InfixNotationVisitor.toEquation(function), is("((2 * x) * (3 * x))"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "* 6 ^ x 2";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
        final String expected1 = "(6 * (x ^ 2))";
        assertThat(InfixNotationVisitor.toEquation(result), is(expected1));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyConstantVariable1()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child2 = new ConstantTerminal<Integer>(converterInteger, 3);
        final TreeNode<Integer> child3 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function1 = new MultiplyFunction<Integer>(converterInteger, child2, child3);
        final Function<Integer> function0 = new MultiplyFunction<Integer>(converterInteger, child1, function1);
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, child0, function0);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* 2 * x * 3 x"));
        assertThat(InfixNotationVisitor.toEquation(function), is("(2 * (x * (3 * x)))"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "* 6 ^ x 2";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
        final String expected1 = "(6 * (x ^ 2))";
        assertThat(InfixNotationVisitor.toEquation(result), is(expected1));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyVariables()
    {
        // Setup.
        final TreeNode<Integer> child0 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* x x"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "^ x 2";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyMultiplyVariables2()
    {
        // Setup.
        final TreeNode<Integer> child0 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child2 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function0 = new MultiplyFunction<Integer>(converterInteger, child1, child2);
        final Function<Integer> function = new MultiplyFunction<Integer>(converterInteger, child0, function0);
        assertThat(PrefixNotationVisitor.toEquation(function), is("* x * x x"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "^ x 3";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifyPowerConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final Function<Integer> function = new PowerFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("^ 2 3"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "8";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifySineConstant()
    {
        // Setup.
        final TreeNode<Double> child = new ConstantTerminal<Double>(converterDouble, Math.PI / 2.0);
        final Function<Double> function = new SineFunction<Double>(converterDouble, child);
        assertThat(PrefixNotationVisitor.toEquation(function), is("sin 1.5707963267948966"));
        final Simplifier<Double> simplifier = new DefaultSimplifier<Double>();

        // Run.
        final TreeNode<Double> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "1.0";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifySubtractConstants()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converterInteger, 2);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converterInteger, 3);
        final Function<Integer> function = new SubtractFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("- 2 3"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "-1";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }

    /**
     * Test the <code>simplify()</code> method.
     */
    @Test
    public void simplifySubtractVariables()
    {
        // Setup.
        final TreeNode<Integer> child0 = new VariableTerminal<Integer>(converterInteger, "x");
        final TreeNode<Integer> child1 = new VariableTerminal<Integer>(converterInteger, "x");
        final Function<Integer> function = new SubtractFunction<Integer>(converterInteger, child0, child1);
        assertThat(PrefixNotationVisitor.toEquation(function), is("- x x"));
        final Simplifier<Integer> simplifier = new DefaultSimplifier<Integer>();

        // Run.
        final TreeNode<Integer> result = simplifier.simplify(function);

        // Verify.
        assertNotNull(result);
        final String expected = "0";
        assertThat(PrefixNotationVisitor.toEquation(result), is(expected));
    }
}
