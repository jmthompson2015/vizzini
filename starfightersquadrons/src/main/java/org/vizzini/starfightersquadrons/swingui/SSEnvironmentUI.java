package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.JComponent;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.ScrollPaneConstants;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.ShipFledAction;
import org.vizzini.starfightersquadrons.SSEngine;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.swingui.game.EnvironmentUI;

/**
 * Provides an environment user interface for Starfighter Squadrons.
 */
public final class SSEnvironmentUI extends JPanel implements EnvironmentUI
{
    /** Horizontal gap. */
    private static final int HGAP = 2;

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Environment. */
    private final SSEnvironment environment;

    /** Imperial pilots widget. */
    private final PilotsUI imperialPilotsUI;

    /** Play area widget. */
    private final PlayAreaUI playAreaUI;

    /** Rebel pilots widget. */
    private final PilotsUI rebelPilotsUI;

    /**
     * Construct this object.
     *
     * @param engine Engine.
     * @param environment Environment.
     */
    @SuppressWarnings("hiding")
    public SSEnvironmentUI(final SSEngine engine, final SSEnvironment environment)
    {
        super();

        InputValidator.validateNotNull("engine", engine);
        InputValidator.validateNotNull("environment", environment);

        this.environment = environment;
        this.playAreaUI = new PlayAreaUI(engine, environment);
        this.imperialPilotsUI = new PilotsUI(environment, SSTeam.IMPERIAL);
        this.rebelPilotsUI = new PilotsUI(environment, SSTeam.REBEL);

        setLayout(new BorderLayout(HGAP, VGAP));

        add(new JScrollPane(wrap(imperialPilotsUI), ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED), BorderLayout.WEST);
        add(playAreaUI, BorderLayout.CENTER);
        add(new JScrollPane(wrap(rebelPilotsUI), ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS,
                ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED), BorderLayout.EAST);

        environment.addShipFledActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final ShipFledAction action = (ShipFledAction)event.getNewValue();
                final SSToken token = action.getToken();
                JOptionPane.showMessageDialog(SSEnvironmentUI.this, "Ship fled the battlefield: " + token.getName());
            }
        });
    }

    @Override
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @param component Component.
     *
     * @return a new panel containing the given component.
     */
    private JPanel wrap(final JComponent component)
    {
        final JPanel answer = new JPanel();

        answer.add(component);

        return answer;
    }
}
