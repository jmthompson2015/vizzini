package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.cartcentering;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
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
import org.vizzini.ai.geneticalgorithm.geneticprogramming.AbsoluteValueFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.AddFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultFunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultSimplifier;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultTerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DivideFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.FunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPCrossoverOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPMutationOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GreaterThanFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.InfixNotationVisitor;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.MultiplyFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.SubtractFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeUtilities;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.Problem;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;

/**
 * Provides a cart centering problem.
 */
public final class CartCenteringProblem implements GenerationListener, Problem<Double>
{
    /** X threshold. */
    private static final double DELTAX = 0.01;

    /** V threshold. */
    private static final double DELTAV = DELTAX;

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final CartCenteringProblem problem = new CartCenteringProblem();

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
    public CartCenteringProblem()
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
        final int popSize = 500;
        final Population<TreeNode<Double>> population = createPopulation(popSize);
        final List<FitnessCase> fitnessCases = createFitnessCases(20, false);
        final Evaluator<TreeNode<Double>> evaluator = new CartCenteringEvaluator(fitnessCases, DELTAX, DELTAV);
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.05 * popSize);
        final int crossoverCount = (int)Math.round(0.75 * popSize);
        final int generationCount = 50;
        final CopyOperator<TreeNode<Double>> copyOperator = new DefaultCopyOperator<TreeNode<Double>>();
        final SelectionOperator<TreeNode<Double>> selectionOperator = new DefaultSelectionOperator<TreeNode<Double>>(
                selectionCount);
        final GenomeFactory<TreeNode<Double>> genomeFactory = createGenomeFactory();
        final TreeNodeUtilities<Double> treeNodeUtils = new TreeNodeUtilities<Double>();
        final CrossoverOperator<TreeNode<Double>> crossoverOperator = new GPCrossoverOperator<Double>(treeNodeUtils,
                generator);
        final MutationOperator<TreeNode<Double>> mutationOperator = new GPMutationOperator<Double>(treeNodeUtils,
                functionFactory, generator);
        final int backCount = 10;

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

        final Set<Function<Double>> exemplars = new HashSet<Function<Double>>();
        exemplars.add(new AddFunction<Double>(converter, one, two));
        exemplars.add(new SubtractFunction<Double>(converter, one, two));
        exemplars.add(new MultiplyFunction<Double>(converter, one, two));
        exemplars.add(new DivideFunction<Double>(converter, one, two));
        exemplars.add(new GreaterThanFunction<Double>(converter, one, two));
        exemplars.add(new AbsoluteValueFunction<Double>(converter, one));

        return exemplars;
    }

    @Override
    public TreeNode<Double> getSolution()
    {
        // -1 * x
        Function<Double> function0;
        {
            final TreeNode<Double> child0 = new ConstantTerminal<Double>(converter, -1.0);
            final TreeNode<Double> child1 = new VariableTerminal<Double>(converter, "x");
            function0 = new MultiplyFunction<Double>(converter, child0, child1);
        }

        // v * abs(v)
        final Function<Double> function1;
        {
            final TreeNode<Double> child0 = new VariableTerminal<Double>(converter, "v");
            final Function<Double> function2;
            {
                final TreeNode<Double> child1 = new VariableTerminal<Double>(converter, "v");
                function2 = new AbsoluteValueFunction<Double>(converter, child1);
            }
            function1 = new MultiplyFunction<Double>(converter, child0, function2);
        }

        // Greater than
        return new GreaterThanFunction<Double>(converter, function0, function1);
    }

    @Override
    public Set<Factory<Terminal<Double>>> getTerminalFactories()
    {
        final Set<String> variableNames = new TreeSet<String>(Arrays.asList(new String[] { "x", "v", }));

        final Set<Factory<Terminal<Double>>> factories = new HashSet<Factory<Terminal<Double>>>();
        factories.add(new ConstantTerminalFactory<Double>(converter, -1.0, generator));
        factories.add(new VariableTerminalFactory<Double>(converter, variableNames, generator));

        return factories;
    }

    /**
     * @param caseCount Fitness case count.
     * @param isVerbose Flag indicating whether to print output.
     * 
     * @return a new list of random fitness cases.
     */
    private List<FitnessCase> createFitnessCases(final int caseCount, final boolean isVerbose)
    {
        final List<FitnessCase> answer = new ArrayList<FitnessCase>();

        final double minX = -0.75;
        final double maxX = 0.75;
        final double minV = -0.75;
        final double maxV = 0.75;

        answer.add(new FitnessCase(minX, minV));
        answer.add(new FitnessCase(maxX, minV));
        answer.add(new FitnessCase(minX, maxV));
        answer.add(new FitnessCase(maxX, maxV));

        while (answer.size() < caseCount)
        {
            final double x0 = generator.generateDouble(minX, maxX);
            final double v0 = generator.generateDouble(minV, maxV);
            answer.add(new FitnessCase(x0, v0));
        }

        if (isVerbose)
        {
            System.out.println("\nFitness Cases");
            for (int i = 0; i < answer.size(); i++)
            {
                final FitnessCase fitnessCase = answer.get(i);
                System.out.println(String.format("%2d %8.4f %8.4f", i, fitnessCase.getX0(), fitnessCase.getV0()));
            }
        }

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
