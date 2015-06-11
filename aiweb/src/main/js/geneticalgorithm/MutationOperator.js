// require("ArrayAugments");
// require("MathAugments");

/*
 * Provides a mutation operator.
 */
var MutationOperator =
{
    mutate: function(genes, genome)
    {
        var index = Math.Vizzini.randomIntFromRange(0, genome.length);
        var answer = genome.slice();

        answer[index] = Array.Vizzini.randomElement(genes);

        return answer;
    },
}

function Mutator(genes, mutateFunction)
{
    InputValidator.validateNotEmpty("genes", genes);
    InputValidator.validateNotNull("mutateFunction", mutateFunction);

    this.getGenes = function()
    {
        return genes;
    }

    this.mutate = function(genome)
    {
        return mutateFunction(genes, genome);
    }
}
