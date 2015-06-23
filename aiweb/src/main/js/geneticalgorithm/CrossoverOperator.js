// require("Logger");
// require("InputValidator");
// require("MathAugments");

/*
 * Provides a crossover operator.
 * 
 * @see <a href="https://en.wikipedia.org/wiki/Crossover_(genetic_algorithm)">Crossover</a>
 */
var CrossoverOperator =
{
    onePointConstantLength: function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);
        CrossoverOperator.validateSameLength(genome0, genome1)

        var index = Math.Vizzini.randomIntFromRange(0, genome0.length);

        var part0 = genome0.slice(0, index);
        var part1 = genome1.slice(index);

        return part0.concat(part1);
    },

    onePointVariableLength: function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);

        var index0 = Math.Vizzini.randomIntFromRange(0, genome0.length);
        var index1 = Math.Vizzini.randomIntFromRange(0, genome1.length);

        var part0 = genome0.slice(0, index0);
        var part1 = genome1.slice(index1);

        return part0.concat(part1);
    },

    twoPointConstantLength: function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);
        CrossoverOperator.validateSameLength(genome0, genome1)

        if (genome0.length === 1)
        {
            // Degenerate case.
            return (Math.random() < 0.5 ? genome0.slice() : genome1.slice());
        }
        else
        {
            var indices = CrossoverOperator.selectTwoIndices(genome0.length);

            var part0 = genome0.slice(0, indices[0]);
            var part1 = genome1.slice(indices[0], indices[1]);
            var part2 = genome0.slice(indices[1]);

            return part0.concat(part1.concat(part2));
        }
    },

    twoPointVariableLength: function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);

        if (genome0.length === 1 || genome1.length === 1)
        {
            // Degenerate case.
            return (Math.random() < 0.5 ? genome0.slice() : genome1.slice());
        }
        else
        {
            var indices0 = CrossoverOperator.selectTwoIndices(genome0.length);
            var indices1 = CrossoverOperator.selectTwoIndices(genome1.length);

            var part0 = genome0.slice(0, indices0[0]);
            var part1 = genome1.slice(indices1[0], indices1[1]);
            var part2 = genome0.slice(indices0[1]);

            return part0.concat(part1.concat(part2));
        }
    },

    uniformConstantLength: function(genome0, genome1)
    {
        InputValidator.validateNotNull("genome0", genome0);
        InputValidator.validateNotNull("genome1", genome1);
        CrossoverOperator.validateSameLength(genome0, genome1)

        var answer = [];

        for (var i = 0; i < genome0.length; i++)
        {
            if (Math.random() < 0.5)
            {
                answer[answer.length] = genome0[i];
            }
            else
            {
                answer[answer.length] = genome1[i];
            }
        }

        return answer;
    },

    selectTwoIndices: function(length)
    {
        if (length < 2) { throw "Can't selectTwoIndices from length = "
                + length; }

        var answer = [ 0, 0 ];

        while (answer[0] === answer[1])
        {
            answer[0] = Math.Vizzini.randomIntFromRange(0, length);
            answer[1] = Math.Vizzini.randomIntFromRange(0, length);
        }

        answer.sort();

        return answer;
    },

    validateSameLength: function(genome0, genome1)
    {
        if (genome0.length !== genome1.length) { throw "Genomes are different lengths: genome0.length = "
                + genome0.length + " genome1.length = " + genome1.length; }
    },
}
