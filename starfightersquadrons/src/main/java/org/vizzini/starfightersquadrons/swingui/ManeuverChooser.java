package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Component;
import java.awt.FlowLayout;
import java.awt.Font;
import java.awt.GridLayout;
import java.util.Enumeration;

import javax.swing.AbstractButton;
import javax.swing.BorderFactory;
import javax.swing.ButtonGroup;
import javax.swing.ImageIcon;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JToggleButton;
import javax.swing.SwingConstants;
import javax.swing.border.BevelBorder;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.Maneuver.BarrelRollManeuver;
import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;

/**
 * Provides a display panel of a ship's maneuvers.
 */
public final class ManeuverChooser extends EnabledPanel
{
    /** Silver color. */
    private static final Color DARK_SILVER = new Color(175, 175, 175);

    /** Horizontal gap. */
    private static final int HGAP = 2;

    /** Silver color. */
    private static final Color LIGHT_SILVER = new Color(207, 207, 207);

    /** Maneuver key. */
    private static final String MANEUVER_KEY = "manuever";

    /** Silver color. */
    private static final Color SILVER = new Color(191, 191, 191);

    /** Vertical gap. */
    private static final int VGAP = 2;

    /**
     * @param parentComponent Parent component.
     * @param shipName Ship name.
     * @param maneuverSet Maneuver set.
     * @param isEditable Flag indicating if this is editable.
     * 
     * @return the selected maneuver, or null.
     */
    public static Maneuver showDialog(final Component parentComponent, final String shipName,
            final ManeuverSet maneuverSet, final boolean isEditable)
    {
        final ManeuverChooser message = new ManeuverChooser(shipName, maneuverSet, isEditable);
        final String title = "Select Maneuver";
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;

        final int result = JOptionPane.showConfirmDialog(parentComponent, message, title, optionType, messageType);

        // Modal dialog blocks until done.

        Maneuver selected = null;

        if (result == JOptionPane.OK_OPTION)
        {
            selected = message.getSelectedManeuver();
        }

        return selected;
    }

    /** Button group. */
    private final ButtonGroup buttonGroup = new ButtonGroup();

    /** Font. */
    private Font font;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Flag indicating if this is editable. */
    private final boolean isEditable;

    /**
     * Construct this object.
     * 
     * @param shipName Ship name. (optional)
     * @param maneuverSet Maneuver set.
     * @param isEditable Flag indicating if this is editable.
     */
    @SuppressWarnings("hiding")
    public ManeuverChooser(final String shipName, final ManeuverSet maneuverSet, final boolean isEditable)
    {
        super();

        InputValidator.validateNotNull("maneuverSet", maneuverSet);

        this.isEditable = isEditable;

        final JPanel maneuverPanel = createManeuverPanel(maneuverSet);

        setLayout(new BorderLayout());
        if (StringUtils.isNotEmpty(shipName))
        {
            final JLabel title = new JLabel(shipName);
            add(wrap(title), BorderLayout.NORTH);
        }
        add(maneuverPanel, BorderLayout.CENTER);
    }

    /**
     * @return the selected maneuver.
     */
    public Maneuver getSelectedManeuver()
    {
        Maneuver answer = null;

        final Enumeration<AbstractButton> buttons = buttonGroup.getElements();

        while (buttons.hasMoreElements())
        {
            final JToggleButton button = (JToggleButton)buttons.nextElement();

            if (button.isSelected())
            {
                answer = (Maneuver)button.getClientProperty(MANEUVER_KEY);
            }
        }

        return answer;
    }

    /**
     * @param maneuverSet Maneuver set.
     * 
     * @return a new panel.
     */
    private JPanel createManeuverPanel(final ManeuverSet maneuverSet)
    {
        JPanel answer = null;

        if (maneuverSet == ManeuverSet.BARREL_ROLL_MANEUVERS)
        {
            answer = createManeuverPanelBarrelRoll(maneuverSet);
        }
        else if (maneuverSet == ManeuverSet.BOOST_MANEUVERS)
        {
            answer = createManeuverPanelBoost(maneuverSet);
        }
        else if (maneuverSet == ManeuverSet.DECLOAK_MANEUVERS)
        {
            answer = createManeuverPanelDecloak(maneuverSet);
        }
        else
        {
            answer = createManeuverPanelNormal(maneuverSet);
        }

        return answer;
    }

