package org.vizzini.ai.geneticalgorithm;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import org.junit.Test;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.RandomGenerator;

/**
 * Provides tests for the <code>DefaultGeneticAlgorithm</code> class.
 * 
 * @see "http://en.wikipedia.org/wiki/Travelling_salesman_problem"
 */
public final class TravellingSalesmanGeneticAlgorithmTest implements GenerationListener
{
    /**
     * Provides an example evaluator for testing.
     */
    private final static class TravellingSalesmanEvaluator implements Evaluator<String>
    {
        /**
         * Construct this object.
         */
        public TravellingSalesmanEvaluator()
        {
            // Nothing to do.
        }

        @Override
        public void evaluate(final Population<String> population)
        {
            for (final Genome<String> genome : population)
            {
                double fitness = 0;

                String city0 = genome.get(0);

                for (int i = 1; i < genome.length(); i++)
                {
                    final String city1 = genome.get(i);
                    fitness += DISTANCES.get(city0).get(city1);
                    city0 = city1;
                }

                genome.setFitness(fitness);
            }
        }

        @Override
        public double idealEvaluation()
        {
            return 62.0;
        }

        @Override
        public boolean isMaximizing()
        {
            return false;
        }
    }

    /** Distances between cities. */
    static final Map<String, Map<String, Integer>> DISTANCES = new TreeMap<String, Map<String, Integer>>();

    static
    {
        final Map<String, Integer> mapA = new TreeMap<String, Integer>();
        final Map<String, Integer> mapB = new TreeMap<String, Integer>();
        final Map<String, Integer> mapC = new TreeMap<String, Integer>();
        final Map<String, Integer> mapD = new TreeMap<String, Integer>();

        mapA.put("B", 20);
        mapA.put("C", 42);
        mapA.put("D", 35);

        mapB.put("A", 20);
        mapB.put("C", 30);
        mapB.put("D", 34);

        mapC.put("A", 42);
        mapC.put("B", 30);
        mapC.put("D", 12);

        mapD.put("A", 35);
        mapD.put("B", 34);
        mapD.put("C", 12);

        DISTANCES.put("A", mapA);
        DISTANCES.put("B", mapB);
        DISTANCES.put("C", mapC);
        DISTANCES.put("D", mapD);
    }

    /** Random number generator. */
    final RandomGenerator generator = new DefaultRandomGenerator();

    /** Random generator. */
    final RandomGenerator randomGenerator = new DefaultRandomGenerator();

    /**
     * Test the <code>determineBest()</code> method.
     */
    @Test
    public void determineBest()
    {
        final int popSize = 10;
        final Population<String> population = createPopulation(popSize);
        final Evaluator<String> evaluator = createEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.1 * popSize);
        final int crossoverCount = (int)Math.round(0.8 * popSize);
        final int generationCount = 20;
        final CopyOperator<String> copyOperator = new DefaultCopyOperator<String>();
        final SelectionOperator<String> selectionOperator = new DefaultSelectionOperator<String>(selectionCount);
        final GenomeFactory<String> genomeFactory = createGenomeFactory();
        final CrossoverOperator<String> crossoverOperator = createCrossoverOperator();
        final MutationOperator<String> mutationOperator = createMutationOperator();
        final int backCount = 30;

        final GeneticAlgorithm<String> ga = new DefaultGeneticAlgorithm<String>(population, evaluator, copyCount,
                crossoverCount, generationCount, copyOperator, selectionOperator, genomeFactory, crossoverOperator,
                mutationOperator, backCount);
        ga.addGenerationListener(this);

        final Genome<String> result = ga.determineBest();

