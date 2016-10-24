package org.vizzini.example.boardgame.checkers;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Engine;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.GameInjector;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.core.game.Team;

/**
 * Provides an implementation of a game injector for checkers.
 */
public final class CheckersGameInjector implements GameInjector
{
    /**
     * @return a new action generator.
     */
    public CheckersActionGenerator injectActionGenerator()
    {
        return new CheckersActionGenerator();
    }

    @Override
    public CheckersAdjudicator injectAdjudicator()
    {
        return new CheckersAdjudicator(injectActionGenerator());
    }

    @Override
    public Engine injectEngine()
    {
        return new SynchronousEngine(injectName(), injectDescription());
    }

    @Override
    public CheckersEnvironment injectEnvironment()
    {
        return new CheckersEnvironment();
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

        answer.add(CheckersTeam.RED);
        answer.add(CheckersTeam.WHITE);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "A checkers game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "Checkers";
    }
}
