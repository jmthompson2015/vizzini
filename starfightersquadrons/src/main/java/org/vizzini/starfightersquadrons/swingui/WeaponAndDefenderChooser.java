package org.vizzini.starfightersquadrons.swingui;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JRadioButton;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.Weapon;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to choose a weapon and defender.
 */
public class WeaponAndDefenderChooser extends JPanel
{
    /**
     * Provides a data object to hold a weapon and a defender.
     */
    public static class WeaponAndDefender
    {
        /** Defender. */
        private final SSToken defender;

        /** Weapon. */
        private final Weapon weapon;

        /**
         * Construct this object.
         * 
         * @param weapon Weapon. (required)
         * @param defender Defender. (required)
         */
        @SuppressWarnings("hiding")
        public WeaponAndDefender(final Weapon weapon, final SSToken defender)
        {
            InputValidator.validateNotNull("weapon", weapon);
            InputValidator.validateNotNull("defender", defender);

            this.weapon = weapon;
            this.defender = defender;
        }

        /**
         * @return the defender
         */
        public SSToken getDefender()
        {
            return defender;
        }

        /**
         * @return the weapon
         */
        public Weapon getWeapon()
        {
            return weapon;
        }

        @Override
        public String toString()
        {
            return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
        }
    }

    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Weapon key. */
    private static final String WEAPON_KEY = "weapon";

    /**
     * @param parentComponent Parent component.
     * @param attacker Attacker.
     * @param environment Environment.
     * 
     * @return the selected weapon and defender, or null.
     */
    public static WeaponAndDefender showDialog(final JFrame parentComponent, final SSEnvironment environment,
            final SSToken attacker)
    {
        InputValidator.validateNotNull("parentComponent", parentComponent);
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);

        final Map<Weapon, Map<Range, List<SSToken>>> choices = createWeaponToRangeToTokensMap(environment, attacker);

        WeaponAndDefender answer = null;

        if (!choices.isEmpty())
        {
            answer = showDialog(parentComponent, attacker, choices);
        }

