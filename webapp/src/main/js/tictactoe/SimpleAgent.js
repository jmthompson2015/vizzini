function SimpleAgent(team)
{
    this.getTeam=function()
    {
        return team;
    }
}

SimpleAgent.prototype.getMove = function(board)
{
    var answer;

    var moves = BoardUtilities.getMoves(board);
    answer = moves.randomElement();
    
    return answer;
}
