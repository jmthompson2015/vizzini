package org.vizzini.starfightersquadrons.swingui;

import java.awt.GridLayout;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

import org.vizzini.starfightersquadrons.AttackDice;

/**
 * Provides a user interface for attack dice.
 */
public final class AttackDiceUI extends JPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Dice. */
    private final AttackDice dice;

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
    public AttackDiceUI(final AttackDice dice)
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
            final ImageIcon image = imageUtils.createAttackDieIcon(dice.getValue(i));
            final JLabel dieUI = new JLabel(image);
            panel.add(dieUI);
        }
    }
}
