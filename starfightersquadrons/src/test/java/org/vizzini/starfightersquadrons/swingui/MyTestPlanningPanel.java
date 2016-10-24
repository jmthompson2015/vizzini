package org.vizzini.starfightersquadrons.swingui;

import static org.junit.Assert.assertNotNull;

import java.awt.Component;
import java.awt.EventQueue;
import java.util.ArrayList;
import java.util.List;

import javax.swing.JOptionPane;

import org.vizzini.core.game.Agent;
import org.vizzini.starfightersquadrons.AllShipsSquadBuilder;
import org.vizzini.starfightersquadrons.PlanningAction;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.TestData;
import org.vizzini.starfightersquadrons.SSAdjudicator;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.swingui.PlanningPanel;

/**
 * Provides tests for the <code>PlanningPanel</code> class.
 */
public final class MyTestPlanningPanel
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
                new MyTestPlanningPanel();
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestPlanningPanel()
    {
        final SSEnvironment environment = createEnvironment();
        final SSAdjudicator adjudicator = new SSAdjudicator();
        final SSAgent rebelAgent = environment.getRebelAgent();

        final Component parentComponent = null;
        final String title = "Select Maneuvers";
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;

        final PlanningPanel message = new PlanningPanel(environment, adjudicator, rebelAgent);
        final int result = JOptionPane.showConfirmDialog(parentComponent, message, title, optionType, messageType);

        // Modal dialog blocks until done.

        PlanningAction planningAction = null;

        if (result == JOptionPane.OK_OPTION)
        {
            planningAction = message.getPlanningAction();
        }

        assertNotNull(planningAction);
    }

    /**
     * @return a new environment.
     */
    private SSEnvironment createEnvironment()
    {
        final SSAgent imperialAgent = testData.createImperialAgent();
        final SSAgent rebelAgent = testData.createRebelAgent();
        final SSEnvironment environment = new SSEnvironment();

        final List<Agent> agents = new ArrayList<Agent>();
        agents.add(imperialAgent);
        agents.add(rebelAgent);
        environment.placeInitialTokens(agents);

        final SquadBuilder imperialSquadBuilder = AllShipsSquadBuilder.createImperial();
        final List<SSToken> imperialTokens = imperialSquadBuilder.buildSquad(imperialAgent);
        placeTokens(environment, imperialTokens);
        final SquadBuilder rebelSquadBuilder = AllShipsSquadBuilder.createRebel();
        final List<SSToken> rebelTokens = rebelSquadBuilder.buildSquad(rebelAgent);
        rebelTokens.remove(rebelTokens.size() - 1);
        // for (int i = 0; i < rebelTokens.size(); i++)
        // {
        // System.out.println("rebelTokens.get(" + i + ") = " + rebelTokens.get(i));
        // }
        rebelTokens.get(5).increaseStressCount();
        placeTokens(environment, rebelTokens);

        return environment;
    }

    /**
     * @param environment Environment.
     * @param tokens Tokens.
     */
    private void placeTokens(final SSEnvironment environment, final List<SSToken> tokens)
    {
        final boolean isImperial = tokens.get(0).getTeam() == SSTeam.IMPERIAL;

        final int size = tokens.size();
        final int dx = SSPosition.MAX_X / (size + 1);
        int i = 1;
        final int heading = isImperial ? 90 : -90;

        for (final SSToken token : tokens)
        {
            final Ship ship = token.getShip();
            final int x = i * dx;
            int y = (ship.getShipBase().getRectangle().height / 2);

            if (!isImperial)
            {
                y = SSPosition.MAX_Y - y;
            }

            final SSPosition position = new SSPosition(x, y, heading);
            environment.placeToken(position, token);
            i++;
        }
    }
}
