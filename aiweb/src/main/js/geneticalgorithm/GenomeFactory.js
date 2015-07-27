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

        while (answer.length < genomeLength)
        {
            answer.push(genes.vizziniRandomElement());
        }

        answer.creator = "GenomeFactory";

        return answer;
    }
}
