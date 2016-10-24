package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.util.List;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverAction;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSEngine;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSGameInjector;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>PlayAreaUI</code> class.
 */
public final class MyTestManeuverAction extends JFrame
{
    /**
     * Provides a thread.
     */
    class MyThread extends Thread
    {
        /** Maneuver action. */
        private final ManeuverAction action;

        /**
         * Construct this object.
         *
         * @param action Maneuver action.
         */
        @SuppressWarnings("hiding")
        public MyThread(final ManeuverAction action)
        {
            this.action = action;
        }

        @Override
        public void run()
        {
            delay(3000);

            action.doIt();
        }
    }

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
                final MyTestManeuverAction app = new MyTestManeuverAction();
                app.setVisible(true);
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestManeuverAction()
    {
        final SSGameInjector injector = new SSGameInjector();
        final SSEngine engine = injector.injectEngine();
        final SSEnvironment environment = testData.createEnvironment();
        final PlayAreaUI environmentUI = new PlayAreaUI(engine, environment);

        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken token = findShip(rebelTokens, Ship.X_WING);
        final SSPosition fromPosition = environment.getPositionFor(token);

        // Move imperial in front of rebel.
        final int choice = 2;
        Maneuver maneuver;
        int dx;
        int dy;

        switch (choice)
        {
        case 2:
            maneuver = Maneuver.STRAIGHT_2_EASY;
            dx = 0;
            dy = -140;
            break;
        case 5:
            maneuver = Maneuver.STRAIGHT_5_STANDARD;
            dx = 0;
            dy = -260;
            break;
        case 6:
            maneuver = Maneuver.BANK_RIGHT_1_STANDARD;
            dx = 58;
            dy = -113;
            break;
        case 7:
            maneuver = Maneuver.TURN_RIGHT_1_STANDARD;
            dx = 54;
            dy = -74;
            break;
        default:
            throw new RuntimeException("Unknown choice: " + choice);
        }

        final List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken = findShip(imperialTokens, Ship.TIE_FIGHTER);
        SSPosition imperialPosition = environment.getPositionFor(imperialToken);
        environment.removeToken(imperialPosition);
        imperialPosition = new SSPosition(fromPosition.getX() + dx, fromPosition.getY() + dy, 90);
        environment.placeToken(imperialPosition, imperialToken);

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(environmentUI, BorderLayout.CENTER);
        final Dimension size = new Dimension(916, 938);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);
        environment.fireUpdateTrigger();

        final ShipBase shipBase = token.getPilot().getShip().getShipBase();
        final ManeuverAction action = new ManeuverAction(environment, maneuver, fromPosition, shipBase);
        new MyThread(action).start();
        System.out.println("position = " + environment.getPositionFor(token));
    }

    /**
     * @param total Total delay time.
     */
    void delay(final long total)
    {
        final long delay = total;

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

    /**
     * @param tokens Tokens.
     * @param ship Ship.
     *
     * @return the first token which matches the given ship.
     */
    private SSToken findShip(final List<SSToken> tokens, final Ship ship)
    {
        SSToken token = null;

        for (final SSToken t : tokens)
        {
            if (t.getPilot().getShip() == ship)
            {
                token = t;
                break;
            }
        }

        return token;
    }
}