    /**
     * @param maneuverSet Maneuver set.
     * 
     * @return a new panel.
     */
    private JPanel createManeuverPanelBarrelRoll(final ManeuverSet maneuverSet)
    {
        final JPanel answer = new JPanel(new GridLayout(0, maneuverSet.size() + 1, HGAP, VGAP));

        answer.setBackground(SILVER);
        answer.setBorder(BorderFactory.createLineBorder(SILVER, 3));

        answer.add(createTableCell("1"));

        {
            final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_LEFT_1;
            final ImageIcon image = imageUtils.createBarrelRollLeftManeuverIcon();
            final JComponent label = createTableCell(image);
            label.putClientProperty(MANEUVER_KEY, maneuver);
            answer.add(label);
        }

        {
            final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_RIGHT_1;
            final ImageIcon image = imageUtils.createBarrelRollRightManeuverIcon();
            final JComponent label = createTableCell(image);
            label.putClientProperty(MANEUVER_KEY, maneuver);
            answer.add(label);
        }

        return answer;
    }

    /**
     * @param maneuverSet Maneuver set.
     * 
     * @return a new panel.
     */
    private JPanel createManeuverPanelBoost(final ManeuverSet maneuverSet)
    {
        final JPanel answer = new JPanel(new GridLayout(0, maneuverSet.size() + 1, HGAP, VGAP));

        answer.setBackground(SILVER);
        answer.setBorder(BorderFactory.createLineBorder(SILVER, 3));

        final int speed = 1;
        answer.add(createTableCell("1"));

        for (final Bearing bearing : Bearing.values())
        {
            final Maneuver maneuver = maneuverSet.findByBearingAndSpeed(bearing, speed);

            if (maneuver != null)
            {
                final Difficulty difficulty = maneuver.getDifficulty();
                final ImageIcon image = imageUtils.createManeuverIcon(bearing, difficulty);
                final JComponent label = createTableCell(image);
                label.putClientProperty(MANEUVER_KEY, maneuver);
                answer.add(label);
            }
        }

        return answer;
    }

    /**
     * @param maneuverSet Maneuver set.
     * 
     * @return a new panel.
     */
    private JPanel createManeuverPanelDecloak(final ManeuverSet maneuverSet)
    {
        final JPanel answer = new JPanel(new GridLayout(0, maneuverSet.size() + 1, HGAP, VGAP));

        answer.setBackground(SILVER);
        answer.setBorder(BorderFactory.createLineBorder(SILVER, 3));

        answer.add(createTableCell("2"));

        {
            final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_LEFT_2;
            final ImageIcon image = imageUtils.createBarrelRollLeftManeuverIcon();
            final JComponent label = createTableCell(image);
            label.putClientProperty(MANEUVER_KEY, maneuver);
            answer.add(label);
        }

        {
            final Maneuver maneuver = Maneuver.STRAIGHT_2_STANDARD;
            final ImageIcon image = imageUtils.createManeuverIcon(Bearing.STRAIGHT, Difficulty.STANDARD);
            final JComponent label = createTableCell(image);
            label.putClientProperty(MANEUVER_KEY, maneuver);
            answer.add(label);
        }

        {
            final Maneuver maneuver = BarrelRollManeuver.BARREL_ROLL_RIGHT_2;
            final ImageIcon image = imageUtils.createBarrelRollRightManeuverIcon();
            final JComponent label = createTableCell(image);
            label.putClientProperty(MANEUVER_KEY, maneuver);
            answer.add(label);
        }

        return answer;
    }

