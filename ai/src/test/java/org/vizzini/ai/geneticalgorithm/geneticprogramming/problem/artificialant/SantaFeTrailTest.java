package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>SantaFeTrail</code> class.
 */
public final class SantaFeTrailTest
{
    /**
     * Test the <code>getInitialFoodCount()</code> method.
     */
    @Test
    public void getInitialFoodCount()
    {
        final SantaFeTrail environment = new SantaFeTrail();

        assertThat(environment.getInitialFoodCount(), is(89));
    }
}
