function TicTacToe(geometry, formatter, boardUtils, adjudicator, memory,
        firstAgent, secondAgent, delayIn, gameOverCallback)
{
    var that = this;

    InputValidator.validateNotNull("memory", memory);
    InputValidator.validateNotNull("firstAgent", firstAgent);
    InputValidator.validateNotNull("secondAgent", secondAgent);

    var agent;
    var board;
    var delay = (delayIn ? delayIn : 500);
    var gameRecords = [];

    var boardListeners = [];
    var gameOverListeners = [];
    var statusListeners = [];

    this.addBoardListener = function(listener)
    {
        boardListeners[boardListeners.length] = listener;
    }

    this.addGameOverListener = function(listener)
    {
        gameOverListeners[gameOverListeners.length] = listener;
    }

    this.addStatusListener = function(listener)
    {
        statusListeners[statusListeners.length] = listener;
    }

    this.getFirstAgent = function()
    {
        return firstAgent;
    }

    this.getMemory = function()
    {
        return memory;
    }

    this.getSecondAgent = function()
    {
        return secondAgent;
    }

    this.play = function()
    {
        LOGGER.trace("TicTacToe.play() start");

        agent = firstAgent;
        board = boardUtils.createStartBoard();
        addGameRecord(board);
        fireBoardChange(null, board);
        fireStatusChange(null, "");

        setMove(agent.getMove(board));
    }

    function addGameRecord(board)
    {
        gameRecords[gameRecords.length] = board;
    }

    function fireBoardChange(oldValue, newValue)
    {
        for (var i = 0; i < boardListeners.length; i++)
        {
            boardListeners[i].boardChange(that, oldValue, newValue);
        }
    }

    function fireGameOver(winner, loser)
    {
        for (var i = 0; i < gameOverListeners.length; i++)
        {
            gameOverListeners[i].gameOver(that, winner, loser);
        }
    }

    function fireStatusChange(oldValue, newValue)
    {
        for (var i = 0; i < statusListeners.length; i++)
        {
            statusListeners[i].statusChange(that, oldValue, newValue);
        }
    }

    function gameOver(winner, loser)
    {
        postProcessGame(winner, loser);

        fireGameOver(winner, loser);

        if (gameOverCallback)
        {
            setTimeout(gameOverCallback, 2 * delay);
        }
    }

    function getOpponent(agent)
    {
        return (agent === firstAgent ? secondAgent : firstAgent);
    }

    function postProcessGame(winner, loser)
    {
        if (!winner && loser)
        {
            // Don't post process a forfeit.
        }
        else
        {
            var isDraw = !winner && !loser;

            for (var i = 0; i < gameRecords.length; i++)
            {
                var board = gameRecords[i];
                var aliases = boardUtils.getAliases(board);
                var boardAlias = aliases[0];
                var board2 = boardAlias.getBoard();

                if (!isDraw)
                {
                    // Winner.
                    var whoseMove = formatter.toWhoseMove(board);

                    if (winner.getTeam() === whoseMove)
                    {
                        memory.addLoss(board2);
                    }
                    else
                    {
                        memory.addWin(board2);
                    }
                }
                else
                {
                    // Draw.
                    memory.addDraw(board2);
                }
            }
        }

        gameRecords = [];
    }

    function setMove(move)
    {
        LOGGER.trace("TicTacToe.setMove(" + move + ") start");
        fireStatusChange(null, agent.getTeam().toUpperCase() + " " + move);

        if (move !== undefined && 0 <= move && move < geometry.getMaxCells())
        {
            if (boardUtils.get(board, move) !== " ")
            {
                // Error: agent forfeits.
                gameOver(undefined, agent);
            }
            else
            {
                var oldValue = board;
                board = boardUtils.move(board, move);
                addGameRecord(board);
                fireBoardChange(oldValue, board);
            }
        }

        if (adjudicator.isGameOver(board))
        {
            var opponent = getOpponent(agent);

            if (adjudicator.isWinner(board, agent.getTeam()))
            {
                gameOver(agent, opponent);
            }
            else if (boardUtils.getMoves(board, adjudicator).length === 0)
            {
                gameOver();
            }
        }
        else
        {
            setTimeout(swapAgent, delay);
        }
    }

    function swapAgent()
    {
        LOGGER.trace("TicTacToe.swapAgent() start");

        var myAgent = getOpponent(agent);
        agent = myAgent;

        setMove(myAgent.getMove(board));
    }
}