        assertNotNull(result);
        System.out.println("best = " + result);
        assertThat(result.length(), is(4));
        if ("A".equals(result.get(0)))
        {
            assertThat(result.get(0), is("A"));
            assertThat(result.get(1), is("B"));
            assertThat(result.get(2), is("C"));
            assertThat(result.get(3), is("D"));
        }
        else
        {
            assertThat(result.get(0), is("D"));
            assertThat(result.get(1), is("C"));
            assertThat(result.get(2), is("B"));
            assertThat(result.get(3), is("A"));
        }
    }

    @Override
    public void generationCompleted(final GenerationEvent event)
    {
        System.out.println(event);
    }

    /**
     * Test the <code>DefaultGeneticAlgorithm()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        final Population<String> population = null;
        final Evaluator<String> evaluator = null;
        final int copyCount = 1;
        final int crossoverCount = 80;
        final int generationCount = 5;
        final CopyOperator<String> copyOperator = null;
        final SelectionOperator<String> selectionOperator = null;
        final GenomeFactory<String> genomeFactory = null;
        final CrossoverOperator<String> crossoverOperator = null;
        final MutationOperator<String> mutationOperator = null;
        final int backCount = -1;

        try
        {
            new DefaultGeneticAlgorithm<String>(population, evaluator, copyCount, crossoverCount, generationCount,
                    copyOperator, selectionOperator, genomeFactory, crossoverOperator, mutationOperator, backCount);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("population is null"));
        }
    }

    /**
     * @return the genome length.
     */
    int getGenomeLength()
    {
        return DISTANCES.size();
    }

    /**
     * @return a new crossover operator.
     */
    private CrossoverOperator<String> createCrossoverOperator()
    {
        return new CrossoverOperator<String>()
        {
            @Override
            public Genome<String> crossover(final Genome<String> genome1, final Genome<String> genome2)
            {
                final int length = genome1.length();
                final List<String> list = new ArrayList<String>(length);
                final int index = randomGenerator.generateInt(0, length - 1);

                for (int i = 0; i < index; i++)
                {
                    list.add(genome1.get(i));
                }

                for (int i = 0; i < length; i++)
                {
                    final String city = genome2.get(i);
                    if (!list.contains(city))
                    {
                        list.add(genome2.get(i));
                    }
                }

                final ListGenome<String> answer = new ListGenome<String>(length);
                answer.addAll(list);

                return answer;
            }
        };
    }

    /**
     * @return a new evaluator.
     */
    private Evaluator<String> createEvaluator()
    {
        return new TravellingSalesmanEvaluator();
    }

    /**
     * @return a new genome factory.
     */
    private GenomeFactory<String> createGenomeFactory()
    {
        return new GenomeFactory<String>()
        {
            @Override
            public Genome<String> create()
            {
                final Genome<String> answer = new ListGenome<String>(getGenomeLength());

                final List<String> list = new ArrayList<String>(DISTANCES.keySet());
                Collections.shuffle(list);

                for (int i = 0; i < getGenomeLength(); i++)
                {
                    answer.add(list.get(i));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new mutation operator.
     */
    private MutationOperator<String> createMutationOperator()
    {
        return new MutationOperator<String>()
        {
            @Override
            public Genome<String> mutate(final Genome<String> genome)
            {
                // Swap two cities.
                final int length = genome.length();
                final List<String> cities = ((ListGenome<String>)genome).getList();

                final int index0 = randomGenerator.generateInt(0, length - 1);
                final String city = cities.remove(index0);
                final int index1 = randomGenerator.generateInt(0, length - 1);
                cities.add(index1, city);

                final ListGenome<String> answer = new ListGenome<String>(length);
                answer.addAll(cities);

                return answer;
            }
        };
    }

    /**
     * @param popSize Population size.
     * 
     * @return a new population.
     */
    private Population<String> createPopulation(final int popSize)
    {
        final GenomeFactory<String> genomeFactory = createGenomeFactory();

        final Population<String> answer = new DefaultPopulation<String>();

        while (answer.size() < popSize)
        {
            final Genome<String> genome = genomeFactory.create();

            if (!answer.contains(genome))
            {
                answer.add(genome);
            }
        }

        return answer;
    }
}
