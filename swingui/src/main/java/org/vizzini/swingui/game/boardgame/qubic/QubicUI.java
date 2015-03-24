package org.vizzini.swingui.game.boardgame.qubic;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

import org.vizzini.example.boardgame.qubic.QubicGameInjector;

/**
 * Provides a user interface for qubic.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Qubic"</code>
 */
public final class QubicUI extends JFrame
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
                final QubicUI app = new QubicUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public QubicUI()
    {
        final QubicPanel appPanel = new QubicPanel(this, new QubicGameInjector());

        setTitle("Vizzini Qubic");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(768, 768);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);

        appPanel.start();
    }
}
