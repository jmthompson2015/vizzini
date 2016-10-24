package org.vizzini.swingui.game.boardgame.tictactoe;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

/**
 * Provides a user interface for tic-tac-toe.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Tic-Tac-Toe"</code>
 */
public final class TicTacToeUI extends JFrame
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
                final TicTacToeUI app = new TicTacToeUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public TicTacToeUI()
    {
        final TicTacToePanel appPanel = new TicTacToePanel(this);

        setTitle("Vizzini Tic-Tac-Toe");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(400, 500);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);

        appPanel.start();
    }
}
