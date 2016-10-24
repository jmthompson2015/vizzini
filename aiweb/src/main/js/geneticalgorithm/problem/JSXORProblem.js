/*
 * Provides a problem definition for finding a JavaScript function to perform
 * symbolic function identification.
 * 
 * xor(a, b) = (a || b) && !(a && b)
 * 
 * @param popSize Population size. 
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
var JSXORProblem =
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
                SelectionOperator.fitnessProportionalSelect);
        var operators = [
                new Operator(0.05, 1, new Copier(CopyOperator.copy)),
                new Operator(0.75, 2, new Crossoverer(
                        CrossoverOperator.onePointVariableLength)),
                new Operator(0.10, 1, new Mutator(genomeFactory,
                        MutationOperator.mutate)),
                new Operator(0.05, 1, new Mutator(genomeFactory,
                        MutationOperator.insertGene)),
                new Operator(0.05, 1, new Mutator(genomeFactory,
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
        var isMatches = true;
        var errorThreshold;
        var idealGenomeLength;

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    },

    createGenomeFactory: function(genes)
    {
        var genomeLength = 8;

        return new GenomeFactory(genes, genomeLength);
    },

    createPhenotypeFactory: function()
    {
        var functionName = "xor";
        var args = [ "a", "b" ];
        var prefix = "return";
        var suffix = ";";

        return new JSPhenotypeFactory(functionName, args, prefix, suffix);
    },

    getGenes: function()
    {
        return [ "a", "b", // variables
        "&&", "||", "!" // booleans
        ];
    },

    getInputs: function()
    {
        return [ [ false, false ], [ false, true ], [ true, false ],
                [ true, true ] ];
    },

    getObjective: function()
    {
        return "Find an equation to produce the given outputs from the given inputs.";
    },

    getOutputs: function()
    {
        return [ false, true, true, false ];
    },
}
