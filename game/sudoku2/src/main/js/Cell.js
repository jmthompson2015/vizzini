define(function()
{
    var Cell = {};

    Cell.Candidates = function(candidates)
    {
        InputValidator.validateNotNull("candidates", candidates);

        this.candidates = function()
        {
            return candidates;
        };
    };

    Cell.Candidates.prototype.isCandidates = true;

    Cell.Candidates.prototype.withoutCandidate = function(candidate)
    {
        var newCandidates = this.candidates();
        var index = newCandidates.indexOf(candidate);

        if (index >= 0)
        {
            newCandidates = newCandidates.delete(index);
        }

        return new Cell.Candidates(newCandidates);
    };

    Cell.Value = function(value, isClueIn)
    {
        InputValidator.validateIsNumber("value", value);
        // isClue optional.

        var isClue = (isClueIn !== undefined ? isClueIn : false);

        this.value = function()
        {
            return value;
        };

        this.isClue = function()
        {
            return isClue;
        };
    };

    Cell.Value.prototype.isValue = true;

    return Cell;
});
