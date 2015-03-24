package org.vizzini.core.game.cardgame;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultToken;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

/**
 * Provides a pseudo-enumeration of tarot cards.
 */
public final class TarotCard implements Card
{
    /** Card. */
    public static final TarotCard W1 = new TarotCard(TarotSuit.WANDS, "Ace", 1);

    /** Card. */
    public static final TarotCard W2 = new TarotCard(TarotSuit.WANDS, "Two", 2);

    /** Card. */
    public static final TarotCard W3 = new TarotCard(TarotSuit.WANDS, "Three", 3);

    /** Card. */
    public static final TarotCard W4 = new TarotCard(TarotSuit.WANDS, "Four", 4);

    /** Card. */
    public static final TarotCard W5 = new TarotCard(TarotSuit.WANDS, "Five", 5);

    /** Card. */
    public static final TarotCard W6 = new TarotCard(TarotSuit.WANDS, "Six", 6);

    /** Card. */
    public static final TarotCard W7 = new TarotCard(TarotSuit.WANDS, "Seven", 7);

    /** Card. */
    public static final TarotCard W8 = new TarotCard(TarotSuit.WANDS, "Eight", 8);

    /** Card. */
    public static final TarotCard W9 = new TarotCard(TarotSuit.WANDS, "Nine", 9);

    /** Card. */
    public static final TarotCard W10 = new TarotCard(TarotSuit.WANDS, "Ten", 10);

    /** Card. */
    public static final TarotCard W11 = new TarotCard(TarotSuit.WANDS, "Page", 11);

    /** Card. */
    public static final TarotCard W12 = new TarotCard(TarotSuit.WANDS, "Knight", 12);

    /** Card. */
    public static final TarotCard W13 = new TarotCard(TarotSuit.WANDS, "Queen", 13);

    /** Card. */
    public static final TarotCard W14 = new TarotCard(TarotSuit.WANDS, "King", 14);

    /** Card. */
    public static final TarotCard P1 = new TarotCard(TarotSuit.PENTACLES, "Ace", 1);

    /** Card. */
    public static final TarotCard P2 = new TarotCard(TarotSuit.PENTACLES, "Two", 2);

    /** Card. */
    public static final TarotCard P3 = new TarotCard(TarotSuit.PENTACLES, "Three", 3);

    /** Card. */
    public static final TarotCard P4 = new TarotCard(TarotSuit.PENTACLES, "Four", 4);

    /** Card. */
    public static final TarotCard P5 = new TarotCard(TarotSuit.PENTACLES, "Five", 5);

    /** Card. */
    public static final TarotCard P6 = new TarotCard(TarotSuit.PENTACLES, "Six", 6);

    /** Card. */
    public static final TarotCard P7 = new TarotCard(TarotSuit.PENTACLES, "Seven", 7);

    /** Card. */
    public static final TarotCard P8 = new TarotCard(TarotSuit.PENTACLES, "Eight", 8);

    /** Card. */
    public static final TarotCard P9 = new TarotCard(TarotSuit.PENTACLES, "Nine", 9);

    /** Card. */
    public static final TarotCard P10 = new TarotCard(TarotSuit.PENTACLES, "Ten", 10);

    /** Card. */
    public static final TarotCard P11 = new TarotCard(TarotSuit.PENTACLES, "Page", 11);

    /** Card. */
    public static final TarotCard P12 = new TarotCard(TarotSuit.PENTACLES, "Knight", 12);

    /** Card. */
    public static final TarotCard P13 = new TarotCard(TarotSuit.PENTACLES, "Queen", 13);

    /** Card. */
    public static final TarotCard P14 = new TarotCard(TarotSuit.PENTACLES, "King", 14);

    /** Card. */
    public static final TarotCard S1 = new TarotCard(TarotSuit.SWORDS, "Ace", 1);

    /** Card. */
    public static final TarotCard S2 = new TarotCard(TarotSuit.SWORDS, "Two", 2);

    /** Card. */
    public static final TarotCard S3 = new TarotCard(TarotSuit.SWORDS, "Three", 3);

    /** Card. */
    public static final TarotCard S4 = new TarotCard(TarotSuit.SWORDS, "Four", 4);

    /** Card. */
    public static final TarotCard S5 = new TarotCard(TarotSuit.SWORDS, "Five", 5);

