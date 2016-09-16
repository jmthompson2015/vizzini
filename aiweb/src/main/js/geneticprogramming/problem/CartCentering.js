define(
        [ "Arithmetic", "CopyOperator", "CrossoverOperator", "Evaluator", "GeneticAlgorithm", "GenomeComparator",
                "GenomeFactory", "Operator", "PopulationGenerator", "Relational", "SelectionOperator", "Terminal" ],
        function(Arithmetic, CopyOperator, CrossoverOperator, Evaluator, GeneticAlgorithm, GenomeComparator,
                GenomeFactory, Operator, PopulationGenerator, Relational, SelectionOperator, Terminal)
        {
            "use strict";
            function CartCentering(popSize, generationCount)
            {
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

                    return new GeneticAlgorithm(population, evaluator, generationCount, comparator, selector,
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
                        var contexts = [];
                        var outputs = [];

                        var minX = -0.75;
                        var maxX = 0.75;
                        var minV = -0.75;
                        var maxV = 0.75;

                        addContext(contexts, minX, minV);
                        outputs.push(0); // Output is irrevelant for this problem.
                        addContext(contexts, maxX, minV);
                        outputs.push(0); // Output is irrevelant for this problem.
                        addContext(contexts, minX, maxV);
                        outputs.push(0); // Output is irrevelant for this problem.
                        addContext(contexts, maxX, maxV);
                        outputs.push(0); // Output is irrevelant for this problem.

                        while (contexts.length < 20)
                        {
                            var x0 = Math.vizziniRandomIntFromRange(minX, maxX);
                            var v0 = Math.vizziniRandomIntFromRange(minV, maxV);

                            addContext(contexts, x0, v0);
                            outputs.push(0); // Output is irrevelant for this problem.
                        }

                        fitnessCases =
                        {
                            contexts: contexts,
                            outputs: outputs,
                        };
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

                function addContext(contexts, x, v)
                {
                    contexts.push(
                    {
                        x: x,
                        v: v,
                    });
                }
            }

            CartCentering.Evaluator = function(fitnessCases, xThreshold, vThreshold)
            {
                this.idealGenomeLength = function()
                {
                    return idealGenomeLength;
                };

                this.idealEvaluation = function()
                {
                    return 1000;
                };

                this.evaluate = function(population)
                {
                    InputValidator.validateNotEmpty("population", population);

                    var simulator = new CartCentering.Simulator(xThreshold, vThreshold);
                    var isVerbose = false;
                    var idealEvaluation = this.idealEvaluation();

                    population.forEach(function(genome)
                    {
                        var fitness = 0.0;

                        fitnessCases.contexts.forEach(function(context)
                        {
                            var x0 = context.x;
                            var v0 = context.v;
                            fitness += simulator.run(x0, v0, genome, isVerbose);
                        });

                        // Penalize long answers?

                        genome.fitness = (fitness === 0 ? idealEvaluation : idealEvaluation / fitness);
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
