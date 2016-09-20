define(
        [ "Arithmetic", "Relational", "Terminal", "process/CopyOperator", "process/CrossoverOperator",
                "process/GeneticAlgorithm", "process/GenomeComparator", "process/GenomeFactory", "process/Operator",
                "process/PopulationGenerator", "process/SelectionOperator" ],
        function(Arithmetic, Relational, Terminal, CopyOperator, CrossoverOperator, GeneticAlgorithm, GenomeComparator,
                GenomeFactory, Operator, PopulationGenerator, SelectionOperator)
        {
            "use strict";
            function CartCentering(store, popSize, generationCount)
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
                    var xThreshold = 0.01;
                    var vThreshold = 0.01;

                    return new CartCentering.Evaluator(fitnessCases, xThreshold, vThreshold);
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

                        var minX = -0.75;
                        var maxX = 0.75;
                        var minV = -0.75;
                        var maxV = 0.75;

                        addFitnessCase(fitnessCases, minX, minV);
                        addFitnessCase(fitnessCases, maxX, minV);
                        addFitnessCase(fitnessCases, minX, maxV);
                        addFitnessCase(fitnessCases, maxX, maxV);

                        while (fitnessCases.length < 20)
                        {
                            var x = Math.vizziniRandomIntFromRange(minX, maxX);
                            var v = Math.vizziniRandomIntFromRange(minV, maxV);
                            addFitnessCase(fitnessCases, x, v);
                        }
                    }

                    return fitnessCases;
                };

                this.functions = function()
                {
                    if (!functions)
                    {
                        functions = [];

                        functions.push(Arithmetic.Add);
                        functions.push(Arithmetic.Divide);
                        functions.push(Arithmetic.Multiply);
                        functions.push(Arithmetic.Subtract);
                        functions.push(Arithmetic.AbsoluteValue);
                        functions.push(Relational.GreaterThan);
                    }

                    return functions;
                };

                this.objective = function()
                {
                    return "Find a time-optimal bang-bang control strategy to center a cart on a one-dimensional frictionless track.";
                };

                this.terminals = function()
                {
                    if (!terminals)
                    {
                        terminals = [];

                        terminals.push(new Terminal.Constant(-1));
                        terminals.push(new Terminal.Variable("x"));
                        terminals.push(new Terminal.Variable("v"));
                    }

                    return terminals;
                };

                function addFitnessCase(fitnessCases, x, v)
                {
                    fitnessCases.push(
                    {
                        input:
                        {
                            x: x,
                            v: v,
                        },
                        output: 0, // Output is irrevelant for this problem.
                    });
                }
            }

            CartCentering.Evaluator = function(fitnessCases, xThreshold, vThreshold)
            {
                this.idealGenomeLength = function()
                {
                    return idealGenomeLength;
                };

                this.evaluate = function(population)
                {
                    InputValidator.validateNotEmpty("population", population);

                    var simulator = new CartCentering.Simulator(xThreshold, vThreshold);
                    var isVerbose = false;

                    population.forEach(function(genome)
                    {
                        genome.rawFitness = 0.0;
                        genome.hits = 0;

                        fitnessCases.forEach(function(fitnessCase)
                        {
                            var x0 = fitnessCase.input.x;
                            var v0 = fitnessCase.input.v;
                            genome.rawFitness += simulator.run(x0, v0, genome, isVerbose);

                            if (genome.rawFitness < 10.0)
                            {
                                genome.hits++;
                            }
                        });

                        genome.fitness = genome.rawFitness;
                        genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));
                    });
                };
            };

            CartCentering.Simulator = function(xThreshold, vThreshold)
            {
                // Time step.
                var TAU = 0.02;

                this.run = function(x0, v0, genome, isVerbose)
                {
                    var context =
                    {
                        time: 0,
                        x: x0,
                        v: v0,
                    };
                    var isDone = false;

                    while (!isDone && (context.time + TAU < 10.0))
                    {
                        var value = genome.evaluate(context);
                        // Wrapper.
                        var a = (value > 0 ? 1 : -1);
                        context.time += TAU;
                        context.x += TAU * context.v; // old v
                        context.v += TAU * a;

                        if (isVerbose)
                        {
                            LOGGER.info(Math.vizziniRound(context.time, 2) + " " + Math.vizziniRound(context.x, 4) +
                                    " " + Math.vizziniRound(context.v, 4) + " " + Math.vizziniRound(a, 4));
                        }

                        isDone = (Math.abs(context.x) < xThreshold) && (Math.abs(context.v) < vThreshold);
                    }

                    return context.time;
                };
            };

            return (
            {
                CartCentering: CartCentering,
                Evaluator: CartCentering.Evaluator,
                Simulator: CartCentering.Simulator,
            });
        });
