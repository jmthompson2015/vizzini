// require("InputValidator");
// require("ArrayAugments");

/*
 * Provides a factory to create a genome.
 */
function GenomeFactory(genes, genomeLength)
{
    InputValidator.validateNotEmpty("genes", genes);
    InputValidator.validateIsNumber("genomeLength", genomeLength);

    this.create = function()
    {
        var answer = [];

        for (var i = 0; i < genomeLength; i++)
        {
            answer[i] = genes.vizziniRandomElement();
        }
        
        answer.creator = "GenomeFactory";

        return answer;
    }
}
