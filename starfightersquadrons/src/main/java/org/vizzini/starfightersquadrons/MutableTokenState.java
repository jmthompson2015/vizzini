package org.vizzini.starfightersquadrons;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;

/**
 * Provides a mutable token state.
 */
public final class MutableTokenState implements TokenState
{
    /** Property name. */
    private static final String ATTACKER_TARGET_LOCK_PROPERTY = "attackerTargetLock";

    /** Property name. */
    private static final String CLOAK_PROPERTY = "cloak";

    /** Property name. */
    private static final String CRITICAL_DAMAGE_PROPERTY = "criticalDamage";

    /** Property name. */
    private static final String DAMAGE_PROPERTY = "damage";

    /** Property name. */
    private static final String DEFENDER_TARGET_LOCK_PROPERTY = "defenderTargetLock";

    /** Property name. */
    private static final String EVADE_PROPERTY = "evade";

    /** Property name. */
    private static final String FOCUS_PROPERTY = "focus";

    /** Property name. */
    private static final String ION_PROPERTY = "ion";

    /** Property name. */
    private static final String SHIELD_PROPERTY = "shield";

    /** Property name. */
    private static final String STRESS_PROPERTY = "stress";

    /** Attack target lock. */
    private TargetLock attackerTargetLock;

    /** Cloak token count. */
    private int cloakCount;

    /** Critical damages. */
    private final DamageCardList criticalDamages = new DamageCardList();

    /** Damages. */
    private final DamageCardList damages = new DamageCardList();

    /** Defender target locks. */
    private final List<TargetLock> defenderTargetLocks = new ArrayList<TargetLock>();

    /** Evade token count. */
    private int evadeCount;

    /** Focus token count. */
    private int focusCount;

    /** Initial state. */
    @SuppressWarnings("unused")
    private final ImmutableTokenState initialTokenState;

    /** Ion token count. */
    private int ionCount;

    /** Property change support. */
    private transient PropertyChangeSupport propertyChangeSupport;

    /** Shield token count. */
    private int shieldCount;

    /** Stress token count. */
    private int stressCount;

