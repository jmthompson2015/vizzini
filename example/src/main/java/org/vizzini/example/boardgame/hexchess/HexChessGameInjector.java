package org.vizzini.example.boardgame.hexchess;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Engine;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.GameInjector;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.core.game.Team;

/**
 * Provides a game injector for hexagonal chess.
 */
public final class HexChessGameInjector implements GameInjector
{
    /**
     * @return a new action generator.
     */
    public HexChessActionGenerator injectActionGenerator()
    {
        return new HexChessActionGenerator();
    }

    @Override
    public HexChessAdjudicator injectAdjudicator()
    {
        return new HexChessAdjudicator();
    }

    @Override
    public Engine injectEngine()
    {
        return new SynchronousEngine(injectName(), injectDescription());
    }

    @Override
    public HexChessEnvironment injectEnvironment()
    {
        return new HexChessEnvironment();
    }

    @Override
    public Game injectGame()
    {
        return new DefaultGame(injectName(), injectDescription(), injectEngine(), injectEnvironment(),
                injectAdjudicator(), injectTeams());
    }

    @Override
    public List<Team> injectTeams()
    {
        final List<Team> answer = new ArrayList<Team>();

        answer.add(HexChessTeam.WHITE);
        answer.add(HexChessTeam.BLACK);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "A hexagonal chess game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "Hex Chess";
    }
}
