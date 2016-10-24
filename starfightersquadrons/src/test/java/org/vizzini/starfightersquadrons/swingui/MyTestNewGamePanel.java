package org.vizzini.starfightersquadrons.swingui;

import static org.junit.Assert.assertNotNull;

import java.awt.EventQueue;

import javax.swing.JFrame;

import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.swingui.NewGamePanel;
import org.vizzini.starfightersquadrons.swingui.SSAgentFactory;

/**
 * Provides tests for the <code>NewGamePanel</code> class.
 */
public final class MyTestNewGamePanel
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
                new MyTestNewGamePanel();
            }
        });
    }

    /**
     * Construct this object.
     */
    public MyTestNewGamePanel()
    {
        final SSAgentFactory agentFactory = new SSAgentFactory();

        final JFrame parentComponent = null;
        final NewGamePanel message = new NewGamePanel(parentComponent, agentFactory);
        NewGamePanel.showDialog(parentComponent, message);

        final SSAgent firstAgent = message.getFirstAgent();
        System.out.println("firstAgent = " + firstAgent);
        assertNotNull(firstAgent);

        final SSAgent secondAgent = message.getSecondAgent();
        System.out.println("secondAgent = " + secondAgent);
        assertNotNull(secondAgent);

        final SquadBuilder imperialSquadBuilder = message.getSelectedImperialSquadBuilder();
        System.out.println("imperialSquadBuilder = " + imperialSquadBuilder);
        assertNotNull(imperialSquadBuilder);

        final SquadBuilder rebelSquadBuilder = message.getSelectedRebelSquadBuilder();
        System.out.println("rebelSquadBuilder = " + rebelSquadBuilder);
        assertNotNull(rebelSquadBuilder);
    }
}