    /**
     * Construct this object.
     * 
     * @param shieldCount Shield count.
     */
    @SuppressWarnings("hiding")
    public MutableTokenState(final int shieldCount)
    {
        this.cloakCount = 0;
        this.evadeCount = 0;
        this.focusCount = 0;
        this.ionCount = 0;
        this.shieldCount = shieldCount;
        this.stressCount = 0;

        this.initialTokenState = new ImmutableTokenState(shieldCount);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addAttackerTargetLockListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(ATTACKER_TARGET_LOCK_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addCloakListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(CLOAK_PROPERTY, listener);
    }

    /**
     * @param damage Critical damage.
     */
    public void addCriticalDamage(final DamageCard damage)
    {
        final List<DamageCard> oldValue = new ArrayList<DamageCard>(criticalDamages);
        criticalDamages.add(damage);
        getPropertyChangeSupport().firePropertyChange(CRITICAL_DAMAGE_PROPERTY, oldValue, criticalDamages);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addCriticalDamageListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(CRITICAL_DAMAGE_PROPERTY, listener);
    }

    /**
     * @param damage Damage.
     */
    public void addDamage(final DamageCard damage)
    {
        final List<DamageCard> oldValue = new ArrayList<DamageCard>(damages);
        damages.add(damage);
        getPropertyChangeSupport().firePropertyChange(DAMAGE_PROPERTY, oldValue, damages);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addDamageListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(DAMAGE_PROPERTY, listener);
    }

    /**
     * @param targetLock the targetLock to add
     */
    public void addDefenderTargetLock(final TargetLock targetLock)
    {
        InputValidator.validateNotNull("targetLock", targetLock);

        if (defenderTargetLocks.contains(targetLock))
        {
            throw new IllegalArgumentException("defenderTargetLocks already contains targetLock");
        }

        defenderTargetLocks.add(targetLock);
        getPropertyChangeSupport().firePropertyChange(DEFENDER_TARGET_LOCK_PROPERTY, null, targetLock);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addDefenderTargetLockListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(DEFENDER_TARGET_LOCK_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addEvadeListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(EVADE_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addFocusListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(FOCUS_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addIonListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(ION_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addShieldListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(SHIELD_PROPERTY, listener);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addStressListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(STRESS_PROPERTY, listener);
    }

    /**
     * Clear the cloak tokens.
     */
    public void clearCloakCount()
    {
        setCloakCount(0);
    }

    /**
     * Clear the evade tokens.
     */
    public void clearEvadeCount()
    {
        setEvadeCount(0);
    }

    /**
     * Clear the focus tokens.
     */
    public void clearFocusCount()
    {
        setFocusCount(0);
    }

    /**
     * Decrease the cloak token count.
     */
    public void decreaseCloakCount()
    {
        setCloakCount(cloakCount - 1);
    }

    /**
     * Decrease the evade token count.
     */
    public void decreaseEvadeCount()
    {
        setEvadeCount(evadeCount - 1);
    }

    /**
     * Decrease the focus token count.
     */
    public void decreaseFocusCount()
    {
        setFocusCount(focusCount - 1);
    }

    /**
     * Decrease the ion token count.
     */
    public void decreaseIonCount()
    {
        setIonCount(ionCount - 1);
    }

    /**
     * Decrease the shield token count.
     */
    public void decreaseShieldCount()
    {
        setShieldCount(shieldCount - 1);
    }

    /**
     * Decrease the stress token count.
     */
    public void decreaseStressCount()
    {
        setStressCount(stressCount - 1);
    }

    /**
     * @return the attackerTargetLock
     */
    public TargetLock getAttackerTargetLock()
    {
        return attackerTargetLock;
    }

    @Override
    public int getCloakCount()
    {
        return cloakCount;
    }

    @Override
    public int getCriticalDamageCount()
    {
        return criticalDamages.size();
    }

    /**
     * @return the criticalDamages
     */
    public DamageCardList getCriticalDamages()
    {
        return criticalDamages;
    }

    @Override
    public int getDamageCount()
    {
        return damages.size();
    }

    /**
     * @return the damages
     */
    public DamageCardList getDamages()
    {
        return damages;
    }

    /**
     * @return the defenderTargetLocks
     */
    public List<TargetLock> getDefenderTargetLocks()
    {
        return Collections.unmodifiableList(defenderTargetLocks);
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

    /**
     * Increase the cloak token count.
     */
    public void increaseCloakCount()
    {
        setCloakCount(cloakCount + 1);
    }

    /**
     * Increase the evade token count.
     */
    public void increaseEvadeCount()
    {
        setEvadeCount(evadeCount + 1);
    }

    /**
     * Increase the focus token count.
     */
    public void increaseFocusCount()
    {
        setFocusCount(focusCount + 1);
    }

    /**
     * Increase the ion token count.
     */
    public void increaseIonCount()
    {
        setIonCount(ionCount + 1);
    }

    /**
     * Increase the shield token count.
     */
    public void increaseShieldCount()
    {
        setShieldCount(shieldCount + 1);
    }

    /**
     * Increase the stress token count.
     */
    public void increaseStressCount()
    {
        setStressCount(stressCount + 1);
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

    /**
     * @param damage Critical damage.
     */
    public void removeCriticalDamage(final DamageCard damage)
    {
        final List<DamageCard> oldValue = new ArrayList<DamageCard>(criticalDamages);
        criticalDamages.remove(damage);
        getPropertyChangeSupport().firePropertyChange(CRITICAL_DAMAGE_PROPERTY, oldValue, criticalDamages);
    }

    /**
     * @param damage Damage.
     */
    public void removeDamage(final DamageCard damage)
    {
        final List<DamageCard> oldValue = new ArrayList<DamageCard>(damages);
        damages.remove(damage);
        getPropertyChangeSupport().firePropertyChange(DAMAGE_PROPERTY, oldValue, damages);
    }

    /**
     * @param targetLock the targetLock to remove
     */
    public void removeDefenderTargetLock(final TargetLock targetLock)
    {
        InputValidator.validateNotNull("targetLock", targetLock);

        if (!defenderTargetLocks.contains(targetLock))
        {
            throw new IllegalArgumentException("targetLock is not assigned to this defender.");
        }

        defenderTargetLocks.remove(targetLock);
        getPropertyChangeSupport().firePropertyChange(DEFENDER_TARGET_LOCK_PROPERTY, targetLock, null);
    }

    /**
     * @param targetLock the targetLock to set
     */
    public void setAttackerTargetLock(final TargetLock targetLock)
    {
        final TargetLock oldValue = attackerTargetLock;
        attackerTargetLock = targetLock;
        getPropertyChangeSupport().firePropertyChange(ATTACKER_TARGET_LOCK_PROPERTY, oldValue, attackerTargetLock);
    }

    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
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
     * @param newValue the cloakCount to set
     */
    private void setCloakCount(final int newValue)
    {
        if (newValue >= 0)
        {
            final int oldValue = cloakCount;
            cloakCount = newValue;
            getPropertyChangeSupport().firePropertyChange(CLOAK_PROPERTY, oldValue, cloakCount);
        }
    }

    /**
     * @param newValue the evadeCount to set
     */
    private void setEvadeCount(final int newValue)
    {
        if (newValue >= 0)
        {
            final int oldValue = evadeCount;
            evadeCount = newValue;
            getPropertyChangeSupport().firePropertyChange(EVADE_PROPERTY, oldValue, evadeCount);
        }
    }

    /**
     * @param newValue the focusCount to set
     */
    private void setFocusCount(final int newValue)
    {
        if (newValue >= 0)
        {
            final int oldValue = focusCount;
            focusCount = newValue;
            getPropertyChangeSupport().firePropertyChange(FOCUS_PROPERTY, oldValue, focusCount);
        }
    }

    /**
     * @param newValue the ionCount to set
     */
    private void setIonCount(final int newValue)
    {
        if (newValue >= 0)
        {
            final int oldValue = ionCount;
            ionCount = newValue;
            getPropertyChangeSupport().firePropertyChange(ION_PROPERTY, oldValue, ionCount);
        }
    }

    /**
     * @param newValue the shieldCount to set
     */
    private void setShieldCount(final int newValue)
    {
        if (newValue >= 0)
        {
            final int oldValue = shieldCount;
            shieldCount = newValue;
            getPropertyChangeSupport().firePropertyChange(SHIELD_PROPERTY, oldValue, shieldCount);
        }
    }

    /**
     * @param newValue the stressCount to set
     */
    private void setStressCount(final int newValue)
    {
        if (newValue >= 0)
        {
            final int oldValue = stressCount;
            stressCount = newValue;
            getPropertyChangeSupport().firePropertyChange(STRESS_PROPERTY, oldValue, stressCount);
        }
    }
}
