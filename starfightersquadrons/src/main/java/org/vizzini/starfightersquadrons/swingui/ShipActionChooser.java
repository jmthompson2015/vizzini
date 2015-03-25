package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JRadioButton;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.ScrollPaneConstants;
import javax.swing.SwingConstants;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverAction;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.ShipAction;
import org.vizzini.starfightersquadrons.ShipActionAction;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.UpgradeCard;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.starfightersquadrons.ShipAction.DamageCardShipAction;
import org.vizzini.starfightersquadrons.ShipAction.UpgradeCardShipAction;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to choose a ship action.
 */
public final class ShipActionChooser extends JPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Ship action key. */
    private static final String SHIP_ACTION_KEY = "shipAction";

    /** Vertical gap. */
    private static final int VGAP = 5;

    /**
     * @param parentComponent Parent component.
     * @param environment Environment.
     * @param attacker Attacker.
     * @param shipActions Ship actions.
     * 
     * @return a new ship action action, or null.
     */
    public static ShipActionAction showDialog(final JFrame parentComponent, final SSEnvironment environment,
            final SSToken attacker, final Set<ShipAction> shipActions)
    {
        InputValidator.validateNotNull("parentComponent", parentComponent);
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotEmpty("shipActions", shipActions);

        ShipActionAction answer = null;

        final String title = "Perform Action";
        final ShipActionChooser message = new ShipActionChooser(environment, attacker, shipActions);
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;
        final int y = 60;
        final PositionedDialog dialog = new PositionedDialog(parentComponent, title, message, optionType, messageType,
                y);
        dialog.setVisible(true);

        // Modal dialog blocks until done.

        final int result = dialog.getResult();
        dialog.dispose();

        ShipAction shipAction = null;

        if (result == JOptionPane.OK_OPTION)
        {
            shipAction = message.getShipAction();
        }

        if (shipAction != null)
        {
            final SSToken defender = message.getDefender();
            ManeuverAction maneuverAction = null;
            final Maneuver maneuver = message.getManeuver();

            if (maneuver != null)
            {
                final SSPosition attackerPosition = environment.getPositionFor(attacker);

                if (attackerPosition != null)
                {
                    final ShipBase shipBase = attacker.getShip().getShipBase();
                    maneuverAction = new ManeuverAction(environment, maneuver, attackerPosition, shipBase);
                }
            }

            answer = new ShipActionAction(environment, attacker, shipAction, defender, maneuverAction);
        }

        return answer;
    }

    /** Attacker. */
    private final SSToken attacker;

    /** Barrel roll maneuver chooser. */
    private ManeuverChooser barrelRollManeuverChooser;

    /** Boost maneuver chooser. */
    private ManeuverChooser boostManeuverChooser;

    /** Environment. */
    private final SSEnvironment environment;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Map of scroll pane to radio button. */
    private final Map<JScrollPane, JRadioButton> scrollPaneToRadioButton = new HashMap<JScrollPane, JRadioButton>();

    /** Selected ship action. */
    private ShipAction selectedShipAction;

    /** Target lock token chooser. */
    private TokenChooser targetLockTokenChooser;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param attacker Attacker.
     * @param shipActions Ship actions.
     */
    @SuppressWarnings("hiding")
    public ShipActionChooser(final SSEnvironment environment, final SSToken attacker,
            final Set<ShipAction> shipActions)
    {
        super();

        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("token", attacker);

        this.environment = environment;
        this.attacker = attacker;

        final JLabel tokenUI = new JLabel("Active Ship: " + attacker.getName());
        tokenUI.setHorizontalAlignment(SwingConstants.CENTER);

        setLayout(new GridLayout2(0, 1, HGAP, VGAP));
        add(tokenUI);
        add(createRadioButtonUI(shipActions));

        checkPanels();
    }

    /**
     * @return the defender
     */
    public SSToken getDefender()
    {
        SSToken answer = null;

        if (getShipAction() == ShipAction.TARGET_LOCK)
        {
            answer = targetLockTokenChooser.getSelectedToken();
        }

        return answer;
    }

    /**
     * @return the maneuver
     */
    public Maneuver getManeuver()
    {
        Maneuver answer = null;

        if (getShipAction() == ShipAction.BARREL_ROLL)
        {
            answer = barrelRollManeuverChooser.getSelectedManeuver();
        }
        else if (getShipAction() == ShipAction.BOOST)
        {
            answer = boostManeuverChooser.getSelectedManeuver();
        }

        return answer;
    }

    /**
     * @return the shipAction
     */
    public ShipAction getShipAction()
    {
        return selectedShipAction;
    }

    /**
     * Check the enabled state of the panels.
     */
    private void checkPanels()
    {
        if (barrelRollManeuverChooser != null)
        {
            final boolean isBarrelRollEnabled = selectedShipAction == ShipAction.BARREL_ROLL;
            barrelRollManeuverChooser.setEnabled(isBarrelRollEnabled);
        }

        if (boostManeuverChooser != null)
        {
            final boolean isBoostEnabled = selectedShipAction == ShipAction.BOOST;
            boostManeuverChooser.setEnabled(isBoostEnabled);
        }

        if (targetLockTokenChooser != null)
        {
            final boolean isTargetLockEnabled = selectedShipAction == ShipAction.TARGET_LOCK;
            targetLockTokenChooser.setEnabled(isTargetLockEnabled);
        }

        for (final Entry<JScrollPane, JRadioButton> entry : scrollPaneToRadioButton.entrySet())
        {
            final JScrollPane scrollPane = entry.getKey();
            final JRadioButton radioButton = entry.getValue();

            scrollPane.getHorizontalScrollBar().setEnabled(radioButton.isSelected());
            scrollPane.getVerticalScrollBar().setEnabled(radioButton.isSelected());
            scrollPane.getViewport().getView().setEnabled(radioButton.isSelected());
        }
    }

    /**
     * @param buttonGroup Button group.
     * 
     * @return a new panel.
     */
    private JPanel createBarrelRollPanel(final ButtonGroup buttonGroup)
    {
        final JPanel radioButtonPanel = createRadioButtonPanel(ShipAction.BARREL_ROLL, buttonGroup);

        final boolean isEditable = true;
        barrelRollManeuverChooser = new ManeuverChooser(null, ManeuverSet.BARREL_ROLL_MANEUVERS, isEditable);
        barrelRollManeuverChooser.setEnabled(false);

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
        answer.add(radioButtonPanel);
        answer.add(wrap(barrelRollManeuverChooser));

        return answer;
    }

    /**
     * @param buttonGroup Button group.
     * 
     * @return a new panel.
     */
    private JPanel createBoostPanel(final ButtonGroup buttonGroup)
    {
        final JPanel radioButtonPanel = createRadioButtonPanel(ShipAction.BOOST, buttonGroup);

        final boolean isEditable = true;
        boostManeuverChooser = new ManeuverChooser(null, ManeuverSet.BOOST_MANEUVERS, isEditable);
        boostManeuverChooser.setEnabled(false);

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
        answer.add(radioButtonPanel);
        answer.add(wrap(boostManeuverChooser));

        return answer;
    }

    /**
     * @param shipAction Ship action.
     * @param buttonGroup Button group.
     * 
     * @return a new panel.
     */
    private JPanel createDamageCardPanel(final DamageCardShipAction shipAction, final ButtonGroup buttonGroup)
    {
        final JPanel radioButtonPanel = createRadioButtonPanel(shipAction, buttonGroup);

        final DamageCard damage = shipAction.getDamage();
        final JTextArea textArea = createTextArea(damage.getActionDescription());
        final JScrollPane scrollPane = createScrollPane(textArea);
        final JRadioButton radioButton = (JRadioButton)radioButtonPanel.getComponent(0);
        scrollPaneToRadioButton.put(scrollPane, radioButton);

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
        answer.add(radioButtonPanel);
        answer.add(wrap("Action", scrollPane));

        return answer;
    }

    /**
     * @return a new action listener.
     */
    private ActionListener createDefaultActionListener()
    {
        final ActionListener answer = new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final JRadioButton source = (JRadioButton)event.getSource();
                selectedShipAction = (ShipAction)source.getClientProperty(SHIP_ACTION_KEY);
                LOGGER.debug("selectedShipAction = " + selectedShipAction);

                checkPanels();
            }
        };

        return answer;
    }

    /**
     * @param shipAction Ship action.
     * @param buttonGroup Button group.
     * 
     * @return a new panel.
     */
    private JPanel createRadioButtonPanel(final ShipAction shipAction, final ButtonGroup buttonGroup)
    {
        final String text = shipAction.toString();
        final JRadioButton radioButton = new JRadioButton(text);
        radioButton.putClientProperty(SHIP_ACTION_KEY, shipAction);
        buttonGroup.add(radioButton);
        radioButton.addActionListener(createDefaultActionListener());

        if (shipAction instanceof DamageCardShipAction)
        {
            final DamageCard damage = ((DamageCardShipAction)shipAction).getDamage();
            radioButton.setToolTipText(damage.getDescription());
        }

        final JLabel iconUI = new JLabel(imageUtils.createShipActionIcon(shipAction));

        final JPanel answer = new EnabledPanel(new BorderLayout(HGAP, VGAP));
        answer.add(radioButton, BorderLayout.CENTER);
        answer.add(iconUI, BorderLayout.EAST);

        return answer;
    }

    /**
     * @param shipActions Ship actions.
     * 
     * @return a new widget.
     */
    private JPanel createRadioButtonUI(final Set<ShipAction> shipActions)
    {
        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));

        final ButtonGroup buttonGroup = new ButtonGroup();

        final List<ShipAction> myShipActions = new ArrayList<ShipAction>(shipActions);
        Collections.sort(myShipActions);

        for (final ShipAction shipAction : myShipActions)
        {
            if (shipAction == ShipAction.BARREL_ROLL)
            {
                answer.add(createBarrelRollPanel(buttonGroup));
            }
            else if (shipAction == ShipAction.BOOST)
            {
                answer.add(createBoostPanel(buttonGroup));
            }
            else if (shipAction == ShipAction.TARGET_LOCK)
            {
                answer.add(createTargetLockPanel(buttonGroup));
            }
            else if (shipAction instanceof DamageCardShipAction)
            {
                answer.add(createDamageCardPanel((DamageCardShipAction)shipAction, buttonGroup));
            }
            else if (shipAction instanceof UpgradeCardShipAction)
            {
                answer.add(createUpgradeCardPanel((UpgradeCardShipAction)shipAction, buttonGroup));
            }
            else
            {
                answer.add(createRadioButtonPanel(shipAction, buttonGroup));
            }
        }

        return wrap(answer);
    }

    /**
     * @param textArea Text area.
     * 
     * @return a new scroll pane.
     */
    private JScrollPane createScrollPane(final JTextArea textArea)
    {
        final JScrollPane answer = new JScrollPane(textArea, ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);

        answer.setOpaque(false);
        answer.getViewport().setOpaque(false);

        return answer;
    }

    /**
     * @param buttonGroup Button group.
     * 
     * @return a new panel.
     */
    private JPanel createTargetLockPanel(final ButtonGroup buttonGroup)
    {
        final JPanel radioButtonPanel = createRadioButtonPanel(ShipAction.TARGET_LOCK, buttonGroup);

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
        answer.add(radioButtonPanel);

        final SSPosition attackerPosition = environment.getPositionFor(attacker);
        final List<SSToken> defenders1 = environment.getDefendersAtRange(attacker, attackerPosition, Range.ONE);
        final List<SSToken> defenders2 = environment.getDefendersAtRange(attacker, attackerPosition, Range.TWO);
        final List<SSToken> defenders3 = environment.getDefendersAtRange(attacker, attackerPosition, Range.THREE);

        if (!(defenders1.isEmpty() && defenders2.isEmpty() && defenders3.isEmpty()))
        {
            targetLockTokenChooser = new TokenChooser(null, defenders1, defenders2, defenders3);
            answer.add(wrap(targetLockTokenChooser));
            targetLockTokenChooser.setEnabled(false);
        }
        else
        {
            radioButtonPanel.setEnabled(false);
        }

        return answer;
    }

    /**
     * @param text Text.
     * 
     * @return a new text area.
     */
    private JTextArea createTextArea(final String text)
    {
        final int rows = 2;
        final int columns = 20;
        final JTextArea answer = new JTextArea(rows, columns);

        answer.setEditable(false);
        answer.setLineWrap(true);
        answer.setOpaque(false);
        answer.setText(text);
        answer.setWrapStyleWord(true);

        return answer;
    }

    /**
     * @param shipAction Ship action.
     * @param buttonGroup Button group.
     * 
     * @return a new panel.
     */
    private JPanel createUpgradeCardPanel(final UpgradeCardShipAction shipAction, final ButtonGroup buttonGroup)
    {
        final JPanel radioButtonPanel = createRadioButtonPanel(shipAction, buttonGroup);

        final UpgradeCard upgrade = shipAction.getUpgrade();
        final JTextArea textArea = createTextArea(upgrade.getDescription());
        final JScrollPane scrollPane = createScrollPane(textArea);
        final JRadioButton radioButton = (JRadioButton)radioButtonPanel.getComponent(0);
        scrollPaneToRadioButton.put(scrollPane, radioButton);

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));
        answer.add(radioButtonPanel);
        answer.add(wrap("Action", scrollPane));

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

    /**
     * @param title Title.
     * @param component Component.
     * 
     * @return a new titled panel which wraps the given component.
     */
    private JPanel wrap(final String title, final JComponent component)
    {
        final JPanel answer = new JPanel(new FlowLayout(FlowLayout.CENTER, 0, 0));

        answer.setBorder(BorderFactory.createTitledBorder(title));
        answer.add(component);

        return answer;
    }
}
