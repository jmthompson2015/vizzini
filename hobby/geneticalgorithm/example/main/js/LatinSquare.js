define([ "GenomeComparator", "GenomeFactory", "InitialState", "process/CopyOperator", "process/CrossoverOperator",
        "process/Evaluator", "process/GeneticAlgorithm", "process/MutationOperator", "process/Operator",
        "process/PopulationGenerator", "process/Reducer", "process/SelectionOperator" ],
        function(GenomeComparator, GenomeFactory, InitialState, CopyOperator, CrossoverOperator, Evaluator,
                GeneticAlgorithm, MutationOperator, Operator, PopulationGenerator, Reducer, SelectionOperator)
        {
            "use strict";
            function LatinSquare(store, n, popSize, generationCount, backCount)
            {
                InputValidator.validateNotNull("store", store);
                InputValidator.validateIsNumber("n", n);
                InputValidator.validateIsNumber("popSize", popSize);
                InputValidator.validateIsNumber("generationCount", generationCount);
                InputValidator.validateIsNumber("backCount", backCount);

                LOGGER.info("n = " + n);
                LOGGER.info("popSize = " + popSize);
                LOGGER.info("generationCount = " + generationCount);
                LOGGER.info("backCount = " + backCount);

                var fitnessCases;
                var genes;
                var genomeFactory;
                var rawFitnessComputer;
                var standardizedFitnessComputer;

                this.createEvaluator = function()
                {
                    var fitnessCases = this.fitnessCases();
                    var rawFitnessComputer = this.rawFitnessComputer().bind(this);
                    var standardizedFitnessComputer = this.standardizedFitnessComputer();

                    return new Evaluator(fitnessCases, rawFitnessComputer, standardizedFitnessComputer);
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
                        var genomeLength = n * n;
                        genomeFactory = new GenomeFactory(this.genes(), genomeLength);
                    }

                    return genomeFactory;
                };

                this.createOperators = function()
                {
                    var operators = [];
                    operators.push(new Operator(0.05, 1, new CopyOperator.Copier(CopyOperator.copy)));
                    operators.push(new Operator(0.30, 2, new CrossoverOperator.Crossoverer(
                            CrossoverOperator.onePointConstantLength)));
                    operators.push(new Operator(0.30, 2, new CrossoverOperator.Crossoverer(
                            CrossoverOperator.twoPointConstantLength)));
                    operators.push(new Operator(0.20, 2, new CrossoverOperator.Crossoverer(
                            CrossoverOperator.uniformConstantLength)));
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

                        fitnessCases.push(
                        {
                            input: 0,
                            output: 0,
                        });
                    }

                    return fitnessCases;
                };

                this.genes = function()
                {
                    if (!genes)
                    {
                        genes = [];

                        for (var i = 1; i <= n; i++)
                        {
                            genes.push(i);
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
                        rawFitnessComputer = function(genome)
                        {
                            // Count each gene in each row.
                            genome.rawFitness = 0;
                            var genes = this.genes();
                            var geneToCount = {};

                            for (var i = 0; i < n; i++)
                            {
                                for (var j = 0; j < n; j++)
                                {
                                    var index = LatinSquare.columnRowToIndex(n, j, i);
                                    var value = geneToCount[genome[index]];
                                    geneToCount[genome[index]] = (value === undefined ? 1 : value + 1);
                                }

                                adjustRawFitness(genome, genes, geneToCount);
                            }

                            // Count each gene in each column.
                            var geneToCount = {};

                            for (var j = 0; j < n; j++)
                            {
                                for (var i = 0; i < n; i++)
                                {
                                    var index = LatinSquare.columnRowToIndex(n, j, i);
                                    var value = geneToCount[genome[index]];
                                    geneToCount[genome[index]] = (value === undefined ? 1 : value + 1);
                                }

                                adjustRawFitness(genome, genes, geneToCount);
                            }

                            genome.hits = genome.rawFitness;
                        };
                    }

                    return rawFitnessComputer;

                    function adjustRawFitness(genome, genes, geneToCount)
                    {
                        genes.forEach(function(gene)
                        {
                            if (geneToCount[gene] === 1)
                            {
                                genome.rawFitness++;
                            }

                            delete geneToCount[gene];
                        });
                    }
                };

                this.standardizedFitnessComputer = function()
                {
                    if (!standardizedFitnessComputer)
                    {
                        standardizedFitnessComputer = function(rawFitness)
                        {
                            return (2 * n * n) - rawFitness;
                        };
                    }

                    return standardizedFitnessComputer;
                }
            }

            LatinSquare.columnRowToIndex = function(n, column, row)
            {
                return (row * n) + column;
            }

            LatinSquare.DisplayUI = React.createClass(
            {
                render: function()
                {
                    var genome = this.props.genome;
                    var n = this.props.n;
                    var rows = [];

                    for (var i = 0; i < n; i++)
                    {
                        var cells = [];

                        for (var j = 0; j < n; j++)
                        {
                            var index = LatinSquare.columnRowToIndex(n, j, i);
                            var value = (genome === undefined ? " " : genome[index]);
                            cells.push(React.DOM.td(
                            {
                                key: cells.length,
                            }, value));
                        }

                        rows.push(React.DOM.tr(
                        {
                            key: rows.length,
                        }, cells));
                    }

                    return React.DOM.table(
                    {
                        className: "displayUI"
                    }, React.DOM.tbody({}, rows));
                },

                propTypes:
                {
                    genome: React.PropTypes.array.isRequired,
                    n: React.PropTypes.number.isRequired,
                },
            });

            LatinSquare.LSAction =
            {
                SET_N: "setN",

                setN: function(n)
                {
                    return (
                    {
                        type: LatinSquare.LSAction.SET_N,
                        n: n,
                    });
                },
            };

            LatinSquare.LSConnector =
            {
                DisplayUI:
                {
                    mapStateToProps: function(state, ownProps)
                    {
                        var index = state.bestGenomes.length - 1;
                        var genome = (index < 0 ? [] : state.bestGenomes[index]);

                        return (
                        {
                            genome: genome,
                            n: state.n,
                        });
                    },
                },
            };

            LatinSquare.LSReducer =
            {
                root: function(state, action)
                {
                    LOGGER.debug("root() type = " + action.type);

                    if (typeof state === 'undefined') { return new InitialState(); }

                    var newBestGenomes;

                    switch (action.type)
                    {
                    case LatinSquare.LSAction.SET_N:
                        LOGGER.info("LSReducer n = " + action.n);
                        return Object.assign({}, state,
                        {
                            n: action.n,
                        });
                    default:
                        return Reducer.root(state, action);
                    }
                },
            };

            return LatinSquare;
        });
