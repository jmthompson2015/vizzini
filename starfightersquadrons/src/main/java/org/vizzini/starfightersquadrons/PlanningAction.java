package org.vizzini.starfightersquadrons;

import java.util.Collections;
import java.util.Map;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Agent;

/**
 * Provides a planning action for Starfighter Squadrons.
 */
public final class PlanningAction implements Action
{
    /** Agent. */
    private final Agent agent;

    /** Environment. */
    private final SSEnvironment environment;

    /** Map of token to maneuver. */
    private final Map<SSToken, Maneuver> tokenToManeuver;

    /**
     * Construct this object.
     *
     * @param environment Environment.
     * @param agent Agent.
     * @param tokenToAction Map of token to action.
     */
    @SuppressWarnings("hiding")
    public PlanningAction(final SSEnvironment environment, final Agent agent,
            final Map<SSToken, Maneuver> tokenToAction)
    {
        this.environment = environment;
        this.agent = agent;
        this.tokenToManeuver = Collections.unmodifiableMap(tokenToAction);
    }

    @Override
    public boolean doIt()
    {
        throw new RuntimeException("method not used");
    }

    @Override
    public Agent getAgent()
    {
        return agent;
    }

    @Override
    public SSEnvironment getEnvironment()
    {
        return environment;
    }

    /**
     * @param token Token.
     *
     * @return the maneuver action for the given token.
     */
    public Maneuver getManeuver(final SSToken token)
    {
        return tokenToManeuver.get(token);
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
