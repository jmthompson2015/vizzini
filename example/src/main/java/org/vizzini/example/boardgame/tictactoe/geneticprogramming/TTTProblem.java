package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
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
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultFunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultTerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultXMLTerminalFormat;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.FunctionFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPCrossoverOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.GPMutationOperator;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.InfixNotationVisitor;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.MultiplyFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.PrefixNotationVisitor;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.SubtractFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TerminalFactory;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeInspector;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNodeUtilities;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.XMLFunctionFormat;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.XMLTerminalFormat;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.Problem;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.Factory;
import org.vizzini.core.RandomGenerator;
import org.vizzini.core.XMLFormat;
import org.vizzini.example.boardgame.tictactoe.Statistics;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;

/**
 * Provides a problem definition for tic-tac-toe.
 * 
 * <p>
 * <a href="http://www.ijcte.org/papers/799-T098.pdf">Evolving Tic-Tac-Toe Playing Algorithms Using Co-Evolution,
 * Interactive Fitness and Genetic Programming</a>
 * </p>
 * <p>
 * <a href="http://www.genetic-programming.org/hc2005/Sipper-IEEE-TSMC.pdf">Attaining Human-Competitive Game Playing
 * with Genetic Programming</a>
 * </p>
 * <p>
 * <a href="http://www.iitk.ac.in/kangal/papers/k2007002.pdf">Evolution Of No-Loss Stategies For The Game Of
 * Tic-Tac-Toe</a>
 * </p>
 */
