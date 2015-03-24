package org.vizzini.example.boardgame.qubic;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Engine;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.GameInjector;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.core.game.Team;

/**
 * Provides an implementation of a game injector for qubic.
 */
public final class QubicGameInjector implements GameInjector
{
    /**
     * @return a new action generator.
     */
    public QubicActionGenerator injectActionGenerator()
    {
        return new QubicActionGenerator();
    }

    @Override
    public QubicAdjudicator injectAdjudicator()
    {
        return new QubicAdjudicator();
    }

    @Override
    public Engine injectEngine()
    {
        return new SynchronousEngine(injectName(), injectDescription());
    }

    @Override
    public QubicEnvironment injectEnvironment()
    {
        return new QubicEnvironment();
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

        answer.add(QubicTeam.X);
        answer.add(QubicTeam.O);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "A qubic game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "Qubic";
    }
}
