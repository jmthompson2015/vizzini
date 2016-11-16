package org.vizzini.illyriad.robot.market;

import java.awt.Toolkit;
import java.io.File;
import java.util.List;

import org.vizzini.ai.geneticalgorithm.CopyOperator;
import org.vizzini.ai.geneticalgorithm.CrossoverOperator;
import org.vizzini.ai.geneticalgorithm.DefaultCopyOperator;
import org.vizzini.ai.geneticalgorithm.DefaultGeneticAlgorithm;
import org.vizzini.ai.geneticalgorithm.DefaultPhenotype;
import org.vizzini.ai.geneticalgorithm.DefaultPopulation;
import org.vizzini.ai.geneticalgorithm.DefaultSelectionOperator;
import org.vizzini.ai.geneticalgorithm.Evaluator;
import org.vizzini.ai.geneticalgorithm.GeneticAlgorithm;
import org.vizzini.ai.geneticalgorithm.Genome;
import org.vizzini.ai.geneticalgorithm.GenomeFactory;
import org.vizzini.ai.geneticalgorithm.ListGenome;
import org.vizzini.ai.geneticalgorithm.MutationOperator;
import org.vizzini.ai.geneticalgorithm.Phenotype;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.SelectionOperator;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.RandomGenerator;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.robot.ImageSplitter;

/**
 * Provides a genetic algorithm to determine the configuration of a price filter.
 */
public final class PriceFilterGA
{
    /**
     * Provides a phenotype for a genome.
     */
    private final static class ConfigPhenotype implements Phenotype<Double, PriceImageFilterConfiguration>
    {
        /** Delegate. */
        private final Phenotype<Double, PriceImageFilterConfiguration> delegate;

        /**
         * Construct this object.
         * 
         * @param genome Genome. (required)
         */
        public ConfigPhenotype(final Genome<Double> genome)
        {
            if (genome == null)
            {
                throw new IllegalArgumentException("genome is null");
            }

            final PriceImageFilterConfiguration phenome = createPhenome(genome);
            this.delegate = new DefaultPhenotype<Double, PriceImageFilterConfiguration>(genome, phenome);
        }

        @Override
        public Genome<Double> getGenome()
        {
            return delegate.getGenome();
        }

        @Override
        public PriceImageFilterConfiguration getPhenome()
        {
            return delegate.getPhenome();
        }

        /**
         * @param genome Genome.
         * 
         * @return a new phenome constructed from the given genome.
         */
        private PriceImageFilterConfiguration createPhenome(final Genome<Double> genome)
        {
            final boolean isNormalized0 = (genome.get(IS_NORMALIZED0_INDEX) == 1.0);

            final float factorRed = genome.get(1).floatValue();
            final float factorGreen = genome.get(2).floatValue();
            final float factorBlue = genome.get(3).floatValue();

            final float offsetRed = genome.get(4).floatValue();
            final float offsetGreen = genome.get(5).floatValue();
            final float offsetBlue = genome.get(6).floatValue();

            final boolean isNormalized1 = (genome.get(IS_NORMALIZED1_INDEX) == 1.0);
            final double trimColorScale = genome.get(8);
            final double blackAndWhiteColorScale = genome.get(9);

            final Float[] scaleFactors = { factorRed, factorGreen, factorBlue };
            final Float[] offsets = { offsetRed, offsetGreen, offsetBlue };

            return new PriceImageFilterConfiguration(isNormalized0, scaleFactors, offsets, isNormalized1,
                    trimColorScale, blackAndWhiteColorScale);
        }
    }

    /**
     * Provides an evaluator.
     */
    private final static class PriceFilterEvaluator implements Evaluator<Double>
    {
        /** Example images. */
        private final List<ExampleImage> exampleImages;

        /**
         * Construct this object.
         */
        public PriceFilterEvaluator()
        {
            final ExampleImageListBuilder builder = new ExampleImageListBuilder();
            exampleImages = builder.build();

            System.out.println("exampleImages.size() = " + exampleImages.size());
        }

