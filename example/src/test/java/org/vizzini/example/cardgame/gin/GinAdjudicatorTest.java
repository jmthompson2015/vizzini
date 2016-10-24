package org.vizzini.example.cardgame.gin;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;
import org.vizzini.core.game.cardgame.PokerCard;

/**
 * Provides tests for the <code>GinAdjudicator</code> class.
 */
public final class GinAdjudicatorTest
{
    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerFirst()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final Agent firstAgent = environment.getFirstAgent();
        final List<PokerCard> firstHand = environment.getHandFor(firstAgent);
        firstHand.clear();
        firstHand.add(PokerCard.C1.withAgent(firstAgent));
        firstHand.add(PokerCard.C2.withAgent(firstAgent));
        firstHand.add(PokerCard.C3.withAgent(firstAgent));
        firstHand.add(PokerCard.C4.withAgent(firstAgent));
        firstHand.add(PokerCard.C5.withAgent(firstAgent));
        firstHand.add(PokerCard.C6.withAgent(firstAgent));
        firstHand.add(PokerCard.C7.withAgent(firstAgent));
        firstHand.add(PokerCard.C8.withAgent(firstAgent));
        firstHand.add(PokerCard.C9.withAgent(firstAgent));
        firstHand.add(PokerCard.C10.withAgent(firstAgent));
        final GinAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        final Agent winner = adjudicator.determineWinner(environment);

        // Verify.
        assertNotNull(winner);
        assertThat(winner, is(firstAgent));
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerNull()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        final Agent winner = adjudicator.determineWinner(environment);

        // Verify.
        assertNull(winner);
    }

    /**
     * Test the <code>determineWinner()</code> method.
     */
    @Test
    public void determineWinnerSecond()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final Agent secondAgent = environment.getSecondAgent();
        final List<PokerCard> secondHand = environment.getHandFor(secondAgent);
        secondHand.clear();
        secondHand.add(PokerCard.C1.withAgent(secondAgent));
        secondHand.add(PokerCard.C2.withAgent(secondAgent));
        secondHand.add(PokerCard.C3.withAgent(secondAgent));
        secondHand.add(PokerCard.C4.withAgent(secondAgent));
        secondHand.add(PokerCard.C5.withAgent(secondAgent));
        secondHand.add(PokerCard.C6.withAgent(secondAgent));
        secondHand.add(PokerCard.C7.withAgent(secondAgent));
        secondHand.add(PokerCard.C8.withAgent(secondAgent));
        secondHand.add(PokerCard.C9.withAgent(secondAgent));
        secondHand.add(PokerCard.C10.withAgent(secondAgent));
        final GinAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        final Agent winner = adjudicator.determineWinner(environment);

        // Verify.
        assertNotNull(winner);
        assertThat(winner, is(secondAgent));
    }

    /**
     * Test the <code>getDescription()</code> method.
     */
    @Test
    public void getDescription()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinAdjudicator adjudicator = injector.injectAdjudicator();

        // Run
        final String result = adjudicator.getDescription();

        // Verify.
        assertNotNull(result);
        assertThat(result, is("A gin adjudicator."));
    }

    /**
     * Test the <code>getName()</code> method.
     */
    @Test
    public void getName()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinAdjudicator adjudicator = injector.injectAdjudicator();

        // Run
        final String result = adjudicator.getName();

        // Verify.
        assertNotNull(result);
        assertThat(result, is("Gin Adjudicator"));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalDiscardFalse()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();
        final Agent firstAgent = environment.getFirstAgent();
        final List<PokerCard> hand = environment.getHandFor(firstAgent);
        final PokerCard card = hand.get(0);
        final Action action = new DiscardAction(environment, card);

        // Run / Verify.
        assertFalse(adjudicator.isActionLegal(action));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalDiscardTrue()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();
        final Agent firstAgent = environment.getFirstAgent();
        final Action action0 = new TakeDiscardAction(environment, firstAgent);
        action0.doIt();
        assertThat(environment.getHandFor(firstAgent).size(), is(11));
        final List<PokerCard> hand = environment.getHandFor(firstAgent);
        final PokerCard card = hand.get(0);
        final Action action = new DiscardAction(environment, card);

        // Run / Verify.
        assertTrue(adjudicator.isActionLegal(action));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalTakeDiscardFalse()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();
        final Agent firstAgent = environment.getFirstAgent();
        final Action action0 = new TakeDiscardAction(environment, firstAgent);
        action0.doIt();
        assertThat(environment.getHandFor(firstAgent).size(), is(11));
        final Action action = new TakeDiscardAction(environment, firstAgent);

        // Run / Verify.
        assertFalse(adjudicator.isActionLegal(action));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalTakeDiscardTrue()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();
        final Agent firstAgent = environment.getFirstAgent();
        final Action action = new TakeDiscardAction(environment, firstAgent);

        // Run / Verify.
        assertTrue(adjudicator.isActionLegal(action));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalTakeStockFalse()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();
        final Agent firstAgent = environment.getFirstAgent();
        final Action action0 = new TakeStockAction(environment, firstAgent);
        action0.doIt();
        assertThat(environment.getHandFor(firstAgent).size(), is(11));
        final Action action = new TakeStockAction(environment, firstAgent);

        // Run / Verify.
        assertFalse(adjudicator.isActionLegal(action));
    }

    /**
     * Test the <code>isActionLegal()</code> method.
     */
    @Test
    public void isActionLegalTakeStockTrue()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();
        final Agent firstAgent = environment.getFirstAgent();
        final Action action = new TakeStockAction(environment, firstAgent);

        // Run / Verify.
        assertTrue(adjudicator.isActionLegal(action));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverFalse()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final GinAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertFalse(adjudicator.isGameOver(environment));
    }

    /**
     * Test the <code>isGameOver()</code> method.
     */
    @Test
    public void isGameOverTrue()
    {
        // Setup.
        final GinGameInjector injector = new GinGameInjector();
        final GinEnvironment environment = createEnvironment(injector);
        final Agent firstAgent = environment.getFirstAgent();
        final List<PokerCard> firstHand = environment.getHandFor(firstAgent);
        firstHand.clear();
        firstHand.add(PokerCard.C1.withAgent(firstAgent));
        firstHand.add(PokerCard.C2.withAgent(firstAgent));
        firstHand.add(PokerCard.C3.withAgent(firstAgent));
        firstHand.add(PokerCard.C4.withAgent(firstAgent));
        firstHand.add(PokerCard.C5.withAgent(firstAgent));
        firstHand.add(PokerCard.C6.withAgent(firstAgent));
        firstHand.add(PokerCard.C7.withAgent(firstAgent));
        firstHand.add(PokerCard.C8.withAgent(firstAgent));
        firstHand.add(PokerCard.C9.withAgent(firstAgent));
        firstHand.add(PokerCard.C10.withAgent(firstAgent));
        final GinAdjudicator adjudicator = injector.injectAdjudicator();

        // Run / Verify.
        assertTrue(adjudicator.isGameOver(environment));
    }

    /**
     * @param injector Game injector.
     * 
     * @return a new environment.
     */
    private GinEnvironment createEnvironment(final GinGameInjector injector)
    {
        final GinEnvironment answer = injector.injectEnvironment();

        final Agent firstAgent = new DefaultAgent("first", "first", GinTeam.FIRST);
        final Agent secondAgent = new DefaultAgent("second", "second", GinTeam.SECOND);

        final List<Agent> agents = new ArrayList<Agent>();

        agents.add(firstAgent);
        agents.add(secondAgent);

        answer.placeInitialTokens(agents);

        return answer;
    }
}
