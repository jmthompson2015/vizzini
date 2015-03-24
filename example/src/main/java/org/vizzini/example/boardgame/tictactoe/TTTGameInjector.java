package org.vizzini.example.boardgame.tictactoe;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Engine;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.GameInjector;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.core.game.Team;

/**
 * Provides an implementation of a game injector for tic-tac-toe.
 */
public final class TTTGameInjector implements GameInjector
{
    /**
     * @return a new action generator.
     */
    public TTTActionGenerator injectActionGenerator()
    {
        return new TTTActionGenerator();
    }

    @Override
    public TTTAdjudicator injectAdjudicator()
    {
        return new TTTAdjudicator(injectEnvironmentStringifier());
    }

    @Override
    public Engine injectEngine()
    {
        return new SynchronousEngine(injectName(), injectDescription());
    }

    @Override
    public TTTEnvironment injectEnvironment()
    {
        return new TTTEnvironment();
    }

    /**
     * @return a new environment stringifier.
     */
    public EnvironmentStringifier injectEnvironmentStringifier()
    {
        return new EnvironmentStringifier();
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

        answer.add(TTTTeam.X);
        answer.add(TTTTeam.O);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "A tic-tac-toe game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "Tic-tac-toe";
    }
}
