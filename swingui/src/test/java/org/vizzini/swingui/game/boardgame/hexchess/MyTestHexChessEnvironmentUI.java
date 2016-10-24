package org.vizzini.swingui.game.boardgame.hexchess;

import java.awt.BorderLayout;
import java.awt.Dimension;
import java.awt.EventQueue;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.DefaultAgent;
import org.vizzini.example.boardgame.hexchess.HexChessEnvironment;
import org.vizzini.example.boardgame.hexchess.HexChessTeam;

/**
 * Provides tests for the <code>HexChessEnvironmentUI</code> class.
 */
public final class MyTestHexChessEnvironmentUI extends JFrame
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
                final MyTestHexChessEnvironmentUI app = new MyTestHexChessEnvironmentUI();
                app.setVisible(true);
            }
        });
    }

    /**
     * Construct this object.
     */
    public MyTestHexChessEnvironmentUI()
    {
        final HexChessEnvironment environment = createEnvironment();
        final HexChessEnvironmentUI appPanel = new HexChessEnvironmentUI(environment);

        setTitle("Vizzini Hex Chess");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(appPanel, BorderLayout.CENTER);
        final Dimension size = new Dimension(700, 750);
        setPreferredSize(size);
        setSize(size);
        setLocationRelativeTo(null);
    }

    /**
     * @return a new environment.
     */
    private HexChessEnvironment createEnvironment()
    {
        final HexChessEnvironment environment = new HexChessEnvironment();

        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(new DefaultAgent("White", "agent white", HexChessTeam.WHITE));
        agents.add(new DefaultAgent("Black", "agent black", HexChessTeam.BLACK));
        environment.placeInitialTokens(agents);

        return environment;
    }
}
