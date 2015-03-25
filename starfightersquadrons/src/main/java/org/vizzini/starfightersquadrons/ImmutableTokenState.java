package org.vizzini.starfightersquadrons;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides an immutable token state.
 */
public final class ImmutableTokenState implements TokenState
{
    /** Cloak token count. */
    private final int cloakCount;

    /** Critical damage token count. */
    private int criticalDamageCount;

    /** Damage token count. */
    private final int damageCount;

    /** Evade token count. */
    private final int evadeCount;

    /** Focus token count. */
    private final int focusCount;

    /** Ion token count. */
    private final int ionCount;

    /** Shield token count. */
    private final int shieldCount;

    /** Stress token count. */
    private final int stressCount;

    /**
     * Construct this object.
     * 
     * @param shieldCount Shield count.
     */
    @SuppressWarnings("hiding")
    public ImmutableTokenState(final int shieldCount)
    {
        this.cloakCount = 0;
        this.damageCount = 0;
        this.evadeCount = 0;
        this.focusCount = 0;
        this.ionCount = 0;
        this.shieldCount = shieldCount;
        this.stressCount = 0;
    }

    @Override
    public int getCloakCount()
    {
        return cloakCount;
    }

    @Override
    public int getCriticalDamageCount()
    {
        return criticalDamageCount;
    }

    @Override
    public int getDamageCount()
    {
        return damageCount;
    }

    @Override
    public int getEvadeCount()
    {
        return evadeCount;
    }

    @Override
    public int getFocusCount()
    {
        return focusCount;
    }

    @Override
    public int getIonCount()
    {
        return ionCount;
    }

    @Override
    public int getShieldCount()
    {
        return shieldCount;
    }

    @Override
    public int getStressCount()
    {
        return stressCount;
    }

    @Override
    public boolean isCloaked()
    {
        return cloakCount > 0;
    }

    @Override
    public boolean isStressed()
    {
        return stressCount > 0;
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
    }
}
