package org.vizzini.example.cardgame.gin;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Engine;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.GameInjector;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.core.game.Team;

/**
 * Provides a game injector for gin.
 */
public final class GinGameInjector implements GameInjector
{
    @Override
    public GinAdjudicator injectAdjudicator()
    {
        return new GinAdjudicator();
    }

    @Override
    public Engine injectEngine()
    {
        return new SynchronousEngine(injectName(), injectDescription());
    }

    @Override
    public GinEnvironment injectEnvironment()
    {
        return new GinEnvironment();
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

        answer.add(GinTeam.FIRST);
        answer.add(GinTeam.SECOND);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "A gin game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "Gin";
    }
}
