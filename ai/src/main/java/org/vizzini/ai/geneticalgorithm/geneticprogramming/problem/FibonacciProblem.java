package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

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
import org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultContext;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultFunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultSimplifier;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultTerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.FunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPCrossoverOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPMutationOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.InfixNotationVisitor;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.PutVariableFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeInspector;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeUtilities;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminalFactory;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides tests for the <code>DefaultGeneticAlgorithm</code> class.
 */
public final class FibonacciProblem implements GenerationListener, Problem<Integer>
{
    /**
     * Provides an evaluator for this problem.
     */
    private final static class FibonacciEvaluator implements Evaluator<TreeNode<Integer>>
    {
        /** Expected sequence. */
        public static final Integer[] SEQUENCE = { 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987,
                1597, 2584, 4181, 6765, };

        /**
         * Construct this object.
         */
        public FibonacciEvaluator()
        {
            // Nothing to do.
        }

        @Override
        public void evaluate(final Population<TreeNode<Integer>> population)
        {
            for (final Genome<TreeNode<Integer>> genome : population)
            {
                double fitness = 0.0;
                final Function<Integer> function = (Function<Integer>)genome.get(0);
                final Context context = new DefaultContext();
                context.putVariable("f0", 0);
                context.putVariable("f1", 1);

                for (int i = 2; i < SEQUENCE.length; i++)
                {
                    final int f = function.evaluate(context);
                    final int f0 = (Integer)context.getVariable("f0");
                    final int f1 = (Integer)context.getVariable("f1");
                    final int reward = SEQUENCE.length - i;

                    if (f == SEQUENCE[i])
                    {
                        fitness += 2 * reward;
                    }

                    if (f1 == SEQUENCE[i - 1])
                    {
                        fitness += reward;
                    }

                    if (f0 == SEQUENCE[i - 2])
                    {
                        fitness += reward;
                    }

                    if (f >= f1)
                    {
                        fitness += 1;
                    }

                    if (f > f0)
                    {
                        fitness += 1;
                    }
                }

                // Penalize long answers.
                final TreeNodeInspector<Integer> inspector = new TreeNodeInspector<Integer>();
                function.accept(inspector);
                fitness -= inspector.getNodeCount();

                genome.setFitness(fitness);
            }
        }

        @Override
        public double idealEvaluation()
        {
            return 449.0;
        }

        @Override
        public boolean isMaximizing()
        {
            return true;
        }
    }

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final FibonacciProblem problem = new FibonacciProblem();

        final Genome<TreeNode<Integer>> result = problem.determineBest();
        final TreeNode<Integer> treeNode = result.get(0);

        System.out.println("\nbest = " + InfixNotationVisitor.toEquation(treeNode) + " fitness = "
                + result.getFitness());
        final TreeNode<Integer> simplerTreeNode = DefaultSimplifier.toSimplerTreeNode(treeNode);
        System.out.println("best = " + InfixNotationVisitor.toEquation(simplerTreeNode) + " fitness = "
                + result.getFitness());
    }

    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /** Function builder. */
    final FunctionFactory<Integer> functionFactory;

    /** Random number generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /** Variable names. */
    private final Set<String> variableNames = new TreeSet<String>(Arrays.asList(new String[] { "f0", "f1", }));

    /**
     * Construct this object.
     */
    public FibonacciProblem()
    {
        final TerminalFactory<Integer> terminalFactory = new DefaultTerminalFactory<Integer>(getTerminalFactories(),
                converter, generator);

        final int maxLevelCount = 3;
        this.functionFactory = new DefaultFunctionFactory<Integer>(getFunctionExemplars(), maxLevelCount,
                terminalFactory, generator);
    }

    @Override
    public Genome<TreeNode<Integer>> determineBest()
    {
        final int popSize = 200;
        final Population<TreeNode<Integer>> population = createPopulation(popSize);
        final Evaluator<TreeNode<Integer>> evaluator = new FibonacciEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.05 * popSize);
        final int crossoverCount = (int)Math.round(0.75 * popSize);
        final int generationCount = 20;
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

        final Set<Function<Integer>> exemplars = new HashSet<Function<Integer>>();
        exemplars.add(new AddFunction<Integer>(converter, one, two));

        for (final String variableName : variableNames)
        {
            exemplars.add(new PutVariableFunction<Integer>(converter, variableName, two));
        }

        return exemplars;
    }

    @Override
    public TreeNode<Integer> getSolution()
    {
        // put(f0, f1)
        final TreeNode<Integer> node0 = new VariableTerminal<Integer>(converter, "f1");
        final Function<Integer> function0 = new PutVariableFunction<Integer>(converter, "f0", node0);

        // f0 + put(f0, f1)
        final TreeNode<Integer> node1 = new VariableTerminal<Integer>(converter, "f0");
        final Function<Integer> function1 = new AddFunction<Integer>(converter, node1, function0);

        // put(f1, f0 + put(f0, f1))
        final Function<Integer> function = new PutVariableFunction<Integer>(converter, "f1", function1);

        return function;
    }

    @Override
    public Set<Factory<Terminal<Integer>>> getTerminalFactories()
    {
        final Factory<Terminal<Integer>> factory0 = new VariableTerminalFactory<Integer>(converter, variableNames,
                generator);
        final Set<Factory<Terminal<Integer>>> factories = new HashSet<Factory<Terminal<Integer>>>();
        factories.add(factory0);

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
