var mode = "easy";
// var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to perform
 * symbolic function identification.
 * 
 * f(x) = x^4 + x^3 + x^2 + x
 * 
 * @param popSize Population size. 
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
var JSSymbolicRegressionProblem =
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
                new Operator(0.38, 2, new Crossoverer(
                        CrossoverOperator.onePointVariableLength)),
                new Operator(0.37, 2, new Crossoverer(
                        CrossoverOperator.twoPointVariableLength)),
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
        var genomeLength = 13;

        return new GenomeFactory(genes, genomeLength);
    },

    createPhenotypeFactory: function()
    {
        var functionName = "f";
        var args = [ "x" ];
        var prefix = "return";
        var suffix = ";";

        return new JSPhenotypeFactory(functionName, args, prefix, suffix);
    },

    getGenes: function()
    {
        var easy = [ "x", "+", "*" ];
        var hard = [ "x", // variables
        "+", "-", "*", "/", "%", // math
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // numbers
        ];

        return (mode === "easy" ? easy : hard);
    },

    getInputs: function()
    {
        var min = -1.0;
        var max = 1.0;
        var inputs = [];

        for (var i = 0; i < 21; i++)
        {
            inputs.push((i - 10) / 10.0);
        }

        inputs.sort(function(a, b)
        {
            return a - b;
        });

        return inputs;
    },

    getObjective: function()
    {
        return "Find an equation to produce the given outputs from the given inputs.";
    },

    getOutputs: function()
    {
        var inputs = this.getInputs();
        var outputs = [];

        for (var i = 0; i < inputs.length; i++)
        {
            var x = inputs[i];
            outputs.push(Math.pow(x, 4) + Math.pow(x, 3) + Math.pow(x, 2) + x);
        }

        return outputs;
    },
}