    /** Card. */
    public static final TarotCard S6 = new TarotCard(TarotSuit.SWORDS, "Six", 6);

    /** Card. */
    public static final TarotCard S7 = new TarotCard(TarotSuit.SWORDS, "Seven", 7);

    /** Card. */
    public static final TarotCard S8 = new TarotCard(TarotSuit.SWORDS, "Eight", 8);

    /** Card. */
    public static final TarotCard S9 = new TarotCard(TarotSuit.SWORDS, "Nine", 9);

    /** Card. */
    public static final TarotCard S10 = new TarotCard(TarotSuit.SWORDS, "Ten", 10);

    /** Card. */
    public static final TarotCard S11 = new TarotCard(TarotSuit.SWORDS, "Page", 11);

    /** Card. */
    public static final TarotCard S12 = new TarotCard(TarotSuit.SWORDS, "Knight", 12);

    /** Card. */
    public static final TarotCard S13 = new TarotCard(TarotSuit.SWORDS, "Queen", 13);

    /** Card. */
    public static final TarotCard S14 = new TarotCard(TarotSuit.SWORDS, "King", 14);

    /** Card. */
    public static final TarotCard C1 = new TarotCard(TarotSuit.CUPS, "Ace", 1);

    /** Card. */
    public static final TarotCard C2 = new TarotCard(TarotSuit.CUPS, "Two", 2);

    /** Card. */
    public static final TarotCard C3 = new TarotCard(TarotSuit.CUPS, "Three", 3);

    /** Card. */
    public static final TarotCard C4 = new TarotCard(TarotSuit.CUPS, "Four", 4);

    /** Card. */
    public static final TarotCard C5 = new TarotCard(TarotSuit.CUPS, "Five", 5);

    /** Card. */
    public static final TarotCard C6 = new TarotCard(TarotSuit.CUPS, "Six", 6);

    /** Card. */
    public static final TarotCard C7 = new TarotCard(TarotSuit.CUPS, "Seven", 7);

    /** Card. */
    public static final TarotCard C8 = new TarotCard(TarotSuit.CUPS, "Eight", 8);

    /** Card. */
    public static final TarotCard C9 = new TarotCard(TarotSuit.CUPS, "Nine", 9);

    /** Card. */
    public static final TarotCard C10 = new TarotCard(TarotSuit.CUPS, "Ten", 10);

    /** Card. */
    public static final TarotCard C11 = new TarotCard(TarotSuit.CUPS, "Page", 11);

    /** Card. */
    public static final TarotCard C12 = new TarotCard(TarotSuit.CUPS, "Knight", 12);

    /** Card. */
    public static final TarotCard C13 = new TarotCard(TarotSuit.CUPS, "Queen", 13);

    /** Card. */
    public static final TarotCard C14 = new TarotCard(TarotSuit.CUPS, "King", 14);

    /** Card. */
    public static final TarotCard M0 = new TarotCard("The Fool", 0);

    /** Card. */
    public static final TarotCard M1 = new TarotCard("The Magician", 1);

    /** Card. */
    public static final TarotCard M2 = new TarotCard("The High Priestess", 2);

    /** Card. */
    public static final TarotCard M3 = new TarotCard("The Empress", 3);

    /** Card. */
    public static final TarotCard M4 = new TarotCard("The Emperor", 4);

    /** Card. */
    public static final TarotCard M5 = new TarotCard("The Hierophant", 5);

    /** Card. */
    public static final TarotCard M6 = new TarotCard("The Lovers", 6);

    /** Card. */
    public static final TarotCard M7 = new TarotCard("The Chariot", 7);

    /** Card. */
    public static final TarotCard M8 = new TarotCard("Strength", 8);

    /** Card. */
    public static final TarotCard M9 = new TarotCard("The Hermit", 9);

    /** Card. */
    public static final TarotCard M10 = new TarotCard("Wheel of Fortune", 10);

    /** Card. */
    public static final TarotCard M11 = new TarotCard("Justice", 11);

    /** Card. */
    public static final TarotCard M12 = new TarotCard("The Hanged Man", 12);

    /** Card. */
    public static final TarotCard M13 = new TarotCard("Death", 13);

    /** Card. */
    public static final TarotCard M14 = new TarotCard("Temperance", 14);

    /** Card. */
    public static final TarotCard M15 = new TarotCard("The Devil", 15);

