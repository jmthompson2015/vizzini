package org.vizzini.ai.neuralnetwork;

/**
 * Provides data for seven digitized characters.
 */
public final class CharacterRecognitionTestData
{
    /** The letter A as a 5x7 grid. */
    public static final double[] LETTER_A = { // start rows
    0., 0., 1., 0., 0., // row 1
            0., 1., 0., 1., 0., // row 2
            1., 0., 0., 0., 1., // row 3
            1., 0., 0., 0., 1., // row 4
            1., 1., 1., 1., 1., // row 5
            1., 0., 0., 0., 1., // row 6
            1., 0., 0., 0., 1., // row 7
    };

    /** The letter C as a 5x7 grid. */
    public static final double[] LETTER_C = { 0., 1., 1., 1., 0., 1., 0., 0., 0., 1., 1., 0., 0., 0., 0., 1., 0., 0.,
            0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 1., 0., 1., 1., 1., 0., };

    /** The letter E as a 5x7 grid. */
    public static final double[] LETTER_E = { 1., 1., 1., 1., 1., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 1., 1.,
            1., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 1., 1., 1., 1., };

    /** The letter Q as a 5x7 grid. */
    public static final double[] LETTER_Q = { 0., 1., 1., 1., 0., 1., 0., 0., 0., 1., 1., 0., 0., 0., 1., 1., 0., 0.,
            0., 1., 1., 0., 1., 0., 1., 1., 0., 0., 1., 1., 0., 1., 1., 1., 1., };

    /** The letter S as a 5x7 grid. */
    public static final double[] LETTER_S = { 0., 1., 1., 1., 0., 1., 0., 0., 0., 1., 1., 0., 0., 0., 0., 0., 1., 1.,
            1., 0., 0., 0., 0., 0., 1., 1., 0., 0., 0., 1., 0., 1., 1., 1., 0., };

    /** The letter T as a 5x7 grid. */
    public static final double[] LETTER_T = { 1., 1., 1., 1., 1., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1.,
            0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., 0., 0., 1., 0., 0., };

    /** The letter V as a 5x7 grid. */
    public static final double[] LETTER_V = { 1., 0., 0., 0., 1., 1., 0., 0., 0., 1., 1., 0., 0., 0., 1., 0., 1., 0.,
            1., 0., 0., 1., 0., 1., 0., 0., 1., 0., 1., 0., 0., 0., 1., 0., 0., };

    /** All the letters in an array. */
    public static final double[][] LETTERS = { LETTER_A, LETTER_C, LETTER_E, LETTER_Q, LETTER_S, LETTER_T, LETTER_V, };
}
