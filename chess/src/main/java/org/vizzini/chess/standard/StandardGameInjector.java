package org.vizzini.chess.standard;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.chess.ChessActionGenerator;
import org.vizzini.chess.ChessAdjudicator;
import org.vizzini.chess.ChessGameInjector;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.DefaultChessActionGenerator;
import org.vizzini.chess.DefaultChessAdjudicator;
import org.vizzini.chess.GameType;
import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.core.game.Team;

/**
 * Provides a game injector for standard chess.
 */
public final class StandardGameInjector implements ChessGameInjector
{
    @Override
    public ChessActionGenerator injectActionGenerator()
    {
        return new DefaultChessActionGenerator();
    }

    @Override
    public ChessAdjudicator injectAdjudicator()
    {
        return new DefaultChessAdjudicator();
    }

    @Override
    public SynchronousEngine injectEngine()
    {
        return new SynchronousEngine(injectName(), injectDescription());
    }

    @Override
    public StandardEnvironment injectEnvironment()
    {
        return new StandardEnvironment();
    }

    @Override
    public Game injectGame()
    {
        return new DefaultGame(injectName(), injectDescription(), injectEngine(), injectEnvironment(),
                injectAdjudicator(), injectTeams());
    }

    @Override
    public GameType injectGameType()
    {
        return GameType.STANDARD;
    }

    @Override
    public List<Team> injectTeams()
    {
        final List<Team> answer = new ArrayList<Team>();

        answer.add(ChessTeam.WHITE);
        answer.add(ChessTeam.BLACK);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "An standard chess game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "Standard Chess";
    }
}
