package org.vizzini.starfightersquadrons.swingui;

import static org.junit.Assert.assertNotNull;

import java.awt.EventQueue;
import java.util.List;

import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.swingui.SquadBuilderPanel;

/**
 * Provides tests for the <code>ModifyAttackDiceUI</code> class.
 */
public final class MyTestSquadBuilderPanel
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
                new MyTestSquadBuilderPanel();
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestSquadBuilderPanel()
    {
        final SSAgent agent = testData.createImperialAgent();

        final List<SSToken> tokens = SquadBuilderPanel.showDialog(null, agent);

        assertNotNull(tokens);

        System.out.println("\nTokens:");

        final int size = tokens.size();

        for (int i = 0; i < size; i++)
        {
            System.out.println(i + " " + tokens.get(i));
        }
    }
}
