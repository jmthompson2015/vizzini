package org.vizzini.swingui.game.boardgame.chess.raumschach;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

import org.vizzini.chess.raumschach.RaumschachGameInjector;
import org.vizzini.swingui.game.boardgame.chess.ChessPanel;

/**
 * Provides a user interface for raumschach chess.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Raumschach Chess"</code>
 */
public final class RaumschachChessUI extends JFrame
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
                final RaumschachChessUI app = new RaumschachChessUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public RaumschachChessUI()
    {
        final ChessPanel appPanel = new ChessPanel(this, new RaumschachGameInjector());

        setTitle("Vizzini Raumschach Chess");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(1024, 768);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);

        appPanel.start();
    }
}
