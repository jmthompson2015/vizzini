package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.game.DefaultGame;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.GameInjector;
import org.vizzini.core.game.Team;

/**
 * Provides a game injector for Starfighter Squadrons.
 */
public final class SSGameInjector implements GameInjector
{
    @Override
    public SSAdjudicator injectAdjudicator()
    {
        return new SSAdjudicator();
    }

    /**
     * @return a new damage deck.
     */
    public List<DamageCard> injectDamageDeck()
    {
        return DamageCard.createDeck();
    }

    @Override
    public SSEngine injectEngine()
    {
        return new SSEngine();
    }

    @Override
    public SSEnvironment injectEnvironment()
    {
        return new SSEnvironment(injectDamageDeck());
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

        answer.add(SSTeam.IMPERIAL);
        answer.add(SSTeam.REBEL);

        return answer;
    }

    /**
     * @return description
     */
    private String injectDescription()
    {
        return "A Starfighter Squadrons game.";
    }

    /**
     * @return name
     */
    private String injectName()
    {
        return "X-Wing";
    }
}
