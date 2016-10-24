package org.vizzini.runescape;

import java.awt.AWTException;
import java.awt.Point;
import java.awt.Robot;
import java.awt.Toolkit;

import org.vizzini.ai.robot.MacActivateAppActuator;
import org.vizzini.ai.robot.MouseLeftClickActuator;

/**
 * Provides a robot to perform the High-Alchemy spell on an entire inventory of items in RuneScape.
 */
public final class HighAlchemyRobot
{
    /** Item point. */
    private static final Point ITEM_POINT = new Point(1202, 908);

    /** Spell point. */
    private static final Point SPELL_POINT = new Point(1214, 758);

    /**
     * Application method.
     * 
     * @param args Application arguments.
     * @throws AWTException if the robot cannot be constructed.
     */
    public static void main(final String args[]) throws AWTException
    {
        final HighAlchemyRobot robot = new HighAlchemyRobot();

        robot.performTask();
    }

    /** Activate application actuator. */
    private final MacActivateAppActuator activator = new MacActivateAppActuator("activator");

    /** Left click actuator. */
    private final MouseLeftClickActuator leftClicker = new MouseLeftClickActuator("leftClicker", createRobot());

    /**
     * Perform task.
     * 
     * <p>
     * Start with:
     * </p>
     * <ol>
     * <li>RuneScape full-screen on the 19" monitor</li>
     * <li>wield Mystic Fire staff</li>
     * <li>have Nature Runes in the bottom right of the inventory</li>
     * <li>have a full inventory of items</li>
     * <li>be on Magic Abilities/Skilling mini-window tab</li>
     * </ol>
     */
    public void performTask()
    {
        final long start = System.currentTimeMillis();

        activator.actuate("RuneScape.app");

        for (int i = 1; i < 28; i++)
        {
            System.out.println(i + " click");

            leftClicker.actuate(SPELL_POINT);
            leftClicker.delay(getRandomTime(1000));
            leftClicker.actuate(ITEM_POINT);
            leftClicker.delay(getRandomTime(3000));
        }

        final long end = System.currentTimeMillis();
        System.out.println("elapsed time " + (end - start) + " ms");
        Toolkit.getDefaultToolkit().beep();
    }

    /**
     * @return a new robot.
     */
    private Robot createRobot()
    {
        Robot answer;

        try
        {
            answer = new Robot();
        }
        catch (final AWTException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @param ms Milliseconds.
     * 
     * @return a time within +/- 10% of the given parameter.
     */
    private int getRandomTime(final int ms)
    {
        final int tenPercent = (int)(ms * 0.10);
        final double sign = (Math.random() > 0.5) ? 1.0 : -1.0;

        return ms + (int)(sign * tenPercent * Math.random());
    }
}
