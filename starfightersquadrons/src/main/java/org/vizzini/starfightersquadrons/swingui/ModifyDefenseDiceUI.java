package org.vizzini.starfightersquadrons.swingui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JRadioButton;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.DefenseDice;
import org.vizzini.starfightersquadrons.ModifyDefenseDiceAction;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.ModifyDefenseDiceAction.Modification;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to gather modify defense dice information.
 */
public final class ModifyDefenseDiceUI extends JPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Vertical gap. */
    private static final int VGAP = 5;

    /**
     * @param parentComponent Parent component.
     * @param environment Environment.
     * @param attacker Attacker.
     * @param attackDice Attack dice.
     * @param defender Defender.
     * @param defenseDice Defense dice.
     * 
     * @return a new modify defense dice action, or null.
     */
    public static ModifyDefenseDiceAction showDialog(final JFrame parentComponent, final SSEnvironment environment,
            final SSToken attacker, final AttackDice attackDice, final SSToken defender,
            final DefenseDice defenseDice)
    {
        ModifyDefenseDiceAction answer = null;

        final String title = "Select Modification";
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;
        final int y = 60;

        final ModifyDefenseDiceUI message = new ModifyDefenseDiceUI(attacker, attackDice, defender, defenseDice);
        final PositionedDialog dialog = new PositionedDialog(parentComponent, title, message, optionType, messageType,
                y);
        dialog.setVisible(true);

        // Modal dialog blocks until done.

        final int result = dialog.getResult();
        dialog.dispose();

        if (result == JOptionPane.OK_OPTION)
        {
            final Modification modification = message.getSelectedModification();

            if (modification != null)
            {
                answer = new ModifyDefenseDiceAction(environment, defender, defenseDice, modification);
            }
        }

        return answer;
    }

    /** Defender. */
    private final SSToken defender;

    /** Selected modification. */
    private Modification selectedModification;

    /**
     * Construct this object.
     * 
     * @param attacker Attacker.
     * @param attackDice Attack dice.
     * @param defender Defender.
     * @param defenseDice Defense dice.
     */
    @SuppressWarnings("hiding")
    public ModifyDefenseDiceUI(final SSToken attacker, final AttackDice attackDice, final SSToken defender,
            final DefenseDice defenseDice)
    {
        super();

        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);
        InputValidator.validateNotNull("defender", defender);
        InputValidator.validateNotNull("defenseDice", defenseDice);

        this.defender = defender;

        final AttackDiceUI attackDiceUI = new AttackDiceUI(attackDice);
        attackDiceUI.setBorder(BorderFactory.createTitledBorder("Attack Dice"));
        final DefenseDiceUI defenseDiceUI = new DefenseDiceUI(defenseDice);
        defenseDiceUI.setBorder(BorderFactory.createTitledBorder("Defense Dice"));

        setLayout(new GridLayout2(0, 1, HGAP, VGAP));
        add(new JLabel("Attacker: " + attacker.getName()));
        add(attackDiceUI);
        add(new JLabel("Defender: " + defender.getName()));
        add(defenseDiceUI);
        add(createButtonPanel());
    }

    /**
     * @return the selectedModification
     */
    public Modification getSelectedModification()
    {
        return selectedModification;
    }

    /**
     * @return a new panel.
     */
    private JPanel createButtonPanel()
    {
        final ButtonGroup buttonGroup = new ButtonGroup();

        final JRadioButton spendFocusUI = new JRadioButton("Spend focus");
        spendFocusUI.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                selectedModification = Modification.SPEND_FOCUS;
            }
        });

        final JRadioButton spendEvadeUI = new JRadioButton("Spend evade");
        spendEvadeUI.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                selectedModification = Modification.SPEND_EVADE;
            }
        });

        buttonGroup.add(spendFocusUI);
        buttonGroup.add(spendEvadeUI);

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
        answer.setBorder(BorderFactory.createTitledBorder("Modifications"));

        answer.add(spendFocusUI);
        answer.add(spendEvadeUI);

        if (defender.getFocusCount() == 0)
        {
            spendFocusUI.setEnabled(false);
        }

        if (defender.getEvadeCount() == 0)
        {
            spendEvadeUI.setEnabled(false);
        }

        return answer;
    }
}
