package org.vizzini.starfightersquadrons;

/**
 * Defines methods required by a token state.
 */
public interface TokenState
{
    /**
     * @return the cloakCount
     */
    int getCloakCount();

    /**
     * @return the criticalDamageCount
     */
    int getCriticalDamageCount();

    /**
     * @return the damageCount
     */
    int getDamageCount();

    /**
     * @return the evadeCount
     */
    int getEvadeCount();

    /**
     * @return the focusCount
     */
    int getFocusCount();

    /**
     * @return the ionCount
     */
    int getIonCount();

    /**
     * @return the shieldCount
     */
    int getShieldCount();

    /**
     * @return the stressCount
     */
    int getStressCount();

    /**
     * @return true if this ship is cloaked.
     */
    boolean isCloaked();

    /**
     * @return true if this ship is under stress.
     */
    boolean isStressed();
}
