package org.vizzini.starfightersquadrons.swingui;

import java.awt.Color;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.Graphics;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.swing.ImageIcon;
import javax.swing.JPanel;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.CombatAction;
import org.vizzini.starfightersquadrons.Maneuver;
import org.vizzini.starfightersquadrons.ManeuverAction;
import org.vizzini.starfightersquadrons.Phase;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.ShipBase;
import org.vizzini.starfightersquadrons.ShipDestroyedAction;
import org.vizzini.starfightersquadrons.ShipFledAction;
import org.vizzini.starfightersquadrons.SSEngine;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;

/**
 * Provides a play area user interface for Starfighter Squadrons.
 */
public final class PlayAreaUI extends JPanel
{
    /** Image utilities. */
    private static final ImageUtilities IMAGE_UTILS = new ImageUtilities();

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Preferred size. */
    private static final Dimension PREFERRED_SIZE = new Dimension(SSPosition.MAX_X, SSPosition.MAX_Y);

    /** Audio player. */
    private final AudioPlayer audioPlayer = new AudioPlayer();

    /** Background image. */
    private final ImageIcon backgroundImage;

    /** Environment. */
    private final SSEnvironment environment;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Map of ship to image icon. */
    private Map<Ship, ImageIcon> shipToImage = new HashMap<Ship, ImageIcon>();

    /** Map of token to token UI. */
    private final Map<SSToken, ShipUI> tokenToUI = new HashMap<SSToken, ShipUI>();

