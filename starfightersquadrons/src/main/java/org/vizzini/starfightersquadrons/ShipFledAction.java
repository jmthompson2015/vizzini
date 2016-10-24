package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.core.InputValidator;
import org.vizzini.core.game.Action;

/**
 * Provides a ship fled action for Starfighter Squadrons.
 */
public final class ShipFledAction implements Action
{
    /** Environment. */
    private final SSEnvironment environment;

    /** From position. */
    private final SSPosition fromPosition;

    /** Token. */
    private final SSToken token;

    /**
     * Construct this object.
     *
     * @param environment Environment.
     * @param token Token.
     * @param fromPosition From position.
     */
    @SuppressWarnings("hiding")
    public ShipFledAction(final SSEnvironment environment, final SSToken token, final SSPosition fromPosition)
    {
        InputValidator.validateNotNull("environment", environment);
        InputValidator.validateNotNull("token", token);
        InputValidator.validateNotNull("fromPosition", fromPosition);

        this.environment = environment;
        this.token = token;
        this.fromPosition = fromPosition;
    }

    @Override
    public boolean doIt()
    {
        final TargetLock attackerTargetLock = token.getAttackerTargetLock();

        if (attackerTargetLock != null)
        {
            TargetLock.freeInstance(attackerTargetLock);
        }

        final List<TargetLock> defenderTargetLocks = new ArrayList<TargetLock>(token.getDefenderTargetLocks());

        for (final TargetLock defenderTargetLock : defenderTargetLocks)
        {
            TargetLock.freeInstance(defenderTargetLock);
        }

        // Return the damage cards.
        environment.discardAllDamage(token.getDamages());
        environment.discardAllDamage(token.getCriticalDamages());

        environment.removeToken(fromPosition);
        environment.fireShipFledActionPropertyChange(null, this);

        return true;
    }

    @Override
    public SSAgent getAgent()
    {
        return token.getAgent();
    }

    @Override
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @return the fromPosition
     */
    public SSPosition getFromPosition()
    {
        return fromPosition;
    }

    /**
     * @return the token
     */
    public SSToken getToken()
    {
        return token;
    }

    @Override
    public boolean undoIt()
    {
        environment.placeToken(fromPosition, token);
        environment.fireShipFledActionPropertyChange(null, this);

        return true;
    }
}
