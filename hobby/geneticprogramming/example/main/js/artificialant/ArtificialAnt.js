define(
        [ "Sequence", "process/CopyOperator", "process/CrossoverOperator", "process/GeneticAlgorithm",
                "process/GenomeComparator", "process/GenomeFactory", "process/NumericEvaluator", "process/Operator",
                "process/PopulationGenerator", "process/SelectionOperator",
                "../../../../example/main/js/artificialant/AAEvaluator",
                "../../../../example/main/js/artificialant/AATerminal",
                "../../../../example/main/js/artificialant/Direction",
                "../../../../example/main/js/artificialant/IfFoodAhead" ],
        function(Sequence, CopyOperator, CrossoverOperator, GeneticAlgorithm, GenomeComparator, GenomeFactory,
                NumericEvaluator, Operator, PopulationGenerator, SelectionOperator, AAEvaluator, AATerminal, Direction,
                IfFoodAhead)
        {
            "use strict";
            function ArtificialAnt(store, popSize, generationCount)
            {
                InputValidator.validateNotNull("store", store);
                InputValidator.validateNotNull("popSize", popSize);
                InputValidator.validateNotNull("generationCount", generationCount);

                LOGGER.info("popSize = " + popSize);
                LOGGER.info("generationCount = " + generationCount);

                var fitnessCases;
                var functions;
                var maxDepth = 6;
                var terminals;

                this.createEvaluator = function()
                {
                    var fitnessCases = this.fitnessCases();

                    return new AAEvaluator(fitnessCases);
                };

                this.createGeneticAlgorithm = function()
                {
                    var population = this.createPopulation();
                    var evaluator = this.createEvaluator();
                    var comparator = GenomeComparator;
                    var selector = this.createSelector();
                    var operators = this.createOperators();
                    var genomeFactory = this.createGenomeFactory();

                    return new GeneticAlgorithm(store, population, evaluator, generationCount, comparator, selector,
                            operators[0], operators[1], genomeFactory);
                };

                this.createGenomeFactory = function()
                {
                    return new GenomeFactory.Full(this.functions(), this.terminals(), maxDepth);
                };

                this.createOperators = function()
                {
                    var operators = [];
                    operators.push(new Operator(0.05, 1, new CopyOperator.Copier(CopyOperator.copy)));
                    operators
                            .push(new Operator(0.95, 2, new CrossoverOperator.Crossoverer(CrossoverOperator.crossover)));

                    return operators;
                };

                this.createPopulation = function()
                {
                    var populationGenerator = new PopulationGenerator(this.functions(), this.terminals(), maxDepth,
                            popSize);

                    return populationGenerator.generate();
                };

                this.createSelector = function()
                {
                    var selectionCount = Math.floor(0.50 * popSize);

                    return new SelectionOperator.Selector(selectionCount, SelectionOperator.fitnessProportionalSelect);
                };

                this.fitnessCases = function()
                {
                    if (!fitnessCases)
                    {
                        fitnessCases = [];

                        fitnessCases.push(
                        {
                            input:
                            {
                                time: 0,
                                x: 0,
                                y: 0,
                                directionKey: Direction.EAST,
                            },
                            output: 0,
                        });
                    }

                    return fitnessCases;
                };

                this.functions = function()
                {
                    if (!functions)
                    {
                        functions = [];

                        functions.push(IfFoodAhead);
                        functions.push(Sequence.Sequence2);
                        functions.push(Sequence.Sequence3);
                    }

                    return functions;
                };

                this.objective = function()
                {
                    return "Find a computer program to control an artificial ant so that it can find all 89 pieces of food located on the Santa Fe trail.";
                };

                this.terminals = function()
                {
                    if (!terminals)
                    {
                        terminals = [];

                        terminals.push(new AATerminal.Left());
                        terminals.push(new AATerminal.Move());
                        terminals.push(new AATerminal.Right());
                    }

                    return terminals;
                };
            }

            return ArtificialAnt;
        });
