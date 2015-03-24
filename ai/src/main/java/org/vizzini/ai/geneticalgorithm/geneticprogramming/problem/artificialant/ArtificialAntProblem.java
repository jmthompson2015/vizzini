package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultFunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultTerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.FunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPCrossoverOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPMutationOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.PrefixNotationVisitor;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.SequenceFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeUtilities;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.Problem;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides an artificial ant problem.
 */
public final class ArtificialAntProblem implements GenerationListener, Problem<Integer>
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final ArtificialAntProblem problem = new ArtificialAntProblem();

        final Genome<TreeNode<Integer>> result = problem.determineBest();
        final TreeNode<Integer> treeNode = result.get(0);

        System.out.println("\nbest = " + PrefixNotationVisitor.toEquation(treeNode) + " fitness = "
                + result.getFitness());
    }

    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /** Function builder. */
    final FunctionFactory<Integer> functionFactory;

    /** Random number generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Construct this object.
     */
    public ArtificialAntProblem()
    {
        final TerminalFactory<Integer> terminalFactory = new DefaultTerminalFactory<Integer>(getTerminalFactories(),
                converter, generator);

        final int maxLevelCount = 4;
        this.functionFactory = new DefaultFunctionFactory<Integer>(getFunctionExemplars(), maxLevelCount,
                terminalFactory, generator);
    }

    @Override
    public Genome<TreeNode<Integer>> determineBest()
    {
        final int popSize = 500;
        final Population<TreeNode<Integer>> population = createPopulation(popSize);
        final Evaluator<TreeNode<Integer>> evaluator = new ArtificialAntEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.05 * popSize);
        final int crossoverCount = (int)Math.round(0.75 * popSize);
        final int generationCount = 50;
        final CopyOperator<TreeNode<Integer>> copyOperator = new DefaultCopyOperator<TreeNode<Integer>>();
        final SelectionOperator<TreeNode<Integer>> selectionOperator = new DefaultSelectionOperator<TreeNode<Integer>>(
                selectionCount);
        final GenomeFactory<TreeNode<Integer>> genomeFactory = createGenomeFactory();
        final TreeNodeUtilities<Integer> treeNodeUtils = new TreeNodeUtilities<Integer>();
        final CrossoverOperator<TreeNode<Integer>> crossoverOperator = new GPCrossoverOperator<Integer>(treeNodeUtils,
                generator);
        final MutationOperator<TreeNode<Integer>> mutationOperator = new GPMutationOperator<Integer>(treeNodeUtils,
                functionFactory, generator);
        final int backCount = 30;

        final GeneticAlgorithm<TreeNode<Integer>> ga = new DefaultGeneticAlgorithm<TreeNode<Integer>>(population,
                evaluator, copyCount, crossoverCount, generationCount, copyOperator, selectionOperator, genomeFactory,
                crossoverOperator, mutationOperator, backCount);
        ga.addGenerationListener(this);

        return ga.determineBest();
    }

    @Override
    public void generationCompleted(final GenerationEvent event)
    {
        System.out.println(event);
    }

    @Override
    public Set<Function<Integer>> getFunctionExemplars()
    {
        final TreeNode<Integer> one = new ConstantTerminal<Integer>(converter, 1);
        final TreeNode<Integer> two = new ConstantTerminal<Integer>(converter, 2);
        final TreeNode<Integer> three = new ConstantTerminal<Integer>(converter, 3);

        final List<TreeNode<Integer>> children2 = new ArrayList<TreeNode<Integer>>();
        children2.add(one);
        children2.add(two);

        final List<TreeNode<Integer>> children3 = new ArrayList<TreeNode<Integer>>();
        children3.add(one);
        children3.add(two);
        children3.add(three);

        final Set<Function<Integer>> exemplars = new HashSet<Function<Integer>>();
        exemplars.add(new IfFoodAheadFunction(converter, one, two));
        exemplars.add(new SequenceFunction<Integer>(converter, children2));
        exemplars.add(new SequenceFunction<Integer>(converter, children3));

        return exemplars;
    }

    @Override
    public TreeNode<Integer> getSolution()
    {
        // If / Move / Right
        Function<Integer> function0;
        {
            final TreeNode<Integer> child0 = new MoveTerminal(converter);
            final TreeNode<Integer> child1 = new RightTerminal(converter);
            function0 = new IfFoodAheadFunction(converter, child0, child1);
        }

        // If / Move / Left
        Function<Integer> function1;
        {
            final TreeNode<Integer> child0 = new MoveTerminal(converter);
            final TreeNode<Integer> child1 = new LeftTerminal(converter);
            function1 = new IfFoodAheadFunction(converter, child0, child1);
        }

        // Sequence2 If/Move/Right and Right
        Function<Integer> sequence0;
        {
            final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>();
            children.add(function0);
            children.add(new RightTerminal(converter));
            sequence0 = new SequenceFunction<Integer>(converter, children);
        }

        // Sequence2 If/Move/Left and Move
        Function<Integer> sequence1;
        {
            final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>();
            children.add(function1);
            children.add(new MoveTerminal(converter));
            sequence1 = new SequenceFunction<Integer>(converter, children);
        }

        final TreeNode<Integer> child0 = new MoveTerminal(converter);

        // Sequence3 Left, sequence0, and sequence1
        Function<Integer> sequence2;
        {
            final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>();
            children.add(new LeftTerminal(converter));
            children.add(sequence0);
            children.add(sequence1);
            sequence2 = new SequenceFunction<Integer>(converter, children);
        }

        return new IfFoodAheadFunction(converter, child0, sequence2);
    }

    @Override
    public Set<Factory<Terminal<Integer>>> getTerminalFactories()
    {
        final Set<Factory<Terminal<Integer>>> factories = new HashSet<Factory<Terminal<Integer>>>();

        factories.add(new MoveTerminalFactory(converter));
        factories.add(new RightTerminalFactory(converter));
        factories.add(new LeftTerminalFactory(converter));

        return factories;
    }

    /**
     * @return a new genome factory.
     */
    private GenomeFactory<TreeNode<Integer>> createGenomeFactory()
    {
        return new GenomeFactory<TreeNode<Integer>>()
        {
            @Override
            public Genome<TreeNode<Integer>> create()
            {
                final TreeNode<Integer> function = functionFactory.create();
                final Genome<TreeNode<Integer>> answer = new ListGenome<TreeNode<Integer>>(1);
                answer.add(function);

                return answer;
            }
        };
    }

    /**
     * @param popSize Population size.
     * 
     * @return a new population.
     */
    private Population<TreeNode<Integer>> createPopulation(final int popSize)
    {
        final GenomeFactory<TreeNode<Integer>> genomeFactory = createGenomeFactory();
        final Population<TreeNode<Integer>> answer = new DefaultPopulation<TreeNode<Integer>>();

        while (answer.size() < popSize)
        {
            final Genome<TreeNode<Integer>> genome = genomeFactory.create();

            if (!answer.contains(genome))
            {
                answer.add(genome);
            }
        }

        return answer;
    }
}
