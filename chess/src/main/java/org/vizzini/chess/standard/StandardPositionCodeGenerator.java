package org.vizzini.chess.standard;

import java.io.StringWriter;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for a standard chess position class.
 */
public final class StandardPositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final String positionClassName = "StandardPosition";
        final int maxX = 8;
        final int maxY = 8;
        final PositionCodeGenerator generator = new DefaultPositionCodeGenerator(positionClassName, maxX, maxY);

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }
}
