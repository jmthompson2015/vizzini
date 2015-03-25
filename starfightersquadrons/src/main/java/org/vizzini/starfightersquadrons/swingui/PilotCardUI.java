package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.Graphics;
import java.awt.GridLayout;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.BoxLayout;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextArea;
import javax.swing.SwingConstants;

import org.vizzini.starfightersquadrons.Constants;
import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.TargetLock;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.swingui.GridLayout2;
import org.vizzini.swingui.game.TokenUI;

/**
 * Provides a token user interface for Starfighter Squadrons.
 */
public final class PilotCardUI extends JPanel implements TokenUI
{
    /** Color. */
    private static final Color AGILITY_COLOR = new Color(127, 191, 127);

    /** Token name. */
    private static final String ATTACKER_TARGET_LOCK_TOKEN_NAME = "attackerTargetLockUI";

    /** Background color. */
    private static final Color BACKGROUND_COLOR = Color.DARK_GRAY;

    /** Background color. */
    private static final Color BACKGROUND_COLOR2 = new Color(223, 223, 223);

    /** Background color. */
    private static final Color BACKGROUND_COLOR3 = Color.WHITE;

    /** Token name. */
    private static final String CLOAK_TOKEN_NAME = "cloakUI";

    /** Token name. */
    private static final String DEFENDER_TARGET_LOCK_TOKEN_NAME = "defenderTargetLockUI";

    /** Token name. */
    private static final String EVADE_TOKEN_NAME = "evadeUI";

    /** Token name. */
    private static final String FOCUS_TOKEN_NAME = "focusUI";

    /** Horizontal gap. */
    private static final int HGAP = 2;

    /** Color. */
    private static final Color HULL_COLOR = Color.YELLOW;

    /** Token name. */
    private static final String ION_TOKEN_NAME = "ionUI";

    /** Color. */
    private static final Color PILOT_SKILL_COLOR = new Color(255, 127, 0);

    /** Color. */
    private static final Color PRIMARY_WEAPON_COLOR = Color.RED;

    /** Color. */
    private static final Color SHIELD_COLOR = new Color(127, 191, 255);

    /** Token name. */
    private static final String SHIELD_TOKEN_NAME = "shieldUI";

    /** Token name. */
    private static final String STRESS_TOKEN_NAME = "stressUI";

    /** Vertical gap. */
    private static final int VGAP = 2;

    /** Agility widget. */
    private JLabel agilityUI;

    /** Hull widget. */
    private JLabel hullUI;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Pilot skill widget. */
    private JLabel pilotSkillUI;

    /** Primary weapon widget. */
    private JLabel primaryWeaponUI;

    /** Shield widget. */
    private JLabel shieldUI;

    /** Token. */
    private final SSToken token;

    /** Tokens widget. */
    private final JPanel tokensPanel;

    /**
     * Construct this object.
     *
     * @param token Token.
     */
    @SuppressWarnings("hiding")
    public PilotCardUI(final SSToken token)
    {
        super();

        this.token = token;

        final JPanel namePanel = createNamePanel();
        final JPanel statsPanel = createStatsPanel();
        tokensPanel = createTokensPanel();
        final JPanel damagePanel = wrap(createDamagePanel());

        final Box box = javax.swing.Box.createVerticalBox();
        box.add(Box.createVerticalGlue());
        box.add(damagePanel);
        box.add(Box.createVerticalGlue());

        damagePanel.setBackground(BACKGROUND_COLOR);
        box.setBackground(BACKGROUND_COLOR);

        final JPanel tokensPanel2 = wrap(tokensPanel);
        tokensPanel2.setBackground(BACKGROUND_COLOR2);

        setBorder(BorderFactory.createLineBorder(BACKGROUND_COLOR, 2));
        setBackground(BACKGROUND_COLOR);
        setLayout(new BorderLayout(HGAP, VGAP));
        add(namePanel, BorderLayout.NORTH);
        add(statsPanel, BorderLayout.WEST);
        add(box, BorderLayout.EAST);
        add(tokensPanel2, BorderLayout.SOUTH);

        if (token.getShieldCount() > 0)
        {
            token.increaseShieldCount();
            token.decreaseShieldCount();
        }
    }

