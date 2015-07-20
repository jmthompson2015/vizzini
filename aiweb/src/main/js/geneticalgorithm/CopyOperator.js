/*
 * Provides a copy operator.
 */
var CopyOperator =
{
    copy: function(genome)
    {
        var answer = genome.slice();
        answer.creator = genome.creator;

        return answer;
    }
}

function Copier(copyFunction)
{
    InputValidator.validateNotNull("copyFunction", copyFunction);

    this.execute = function(genome)
    {
        return copyFunction(genome);
    }
}
