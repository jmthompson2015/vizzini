// require("ArrayAugments");
// require("MathAugments");

/*
 * Provides a mutation operator.
 */
var MutationOperator =
{
    deleteGene: function(genes, genome)
    {
        if (genome.length < 2)
        {
            // Degenerate case.
            var answer = genome.slice();
            answer.creator = genome.creator;

            return answer;
        }
        else
        {
            var index = Math.vizziniRandomIntFromRange(0, genome.length);

            var answer = genome.slice();
            var deleteCount = 1;

            answer.splice(index, deleteCount);

            return MutationOperator.assignCreator(answer, "deleteGene");
        }
    },

    exchange: function(genes, genome)
    {
        var answer = genome.slice();

        var index0 = Math.vizziniRandomIntFromRange(0, genome.length);
        var index1 = Math.vizziniRandomIntFromRange(0, genome.length);

        var temp = answer[index0];
        answer[index0] = answer[index1];
        answer[index1] = temp;

        return MutationOperator.assignCreator(answer, "exchange");
    },

    insertGene: function(genes, genome)
    {
        var index = Math.vizziniRandomIntFromRange(0, genome.length);

        var answer = genome.slice();
        var deleteCount = 0;
        var gene = genes.vizziniRandomElement();

        answer.splice(index, deleteCount, gene);

        return MutationOperator.assignCreator(answer, "insertGene");
    },

    mutate: function(genes, genome)
    {
        var answer = genome.slice();

        var index = Math.vizziniRandomIntFromRange(0, genome.length);

        answer[index] = genes.vizziniRandomElement();

        return MutationOperator.assignCreator(answer, "mutate");
    },

    assignCreator: function(genome, suffix)
    {
        genome.creator = "MutationOperator." + suffix;

        return genome;
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

    this.execute = function(genome)
    {
        return mutateFunction(genes, genome);
    }
}
