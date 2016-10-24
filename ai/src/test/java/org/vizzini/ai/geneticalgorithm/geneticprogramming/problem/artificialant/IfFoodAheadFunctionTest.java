package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides tests for the <code>IfFoodAheadFunction</code> class.
 */
public final class IfFoodAheadFunctionTest
{
    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /**
     * Test the <code>evaluate()</code> method.
     */
    @Test
    public void evaluate()
    {
        // Setup.
        final TreeNode<Integer> child0 = new ConstantTerminal<Integer>(converter, 1);
        final TreeNode<Integer> child1 = new ConstantTerminal<Integer>(converter, 2);
        final IfFoodAheadFunction function = new IfFoodAheadFunction(converter, child0, child1);
        final AntContext context = new AntContext();

        {
            // Run.
            final Integer result = function.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat(context.getX(), is(0));
            assertThat(context.getY(), is(0));
            assertThat(context.getDirection(), is(Direction.EAST));

            final SantaFeTrail environment = (SantaFeTrail)context.getVariable("environment");
            assertTrue(environment.isFootprint(0, 0));
            assertTrue(environment.isFood(1, 0));
            assertTrue(environment.isFood(2, 0));
            assertTrue(environment.isFood(3, 0));
            assertTrue(environment.isEmpty(4, 0));
            assertThat(environment.foodConsumed(), is(0));
        }

        new MoveTerminal(converter).evaluate(context);

        {
            // Run.
            final Integer result = function.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat(context.getX(), is(1));
            assertThat(context.getY(), is(0));
            assertThat(context.getDirection(), is(Direction.EAST));

            final SantaFeTrail environment = (SantaFeTrail)context.getVariable("environment");
            assertTrue(environment.isFootprint(0, 0));
            assertTrue(environment.isFootprint(1, 0));
            assertTrue(environment.isFood(2, 0));
            assertTrue(environment.isFood(3, 0));
            assertTrue(environment.isEmpty(4, 0));
            assertThat(environment.foodConsumed(), is(1));
        }

        new MoveTerminal(converter).evaluate(context);

        {
            // Run.
            final Integer result = function.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(1));
            assertThat(context.getX(), is(2));
            assertThat(context.getY(), is(0));
            assertThat(context.getDirection(), is(Direction.EAST));

            final SantaFeTrail environment = (SantaFeTrail)context.getVariable("environment");
            assertTrue(environment.isFootprint(0, 0));
            assertTrue(environment.isFootprint(1, 0));
            assertTrue(environment.isFootprint(2, 0));
            assertTrue(environment.isFood(3, 0));
            assertTrue(environment.isEmpty(4, 0));
            assertThat(environment.foodConsumed(), is(2));
        }

        new MoveTerminal(converter).evaluate(context);

        {
            // Run.
            final Integer result = function.evaluate(context);

            // Verify.
            assertNotNull(result);
            assertThat(result, is(2));
            assertThat(context.getX(), is(3));
            assertThat(context.getY(), is(0));
            assertThat(context.getDirection(), is(Direction.EAST));

            final SantaFeTrail environment = (SantaFeTrail)context.getVariable("environment");
            assertTrue(environment.isFootprint(0, 0));
            assertTrue(environment.isFootprint(1, 0));
            assertTrue(environment.isFootprint(2, 0));
            assertTrue(environment.isFootprint(3, 0));
            assertTrue(environment.isEmpty(4, 0));
            assertThat(environment.foodConsumed(), is(3));
        }
    }
}
