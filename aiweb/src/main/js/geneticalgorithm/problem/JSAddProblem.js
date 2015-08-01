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
        var genomeLength = 3;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
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
    }

    this.createEvaluator = function()
    {
        var inputs = [ [ 0, 0 ], [ 1, 2 ], [ 3, 4 ], [ 5, 6 ], [ 7, 8 ],
                [ 9, 10 ], ];
        var outputs = [ 0, 3, 7, 11, 15, 19 ];
        var isReturnUsed = true;
        var phenotypeFactory = new JSPhenotypeFactory("add", [ "a", "b" ],
                isReturnUsed);
        var isMatches = false;
        var errorThreshold = 0.0001;
        var idealGenomeLength = 3;

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    }

    this.createGenes = function()
    {
        var easy = [  "+", "a", "b" ];
        var hard = [  "+", "a", "b", // necessary
        "-", "*", "/", "%", // math
        "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", // numbers
        "Math.sin", "Math.cos", "Math.tan", ];

        return (mode === "easy" ? easy : hard);
    }
}
