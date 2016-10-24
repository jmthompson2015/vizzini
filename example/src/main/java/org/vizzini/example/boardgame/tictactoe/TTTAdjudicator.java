package org.vizzini.example.boardgame.tictactoe;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;

/**
 * Provides an implementation of an adjudicator for tic-tac-toe.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Positional_game">Positional game (Wikipedia)</a>
 */
public final class TTTAdjudicator implements Adjudicator
{
    /** X wins regular expression. */
    private static final String X_WINS_REGEX = "XXX......|...XXX...|......XXX|X..X..X..|.X..X..X.|..X..X..X|X...X...X|..X.X.X..";

    /** O wins regular expression. */
    private static final String O_WINS_REGEX = X_WINS_REGEX.replaceAll("X", "O");

    /** X wins pattern. */
    private static final Pattern X_WINS_PATTERN = Pattern.compile(X_WINS_REGEX);

    /** O wins pattern. */
    private static final Pattern O_WINS_PATTERN = Pattern.compile(O_WINS_REGEX);

    /** Environment stringifier. */
    private final EnvironmentStringifier environmentStringifier;

    /**
     * Construct this object.
     * 
     * @param environmentStringifier Environment stringifier.
     */
    @SuppressWarnings("hiding")
    public TTTAdjudicator(final EnvironmentStringifier environmentStringifier)
    {
        this.environmentStringifier = environmentStringifier;
    }

    @Override
    public Agent determineWinner(final Environment environment)
    {
        Agent answer = null;

        if (environment != null)
        {
            final TTTEnvironment tEnvironment = (TTTEnvironment)environment;
            final String boardString = environmentStringifier.stringify(tEnvironment);
            final TTTTeam team = determineWinningAgentTeam(boardString);
            answer = findAgentByTeam(tEnvironment, team);
        }

        return answer;
    }

    /**
     * @param boardString Board string.
     * 
     * @return the winning agent's name, or null if no one has won.
     */
    public TTTTeam determineWinningAgentTeam(final String boardString)
    {
        TTTTeam answer = null;

        if (StringUtils.isNotEmpty(boardString))
        {
            final Matcher xMatcher = X_WINS_PATTERN.matcher(boardString);

            if (xMatcher.find())
            {
                answer = TTTTeam.X;
            }
            else
            {
                final Matcher oMatcher = O_WINS_PATTERN.matcher(boardString);

                if (oMatcher.find())
                {
                    answer = TTTTeam.O;
                }
            }
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "A tic-tac-toe adjudicator.";
    }

    @Override
    public String getName()
    {
        return "Tic-Tac-Toe Adjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = false;

        if (action != null)
        {
            final TTTAction tttAction = (TTTAction)action;
            final TTTEnvironment environment = tttAction.getEnvironment();
            final TTTPosition position = tttAction.getPosition();
            answer = (position != null) && environment.isEmpty(tttAction.getPosition());
        }

        return answer;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        boolean answer = false;

        if (environment != null)
        {
            answer = ((environment.getTokenCount() == 9) || (determineWinner(environment) != null));
        }

        return answer;
    }

    /**
     * @param environment Environment.
     * @param team Team.
     * 
     * @return the agent with the given name.
     */
    private Agent findAgentByTeam(final TTTEnvironment environment, final TTTTeam team)
    {
        Agent answer = null;

        final TTTPosition[] values = TTTPosition.values();

        for (final TTTPosition position : values)
        {
            final Token token = environment.getTokenAt(position);

            if ((token != null) && (team == token.getTeam()))
            {
                answer = token.getAgent();
                break;
            }
        }

        return answer;
    }
}