    @Override
    public SSToken getToken()
    {
        return token;
    }

    @Override
    public void paintComponent(final Graphics g)
    {
        // Update the ship state values.
        pilotSkillUI.setText(String.valueOf(token.getPilotSkillValue()));
        primaryWeaponUI.setText(String.valueOf(token.getPrimaryWeaponValue()));
        agilityUI.setText(String.valueOf(token.getAgilityValue()));
        hullUI.setText(String.valueOf(token.getHullValue()));
        shieldUI.setText(String.valueOf(token.getShieldValue()));

        super.paintComponent(g);
    }

    /**
     * @param value Value.
     * @param foreground Foreground color.
     * @param background Background color.
     *
     * @return a new, configured label.
     */
    private JLabel createCenteredLabel(final int value, final Color foreground, final Color background)
    {
        return createCenteredLabel(value, foreground, background, true);
    }

    /**
     * @param value Value.
     * @param foreground Foreground color.
     * @param background Background color.
     * @param isBold Flag indicating whether to make the font bold.
     *
     * @return a new, configured label.
     */
    private JLabel createCenteredLabel(final int value, final Color foreground, final Color background,
            final boolean isBold)
    {
        final String text = String.valueOf(value);

        return createCenteredLabel(text, foreground, background, isBold);
    }

    /**
     * @param text Text.
     * @param foreground Foreground color.
     * @param background Background color.
     * @param isBold Flag indicating whether to make the font bold.
     *
     * @return a new, configured label.
     */
    private JLabel createCenteredLabel(final String text, final Color foreground, final Color background,
            final boolean isBold)
    {
        final JLabel answer = createLabel(text);

        answer.setHorizontalAlignment(SwingConstants.CENTER);
        answer.setVerticalAlignment(SwingConstants.CENTER);
        answer.setVerticalTextPosition(SwingConstants.CENTER);
        answer.setOpaque(true);
        answer.setForeground(foreground);
        answer.setBackground(background);

        if (isBold)
        {
            final Font font = answer.getFont();
            answer.setFont(new Font(font.getName(), Font.BOLD, font.getSize()));
        }

        return answer;
    }

    /**
     * @param criticalDamages Critical damages.
     *
     * @return a string representation of the given parameter.
     */
    private String createCriticalDamageString(final List<DamageCard> criticalDamages)
    {
        final StringBuilder sb = new StringBuilder();
        final int size = criticalDamages.size();

        for (int i = 0; i < size; i++)
        {
            final DamageCard damage = criticalDamages.get(i);
            sb.append(damage.getName());

            if (i < (size - 1))
            {
                sb.append("\n");
            }
        }

        return sb.toString();
    }

