package org.vizzini.swingui.game.boardgame.reversi;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

/**
 * Provides a user interface for reversi.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Reversi"</code>
 */
public final class ReversiUI extends JFrame
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
                final ReversiUI app = new ReversiUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public ReversiUI()
    {
        final ReversiPanel appPanel = new ReversiPanel(this);

        setTitle("Vizzini Reversi");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(700, 790);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);

        appPanel.start();
    }
}
