define(function()
{
    "use strict";
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
    Cell.Candidates.prototype.isValue = false;

    Cell.Candidates.prototype.withCandidate = function(candidate)
    {
        InputValidator.validateIsNumber("candidate", candidate);

        var newCandidates = this.candidates().slice();

        if (!newCandidates.includes(candidate))
        {
            newCandidates.push(candidate);
            newCandidates.sort();
        }

        return new Cell.Candidates(newCandidates);
    };

    Cell.Candidates.prototype.withoutCandidate = function(candidate)
    {
        InputValidator.validateIsNumber("candidate", candidate);

        var newCandidates = this.candidates().slice();
        var index = newCandidates.indexOf(candidate);

        if (index >= 0)
        {
            newCandidates.splice(index, 1);
        }

        return new Cell.Candidates(newCandidates);
    };

    Cell.Candidates.prototype.withoutCandidates = function(candidates)
    {
        InputValidator.validateNotNull("candidates", candidates);

        var answer = this;

        for (var i = 0; i < candidates.length; i++)
        {
            var candidate = candidates[i];
            answer = answer.withoutCandidate(candidate);
        }

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

    Cell.Value.prototype.isCandidates = false;
    Cell.Value.prototype.isValue = true;

    return Cell;
});
