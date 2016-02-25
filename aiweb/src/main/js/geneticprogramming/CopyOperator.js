define(function()
{
    "use strict";
    var CopyOperator =
    {
        copy: function(genome)
        {
            InputValidator.validateNotNull("genome", genome);

            var answer = genome.copy();

            return answer;
        }
    };

    function Copier(copyFunction)
    {
        InputValidator.validateNotNull("copyFunction", copyFunction);

        this.execute = function(genome)
        {
            return copyFunction(genome);
        };
    }

    return (
    {
        copy: CopyOperator.copy,
        Copier: Copier,
    });
});
