package org.vizzini.swingui.game.cardgame;

import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.HashMap;
import java.util.Map;

import javax.imageio.ImageIO;

import org.vizzini.core.game.cardgame.Card;
import org.vizzini.core.game.cardgame.PokerCard;
import org.vizzini.core.game.cardgame.PokerSuit;

/**
 * Provides a map of poker card to image.
 */
public final class PokerCardImageMap implements CardImageMap
{
    /** Card to file map. */
    private final Map<PokerCard, File> cardToFile = new HashMap<PokerCard, File>();

    /** Card to image map. */
    private final Map<PokerCard, Image> cardToImage = new HashMap<PokerCard, Image>();

    /**
     * Construct this object.
     */
    public PokerCardImageMap()
    {
        final String base = "/game/cardgame/poker/";

        final PokerSuit[] suits = { PokerSuit.CLUBS, PokerSuit.SPADES, PokerSuit.HEARTS, PokerSuit.DIAMONDS, };

        for (int i = 1; i <= 4; i++)
        {
            final int suitNumber = (i - 1) % 4;
            final int rank = 1;
            final PokerSuit suit = suits[suitNumber];
            final PokerCard card = PokerCard.findBySuitRank(suit, rank);
            final File file = new File(base + i + ".png");
            cardToFile.put(card, file);
        }

        for (int i = 5; i <= 52; i++)
        {
            final int suitNumber = (i - 1) % 4;
            final int rank = 14 - ((i - 1) / 4);
            final PokerSuit suit = suits[suitNumber];
            final PokerCard card = PokerCard.findBySuitRank(suit, rank);
            final File file = new File(base + i + ".png");
            cardToFile.put(card, file);
        }
    }

    @Override
    public File getFile(final Card card)
    {
        final File answer = cardToFile.get(card);

        if (answer == null)
        {
            throw new RuntimeException("No file found for card " + card);
        }

        return answer;
    }

    @Override
    public Image getImage(final Card card)
    {
        Image answer = cardToImage.get(card);

        if (answer == null)
        {
            final File file = getFile(card);
            final InputStream inputStream = getClass().getResourceAsStream(file.getPath());

            try
            {
                answer = ImageIO.read(inputStream);
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }

            if (answer.getWidth(null) <= 0)
            {
                throw new RuntimeException("No image found for card " + card);
            }

            cardToImage.put((PokerCard)card, answer);
        }

        return answer;
    }
}
