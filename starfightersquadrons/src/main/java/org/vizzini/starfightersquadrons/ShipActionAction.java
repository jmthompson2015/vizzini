package org.vizzini.starfightersquadrons;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;

/**
 * Provides an action for the ship action at the end of the activation phase.
 */
public final class ShipActionAction implements Action
{
    /** Attacker. */
    private final SSToken attacker;

    /** Defender. */
    private SSToken defender;

    /** Environment. */
    private final SSEnvironment environment;

    /** Maneuver action. */
    private final ManeuverAction maneuverAction;

    /** Ship action. */
    private final ShipAction shipAction;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param token Token.
     * @param shipAction Ship action.
     */
    @SuppressWarnings("hiding")
    public ShipActionAction(final SSEnvironment environment, final SSToken token, final ShipAction shipAction)
    {
        this(environment, token, shipAction, null, null);
    }

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     * @param attacker Attacker.
     * @param shipAction Ship action.
     * @param defender Defender. (only required for ShipAction.TARGET_LOCK)
     * @param maneuverAction Maneuver action. (only required for ShipAction.BARREL_ROLL or ShipAction.BOOST)
     */
    @SuppressWarnings("hiding")
    public ShipActionAction(final SSEnvironment environment, final SSToken attacker, final ShipAction shipAction,
            final SSToken defender, final ManeuverAction maneuverAction)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("shipAction", shipAction);

        if ((shipAction == ShipAction.TARGET_LOCK) && (defender == null))
        {
            throw new IllegalArgumentException("defender is null for " + ShipAction.TARGET_LOCK);
        }

        if ((shipAction == ShipAction.BARREL_ROLL) && (maneuverAction == null))
        {
            throw new IllegalArgumentException("maneuverAction is null for " + ShipAction.BARREL_ROLL);
        }

        if ((shipAction == ShipAction.BOOST) && (maneuverAction == null))
        {
            throw new IllegalArgumentException("maneuverAction is null for " + ShipAction.BOOST);
        }

        this.environment = environment;
        this.attacker = attacker;
        this.shipAction = shipAction;
        this.defender = defender;
        this.maneuverAction = maneuverAction;
    }

    @Override
    public boolean doIt()
    {
        attacker.setShipActionAction(this);

        shipAction.doAction(environment, attacker, defender, maneuverAction);

        environment.setPhase(Phase.ACTIVATION_PERFORM_ACTION);

        return false;
    }

    @Override
    public SSAgent getAgent()
    {
        return attacker.getAgent();
    }

    /**
     * @return the attacker
     */
    public SSToken getAttacker()
    {
        return attacker;
    }

    /**
     * @return the defender
     */
    public SSToken getDefender()
    {
        return defender;
    }

    @Override
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @return the maneuverAction
     */
    public ManeuverAction getManeuverAction()
    {
        return maneuverAction;
    }

    /**
     * @return the shipAction
     */
    public ShipAction getShipAction()
    {
        return shipAction;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }

    @Override
    public boolean undoIt()
    {
        throw new RuntimeException("method not used");
    }
}
