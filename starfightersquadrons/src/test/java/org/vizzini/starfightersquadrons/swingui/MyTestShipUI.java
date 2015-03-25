package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;
import java.awt.GridLayout;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>ShipUI</code> class.
 */
public final class MyTestShipUI extends JFrame
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
                final MyTestShipUI app = new MyTestShipUI();
                app.setVisible(true);
            }
        });
    }

    /** Change in heading. (deg) */
    private static final int DELTA_HEADING = 45;

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestShipUI()
    {
        final SSEnvironment environment = testData.createEnvironment();
        final ImageUtilities imageUtils = new ImageUtilities();
        SSPosition position;
        ImageIcon image;

        // X-Wing.
        {
            position = TestData.REBEL_START_POSITION0;
            image = imageUtils.createShipIcon(Ship.X_WING);
        }

        // Firespray-31.
        // {
        // position = TestData.IMPERIAL_START_POSITION1;
        // image = imageUtils.createShipIcon(Ship.FIRESPRAY_31);
        // }

        final SSToken token = environment.getTokenAt(position);
        final ShipUI shipUI = new ShipUI(token, position.getHeading(), image);

        environment.addUpdateTriggerListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final SSPosition p = environment.getPositionFor(token);
                final Point center = shipUI.getCenter();
                final SSPosition p2 = new SSPosition(center.x, center.y, p.getHeading());
                shipUI.setPosition(p2);
            }
        });

        final JPanel shipPanel = new JPanel(null);
        shipPanel.setBackground(Color.BLACK);
        shipPanel.setPreferredSize(shipUI.getPreferredSize());
        shipPanel.add(shipUI);

        final JPanel panel = new JPanel(new BorderLayout());
        panel.add(shipPanel, BorderLayout.CENTER);
        panel.add(createButtonPanel(environment, token), BorderLayout.SOUTH);

        // Initialize position.
        final Point center = shipUI.getCenter();
        final SSPosition p2 = new SSPosition(center.x, center.y, position.getHeading());
        shipUI.setPosition(p2);

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(panel, BorderLayout.CENTER);
        pack();
        setLocationRelativeTo(null);
    }

    /**
     * @param environment Environment.
     * @param token Token.
     *
     * @return a new panel.
     */
    private JPanel createButtonPanel(final SSEnvironment environment, final SSToken token)
    {
        final JPanel answer = new JPanel(new GridLayout(2, 0));

        answer.add(createIncreaseHeadingButton(environment, token));
        answer.add(createDecreaseHeadingButton(environment, token));

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
}
