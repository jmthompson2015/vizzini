package org.vizzini.starfightersquadrons.swingui;

import java.awt.GridLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.ButtonGroup;
import javax.swing.JPanel;
import javax.swing.JRadioButton;

import org.vizzini.starfightersquadrons.AllShipsSquadBuilder;
import org.vizzini.starfightersquadrons.CoreSetSquadBuilder;
import org.vizzini.starfightersquadrons.JMTSquadBuilder;
import org.vizzini.starfightersquadrons.SimpleAgent;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SquadStatistics;
import org.vizzini.starfightersquadrons.Tournament2013SquadBuilder;
import org.vizzini.starfightersquadrons.TournamentLeiden2014SquadBuilder;
import org.vizzini.starfightersquadrons.VeldrinsSquadBuilder;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides a user interface to select a scenario.
 */
public final class ScenarioChooser extends JPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Squad builder key. */
    private static final String SQUAD_BUILDER_KEY = "squadBuilder";

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Selected squad builder. */
    private SquadBuilder selectedSquadBuilder;

    /**
     * Construct this object.
     * 
     * @param team Team.
     */
    public ScenarioChooser(final SSTeam team)
    {
        super();

        setLayout(new GridLayout(0, 1, HGAP, VGAP));

        final ButtonGroup buttonGroup = new ButtonGroup();

        if (team == SSTeam.IMPERIAL)
        {
            add(createRadioButton(VeldrinsSquadBuilder.createImperialHowlingTurr(), buttonGroup));

            add(createRadioButton(Tournament2013SquadBuilder.createImperialDallasParker(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createImperialDanielDeBruijn(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createImperialDavidBergstrom(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createImperialIainHamp(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createImperialJip(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createImperialJosse(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createImperialNeilHoward(), buttonGroup));

            add(createRadioButton(TournamentLeiden2014SquadBuilder.createImperialStephan(), buttonGroup));
            add(createRadioButton(TournamentLeiden2014SquadBuilder.createImperialPiers(), buttonGroup));
            add(createRadioButton(TournamentLeiden2014SquadBuilder.createImperialFrans(), buttonGroup));
            add(createRadioButton(TournamentLeiden2014SquadBuilder.createImperialAndrei(), buttonGroup));

            add(createRadioButton(JMTSquadBuilder.createImperial(), buttonGroup));

            selectedSquadBuilder = CoreSetSquadBuilder.createImperial();
            final JRadioButton radioButton = createRadioButton(selectedSquadBuilder, buttonGroup);
            add(radioButton);
            radioButton.setSelected(true);

            add(createRadioButton(AllShipsSquadBuilder.createImperial(), buttonGroup));
        }
        else if (team == SSTeam.REBEL)
        {
            add(createRadioButton(VeldrinsSquadBuilder.createRebelChewieBlues(), buttonGroup));
            add(createRadioButton(VeldrinsSquadBuilder.createRebelVeldrinsSquad(), buttonGroup));

            add(createRadioButton(Tournament2013SquadBuilder.createRebelBrandonBarthel(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createRebelIvanPastor(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createRebelJimBlakley(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createRebelJonathanGomes(), buttonGroup));
            add(createRadioButton(Tournament2013SquadBuilder.createRebelPaulHeaver(), buttonGroup));

            add(createRadioButton(TournamentLeiden2014SquadBuilder.createRebelToby(), buttonGroup));
            add(createRadioButton(TournamentLeiden2014SquadBuilder.createRebelOnno(), buttonGroup));

            add(createRadioButton(JMTSquadBuilder.createRebel(), buttonGroup));

            selectedSquadBuilder = CoreSetSquadBuilder.createRebel();
            final JRadioButton radioButton = createRadioButton(selectedSquadBuilder, buttonGroup);
            add(radioButton);
            radioButton.setSelected(true);

            add(createRadioButton(AllShipsSquadBuilder.createRebel(), buttonGroup));
        }

        {
            final JRadioButton radioButton = createRadioButton("Custom Squad", null);
            buttonGroup.add(radioButton);
            add(radioButton);
        }
    }

    /**
     * @return the selectedSquadBuilder
     */
    public SquadBuilder getSelectedSquadBuilder()
    {
        return selectedSquadBuilder;
    }

    /**
     * @param squadBuilder Squad builder.
     * @param buttonGroup Button group.
     * 
     * @return a new radio button.
     */
    private JRadioButton createRadioButton(final SquadBuilder squadBuilder, final ButtonGroup buttonGroup)
    {
        final SSAgent agent = new SimpleAgent(squadBuilder.getTeam().getName(), squadBuilder.getTeam(), squadBuilder);
        final SquadStatistics squadStatistics = new SquadStatistics(squadBuilder.buildSquad(agent));

        final String text = squadBuilder.getDescription() + ": " + squadStatistics.getSquadPointCost() + " points";
        final JRadioButton radioButton = createRadioButton(text, squadBuilder);
        buttonGroup.add(radioButton);

        return radioButton;
    }

    /**
     * @param text Text.
     * @param squadBuilder Squad builder.
     * 
     * @return a new radio button.
     */
    private JRadioButton createRadioButton(final String text, final SquadBuilder squadBuilder)
    {
        final JRadioButton answer = new JRadioButton(text);

        answer.setName(text);
        answer.putClientProperty(SQUAD_BUILDER_KEY, squadBuilder);

        answer.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final JRadioButton source = (JRadioButton)event.getSource();
                final SquadBuilder mySquadBuilder = (SquadBuilder)source.getClientProperty(SQUAD_BUILDER_KEY);
                selectedSquadBuilder = mySquadBuilder;
            }
        });

        return answer;
    }
}
