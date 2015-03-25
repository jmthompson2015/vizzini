package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.AttackDice;

/**
 * Provides tests for the <code>AttackDiceUI</code> class.
 */
public final class MyTestAttackDiceUI extends JFrame
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
                final MyTestAttackDiceUI app = new MyTestAttackDiceUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public MyTestAttackDiceUI()
    {
        final int size = 4;
        final AttackDice dice = new AttackDice(size);
        final AttackDiceUI diceUI = new AttackDiceUI(dice);

        final JPanel cardPanel = new JPanel();
        cardPanel.add(diceUI);

        final JPanel panel = new JPanel(new BorderLayout());
        panel.add(cardPanel, BorderLayout.CENTER);
        panel.add(createButtonPanel(dice), BorderLayout.SOUTH);

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(panel, BorderLayout.CENTER);
        pack();
        setLocationRelativeTo(null);
    }

    /**
     * @param dice Dice.
     *
     * @return a new panel.
     */
    private JPanel createButtonPanel(final AttackDice dice)
    {
        final JPanel answer = new JPanel(new GridLayout(1, 0));

        answer.add(createRerollButton(dice));

        return answer;
    }

    /**
     * @param dice Dice.
     *
     * @return a new button.
     */
    private JButton createRerollButton(final AttackDice dice)
    {
        final JButton answer = new JButton("Reroll");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                dice.rerollAll();
            }
        });

        return answer;
    }
}
