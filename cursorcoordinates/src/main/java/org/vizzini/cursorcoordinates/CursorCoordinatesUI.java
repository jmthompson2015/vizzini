package org.vizzini.cursorcoordinates;

import java.awt.BorderLayout;
import java.awt.EventQueue;
import java.awt.MouseInfo;
import java.awt.Point;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.BorderFactory;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingConstants;
import javax.swing.Timer;
import javax.swing.UIManager;
import javax.swing.UnsupportedLookAndFeelException;
import javax.swing.WindowConstants;

/**
 * Provides a GUI which reports the current cursor coordinates.
 */
public final class CursorCoordinatesUI extends JPanel
{
    /** Application name. */
    private static final String APP_NAME = "Cursor Coordinates";

    /** Frame. */
    static JFrame frame;

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String[] args)
    {
        configure();

        EventQueue.invokeLater(new Runnable()
        {
            @Override
            public void run()
            {
                final CursorCoordinatesUI panel = new CursorCoordinatesUI();

                frame = new JFrame(APP_NAME);
                frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
                frame.getContentPane().add(panel, BorderLayout.CENTER);
                frame.setLocationByPlatform(true);
                frame.setVisible(true);
                frame.pack();
            }
        });
    }

    /** Timer. */
    Timer timer;

    /** Coordinates widget. */
    private JLabel coordinatesUI;

    /** GUI gap. */
    private static final int GAP = 5;

    /**
     * Configure the GUI to the current OS.
     */
    private static void configure()
    {
        // Take the menu bar off the JFrame.
        System.setProperty("apple.laf.useScreenMenuBar", "true");

        // Set the name of the application menu item.
        System.setProperty("com.apple.mrj.application.apple.menu.about.name", APP_NAME);

        // Set the look and feel.
        try
        {
            UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
        }
        catch (final ClassNotFoundException e)
        {
            e.printStackTrace();
        }
        catch (final InstantiationException e)
        {
            e.printStackTrace();
        }
        catch (final IllegalAccessException e)
        {
            e.printStackTrace();
        }
        catch (final UnsupportedLookAndFeelException e)
        {
            e.printStackTrace();
        }
    }

    /**
     * Construct this object.
     */
    public CursorCoordinatesUI()
    {
        setBorder(BorderFactory.createEmptyBorder(GAP, GAP, GAP, GAP));
        setLayout(new BorderLayout(GAP, GAP));

        add(createCoordinatesWidget(), BorderLayout.CENTER);

        timer = createTimer();
        timer.start();
    }

    /**
     * @return a new timer which updates the coordinates.
     */
    Timer createTimer()
    {
        final int delay = 100;

        final ActionListener taskPerformer = new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                updateCoordinates();
            }
        };

        return new Timer(delay, taskPerformer);
    }

    /**
     * Update the displayed coordinates.
     */
    void updateCoordinates()
    {
        final Point point = MouseInfo.getPointerInfo().getLocation();

        final StringBuilder sb = new StringBuilder();
        sb.append(point.x).append(", ").append(point.y);

        coordinatesUI.setText(sb.toString());
    }

    /**
     * @return a new coordinates widget.
     */
    private JLabel createCoordinatesWidget()
    {
        coordinatesUI = new JLabel("0, 0", SwingConstants.CENTER);

        return coordinatesUI;
    }
}
