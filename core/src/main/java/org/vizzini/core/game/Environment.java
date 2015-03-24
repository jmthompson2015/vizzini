package org.vizzini.core.game;

import java.beans.PropertyChangeListener;
import java.util.List;

import org.vizzini.core.Copyable;
import org.vizzini.core.NamedObject;

/**
 * Defines methods required by an environment.
 */
public interface Environment extends Copyable<Environment>, NamedObject
{
    /** Do action property name. */
    public static final String DO_ACTION_PROPERTY = "doAction";

    /** Undo action property name. */
    public static final String UNDO_ACTION_PROPERTY = "undoAction";

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    void addDoActionListener(final PropertyChangeListener listener);

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    void addUndoActionListener(final PropertyChangeListener listener);

    /**
     * Clear the environment.
     */
    void clear();

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     * 
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    void fireDoActionPropertyChange(final Action oldValue, final Action newValue);

    /**
     * Report a bound property update to any registered listeners. No event is fired if old and new are equal and
     * non-null.
     * 
     * @param oldValue The old value of the property.
     * @param newValue The new value of the property.
     */
    void fireUndoActionPropertyChange(final Action oldValue, final Action newValue);

    /**
     * @return description
     */
    String getDescription();

    /**
     * @param position Position.
     * 
     * @return the token.
     */
    Token getTokenAt(Position<?> position);

    /**
     * @return token count.
     */
    int getTokenCount();

    /**
     * @param agent Agent.
     * 
     * @return count of tokens associated with the given parameter.
     */
    int getTokenCountFor(Agent agent);

    /**
     * @param team Team.
     * 
     * @return count of tokens associated with the given parameter.
     */
    int getTokenCountFor(Team team);

    /**
     * @param agents Agents.
     */
    void placeInitialTokens(List<Agent> agents);

    /**
     * @param position Position.
     * @param token Token.
     */
    void placeToken(Position<?> position, Token token);

    /**
     * Remove a <code>PropertyChangeListener</code> from the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be removed.
     */
    void removeDoActionListener(final PropertyChangeListener listener);

    /**
     * @param position Position.
     */
    void removeToken(Position<?> position);

    /**
     * Remove a <code>PropertyChangeListener</code> from the listener list.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be removed.
     */
    void removeUndoActionListener(final PropertyChangeListener listener);
}
