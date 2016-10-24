package org.vizzini.starfightersquadrons.swingui;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.JPanel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.ShipDestroyedAction;
import org.vizzini.starfightersquadrons.ShipFledAction;
import org.vizzini.starfightersquadrons.TokenCombatComparator;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a pilots user interface for Starfighter Squadrons.
 */
public final class PilotsUI extends JPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 2;

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Team. */
    private final SSTeam team;

    /** Map of token to token UI. */
    private final Map<SSToken, PilotCardUI> tokenToUI = new HashMap<SSToken, PilotCardUI>();

    /**
     * Construct this object.
     *
     * @param environment Environment.
     * @param team Team.
     */
    @SuppressWarnings("hiding")
    public PilotsUI(final SSEnvironment environment, final SSTeam team)
    {
        super();

        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("team", team);

        this.team = team;

        setLayout(new GridLayout2(0, 1, HGAP, VGAP));
        setTokens(environment.getAttackers(team));

        environment.addUpdateTriggerListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final boolean isChanged = getPilotCount() != environment.getTokenCountFor(team);

                if (isChanged)
                {
                    setTokens(environment.getAttackers(team));
                }
            }
        });

        environment.addShipDestroyedActionListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final ShipDestroyedAction action = (ShipDestroyedAction)event.getNewValue();
                removeToken(action.getToken());
            }
        });

        environment.addShipFledActionListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final ShipFledAction action = (ShipFledAction)event.getNewValue();
                removeToken(action.getToken());
            }
        });

        revalidate();
        repaint();
    }

    /**
     * @return the team
     */
    public SSTeam getTeam()
    {
        return team;
    }

    /**
     * @return the number of pilots.
     */
    private int getPilotCount()
    {
        return tokenToUI.size();
    }

    /**
     * @param token Token.
     */
    private void removeToken(final SSToken token)
    {
        InputValidator.validateNotNull("token", token);

        final PilotCardUI pilotCardUI = tokenToUI.get(token);

        if (pilotCardUI != null)
        {
            remove(pilotCardUI);
            tokenToUI.remove(token);

            revalidate();
            repaint();
        }
    }

    /**
     * @param tokens Tokens.
     */
    private void setTokens(final List<SSToken> tokens)
    {
        removeAll();
        tokenToUI.clear();

        Collections.sort(tokens, new TokenCombatComparator());

        for (final SSToken token : tokens)
        {
            final PilotCardUI tokenUI = new PilotCardUI(token);
            tokenToUI.put(token, tokenUI);
            add(tokenUI);
        }

        LOGGER.debug(team.getName() + " tokenToUI.size() = " + tokenToUI.size());

        revalidate();
        repaint();
    }
}
