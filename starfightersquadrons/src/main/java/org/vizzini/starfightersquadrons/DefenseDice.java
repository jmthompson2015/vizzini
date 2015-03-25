package org.vizzini.starfightersquadrons;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.DefaultRandomGenerator;
import org.vizzini.core.InputValidator;
import org.vizzini.core.RandomGenerator;

/**
 * Provides defense dice for Starfighter Squadrons.
 */
public final class DefenseDice
{
    /**
     * Provides an enumeration of dice values.
     */
    public enum Value
    {
        /** Value. */
        EVADE,
        /** Value. */
        FOCUS,
        /** Value. */
        BLANK;
    }

    /** Values property name. */
    public static final String VALUES_PROPERTY = "values";

    /** Property change support. */
    private transient PropertyChangeSupport propertyChangeSupport;

    /** Random number generator. */
    private final RandomGenerator randomGenerator = new DefaultRandomGenerator();

    /** Dice values. */
    private final List<Value> values;

    /**
     * Construct this object.
     *
     * @param size Number of dice.
     */
    public DefenseDice(final int size)
    {
        InputValidator.validateNotNegative("size", size);

        values = new ArrayList<Value>(size);
        rerollAll(size);
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addValuesListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(VALUES_PROPERTY, listener);
    }

    /**
     * @param oldValue Old value.
     * @param newValue New value.
     */
    public void changeAllToValue(final Value oldValue, final Value newValue)
    {
        for (int i = 0; i < size(); i++)
        {
            if (getValue(i) == oldValue)
            {
                values.set(i, newValue);
            }
        }
    }

    /**
     * @param oldValue Old value.
     * @param newValue New value.
     */
    public void changeFirstToValue(final Value oldValue, final Value newValue)
    {
        for (int i = 0; i < size(); i++)
        {
            if (getValue(i) == oldValue)
            {
                values.set(i, newValue);
                break;
            }
        }
    }

    /**
     * @return the number of blank values.
     */
    public int getBlankCount()
    {
        return getValueCount(Value.BLANK);
    }

    /**
     * @return the number of evade values.
     */
    public int getEvadeCount()
    {
        return getValueCount(Value.EVADE);
    }

    /**
     * @return the number of focus values.
     */
    public int getFocusCount()
    {
        return getValueCount(Value.FOCUS);
    }

    /**
     * @param index Index of the die.
     *
     * @return the rolled value.
     */
    public Value getValue(final int index)
    {
        return values.get(index);
    }

    /**
     * Remove a <code>PropertyChangeListener</code> from the listener list.
     *
     * @param listener The <code>PropertyChangeListener</code> to be removed.
     */
    public void removeValuesListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().removePropertyChangeListener(VALUES_PROPERTY, listener);
    }

    /**
     * @param index Index of the die to roll again.
     */
    public void reroll(final int index)
    {
        final Value value = rollRandomValue();
        values.set(index, value);

        fireValuesPropertyChange(null, values);
    }

    /**
     * Reroll all dice.
     */
    public void rerollAll()
    {
        rerollAll(size());
    }

    /**
     * @return the size
     */
    public int size()
    {
        return values.size();
    }

    /**
     * Spend an evade token. Add an evade result.
     */
    public void spendEvadeToken()
    {
        values.add(Value.EVADE);
    }

    /**
     * Spend a focus token. Change all focus results to evades.
     */
    public void spendFocusToken()
    {
        changeAllToValue(Value.FOCUS, Value.EVADE);
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("size", size());
        builder.append("values", values);

        return builder.toString();
    }

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     *
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    private void fireValuesPropertyChange(final List<Value> oldValue, final List<Value> newValue)
    {
        getPropertyChangeSupport().firePropertyChange(VALUES_PROPERTY, oldValue, newValue);
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
     * @param target Target value.
     *
     * @return the number of target values.
     */
    private int getValueCount(final Value target)
    {
        int answer = 0;

        for (final Value value : values)
        {
            if (value == target)
            {
                answer++;
            }
        }

        return answer;
    }

    /**
     * Reroll all dice.
     *
     * @param size Size.
     */
    private void rerollAll(final int size)
    {
        values.clear();

        for (int i = 0; i < size; i++)
        {
            final Value value = rollRandomValue();
            values.add(value);
        }

        Collections.sort(values);

        fireValuesPropertyChange(null, values);
    }

    /**
     * @return a random value.
     */
    private Value rollRandomValue()
    {
        Value value;
        final int roll = randomGenerator.generateInt(1, 8);

        // There are 2 focus, 3 evade, and 3 blank.
        switch (roll)
        {
        case 1:
        case 4:
            value = Value.FOCUS;
            break;
        case 2:
        case 5:
        case 7:
            value = Value.EVADE;
            break;
        case 3:
        case 6:
        case 8:
            value = Value.BLANK;
            break;
        default:
            throw new RuntimeException("Unsupported roll: " + roll);
        }

        return value;
    }
}
