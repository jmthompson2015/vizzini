package org.vizzini.example.boardgame.tictactoe;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.Search;
import org.vizzini.core.game.boardgame.SearchAgent;

/**
 * Provides a search agent which looks ahead for tic-tac-toe.
 */
public final class TTTSearchAgent implements SearchAgent
{
    /** Maximum plies. */
    private final int maxPlies;

    /** Name. */
    private final String name;

    /** Search. */
    private final Search search;

    /** Team. */
    private final TTTTeam team;

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param team Team.
     * @param search Search.
     * @param maxPlies Maximum number of plies.
     */
    @SuppressWarnings("hiding")
    public TTTSearchAgent(final String name, final TTTTeam team, final Search search, final int maxPlies)
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

    @Override
    public TTTAction getAction(final Environment environment, final Adjudicator adjudicator)
    {
        final TTTEnvironment tEnvironment = (TTTEnvironment)environment;
        final TTTEnvironment environmentCopy = tEnvironment.copy();

        final TTTSearchAgent agent = withMaxPlies(1);
        final TTTSearchAgent opponent = new TTTSearchAgent("opponent", team.opposite(), search, 1);

        final TTTAction answerAction = (TTTAction)search
                .search(environmentCopy, adjudicator, agent, opponent, maxPlies);

        return new TTTAction(tEnvironment, answerAction.getPosition(), answerAction.getToken().withAgent(this));
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
    public TTTTeam getTeam()
    {
        return team;
    }

    @Override
    public void postProcessGame(final Agent winner)
    {
        // Nothing to do.
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
    public TTTSearchAgent withMaxPlies(final int maxPlies)
    {
        return new TTTSearchAgent(name, team, search, maxPlies);
    }
}