        @Override
        public void evaluate(final Population<Double> population)
        {
            final ImageSplitter splitter = new PriceImageSplitter();

            for (final Genome<Double> genome : population)
            {
                double fitness = 0;

                final ConfigPhenotype phenotype = new ConfigPhenotype(genome);
                final PriceImageFilter filter = new PriceImageFilter(phenotype.getPhenome());

                for (final ExampleImage exampleImage : exampleImages)
                {
                    try
                    {
                        fitness += evaluateExampleImage(filter, splitter, exampleImage);
                    }
                    catch (final Throwable t)
                    {
                        System.out.println("genome = " + genome);
                        throw new RuntimeException(t);
                    }
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

        /**
         * @param filter Price image filter.
         * @param splitter Price image splitter.
         * @param exampleImage Example image.
         * 
         * @return fitness.
         */
        private int evaluateExampleImage(final PriceImageFilter filter, final ImageSplitter splitter,
                final ExampleImage exampleImage)
        {
            int answer = 0;

            // Error points.
            final int digitsNull = 7;
            final int digitImageNotNull = 7;

            final int digitsCount = 5;

            final int digitWidth = 1;
            final int digitHeight = 1;

            final RobotImage priceImage = filter.filter(exampleImage.getPriceImage());
            final List<RobotImage> digits = splitter.split(priceImage);

            if (exampleImage.isImageExpected())
            {
                final List<Integer> expectedDigitWidths = exampleImage.getExpectedDigitWidths();

                if (digits.size() != expectedDigitWidths.size())
                {
                    answer += digitsCount;
                }

                for (int i = 0; i < expectedDigitWidths.size(); i++)
                {
                    if (i < digits.size())
                    {
                        final RobotImage digit = digits.get(i);

                        if (digit == null)
                        {
                            answer += digitImageNotNull;
                        }
                        else
                        {
                            if (digit.getWidth() != expectedDigitWidths.get(i))
                            {
                                answer += digitWidth;
                            }

                            if (digit.getHeight() != exampleImage.getExpectedHeight())
                            {
                                answer += digitHeight;
                            }
                        }
                    }
                    else
                    {
                        answer += digitImageNotNull;
                    }
                }
            }
            else
            {
                if (!digits.isEmpty())
                {
                    answer += digitsNull;
                }
            }

            return answer;
        }
    }

    /** Genome size. */
    private static final int GENOME_SIZE = 10;

    /** First is normalized index. */
    private static final int IS_NORMALIZED0_INDEX = 0;

    /** Second is normalized index. */
    private static final int IS_NORMALIZED1_INDEX = 7;

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        final PriceFilterGA ga = new PriceFilterGA();

        ga.determineBest();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("PriceFilterGA", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Random number generator. */
    final RandomGenerator generator = new DefaultRandomGenerator();

    /**
     * Test the <code>determineBest()</code> method.
     */
    public void determineBest()
    {
        final boolean isThorough = false;

        int popSize;
        int generationCount;

        if (isThorough)
        {
            popSize = 2000;
            generationCount = 50;
        }
        else
        {
            popSize = 200;
            generationCount = 20;
        }

        final Population<Double> population = createPopulation(popSize);
        final Evaluator<Double> evaluator = createEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.05 * popSize);
        final int crossoverCount = (int)Math.round(0.75 * popSize);
        final CopyOperator<Double> copyOperator = new DefaultCopyOperator<Double>();
        final SelectionOperator<Double> selectionOperator = new DefaultSelectionOperator<Double>(selectionCount);
        final GenomeFactory<Double> genomeFactory = createGenomeFactory();
        final CrossoverOperator<Double> crossoverOperator = createCrossoverOperator();
        final MutationOperator<Double> mutationOperator = createMutationOperator();
        final int backCount = generationCount;

        final GeneticAlgorithm<Double> ga = new DefaultGeneticAlgorithm<Double>(population, evaluator, copyCount,
                crossoverCount, generationCount, copyOperator, selectionOperator, genomeFactory, crossoverOperator,
                mutationOperator, backCount);

        final Genome<Double> result = ga.determineBest();

        printBest(result);

        System.out.println("\nbest = " + result);
    }

    /**
     * Test.
     */
    public void test()
    {
        final File outputDirectory = new File(Locations.MARKET_DATA_DIR, "temp");
        outputDirectory.delete();
        outputDirectory.mkdirs();

        final int popSize = 1;
        final Population<Double> population = createPopulation(popSize);
        final Evaluator<Double> evaluator = createEvaluator();

        evaluator.evaluate(population);
        System.out.println("only = " + population.get(0));
    }

    /**
     * @param index Gene destination index.
     * 
     * @return a new, random integer gene.
     */
    double createGene(final int index)
    {
        double answer;

        switch (index)
        {
        case IS_NORMALIZED0_INDEX:
            answer = generator.generateBoolean() ? 1.0 : 0.0;
            break;
        case 1:
        case 2:
        case 3:
            // Scale factor in [0.25, 6.50].
            answer = generator.generateDouble(0.25, 6.50, 100.0);
            break;
        case 4:
        case 5:
        case 6:
            // Offset in [-768.0, 768.0].
            final double min = -3.0 * 256.0;
            final double max = 3.0 * 256.0;
            answer = generator.generateDouble(min, max, 1.0);
            break;
        case IS_NORMALIZED1_INDEX:
            answer = generator.generateBoolean() ? 1.0 : 0.0;
            break;
        case 8:
        case 9:
            // Color scale in [1.0, 2.0].
            answer = generator.generateDouble(1.0, 2.0, 100.0);
            break;
        default:
            throw new RuntimeException("Unknown index = " + index);
        }

        return answer;
    }

    /**
     * @return a new crossover operator.
     */
    private CrossoverOperator<Double> createCrossoverOperator()
    {
        return new CrossoverOperator<Double>()
        {
            @Override
            public Genome<Double> crossover(final Genome<Double> genome1, final Genome<Double> genome2)
            {
                final int length = genome1.length();
                final Genome<Double> answer = new ListGenome<Double>(length);

                final int index = (int)(Math.random() * length);

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
    private Evaluator<Double> createEvaluator()
    {
        return new PriceFilterEvaluator();
    }

    /**
     * @return a new genome factory.
     */
    private GenomeFactory<Double> createGenomeFactory()
    {
        return new GenomeFactory<Double>()
        {
            @Override
            public Genome<Double> create()
            {
                final Genome<Double> answer = new ListGenome<Double>(GENOME_SIZE);

                for (int i = 0; i < GENOME_SIZE; i++)
                {
                    answer.add(createGene(i));
                }

                return answer;
            }

            /**
             * @param index Gene destination index.
             * 
             * @return a new, random integer gene.
             */
            double createGene(final int index)
            {
                double answer;

                switch (index)
                {
                case IS_NORMALIZED0_INDEX:
                    answer = generator.generateBoolean() ? 1.0 : 0.0;
                    break;
                case 1:
                case 2:
                case 3:
                    // Scale factor in [0.25, 6.50].
                    answer = generator.generateDouble(0.25, 6.50, 100.0);
                    break;
                case 4:
                case 5:
                case 6:
                    // Offset in [-768.0, 768.0].
                    final double min = -3.0 * 256.0;
                    final double max = 3.0 * 256.0;
                    answer = generator.generateDouble(min, max, 1.0);
                    break;
                case IS_NORMALIZED1_INDEX:
                    answer = generator.generateBoolean() ? 1.0 : 0.0;
                    break;
                case 8:
                case 9:
                    // Color scale in [1.0, 2.0].
                    answer = generator.generateDouble(1.0, 2.0, 100.0);
                    break;
                default:
                    throw new RuntimeException("Unknown index = " + index);
                }

                return answer;
            }
        };
    }

    /**
     * @return a new, random genome.
     */
    // private Genome<Double> createGenome()
    // {
    // final Genome<Double> answer = new ListGenome<Double>(GENOME_SIZE);
    //
    // for (int i = 0; i < GENOME_SIZE; i++)
    // {
    // answer.add(createGene(i));
    // }
    //
    // return answer;
    // }

    /**
     * @return a new mutation operator.
     */
    private MutationOperator<Double> createMutationOperator()
    {
        return new MutationOperator<Double>()
        {
            @Override
            public Genome<Double> mutate(final Genome<Double> genome)
            {
                final int length = genome.length();
                final Genome<Double> answer = new ListGenome<Double>(length);

                final int index = (int)(Math.random() * length);

                for (int i = 0; i < length; i++)
                {
                    if (i == index)
                    {
                        // Mutate.
                        if ((i == IS_NORMALIZED0_INDEX) || (i == IS_NORMALIZED1_INDEX))
                        {
                            // Flip the isNormalized flag.
                            answer.add(genome.get(i) == 1.0 ? 0.0 : 1.0);
                        }
                        else
                        {
                            answer.add(createGene(i));
                        }
                    }
                    else
                    {
                        // Copy.
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
    private Population<Double> createPopulation(final int popSize)
    {
        final GenomeFactory<Double> genomeFactory = createGenomeFactory();
        final Population<Double> answer = new DefaultPopulation<Double>();

        // Seed with the previous best.
        // best = 1.0 5.22 6.33 3.35 -458.0 -761.0 227.0 0.0 2.0 1.41 fitness = 4.0
        {
            final Genome<Double> genome = new ListGenome<Double>(GENOME_SIZE);

            genome.add(1.0);
            genome.add(5.22);
            genome.add(6.33);
            genome.add(3.35);
            genome.add(-458.0);
            genome.add(-761.0);
            genome.add(227.0);
            genome.add(0.0);
            genome.add(2.0);
            genome.add(1.41);

            answer.add(genome);
        }

        // Seed with the previous best.
        // best = 1.0 4.87 6.11 2.37 -433.0 -761.0 227.0 0.0 1.97 1.41 fitness = 4.0
        {
            final Genome<Double> genome = new ListGenome<Double>(GENOME_SIZE);

            genome.add(1.0);
            genome.add(4.87);
            genome.add(6.11);
            genome.add(2.37);
            genome.add(-433.0);
            genome.add(-761.0);
            genome.add(227.0);
            genome.add(0.0);
            genome.add(1.97);
            genome.add(1.41);

            answer.add(genome);
        }

        while (answer.size() < popSize)
        {
            final Genome<Double> genome = genomeFactory.create();

            if (!answer.contains(genome))
            {
                answer.add(genome);
            }
        }

        return answer;
    }

    /**
     * @param genome Genome.
     */
    private void printBest(final Genome<Double> genome)
    {
        final ConfigPhenotype phenotype = new ConfigPhenotype(genome);
        final PriceImageFilterConfiguration config = phenotype.getPhenome();

        System.out.println();

        // Format for PriceFilterGA.
        for (int i = 0; i < GENOME_SIZE; i++)
        {
            System.out.println("genome.add(" + genome.get(i) + ");");
        }

        final Float[] scaleFactors = config.getScaleFactors();
        final String scaleFactorsString = "{" + scaleFactors[0] + "f, " + scaleFactors[1] + "f, " + scaleFactors[2]
                + "f, }";

        final Float[] offsets = config.getOffsets();
        final String offsetsString = "{" + offsets[0] + "f, " + offsets[1] + "f, " + offsets[2] + "f, }";

        // Format for ExampleImageTrial.
        System.out.println();
        System.out.println("boolean isNormalized0 = " + config.isNormalized0() + ";");
        System.out.println("Float[] scaleFactors = " + scaleFactorsString + ";");
        System.out.println("Float[] offsets = " + offsetsString + ";");
        System.out.println("boolean isNormalized1 = " + config.isNormalized1() + ";");
        System.out.println("double trimColorScale = " + config.getTrimColorScale() + ";");
        System.out.println("double blackAndWhiteColorScale = " + config.getBlackAndWhiteColorScale() + ";");

        // Format for PriceImageFilterConfiguration.
        System.out.println();
        System.out.println("this(" + config.isNormalized0() + ", new Float[] " + scaleFactorsString + ", new Float[] "
                + offsetsString + ", " + config.isNormalized1() + ", " + config.getTrimColorScale() + ", "
                + config.getBlackAndWhiteColorScale() + ");");
    }
}
