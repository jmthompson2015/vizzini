define([ "process/Population" ], function(Population)
{
    "use strict";
    function PopulationGenerator()
    {
        this.generate = function(popSize, genomeFactory)
        {
            InputValidator.validateIsNumber("popSize", popSize);
            InputValidator.validateNotNull("genomeFactory", genomeFactory);

            // FIXME: only add unique genomes?
            var duplicatesAllowed = true;

            var answer = new Population();

            while (answer.length() < popSize)
            {
                answer.maybeAddGenome(genomeFactory.create(), duplicatesAllowed);
            }

            return answer;
        };
    }

    return PopulationGenerator;
});
