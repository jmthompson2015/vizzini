package org.vizzini.chess;

import org.vizzini.core.game.Adjudicator;

/**
 * Defines methods required by an adjudicator for chess.
 */
public interface ChessAdjudicator extends Adjudicator
{
    /**
     * @param environment Environment.
     * @param team Team.
     * @param fromPosition From position.
     * @param toPosition To position.
     * 
     * @return true if the given action is legal.
     */
    boolean isActionLegalFor(final ChessEnvironment environment, final ChessTeam team,
            final ChessPosition fromPosition, final ChessPosition toPosition);
}
