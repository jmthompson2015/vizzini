package org.vizzini.ai.robot;

import java.awt.AWTException;
import java.awt.Robot;

/**
 * Provides a kit of actuators for Macintosh OS X.
 */
public final class MacActuatorKit
{
    /** Activator. */
    private MacActivateAppActuator activator;

    /** Commander. */
    private CommandActuator commander;

    /** Delayer. */
    private DelayActuator delayer;

    /** Drag and dropper. */
    private DragAndDropActuator dragAndDropper;

    /** Key clicker. */
    private KeyboardKeyClickActuator keyClicker;

    /** Launcher. */
    private MacLaunchAppActuator launcher;

    /** Mouse left clicker. */
    private MouseLeftClickActuator mouseLeftClicker;

    /** Mouse wheeler. */
    private MouseWheelActuator mouseWheeler;

    /** Mouse mover. */
    private MouseMoveActuator mouseMover;

    /** Quitter. */
    private MacQuitAppActuator quitter;

    /** Robot. */
    private final Robot robot;

    /**
     * Construct this object.
     */
    public MacActuatorKit()
    {
        try
        {
            robot = new Robot();
        }
        catch (final AWTException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @return the activator
     */
    public MacActivateAppActuator getActivator()
    {
        if (activator == null)
        {
            activator = new MacActivateAppActuator("activator");
        }

        return activator;
    }

    /**
     * @return the commander
     */
    public CommandActuator getCommander()
    {
        if (commander == null)
        {
            commander = new CommandActuator("commander");
        }

        return commander;
    }

    /**
     * @return the delayer
     */
    public DelayActuator getDelayer()
    {
        if (delayer == null)
        {
            delayer = new DelayActuator("delayer", robot);
        }

        return delayer;
    }

    /**
     * @return the dragAndDropper
     */
    public DragAndDropActuator getDragAndDropper()
    {
        if (dragAndDropper == null)
        {
            dragAndDropper = new DragAndDropActuator("dragAndDropper", robot);
        }

        return dragAndDropper;
    }

    /**
     * @return the keyClicker
     */
    public KeyboardKeyClickActuator getKeyClicker()
    {
        if (keyClicker == null)
        {
            keyClicker = new KeyboardKeyClickActuator("keyClicker", robot);
        }

        return keyClicker;
    }

    /**
     * @return the launcher
     */
    public MacLaunchAppActuator getLauncher()
    {
        if (launcher == null)
        {
            launcher = new MacLaunchAppActuator("launcher");
        }

        return launcher;
    }

    /**
     * @return the mouseLeftClicker
     */
    public MouseLeftClickActuator getMouseLeftClicker()
    {
        if (mouseLeftClicker == null)
        {
            mouseLeftClicker = new MouseLeftClickActuator("mouseLeftClicker", robot);
        }

        return mouseLeftClicker;
    }

    /**
     * @return the mouseMover
     */
    public MouseMoveActuator getMouseMover()
    {
        if (mouseMover == null)
        {
            mouseMover = new MouseMoveActuator("mouseMover", robot);
        }

        return mouseMover;
    }

    /**
     * @return the mouseWheeler
     */
    public MouseWheelActuator getMouseWheeler()
    {
        if (mouseWheeler == null)
        {
            mouseWheeler = new MouseWheelActuator("mouseWheeler", robot);
        }

        return mouseWheeler;
    }

    /**
     * @return the quitter
     */
    public MacQuitAppActuator getQuitter()
    {
        if (quitter == null)
        {
            quitter = new MacQuitAppActuator("quitter");
        }

        return quitter;
    }
}
