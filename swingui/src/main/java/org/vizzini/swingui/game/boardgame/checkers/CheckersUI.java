package org.vizzini.swingui.game.boardgame.checkers;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

/**
 * Provides a user interface for checkers.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Checkers"</code>
 */
public final class CheckersUI extends JFrame
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
                final CheckersUI app = new CheckersUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public CheckersUI()
    {
        final CheckersPanel appPanel = new CheckersPanel(this);

        setTitle("Vizzini Checkers");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(700, 750);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);

        appPanel.start();
    }
}
