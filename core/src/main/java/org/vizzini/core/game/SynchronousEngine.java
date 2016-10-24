package org.vizzini.core.game;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;
import java.util.List;

/**
 * Provides a synchronous implementation of an engine.
 */
public final class SynchronousEngine implements Engine
{
    /** Winner property name. */
    public static final String WINNER_PROPERTY = "winner";

    /** Description. */
    final String description;

    /** Name. */
    final String name;

    /** Property change support. */
    private transient PropertyChangeSupport propertyChangeSupport;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param description Description.
     */
    @SuppressWarnings("hiding")
    public SynchronousEngine(final String name, final String description)
    {
        this.name = name;
        this.description = description;
    }

    /**
     * Add a <code>PropertyChangeListener</code> to the listener list. The listener is registered for all properties.
     * This method will only add the listener if it is not already registered.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void addPropertyChangeListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().addPropertyChangeListener(listener);
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

    @Override
    public void start(final Environment environment, final Adjudicator adjudicator, final List<Team> teams,
            final List<Agent> agents)
    {
        environment.placeInitialTokens(agents);
        final int size = agents.size();

        while (!adjudicator.isGameOver(environment))
        {
            for (int i = 0; !adjudicator.isGameOver(environment) && (i < size); i++)
            {
                final Agent agent = agents.get(i);
                // FIXME: don't allow the agent access to the real environment (make a copy)
                final Action action = agent.getAction(environment, adjudicator);

                if (adjudicator.isActionLegal(action))
                {
                    if (action != null)
                    {
                        action.doIt();
                    }
                }
                else
                {
                    System.out.println("Illegal action: " + action);
                }
            }
        }

        final Agent winner = processGameOver(environment, adjudicator);

        for (final Agent agent : agents)
        {
            agent.postProcessGame(winner);
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
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * 
     * @return the game winner, if any.
     */
    private Agent processGameOver(final Environment environment, final Adjudicator adjudicator)
    {
        final Agent winner = adjudicator.determineWinner(environment);

        getPropertyChangeSupport().firePropertyChange(WINNER_PROPERTY, null, winner);

        return winner;
    }
}
