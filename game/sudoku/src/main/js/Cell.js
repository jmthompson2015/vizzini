define(function()
{
    "use strict";
    var Cell = {};

    Cell.Candidates = function(candidates)
    {
        this.candidates = function()
        {
            return candidates;
        };
    };

    Cell.Candidates.prototype.isCandidates = true;
    Cell.Candidates.prototype.isValue = false;

    Cell.Candidates.prototype.withCandidate = function(candidate)
    {
        var answer = this;
        var candidates = this.candidates();

        if (!candidates.includes(candidate))
        {
            var newCandidates = candidates.slice();
            newCandidates.push(candidate);
            newCandidates.sort();
            answer = new Cell.Candidates(newCandidates);
        }

        return answer;
    };

    Cell.Candidates.prototype.withoutCandidate = function(candidate)
    {
        var answer = this;
        var candidates = this.candidates();
        var index = candidates.indexOf(candidate);

        if (index >= 0)
        {
            var newCandidates = candidates.slice();
            newCandidates.splice(index, 1);
            answer = new Cell.Candidates(newCandidates);
        }

        return answer;
    };

    Cell.Candidates.prototype.withoutCandidates = function(candidates)
    {
        var newCandidates = this.candidates().slice();
        var length = candidates.length;

        for (var i = 0; i < length; i++)
        {
            var candidate = candidates[i];
            newCandidates.vizziniRemove(candidate);
        }

        return new Cell.Candidates(newCandidates);
    };

    Cell.Value = function(value, isClueIn)
    {
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
