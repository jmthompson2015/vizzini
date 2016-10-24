package org.vizzini.starfightersquadrons.swingui;

import java.awt.EventQueue;
import java.awt.GraphicsEnvironment;
import java.awt.Point;
import java.awt.Rectangle;
import java.util.List;

import javax.swing.JFrame;

import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.RangeRuler.Range;
import org.vizzini.starfightersquadrons.swingui.TokenChooser;

/**
 * Provides tests for the <code>TokenChooser</code> class.
 */
public final class MyTestTokenChooser
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
                new MyTestTokenChooser();
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    @SuppressWarnings("synthetic-access")
    public MyTestTokenChooser()
    {
        final SSEnvironment environment = testData.createEnvironment();
        final List<SSToken> attackers = environment.getAttackers(SSTeam.REBEL);
        final SSToken attacker = findShip(attackers, Ship.X_WING);
        final SSPosition attackerPosition = environment.getPositionFor(attacker);

        final List<SSToken> defenders = environment.getAttackers(SSTeam.IMPERIAL);
        {
            final SSToken defender = findShip(defenders, Ship.FIRESPRAY_31);
            SSPosition position = environment.getPositionFor(defender);
            environment.removeToken(position);
            position = new SSPosition(attackerPosition.getX() - 40, SSPosition.MAX_Y - 60, position.getHeading());
            environment.placeToken(position, defender);
        }
        {
            final SSToken defender = findShip(defenders, Ship.TIE_FIGHTER);
            SSPosition position = environment.getPositionFor(defender);
            environment.removeToken(position);
            position = new SSPosition(position.getX(), SSPosition.MAX_Y - 200, position.getHeading());
            environment.placeToken(position, defender);
        }
        {
            final SSToken defender = new SSToken(Pilot.ALPHA_SQUADRON_PILOT, environment.getImperialAgent());
            final SSPosition position = new SSPosition(557, SSPosition.MAX_Y - 300, 90);
            environment.placeToken(position, defender);
        }
        {
            final SSToken defender = new SSToken(Pilot.ROYAL_GUARD_PILOT, environment.getImperialAgent());
            final SSPosition position = new SSPosition(557 - 40, SSPosition.MAX_Y - 200, 90);
            environment.placeToken(position, defender);
        }

        final List<SSToken> rangeOneDefenders = environment.getDefendersAtRange(attacker, attackerPosition,
                Range.ONE);
        final List<SSToken> rangeTwoDefenders = environment.getDefendersAtRange(attacker, attackerPosition,
                Range.TWO);
        final List<SSToken> rangeThreeDefenders = environment.getDefendersAtRange(attacker, attackerPosition,
                Range.THREE);

        final SSToken defender = TokenChooser.showDialog(new MyFrame(), attacker, rangeOneDefenders,
                rangeTwoDefenders, rangeThreeDefenders);

        System.out.println("defender = " + defender);
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
            if (t.getShip() == ship)
            {
                token = t;
                break;
            }
        }

        return token;
    }
}
