function Reversi(geometry, formatter, boardUtils, adjudicator, memory,
        firstAgent, secondAgent, delayIn, gameOverCallback)
{
    InputValidator.validateNotNull("geometry", geometry);
    InputValidator.validateNotNull("formatter", formatter);
    InputValidator.validateNotNull("boardUtils", boardUtils);
    InputValidator.validateNotNull("adjudicator", adjudicator);
    InputValidator.validateNotNull("memory", memory);
    InputValidator.validateNotNull("firstAgent", firstAgent);
    InputValidator.validateNotNull("secondAgent", secondAgent);

    var that = this;
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

    this.getBoard = function()
    {
        return board;
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
        LOGGER.trace("Reversi.play() start");

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
                var boardAlias = boardUtils.getAlias(board);
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
        LOGGER.trace("Reversi.setMove(" + move + ") start");
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
        else
        {
            // Agent can pass.
            fireStatusChange(null, agent.getTeam() + " passes.");
            LOGGER.info(agent.getTeam() + " passes.");

            // Change the board to the opponent's move.
            LOGGER.info("0 board = " + board);
            var opponent = getOpponent(agent);
            board = board.slice(0, board.length - 1) + opponent.getTeam();
            LOGGER.info("1 board = " + board);
        }

        if (adjudicator.isGameOver(board))
        {
            var opponent = getOpponent(agent);

            if (adjudicator.isWinner(board, agent.getTeam()))
            {
                gameOver(agent, opponent);
            }
            else if (adjudicator.isWinner(board, opponent.getTeam()))
            {
                gameOver(opponent, agent);
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
        LOGGER.trace("Reversi.swapAgent() start");

        var myAgent = getOpponent(agent);
        agent = myAgent;

        setMove(myAgent.getMove(board));
    }
}