    /** Card. */
    public static final TarotCard M16 = new TarotCard("The Tower", 16);

    /** Card. */
    public static final TarotCard M17 = new TarotCard("The Star", 17);

    /** Card. */
    public static final TarotCard M18 = new TarotCard("The Moon", 18);

    /** Card. */
    public static final TarotCard M19 = new TarotCard("The Sun", 19);

    /** Card. */
    public static final TarotCard M20 = new TarotCard("Judgement", 20);

    /** Card. */
    public static final TarotCard M21 = new TarotCard("The World", 21);

    /** Alternate card name. */
    public static final TarotCard FOOL = M0;

    /** Alternate card name. */
    public static final TarotCard MAGICIAN = M1;

    /** Alternate card name. */
    public static final TarotCard HIGH_PRIESTESS = M2;

    /** Alternate card name. */
    public static final TarotCard EMPRESS = M3;

    /** Alternate card name. */
    public static final TarotCard EMPEROR = M4;

    /** Alternate card name. */
    public static final TarotCard HIEROPHANT = M5;

    /** Alternate card name. */
    public static final TarotCard LOVERS = M6;

    /** Alternate card name. */
    public static final TarotCard CHARIOT = M7;

    /** Alternate card name. */
    public static final TarotCard STRENGTH = M8;

    /** Alternate card name. */
    public static final TarotCard HERMIT = M9;

    /** Alternate card name. */
    public static final TarotCard WHEEL_OF_FORTUNE = M10;

    /** Alternate card name. */
    public static final TarotCard JUSTICE = M11;

    /** Alternate card name. */
    public static final TarotCard HANGED_MAN = M12;

    /** Alternate card name. */
    public static final TarotCard DEATH = M13;

    /** Alternate card name. */
    public static final TarotCard TEMPERANCE = M14;

    /** Alternate card name. */
    public static final TarotCard DEVIL = M15;

    /** Alternate card name. */
    public static final TarotCard TOWER = M16;

    /** Alternate card name. */
    public static final TarotCard STAR = M17;

    /** Alternate card name. */
    public static final TarotCard MOON = M18;

    /** Alternate card name. */
    public static final TarotCard SUN = M19;

    /** Alternate card name. */
    public static final TarotCard JUDGEMENT = M20;

    /** Alternate card name. */
    public static final TarotCard WORLD = M21;

    /** Values. */
    private static final TarotCard[] VALUES;

    static
    {
        VALUES = new TarotCard[78];

        int i = 0;
        VALUES[i++] = W1;
        VALUES[i++] = W2;
        VALUES[i++] = W3;
        VALUES[i++] = W4;
        VALUES[i++] = W5;
        VALUES[i++] = W6;
        VALUES[i++] = W7;
        VALUES[i++] = W8;
        VALUES[i++] = W9;
        VALUES[i++] = W10;
        VALUES[i++] = W11;
        VALUES[i++] = W12;
        VALUES[i++] = W13;
        VALUES[i++] = W14;
        VALUES[i++] = P1;
        VALUES[i++] = P2;
        VALUES[i++] = P3;
        VALUES[i++] = P4;
        VALUES[i++] = P5;
        VALUES[i++] = P6;
        VALUES[i++] = P7;
        VALUES[i++] = P8;
        VALUES[i++] = P9;
        VALUES[i++] = P10;
        VALUES[i++] = P11;
        VALUES[i++] = P12;
        VALUES[i++] = P13;
        VALUES[i++] = P14;
        VALUES[i++] = S1;
        VALUES[i++] = S2;
        VALUES[i++] = S3;
        VALUES[i++] = S4;
        VALUES[i++] = S5;
        VALUES[i++] = S6;
        VALUES[i++] = S7;
        VALUES[i++] = S8;
        VALUES[i++] = S9;
        VALUES[i++] = S10;
        VALUES[i++] = S11;
        VALUES[i++] = S12;
        VALUES[i++] = S13;
        VALUES[i++] = S14;
        VALUES[i++] = C1;
        VALUES[i++] = C2;
        VALUES[i++] = C3;
        VALUES[i++] = C4;
        VALUES[i++] = C5;
        VALUES[i++] = C6;
        VALUES[i++] = C7;
        VALUES[i++] = C8;
        VALUES[i++] = C9;
        VALUES[i++] = C10;
        VALUES[i++] = C11;
        VALUES[i++] = C12;
        VALUES[i++] = C13;
        VALUES[i++] = C14;
        VALUES[i++] = M0;
        VALUES[i++] = M1;
        VALUES[i++] = M2;
        VALUES[i++] = M3;
        VALUES[i++] = M4;
        VALUES[i++] = M5;
        VALUES[i++] = M6;
        VALUES[i++] = M7;
        VALUES[i++] = M8;
        VALUES[i++] = M9;
        VALUES[i++] = M10;
        VALUES[i++] = M11;
        VALUES[i++] = M12;
        VALUES[i++] = M13;
        VALUES[i++] = M14;
        VALUES[i++] = M15;
        VALUES[i++] = M16;
        VALUES[i++] = M17;
        VALUES[i++] = M18;
        VALUES[i++] = M19;
        VALUES[i++] = M20;
        VALUES[i++] = M21;
    }

