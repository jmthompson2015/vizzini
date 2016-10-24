package org.vizzini.example.cardgame.gin;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.vizzini.core.game.cardgame.PokerCard;
import org.vizzini.core.game.cardgame.PokerSuit;

/**
 * Provides tests for the <code>HandAnalyzer</code> class.
 */
public final class HandAnalyzerTest
{
    /**
     * Test the <code>getCardCount()</code> method.
     */
    @Test
    public void getCardCountMix3()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix3();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final int result = analyzer.getCardCount(analyzer.getRunsAndSets());

        // Verify.
        assertThat(result, is(10));
    }

    /**
     * Test the <code>getCardCount()</code> method.
     */
    @Test
    public void getCardCountMix4()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix4();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final int result = analyzer.getCardCount(analyzer.getSetsAndRuns());

        // Verify.
        assertThat(result, is(6));
    }

    /**
     * Test the <code>getDeadwood()</code> method.
     */
    @Test
    public void getDeadwoodBigRun()
    {
        // Setup.
        final List<PokerCard> hand = createHandBigRun();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<PokerCard> result = analyzer.getDeadwood();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>getDeadwood()</code> method.
     */
    @Test
    public void getDeadwoodMix3()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix3();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<PokerCard> result = analyzer.getDeadwood();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>getDeadwood()</code> method.
     */
    @Test
    public void getDeadwoodMix4()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix4();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<PokerCard> result = analyzer.getDeadwood();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(4));
        assertThat(result.get(0).getRank(), is(6));
        assertThat(result.get(0).getSuit(), is(PokerSuit.SPADES));
        assertThat(result.get(1).getRank(), is(8));
        assertThat(result.get(1).getSuit(), is(PokerSuit.SPADES));
        assertThat(result.get(2).getRank(), is(9));
        assertThat(result.get(2).getSuit(), is(PokerSuit.CLUBS));
        assertThat(result.get(3).getRank(), is(9));
        assertThat(result.get(3).getSuit(), is(PokerSuit.HEARTS));
    }

    /**
     * Test the <code>getDeadwood()</code> method.
     */
    @Test
    public void getDeadwoodMix5()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix5();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<PokerCard> result = analyzer.getDeadwood();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));
        assertThat(result.get(0).getRank(), is(3));
        assertThat(result.get(0).getSuit(), is(PokerSuit.CLUBS));
        assertThat(result.get(1).getRank(), is(6));
        assertThat(result.get(1).getSuit(), is(PokerSuit.SPADES));
        assertThat(result.get(2).getRank(), is(7));
        assertThat(result.get(2).getSuit(), is(PokerSuit.SPADES));
    }

    /**
     * Test the <code>getMelds()</code> method.
     */
    @Test
    public void getMeldsBigRun()
    {
        // Setup.
        final List<PokerCard> hand = createHandBigRun();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getMelds();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));

        final Meld meld = result.get(0);
        assertThat(meld.size(), is(10));
        assertThat(meld.get(0).getRank(), is(1));
        assertThat(meld.get(0).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(1).getRank(), is(2));
        assertThat(meld.get(1).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(2).getRank(), is(3));
        assertThat(meld.get(2).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(3).getRank(), is(4));
        assertThat(meld.get(3).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(4).getRank(), is(5));
        assertThat(meld.get(4).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(5).getRank(), is(6));
        assertThat(meld.get(5).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(6).getRank(), is(7));
        assertThat(meld.get(6).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(7).getRank(), is(8));
        assertThat(meld.get(7).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(8).getRank(), is(9));
        assertThat(meld.get(8).getSuit(), is(PokerSuit.CLUBS));
        assertThat(meld.get(9).getRank(), is(10));
        assertThat(meld.get(9).getSuit(), is(PokerSuit.CLUBS));
    }

    /**
     * Test the <code>getMelds()</code> method.
     */
    @Test
    public void getMeldsMix4()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix4();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getMelds();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld meld = result.get(0);
            assertThat(meld.size(), is(3));
            assertThat(meld.get(0).getRank(), is(5));
            assertThat(meld.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(meld.get(1).getRank(), is(5));
            assertThat(meld.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(meld.get(2).getRank(), is(5));
            assertThat(meld.get(2).getSuit(), is(PokerSuit.HEARTS));
        }

        {
            final Meld meld = result.get(1);
            assertThat(meld.size(), is(3));
            assertThat(meld.get(0).getRank(), is(7));
            assertThat(meld.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(meld.get(1).getRank(), is(7));
            assertThat(meld.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(meld.get(2).getRank(), is(7));
            assertThat(meld.get(2).getSuit(), is(PokerSuit.HEARTS));
        }
    }

    /**
     * Test the <code>getMelds()</code> method.
     */
    @Test
    public void getMeldsMix5()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix5();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getMelds();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld meld = result.get(0);
            assertThat(meld.size(), is(4));
            assertThat(meld.get(0).getRank(), is(3));
            assertThat(meld.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(meld.get(1).getRank(), is(4));
            assertThat(meld.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(meld.get(2).getRank(), is(5));
            assertThat(meld.get(2).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(meld.get(3).getRank(), is(6));
            assertThat(meld.get(3).getSuit(), is(PokerSuit.DIAMONDS));
        }

        {
            final Meld meld = result.get(1);
            assertThat(meld.size(), is(3));
            assertThat(meld.get(0).getRank(), is(1));
            assertThat(meld.get(0).getSuit(), is(PokerSuit.SPADES));
            assertThat(meld.get(1).getRank(), is(2));
            assertThat(meld.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(meld.get(2).getRank(), is(3));
            assertThat(meld.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getRankCardsMap()</code> method.
     */
    @Test
    public void getRankCardsMap()
    {
        // Setup.
        final List<PokerCard> hand = createHandSets();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final Map<Integer, List<PokerCard>> result = analyzer.getRankCardsMap();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        final List<PokerCard> set1 = result.get(1);
        assertNotNull(set1);
        assertThat(set1.size(), is(4));

        final List<PokerCard> set2 = result.get(2);
        assertNotNull(set2);
        assertThat(set2.size(), is(3));

        final List<PokerCard> set3 = result.get(3);
        assertNotNull(set3);
        assertThat(set3.size(), is(3));
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRuns()
    {
        // Setup.
        final List<PokerCard> hand = createHandRuns();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
        }

        {
            final Meld run = result.get(1);
            assertNotNull(run);
            assertThat(run.size(), is(3));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.DIAMONDS));
        }

        {
            final Meld run = result.get(2);
            assertNotNull(run);
            assertThat(run.size(), is(3));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRuns2()
    {
        // Setup.
        final List<PokerCard> hand = createHandSets();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(3));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
        }

        {
            final Meld run = result.get(1);
            assertNotNull(run);
            assertThat(run.size(), is(3));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.DIAMONDS));
        }

        {
            final Meld run = result.get(2);
            assertNotNull(run);
            assertThat(run.size(), is(3));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsAndSetsMix3()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix3();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRunsAndSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(2));
            assertThat(set.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(1).getRank(), is(2));
            assertThat(set.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(2).getRank(), is(2));
            assertThat(set.get(2).getSuit(), is(PokerSuit.HEARTS));
        }

        {
            final Meld set = result.get(2);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(3));
            assertThat(set.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(1).getRank(), is(3));
            assertThat(set.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(2).getRank(), is(3));
            assertThat(set.get(2).getSuit(), is(PokerSuit.HEARTS));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsAndSetsMix5()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix5();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRunsAndSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(3));
            assertThat(run.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(1).getRank(), is(4));
            assertThat(run.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(2).getRank(), is(5));
            assertThat(run.get(2).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(3).getRank(), is(6));
            assertThat(run.get(3).getSuit(), is(PokerSuit.DIAMONDS));
        }

        {
            final Meld run = result.get(1);
            assertNotNull(run);
            assertThat(run.size(), is(3));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsBigRun()
    {
        // Setup.
        final List<PokerCard> hand = createHandBigRun();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(10));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(4).getRank(), is(5));
            assertThat(run.get(4).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(5).getRank(), is(6));
            assertThat(run.get(5).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(6).getRank(), is(7));
            assertThat(run.get(6).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(7).getRank(), is(8));
            assertThat(run.get(7).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(8).getRank(), is(9));
            assertThat(run.get(8).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(9).getRank(), is(10));
            assertThat(run.get(9).getSuit(), is(PokerSuit.CLUBS));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsGap()
    {
        // Setup.
        final List<PokerCard> hand = new ArrayList<PokerCard>();
        hand.add(PokerCard.S1);
        hand.add(PokerCard.S2);
        hand.add(PokerCard.S7);
        hand.add(PokerCard.S6);
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsMix1()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix1();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsMix2()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix2();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(6));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(4).getRank(), is(5));
            assertThat(run.get(4).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(5).getRank(), is(6));
            assertThat(run.get(5).getSuit(), is(PokerSuit.CLUBS));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsMix3()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix3();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsMix4()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix4();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(5));
            assertThat(run.get(0).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(1).getRank(), is(6));
            assertThat(run.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(2).getRank(), is(7));
            assertThat(run.get(2).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(3).getRank(), is(8));
            assertThat(run.get(3).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getRuns()</code> method.
     */
    @Test
    public void getRunsMix5()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix5();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld run = result.get(0);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(3));
            assertThat(run.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(1).getRank(), is(4));
            assertThat(run.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(2).getRank(), is(5));
            assertThat(run.get(2).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(run.get(3).getRank(), is(6));
            assertThat(run.get(3).getSuit(), is(PokerSuit.DIAMONDS));
        }

        {
            final Meld run = result.get(1);
            assertNotNull(run);
            assertThat(run.size(), is(3));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSets()
    {
        // Setup.
        final List<PokerCard> hand = createHandSets();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(4));
            assertThat(set.get(0).getRank(), is(1));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(1));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(1));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(3).getRank(), is(1));
            assertThat(set.get(3).getSuit(), is(PokerSuit.HEARTS));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(2));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(2));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(2));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(2);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(3));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(3));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(3));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSets2()
    {
        // Setup.
        final List<PokerCard> hand = createHandRuns();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(1));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(1));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(1));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(2));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(2));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(2));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(2);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(3));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(3));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(3));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getSetsAndRuns()</code> method.
     */
    @Test
    public void getSetsAndRunsMix1()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix1();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSetsAndRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(6));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(6));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(6));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(10));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(10));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(10));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld run = result.get(2);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
        }
    }

    /**
     * Test the <code>getSetsAndRuns()</code> method.
     */
    @Test
    public void getSetsAndRunsMix2()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix2();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSetsAndRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(3));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(5));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(5));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(5));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(6));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(6));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(6));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld run = result.get(2);
            assertNotNull(run);
            assertThat(run.size(), is(4));
            assertThat(run.get(0).getRank(), is(1));
            assertThat(run.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(1).getRank(), is(2));
            assertThat(run.get(1).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(2).getRank(), is(3));
            assertThat(run.get(2).getSuit(), is(PokerSuit.CLUBS));
            assertThat(run.get(3).getRank(), is(4));
            assertThat(run.get(3).getSuit(), is(PokerSuit.CLUBS));
        }
    }

    /**
     * Test the <code>getSetsAndRuns()</code> method.
     */
    @Test
    public void getSetsAndRunsMix3()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix3();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSetsAndRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(4));
            assertThat(set.get(0).getRank(), is(2));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(2));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(2));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(3).getRank(), is(2));
            assertThat(set.get(3).getSuit(), is(PokerSuit.HEARTS));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(4));
            assertThat(set.get(0).getRank(), is(3));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(3));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(3));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(3).getRank(), is(3));
            assertThat(set.get(3).getSuit(), is(PokerSuit.HEARTS));
        }
    }

    /**
     * Test the <code>getSetsAndRuns()</code> method.
     */
    @Test
    public void getSetsAndRunsMix4()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix4();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSetsAndRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(5));
            assertThat(set.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(1).getRank(), is(5));
            assertThat(set.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(2).getRank(), is(5));
            assertThat(set.get(2).getSuit(), is(PokerSuit.HEARTS));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(7));
            assertThat(set.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(1).getRank(), is(7));
            assertThat(set.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(2).getRank(), is(7));
            assertThat(set.get(2).getSuit(), is(PokerSuit.HEARTS));
        }
    }

    /**
     * Test the <code>getSetsAndRuns()</code> method.
     */
    @Test
    public void getSetsAndRunsMix5()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix5();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSetsAndRuns();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(3));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(3));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(3));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(4));
            assertThat(set.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(1).getRank(), is(5));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(6));
            assertThat(set.get(2).getSuit(), is(PokerSuit.DIAMONDS));
        }
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSetsBigRun()
    {
        // Setup.
        final List<PokerCard> hand = createHandBigRun();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(0));
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSetsMix1()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix1();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(6));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(6));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(6));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(10));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(10));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(10));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSetsMix2()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix2();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(5));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(5));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(5));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(6));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(6));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(6));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSetsMix3()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix3();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(4));
            assertThat(set.get(0).getRank(), is(2));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(2));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(2));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(3).getRank(), is(2));
            assertThat(set.get(3).getSuit(), is(PokerSuit.HEARTS));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(4));
            assertThat(set.get(0).getRank(), is(3));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(3));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(3));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(3).getRank(), is(3));
            assertThat(set.get(3).getSuit(), is(PokerSuit.HEARTS));
        }
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSetsMix4()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix4();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(2));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(5));
            assertThat(set.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(1).getRank(), is(5));
            assertThat(set.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(2).getRank(), is(5));
            assertThat(set.get(2).getSuit(), is(PokerSuit.HEARTS));
        }

        {
            final Meld set = result.get(1);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(7));
            assertThat(set.get(0).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(1).getRank(), is(7));
            assertThat(set.get(1).getSuit(), is(PokerSuit.SPADES));
            assertThat(set.get(2).getRank(), is(7));
            assertThat(set.get(2).getSuit(), is(PokerSuit.HEARTS));
        }
    }

    /**
     * Test the <code>getSets()</code> method.
     */
    @Test
    public void getSetsMix5()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix5();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final List<Meld> result = analyzer.getSets();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(1));

        {
            final Meld set = result.get(0);
            assertNotNull(set);
            assertThat(set.size(), is(3));
            assertThat(set.get(0).getRank(), is(3));
            assertThat(set.get(0).getSuit(), is(PokerSuit.CLUBS));
            assertThat(set.get(1).getRank(), is(3));
            assertThat(set.get(1).getSuit(), is(PokerSuit.DIAMONDS));
            assertThat(set.get(2).getRank(), is(3));
            assertThat(set.get(2).getSuit(), is(PokerSuit.SPADES));
        }
    }

    /**
     * Test the <code>getSuitCardsMap()</code> method.
     */
    @Test
    public void getSuitCardsMap()
    {
        // Setup.
        final List<PokerCard> hand = createHandSets();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final Map<PokerSuit, List<PokerCard>> result = analyzer.getSuitCardsMap();

        // Verify.
        assertNotNull(result);
        assertThat(result.size(), is(4));

        final List<PokerCard> set1 = result.get(PokerSuit.CLUBS);
        assertNotNull(set1);
        assertThat(set1.size(), is(3));

        final List<PokerCard> set2 = result.get(PokerSuit.DIAMONDS);
        assertNotNull(set2);
        assertThat(set2.size(), is(3));

        final List<PokerCard> set3 = result.get(PokerSuit.SPADES);
        assertNotNull(set3);
        assertThat(set3.size(), is(3));

        final List<PokerCard> set4 = result.get(PokerSuit.HEARTS);
        assertNotNull(set4);
        assertThat(set4.size(), is(1));
    }

    /**
     * Test the <code>isGin()</code> method.
     */
    @Test
    public void isGinBigRun()
    {
        // Setup.
        final List<PokerCard> hand = createHandBigRun();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final boolean result = analyzer.isGin();

        // Verify.
        assertTrue(result);
    }

    /**
     * Test the <code>isGin()</code> method.
     */
    @Test
    public void isGinMix1()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix1();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final boolean result = analyzer.isGin();

        // Verify.
        assertTrue(result);
    }

    /**
     * Test the <code>isGin()</code> method.
     */
    @Test
    public void isGinMix2()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix2();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final boolean result = analyzer.isGin();

        // Verify.
        assertTrue(result);
    }

    /**
     * Test the <code>isGin()</code> method.
     */
    @Test
    public void isGinMix3()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix3();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final boolean result = analyzer.isGin();

        // Verify.
        assertTrue(result);
    }

    /**
     * Test the <code>isGin()</code> method.
     */
    @Test
    public void isGinMix4()
    {
        // Setup.
        final List<PokerCard> hand = createHandMix4();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final boolean result = analyzer.isGin();

        // Verify.
        assertFalse(result);
    }

    /**
     * Test the <code>isGin()</code> method.
     */
    @Test
    public void isGinRuns()
    {
        // Setup.
        final List<PokerCard> hand = createHandRuns();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final boolean result = analyzer.isGin();

        // Verify.
        assertTrue(result);
    }

    /**
     * Test the <code>isGin()</code> method.
     */
    @Test
    public void isGinSets()
    {
        // Setup.
        final List<PokerCard> hand = createHandSets();
        final HandAnalyzer analyzer = new HandAnalyzer(hand);

        // Run.
        final boolean result = analyzer.isGin();

        // Verify.
        assertTrue(result);
    }

    /**
     * Test the <code>HandAnalyzer()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new HandAnalyzer(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("hand is null"));
        }
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandBigRun()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        answer.add(PokerCard.C1);
        answer.add(PokerCard.C2);
        answer.add(PokerCard.C3);
        answer.add(PokerCard.C4);
        answer.add(PokerCard.C5);
        answer.add(PokerCard.C6);
        answer.add(PokerCard.C7);
        answer.add(PokerCard.C8);
        answer.add(PokerCard.C9);
        answer.add(PokerCard.C10);

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandMix1()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        answer.add(PokerCard.C1);
        answer.add(PokerCard.C2);
        answer.add(PokerCard.C3);
        answer.add(PokerCard.C4);

        answer.add(PokerCard.C6);
        answer.add(PokerCard.D6);
        answer.add(PokerCard.S6);

        answer.add(PokerCard.C10);
        answer.add(PokerCard.D10);
        answer.add(PokerCard.S10);

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandMix2()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        answer.add(PokerCard.C1);
        answer.add(PokerCard.C2);
        answer.add(PokerCard.C3);
        answer.add(PokerCard.C4);

        answer.add(PokerCard.C5);
        answer.add(PokerCard.D5);
        answer.add(PokerCard.S5);

        answer.add(PokerCard.C6);
        answer.add(PokerCard.D6);
        answer.add(PokerCard.S6);

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandMix3()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        answer.add(PokerCard.C1);
        answer.add(PokerCard.C2);
        answer.add(PokerCard.C3);
        answer.add(PokerCard.C4);

        answer.add(PokerCard.D2);
        answer.add(PokerCard.S2);
        answer.add(PokerCard.H2);

        answer.add(PokerCard.D3);
        answer.add(PokerCard.S3);
        answer.add(PokerCard.H3);

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandMix4()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        // Losing hand
        // 5D 5S 5H 6S 7D 7S 7H 8S 9C 9H

        answer.add(PokerCard.D5);
        answer.add(PokerCard.S5);
        answer.add(PokerCard.H5);

        answer.add(PokerCard.S6);
        answer.add(PokerCard.S7);
        answer.add(PokerCard.S8);

        answer.add(PokerCard.D7);
        answer.add(PokerCard.H7);

        answer.add(PokerCard.C9);
        answer.add(PokerCard.H9);

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandMix5()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        // Losing hand
        // 7S 6S 6D 3S AS 4D 3C 2S 3D 5D

        answer.add(PokerCard.C3);
        answer.add(PokerCard.D3);
        answer.add(PokerCard.S3);

        answer.add(PokerCard.D4);
        answer.add(PokerCard.D5);
        answer.add(PokerCard.D6);

        answer.add(PokerCard.S1);
        answer.add(PokerCard.S2);

        answer.add(PokerCard.S7);
        answer.add(PokerCard.S6);

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandRuns()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        answer.add(PokerCard.C1);
        answer.add(PokerCard.C2);
        answer.add(PokerCard.C3);
        answer.add(PokerCard.C4);

        answer.add(PokerCard.D1);
        answer.add(PokerCard.D2);
        answer.add(PokerCard.D3);

        answer.add(PokerCard.S1);
        answer.add(PokerCard.S2);
        answer.add(PokerCard.S3);

        Collections.shuffle(answer);

        return answer;
    }

    /**
     * @return a new hand.
     */
    private List<PokerCard> createHandSets()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        answer.add(PokerCard.C1);
        answer.add(PokerCard.D1);
        answer.add(PokerCard.S1);
        answer.add(PokerCard.H1);

        answer.add(PokerCard.C2);
        answer.add(PokerCard.D2);
        answer.add(PokerCard.S2);

        answer.add(PokerCard.C3);
        answer.add(PokerCard.D3);
        answer.add(PokerCard.S3);

        Collections.shuffle(answer);

        return answer;
    }
}
