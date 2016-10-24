package org.vizzini.chess.raumschach;

import java.io.StringWriter;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for an raumschach chess position class.
 */
public final class RaumschachPositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final String positionClassName = "RaumschachPosition";
        final int max = 5;
        final PositionCodeGenerator generator = new DefaultPositionCodeGenerator(positionClassName, max);

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }
}
