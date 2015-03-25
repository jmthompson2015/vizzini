package org.vizzini.starfightersquadrons.swingui;

import static org.junit.Assert.assertNotNull;

import java.awt.EventQueue;
import java.awt.GraphicsEnvironment;
import java.awt.Point;
import java.awt.Rectangle;

import javax.swing.JFrame;

import org.vizzini.starfightersquadrons.AttackDice;
import org.vizzini.starfightersquadrons.ModifyAttackDiceAction;
import org.vizzini.starfightersquadrons.TargetLock;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.swingui.ModifyAttackDiceUI;

/**
 * Provides tests for the <code>ModifyAttackDiceUI</code> class.
 */
public final class MyTestModifyAttackDiceUI
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
                new MyTestModifyAttackDiceUI();
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    @SuppressWarnings("synthetic-access")
    public MyTestModifyAttackDiceUI()
    {
        final SSEnvironment environment = testData.createEnvironment();
        final SSToken attacker = environment.getAttackers(SSTeam.REBEL).get(0);
        final SSToken defender = environment.getAttackers(SSTeam.IMPERIAL).get(0);
        attacker.increaseFocusCount();
        TargetLock.getInstance(attacker, defender);
        final AttackDice attackDice = new AttackDice(3);

        final ModifyAttackDiceAction action = ModifyAttackDiceUI.showDialog(new MyFrame(), environment, attacker,
                attackDice);

        System.out.println("action = " + action);

        assertNotNull(action);
    }
}
