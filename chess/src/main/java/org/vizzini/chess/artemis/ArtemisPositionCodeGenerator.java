package org.vizzini.chess.artemis;

import java.io.StringWriter;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for an artemis chess position class.
 */
public final class ArtemisPositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final String positionClassName = "ArtemisPosition";
        final int max = 4;
        final PositionCodeGenerator generator = new DefaultPositionCodeGenerator(positionClassName, max, max, max);

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }
}
