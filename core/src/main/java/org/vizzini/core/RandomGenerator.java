package org.vizzini.core;

/**
 * Defines methods required by a random generator.
 */
public interface RandomGenerator
{
    /**
     * @return a new random value, either true or false.
     */
    boolean generateBoolean();

    /**
     * @return a new random number in [0.0, 1.0].
     */
    double generateDouble();

    /**
     * @param min Minimum.
     * @param max Maximum.
     * 
     * @return a new random value in [min, max].
     */
    double generateDouble(double min, double max);

    /**
     * @param min Minimum.
     * @param max Maximum.
     * @param accuracy Accuracy. (1.0 is zero decimal places, 10.0 is one, 100.0 is two, etc)
     * 
     * @return a new random value in [min, max] to the given accuracy.
     */
    double generateDouble(double min, double max, double accuracy);

    /**
     * @return a new random value in [Integer.MIN_VALUE, Integer.MAX_VALUE].
     */
    int generateInt();

    /**
     * @param min Minimum.
     * @param max Maximum.
     * 
     * @return a new random value in [min, max].
     */
    int generateInt(int min, int max);
}
