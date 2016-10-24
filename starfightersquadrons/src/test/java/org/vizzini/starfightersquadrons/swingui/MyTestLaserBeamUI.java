package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides tests for the <code>LaserBeamUI</code> class.
 */
public final class MyTestLaserBeamUI extends JFrame
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
                final MyTestLaserBeamUI app = new MyTestLaserBeamUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public MyTestLaserBeamUI()
    {
        final JPanel panel = new JPanel();

        {
            final SSTeam attackerTeam = SSTeam.IMPERIAL;
            final SSPosition fromPosition = new SSPosition(200, 300, 0);
            final SSPosition toPosition = new SSPosition(300, 400, 0);
            final LaserBeamUI laserBeamUI = new LaserBeamUI(attackerTeam, fromPosition, toPosition);
            panel.add(laserBeamUI);
        }

        {
            final SSTeam attackerTeam = SSTeam.REBEL;
            final SSPosition fromPosition = new SSPosition(400, 500, 0);
            final SSPosition toPosition = new SSPosition(500, 400, 0);
            final LaserBeamUI laserBeamUI = new LaserBeamUI(attackerTeam, fromPosition, toPosition);
            panel.add(laserBeamUI);
        }

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(panel, BorderLayout.CENTER);
        pack();
        setLocationRelativeTo(null);
    }
}
