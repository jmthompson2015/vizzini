package org.vizzini.example.cardgame.gin;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.vizzini.core.game.cardgame.PokerCard;
import org.vizzini.core.game.cardgame.PokerSuit;
import org.vizzini.core.game.cardgame.RankSuitCardComparator;

/**
 * Provides a hand analyzer for gin.
 * 
 * <dl>
 * <dt>set</dt>
 * <dd>A set is three or more cards of the same rank.</dd>
 * <dt>run</dt>
 * <dd>A run is three or more cards of the same suit and sequential ranks.</dd>
 * <dt>meld</dt>
 * <dd>A meld is a set or a run.</dd>
 * <dt>deadwood</dt>
 * <dd>Deadwood are the cards in a hand not used in melds.</dd>
 * <dt>hand</dt>
 * <dd>A hand consists of melds and deadwood.</dd>
 * </dl>
 */
public final class HandAnalyzer
{
    /** Flag indicating whether to print output. */
    private static final boolean IS_VERBOSE = false;

    /** Comparator. */
    private final RankSuitCardComparator comparator = new RankSuitCardComparator();

    /** Deadwood. */
    private List<PokerCard> deadwood;

    /** Melds. */
    private List<Meld> melds;

    /** Original hand. */
    private final List<PokerCard> originalHand;

    /** Map of rank to cards. */
    private Map<Integer, List<PokerCard>> rankCardsMap;

    /** Runs. */
    private List<Meld> runs;

    /** Runs and sets. */
    private List<Meld> runsAndSets;

    /** Sets. */
    private List<Meld> sets;

    /** Sets and runs. */
    private List<Meld> setsAndRuns;

    /** Map of suit to cards. */
    private Map<PokerSuit, List<PokerCard>> suitCardsMap;

    /**
     * Construct this object.
     * 
     * @param hand Hand.
     */
    public HandAnalyzer(final List<PokerCard> hand)
    {
        if (hand == null)
        {
            throw new IllegalArgumentException("hand is null");
        }

        originalHand = new ArrayList<PokerCard>(hand);
        Collections.sort(originalHand, comparator);
    }

    /**
     * @param melds Melds.
     * 
     * @return the number of cards.
     */
    @SuppressWarnings("hiding")
    public int getCardCount(final List<Meld> melds)
    {
        int answer = 0;

        for (final Meld meld : melds)
        {
            answer += meld.size();
        }

        return answer;
    }

    /**
     * @return the cards not used by melds.
     */
    public List<PokerCard> getDeadwood()
    {
        if (deadwood == null)
        {
            final List<Meld> myMelds = getMelds();
            deadwood = getDeadwood(myMelds);
        }

        return deadwood;
    }

    /**
     * @return the melds.
     */
    public List<Meld> getMelds()
    {
        if (melds == null)
        {
            final List<Meld> mySetsAndRuns = getSetsAndRuns();
            final List<Meld> myRunsAndSets = getRunsAndSets();

            final int srCount = getCardCount(mySetsAndRuns);
            final int rsCount = getCardCount(myRunsAndSets);

            // Pick the best (uses the most cards) combination.
            melds = (srCount >= rsCount ? mySetsAndRuns : myRunsAndSets);
        }

        return melds;
    }

    /**
     * @return a map of rank to cards.
     */
    public Map<Integer, List<PokerCard>> getRankCardsMap()
    {
        if (rankCardsMap == null)
        {
            rankCardsMap = new TreeMap<Integer, List<PokerCard>>();

            for (final PokerCard card : originalHand)
            {
                final int rank = card.getRank();
                getRankCards(rank).add(card);
            }
        }

        return rankCardsMap;
    }

    /**
     * @return runs.
     */
    public List<Meld> getRuns()
    {
        if (runs == null)
        {
            runs = new ArrayList<Meld>();

            final Map<PokerSuit, List<PokerCard>> mySuitCardsMap = getSuitCardsMap();

            for (final Entry<PokerSuit, List<PokerCard>> entry : mySuitCardsMap.entrySet())
            {
                final List<PokerCard> cards = entry.getValue();

                if (cards.size() >= 3)
                {
                    final List<PokerCard> run = new ArrayList<PokerCard>();

                    for (int i = 0; i < cards.size(); i++)
                    {
                        final PokerCard previous = (i >= 1 ? cards.get(i - 1) : null);
                        final PokerCard current = cards.get(i);
                        final PokerCard next = (i < (cards.size() - 1) ? cards.get(i + 1) : null);

                        if (isSequential(previous, current))
                        {
                            run.add(current);
                        }
                        else if (isSequential(current, next))
                        {
                            if (run.size() >= 3)
                            {
                                runs.add(new Meld(run));
                            }

                            run.clear();
                            run.add(current);
                        }
                    }

                    if (run.size() >= 3)
                    {
                        runs.add(new Meld(run));
                    }
                }
            }
        }

        return runs;
    }

