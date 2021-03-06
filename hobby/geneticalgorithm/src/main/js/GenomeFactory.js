define(function()
{
    "use strict";
    function GenomeFactory(genes, genomeLength)
    {
        InputValidator.validateNotEmpty("genes", genes);
        InputValidator.validateIsNumber("genomeLength", genomeLength);

        this.getGenes = function()
        {
            return genes;
        }

        this.getGenomeLength = function()
        {
            return genomeLength;
        }

        this.create = function()
        {
            var answer = [];

            while (answer.length < genomeLength)
            {
                answer.push(genes.vizziniRandomElement());
            }

            answer.creator = "GenomeFactory";

            return answer;
        }
    }

    return GenomeFactory;
});
