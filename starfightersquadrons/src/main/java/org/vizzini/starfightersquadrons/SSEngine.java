package org.vizzini.starfightersquadrons;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Engine;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Team;
import org.vizzini.starfightersquadrons.swingui.WeaponAndDefenderChooser.WeaponAndDefender;

/**
 * Provides an engine for Starfighter Squadrons.
 */
public final class SSEngine implements Engine
{
    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Winner property name. */
    private static final String WINNER_PROPERTY = "winner";

    /** Adjudicator. */
    private SSAdjudicator adjudicator;

    /** Description. */
    private final String description = "A Starfighter Squadrons engine.";

    /** Environment. */
    private SSEnvironment environment;

    /** Planning action. */
    private PlanningAction imperialPlanningAction;

    /** Flag indicating if this is paused. */
    private boolean isPaused;

    /** Thread monitor. */
    private final Object monitor = new Object();

    /** Name. */
    private final String name = "X-Wing Engine";

    /** Property change support. */
    private transient PropertyChangeSupport propertyChangeSupport;

    /** Planning action. */
    private PlanningAction rebelPlanningAction;

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addWinnerListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(WINNER_PROPERTY, listener);
    }

    /**
     * @return the adjudicator
     */
    public SSAdjudicator getAdjudicator()
    {
        return adjudicator;
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    /**
     * @return the environment
     */
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    @Override
    public String getName()
    {
        return name;
    }

    /**
     * Pause the engine.
     */
    public void pause()
    {
        isPaused = true;

        LOGGER.debug("pause() isPaused ? " + isPaused);
    }

    /**
     * Resume the engine.
     */
    public void resume()
    {
        isPaused = false;

        synchronized (monitor)
        {
            isPaused = false;

            LOGGER.debug("resume() isPaused ? " + isPaused);

            monitor.notify();
        }
    }

    @SuppressWarnings("hiding")
    @Override
    public void start(final Environment environment, final Adjudicator adjudicator, final List<Team> teams,
            final List<Agent> agents)
    {
        this.environment = (SSEnvironment)environment;
        this.adjudicator = (SSAdjudicator)adjudicator;

        environment.placeInitialTokens(agents);

        delay(3000);

        while (!adjudicator.isGameOver(environment))
        {
            performPlanningPhase();
            checkPaused();

            if (!adjudicator.isGameOver(environment))
            {
                performActivationPhase();
                checkPaused();
            }

            if (!adjudicator.isGameOver(environment))
            {
                performCombatPhase();
                checkPaused();
            }

            if (!adjudicator.isGameOver(environment))
            {
                performEndPhase();
                checkPaused();
            }
        }

        processGameOver();
    }

    /**
     * Check the paused flag.
     */
    private void checkPaused()
    {
        LOGGER.debug("checkPaused() isPaused ? " + isPaused);

        if (isPaused)
        {
            synchronized (monitor)
            {
                try
                {
                    monitor.wait();
                }
                catch (final InterruptedException e)
                {
                    throw new RuntimeException(e);
                }
            }
        }
    }

    /**
     * @param delay Total delay time.
     */
    private void delay(final long delay)
    {
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
     * @return propertyChangeSupport
     */
    private PropertyChangeSupport getPropertyChangeSupport()
    {
        if (propertyChangeSupport == null)
        {
            propertyChangeSupport = new PropertyChangeSupport(this);
        }

        return propertyChangeSupport;
    }

    /**
     * Activation Phase
     * <ol>
     * <li>Reveal Dial</li>
     * <li>Set Template</li>
     * <li>Execute Maneuver</li>
     * <li>Check Pilot Stress</li>
     * <li>Clean Up</li>
     * <li>Perform Action</li>
     * </ol>
     */
    private void performActivationPhase()
    {
        environment.setPhase(Phase.ACTIVATION_START);

        final List<SSToken> activationTokens = environment.getTokensForActivation();

        for (final SSToken token : activationTokens)
        {
            environment.setActiveToken(token);
            final SSAgent agent = token.getAgent();

            if (adjudicator.canDecloak(token))
            {
                // Does the agent want to decloak?
                final Maneuver maneuver = agent.chooseDecloakManeuver(environment, adjudicator, token);

                if (maneuver != null)
                {
                    LOGGER.info("decloak maneuver = " + maneuver);
                    final SSPosition fromPosition = environment.getPositionFor(token);
                    final ShipBase shipBase = token.getShip().getShipBase();
                    final ManeuverAction maneuverAction = new ManeuverAction(environment, maneuver, fromPosition,
                            shipBase);
                    LOGGER.trace("maneuverAction = " + maneuverAction);
                    maneuverAction.doIt();
                    token.decreaseCloakCount();
                }
            }

            // Perform activation steps.
            LOGGER.debug("Activation: " + token.getName());
            final Maneuver maneuver = token.getTeam() == SSTeam.IMPERIAL ? imperialPlanningAction.getManeuver(token)
                    : rebelPlanningAction.getManeuver(token);

            if (maneuver != null)
            {
                LOGGER.info("maneuver = " + maneuver);
                final SSPosition fromPosition = environment.getPositionFor(token);

                if (fromPosition != null)
                {
                    final ShipBase shipBase = token.getShip().getShipBase();
                    final ManeuverAction maneuverAction = new ManeuverAction(environment, maneuver, fromPosition,
                            shipBase);
                    LOGGER.trace("maneuverAction = " + maneuverAction);
                    maneuverAction.doIt();

                    if (adjudicator.canSelectShipAction(token))
                    {
                        final ShipActionAction shipActionAction = agent.getShipActionAction(environment, adjudicator,
                                token);

                        if (shipActionAction != null)
                        {
                            LOGGER.debug("shipActionAction = " + shipActionAction);
                            shipActionAction.doIt();
                        }
                    }
                }
            }
        }

        imperialPlanningAction = null;
        rebelPlanningAction = null;

        environment.setActiveToken(null);
        environment.setPhase(Phase.ACTIVATION_END);
    }

    /**
     * Combat Phase
     * <ol>
     * <li>Declare Target</li>
     * <li>Roll Attack Dice</li>
     * <li>Modify Attack Dice</li>
     * <li>Roll Defense Dice</li>
     * <li>Modify Defense Dice</li>
     * <li>Compare Results</li>
     * <li>Deal Damage</li>
     * </ol>
     */
    private void performCombatPhase()
    {
        environment.setPhase(Phase.COMBAT_START);

        final List<SSToken> combatTokens = environment.getTokensForCombat();

        for (final SSToken attacker : combatTokens)
        {
            environment.setActiveToken(attacker);

            if (adjudicator.canAttack(attacker))
            {
                // Perform combat steps.
                LOGGER.info("attacker = " + attacker.getName());

                // Declare target.
                final SSAgent agent = attacker.getAgent();
                final WeaponAndDefender weaponAndDefender = agent.chooseWeaponAndDefender(environment, adjudicator,
                        attacker);

                if (weaponAndDefender != null)
                {
                    LOGGER.info("weaponAndDefender = " + weaponAndDefender);
                    final Weapon weapon = weaponAndDefender.getWeapon();
                    attacker.setWeapon(weapon);
                    final SSToken defender = weaponAndDefender.getDefender();
                    attacker.setDefender(defender);
                    environment.setPhase(Phase.COMBAT_DECLARE_TARGET);

                    final CombatAction combatAction = new CombatAction(environment, adjudicator, attacker, weapon,
                            defender);
                    LOGGER.trace("combatAction = " + combatAction);
                    combatAction.doIt();
                }
            }
        }

        environment.setActiveToken(null);
        environment.setPhase(Phase.COMBAT_END);
    }

    /**
     * Perform end phase.
     */
    private void performEndPhase()
    {
        environment.setPhase(Phase.END_START);

        final List<SSToken> combatTokens = environment.getTokensForCombat();

        for (final SSToken token : combatTokens)
        {
            environment.setActiveToken(token);

            // Perform end steps.
            LOGGER.debug("End       : " + token.getName());

            token.clearEvadeCount();

            if (!token.isUpgradedWith(UpgradeCard.MOLDY_CROW))
            {
                token.clearFocusCount();
            }
        }

        environment.setActiveToken(null);
        environment.setPhase(Phase.END_END);
    }

    /**
     * Perform planning phase.
     */
    private void performPlanningPhase()
    {
        environment.incrementRound();
        environment.setPhase(Phase.PLANNING_START);

        final SSAgent imperialAgent = environment.getImperialAgent();
        final SSAgent rebelAgent = environment.getRebelAgent();

        // TODO: can planning be done in parallel?
        imperialPlanningAction = imperialAgent.getPlanningAction(environment, adjudicator);
        LOGGER.debug("imperialPlanningAction = " + imperialPlanningAction);
        rebelPlanningAction = rebelAgent.getPlanningAction(environment, adjudicator);
        LOGGER.debug("rebelPlanningAction = " + rebelPlanningAction);

        environment.setPhase(Phase.PLANNING_END);
    }

    /**
     * @return the game winner, if any.
     */
    private Agent processGameOver()
    {
        final Agent winner = adjudicator.determineWinner(environment);

        getPropertyChangeSupport().firePropertyChange(WINNER_PROPERTY, null, winner);

        return winner;
    }
}
