package org.vizzini.ai.robot;

/**
 * Defines methods required by a robot color.
 * 
 * @see ColorInterface
 */
public interface RobotColor extends ColorInterface, Comparable<RobotColor>
{
    /**
     * @return a gray scale value of this.
     */
    int getGray();

    /**
     * "Darker" is defined as closer to black in RGBA color space.
     * 
     * @param anotherColor Another color.
     * 
     * @return true if this is darker than the given target color.
     */
    boolean isDarkerThan(final RobotColor anotherColor);

    /**
     * "Lighter" is defined as closer to white in RGBA color space.
     * 
     * @param anotherColor Another color.
     * 
     * @return true if this is lighter than the given target color.
     */
    boolean isLighterThan(final RobotColor anotherColor);

    /**
     * @param fraction Fraction of this color.
     * 
     * @return a new color that is a scaled version of this.
     */
    RobotColor scale(double fraction);

    /**
     * @return a new color that is a black or white version of this.
     */
    RobotColor toBlackAndWhite();

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return a new color that is a black or white version of this.
     */
    RobotColor toBlackAndWhite(RobotColor thresholdColor);

    /**
     * @return a new color that is a gray scale version of this.
     */
    RobotColor toGrayScale();
}