public final class TTTProblem implements GenerationListener, Problem<Integer>
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final TTTProblem problem = new TTTProblem();

        final Genome<TreeNode<Integer>> result = problem.determineBest();
        final Statistics statistics = problem.getStatistics(result);
        final TreeNode<Integer> treeNode = result.get(0);
        final Function<Integer> function = (Function<Integer>)treeNode;
        saveBest(function);

        System.out.println();
        printTreeNode("best", treeNode, statistics);
        System.out.println("fitness    = " + result.getFitness());
    }

    /**
     * @param title Title.
     * @param treeNode Tree node.
     * @param statistics Statistics.
     */
    private static void printTreeNode(final String title, final TreeNode<Integer> treeNode, final Statistics statistics)
    {
        System.out.println(title + " = " + PrefixNotationVisitor.toEquation(treeNode));
        System.out.println(title + " = " + InfixNotationVisitor.toEquation(treeNode));

        final TreeNodeInspector<Integer> inspector = new TreeNodeInspector<Integer>();
        treeNode.accept(inspector);
        System.out.println("nodeCount  = " + inspector.getNodeCount());
        System.out.println("maxLevels  = " + inspector.getMaxLevels());

        if (statistics != null)
        {
            System.out.println("statistics = " + statistics);
        }
    }

    /**
     * @param best Best function.
     */
    private static void saveBest(final Function<Integer> best)
    {
        final XMLFormat xmlFormatter = new XMLFormat();
        final XMLTerminalFormat<Integer> terminalFormatter = new DefaultXMLTerminalFormat<Integer>(xmlFormatter);
        final TTTXMLTerminalFormat tTerminalFormatter = new TTTXMLTerminalFormat(terminalFormatter);
        final XMLFunctionFormat<Integer> formatter = new XMLFunctionFormat<Integer>(tTerminalFormatter);
        final File file = new File("tttBest.xml");
        FileWriter writer = null;

        try
        {
            writer = new FileWriter(file);
            writer.write(formatter.format(best));
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            if (writer != null)
            {
                try
                {
                    writer.flush();
                    writer.close();
                }
                catch (final IOException ignore)
                {
                    // Nothing to do.
                }
            }
        }
    }

    /** Function factory. */
    final FunctionFactory<Integer> functionFactory;

    /** Converter. */
    private final Converter<Integer> converter = new Converter<Integer>(Integer.class);

    /** Evaluator. */
    private TTTEvaluator evaluator;

    /** Random number generator. */
    private final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Construct this object.
     */
    public TTTProblem()
    {
        final TerminalFactory<Integer> terminalFactory = new DefaultTerminalFactory<Integer>(getTerminalFactories(),
                converter, generator);

        final int maxLevelCount = 25;
        this.functionFactory = new DefaultFunctionFactory<Integer>(getFunctionExemplars(), maxLevelCount,
                terminalFactory, generator);
    }

    /**
     * @param popSize Population size.
     * 
     * @return a new population.
     */
    public Population<TreeNode<Integer>> createPopulation(final int popSize)
    {
        final GenomeFactory<TreeNode<Integer>> genomeFactory = createGenomeFactory();
        final Population<TreeNode<Integer>> answer = new DefaultPopulation<TreeNode<Integer>>();

        // Seed with the simple solution.
        {
            final Genome<TreeNode<Integer>> genome = new ListGenome<TreeNode<Integer>>(1);
            genome.add(getSimpleSolution());
            answer.add(genome);
        }

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

    @Override
    public Genome<TreeNode<Integer>> determineBest()
    {
        final int popSize = 50;
        final Population<TreeNode<Integer>> population = createPopulation(popSize);
        evaluator = new TTTEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.10 * popSize);
        final int crossoverCount = (int)Math.round(0.80 * popSize);
        final int generationCount = 10;
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

    /**
     * @return the converter
     */
    public Converter<Integer> getConverter()
    {
        return converter;
    }

    @Override
    public Set<Function<Integer>> getFunctionExemplars()
    {
        final TreeNode<Integer> one = new ConstantTerminal<Integer>(converter, 0);
        final TreeNode<Integer> two = new ConstantTerminal<Integer>(converter, 1);

        final Set<Function<Integer>> exemplars = new HashSet<Function<Integer>>();
        exemplars.add(new AddFunction<Integer>(converter, one, two));
        exemplars.add(new SubtractFunction<Integer>(converter, one, two));
        exemplars.add(new MultiplyFunction<Integer>(converter, one, two));

        return exemplars;
    }

    /**
     * @return the functionFactory
     */
    public FunctionFactory<Integer> getFunctionFactory()
    {
        return functionFactory;
    }

    /**
     * @return the generator
     */
    public RandomGenerator getGenerator()
    {
        return generator;
    }

    /**
     * @return the known solution to the problem, if any.
     */
    public Function<Integer> getSimpleSolution()
    {
        final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>();

        children.add(createMultiplyFunction(2, TTTPosition.a1));
        children.add(new TokenTerminal(converter, TTTPosition.b1));
        children.add(createMultiplyFunction(2, TTTPosition.c1));
        children.add(new TokenTerminal(converter, TTTPosition.a2));
        children.add(createMultiplyFunction(3, TTTPosition.b2));
        children.add(new TokenTerminal(converter, TTTPosition.c2));
        children.add(createMultiplyFunction(2, TTTPosition.a3));
        children.add(new TokenTerminal(converter, TTTPosition.b3));
        children.add(createMultiplyFunction(2, TTTPosition.c3));

        final Function<Integer> answer = AddFunction.createTree(converter, children);

        printTreeNode("simple", answer, null);

        return answer;
    }

    @Override
    public Function<Integer> getSolution()
    {
        // FIXME: what is the solution?
        return getSimpleSolution();
    }

    /**
     * @param genome Genome.
     * 
     * @return a statistics object for the given genome.
     */
    public Statistics getStatistics(final Genome<TreeNode<Integer>> genome)
    {
        return evaluator.getStatistics(genome);
    }

    @Override
    public Set<Factory<Terminal<Integer>>> getTerminalFactories()
    {
        final Set<Factory<Terminal<Integer>>> factories = new HashSet<Factory<Terminal<Integer>>>();

        factories.add(new ConstantTerminalFactory<Integer>(converter, -10, 10, generator));
        factories.add(new TokenTerminalFactory(converter, generator));

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
     * @param value Value.
     * @param position Position.
     * 
     * @return a new multiply function.
     */
    private MultiplyFunction<Integer> createMultiplyFunction(final int value, final TTTPosition position)
    {
        final ConstantTerminal<Integer> child0 = new ConstantTerminal<Integer>(converter, value);
        final TokenTerminal child1 = new TokenTerminal(converter, position);

        return new MultiplyFunction<Integer>(converter, child0, child1);
    }
}
