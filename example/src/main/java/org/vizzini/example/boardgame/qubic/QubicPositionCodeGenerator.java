package org.vizzini.example.boardgame.qubic;

import java.io.StringWriter;

import org.vizzini.core.game.boardgame.DefaultPositionCodeGenerator;
import org.vizzini.core.game.boardgame.PositionCodeGenerator;

/**
 * Provides a code generator for a qubic position class.
 */
public final class QubicPositionCodeGenerator
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public final static void main(final String[] args)
    {
        final String positionClassName = "QubicPosition";
        final int max = 4;
        final PositionCodeGenerator generator = new DefaultPositionCodeGenerator(positionClassName, max, max, max);

        final StringWriter writer = new StringWriter();
        generator.generate(writer);
        System.out.println(writer.toString());
    }
}
