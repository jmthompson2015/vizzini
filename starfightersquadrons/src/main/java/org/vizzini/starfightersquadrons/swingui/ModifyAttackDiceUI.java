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
import org.vizzini.starfightersquadrons.ModifyAttackDiceAction;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.ModifyAttackDiceAction.Modification;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to gather modify attack dice information.
 */
public final class ModifyAttackDiceUI extends JPanel
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
     * 
     * @return a new modify attack dice action, or null.
     */
    public static ModifyAttackDiceAction showDialog(final JFrame parentComponent, final SSEnvironment environment,
            final SSToken attacker, final AttackDice attackDice)
    {
        InputValidator.validateNotNull("parentComponent", parentComponent);
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);

        ModifyAttackDiceAction answer = null;

        final String title = "Select Modification";
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;
        final int y = 60;

        final ModifyAttackDiceUI message = new ModifyAttackDiceUI(attacker, attackDice);
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
                answer = new ModifyAttackDiceAction(environment, attacker, attackDice, modification);
            }
        }

        return answer;
    }

    /** Attacker. */
    private final SSToken attacker;

    /** Selected modification. */
    private Modification selectedModification;

    /**
     * Construct this object.
     * 
     * @param attacker Attacker.
     * @param attackDice Attack dice.
     */
    @SuppressWarnings("hiding")
    public ModifyAttackDiceUI(final SSToken attacker, final AttackDice attackDice)
    {
        super();

        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("attackDice", attackDice);

        this.attacker = attacker;

        final AttackDiceUI attackDiceUI = new AttackDiceUI(attackDice);
        attackDiceUI.setBorder(BorderFactory.createTitledBorder("Attack Dice"));

        setLayout(new GridLayout2(0, 1, HGAP, VGAP));
        add(new JLabel("Attacker: " + attacker.getName()));
        add(attackDiceUI);
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

        final JRadioButton spendTargetLockUI = new JRadioButton("Spend target lock");
        spendTargetLockUI.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                selectedModification = Modification.SPEND_TARGET_LOCK;
            }
        });

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

        buttonGroup.add(spendTargetLockUI);
        buttonGroup.add(spendFocusUI);

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
        answer.setBorder(BorderFactory.createTitledBorder("Modifications"));

        answer.add(spendTargetLockUI);
        answer.add(spendFocusUI);

        if (attacker.getAttackerTargetLock() == null)
        {
            spendTargetLockUI.setEnabled(false);
        }

        if (attacker.getFocusCount() == 0)
        {
            spendFocusUI.setEnabled(false);
        }

        return answer;
    }
}
