package org.vizzini.illyriad.robot.inventory;

import java.awt.RenderingHints;

import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.illyriad.robot.ImageFilter;

/**
 * Provides a count image filter.
 */
public final class CountImageFilter implements ImageFilter
{
    /** Count image filter configuration. */
    private final CountImageFilterConfiguration config;

    /**
     * Construct this object.
     */
    public CountImageFilter()
    {
        this(new CountImageFilterConfiguration());
    }

    /**
     * Construct this object.
     * 
     * @param config Image processor configuration.
     */
    @SuppressWarnings("hiding")
    public CountImageFilter(final CountImageFilterConfiguration config)
    {
        this.config = config;
    }

    @Override
    public RobotImage filter(final RobotImage image)
    {
        RobotImage myImage = image;

        if (image != null)
        {
            // Normalize.
            if (config.isNormalized0())
            {
                myImage = normalize(myImage);
            }

            // Rescale colors to increase contrast.
            myImage = rescale(myImage);

            // Normalize.
            if (config.isNormalized1())
            {
                myImage = normalize(myImage);
            }

            // Trim.
            myImage = trim(myImage);

            // Convert to black and white.
            myImage = toBlackAndWhite(myImage);
        }

        return myImage;
    }

    /**
     * @return the config
     */
    public CountImageFilterConfiguration getConfiguration()
    {
        return config;
    }

    /**
     * @param image Image.
     * 
     * @return a new normalized image.
     */
    private RobotImage normalize(final RobotImage image)
    {
        RobotImage answer = null;

        if (image != null)
        {
            answer = image.normalize();
        }

        return answer;
    }

    /**
     * @param image Image.
     * 
     * @return a new rescaled image.
     */
    private RobotImage rescale(final RobotImage image)
    {
        RobotImage answer = null;

        if (image != null)
        {
            final Float[] scaleFactors = config.getScaleFactors();
            final Float[] offsets = config.getOffsets();

            if ((scaleFactors != null) && (offsets != null))
            {
                final float[] myScaleFactors = { scaleFactors[0], scaleFactors[1], scaleFactors[2] };
                final float[] myOffsets = { offsets[0], offsets[1], offsets[2] };
                final RenderingHints hints = config.getRenderingHints();

                answer = image.rescale(myScaleFactors, myOffsets, hints);
            }
            else
            {
                final float scaleFactor = config.getScaleFactor();
                final float offset = config.getOffset();
                final RenderingHints hints = config.getRenderingHints();

                answer = image.rescale(scaleFactor, offset, hints);
            }
        }

        return answer;
    }

    /**
     * @param image Image.
     * 
     * @return a new black and white image.
     */
    private RobotImage toBlackAndWhite(final RobotImage image)
    {
        RobotImage answer = null;

        if (image != null)
        {
            final double thresholdColorScale = config.getBlackAndWhiteColorScale();
            final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);
            answer = image.toBlackAndWhite(thresholdColor);
        }

        return answer;
    }

    /**
     * @param image Image.
     * 
     * @return a new trimmed image.
     */
    private RobotImage trim(final RobotImage image)
    {
        RobotImage answer = null;

        if (image != null)
        {
            final double thresholdColorScale = config.getTrimColorScale();
            final RobotColor thresholdColor = image.getMidrangeColor().scale(thresholdColorScale);
            answer = image.trim(thresholdColor);
        }

        return answer;
    }
}
