package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.EventQueue;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.SSPosition;

/**
 * Provides tests for the <code>ExplosionUI</code> class.
 */
public final class MyTestExplosionUI extends JFrame
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
                final MyTestExplosionUI app = new MyTestExplosionUI();
                app.setVisible(true);
            }
        });
    }

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /**
     * Construct this object.
     */
    public MyTestExplosionUI()
    {
        final JPanel panel = new JPanel();
        panel.setBackground(Color.BLACK);

        {
            final SSPosition fromPosition = new SSPosition(200, 300, 0);
            final ShipBase shipBase = ShipBase.STANDARD;
            final ImageIcon image = imageUtils.createExplosionIcon();
            final ExplosionUI explosionUI = new ExplosionUI(fromPosition, shipBase, image);
            panel.add(explosionUI);
        }

        {
            final SSPosition fromPosition = new SSPosition(300, 400, 0);
            final ShipBase shipBase = ShipBase.LARGE;
            final ImageIcon image = imageUtils.createExplosionIcon();
            final ExplosionUI explosionUI = new ExplosionUI(fromPosition, shipBase, image);
            panel.add(explosionUI);
        }

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(panel, BorderLayout.CENTER);
        pack();
        setLocationRelativeTo(null);
    }
}
