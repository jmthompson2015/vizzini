package org.vizzini.core.game;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.vizzini.core.InputValidator;

/**
 * Provides a default implementation of an environment.
 */
public final class DefaultEnvironment implements Environment
{
    /** Description. */
    private final String description;

    /** Name. */
    private final String name;

    /** Position to token. */
    private final Map<Position<?>, Token> positionToToken = new HashMap<Position<?>, Token>();

    /** Property change support. */
    private transient PropertyChangeSupport propertyChangeSupport;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     */
    @SuppressWarnings("hiding")
    public DefaultEnvironment(final String name, final String description)
    {
        InputValidator.validateNotEmpty("name", name);
        InputValidator.validateNotNull("description", description);

        this.name = name;
        this.description = description;
    }

    @Override
    public void addDoActionListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(DO_ACTION_PROPERTY, listener);
    }

    @Override
    public void addUndoActionListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(UNDO_ACTION_PROPERTY, listener);
    }

    @Override
    public void clear()
    {
        positionToToken.clear();
    }

    @Override
    public Environment copy()
    {
        final DefaultEnvironment answer = new DefaultEnvironment(getName(), getDescription());

        answer.positionToToken.clear();

        for (final Entry<Position<?>, Token> entry : positionToToken.entrySet())
        {
            final Token token = entry.getValue();

            if (token != null)
            {
                final Position<?> position = entry.getKey();
                answer.positionToToken.put(position, token);
            }
        }

        return answer;
    }

    @Override
    public void fireDoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        getPropertyChangeSupport().firePropertyChange(DO_ACTION_PROPERTY, oldValue, newValue);
    }

    @Override
    public void fireUndoActionPropertyChange(final Action oldValue, final Action newValue)
    {
        getPropertyChangeSupport().firePropertyChange(UNDO_ACTION_PROPERTY, oldValue, newValue);
    }

    @Override
    public String getDescription()
    {
        return description;
    }

    @Override
    public String getName()
    {
        return name;
    }

    /**
     * @return propertyChangeSupport
     */
    public PropertyChangeSupport getPropertyChangeSupport()
    {
        if (propertyChangeSupport == null)
        {
            propertyChangeSupport = new PropertyChangeSupport(this);
        }

        return propertyChangeSupport;
    }

    @Override
    public Token getTokenAt(final Position<?> position)
    {
        InputValidator.validateNotNull("position", position);

        return positionToToken.get(position);
    }

    @Override
    public int getTokenCount()
    {
        return positionToToken.size();
    }

    @Override
    public int getTokenCountFor(final Agent agent)
    {
        InputValidator.validateNotNull("agent", agent);

        int answer = 0;

        for (final Token token : positionToToken.values())
        {
            if (agent.equals(token.getAgent()))
            {
                answer++;
            }
        }

        return answer;
    }

    @Override
    public int getTokenCountFor(final Team team)
    {
        InputValidator.validateNotNull("team", team);

        int answer = 0;

        for (final Token token : positionToToken.values())
        {
            if (team.equals(token.getTeam()))
            {
                answer++;
            }
        }

        return answer;
    }

    @Override
    public void placeInitialTokens(final List<Agent> agents)
    {
        // Nothing to do.
    }

    @Override
    public void placeToken(final Position<?> position, final Token token)
    {
        positionToToken.put(position, token);
    }

    @Override
    public void removeDoActionListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().removePropertyChangeListener(DO_ACTION_PROPERTY, listener);
    }

    @Override
    public void removeToken(final Position<?> position)
    {
        InputValidator.validateNotNull("position", position);

        positionToToken.remove(position);
    }

    @Override
    public void removeUndoActionListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().removePropertyChangeListener(UNDO_ACTION_PROPERTY, listener);
    }
}
