function SimpleAgent(boardUtils, adjudicator, team)
{
    this.getMove = function(board)
    {
        var answer;

        var moves = boardUtils.getMoves(board, adjudicator);
        answer = moves.randomElement();

        return answer;
    }

    this.getTeam = function()
    {
        return team;
    }
}
