var mode = "easy";
// var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to perform
 * symbolic function identification.
 * 
 * xor(a, b) = return (a || b) && !(a && b)
 * 
 * @param popSize Population size. 
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function JSXORProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        LOGGER.info("popSize = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount = " + backCount);

        var genes = this.createGenes();
        var genomeLength = (mode === "easy" ? 5 : 13);
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator();
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.50 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.fitnessProportionalSelect);
        var operators = [
                new Operator(0.1, 1, new Copier(CopyOperator.copy)),
                new Operator(0.6, 2, new Crossoverer(
                        CrossoverOperator.onePointVariableLength)),
                new Operator(0.3, 1, new Mutator(genes,
                        MutationOperator.mutate)), ];

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, operators, genomeFactory, backCount);

        return ga;
    }

    this.createEvaluator = function()
    {
        var inputs = [ [ false, false ], [ false, true ], [ true, false ],
                [ true, true ] ];
        var outputs = [ false, true, true, false ];
        var phenotypeFactory = new JSPhenotypeFactory("xor", [ "a", "b" ]);
        var isMatches = true;
        var errorThreshold;
        var idealGenomeLength = (mode === "easy" ? 5 : 13);

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    }

    this.createGenes = function()
    {
        var easy = [ "return", "(a || b)", "&&", "!", "(a && b)", ];
        var hard = [ "return", "a", "b", "&&", "||", "!", "(", ")" ];

        return (mode === "easy" ? easy : hard);
    }
}
