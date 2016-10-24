package org.vizzini.illyriad.map;

import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.ai.geneticalgorithm.CopyOperator;
import org.vizzini.ai.geneticalgorithm.CrossoverOperator;
import org.vizzini.ai.geneticalgorithm.DefaultCopyOperator;
import org.vizzini.ai.geneticalgorithm.DefaultGeneticAlgorithm;
import org.vizzini.ai.geneticalgorithm.DefaultPopulation;
import org.vizzini.ai.geneticalgorithm.DefaultSelectionOperator;
import org.vizzini.ai.geneticalgorithm.Evaluator;
import org.vizzini.ai.geneticalgorithm.GenerationEvent;
import org.vizzini.ai.geneticalgorithm.GenerationListener;
import org.vizzini.ai.geneticalgorithm.GeneticAlgorithm;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.GenomeFactory;
import org.vizzini.ai.geneticalgorithm.ListGenome;
import org.vizzini.ai.geneticalgorithm.MutationOperator;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.SelectionOperator;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.RandomGenerator;

/**
 * Provides a genetic algorithm to solve the coordinates to geoId problem, f(x, y) = geoId.
 */
public class GeoIdGeneticAlgorithm implements GenerationListener
{
    /**
     * Provides an example evaluator for testing.
     */
    private final static class GeoIdEvaluator implements Evaluator<Integer>
    {
        /** Elgea expected values. */
        private static final Double[][] EXPECTED = { { 0.0, 0.0, 2002001.0, }, // center
                { -1000.0, 0.0, 2001001.0, }, // left center
                { 1000.0, 0.0, 2003001.0, }, // right center
                { 0.0, 1000.0, 1001.0, }, // center top
                { 0.0, -1000.0, 4003001.0, }, // center bottom
        };

        /** Broken Lands expected values. */
        // private static final Integer[][] EXPECTED = { { 0, -2300, 4502322, }, // center
        // { -1000, -2300, 8553312, }, // left center
        // { 1000, -2300, 4871136, }, // right center
        // { 0, -1300, 6434413, }, // center top
        // { 0, -3300, 6432770, }, // center bottom
        // };

        /**
         * Construct this object.
         */
        public GeoIdEvaluator()
        {
            // Nothing to do.
        }

        @Override
        public void evaluate(final Population<Integer> population)
        {
            for (final Genome<Integer> genome : population)
            {
                final double a = genome.get(0);
                final double b = genome.get(1);
                final double c = genome.get(2);
                // final double d = genome.get(3);
                // final double e = genome.get(4);

                double fitness = 0;

                for (final Double[] expectedArray : EXPECTED)
                {
                    final double x = expectedArray[0];
                    final double y = expectedArray[1];
                    final double expectedValue = expectedArray[2];

                    // final double value = (a * (x + b)) + (c * (y + d)) + e;
                    final double value = (a * x) + (b * y) + c;
                    final double error = value - expectedValue;
                    fitness += (error * error);
                }

                genome.setFitness(fitness);
            }
        }

        @Override
        public double idealEvaluation()
        {
            return 0.0;
        }

        @Override
        public boolean isMaximizing()
        {
            return false;
        }
    }

    /** Gene length. */
    private static final int GENOME_LENGTH = 3;

    /** Random generator. */
    final RandomGenerator randomGenerator = new DefaultRandomGenerator();

    /**
     * Test the <code>determineBest()</code> method.
     */
    @Test
    public void determineBest()
    {
        final int popSize = 3000;
        final Population<Integer> population = createPopulation(popSize);
        final Evaluator<Integer> evaluator = createEvaluator();
        final int selectionCount = (int)Math.round(0.30 * popSize);
        final int copyCount = (int)Math.round(0.01 * popSize);
        final int crossoverCount = (int)Math.round(0.89 * popSize);
        final int generationCount = 300;
        final CopyOperator<Integer> copyOperator = new DefaultCopyOperator<Integer>();
        final SelectionOperator<Integer> selectionOperator = new DefaultSelectionOperator<Integer>(selectionCount);
        final GenomeFactory<Integer> genomeFactory = createGenomeFactory();
        final CrossoverOperator<Integer> crossoverOperator = createCrossoverOperator();
        final MutationOperator<Integer> mutationOperator = createMutationOperator();
        final int backCount = 50;

        final GeneticAlgorithm<Integer> ga = new DefaultGeneticAlgorithm<Integer>(population, evaluator, copyCount,
                crossoverCount, generationCount, copyOperator, selectionOperator, genomeFactory, crossoverOperator,
                mutationOperator, backCount);
        ga.addGenerationListener(this);

        final Genome<Integer> result = ga.determineBest();

        assertNotNull(result);
        System.out.println("best = " + result);

        for (int i = 0; i < GENOME_LENGTH; i++)
        {
            System.out.println("genome.add(" + result.get(i) + ");");
        }

        assertTrue("result.getFitness() = " + result.getFitness(), result.getFitness() < 100.0);
    }

    @Override
    public void generationCompleted(final GenerationEvent event)
    {
        System.out.println(event);
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
        return new GeoIdEvaluator();
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

            /**
             * @return a new, random integer gene.
             */
            int createGene()
            {
                final int range = 2000000;

                return randomGenerator.generateInt(-range, range);
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
                        final int newValue = (int)(randomGenerator.generateDouble(-5.0, 5.0) * genome.get(i));
                        answer.add(newValue);
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

        // Seed with the Elgea solution.
        // {
        // final Genome<Integer> genome = new ListGenome<Integer>(GENOME_LENGTH);
        // genome.add(1.0);
        // genome.add(0.0);
        // genome.add(-2001.0);
        // genome.add(0.0);
        // genome.add(2002001.0);
        //
        // answer.add(genome);
        // }
        // Seed with a guess.
        // {
        // final Genome<Integer> genome = new ListGenome<Integer>(GENOME_LENGTH);
        // genome.add(1);
        // genome.add(-2003);
        // genome.add(2005256);
        //
        // answer.add(genome);
        // }

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
