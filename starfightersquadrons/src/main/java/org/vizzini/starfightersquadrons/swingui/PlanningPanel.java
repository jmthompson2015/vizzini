package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.FlowLayout;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.swing.BorderFactory;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.SwingConstants;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverSet;
import org.vizzini.starfightersquadrons.PlanningAction;
import org.vizzini.starfightersquadrons.TokenCombatComparator;
import org.vizzini.starfightersquadrons.SSAdjudicator;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to create the planning action.
 */
public final class PlanningPanel extends JPanel
{
    /** Grid color. */
    private static final Color GRID_COLOR = Color.BLACK;

    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Adjudicator. */
    private final SSAdjudicator adjudicator;

    /** Agent. */
    private final SSAgent agent;

    /** Environment. */
    private final SSEnvironment environment;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Map of token to maneuver widget. */
    private final Map<SSToken, ManeuverChooser> tokenToManeuversUI = new HashMap<SSToken, ManeuverChooser>();

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    public PlanningPanel(final SSEnvironment environment, final SSAdjudicator adjudicator, final SSAgent agent)
    {
        super();

        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("adjudicator", adjudicator);
        InputValidator.validateNotNull("agent", agent);

        this.environment = environment;
        this.adjudicator = adjudicator;
        this.agent = agent;

        setLayout(new BorderLayout());
        add(new JScrollPane(createPlanningPanel()), BorderLayout.CENTER);
    }

    /**
     * @return the adjudicator
     */
    public SSAdjudicator getAdjudicator()
    {
        return adjudicator;
    }

    /**
     * @return the agent
     */
    public SSAgent getAgent()
    {
        return agent;
    }

    /**
     * @return the environment
     */
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @return a new planning action.
     */
    public PlanningAction getPlanningAction()
    {
        PlanningAction answer = null;

        final Map<SSToken, Maneuver> tokenToManeuver = new HashMap<SSToken, Maneuver>();

        for (final Entry<SSToken, ManeuverChooser> entry : tokenToManeuversUI.entrySet())
        {
            final SSToken token = entry.getKey();
            final ManeuverChooser maneuverChooser = entry.getValue();
            final Maneuver maneuver = maneuverChooser.getSelectedManeuver();

            if (maneuver != null)
            {
                tokenToManeuver.put(token, maneuver);
            }
        }

        if (tokenToManeuversUI.size() == tokenToManeuver.size())
        {
            answer = new PlanningAction(environment, agent, tokenToManeuver);
        }

        return answer;
    }

    /**
     * @param token Token.
     * 
     * @return a new widget.
     */
    private ManeuverChooser createManeuverChooser(final SSToken token)
    {
        final String shipName = token.getShip().getName();
        final ManeuverSet maneuverSet = token.getManeuvers();
        final boolean isEditable = true;

        final ManeuverChooser answer = new ManeuverChooser(shipName, maneuverSet, isEditable);

        return answer;
    }

    /**
     * @param token Token.
     * 
     * @return a new widget.
     */
    private JLabel createNameLabel(final SSToken token)
    {
        final JLabel answer = new JLabel(token.getPilotName());

        answer.setOpaque(true);
        answer.setHorizontalAlignment(SwingConstants.CENTER);
        answer.setVerticalAlignment(SwingConstants.CENTER);
        answer.setVerticalTextPosition(SwingConstants.CENTER);

        return answer;
    }

    /**
     * @return a new widget.
     */
    private JPanel createPlanningPanel()
    {
        final List<SSToken> tokens = environment.getAttackers((SSTeam)agent.getTeam());
        Collections.sort(tokens, new TokenCombatComparator());

        final int columns = 2 * (int)Math.ceil((1.0 * tokens.size()) / 5);
        final JPanel answer = new JPanel(new GridLayout2(0, columns, HGAP, VGAP));
        answer.setBackground(GRID_COLOR);
        answer.setBorder(BorderFactory.createLineBorder(GRID_COLOR, HGAP));

        for (final SSToken token : tokens)
        {
            final ManeuverChooser maneuverChooser = createManeuverChooser(token);
            tokenToManeuversUI.put(token, maneuverChooser);

            final JPanel panel = new JPanel(new GridLayout2(2, 1, 0, 0));
            panel.add(createNameLabel(token));
            panel.add(createShipImage(token));
            panel.setBorder(BorderFactory.createEmptyBorder(0, 3, 0, 3));

            answer.add(panel);
            answer.add(wrap(maneuverChooser));
        }

        return answer;
    }

    /**
     * @param token Token.
     * 
     * @return a new widget.
     */
    private JLabel createShipImage(final SSToken token)
    {
        final JLabel answer = new JLabel(imageUtils.createShipIcon(token.getShip()));

        return answer;
    }

    /**
     * @param component Component.
     * 
     * @return a new panel which wraps the given component.
     */
    private JPanel wrap(final JComponent component)
    {
        final JPanel answer = new JPanel(new FlowLayout(FlowLayout.CENTER, 0, 0));

        answer.add(component);

        return answer;
    }
}
