package org.vizzini.swingui.game.cardgame;

import java.awt.Image;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.imageio.ImageIO;

import org.vizzini.core.game.cardgame.Card;
import org.vizzini.core.game.cardgame.TarotCard;
import org.vizzini.core.game.cardgame.TarotSuit;

/**
 * Provides a map of tarot card to image.
 */
public final class TarotCardImageMap implements CardImageMap
{
    /** Major arcana names. */
    private static final List<String> MAJOR_ARCANA_NAMES = Arrays.asList(new String[] { "Fool", "Magician",
            "High Priestess", "Empress", "Emperor", "Hierophant", "Lovers", "Chariot", "Strength", "Hermit",
            "Wheel Fortune", "Justice", "Hanged Man", "Death", "Temperance", "Devil", "Tower", "Star", "Moon", "Sun",
            "Judgement", "World", });

    /** Map of rank to rank name. */
    private static final Map<Integer, String> RANK_TO_NAME = new HashMap<Integer, String>();

    static
    {
        RANK_TO_NAME.put(1, "ace");

        for (int rank = 2; rank < 10; rank++)
        {
            RANK_TO_NAME.put(rank, "0" + rank);
        }

        RANK_TO_NAME.put(10, "10");
        RANK_TO_NAME.put(11, "page");
        RANK_TO_NAME.put(12, "knight");
        RANK_TO_NAME.put(13, "queen");
        RANK_TO_NAME.put(14, "king");
    }

    /** Card to file map. */
    private final Map<TarotCard, File> cardToFile = new HashMap<TarotCard, File>();

    /** Card to image map. */
    private final Map<TarotCard, Image> cardToImage = new HashMap<TarotCard, Image>();

    /**
     * Construct this object.
     */
    public TarotCardImageMap()
    {
        final String base = "/game/cardgame/tarot/";

        for (final TarotSuit suit : TarotSuit.values())
        {
            final String suitName = suit.getName().toLowerCase();

            for (int rank = 1; rank <= 14; rank++)
            {
                final TarotCard card = TarotCard.findBySuitRank(suit, rank);
                final String rankName = RANK_TO_NAME.get(rank);
                final File file = new File(base + "rw" + rankName + suitName + ".jpg");
                cardToFile.put(card, file);
            }
        }

        for (int rank = 0; rank < MAJOR_ARCANA_NAMES.size(); rank++)
        {
            final TarotCard card = TarotCard.values()[56 + rank];
            String name = MAJOR_ARCANA_NAMES.get(rank).toLowerCase();
            name = name.replaceAll("[ ]", "");

            cardToFile.put(card, new File(base + "rw" + name + ".jpg"));
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

            cardToImage.put((TarotCard)card, answer);
        }

        return answer;
    }
}
