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
function JSSymbolicRegressionProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.createGenes();
        var genomeLength = 20;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator();
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.20 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.fitnessProportionalSelect);
        var operators = [
                new Operator(0.02, 1, new Copier(CopyOperator.copy)),
                new Operator(0.30, 2, new Crossoverer(
                        CrossoverOperator.onePointVariableLength)),
                new Operator(0.30, 2, new Crossoverer(
                        CrossoverOperator.twoPointVariableLength)),
                new Operator(0.20, 1, new Mutator(genes,
                        MutationOperator.mutate)),
                new Operator(0.18, 1, new Mutator(genes,
                        MutationOperator.deleteGene)), ];

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, operators, genomeFactory, backCount);

        return ga;
    }

    this.createEvaluator = function()
    {
        var min = -1.0;
        var max = 1.0;
        var inputs = [];
        var outputs = [];

        for (var i = 0; i < 20; i++)
        {
            var x = Math.Vizzini.randomRealFromRange(min, max);
            inputs[inputs.length] = x;
            outputs[outputs.length] = (x * x * x * x) + (x * x * x) + (x * x)
                    + x;
        }
        var phenotypeFactory = new JSPhenotypeFactory("f", "x");
        var isMatches = false;
        var errorThreshold = 0.0001;
        var idealGenomeLength = 20;

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    }

    this.createGenes = function()
    {
        var easy = [ "return", "x", "+", "*" ];
        var hard = [ "return", "x", "+", "-", "*", "/", "Math.sin(",
                "Math.cos(", "Math.exp(", "Math.log(", ")", ];

        return (mode === "easy" ? easy : hard);
    }
}
