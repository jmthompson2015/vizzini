package org.vizzini.starfightersquadrons.swingui;

import java.awt.EventQueue;
import java.awt.GraphicsEnvironment;
import java.awt.Point;
import java.awt.Rectangle;
import java.util.List;

import javax.swing.JFrame;

import org.vizzini.starfightersquadrons.DamageCard;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.ShipActionAction;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.UpgradeCard;

/**
 * Provides tests for the <code>ShipActionChooser</code> class.
 */
public final class MyTestShipActionChooser
{
    /**
     * Provides a frame to use as a parent component.
     */
    private static class MyFrame extends JFrame
    {
        @Override
        public Rectangle getBounds()
        {
            final GraphicsEnvironment ge = GraphicsEnvironment.getLocalGraphicsEnvironment();
            final Point centerPoint = ge.getCenterPoint();
            return new Rectangle(centerPoint);
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
                new MyTestShipActionChooser();
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    @SuppressWarnings("synthetic-access")
    public MyTestShipActionChooser()
    {
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent imperialAgent = environment.getImperialAgent();
        List<SSToken> imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        final SSToken imperialToken0 = imperialTokens.get(0);
        {
            SSPosition position = environment.getPositionFor(imperialToken0);
            environment.removeToken(position);
            position = new SSPosition(position.getX(), SSPosition.MAX_Y - 200, position.getHeading());
            environment.placeToken(position, imperialToken0);
        }
        final SSToken imperialToken1 = imperialTokens.get(1);
        {
            SSPosition position = environment.getPositionFor(imperialToken1);
            environment.removeToken(position);
            position = new SSPosition(position.getX(), SSPosition.MAX_Y - 200, position.getHeading());
            environment.placeToken(position, imperialToken1);
        }
        final SSToken imperialToken2 = new SSToken(Pilot.SIGMA_SQUADRON_PILOT, imperialAgent);
        environment.placeToken(new SSPosition(457, SSPosition.MAX_Y - 200, 90), imperialToken2);

        final SSAgent rebelAgent = environment.getRebelAgent();
        final List<SSToken> rebelTokens = environment.getAttackers(SSTeam.REBEL);
        final SSToken rebelToken2 = new SSToken(Pilot.PROTOTYPE_PILOT, rebelAgent);
        environment.placeToken(new SSPosition(557, SSPosition.MAX_Y - 20, -90), rebelToken2);
        rebelToken2.addCriticalDamage(DamageCard.CONSOLE_FIRE);

        // final SSToken attacker = rebelTokens.get(0); // YT-1300
        // attacker.addCriticalDamage(DamageCard.CONSOLE_FIRE);
        // attacker.getUpgrades().add(UpgradeCard.R2_D2);
        final SSToken attacker = rebelTokens.get(1); // X-Wing
        attacker.addCriticalDamage(DamageCard.CONSOLE_FIRE);
        attacker.getUpgrades().add(UpgradeCard.R2_F2);
        // final SSToken attacker = rebelToken2; // A-Wing
        // final SSToken attacker = imperialToken0; // TIE Fighter
        // final SSToken attacker = imperialToken1; // TIE Fighter
        // final SSToken attacker = imperialToken2; // TIE Phantom

        imperialTokens = environment.getAttackers(SSTeam.IMPERIAL);
        for (final SSToken myToken : imperialTokens)
        {
            System.out.println(myToken.getName() + " " + environment.getPositionFor(myToken));
        }

        final ShipActionAction shipActionAction = ShipActionChooser.showDialog(new MyFrame(), environment, attacker,
                attacker.getShipActions());

        System.out.println("shipActionAction = " + shipActionAction);

        if (shipActionAction != null)
        {
            System.out.println("shipActionAction.getShipAction() = " + shipActionAction.getShipAction());
            System.out.println("shipActionAction.getDefender() = " + shipActionAction.getDefender());
            System.out.println("shipActionAction.getManeuverAction() = " + shipActionAction.getManeuverAction());
        }
    }
}
