package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.awt.Toolkit;
import java.util.List;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverAction;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSEngine;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSGameInjector;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>PlayAreaUI</code> class.
 */
public final class MyTestPlayAreaUI extends JFrame
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
                final MyTestPlayAreaUI app = new MyTestPlayAreaUI();
                app.setVisible(true);
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestPlayAreaUI()
    {
        final SSGameInjector injector = new SSGameInjector();
        final SSEngine engine = injector.injectEngine();
        final SSEnvironment environment = testData.createEnvironment();
        final PlayAreaUI environmentUI = new PlayAreaUI(engine, environment);

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(environmentUI, BorderLayout.CENTER);
        final Dimension size = new Dimension(916, 938);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);
        environment.fireUpdateTrigger();
        delay(1000, 0, 0);

        new Thread()
        {
            @Override
            public void run()
            {
                final int margin = 300;

                for (int i = 0; i < 50; i++)
                {
                    final long start = System.currentTimeMillis();

                    System.out.println("i = " + i);
                    final List<SSToken> tokens = environment.getTokensForActivation();

                    for (final SSToken token : tokens)
                    {
                        final SSPosition fromPosition = environment.getPositionFor(token);
                        final Maneuver maneuver;

                        if (i == 0)
                        {
                            maneuver = Maneuver.BANK_LEFT_1_EASY;
                        }
                        else if ((fromPosition.getX() < margin)
                                || ((SSPosition.MAX_X - margin) < fromPosition.getX()))
                        {
                            maneuver = Maneuver.BANK_RIGHT_1_EASY;
                        }
                        else
                        {
                            maneuver = Maneuver.STRAIGHT_1_EASY;
                        }

                        final ShipBase shipBase = token.getPilot().getShip().getShipBase();
                        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);
                        action.doIt();
                        delay(1000, 0, 0);
                    }

                    final long end = System.currentTimeMillis();
                    delay(1000, start, end);
                }

                Toolkit.getDefaultToolkit().beep();
            }
        }.start();
    }

    /**
     * @param total Total delay time.
     * @param start Task start time.
     * @param end Task end time.
     */
    void delay(final long total, final long start, final long end)
    {
        final long delay = total - (end - start);

        if (delay > 0)
        {
            try
            {
                Thread.sleep(delay);
            }
            catch (final InterruptedException e)
            {
                throw new RuntimeException(e);
            }
        }
    }
}
