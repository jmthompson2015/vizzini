package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.Maneuver.BarrelRollManeuver;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides tests for the <code>ManeuverUI</code> class.
 */
public final class MyTestManeuverUI extends JFrame
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
                final MyTestManeuverUI app = new MyTestManeuverUI();
                app.setVisible(true);
            }
        });
    }

    /** Change in heading. (deg) */
    private static final int DELTA_HEADING = 45;

    /** Maneuver panel. */
    JPanel maneuverPanel;

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestManeuverUI()
    {
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken token = environment.getTokenAt(TestData.REBEL_START_POSITION0);
        environment.removeToken(TestData.REBEL_START_POSITION0);
        final SSPosition fromPosition = new SSPosition(SSPosition.MAX_X / 2, SSPosition.MAX_Y / 2, 0);
        environment.placeToken(fromPosition, token);
        final ShipBase shipBase = token.getPilot().getShip().getShipBase();

        maneuverPanel = createManeuverPanel(fromPosition, shipBase);
        final JPanel panel = new JPanel(new BorderLayout());
        panel.add(maneuverPanel, BorderLayout.CENTER);
        panel.add(createButtonPanel(environment, token), BorderLayout.SOUTH);

        environment.addUpdateTriggerListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final SSPosition p = environment.getPositionFor(token);
                panel.remove(maneuverPanel);
                maneuverPanel = createManeuverPanel(p, shipBase);
                panel.add(maneuverPanel, 0);
                panel.revalidate();
                panel.repaint();
                MyTestManeuverUI.this.pack();
            }
        });

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(panel, BorderLayout.CENTER);
        pack();
        setLocationRelativeTo(null);
    }

    /**
     * @param fromPosition From position.
     * @param shipBase Ship base.
     *
     * @return a new panel.
     */
    JPanel createManeuverPanel(final SSPosition fromPosition, final ShipBase shipBase)
    {
        final JPanel answer = new JPanel(new GridLayout2(5, 0, 5, 5));
        answer.setBorder(BorderFactory.createEmptyBorder(5, 5, 5, 5));
        answer.setBackground(Color.DARK_GRAY);

        // answer.add(createLabel("5"));
        // answer.add(createLabel(""));
        // answer.add(createLabel(""));
        // answer.add(new ManeuverUI(Maneuver.STRAIGHT_5_STANDARD, fromPosition, shipBase));
        // answer.add(createLabel(""));
        // answer.add(createLabel(""));
        // answer.add(createLabel(""));

        answer.add(createLabel("4"));
        answer.add(createLabel(""));
        answer.add(createLabel(""));
        answer.add(new ManeuverUI(Maneuver.STRAIGHT_4_STANDARD, fromPosition, shipBase));
        answer.add(createLabel(""));
        answer.add(createLabel(""));
        answer.add(new ManeuverUI(Maneuver.KOIOGRAN_TURN_4_HARD, fromPosition, shipBase));
        answer.add(createLabel(""));
        answer.add(createLabel(""));

        answer.add(createLabel("3"));
        answer.add(new ManeuverUI(Maneuver.TURN_LEFT_3_STANDARD, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.BANK_LEFT_3_STANDARD, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.STRAIGHT_3_EASY, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.BANK_RIGHT_3_STANDARD, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.TURN_RIGHT_3_STANDARD, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.KOIOGRAN_TURN_3_HARD, fromPosition, shipBase));
        answer.add(createLabel(""));
        answer.add(createLabel(""));

        answer.add(createLabel("2"));
        answer.add(new ManeuverUI(Maneuver.TURN_LEFT_2_STANDARD, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.BANK_LEFT_2_EASY, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.STRAIGHT_2_EASY, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.BANK_RIGHT_2_EASY, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.TURN_RIGHT_2_STANDARD, fromPosition, shipBase));
        answer.add(createLabel(""));
        answer.add(createLabel(""));
        answer.add(createLabel(""));

        answer.add(createLabel("1"));
        answer.add(new ManeuverUI(Maneuver.TURN_LEFT_1_STANDARD, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.BANK_LEFT_1_EASY, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.STRAIGHT_1_EASY, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.BANK_RIGHT_1_EASY, fromPosition, shipBase));
        answer.add(new ManeuverUI(Maneuver.TURN_RIGHT_1_STANDARD, fromPosition, shipBase));
        answer.add(createLabel(""));
        answer.add(new ManeuverUI(BarrelRollManeuver.BARREL_ROLL_LEFT_1, fromPosition, shipBase));
        answer.add(new ManeuverUI(BarrelRollManeuver.BARREL_ROLL_RIGHT_1, fromPosition, shipBase));

        answer.add(new JLabel());
        answer.add(createLabel("TURN LEFT"));
        answer.add(createLabel("BANK LEFT"));
        answer.add(createLabel("STRAIGHT"));
        answer.add(createLabel("BANK RIGHT"));
        answer.add(createLabel("TURN RIGHT"));
        answer.add(createLabel("KOIOGRAN TURN"));
        answer.add(createLabel("BARREL ROLL LEFT"));
        answer.add(createLabel("BARREL ROLL RIGHT"));

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new panel.
     */
    private JPanel createButtonPanel(final SSEnvironment environment, final SSToken token)
    {
        final JPanel panel = new JPanel(new GridLayout(2, 0));

        panel.add(createIncreaseHeadingButton(environment, token));
        panel.add(createDecreaseHeadingButton(environment, token));

        final JPanel answer = new JPanel();

        answer.add(panel);

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createDecreaseHeadingButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("-Heading");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final SSPosition positionOld = environment.getPositionFor(token);
                environment.removeToken(positionOld);
                final SSPosition position = new SSPosition(positionOld.getX(), positionOld.getY(), positionOld
                        .getHeading() - DELTA_HEADING);
                environment.placeToken(position, token);
                environment.fireUpdateTrigger();
            }
        });

        return answer;
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new button.
     */
    private JButton createIncreaseHeadingButton(final SSEnvironment environment, final SSToken token)
    {
        final JButton answer = new JButton("+Heading");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final SSPosition positionOld = environment.getPositionFor(token);
                environment.removeToken(positionOld);
                final SSPosition position = new SSPosition(positionOld.getX(), positionOld.getY(), positionOld
                        .getHeading() + DELTA_HEADING);
                environment.placeToken(position, token);
                environment.fireUpdateTrigger();
            }
        });

        return answer;
    }

    /**
     * @param text Text.
     *
     * @return a new label.
     */
    private JLabel createLabel(final String text)
    {
        final JLabel answer = new JLabel(text);

        answer.setOpaque(true);
        answer.setHorizontalAlignment(SwingConstants.CENTER);

        return answer;
    }
}
