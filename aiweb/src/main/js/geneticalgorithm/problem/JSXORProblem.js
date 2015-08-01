/*
 * Provides a problem definition for finding a JavaScript function to perform
 * symbolic function identification.
 * 
 * xor(a, b) = return (a || b) && !(a && b)
 * xor(a, b) = return && || a b ! && a b
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
        var genomeLength = 8;
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator();
        var comparator = GenomeComparator;
        var selectionCount = Math.floor(0.30 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.fitnessProportionalSelect);
        var operators = [
                new Operator(0.05, 1, new Copier(CopyOperator.copy)),
                new Operator(0.40, 2, new Crossoverer(
                        CrossoverOperator.onePointVariableLength)),
                new Operator(0.35, 2, new Crossoverer(
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
    }

    this.createEvaluator = function()
    {
        var inputs = [ [ false, false ], [ false, true ], [ true, false ],
                [ true, true ] ];
        var outputs = [ false, true, true, false ];
        var isReturnUsed = true;
        var phenotypeFactory = new JSPhenotypeFactory("xor", [ "a", "b" ],
                isReturnUsed);
        var isMatches = true;
        var errorThreshold;
        var idealGenomeLength = 8;

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    }

    this.createGenes = function()
    {
        return [ "a", "b", "&&", "||", "!" ];
    }
}
