package org.vizzini.core.game;

import java.util.List;

/**
 * Defines methods required by a game injector.
 */
public interface GameInjector
{
    /**
     * @return a new adjudicator.
     */
    Adjudicator injectAdjudicator();

    /**
     * @return a new engine.
     */
    Engine injectEngine();

    /**
     * @return a new environment.
     */
    Environment injectEnvironment();

    /**
     * @return a new game.
     */
    Game injectGame();

    /**
     * @return a new list of teams.
     */
    List<Team> injectTeams();
}
