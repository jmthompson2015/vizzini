package org.vizzini.swingui.game.cardgame.gin;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.GridLayout;
import java.awt.Image;
import java.awt.RenderingHints;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.net.URL;
import java.util.List;

import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JPanel;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.cardgame.PokerCard;
import org.vizzini.example.cardgame.gin.GinEnvironment;
import org.vizzini.example.cardgame.gin.HandAnalyzer;
import org.vizzini.swingui.GridLayout2;
import org.vizzini.swingui.game.cardgame.CardUI;
import org.vizzini.swingui.game.cardgame.PokerCardImageMap;

/**
 * Provides an environment user interface for reversi. The grid color is the panel foreground. The board color is the
 * panel background.
 */
public final class GinEnvironmentUI extends JPanel
{
    /** Gap. */
    private static final int GAP = 5;

    /** Discard pile widget. */
    private JPanel discardPileUI;

    /** Environment. */
    private final GinEnvironment environment;

    /** First hand widget. */
    private JPanel firstHandUI;

    /** Poker card image map. */
    private final PokerCardImageMap imageMap = new PokerCardImageMap();

    /** Second hand widget. */
    private JPanel secondHandUI;

    /** Stock pile widget. */
    private final CardUI stockPileUI = createCardBackUI();

    /** Table color. */
    private final Color tableColor = new Color(0, 128, 0);

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     */
    @SuppressWarnings("hiding")
    public GinEnvironmentUI(final GinEnvironment environment)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        this.environment = environment;

        setBackground(tableColor);

        add(createMainPanel());

        stockPileUI.setName("stockPileUI");
        discardPileUI.setName("discardPileUI");

        environment.addDoActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                updateCards();
            }
        });

        updateCards();
    }

    @Override
    public synchronized void addMouseListener(final MouseListener listener)
    {
        super.addMouseListener(listener);

        stockPileUI.addMouseListener(listener);
        discardPileUI.addMouseListener(listener);
    }

    /**
     * @return the discardPileUI
     */
    public JPanel getDiscardPileUI()
    {
        return discardPileUI;
    }

    /**
     * @return environment
     */
    public GinEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @return the stockPileUI
     */
    public CardUI getStockPileUI()
    {
        return stockPileUI;
    }

    @Override
    public void paintComponent(final Graphics g)
    {
        super.paintComponent(g);

        final Graphics2D g2d = (Graphics2D)g;
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
    }

    @Override
    public synchronized void removeMouseListener(final MouseListener listener)
    {
        stockPileUI.removeMouseListener(listener);
        discardPileUI.removeMouseListener(listener);

        super.removeMouseListener(listener);
    }

    /**
     * @param imageLocation Image location.
     * @param altText Alternate text.
     * 
     * @return a new image icon.
     */
    ImageIcon createImageIcon(final String imageLocation, final String altText)
    {
        ImageIcon answer = null;

        final URL imageUrl = getClass().getClassLoader().getResource(imageLocation);

        if (imageUrl != null)
        {
            answer = new ImageIcon(imageUrl, altText);
        }

        return answer;
    }

    /**
     * Update the cards.
     */
    void updateCards()
    {
        updateHand(firstHandUI, environment.getFirstAgent());

        final PokerCard discard = environment.peekDiscardPile();
        discardPileUI.removeAll();

        if (discard != null)
        {
            final CardUI cardUI = createCardUI(discard);
            cardUI.setName("discardPileUI");
            discardPileUI.add(cardUI);
        }

        updateHand(secondHandUI, environment.getSecondAgent());

        validate();
        repaint();
    }

    /**
     * @return a new card back widget.
     */
    private CardUI createCardBackUI()
    {
        final ImageIcon imageIcon = createImageIcon("game/cardgame/vizzini.png", "Vizzini.org");
        final CardUI answer = new CardUI(PokerCard.C1, imageIcon.getImage());
        answer.setBackground(Color.RED);
        answer.setPreferredSize(new Dimension(72, 96));

        return answer;
    }

    /**
     * @param card Card.
     * 
     * @return a new card widget.
     */
    private CardUI createCardUI(final PokerCard card)
    {
        CardUI answer = null;

        if (card != null)
        {
            final Image image = imageMap.getImage(card);

            if (image != null)
            {
                answer = new CardUI(card, image);
                answer.setPreferredSize(new Dimension(72, 96));
                answer.putClientProperty("card", card);
                answer.setName(card.getName());

                for (final MouseListener listener : getMouseListeners())
                {
                    answer.addMouseListener(listener);
                }
            }
        }

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createFirstHandPanel()
    {
        firstHandUI = new JPanel(new GridLayout(1, 0, GAP, GAP));

        firstHandUI.setBackground(tableColor);

        for (int i = 0; i < 10; i++)
        {
            firstHandUI.add(createCardBackUI());
        }

        return wrap(firstHandUI);
    }

    /**
     * @return a new panel.
     */
    private JPanel createMainPanel()
    {
        final JPanel firstPanel = createFirstHandPanel();
        final JPanel pilePanel = createPilePanel();
        final JPanel secondPanel = createSecondHandPanel();

        final JPanel answer = new JPanel(new GridLayout2(3, 0, GAP, GAP));

        answer.setBackground(tableColor);

        answer.add(firstPanel);
        answer.add(pilePanel);
        answer.add(secondPanel);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createPilePanel()
    {
        discardPileUI = wrap(createCardUI(PokerCard.C1));

        final JPanel panel = new JPanel(new GridLayout(1, 0, GAP, GAP));

        panel.setBackground(tableColor);

        panel.add(stockPileUI);
        panel.add(discardPileUI);

        return wrap(panel);
    }

    /**
     * @return a new panel.
     */
    private JPanel createSecondHandPanel()
    {
        secondHandUI = new JPanel(new GridLayout(1, 0, GAP, GAP));

        secondHandUI.setBackground(tableColor);

        for (int i = 0; i < 10; i++)
        {
            secondHandUI.add(createCardBackUI());
        }

        return wrap(secondHandUI);
    }

    /**
     * @param subject Subject component.
     */
    private void removeMouseListeners(final JComponent subject)
    {
        for (final Component component : subject.getComponents())
        {
            for (final MouseListener listener : getMouseListeners())
            {
                component.removeMouseListener(listener);
            }
        }
    }

    /**
     * @param handUI Hand widget.
     * @param agent Agent.
     */
    private void updateHand(final JPanel handUI, final Agent agent)
    {
        removeMouseListeners(handUI);
        handUI.removeAll();
        List<PokerCard> hand = environment.getHandFor(agent);

        if (hand != null)
        {
            final boolean isAgentMouse = agent instanceof MouseAgent;

            if (isAgentMouse)
            {
                final HandAnalyzer analyzer = new HandAnalyzer(hand);
                hand = analyzer.getSortedHand();
            }

            for (final PokerCard card : hand)
            {
                if (isAgentMouse)
                {
                    handUI.add(createCardUI(card));
                }
                else
                {
                    handUI.add(createCardBackUI());
                }
            }
        }
    }

    /**
     * @param panel Panel.
     * 
     * @return the given parameter wrapped in a new panel.
     */
    private JPanel wrap(final JPanel panel)
    {
        final JPanel answer = new JPanel();

        answer.setBackground(tableColor);

        answer.add(panel);

        return answer;
    }
}
