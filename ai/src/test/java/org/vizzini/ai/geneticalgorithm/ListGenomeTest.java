package org.vizzini.ai.geneticalgorithm;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import org.junit.Test;

/**
 * Provides tests for the <code>ListGenome</code> class.
 */
public final class ListGenomeTest
{
    /** Fitness. */
    private static final double FITNESS = 12.3;

    /** Length. */
    private static final int LENGTH = 10;

    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void addTooMany()
    {
        final int length = 7;

        final Genome<Integer> genome = new ListGenome<Integer>(length);

        for (int i = 0; i < length; i++)
        {
            genome.add(i);
        }

        assertThat(genome.length(), is(length));

        try
        {
            genome.add(7);
            fail("Should have thrown an exception");
        }
        catch (final IndexOutOfBoundsException e)
        {
            assertThat(e.getMessage(), is("add() called on a full list."));
        }
    }

    /**
     * Test the <code>copy()</code> method.
     */
    @Test
    public void copy()
    {
        final Genome<Integer> genome = createGenome();
        final Genome<Integer> result = genome.copy();

        assertNotNull(result);
        assertThat(result.getFitness(), is(genome.getFitness()));
        assertThat(result.length(), is(genome.length()));

        for (int i = 0; i < result.length(); i++)
        {
            assertThat(result.get(i), is(genome.get(i)));
        }
    }

    /**
     * Test the <code>get()</code> method.
     */
    @Test
    public void get()
    {
        final Genome<Integer> genome = createGenome();

        for (int i = 0; i < 10; i++)
        {
            assertThat(genome.get(i), is(i + 1));
        }
    }

    /**
     * Test the <code>getFitness()</code> method.
     */
    @Test
    public void getFitness()
    {
        final Genome<Integer> genome = createGenome();

        assertThat(genome.getFitness(), is(FITNESS));
    }

    /**
     * Test the <code>getLength()</code> method.
     */
    @Test
    public void length()
    {
        final Genome<Integer> genome = createGenome();

        assertThat(genome.length(), is(LENGTH));
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final ListGenome<Integer> function0 = create0();
        final ListGenome<Integer> function1 = create1();
        final ListGenome<Integer> function2 = create0();

        assertTrue(function0.equals(function0));
        assertFalse(function0.equals(function1));
        assertTrue(function0.equals(function2));

        assertFalse(function1.equals(function0));
        assertTrue(function1.equals(function1));
        assertFalse(function1.equals(function2));

        assertTrue(function2.equals(function0));
        assertFalse(function2.equals(function1));
        assertTrue(function2.equals(function2));

        assertFalse(function0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final ListGenome<Integer> function0 = create0();
        final ListGenome<Integer> function1 = create1();
        final ListGenome<Integer> function2 = create0();

        assertTrue(function0.hashCode() == function0.hashCode());
        assertFalse(function0.hashCode() == function1.hashCode());
        assertTrue(function0.hashCode() == function2.hashCode());
    }

    /**
     * @return a new tree function.
     */
    private ListGenome<Integer> create0()
    {
        final ListGenome<Integer> answer = new ListGenome<Integer>(5);

        for (int i = 0; i < 5; i++)
        {
            answer.add(i);
        }

        return answer;
    }

    /**
     * @return a new tree function.
     */
    private ListGenome<Integer> create1()
    {
        final ListGenome<Integer> answer = new ListGenome<Integer>(5);

        for (int i = 0; i < 5; i++)
        {
            answer.add(i + 1);
        }

        return answer;
    }

    /**
     * @return a new genome.
     */
    private Genome<Integer> createGenome()
    {
        final Genome<Integer> answer = new ListGenome<Integer>(LENGTH);

        for (int i = 0; i < LENGTH; i++)
        {
            answer.add(i + 1);
        }

        answer.setFitness(FITNESS);

        return answer;
    }
}
