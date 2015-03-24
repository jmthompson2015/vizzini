package org.vizzini.example.boardgame.tictactoe;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;

/**
 * Provides a rated action.
 */
public final class RatedAction implements Comparable<RatedAction>
{
    /** Action. */
    private final TTTAction action;

    /** Rating. */
    private final Integer rating;

    /**
     * Construct this object.
     * 
     * @param action Action.
     * @param rating Rating.
     */
    @SuppressWarnings("hiding")
    public RatedAction(final TTTAction action, final Integer rating)
    {
        this.action = action;
        this.rating = rating;
    }

    @Override
    public int compareTo(final RatedAction another)
    {
        return this.rating.compareTo(another.rating);
    }

    /**
     * @return the action
     */
    public TTTAction getAction()
    {
        return action;
    }

    /**
     * @return the rating
     */
    public Integer getRating()
    {
        return rating;
    }

    @Override
    public String toString()
    {
        // return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        if (getAction() == null)
        {
            builder.append("action", getAction());
        }
        else
        {
            builder.append("action.agent.team", getAction().getAgent().getTeam().getName());
            builder.append("action.position", getAction().getPosition());
        }
        builder.append("rating", getRating());

        return builder.toString();
    }

    /**
     * @param action Action.
     * 
     * @return a new instance with the given parameter.
     */
    @SuppressWarnings("hiding")
    public RatedAction withAction(final TTTAction action)
    {
        return new RatedAction(action, getRating());
    }

    /**
     * @param rating Rating.
     * 
     * @return a new instance with the given parameter.
     */
    @SuppressWarnings("hiding")
    public RatedAction withRating(final Integer rating)
    {
        return new RatedAction(getAction(), rating);
    }
}