    /**
     * @return a new panel.
     */
    private JPanel createDamagePanel()
    {
        final JLabel damageLabel = new JLabel(imageUtils.createDamageIcon());
        damageLabel.setToolTipText("Damage");
        final JLabel damageUI = new JLabel();
        damageUI.setToolTipText("Damage");
        final JLabel criticalLabel = new JLabel(imageUtils.createCriticalDamageIcon());
        criticalLabel.setToolTipText("Critical Damage");
        final JLabel criticalDamageUI = new JLabel();
        criticalDamageUI.setToolTipText("Critical Damage");
        final JTextArea criticalDamagesArea = new JTextArea();
        criticalDamagesArea.setRows(0);
        criticalDamagesArea.setEditable(false);

        token.addDamageListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                @SuppressWarnings("unchecked")
                final List<DamageCard> damages = (List<DamageCard>)event.getNewValue();
                damageUI.setText(String.valueOf(damages.size()));
            }
        });

        token.addCriticalDamageListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                @SuppressWarnings("unchecked")
                final List<DamageCard> criticalDamages = (List<DamageCard>)event.getNewValue();
                final int size = criticalDamages.size();
                criticalDamageUI.setText(String.valueOf(size));
                criticalDamagesArea.setRows(size);
                criticalDamagesArea.setText(createCriticalDamageString(criticalDamages));
            }
        });

        final JPanel panel = new JPanel(new GridLayout2(2, 0, HGAP, VGAP));

        panel.setBackground(BACKGROUND_COLOR2);
        panel.setBorder(BorderFactory.createEmptyBorder(HGAP, VGAP, HGAP, VGAP));
        panel.add(damageLabel);
        panel.add(damageUI);
        panel.add(criticalLabel);
        panel.add(criticalDamageUI);

        final JPanel answer = new JPanel(new BorderLayout(HGAP, VGAP));

        answer.add(panel, BorderLayout.CENTER);
        answer.add(criticalDamagesArea, BorderLayout.SOUTH);

        damageUI.setText(String.valueOf(token.getDamageCount()));
        criticalDamageUI.setText(String.valueOf(token.getCriticalDamageCount()));

        return answer;
    }

    /**
     * @param image Image.
     *
     * @return a new label.
     */
    private JLabel createLabel(final ImageIcon image)
    {
        final JLabel answer = new JLabel(image);

        answer.setToolTipText(image.getDescription());

        return answer;
    }

    /**
     * @param text Text.
     *
     * @return a new label.
     */
    private JLabel createLabel(final String text)
    {
        return new JLabel(text);
    }

    /**
     * @return a new panel.
     */
    private JPanel createNamePanel()
    {
        final Pilot pilot = token.getPilot();
        final Ship ship = pilot.getShip();

        pilotSkillUI = createCenteredLabel(token.getPilotSkillValue(), PILOT_SKILL_COLOR, BACKGROUND_COLOR);
        pilotSkillUI.setToolTipText("Pilot Skill");
        final Font font = pilotSkillUI.getFont();
        pilotSkillUI.setFont(new Font(font.getName(), Font.BOLD, font.getSize() + 2));

        String myPilotName = token.getName();
        if (pilot.isUnique())
        {
            // Insert a bullet between the ID and the name.
            myPilotName = token.getId() + " " + Constants.UNICODE_BULLET + pilot.getName();
        }
        final JLabel pilotName = createCenteredLabel(myPilotName, Color.BLACK, BACKGROUND_COLOR3, false);
        pilotName.setToolTipText("Pilot Name");
        final JLabel shipName = createCenteredLabel(ship.getName(), Color.BLACK, BACKGROUND_COLOR3, false);
        shipName.setToolTipText("Ship Name");

        final ImageIcon teamIcon = imageUtils.createTeamIcon24(token.getTeam());
        final JLabel teamLabel = new JLabel(teamIcon);
        teamLabel.setOpaque(true);
        teamLabel.setBackground(BACKGROUND_COLOR3);
        teamLabel.setToolTipText(token.getTeam().getName() + " Faction");
        final int gap = 2;
        teamLabel.setBorder(BorderFactory.createEmptyBorder(gap, gap, gap, gap));

        final JPanel center = new JPanel(new GridLayout(2, 0, HGAP, VGAP));
        center.setBackground(BACKGROUND_COLOR);
        center.add(pilotName);
        center.add(shipName);

        final JPanel answer = new JPanel(new BorderLayout(HGAP, VGAP));

        answer.setBackground(BACKGROUND_COLOR);

        answer.add(pilotSkillUI, BorderLayout.WEST);
        answer.add(center, BorderLayout.CENTER);
        answer.add(teamLabel, BorderLayout.EAST);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createStatsPanel()
    {
        final JLabel weaponIcon = createLabel(imageUtils.createWeaponIcon());
        primaryWeaponUI = createCenteredLabel(token.getPrimaryWeaponValue(), PRIMARY_WEAPON_COLOR, BACKGROUND_COLOR);
        primaryWeaponUI.setToolTipText("Primary Weapon");

        final JLabel agilityIcon = createLabel(imageUtils.createAgilityIcon());
        agilityUI = createCenteredLabel(token.getAgilityValue(), AGILITY_COLOR, BACKGROUND_COLOR);
        agilityUI.setToolTipText("Agility");

        final JLabel hullIcon = createLabel(imageUtils.createHullIcon());
        hullUI = createCenteredLabel(token.getHullValue(), HULL_COLOR, BACKGROUND_COLOR);
        hullUI.setToolTipText("Hull");

        final JLabel shieldIcon = createLabel(imageUtils.createShieldIcon());
        shieldUI = createCenteredLabel(token.getShieldValue(), SHIELD_COLOR, BACKGROUND_COLOR);
        shieldUI.setToolTipText("Shield");

        final JPanel answer = new JPanel(new GridLayout2(4, 2, HGAP, VGAP));

        answer.setBackground(BACKGROUND_COLOR);
        answer.add(weaponIcon);
        answer.add(primaryWeaponUI);
        answer.add(agilityIcon);
        answer.add(agilityUI);
        answer.add(hullIcon);
        answer.add(hullUI);
        answer.add(shieldIcon);
        answer.add(shieldUI);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createTokensPanel()
    {
        token.addCloakListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final int oldValue = (Integer)event.getOldValue();
                final int newValue = (Integer)event.getNewValue();

                if ((oldValue == 0) && (newValue > 0))
                {
                    final JLabel tokenUI = createLabel(imageUtils.createCloakToken());
                    tokenUI.setName(CLOAK_TOKEN_NAME);
                    tokensPanel.add(tokenUI);
                }
                else if ((oldValue > 0) && (newValue == 0))
                {
                    final Component tokenUI = findTokenComponentByName(CLOAK_TOKEN_NAME);
                    tokensPanel.remove(tokenUI);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        token.addEvadeListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final int oldValue = (Integer)event.getOldValue();
                final int newValue = (Integer)event.getNewValue();

                if ((oldValue == 0) && (newValue > 0))
                {
                    final JLabel tokenUI = createLabel(imageUtils.createEvadeToken());
                    tokenUI.setName(EVADE_TOKEN_NAME);
                    tokensPanel.add(tokenUI);
                }
                else if ((oldValue > 0) && (newValue == 0))
                {
                    final Component tokenUI = findTokenComponentByName(EVADE_TOKEN_NAME);
                    tokensPanel.remove(tokenUI);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        token.addFocusListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final int oldValue = (Integer)event.getOldValue();
                final int newValue = (Integer)event.getNewValue();

                if ((oldValue == 0) && (newValue > 0))
                {
                    final JLabel tokenUI = createLabel(imageUtils.createFocusToken());
                    tokenUI.setName(FOCUS_TOKEN_NAME);
                    tokensPanel.add(tokenUI);
                }
                else if ((oldValue > 0) && (newValue == 0))
                {
                    final Component tokenUI = findTokenComponentByName(FOCUS_TOKEN_NAME);
                    tokensPanel.remove(tokenUI);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        token.addIonListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final int oldValue = (Integer)event.getOldValue();
                final int newValue = (Integer)event.getNewValue();

                if ((oldValue == 0) && (newValue > 0))
                {
                    final JLabel tokenUI = createLabel(imageUtils.createIonToken());
                    tokenUI.setName(ION_TOKEN_NAME);
                    tokensPanel.add(tokenUI);
                }
                else if ((oldValue > 0) && (newValue == 0))
                {
                    final Component tokenUI = findTokenComponentByName(ION_TOKEN_NAME);
                    tokensPanel.remove(tokenUI);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        token.addShieldListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final int oldValue = (Integer)event.getOldValue();
                final int newValue = (Integer)event.getNewValue();

                if ((oldValue > 0) && (newValue == 0))
                {
                    final Component tokenUI = findTokenComponentByName(SHIELD_TOKEN_NAME);
                    tokensPanel.remove(tokenUI);
                }
                else
                {
                    // System.out.println("oldValue = " + oldValue + " newValue = " + newValue);
                    CountImageUI tokenUI = (CountImageUI)findTokenComponentByName(SHIELD_TOKEN_NAME);

                    if (tokenUI == null)
                    {
                        final ImageIcon image = imageUtils.createShieldToken();
                        tokenUI = new CountImageUI(newValue, image);
                        tokenUI.setName(SHIELD_TOKEN_NAME);
                        tokenUI.setAlignmentX(CENTER_ALIGNMENT);
                        tokenUI.setAlignmentY(CENTER_ALIGNMENT);
                        tokensPanel.add(tokenUI);
                    }

                    tokenUI.setCount(newValue);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        token.addStressListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final int oldValue = (Integer)event.getOldValue();
                final int newValue = (Integer)event.getNewValue();

                if ((oldValue == 0) && (newValue > 0))
                {
                    final JLabel tokenUI = createLabel(imageUtils.createStressToken());
                    tokenUI.setName(STRESS_TOKEN_NAME);
                    tokensPanel.add(tokenUI);
                }
                else if ((oldValue > 0) && (newValue == 0))
                {
                    final Component tokenUI = findTokenComponentByName(STRESS_TOKEN_NAME);
                    tokensPanel.remove(tokenUI);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        token.addAttackerTargetLockListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final TargetLock oldValue = (TargetLock)event.getOldValue();
                final TargetLock newValue = (TargetLock)event.getNewValue();

                if (oldValue != null)
                {
                    final Component tokenUI = findTokenComponentByName(ATTACKER_TARGET_LOCK_TOKEN_NAME);
                    tokensPanel.remove(tokenUI);
                }

                if (newValue != null)
                {
                    final TextImageUI tokenUI = new TextImageUI(newValue.getName(), imageUtils
                            .createAttackerTargetLockToken());
                    tokenUI.setName(ATTACKER_TARGET_LOCK_TOKEN_NAME);
                    final String toolTip = "To " + newValue.getDefender().getName();
                    tokenUI.setToolTipText(toolTip);
                    tokenUI.setAlignmentX(CENTER_ALIGNMENT);
                    tokenUI.setAlignmentY(CENTER_ALIGNMENT);
                    tokensPanel.add(tokenUI);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        token.addDefenderTargetLockListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final TargetLock oldValue = (TargetLock)event.getOldValue();
                final TargetLock newValue = (TargetLock)event.getNewValue();

                if ((oldValue == null) && (newValue != null))
                {
                    // Add.
                    final TextImageUI tokenUI = new TextImageUI(newValue.getName(), imageUtils
                            .createDefenderTargetLockToken());
                    tokenUI.setName(DEFENDER_TARGET_LOCK_TOKEN_NAME + "_" + newValue.getName());
                    final String toolTip = "From " + newValue.getAttacker().getName();
                    tokenUI.setToolTipText(toolTip);
                    tokenUI.setAlignmentX(CENTER_ALIGNMENT);
                    tokenUI.setAlignmentY(CENTER_ALIGNMENT);
                    tokensPanel.add(tokenUI);
                }
                else if ((oldValue != null) && (newValue == null))
                {
                    // Remove.
                    final Component tokenUI = findTokenComponentByName(DEFENDER_TARGET_LOCK_TOKEN_NAME + "_"
                            + oldValue.getName());
                    tokensPanel.remove(tokenUI);
                }

                tokensPanel.revalidate();
                tokensPanel.repaint();
            }
        });

        final JPanel answer = new JPanel();

        answer.setBackground(BACKGROUND_COLOR2);
        answer.setLayout(new BoxLayout(answer, BoxLayout.X_AXIS));
        answer.setAlignmentX(CENTER_ALIGNMENT);

        return answer;
    }

    /**
     * @param name Component name.
     *
     * @return component with the given name.
     */
    private Component findTokenComponentByName(final String name)
    {
        Component answer = null;

        if (tokensPanel != null)
        {
            final Component[] components = tokensPanel.getComponents();

            if (components != null)
            {
                for (final Component component : components)
                {
                    if (component.getName().equals(name))
                    {
                        answer = component;
                    }
                }
            }
        }

        return answer;
    }

    /**
     * @param component Component.
     *
     * @return a new panel which wraps the given component.
     */
    private JPanel wrap(final JComponent component)
    {
        final JPanel answer = new JPanel(new FlowLayout(FlowLayout.CENTER, 0, 0));

        answer.add(component);

        return answer;
    }
}
