package org.vizzini.ai.geneticalgorithm;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import org.junit.Test;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.RandomGenerator;

/**
 * Provides tests for the <code>DefaultGeneticAlgorithm</code> class.
 */
public final class DefaultGeneticAlgorithmTest
{
    /**
     * Provides an example evaluator for testing.
     */
    private final static class FibonnacciEvaluator implements Evaluator<Integer>
    {
        /** Expected sequence. */
        private static final Integer[] SEQUENCE = { 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, };

        /**
         * Construct this object.
         */
        public FibonnacciEvaluator()
        {
            // Nothing to do.
        }

        @Override
        public void evaluate(final Population<Integer> population)
        {
            for (final Genome<Integer> genome : population)
            {
                double fitness = 0;

                for (int i = 0; i < SEQUENCE.length; i++)
                {
                    if (genome.get(i) == SEQUENCE[i])
                    {
                        fitness++;
                    }
                }

                genome.setFitness(fitness);
            }
        }

        @Override
        public double idealEvaluation()
        {
            return 10.0;
        }

        @Override
        public boolean isMaximizing()
        {
            return true;
        }
    }

    /** Gene length. */
    private static final int GENOME_LENGTH = 10;

    /** Random generator. */
    final RandomGenerator randomGenerator = new DefaultRandomGenerator();

    /**
     * Test the <code>determineBest()</code> method.
     */
    @Test
    public void determineBest()
    {
        final int popSize = 300;
        final Population<Integer> population = createPopulation(popSize);
        final Evaluator<Integer> evaluator = createEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.05 * popSize);
        final int crossoverCount = (int)Math.round(0.75 * popSize);
        final int generationCount = 50;
        final CopyOperator<Integer> copyOperator = new DefaultCopyOperator<Integer>();
        final SelectionOperator<Integer> selectionOperator = new DefaultSelectionOperator<Integer>(selectionCount);
        final GenomeFactory<Integer> genomeFactory = createGenomeFactory();
        final CrossoverOperator<Integer> crossoverOperator = createCrossoverOperator();
        final MutationOperator<Integer> mutationOperator = createMutationOperator();
        final int backCount = 30;

        final GeneticAlgorithm<Integer> ga = new DefaultGeneticAlgorithm<Integer>(population, evaluator, copyCount,
                crossoverCount, generationCount, copyOperator, selectionOperator, genomeFactory, crossoverOperator,
                mutationOperator, backCount);

        final Genome<Integer> result = ga.determineBest();

        assertNotNull(result);
        System.out.println("best = " + result);
        assertThat(result.get(0), is(1));
        assertThat(result.get(1), is(1));
        assertThat(result.get(2), is(2));
        assertThat(result.get(3), is(3));
        assertThat(result.get(4), is(5));
    }

    /**
     * Test the <code>DefaultGeneticAlgorithm()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final Population<Integer> population = null;
        final Evaluator<Integer> evaluator = null;
        final int copyCount = 1;
        final int crossoverCount = 80;
        final int generationCount = 5;
        final CopyOperator<Integer> copyOperator = null;
        final SelectionOperator<Integer> selectionOperator = null;
        final GenomeFactory<Integer> genomeFactory = null;
        final CrossoverOperator<Integer> crossoverOperator = null;
        final MutationOperator<Integer> mutationOperator = null;
        final int backCount = -1;

        try
        {
            new DefaultGeneticAlgorithm<Integer>(population, evaluator, copyCount, crossoverCount, generationCount,
                    copyOperator, selectionOperator, genomeFactory, crossoverOperator, mutationOperator, backCount);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("population is null"));
        }
    }

    /**
     * @return a new, random integer gene.
     */
    int createGene()
    {
        return randomGenerator.generateInt(0, 100);
    }

    /**
     * @return a new crossover operator.
     */
    private CrossoverOperator<Integer> createCrossoverOperator()
    {
        return new CrossoverOperator<Integer>()
        {
            @Override
            public Genome<Integer> crossover(final Genome<Integer> genome1, final Genome<Integer> genome2)
            {
                final int length = genome1.length();
                final Genome<Integer> answer = new ListGenome<Integer>(length);

                final int index = randomGenerator.generateInt(0, length - 1);

                for (int i = 0; i < index; i++)
                {
                    answer.add(genome1.get(i));
                }

                for (int i = index; i < length; i++)
                {
                    answer.add(genome2.get(i));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new evaluator.
     */
    private Evaluator<Integer> createEvaluator()
    {
        return new FibonnacciEvaluator();
    }

    /**
     * @return a new genome factory.
     */
    private GenomeFactory<Integer> createGenomeFactory()
    {
        return new GenomeFactory<Integer>()
        {
            @Override
            public Genome<Integer> create()
            {
                final Genome<Integer> answer = new ListGenome<Integer>(GENOME_LENGTH);

                for (int i = 0; i < GENOME_LENGTH; i++)
                {
                    answer.add(createGene());
                }

                return answer;
            }
        };
    }

    /**
     * @return a new mutation operator.
     */
    private MutationOperator<Integer> createMutationOperator()
    {
        return new MutationOperator<Integer>()
        {
            @Override
            public Genome<Integer> mutate(final Genome<Integer> genome)
            {
                final int length = genome.length();
                final Genome<Integer> answer = new ListGenome<Integer>(length);

                final int index = randomGenerator.generateInt(0, length - 1);

                for (int i = 0; i < length; i++)
                {
                    if (i == index)
                    {
                        answer.add(createGene());
                    }
                    else
                    {
                        answer.add(genome.get(i));
                    }
                }

                return answer;
            }
        };
    }

    /**
     * @param popSize Population size.
     * 
     * @return a new population.
     */
    private Population<Integer> createPopulation(final int popSize)
    {
        final GenomeFactory<Integer> genomeFactory = createGenomeFactory();

        final Population<Integer> answer = new DefaultPopulation<Integer>();

        while (answer.size() < popSize)
        {
            final Genome<Integer> genome = genomeFactory.create();

            if (!answer.contains(genome))
            {
                answer.add(genome);
            }
        }

        return answer;
    }
}
