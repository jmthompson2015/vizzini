package org.vizzini.example.boardgame.reversi;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Engine;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.GameInjector;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.core.game.Team;

/**
 * Provides an implementation of a game injector for reversi.
 */
public final class ReversiGameInjector implements GameInjector
{
    /**
     * @return a new action generator.
     */
    public ReversiActionGenerator injectActionGenerator()
    {
        return new ReversiActionGenerator();
    }

    @Override
    public ReversiAdjudicator injectAdjudicator()
    {
        return new ReversiAdjudicator(injectActionGenerator());
    }

    @Override
    public Engine injectEngine()
    {
        return new SynchronousEngine(injectName(), injectDescription());
    }

    @Override
    public ReversiEnvironment injectEnvironment()
    {
        return new ReversiEnvironment();
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

        answer.add(ReversiTeam.BLACK);
        answer.add(ReversiTeam.WHITE);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "A reversi game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "Reversi";
    }
}
