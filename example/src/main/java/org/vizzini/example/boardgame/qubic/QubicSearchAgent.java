package org.vizzini.example.boardgame.qubic;

import java.beans.PropertyChangeListener;
import java.beans.PropertyChangeSupport;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.core.game.boardgame.SearchAgent;

/**
 * Provides a search agent which looks ahead for qubic.
 */
public final class QubicSearchAgent implements SearchAgent
{
    /** Busy property name. */
    public static final String BUSY_PROPERTY = "busy";

    /** Maximum plies. */
    private final int maxPlies;

    /** Name. */
    private final String name;

    /** Property change support. */
    private transient PropertyChangeSupport propertyChangeSupport;

    /** Search. */
    private final Search search;

    /** Team. */
    private final QubicTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     * @param search Search.
     * @param maxPlies Maximum number of plies.
     */
    @SuppressWarnings("hiding")
    public QubicSearchAgent(final String name, final QubicTeam team, final Search search, final int maxPlies)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        if (team == null)
        {
            throw new IllegalArgumentException("team is null");
        }

        if (search == null)
        {
            throw new IllegalArgumentException("search is null");
        }

        if (maxPlies <= 0)
        {
            throw new IllegalArgumentException("maxPlies is zero or less");
        }

        this.name = name;
        this.team = team;
        this.search = search;
        this.maxPlies = maxPlies;
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
    public QubicAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        setBusy(true);

        final QubicEnvironment qEnvironment = (QubicEnvironment)environment;
        final QubicEnvironment environmentCopy = qEnvironment.copy();

        final QubicSearchAgent agent = withMaxPlies(1);
        final QubicSearchAgent opponent = new QubicSearchAgent("opponent", team.opposite(), search, 1);

        final QubicAction answerAction = (QubicAction)search.search(environmentCopy, adjudicator, agent, opponent,
                maxPlies);

        final QubicAction answer = new QubicAction(qEnvironment, answerAction.getPosition(), answerAction.getToken()
                .withAgent(this));

        setBusy(false);

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "This agent searches ahead to find the best move.";
    }

    @Override
    public int getMaxPlies()
    {
        return maxPlies;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public Search getSearch()
    {
        return search;
    }

    @Override
    public QubicTeam getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
    }

    /**
     * Remove a <code>PropertyChangeListener</code> from the listener list. The listener is registered for all
     * properties. This method will only add the listener if it is not already registered.
     * 
     * @param listener The <code>PropertyChangeListener</code> to be added.
     */
    public void removePropertyChangeListener(final PropertyChangeListener listener)
    {
        getPropertyChangeSupport().removePropertyChangeListener(listener);
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("name", getName());
        builder.append("team", getTeam());
        builder.append("maxPlies", getMaxPlies());

        return builder.toString();
    }

    @Override
    @SuppressWarnings("hiding")
    public QubicSearchAgent withMaxPlies(final int maxPlies)
    {
        return new QubicSearchAgent(name, team, search, maxPlies);
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
     * @param isBusy Flag indicating if this agent is busy.
     */
    private void setBusy(final boolean isBusy)
    {
        getPropertyChangeSupport().firePropertyChange(BUSY_PROPERTY, !isBusy, isBusy);
    }
}