    /**
     * Construct this object.
     *
     * @param engine Engine.
     * @param environment Environment.
     */
    @SuppressWarnings("hiding")
    public PlayAreaUI(final SSEngine engine, final SSEnvironment environment)
    {
        super();

        InputValidator.validateNotNull("engine", engine);
        InputValidator.validateNotNull("environment", environment);

        this.environment = environment;

        setLayout(null);
        setBackground(Color.BLUE);
        backgroundImage = IMAGE_UTILS.createPlayAreaBackground();

        setTokens(environment.getTokensForActivation());

        environment.addPhaseListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Phase newValue = (Phase)event.getNewValue();

                if (newValue == Phase.PLANNING_END)
                {
                    delay(1000);
                }
                else if (newValue == Phase.ACTIVATION_END)
                {
                    delay(1000);

                    // End of Activation Phase: clear maneuver widgets.
                    removeManeuverUIs();
                }
                else if (newValue == Phase.COMBAT_END)
                {
                    delay(1000);

                    // End of Combat Phase: clear laser beam and explosion widgets.
                    removeLaserBeamUIs();
                    removeExplosionUIs();
                }
                else if (newValue == Phase.END_END)
                {
                    delay(1000);
                }
            }
        });

        environment.addPhaseListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Phase phase = (Phase)event.getNewValue();

                if (phase == Phase.COMBAT_DEAL_DAMAGE)
                {
                    removeLaserBeamUIs();

                    final SSEnvironment environment = (SSEnvironment)event.getSource();
                    final SSToken attacker = environment.getActiveToken();
                    final CombatAction action = attacker.getCombatAction();
                    addLaserBeamUI(action);
                    final Ship ship = attacker.getShip();
                    audioPlayer.playLaserClipForShip(ship);
                    delay(1000);
                }
            }
        });

        environment.addUpdateTriggerListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                removeManeuverUIs();

                final List<SSToken> tokens = environment.getTokensForActivation();
                setTokens(tokens);

                updateTokens();
                delay(1000);
            }
        });

        // environment.addManeuverActionListener(new PropertyChangeListener()
        environment.addPhaseListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Phase newValue = (Phase)event.getNewValue();

                if (newValue == Phase.ACTIVATION_EXECUTE_MANEUVER)
                {
                    removeManeuverUIs();

                    final SSEnvironment myEnvironment = (SSEnvironment)event.getSource();
                    final SSToken token = myEnvironment.getActiveToken();
                    final ManeuverAction maneuverAction = token.getManeuverAction();
                    addManeuverUI(maneuverAction);

                    updateTokens();
                    delay(1000);
                }
            }
        });

        environment.addShipDestroyedActionListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                removeExplosionUIs();

                final ShipDestroyedAction action = (ShipDestroyedAction)event.getNewValue();
                removeToken(action.getToken());
                addExplosionUI(action);
                audioPlayer.playExplosionClip();
                delay(1000);

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
    }

    @Override
    public Dimension getPreferredSize()
    {
        return PREFERRED_SIZE;
    }

    @Override
    public void paintComponent(final Graphics g)
    {
        super.paintComponent(g);

        g.drawImage(backgroundImage.getImage(), 0, 0, null);
    }

    /**
     * @param action Ship destroyed action.
     */
    private void addExplosionUI(final ShipDestroyedAction action)
    {
        LOGGER.trace("addExplosionUI() start");

        final SSToken token = action.getToken();
        final SSPosition fromPosition = action.getFromPosition();
        final ShipBase shipBase = token.getShip().getShipBase();
        final ImageIcon image = imageUtils.createExplosionIcon();

        try
        {
            final ExplosionUI explosionUI = new ExplosionUI(fromPosition, shipBase, image);
            add(explosionUI);
            revalidate();
            repaint();
        }
        catch (final RuntimeException ignore)
        {
            // Nothing to do.
        }

        LOGGER.trace("addExplosionUI() end");
    }

    /**
     * @param action Combat action.
     */
    private void addLaserBeamUI(final CombatAction action)
    {
        LOGGER.trace("addLaserBeamUI() start");

        final SSToken attacker = action.getAttacker();
        final SSTeam attackerTeam = attacker.getTeam();
        final SSPosition fromPosition = environment.getPositionFor(attacker);
        final SSPosition toPosition = environment.getPositionFor(action.getDefender());

        try
        {
            final LaserBeamUI laserBeamUI = new LaserBeamUI(attackerTeam, fromPosition, toPosition);
            add(laserBeamUI);
            revalidate();
            repaint();
        }
        catch (final RuntimeException ignore)
        {
            // Nothing to do.
        }

        LOGGER.trace("addLaserBeamUI() end");
    }

    /**
     * @param action Maneuver action.
     */
    private void addManeuverUI(final ManeuverAction action)
    {
        LOGGER.trace("addManeuverUI() start");
        final Maneuver maneuver = action.getManeuver();
        final SSPosition fromPosition = action.getFromPosition();
        final ShipBase shipBase = action.getShipBase();

        try
        {
            final ManeuverUI maneuverUI = new ManeuverUI(maneuver, fromPosition, shipBase);
            add(maneuverUI);
            revalidate();
            repaint();
        }
        catch (final RuntimeException ignore)
        {
            // Nothing to do.
        }

        LOGGER.trace("addManeuverUI() end");
    }

    /**
     * @param position Position.
     * @param prefSize Preferred size.
     *
     * @return the screen X coordinate.
     */
    private int computeScreenX(final SSPosition position, final Dimension prefSize)
    {
        return position.getX() - (prefSize.width / 2);
    }

    /**
     * @param position Position.
     * @param prefSize Preferred size.
     *
     * @return the screen Y coordinate.
     */
    private int computeScreenY(final SSPosition position, final Dimension prefSize)
    {
        return position.getY() - (prefSize.height / 2);
    }

    /**
     * @param total Total delay time.
     */
    private void delay(final long total)
    {
        delay(total, 0, 0);
    }

    /**
     * @param total Total delay time.
     * @param start Task start time.
     * @param end Task end time.
     */
    private void delay(final long total, final long start, final long end)
    {
        final long delay = total - (end - start);

        if (delay > 0)
        {
            try
            {
                Thread.sleep(delay);
            }
            catch (final InterruptedException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * @param ship Ship.
     *
     * @return an image.
     */
    private ImageIcon getShipImage(final Ship ship)
    {
        ImageIcon answer = shipToImage.get(ship);

        if (answer == null)
        {
            answer = IMAGE_UTILS.createShipIcon(ship);

            if ((answer == null) || (answer.getIconWidth() <= 0))
            {
                LOGGER.error("Image missing for ship " + ship.getName());
            }
            else
            {
                shipToImage.put(ship, answer);
            }
        }

        return answer;
    }

    /**
     * Remove <code>ExplosionUI</code>s.
     */
    private void removeExplosionUIs()
    {
        LOGGER.trace("removeExplosionUIs() start");

        for (final Component component : getComponents())
        {
            if (component instanceof ExplosionUI)
            {
                remove(component);
            }
        }

        revalidate();
        repaint();

        LOGGER.trace("removeExplosionUIs() end");
    }

    /**
     * Remove <code>LaserBeamUI</code>s.
     */
    private void removeLaserBeamUIs()
    {
        LOGGER.trace("removeLaserBeamUIs() start");

        for (final Component component : getComponents())
        {
            if (component instanceof LaserBeamUI)
            {
                remove(component);
            }
        }

        revalidate();
        repaint();

        LOGGER.trace("removeLaserBeamUIs() end");
    }

    /**
     * Remove <code>ManeuverUI</code>s.
     */
    private void removeManeuverUIs()
    {
        LOGGER.trace("removeManeuverUIs() start");

        for (final Component component : getComponents())
        {
            if (component instanceof ManeuverUI)
            {
                remove(component);
            }
        }

        revalidate();
        repaint();

        LOGGER.trace("removeManeuverUIs() end");
    }

    /**
     * @param token Token.
     */
    private void removeToken(final SSToken token)
    {
        InputValidator.validateNotNull("token", token);

        final ShipUI shipUI = tokenToUI.get(token);

        if (shipUI != null)
        {
            remove(shipUI);
        }

        tokenToUI.remove(token);

        revalidate();
        repaint();
    }

    /**
     * @param tokens Tokens.
     */
    private void setTokens(final List<SSToken> tokens)
    {
        LOGGER.trace("setTokens() start");
        removeAll();
        tokenToUI.clear();

        for (final SSToken token : tokens)
        {
            final SSPosition position = environment.getPositionFor(token);
            final Ship ship = token.getPilot().getShip();
            final ImageIcon image = getShipImage(ship);
            final ShipUI tokenUI = new ShipUI(token, position.getHeading(), image);
            tokenToUI.put(token, tokenUI);
            final Dimension prefSize = tokenUI.getPreferredSize();
            final int x = computeScreenX(position, prefSize);
            final int y = computeScreenY(position, prefSize);
            tokenUI.setBounds(x, y, prefSize.width, prefSize.height);
            add(tokenUI);
        }

        LOGGER.debug("componentCount = " + getComponentCount());
        LOGGER.trace("setTokens() end");
    }

    /**
     * Update tokens.
     */
    private void updateTokens()
    {
        LOGGER.trace("updateTokens() start");
        final List<SSToken> tokens = environment.getTokensForActivation();

        for (final SSToken token : tokens)
        {
            final SSPosition position = environment.getPositionFor(token);
            final ShipUI tokenUI = tokenToUI.get(token);
            tokenUI.setPosition(position);
        }

        revalidate();
        repaint();

        LOGGER.trace("updateTokens() end");
    }
}
