package org.vizzini.swingui.game.cardgame;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.GridLayout;
import java.awt.Image;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

import org.vizzini.core.game.cardgame.Card;
import org.vizzini.core.game.cardgame.PokerCard;
import org.vizzini.core.game.cardgame.PokerSuit;

/**
 * Provides a user interface for a poker deck.
 */
public final class PokerDeckUI extends JFrame
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        EventQueue.invokeLater(new Runnable()
        {
            @Override
            public void run()
            {
                final PokerDeckUI app = new PokerDeckUI();
                app.setVisible(true);
            }
        });
    }

    /** Background color. */
    private final Color background = new Color(0, 127, 0);

    /**
     * Construct this object.
     */
    public PokerDeckUI()
    {
        final JPanel appPanel = createCardPanel();

        setTitle("Vizzini Poker Deck");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(1000, 450);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);
    }

    /**
     * @return a new panel.
     */
    private JPanel createCardPanel()
    {
        final CardImageMap imageMap = new PokerCardImageMap();

        final JPanel answer = new JPanel(new GridLayout(4, 0));
        answer.setBackground(background);

        for (final PokerSuit suit : PokerSuit.values())
        {
            for (int rank = 1; rank <= 13; rank++)
            {
                final Card card = PokerCard.findBySuitRank(suit, rank);
                final Image image = imageMap.getImage(card);
                final CardUI cardUI = new CardUI(card, image);
                cardUI.setBackground(background);
                answer.add(cardUI);
            }
        }

        return answer;
    }
}
