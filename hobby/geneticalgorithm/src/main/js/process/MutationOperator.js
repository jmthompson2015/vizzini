define(function()
{
    "use strict";
    var MutationOperator =
    {
        deleteGene: function(genomeFactory, genome)
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

        exchange: function(genomeFactory, genome)
        {
            var answer = genome.slice();

            var index0 = Math.vizziniRandomIntFromRange(0, genome.length);
            var index1 = Math.vizziniRandomIntFromRange(0, genome.length);

            var temp = answer[index0];
            answer[index0] = answer[index1];
            answer[index1] = temp;

            return MutationOperator.assignCreator(answer, "exchange");
        },

        insertGene: function(genomeFactory, genome)
        {
            var genes = genomeFactory.getGenes();
            var index = Math.vizziniRandomIntFromRange(0, genome.length);

            var answer = genome.slice();
            var deleteCount = 0;
            var gene = genes.vizziniRandomElement();

            answer.splice(index, deleteCount, gene);

            return MutationOperator.assignCreator(answer, "insertGene");
        },

        mutate: function(genomeFactory, genome)
        {
            var answer = genome.slice();

            var index = Math.vizziniRandomIntFromRange(0, genome.length);
            var genes;

            if (genomeFactory.getCandidateGenes)
            {
                genes = genomeFactory.getCandidateGenes(index);
            }
            else
            {
                genes = genomeFactory.getGenes();
            }

            answer[index] = genes.vizziniRandomElement();

            return MutationOperator.assignCreator(answer, "mutate");
        },

        assignCreator: function(genome, suffix)
        {
            genome.creator = "MutationOperator." + suffix;

            return genome;
        },
    }

    function Mutator(genomeFactory, mutateFunction)
    {
        InputValidator.validateNotEmpty("genomeFactory", genomeFactory);
        InputValidator.validateNotNull("mutateFunction", mutateFunction);

        this.getGenomeFactory = function()
        {
            return genomeFactory;
        }

        this.getMutateFunction = function()
        {
            return mutateFunction;
        }

        this.execute = function(genome)
        {
            return mutateFunction(genomeFactory, genome);
        }
    }

    return (
    {
        Mutator: Mutator,
        deleteGene: MutationOperator.deleteGene,
        exchange: MutationOperator.exchange,
        insertGene: MutationOperator.insertGene,
        mutate: MutationOperator.mutate,
    });
});
