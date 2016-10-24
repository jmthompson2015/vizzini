package org.vizzini.starfightersquadrons.swingui;

import java.awt.GridLayout;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

import org.vizzini.starfightersquadrons.DefenseDice;

/**
 * Provides a user interface for defense dice.
 */
public final class DefenseDiceUI extends JPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Dice. */
    private final DefenseDice dice;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Dice holder widget. */
    final JPanel panel = new JPanel(new GridLayout(1, 0, HGAP, VGAP));

    /**
     * Construct this object.
     * 
     * @param dice Dice.
     */
    @SuppressWarnings("hiding")
    public DefenseDiceUI(final DefenseDice dice)
    {
        super();

        this.dice = dice;

        createDice();
        add(panel);

        dice.addValuesListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                panel.removeAll();
                createDice();
                revalidate();
                repaint();
            }
        });
    }

    /**
     * Create the dice displays.
     */
    void createDice()
    {
        final int size = dice.size();

        for (int i = 0; i < size; i++)
        {
            final ImageIcon image = imageUtils.createDefenseDieIcon(dice.getValue(i));
            final JLabel dieUI = new JLabel(image);
            panel.add(dieUI);
        }
    }
}
