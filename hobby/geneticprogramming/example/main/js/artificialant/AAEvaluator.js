define([ "../../../../example/main/js/artificialant/AASimulator",
        "../../../../example/main/js/artificialant/SantaFeTrail" ], function(AASimulator, SantaFeTrail)
{
    "use strict";
    function AAEvaluator(fitnessCases)
    {
        this.fitnessCases = function()
        {
            return fitnessCases;
        };

        this.evaluate = function(population)
        {
            InputValidator.validateNotEmpty("population", population);

            population.forEach(function(genome)
            {
                fitnessCases.forEach(function(fitnessCase)
                {
                    var simulator = new AASimulator();
                    var context = Object.assign({}, fitnessCase.input,
                    {
                        environment: new SantaFeTrail(),
                    });

                    genome.rawFitness = simulator.run(context, genome);
                    genome.hits = genome.rawFitness;
                    genome.fitness = context.environment.initialFoodCount() - genome.rawFitness;
                    genome.adjustedFitness = (1.0 / (1.0 + genome.fitness));
                });
            });
        };
    }

    return AAEvaluator;
});