    /**
     * @param suit Suit.
     * @param rank Rank.
     * 
     * @return the card with the given parameters.
     */
    public static TarotCard findBySuitRank(final TarotSuit suit, final int rank)
    {
        TarotCard answer = null;

        for (final TarotCard card : values())
        {
            if ((card.getSuit() == suit) && (card.getRank() == rank))
            {
                answer = card;
                break;
            }
        }

        return answer;
    }

    /**
     * @return values.
     */
    public static TarotCard[] values()
    {
        return VALUES;
    }

    /** Delegate. */
    private final Token delegate;

    /** Rank. */
    private final int rank;

    /** Rank name. */
    private final String rankName;

    /** Symbol. */
    private final String symbol;

    /** Suit. */
    private final TarotSuit suit;

    /**
     * Construct this object.
     * 
     * @param rankName Rank name. (required)
     * @param rank Rank.
     */
    @SuppressWarnings("hiding")
    private TarotCard(final String rankName, final int rank)
    {
        this(null, rankName, rank);
    }

    /**
     * Construct this object.
     * 
     * @param suit Suit.
     * @param rankName Rank name. (required)
     * @param rank Rank.
     */
    @SuppressWarnings("hiding")
    private TarotCard(final TarotSuit suit, final String rankName, final int rank)
    {
        this(suit, rankName, rank, null, null);
    }

    /**
     * Construct this object.
     * 
     * @param suit Suit.
     * @param rankName Rank name. (required)
     * @param rank Rank.
     * @param team Team.
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    private TarotCard(final TarotSuit suit, final String rankName, final int rank, final Team team, final Agent agent)
    {
        if (StringUtils.isEmpty(rankName))
        {
            throw new IllegalArgumentException("rankName is null or empty");
        }

        this.suit = suit;
        this.rankName = (StringUtils.isEmpty(rankName) ? String.valueOf(rank) : rankName);
        this.rank = rank;
        this.symbol = createSymbol();

        final String description = createDescription();

        delegate = new DefaultToken(description, description, team, agent);
    }

    @Override
    public Agent getAgent()
    {
        return delegate.getAgent();
    }

    @Override
    public String getDescription()
    {
        return delegate.getDescription();
    }

    @Override
    public String getName()
    {
        return delegate.getName();
    }

    @Override
    public int getRank()
    {
        return rank;
    }

    @Override
    public String getRankName()
    {
        return rankName;
    }

    @Override
    public TarotSuit getSuit()
    {
        return suit;
    }

    @Override
    public String getSymbol()
    {
        return symbol;
    }

    @Override
    public Team getTeam()
    {
        return delegate.getTeam();
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public TarotCard withAgent(final Agent agent)
    {
        return new TarotCard(getSuit(), getRankName(), getRank(), getTeam(), agent);
    }

    /**
     * @return a description.
     */
    private String createDescription()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(rankName);

        if (suit != null)
        {
            sb.append(" of ");
            sb.append(suit.getName());
        }

        return sb.toString();
    }

    /**
     * @return a symbol.
     */
    private String createSymbol()
    {
        String answer;

        if (suit == null)
        {
            answer = rank + "M";
        }
        else if ((1 < rank) && (rank < 10))
        {
            answer = String.valueOf(rank) + getSuit().getSymbol();
        }
        else if (rank == 12)
        {
            answer = "N" + getSuit().getSymbol();
        }
        else
        {
            answer = getRankName().substring(0, 1) + getSuit().getSymbol();
        }

        return answer;
    }
}
