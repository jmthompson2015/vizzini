// var mode = "easy";
var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to calculate
 * addition.
 * 
 * @param popSize Population size. 
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function JSAddProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.createGenes();
        var genomeLength = 5;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator();
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.randomSelect);
        var copyCount = Math.floor(0.05 * popSize);
        var crossoverCount = Math.floor(0.75 * popSize);
        var crossoverOperator = CrossoverOperator.onePointVariableLength;
        var mutator = new Mutator(genes, MutationOperator.mutate);

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, copyCount, crossoverCount,
                crossoverOperator, mutator, genomeFactory, backCount);

        return ga;
    }

    this.createEvaluator = function()
    {
        var inputs = [ [ 0, 0 ], [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ],
                [ 9, 10 ], ];
        var outputs = [ 0, 3, 7, 11, 15, 19 ];
        var phenotypeFactory = new JSPhenotypeFactory("add", [ "a", "b" ]);
        var isMatches = false;
        var errorThreshold = 0.0001;
        var idealGenomeLength = 4;

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    }

    this.createGenes = function()
    {
        var easy = [ "return", "a", "+", "b" ];
        var hard = [ "return", "a", "+", "b", // necessary
        "-", "*", "/", "%", // math
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // numbers
        "(", ")", "[", "]", "{", "}", // brackets
        "var", "i", "=", "if", "==", "===", ";", // symbols
        ];

        return (mode === "easy" ? easy : hard);
    }
}