        return answer;
    }

    /**
     * @param parentComponent Parent component.
     * @param attacker Attacker.
     * @param choices Map of weapon to a map of range to tokens.
     * 
     * @return the selected weapon and defender, or null.
     */
    public static WeaponAndDefender showDialog(final JFrame parentComponent, final SSToken attacker,
            final Map<Weapon, Map<Range, List<SSToken>>> choices)
    {
        InputValidator.validateNotNull("parentComponent", parentComponent);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotEmpty("choices", choices);

        WeaponAndDefender selected = null;

        if (hasTargets(choices))
        {
            final String title = "Select Weapon And Defender";
            final WeaponAndDefenderChooser message = new WeaponAndDefenderChooser(attacker, choices);
            final int optionType = JOptionPane.OK_CANCEL_OPTION;
            final int messageType = JOptionPane.PLAIN_MESSAGE;
            final int y = 60;
            final PositionedDialog dialog = new PositionedDialog(parentComponent, title, message, optionType,
                    messageType, y);
            dialog.setVisible(true);

            // Modal dialog blocks until done.

            final int result = dialog.getResult();
            dialog.dispose();

            if (result == JOptionPane.OK_OPTION)
            {
                selected = message.getSelectedWeaponAndDefender();
            }
        }

        return selected;
    }

    /**
     * @param environment Environment.
     * @param attacker Attacker.
     * @param attackerPosition Attacker position.
     * @param weapon Weapon.
     * 
     * @return a new map of range to defenders.
     */
    private static Map<Range, List<SSToken>> createRangeToTokensMap(final SSEnvironment environment,
            final SSToken attacker, final SSPosition attackerPosition, final Weapon weapon)
    {
        final Map<Range, List<SSToken>> answer = new HashMap<Range, List<SSToken>>();

        for (final Range range : Range.values())
        {
            final List<SSToken> rangeDefenders = environment.getTargetableDefendersAtRange(attacker,
                    attackerPosition, weapon, range);
            answer.put(range, rangeDefenders);
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param attacker Attacker.
     * 
     * @return a new map of weapon to range to defenders.
     */
    private static Map<Weapon, Map<Range, List<SSToken>>> createWeaponToRangeToTokensMap(
            final SSEnvironment environment, final SSToken attacker)
    {
        final Map<Weapon, Map<Range, List<SSToken>>> answer = new LinkedHashMap<Weapon, Map<Range, List<SSToken>>>();

        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        if (attackerPosition != null)
        {
            final Weapon primaryWeapon = attacker.getPrimaryWeapon();
            answer.put(primaryWeapon, createRangeToTokensMap(environment, attacker, attackerPosition, primaryWeapon));

            for (final Weapon weapon : attacker.getSecondaryWeapons())
            {
                answer.put(weapon, createRangeToTokensMap(environment, attacker, attackerPosition, weapon));
            }
        }

        return answer;
    }

    /**
     * @param choices Map of weapon to a map of range to tokens.
     * 
     * @return true if there are any targets.
     */
    private static boolean hasTargets(final Map<Weapon, Map<Range, List<SSToken>>> choices)
    {
        boolean answer = false;

        for (final Entry<Weapon, Map<Range, List<SSToken>>> entry : choices.entrySet())
        {
            final Map<Range, List<SSToken>> rangeToTokens = entry.getValue();

            for (final Range range : Range.values())
            {
                if (!rangeToTokens.get(range).isEmpty())
                {
                    answer = true;
                    break;
                }
            }
        }

        return answer;
    }

    /** Selected weapon. */
    private Weapon selectedWeapon;

    /** Map of weapon to token chooser. */
    private final Map<Weapon, TokenChooser> weaponToTokenChooser = new HashMap<Weapon, TokenChooser>();

    /**
     * Construct this object.
     * 
     * @param attacker Attacker.
     * @param choices Map of weapon to a map of range to tokens.
     */
    public WeaponAndDefenderChooser(final SSToken attacker, final Map<Weapon, Map<Range, List<SSToken>>> choices)
    {
        super();

        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotEmpty("choices", choices);

        setLayout(new GridLayout2(0, 1, HGAP, VGAP));

        add(new JLabel("Attacker: " + attacker.getName()));

        final ButtonGroup buttonGroup = new ButtonGroup();

        for (final Weapon weapon : choices.keySet())
        {
            add(createWeaponPanel(weapon, choices.get(weapon), buttonGroup));
        }

        final JRadioButton primaryWeaponRadioButton = (JRadioButton)buttonGroup.getElements().nextElement();
        primaryWeaponRadioButton.setSelected(true);
        selectedWeapon = (Weapon)primaryWeaponRadioButton.getClientProperty(WEAPON_KEY);
        final TokenChooser tokenChooser = weaponToTokenChooser.get(selectedWeapon);
        tokenChooser.setEnabled(true);
    }

    /**
     * @return the selectedWeaponAndDefender
     */
    public WeaponAndDefender getSelectedWeaponAndDefender()
    {
        WeaponAndDefender answer = null;

        if (selectedWeapon != null)
        {
            final TokenChooser tokenChooser = weaponToTokenChooser.get(selectedWeapon);
            final SSToken selectedDefender = tokenChooser.getSelectedToken();

            if (selectedDefender != null)
            {
                answer = new WeaponAndDefender(selectedWeapon, selectedDefender);
            }
        }

        return answer;
    }

    /**
     * @param weapon Weapon.
     * @param rangeToDefenders Map of range to defenders.
     * @param buttonGroup Button group.
     * 
     * @return a new panel.
     */
    private JPanel createWeaponPanel(final Weapon weapon, final Map<Range, List<SSToken>> rangeToDefenders,
            final ButtonGroup buttonGroup)
    {
        InputValidator.validateNotEmpty("rangeToDefenders", rangeToDefenders);

        final JPanel answer = new JPanel();

        answer.setLayout(new GridLayout2(0, 1, HGAP, VGAP));
        answer.setBorder(BorderFactory.createEtchedBorder());

        final JRadioButton radioButton = new JRadioButton(weapon.getName());
        radioButton.putClientProperty(WEAPON_KEY, weapon);
        radioButton.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final JRadioButton source = (JRadioButton)event.getSource();
                selectedWeapon = (Weapon)source.getClientProperty(WEAPON_KEY);

                for (final Entry<Weapon, TokenChooser> entry : weaponToTokenChooser.entrySet())
                {
                    final boolean isEnabled = selectedWeapon == entry.getKey();
                    entry.getValue().setEnabled(isEnabled);
                }
            }
        });
        buttonGroup.add(radioButton);
        answer.add(radioButton);

        final List<SSToken> rangeOneDefenders = rangeToDefenders.get(Range.ONE);
        final List<SSToken> rangeTwoDefenders = rangeToDefenders.get(Range.TWO);
        final List<SSToken> rangeThreeDefenders = rangeToDefenders.get(Range.THREE);

        if (rangeOneDefenders.isEmpty() && rangeTwoDefenders.isEmpty() && rangeThreeDefenders.isEmpty())
        {
            radioButton.setEnabled(false);
        }
        else
        {
            final TokenChooser tokenChooser = new TokenChooser(null, rangeOneDefenders, rangeTwoDefenders,
                    rangeThreeDefenders);
            weaponToTokenChooser.put(weapon, tokenChooser);
            tokenChooser.setEnabled(false);
            answer.add(tokenChooser);
        }

        return answer;
    }
}
