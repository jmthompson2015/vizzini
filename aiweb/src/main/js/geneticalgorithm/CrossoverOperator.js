// require("Logger");
// require("InputValidator");
// require("MathAugments");

/*
 * Provides a crossover operator.
 */
var CrossoverOperator =
{
    sameLengthCrossover: function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);

        if (genome0.length !== genome1.length)
        {
            LOGGER.error(new Error().stack);
            throw "Genomes are different lengths: genome0.length = "
                    + genome0.length + " genome1.length = " + genome1.length;
        }

        var index = Math.Vizzini.randomIntFromRange(0, genome0.length);

        return genome0.slice(0, index).concat(genome1.slice(index));
    },

    variableLengthCrossover: function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);

        var index0 = Math.Vizzini.randomIntFromRange(0, genome0.length);
        var index1 = Math.Vizzini.randomIntFromRange(0, genome1.length);

        return genome0.slice(0, index0).concat(genome1.slice(index1));
    },
}
