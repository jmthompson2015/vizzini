package org.vizzini.illyriad;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
import org.vizzini.ai.geneticalgorithm.MutationOperator;
import org.vizzini.ai.geneticalgorithm.Population;
import org.vizzini.ai.geneticalgorithm.SelectionOperator;

/**
 * Provides a shipping office.
 */
public final class ShippingOffice implements GenerationListener
{
    /**
     * Provides an evaluator.
     */
    private final static class ShippingOfficeEvaluator implements Evaluator<List<City>>
    {
        /**
         * Construct this object.
         */
        public ShippingOfficeEvaluator()
        {
            // TODO Auto-generated constructor stub
        }

        @Override
        public void evaluate(final Population<List<City>> population)
        {
            // TODO Auto-generated method stub
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

    /** Map of city to map of resource to amount. */
    final Map<City, ResourceMap> cityResourceMap;

    /** Ingredient collection. */
    final ResourceIngredientCollection ingredients;

    /**
     * Construct this object.
     * 
     * @param ingredients Ingredient collection.
     * @param cityResourceMap Map of city to map of resource to amount.
     */
    @SuppressWarnings("hiding")
    public ShippingOffice(final ResourceIngredientCollection ingredients, final Map<City, ResourceMap> cityResourceMap)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        if (cityResourceMap == null)
        {
            throw new IllegalArgumentException("cityResourceMap is null");
        }

        this.ingredients = ingredients;
        this.cityResourceMap = new HashMap<City, ResourceMap>(cityResourceMap);
    }

    /**
     * @return the best shipper.
     */
    public Shipper determineShipper()
    {
        final int popSize = 1000;
        final Population<List<City>> population = createPopulation(popSize);
        final Evaluator<List<City>> evaluator = createEvaluator();
        final int selectionCount = (int)Math.round(0.20 * popSize);
        final int copyCount = (int)Math.round(0.05 * popSize);
        final int crossoverCount = (int)Math.round(0.75 * popSize);
        final int generationCount = 50;
        final CopyOperator<List<City>> copyOperator = new DefaultCopyOperator<List<City>>();
        final SelectionOperator<List<City>> selectionOperator = new DefaultSelectionOperator<List<City>>(selectionCount);
        final GenomeFactory<List<City>> genomeFactory = createGenomeFactory();
        final CrossoverOperator<List<City>> crossoverOperator = createCrossoverOperator();
        final MutationOperator<List<City>> mutationOperator = createMutationOperator();
        final int backCount = 30;

        final GeneticAlgorithm<List<City>> geneticAlgorithm = new DefaultGeneticAlgorithm<List<City>>(population,
                evaluator, copyCount, crossoverCount, generationCount, copyOperator, selectionOperator, genomeFactory,
                crossoverOperator, mutationOperator, backCount);
        geneticAlgorithm.addGenerationListener(this);

        final Shipper answer = (Shipper)geneticAlgorithm.determineBest();

        System.out.println("\nhidesShare   = " + answer.getHidesShare());
        System.out.println("mineralShare = " + answer.getMineralShare());
        System.out.println("herbShare    = " + answer.getHerbShare());
        System.out.println("horsesShare  = " + answer.getHorsesShare());

        return answer;
    }

    @Override
    public void generationCompleted(final GenerationEvent event)
    {
        System.out.println(event);
    }

    /**
     * @return a new crossover operator.
     */
    private CrossoverOperator<List<City>> createCrossoverOperator()
    {
        return new CrossoverOperator<List<City>>()
        {
            @Override
            public Genome<List<City>> crossover(final Genome<List<City>> genome1, final Genome<List<City>> genome2)
            {
                Shipper answer;

                final Shipper shipper1 = (Shipper)genome1;
                final Shipper shipper2 = (Shipper)genome2;

                if (Math.random() < 0.5)
                {
                    answer = new Shipper(ingredients, shipper1.getCities1(), shipper2.getCities2(), cityResourceMap);
                }
                else
                {
                    answer = new Shipper(ingredients, shipper2.getCities1(), shipper1.getCities2(), cityResourceMap);
                }

                return answer;
            }
        };
    }

    /**
     * @return a new evaluator.
     */
    private Evaluator<List<City>> createEvaluator()
    {
        return new ShippingOfficeEvaluator();
    }

    /**
     * @return a new genome factory.
     */
    private GenomeFactory<List<City>> createGenomeFactory()
    {
        return new GenomeFactory<List<City>>()
        {
            @Override
            public Genome<List<City>> create()
            {
                return createRandomShipper();
            }

            /**
             * @return a new random shipper.
             */
            private Shipper createRandomShipper()
            {
                final List<City> cities1 = new ArrayList<City>(Arrays.asList(City.values()));
                final List<City> cities2 = new ArrayList<City>(Arrays.asList(City.values()));

                Collections.shuffle(cities1);
                Collections.shuffle(cities2);

                final Shipper answer = new Shipper(ingredients, cities1, cities2, cityResourceMap);

                return answer;
            }
        };
    }

    /**
     * @return a new mutation operator.
     */
    private MutationOperator<List<City>> createMutationOperator()
    {
        return new MutationOperator<List<City>>()
        {
            @Override
            public Genome<List<City>> mutate(final Genome<List<City>> genome)
            {
                final Shipper shipper = (Shipper)genome;

                final List<City> cities1 = new ArrayList<City>(shipper.getCities1());
                final List<City> cities2 = new ArrayList<City>(shipper.getCities2());

                List<City> cities;

                if (Math.random() < 0.5)
                {
                    cities = cities1;
                }
                else
                {
                    cities = cities2;
                }

                final int index1 = (int)(Math.random() * cities.size());
                final City city = cities.remove(index1);
                final int index2 = (int)(Math.random() * cities.size());
                cities.add(index2, city);

                return new Shipper(ingredients, cities1, cities2, cityResourceMap);
            }
        };
    }

    /**
     * @param popSize Population size.
     * 
     * @return a new population.
     */
    private Population<List<City>> createPopulation(final int popSize)
    {
        final GenomeFactory<List<City>> genomeFactory = createGenomeFactory();

        final Population<List<City>> answer = new DefaultPopulation<List<City>>();

        // First try the natural ordering.
        final List<City> cities1 = new ArrayList<City>(Arrays.asList(City.values()));
        final List<City> cities2 = new ArrayList<City>(Arrays.asList(City.values()));
        Shipper shipper = new Shipper(ingredients, cities1, cities2, cityResourceMap);
        answer.add(shipper);

        // Population members are unique.
        while (answer.size() < popSize)
        {
            shipper = (Shipper)genomeFactory.create();

            if (!answer.contains(shipper))
            {
                answer.add(shipper);
            }
        }

        return answer;
    }
}