    /**
     * @param maneuverSet Maneuver set.
     * 
     * @return a new panel.
     */
    private JPanel createManeuverPanelNormal(final ManeuverSet maneuverSet)
    {
        final JPanel answer = new JPanel(new GridLayout(0, 7, HGAP, VGAP));

        answer.setBackground(SILVER);
        answer.setBorder(BorderFactory.createLineBorder(SILVER, 3));

        final int minSpeed = Math.max(maneuverSet.getMinimumSpeed(), 1);
        final int maxSpeed = maneuverSet.getMaximumSpeed();

        for (int speed = maxSpeed; speed >= minSpeed; speed--)
        {
            answer.add(createTableCell(String.valueOf(speed)));

            for (final Bearing bearing : Bearing.values())
            {
                final Maneuver maneuver = maneuverSet.findByBearingAndSpeed(bearing, speed);

                if (maneuver == null)
                {
                    final JComponent label = createTableCell();
                    answer.add(label);
                }
                else
                {
                    final Difficulty difficulty = maneuver.getDifficulty();
                    final ImageIcon image = imageUtils.createManeuverIcon(bearing, difficulty);
                    final JComponent label = createTableCell(image);
                    label.putClientProperty(MANEUVER_KEY, maneuver);
                    answer.add(label);
                }
            }
        }

        if (maneuverSet.getMinimumSpeed() == 0)
        {
            final Bearing bearing = null;
            final int speed = 0;

            final Maneuver maneuver = maneuverSet.findByBearingAndSpeed(bearing, speed);

            if (maneuver != null)
            {
                answer.add(createTableCell(String.valueOf(speed)));
                answer.add(createTableCell());
                answer.add(createTableCell());

                final Difficulty difficulty = maneuver.getDifficulty();
                final ImageIcon image = imageUtils.createManeuverIcon(bearing, difficulty);
                final JComponent label = createTableCell(image);
                label.putClientProperty(MANEUVER_KEY, maneuver);
                answer.add(label);

                answer.add(createTableCell());
                answer.add(createTableCell());
                answer.add(createTableCell());
            }
        }

        return answer;
    }

    /**
     * @return a new component to display the input.
     */
    private JComponent createTableCell()
    {
        return createTableCell(null, null);
    }

    /**
     * @param image Image.
     * 
     * @return a new component to display the input.
     */
    private JComponent createTableCell(final ImageIcon image)
    {
        return createTableCell(null, image);
    }

    /**
     * @param text Text.
     * 
     * @return a new component to display the input.
     */
    private JComponent createTableCell(final String text)
    {
        return createTableCell(text, null);
    }

    /**
     * @param text Text.
     * @param image Image.
     * 
     * @return a new component to display the input.
     */
    private JComponent createTableCell(final String text, final ImageIcon image)
    {
        final JComponent answer;

        if (image != null)
        {
            if (isEditable)
            {
                final JToggleButton button = new JToggleButton(image);
                buttonGroup.add(button);
                answer = button;
            }
            else
            {
                answer = new JLabel(image);
                answer.setBackground(Color.GRAY);
            }
        }
        else
        {
            if (StringUtils.isEmpty(text))
            {
                answer = new JLabel();
                answer.setBackground(Color.BLACK);
            }
            else
            {
                final JLabel label = new JLabel(text);
                label.setForeground(Color.WHITE);
                label.setBackground(Color.BLACK);
                label.setFont(getFont(label));
                label.setHorizontalAlignment(SwingConstants.CENTER);
                label.setVerticalAlignment(SwingConstants.CENTER);
                label.setVerticalTextPosition(SwingConstants.CENTER);
                answer = label;
            }

            final Color highlight = LIGHT_SILVER;
            final Color shadow = DARK_SILVER;
            answer.setBorder(BorderFactory.createBevelBorder(BevelBorder.LOWERED, highlight, shadow));
        }

        answer.setOpaque(true);

        return answer;
    }

    /**
     * @param label Label.
     * 
     * @return the font for a speed number cell.
     */
    private Font getFont(final JLabel label)
    {
        if (font == null)
        {
            final Font myFont = label.getFont();

            font = new Font(myFont.getName(), Font.BOLD, myFont.getSize() + 2);
        }

        return font;
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
