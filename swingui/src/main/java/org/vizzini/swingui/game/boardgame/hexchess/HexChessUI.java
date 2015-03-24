package org.vizzini.swingui.game.boardgame.hexchess;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

/**
 * Provides a user interface for hexagonal chess.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Hex Chess"</code>
 */
public final class HexChessUI extends JFrame
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
                final HexChessUI app = new HexChessUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public HexChessUI()
    {
        final HexChessPanel appPanel = new HexChessPanel(this);

        setTitle("Vizzini Hex Chess");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(700, 750);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);

        appPanel.start();
    }
}
