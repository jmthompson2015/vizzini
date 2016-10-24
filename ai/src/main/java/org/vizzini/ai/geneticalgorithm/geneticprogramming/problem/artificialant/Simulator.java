package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;

/**
 * Provides a simulator for the artificial ant problem.
 */
final class Simulator
{
    /**
     * @param function Function.
     * 
     * @return the amount of food consumed.
     */
    public int run(final TreeNode<Integer> function)
    {
        final AntContext context = new AntContext();
        final SantaFeTrail environment = context.getEnvironment();
        boolean isDone = false;
        int count = 0;

        while (!isDone)
        {
            count++;

            try
            {
                function.evaluate(context);

                if (environment.foodConsumed() == environment.getInitialFoodCount())
                {
                    isDone = true;
                }
            }
            catch (final ArrayIndexOutOfBoundsException e)
            {
                isDone = true;
            }

            if (context.getTime() > 420)
            {
                isDone = true;
            }

            if (count > 400)
            {
                isDone = true;
            }
        }

        return environment.foodConsumed();
    }
}
