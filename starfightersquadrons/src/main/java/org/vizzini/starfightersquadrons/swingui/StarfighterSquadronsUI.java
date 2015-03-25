package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

/**
 * Provides a user interface for Starfighter Squadrons.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Starfighter Squadrons"</code>
 */
public final class StarfighterSquadronsUI extends JFrame
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
                final StarfighterSquadronsUI app = new StarfighterSquadronsUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public StarfighterSquadronsUI()
    {
        final SSPanel appPanel = new SSPanel(this);

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        // My display is 1920 x 1080.
        final Dimension size = new Dimension(1350, 1030);
        setSize(size);
        setLocationRelativeTo(null);

        appPanel.start();
    }
}
