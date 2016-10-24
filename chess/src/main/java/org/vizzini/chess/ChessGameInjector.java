package org.vizzini.chess;

import org.vizzini.core.game.GameInjector;

/**
 * Defines methods required by a game injector for chess.
 */
public interface ChessGameInjector extends GameInjector
{
    /**
     * @return a new action generator.
     */
    ChessActionGenerator injectActionGenerator();

    /**
     * @return the game type.
     */
    GameType injectGameType();
}
