/*
 * Provides a problem definition for finding a JavaScript function to calculate
 * addition.
 *
 * add(a, b) = a + b
 * 
 * @param popSize Population size. 
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
var JSAddProblem =
{
    createGA: function(popSize, generationCount, backCount)
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.getGenes();
        var genomeFactory = this.createGenomeFactory(genes);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator();
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.randomSelect);
        var operators = [
                new Operator(0.05, 1, new Copier(CopyOperator.copy)),
                new Operator(0.75, 2, new Crossoverer(
                        CrossoverOperator.onePointVariableLength)),
                new Operator(0.10, 1, new Mutator(genes,
                        MutationOperator.mutate)),
                new Operator(0.05, 1, new Mutator(genes,
                        MutationOperator.insertGene)),
                new Operator(0.05, 1, new Mutator(genes,
                        MutationOperator.deleteGene)), ];

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, operators, genomeFactory, backCount);

        return ga;
    },

    createEvaluator: function()
    {
        var inputs = this.getInputs();
        var outputs = this.getOutputs();
        var phenotypeFactory = this.createPhenotypeFactory();
        var isMatches = false;
        var errorThreshold = 0.0001;
        var idealGenomeLength;

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    },

    createGenomeFactory: function(genes)
    {
        var genomeLength = 3;

        return new GenomeFactory(genes, genomeLength);
    },

    createPhenotypeFactory: function()
    {
        var functionName = "add";
        var args = [ "a", "b" ];
        var prefix = "return";
        var suffix = ";";

        return new JSPhenotypeFactory(functionName, args, prefix, suffix);
    },

    getGenes: function()
    {
        return [ "a", "b", // variables
        "+", "-", "*", "/", "%", // math
        "Math.sin", "Math.cos", "Math.tan", "Math.PI", // trigonometry
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // numbers
        ];
    },

    getInputs: function()
    {
        return [ [ 0, 0 ], [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ], [ 9, 10 ], ];
    },

    getObjective: function()
    {
        return "Find an equation to produce the given outputs from the given inputs.";
    },

    getOutputs: function()
    {
        return [ 0, 3, 7, 11, 15, 19 ];
    },
}
