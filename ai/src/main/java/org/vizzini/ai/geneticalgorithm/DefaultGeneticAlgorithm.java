package org.vizzini.ai.geneticalgorithm;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Provides a default implementation of a genetic algorithm.
 * 
 * @param <E> Element type.
 */
public final class DefaultGeneticAlgorithm<E> implements GeneticAlgorithm<E>
{
    /** Best eval back count. */
    private final int backCount;

    /** Map of generation to best evaluation. */
    private final Map<Integer, Double> bestEvals = new HashMap<Integer, Double>();

    /** Number of genomes to copy into the next generation. */
    private final int copyCount;

    /** Copy operator. */
    private final CopyOperator<E> copyOperator;

    /** Number of genomes to crossover into the next generation. */
    private final int crossoverCount;

    /** Crossover operator. */
    private final CrossoverOperator<E> crossoverOperator;

    /** Evaluator. */
    private final Evaluator<E> evaluator;

    /** Generation count. */
    private final int generationCount;

    /** Generation listeners. */
    private final List<GenerationListener> generationListeners = new ArrayList<GenerationListener>();

    /** Genome factory. */
    private final GenomeFactory<E> genomeFactory;

    /** Mutation operator. */
    private final MutationOperator<E> mutationOperator;

    /** New population. */
    private final Population<E> newPop;

    /** Population of candidates. */
    private final Population<E> population;

    /** Selection operator. */
    private final SelectionOperator<E> selectionOperator;

    /**
     * @param population Population.
     * @param evaluator Evaluator.
     * @param copyCount Number of genomes to copy into the next generation.
     * @param crossoverCount Number of genomes to crossover into the next generation.
     * @param generationCount Number of genomes to mutate into the next generation.
     * @param selectionOperator Selection operator.
     * @param genomeFactory Genome factory.
     * @param copyOperator Copy operator.
     * @param crossoverOperator Crossover operator.
     * @param mutationOperator Mutation operator.
     * @param backCount Best eval back count.
     */
    @SuppressWarnings("hiding")
    public DefaultGeneticAlgorithm(final Population<E> population, final Evaluator<E> evaluator, final int copyCount,
            final int crossoverCount, final int generationCount, final CopyOperator<E> copyOperator,
            final SelectionOperator<E> selectionOperator, final GenomeFactory<E> genomeFactory,
            final CrossoverOperator<E> crossoverOperator, final MutationOperator<E> mutationOperator,
            final int backCount)
    {
        if (population == null)
        {
            throw new IllegalArgumentException("population is null");
        }

        this.population = population;
        this.evaluator = evaluator;
        this.copyCount = copyCount;
        this.crossoverCount = crossoverCount;
        final int mutateCount = this.population.size() - copyCount - crossoverCount;
        this.generationCount = generationCount;
        this.selectionOperator = selectionOperator;
        this.genomeFactory = genomeFactory;
        this.copyOperator = copyOperator;
        this.crossoverOperator = crossoverOperator;
        this.mutationOperator = mutationOperator;
        this.backCount = backCount;

        newPop = new DefaultPopulation<E>(population.size());

        System.out.println("copyCount = " + copyCount + " crossoverCount = " + crossoverCount + " mutateCount = "
                + mutateCount);
    }

    @Override
    public GeneticAlgorithm<E> addGenerationListener(final GenerationListener listener)
    {
        generationListeners.add(listener);

        return this;
    }

    @Override
    public Genome<E> determineBest()
    {
        Double bestEval = null;
        Genome<E> bestGenome = null;
        final GenomeComparator<E> comparator = new GenomeComparator<E>(evaluator.isMaximizing());

        for (int g = 0; g < generationCount; g++)
        {
            if (g > 0)
            {
                createNextGeneration();
            }

            evaluator.evaluate(population);
            Collections.sort(population, comparator);
            bestGenome = population.get(0);
            bestEval = bestGenome.getFitness();
            bestEvals.put(g, bestEval);
            fireGenerationCompleted(g);

            if (bestEval == evaluator.idealEvaluation())
            {
                System.out.println("Ideal evaluation. Stopping.");
                break;
            }

            final Double bestEvalBack = bestEvals.get(g - backCount);

            if ((bestEvalBack != null) && (bestEval.equals(bestEvalBack)))
            {
                System.out.println("No improvement. Stopping.");
                break;
            }
        }

        return bestGenome;
    }

    @Override
    public CopyOperator<E> getCopyOperator()
    {
        return copyOperator;
    }

    @Override
    public CrossoverOperator<E> getCrossoverOperator()
    {
        return crossoverOperator;
    }

    @Override
    public GenomeFactory<E> getGenomeFactory()
    {
        return genomeFactory;
    }

    @Override
    public MutationOperator<E> getMutationOperator()
    {
        return mutationOperator;
    }

    @Override
    public SelectionOperator<E> getSelectionOperator()
    {
        return selectionOperator;
    }

    @Override
    public GeneticAlgorithm<E> removeGenerationListener(final GenerationListener listener)
    {
        generationListeners.remove(listener);

        return this;
    }

    /**
     * Create the next generation's population.
     */
    private void createNextGeneration()
    {
        newPop.clear();

        // Copy over the first X genomes unchanged.
        for (int i = 0; i < copyCount; i++)
        {
            final Genome<E> genome = copyOperator.copy(population.get(i));
            newPop.add(genome);
        }

        // Crossover the top X genomes.
        final int maxTries = 100;
        int count = 0;

        while (newPop.size() < (copyCount + crossoverCount))
        {
            Genome<E> genome = null;

            if (count < maxTries)
            {
                final Genome<E> genome1 = selectionOperator.select(population);
                final Genome<E> genome2 = selectionOperator.select(population);

                genome = crossoverOperator.crossover(genome1, genome2);
            }
            else
            {
                genome = genomeFactory.create();
            }

            if (!newPop.contains(genome))
            {
                newPop.add(genome);
                count = 0;
            }

            count++;
        }

        // Mutate the top X genomes.
        final int popSize = population.size();
        count = 0;

        while (newPop.size() < popSize)
        {
            Genome<E> genome = null;

            if (count < maxTries)
            {
                final Genome<E> genome1 = selectionOperator.select(population);

                genome = mutationOperator.mutate(genome1);
            }
            else
            {
                genome = genomeFactory.create();
            }

            if (!newPop.contains(genome))
            {
                newPop.add(genome);
                count = 0;
            }

            count++;
        }

        population.clear();
        population.addAll(newPop);
    }

    /**
     * @param generationNumber Generation number.
     */
    private void fireGenerationCompleted(final int generationNumber)
    {
        final Genome<E> bestGenome = population.get(0);
        final Double bestEval = bestGenome.getFitness();
        final Double averageEval = population.getAverageFitness();
        final Double minEval;
        final Double maxEval;

        if (evaluator.isMaximizing())
        {
            minEval = population.get(population.size() - 1).getFitness();
            maxEval = population.get(0).getFitness();
        }
        else
        {
            minEval = population.get(0).getFitness();
            maxEval = population.get(population.size() - 1).getFitness();
        }

        final GenerationEvent event = new GenerationEvent(this, generationNumber, bestEval, averageEval, minEval,
                maxEval);

        for (final GenerationListener listener : generationListeners)
        {
            listener.generationCompleted(event);
        }
    }
}
