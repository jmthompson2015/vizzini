package org.vizzini.example.puzzle.sudoku;

import java.util.Set;

import org.vizzini.core.game.Action;
import org.vizzini.core.game.Adjudicator;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Environment;

/**
 * Provides an adjudicator for Sudoku.
 */
public class SudokuAdjudicator implements Adjudicator
{
    @Override
    public Agent determineWinner(final Environment environment)
    {
        Agent answer = null;

        if (environment != null)
        {
            final SudokuEnvironment sEnvironment = (SudokuEnvironment)environment;
            final Agent agent = sEnvironment.getAgent();

            if (sEnvironment.getTokenCount() == 81)
            {
                answer = agent;
            }
        }

        return answer;
    }

    @Override
    public String getDescription()
    {
        return "A Sudoku adjudicator.";
    }

    @Override
    public String getName()
    {
        return "Sudoku Adjudicator";
    }

    @Override
    public boolean isActionLegal(final Action action)
    {
        boolean answer = false;

        if (action != null)
        {
            final SudokuAction sAction = (SudokuAction)action;
            final SudokuEnvironment environment = sAction.getEnvironment();
            final SudokuPosition position = sAction.getPosition();
            answer = (position != null) && (environment.getTokenAt(sAction.getPosition()) == null);

            if (answer)
            {
                final Set<SudokuToken> possibilities = environment.getPossibleTokens(position);
                final SudokuToken token = sAction.getToken();
                answer = possibilities.contains(token);
            }
        }

        return answer;
    }

    @Override
    public boolean isGameOver(final Environment environment)
    {
        boolean answer = false;

        if (environment != null)
        {
            answer = (environment.getTokenCount() == 81);
        }

        return answer;
    }
}
