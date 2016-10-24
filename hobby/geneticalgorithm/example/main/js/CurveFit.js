define([ "GenomeComparator", "GenomeFactory", "process/CopyOperator", "process/CrossoverOperator", "process/Evaluator",
        "process/GeneticAlgorithm", "process/MutationOperator", "process/Operator", "process/PopulationGenerator",
        "process/SelectionOperator" ],
        function(GenomeComparator, GenomeFactory, CopyOperator, CrossoverOperator, Evaluator, GeneticAlgorithm,
                MutationOperator, Operator, PopulationGenerator, SelectionOperator)
        {
            "use strict";
            function CurveFit(store, popSize, generationCount, backCount)
            {
                InputValidator.validateNotNull("store", store);
                InputValidator.validateNotNull("popSize", popSize);
                InputValidator.validateNotNull("generationCount", generationCount);
                InputValidator.validateNotNull("backCount", backCount);

                LOGGER.info("popSize = " + popSize);
                LOGGER.info("generationCount = " + generationCount);
                LOGGER.info("backCount = " + backCount);

                var fitnessCases;
                var genes;
                var genomeFactory;
                var rawFitnessComputer;

                this.createEvaluator = function()
                {
                    var fitnessCases = this.fitnessCases();
                    var rawFitnessComputer = this.rawFitnessComputer().bind(this);

                    return new Evaluator(fitnessCases, rawFitnessComputer);
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
                            operators, genomeFactory, backCount);
                };

                this.createGenomeFactory = function()
                {
                    if (!genomeFactory)
                    {
                        var genomeLength = 6;
                        genomeFactory = new GenomeFactory(this.genes(), genomeLength);
                    }

                    return genomeFactory;
                };

                this.createOperators = function()
                {
                    var operators = [];
                    operators.push(new Operator(0.05, 1, new CopyOperator.Copier(CopyOperator.copy)));
                    operators.push(new Operator(0.80, 2, new CrossoverOperator.Crossoverer(
                            CrossoverOperator.onePointConstantLength)));
                    operators.push(new Operator(0.15, 1, new MutationOperator.Mutator(genomeFactory,
                            MutationOperator.mutate)));

                    return operators;
                };

                this.createPopulation = function()
                {
                    var genomeFactory = this.createGenomeFactory();
                    var populationGenerator = new PopulationGenerator();

                    return populationGenerator.generate(popSize, genomeFactory);
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

                        // [-1, 1] in delta steps.
                        var delta = 2.0 / 19.0;

                        for (var i = 0; i < 20; i++)
                        {
                            var x = (i * delta) - 1;
                            fitnessCases.push(
                            {
                                input: x,
                                output: Math.pow(x, 4) + Math.pow(x, 3) + Math.pow(x, 2) + x,
                            });
                        }
                    }

                    return fitnessCases;
                };

                this.genes = function()
                {
                    if (!genes)
                    {
                        genes = [];

                        // [-10, 10] in delta steps.
                        var delta = 0.5;

                        for (var i = 0; i <= 40; i++)
                        {
                            genes.push((i * delta) - 10);
                        }
                    }

                    return genes;
                };

                this.objective = function()
                {
                    return "Find an equation to produce the given outputs from the given inputs.";
                };

                this.rawFitnessComputer = function()
                {
                    if (!rawFitnessComputer)
                    {
                        var errorThreshold = 0.01;
                        rawFitnessComputer = function(genome)
                        {
                            InputValidator.validateNotNull("genome", genome);

                            genome.hits = 0;
                            genome.rawFitness = fitnessCases.reduce(function(previousValue, fitnessCase, i)
                            {
                                var answer = previousValue;
                                var input = fitnessCase.input;
                                var output = fitnessCase.output;

                                var result = genome[0] * Math.pow(input, 5) + genome[1] * Math.pow(input, 4) +
                                        genome[2] * Math.pow(input, 3) + genome[3] * Math.pow(input, 2) + genome[4] *
                                        input + genome[5];

                                var error = Math.abs(output - result);

                                if (error < errorThreshold)
                                {
                                    genome.hits++;
                                }

                                answer += error;

                                return answer;
                            }, 0.0);
                        };
                    }

                    return rawFitnessComputer;
                };
            }

            return CurveFit;
        });
