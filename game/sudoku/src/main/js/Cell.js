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
        InputValidator.validateIsNumber("candidate", candidate);

        var newCandidates = this.candidates();
        var index = newCandidates.indexOf(candidate);

        if (index >= 0)
        {
            newCandidates = newCandidates.delete(index);
        }

        return new Cell.Candidates(newCandidates);
    };

    Cell.Candidates.prototype.withoutCandidates = function(candidates)
    {
        InputValidator.validateNotNull("candidates", candidates);

        var answer = this;

        candidates.forEach(function(candidate)
        {
            answer = answer.withoutCandidate(candidate);
        });

        return answer;
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
