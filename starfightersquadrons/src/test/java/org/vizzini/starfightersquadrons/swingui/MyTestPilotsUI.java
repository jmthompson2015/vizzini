package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides tests for the <code>PlayAreaUI</code> class.
 */
public final class MyTestPilotsUI extends JFrame
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
                final MyTestPilotsUI app = new MyTestPilotsUI();
                app.setVisible(true);
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestPilotsUI()
    {
        final SSEnvironment environment = testData.createEnvironment();
        final SSAgent rebelAgent = environment.getRebelAgent();
        final SSToken token = new SSToken(Pilot.CHEWBACCA, rebelAgent);
        final SSPosition position = new SSPosition(SSPosition.MAX_X / 2, SSPosition.MAX_Y / 2, -90);
        environment.placeToken(position, token);
        final PilotsUI imperialPilotsUI = new PilotsUI(environment, SSTeam.IMPERIAL);
        final PilotsUI rebelPilotsUI = new PilotsUI(environment, SSTeam.REBEL);

        final boolean isType1 = false;

        if (isType1)
        {
            getContentPane().add(new JScrollPane(imperialPilotsUI), BorderLayout.CENTER);
        }
        else
        {
            final JPanel imperialPanel = new JPanel();
            imperialPanel.add(imperialPilotsUI);
            final JScrollPane imperialScrollPane = new JScrollPane(imperialPanel);

            final JPanel rebelPanel = new JPanel();
            rebelPanel.add(rebelPilotsUI);
            final JScrollPane rebelScrollPane = new JScrollPane(rebelPanel);

            final JPanel panel = new JPanel(new BorderLayout());
            panel.add(imperialScrollPane, BorderLayout.WEST);
            panel.add(new JLabel("play area"), BorderLayout.CENTER);
            panel.add(rebelScrollPane, BorderLayout.EAST);
            getContentPane().add(panel, BorderLayout.CENTER);
        }

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        pack();
        setLocationRelativeTo(null);
    }
}
