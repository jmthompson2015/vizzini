package org.vizzini.swingui.game.cardgame;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.GridLayout;
import java.awt.Image;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JSplitPane;
import javax.swing.WindowConstants;

import org.vizzini.core.game.cardgame.Card;
import org.vizzini.core.game.cardgame.TarotCard;
import org.vizzini.core.game.cardgame.TarotSuit;
import org.vizzini.swingui.RealizedThread;

/**
 * Provides a user interface for a tarot deck.
 */
public final class TarotDeckUI extends JFrame
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
                final TarotDeckUI app = new TarotDeckUI();
                app.setVisible(true);
            }
        });
    }

    /** Background color. */
    private final Color background = new Color(127, 127, 191);

    /**
     * Construct this object.
     */
    public TarotDeckUI()
    {
        final JSplitPane appPanel = createCardPanel();

        setTitle("Vizzini Tarot Deck");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(1200, 1000);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);

        new RealizedThread(appPanel)
        {
            @Override
            public void realized()
            {
                appPanel.setDividerLocation(0.67);
            }
        }.start();
    }

    /**
     * @return a new panel.
     */
    private JSplitPane createCardPanel()
    {
        final JSplitPane answer = new JSplitPane(JSplitPane.VERTICAL_SPLIT);

        answer.add(createMinorPanel());
        answer.add(createMajorPanel());

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createMajorPanel()
    {
        final CardImageMap imageMap = new TarotCardImageMap();

        final JPanel answer = new JPanel(new GridLayout(2, 0));
        answer.setBackground(background);

        for (int rank = 0; rank < 22; rank++)
        {
            final Card card = TarotCard.findBySuitRank(null, rank);
            final Image image = imageMap.getImage(card);
            final CardUI cardUI = new CardUI(card, image);
            cardUI.setBackground(background);
            answer.add(cardUI);
        }

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createMinorPanel()
    {
        final CardImageMap imageMap = new TarotCardImageMap();

        final JPanel answer = new JPanel(new GridLayout(4, 0));
        answer.setBackground(background);

        for (final TarotSuit suit : TarotSuit.values())
        {
            for (int rank = 1; rank <= 14; rank++)
            {
                final Card card = TarotCard.findBySuitRank(suit, rank);
                final Image image = imageMap.getImage(card);
                final CardUI cardUI = new CardUI(card, image);
                cardUI.setBackground(background);
                answer.add(cardUI);
            }
        }

        return answer;
    }
}
