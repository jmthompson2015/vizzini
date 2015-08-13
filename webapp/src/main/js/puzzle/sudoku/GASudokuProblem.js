/*
 * Provides a problem definition for finding a Sudoku solution.
 */
var GASudokuProblem =
{
    createGA: function(popSize, generationCount, backCount, originalGrid)
    {
        LOGGER.info("popSize         = " + popSize);
        LOGGER.info("generationCount = " + generationCount);
        LOGGER.info("backCount       = " + backCount);

        var originalPuzzle = PuzzleFormat.parse(originalGrid);
        var genomeLength = originalPuzzle.getUnfilledSquares().length;
        LOGGER.info("genomeLength    = " + genomeLength);

        var genomeFactory = new GASudokuProblem.GenomeFactory(originalGrid);
        var population = GAUtilities.createPopulation(popSize, genomeFactory);
        var evaluator = this.createEvaluator(originalGrid);
        var comparator = GASudokuProblem.GenomeComparator;
        var selectionCount = Math.floor(0.30 * popSize);
        var selector = new Selector(selectionCount,
                SelectionOperator.randomSelect);
        var operators = [
                new Operator(0.01, 1, new Copier(CopyOperator.copy)),
                new Operator(0.25, 2, new Crossoverer(
                        CrossoverOperator.onePointConstantLength)),
                new Operator(0.25, 2, new Crossoverer(
                        CrossoverOperator.twoPointConstantLength)),
                new Operator(0.25, 2, new Crossoverer(
                        CrossoverOperator.uniformConstantLength)),
                new Operator(0.24, 1, new Mutator(genomeFactory,
                        MutationOperator.mutate)) ];

        var ga = new GeneticAlgorithm(population, evaluator, generationCount,
                comparator, selector, operators, genomeFactory, backCount);

        return ga;
    },

    createEvaluator: function(originalGrid)
    {
        InputValidator.validateNotNull("originalGrid", originalGrid);

        var phenotypeFactory = new GASudokuProblem.PhenotypeFactory(
                originalGrid);

        var evaluator =
        {
            getIdealEvaluation: function()
            {
                return (3 * 81);
            },

            getPhenotypeFactory: function()
            {
                return phenotypeFactory;
            },

            evaluate: function(population)
            {
                population.forEach(function(genome)
                {
                    var grid = genome.phenotype;

                    if (!grid)
                    {
                        grid = phenotypeFactory.create(genome);
                        genome.phenotype = grid;
                    }

                    genome.fitness = 0;

                    for (var index = 0; index < 81; index++)
                    {
                        var cellName = Unit.indexToCellName(index);
                        var rowPeers = Unit.getRowPeers(cellName);
                        var isRowValid = SudokuValidator.isCellValidPeers(grid,
                                index, rowPeers);

                        if (isRowValid)
                        {
                            genome.fitness++;
                        }

                        var columnPeers = Unit.getColumnPeers(cellName);
                        var isColumnValid = SudokuValidator.isCellValidPeers(
                                grid, index, columnPeers);

                        if (isColumnValid)
                        {
                            genome.fitness++;
                        }

                        var blockPeers = Unit.getBlockPeers(cellName);
                        var isBlockValid = SudokuValidator.isCellValidPeers(
                                grid, index, blockPeers);

                        if (isBlockValid)
                        {
                            genome.fitness++;
                        }
                    }
                });
            },
        };

        return evaluator;
    },

    getGenes: function()
    {
        var genes = [];

        for (var i = 1; i <= 9; i++)
        {
            genes.push(i);
        }

        return genes;
    },

    getInputs: function()
    {
        return [];
    },

    getObjective: function()
    {
        return "Find the missing digits to solve a Sudoku puzzle.";
    },

    getOutputs: function()
    {
        return [];
    },
}

GASudokuProblem.GenomeComparator = function(genome0, genome1)
{
    var fitness0 = genome0.fitness;
    var fitness1 = genome1.fitness;

    // Highest fitness.
    return fitness1 - fitness0;
}

GASudokuProblem.GenomeFactory = function(originalGrid)
{
    InputValidator.validateNotEmpty("originalGrid", originalGrid);

    var originalPuzzle;

    function initializeOriginalPuzzle()
    {
        originalPuzzle = PuzzleFormat.parse(originalGrid);
        var filled = originalPuzzle.getFilledSquares();
        var isRecursive = false;

        filled.forEach(function(cellName)
        {
            var value = originalPuzzle.get(cellName);
            originalPuzzle.eliminate(cellName, value, isRecursive);
        });
    }

    initializeOriginalPuzzle();

    var candidateGenes = [];

    function initializeCandidateGenes()
    {
        var j = 0;

        for (var i = 0; i < 81; i++)
        {
            var gridValue = originalGrid[i];

            if (gridValue === SudokuValidator.BLANK)
            {
                var cellName = Unit.indexToCellName(i);
                var values = originalPuzzle.get(cellName);
                var myValues = values.split('');
                candidateGenes[j] = [];

                myValues.forEach(function(value)
                {
                    candidateGenes[j].push(parseInt(value));
                });

                j++;
            }
        }
    }

    initializeCandidateGenes();

    this.getOriginalGrid = function()
    {
        return originalGrid;
    }

    this.getOriginalPuzzle = function()
    {
        return originalPuzzle;
    }

    this.getCandidateGenes = function(index)
    {
        return candidateGenes[index];
    }

    this.create = function()
    {
        var answer = [];
        var j = 0;

        for (var i = 0; i < 81; i++)
        {
            var gridValue = originalGrid[i];

            if (gridValue === SudokuValidator.BLANK)
            {
                var candidateGenes = this.getCandidateGenes(j++);
                answer.push(candidateGenes.vizziniRandomElement());
            }
        }

        answer.creator = "GenomeFactory";

        return answer;
    }
}

GASudokuProblem.PhenotypeFactory = function(originalGrid)
{
    InputValidator.validateNotEmpty("originalGrid", originalGrid);

    this.getOriginalGrid = function()
    {
        return originalGrid;
    }

    this.create = function(genome)
    {
        InputValidator.validateNotEmpty("genome", genome);

        var answer = "";
        var j = 0;

        for (var index = 0; index < 81; index++)
        {
            var originalValue = originalGrid[index];

            if (originalValue === SudokuValidator.BLANK)
            {
                answer += genome[j++].toString();
            }
            else
            {
                answer += originalValue;
            }
        }

        return answer;
    }

    this.gridToGenome = function(grid)
    {
        InputValidator.validateNotEmpty("grid", grid);

        var answer = [];

        for (var index = 0; index < 81; index++)
        {
            var originalValue = originalGrid[index];

            if (originalValue === SudokuValidator.BLANK)
            {
                answer.push(parseInt(grid[index]));
            }
        }

        return answer;
    }
}
