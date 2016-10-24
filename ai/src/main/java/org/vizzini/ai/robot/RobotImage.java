package org.vizzini.ai.robot;

import java.awt.Point;
import java.awt.RenderingHints;
import java.util.List;
import java.util.Map;

/**
 * Defines methods required by a robot image.
 * 
 * @see BufferedImageInterface
 */
public interface RobotImage extends BufferedImageInterface
{
    /**
     * @return a map of color to the number of occurrences of that color.
     */
    Map<RobotColor, Integer> countColorOccurrences();

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return a new image with dilated pixels.
     */
    RobotImage dilate(final RobotColor thresholdColor);

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return a new image with eroded pixels.
     */
    RobotImage erode(final RobotColor thresholdColor);

    /**
     * @return the absolute origin
     */
    Point getAbsoluteOrigin();

    /**
     * Find the largest color components of all pixels.
     * 
     * @return the minimumColor
     */
    RobotColor getMaximumColor();

    /**
     * Compute the mean (or average) of the color components of all pixels.
     * 
     * @return the meanColor
     */
    RobotColor getMeanColor();

    /**
     * Find the median color of all pixels.
     * 
     * @return the medianColor
     */
    RobotColor getMedianColor();

    /**
     * Compute the middle of the largest and smallest color components of all pixels.
     * 
     * @return the midrangeColor
     */
    RobotColor getMidrangeColor();

    /**
     * Find the smallest color components of all pixels.
     * 
     * @return the minimumColor
     */
    RobotColor getMinimumColor();

    /**
     * Find the color of all pixels which occurs most often.
     * 
     * @return the modeColor
     */
    RobotColor getModeColor();

    /**
     * @return the origin
     */
    Point getOrigin();

    /**
     * @return the parent
     */
    RobotImage getParent();

    /**
     * @param x X coordinate.
     * @param y Y coordinate.
     * 
     * @return the pixel at the given coordinates.
     */
    RobotColor getPixel(final int x, final int y);

    /**
     * @param object The reference object with which to compare.
     * @param maxDeltaWidth The maximum variance in width (typically zero).
     * @param maxDeltaHeight The maximum variance in height (typically zero).
     * @param maxPixelCount The maximum number of unequal pixels.
     * 
     * @return true if <code>this</code> and <code>object</code> are equal within <code>maxCount</code> pixels.
     */
    boolean nearlyEquals(final Object object, int maxDeltaWidth, int maxDeltaHeight, final int maxPixelCount);

    /**
     * @return a new image with all pixels scaled from [minColor, maxColor] into [BLACK, WHITE].
     */
    RobotImage normalize();

    /**
     * @param thresholdColor Threshold color.
     * @param replacementColor Replacement color.
     * 
     * @return a new image with all pixels darker than threshold color replaced with replacement color.
     */
    RobotImage replaceAllDarkerThan(RobotColor thresholdColor, RobotColor replacementColor);

    /**
     * @param thresholdColor Threshold color.
     * @param replacementColor Replacement color.
     * 
     * @return a new image with all pixels lighter than threshold color replaced with replacement color.
     */
    RobotImage replaceAllLighterThan(RobotColor thresholdColor, RobotColor replacementColor);

    /**
     * @param thresholdColor Threshold color.
     * @param darkerReplacementColor Darker replacement color.
     * @param lighterReplacementColor Lighter replacement color.
     * 
     * @return a new image with all pixels darker than threshold color replaced with darker replacement color, and the
     *         rest replaced with lighter replacement color.
     */
    RobotImage replaceAllUsingThreshold(RobotColor thresholdColor, RobotColor darkerReplacementColor,
            RobotColor lighterReplacementColor);

    /**
     * @param scaleFactor Scale factor.
     * @param offset Offset.
     * @param hints RenderingHints, or null.
     * 
     * @return a new filtered image.
     * @see java.awt.image.RescaleOp
     */
    RobotImage rescale(float scaleFactor, float offset, RenderingHints hints);

    /**
     * @param scaleFactors Scale factors.
     * @param offsets Offsets
     * @param hints RenderingHints, or null.
     * 
     * @return a new filtered image.
     * @see java.awt.image.RescaleOp
     */
    RobotImage rescale(float[] scaleFactors, float[] offsets, RenderingHints hints);

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return a list of single line images.
     */
    List<RobotImage> splitAlongHorizontalLine(RobotColor thresholdColor);

    /**
     * @param thresholdColor Threshold color.
     * @param maxCount Maximum darker count allowed (typically 0).
     * 
     * @return a list of single line images.
     */
    List<RobotImage> splitAlongHorizontalLine(RobotColor thresholdColor, int maxCount);

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return a list of single character images.
     */
    List<RobotImage> splitAlongVerticalLine(RobotColor thresholdColor);

    /**
     * @param thresholdColor Threshold color.
     * @param maxCount Maximum darker count allowed (typically 0).
     * 
     * @return a list of single character images.
     */
    List<RobotImage> splitAlongVerticalLine(RobotColor thresholdColor, int maxCount);

    /**
     * @param thresholdColor Threshold color.
     * @param minGap Minimum gap between regions.
     * 
     * @return a list of single character images.
     */
    List<RobotImage> splitAlongVerticalRegion(RobotColor thresholdColor, int minGap);

    /**
     * @return a new image with all pixels converted to black or white.
     */
    RobotImage toBlackAndWhite();

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return a new image with all pixels converted to black or white.
     */
    RobotImage toBlackAndWhite(RobotColor thresholdColor);

    /**
     * @return a new image with all pixels converted to gray scale.
     */
    RobotImage toGrayScale();

    /**
     * @return a new image without surrounding whitespace.
     */
    RobotImage trim();

    /**
     * @param thresholdColor Threshold color.
     * 
     * @return a new image without surrounding whitespace.
     */
    RobotImage trim(RobotColor thresholdColor);
}