    /**
     * @return runs and sets.
     */
    public List<Meld> getRunsAndSets()
    {
        if (runsAndSets == null)
        {
            final List<Meld> myRuns = getRuns();

            if (IS_VERBOSE)
            {
                System.out.println("myRuns.size() = " + myRuns.size());
            }

            final List<PokerCard> myDeadwood = getDeadwood(myRuns);

            if (IS_VERBOSE)
            {
                System.out.println("deadwood.size() = " + myDeadwood.size());
            }

            final HandAnalyzer analyzer = new HandAnalyzer(myDeadwood);
            final List<Meld> mySets = analyzer.getSets();

            if (IS_VERBOSE)
            {
                System.out.println("mySets.size() = " + mySets.size());
            }

            runsAndSets = new ArrayList<Meld>();

            runsAndSets.addAll(myRuns);
            runsAndSets.addAll(mySets);
        }

        return runsAndSets;
    }

    /**
     * @return sets.
     */
    public List<Meld> getSets()
    {
        if (sets == null)
        {
            sets = new ArrayList<Meld>();

            final Map<Integer, List<PokerCard>> myRankCardsMap = getRankCardsMap();

            for (final Entry<Integer, List<PokerCard>> entry : myRankCardsMap.entrySet())
            {
                final List<PokerCard> cards = entry.getValue();

                if (cards.size() >= 3)
                {
                    sets.add(new Meld(cards));
                }
            }
        }

        return sets;
    }

    /**
     * @return sets and runs.
     */
    public List<Meld> getSetsAndRuns()
    {
        if (setsAndRuns == null)
        {
            final List<Meld> mySets = getSets();

            if (IS_VERBOSE)
            {
                System.out.println("mySets.size() = " + mySets.size());
            }

            final List<PokerCard> myDeadwood = getDeadwood(mySets);

            if (IS_VERBOSE)
            {
                System.out.println("deadwood.size() = " + myDeadwood.size());
            }

            final HandAnalyzer analyzer = new HandAnalyzer(myDeadwood);
            final List<Meld> myRuns = analyzer.getRuns();

            if (IS_VERBOSE)
            {
                System.out.println("myRuns.size() = " + myRuns.size());
            }

            setsAndRuns = new ArrayList<Meld>();

            setsAndRuns.addAll(mySets);
            setsAndRuns.addAll(myRuns);
        }

        return setsAndRuns;
    }

    /**
     * @return a sorted hand.
     */
    public List<PokerCard> getSortedHand()
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>();

        final List<Meld> myMelds = getMelds();

        for (final Meld meld : myMelds)
        {
            answer.addAll(meld.asList());
        }

        answer.addAll(getDeadwood());

        return answer;
    }

    /**
     * @return a map of suit to cards.
     */
    public Map<PokerSuit, List<PokerCard>> getSuitCardsMap()
    {
        if (suitCardsMap == null)
        {
            suitCardsMap = new TreeMap<PokerSuit, List<PokerCard>>();

            for (final PokerCard card : originalHand)
            {
                final PokerSuit suit = card.getSuit();
                getSuitCards(suit).add(card);
            }
        }

        return suitCardsMap;
    }

    /**
     * @return true if the hand represents gin.
     */
    public boolean isGin()
    {
        final List<Meld> mySetsAndRuns = getSetsAndRuns();
        final int setCardCount = getCardCount(mySetsAndRuns);

        boolean answer = (setCardCount == 10);

        if (!answer)
        {
            final List<Meld> myRunsAndSets = getRunsAndSets();
            final int runCardCount = getCardCount(myRunsAndSets);

            answer = (runCardCount == 10);
        }

        return answer;
    }

    /**
     * @param melds Melds.
     * 
     * @return the cards not used by melds.
     */
    @SuppressWarnings("hiding")
    private List<PokerCard> getDeadwood(final List<Meld> melds)
    {
        final List<PokerCard> answer = new ArrayList<PokerCard>(originalHand);

        for (final Meld meld : melds)
        {
            answer.removeAll(meld.asList());
        }

        Collections.sort(answer, comparator);

        return answer;
    }

    /**
     * @param rank Rank.
     * 
     * @return cards.
     */
    private List<PokerCard> getRankCards(final int rank)
    {
        List<PokerCard> answer = rankCardsMap.get(rank);

        if (answer == null)
        {
            answer = new ArrayList<PokerCard>();
            rankCardsMap.put(rank, answer);
        }

        return answer;
    }

    /**
     * @param suit Suit.
     * 
     * @return cards.
     */
    private List<PokerCard> getSuitCards(final PokerSuit suit)
    {
        List<PokerCard> answer = suitCardsMap.get(suit);

        if (answer == null)
        {
            answer = new ArrayList<PokerCard>();
            suitCardsMap.put(suit, answer);
        }

        return answer;
    }

    /**
     * @param card0 Card.
     * @param card1 Card.
     * 
     * @return true if the cards have sequential ranks.
     */
    private boolean isSequential(final PokerCard card0, final PokerCard card1)
    {
        return (card0 != null) && (card1 != null) && (card0.getRank() == (card1.getRank() - 1));
    }
}
