package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem;

import java.util.ArrayList;
import java.util.Collections;
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
import org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminalFactory;
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
import org.vizzini.ai.geneticalgorithm.geneticprogramming.MultiplyFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeUtilities;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminalFactory;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides tests for the <code>DefaultGeneticAlgorithm</code> class.
 */
public final class QuadraticEquationProblem implements GenerationListener, Problem<Double>
{
    /**
     * Provides an example evaluator for testing.
     */
    private final static class QuadraticEvaluator implements Evaluator<TreeNode<Double>>
    {
        /**
         * Construct this object.
         */
        public QuadraticEvaluator()
        {
            // Nothing to do.
        }

        @Override
        public void evaluate(final Population<TreeNode<Double>> population)
        {
            for (final Genome<TreeNode<Double>> genome : population)
            {
                double fitness = 0.0;
                final Function<Double> function = (Function<Double>)genome.get(0);
                final Context context = new DefaultContext();

                for (int i = 0; i <= 10; i++)
                {
                    final double x = i;
                    context.putVariable("x", x);

                    // Target equation.
                    final double y = (2.0 * x * x) + (3.0 * x) + 4.0;

                    final double yy = function.evaluate(context);
                    final double error = yy - y;

                    fitness += error * error;
                }

                genome.setFitness(fitness);
            }
        }

        @Override
        public double idealEvaluation()
        {
            return -10000.0;
        }

        @Override
        public boolean isMaximizing()
        {
            return false;
        }
    }

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final QuadraticEquationProblem problem = new QuadraticEquationProblem();

        final Genome<TreeNode<Double>> result = problem.determineBest();
        final TreeNode<Double> treeNode = result.get(0);

        System.out.println("\nbest = " + InfixNotationVisitor.toEquation(treeNode) + " fitness = "
                + result.getFitness());
        final TreeNode<Double> simplerTreeNode = DefaultSimplifier.toSimplerTreeNode(treeNode);
        System.out.println("best = " + InfixNotationVisitor.toEquation(simplerTreeNode) + " fitness = "
                + result.getFitness());
    }

    /** Converter. */
    private final Converter<Double> converter = new Converter<Double>(Double.class);

    /** Function builder. */
    final FunctionFactory<Double> functionFactory;

    /** Random number generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Construct this object.
     */
    public QuadraticEquationProblem()
    {
        final TerminalFactory<Double> terminalFactory = new DefaultTerminalFactory<Double>(getTerminalFactories(),
                converter, generator);

        final int maxLevelCount = 4;
        functionFactory = new DefaultFunctionFactory<Double>(getFunctionExemplars(), maxLevelCount, terminalFactory,
                generator);
    }

    @Override
    public Genome<TreeNode<Double>> determineBest()
    {
        final int popSize = 1000;
        final Population<TreeNode<Double>> population = createPopulation(popSize);
        final Evaluator<TreeNode<Double>> evaluator = new QuadraticEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.05 * popSize);
        final int crossoverCount = (int)Math.round(0.75 * popSize);
        final int generationCount = 20;
        final CopyOperator<TreeNode<Double>> copyOperator = new DefaultCopyOperator<TreeNode<Double>>();
        final SelectionOperator<TreeNode<Double>> selectionOperator = new DefaultSelectionOperator<TreeNode<Double>>(
                selectionCount);
        final GenomeFactory<TreeNode<Double>> genomeFactory = createGenomeFactory();
        final TreeNodeUtilities<Double> treeNodeUtils = new TreeNodeUtilities<Double>();
        final CrossoverOperator<TreeNode<Double>> crossoverOperator = new GPCrossoverOperator<Double>(treeNodeUtils,
                generator);
        final MutationOperator<TreeNode<Double>> mutationOperator = new GPMutationOperator<Double>(treeNodeUtils,
                functionFactory, generator);
        final int backCount = 30;

        final GeneticAlgorithm<TreeNode<Double>> ga = new DefaultGeneticAlgorithm<TreeNode<Double>>(population,
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
    public Set<Function<Double>> getFunctionExemplars()
    {
        final TreeNode<Double> one = new ConstantTerminal<Double>(converter, 1.0);
        final TreeNode<Double> two = new ConstantTerminal<Double>(converter, 2.0);

        final Set<Function<Double>> answer = new HashSet<Function<Double>>();
        answer.add(new AddFunction<Double>(converter, one, two));
        answer.add(new MultiplyFunction<Double>(converter, one, two));

        return answer;
    }

    @Override
    public TreeNode<Double> getSolution()
    {
        // a * x^2
        final TreeNode<Double> node0 = new ConstantTerminal<Double>(converter, 2.0);
        final TreeNode<Double> node1 = new VariableTerminal<Double>(converter, "x");
        final TreeNode<Double> node2 = new VariableTerminal<Double>(converter, "x");
        final List<TreeNode<Double>> children0 = new ArrayList<TreeNode<Double>>();
        children0.add(node0);
        children0.add(node1);
        children0.add(node2);

        final Function<Double> function0 = MultiplyFunction.createTree(converter, children0);

        // b * x
        final TreeNode<Double> node3 = new ConstantTerminal<Double>(converter, 3.0);
        final TreeNode<Double> node4 = new VariableTerminal<Double>(converter, "x");
        final Function<Double> function1 = new MultiplyFunction<Double>(converter, node3, node4);

        // c
        final TreeNode<Double> node5 = new ConstantTerminal<Double>(converter, 4.0);

        // Add them.
        final List<TreeNode<Double>> children2 = new ArrayList<TreeNode<Double>>();
        children2.add(function0);
        children2.add(function1);
        children2.add(node5);

        return AddFunction.createTree(converter, children2);
    }

    @Override
    public Set<Factory<Terminal<Double>>> getTerminalFactories()
    {
        final Set<Factory<Terminal<Double>>> answer = new HashSet<Factory<Terminal<Double>>>();

        final Set<String> variableNames = Collections.singleton("x");

        answer.add(new ConstantTerminalFactory<Double>(converter, -10.0, 10.0, generator));
        answer.add(new VariableTerminalFactory<Double>(converter, variableNames, generator));

        return answer;
    }

    /**
     * @return a new genome factory.
     */
    private GenomeFactory<TreeNode<Double>> createGenomeFactory()
    {
        return new GenomeFactory<TreeNode<Double>>()
        {
            @Override
            public Genome<TreeNode<Double>> create()
            {
                final TreeNode<Double> function = functionFactory.create();
                final Genome<TreeNode<Double>> answer = new ListGenome<TreeNode<Double>>(1);
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
    private Population<TreeNode<Double>> createPopulation(final int popSize)
    {
        final GenomeFactory<TreeNode<Double>> genomeFactory = createGenomeFactory();
        final Population<TreeNode<Double>> answer = new DefaultPopulation<TreeNode<Double>>();

        while (answer.size() < popSize)
        {
            final Genome<TreeNode<Double>> genome = genomeFactory.create();

            if (!answer.contains(genome))
            {
                answer.add(genome);
            }
        }

        return answer;
    }
}
