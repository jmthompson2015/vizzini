var mode = "easy";
// var mode = "hard";

/*
 * Provides a problem definition for finding a JavaScript function to determine
 * if an array contains an element.
 * 
 * @param popSize Population size. 
 * @param generationCount Generation count.
 * @param backCount Back count for stopping.
 */
function JSArrayContainsProblem(popSize, generationCount, backCount)
{
    this.createGA = function()
    {
        var genes = this.createGenes();
        var genomeLength = (mode === "easy" ? 4 : 27);
        var genomeFactory = new GenomeFactory(genes, genomeLength);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator();
        var comparator = JSArrayContainsProblem.GenomeComparator;
        var selectionCount = Math.floor(0.50 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.fitnessProportionalSelect);
        var operators = [
                new Operator(0.05, 1, new Copier(CopyOperator.copy)),
                new Operator(0.60, 2, new Crossoverer(
                        CrossoverOperator.twoPointVariableLength)),
                new Operator(0.35, 1, new Mutator(genes,
                        MutationOperator.mutate)), ];

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, operators, genomeFactory, backCount);

        return ga;
    }

    this.createEvaluator = function()
    {
        var inputs = [];
        var a = [ 1, 2, 3, 4 ];
        inputs[inputs.length] = [ a, -1 ];
        inputs[inputs.length] = [ a, 0 ];
        inputs[inputs.length] = [ a, 1 ];
        inputs[inputs.length] = [ a, 2 ];
        inputs[inputs.length] = [ a, 3 ];
        inputs[inputs.length] = [ a, 4 ];
        inputs[inputs.length] = [ a, 5 ];
        inputs[inputs.length] = [ a, 6 ];
        var b = [ 2, 4, 6, 8 ];
        inputs[inputs.length] = [ b, 1 ];
        inputs[inputs.length] = [ b, 2 ];
        inputs[inputs.length] = [ b, 3 ];
        inputs[inputs.length] = [ b, 4 ];
        inputs[inputs.length] = [ b, 5 ];
        inputs[inputs.length] = [ b, 6 ];
        inputs[inputs.length] = [ b, 7 ];
        inputs[inputs.length] = [ b, 8 ];
        var outputs = [ false, false, true, true, true, true, false, false, // a
        false, true, false, true, false, true, false, true, // b
        ];
        var phenotypeFactory = new JSPhenotypeFactory("contains", [ "array",
                "element" ]);
        var isMatches = true;
        var errorThreshold;
        var idealGenomeLength = (mode === "easy" ? 4 : 27);

        return new JSEvaluator(inputs, outputs, phenotypeFactory, isMatches,
                errorThreshold, idealGenomeLength);
    }

    this.createGenes = function()
    {
        var easy = [ "for (var i = 0; i < array.length; i++)",
                "if (array[i] === element)", "return true;", "return false;", ];
        var hard = [ "for (var i = 0; i < array.length; i++)", "if", "(",
                "array[i]", "===", "element", ")", "return true;",
                "return false;", ];

        return (mode === "easy" ? easy : hard);
    }
}

JSArrayContainsProblem.GenomeComparator = function(genome0, genome1)
{
    var fitness0 = genome0.fitness;
    var fitness1 = genome1.fitness;

    // Highest fitness.
    return fitness1 - fitness0;
}
