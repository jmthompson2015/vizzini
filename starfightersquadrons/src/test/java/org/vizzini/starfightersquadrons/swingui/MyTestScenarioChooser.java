package org.vizzini.starfightersquadrons.swingui;

import static org.junit.Assert.assertNotNull;

import java.awt.Component;
import java.awt.EventQueue;

import javax.swing.Icon;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.swingui.ScenarioChooser;

/**
 * Provides tests for the <code>ScenarioChooser</code> class.
 */
public final class MyTestScenarioChooser extends JFrame
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
                new MyTestScenarioChooser();
            }
        });
    }

    /**
     * Construct this object.
     */
    public MyTestScenarioChooser()
    {
        final Component parentComponent = null;
        final ScenarioChooser message = new ScenarioChooser(SSTeam.IMPERIAL);
        final String title = "Select Scenario";
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;
        final Icon icon = null;
        final String[] options = { "OK" };
        final String initialValue = null;

        JOptionPane.showOptionDialog(parentComponent, message, title, optionType, messageType, icon, options,
                initialValue);

        // Modal dialog blocks until done.

        final SquadBuilder squadBuilder = message.getSelectedSquadBuilder();
        System.out.println("squadBuilder = " + squadBuilder);
        assertNotNull(squadBuilder);
    }
}
