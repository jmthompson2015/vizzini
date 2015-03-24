package org.vizzini.core.game;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a default implementation of a game injector.
 */
public final class DefaultGameInjector implements GameInjector
{
    @Override
    public Adjudicator injectAdjudicator()
    {
        return new DefaultAdjudicator("default", null);
    }

    @Override
    public Engine injectEngine()
    {
        return new DefaultEngine(null, "default");
    }

    @Override
    public Environment injectEnvironment()
    {
        return new DefaultEnvironment("default", "default");
    }

    @Override
    public Game injectGame()
    {
        final Game answer = new DefaultGame("default", "a default game", injectEngine(), injectEnvironment(),
                injectAdjudicator(), injectTeams());

        return answer;
    }

    /**
     * @return a new team.
     */
    public Team injectTeamBlack()
    {
        return new DefaultTeam("Black", "team black");
    }

    @Override
    public List<Team> injectTeams()
    {
        final List<Team> answer = new ArrayList<Team>();

        answer.add(injectTeamWhite());
        answer.add(injectTeamBlack());

        return answer;
    }

    /**
     * @return a new team.
     */
    public Team injectTeamWhite()
    {
        return new DefaultTeam("White", "team white");
    }
}
