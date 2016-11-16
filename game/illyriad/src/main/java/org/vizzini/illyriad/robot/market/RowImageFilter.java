package org.vizzini.illyriad.robot.market;

import java.util.List;

import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.illyriad.robot.ImageFilter;

/**
 * Provides a row image filter.
 */
public final class RowImageFilter implements ImageFilter
{
    /** Minimum region gap. */
    private final int minGap;

    /**
     * Construct this object.
     */
    public RowImageFilter()
    {
        this(4);
    }

    /**
     * Construct this object.
     * 
     * @param minGap Minimum region gap.
     */
    @SuppressWarnings("hiding")
    public RowImageFilter(final int minGap)
    {
        this.minGap = minGap;
    }

    @Override
    public RobotImage filter(final RobotImage rowImage)
    {
        RobotImage answer = null;

        if (rowImage != null)
        {
            // Split out price.
            final RobotColor thresholdColor = rowImage.getMidrangeColor();
            final List<RobotImage> rowImages = rowImage.splitAlongVerticalRegion(thresholdColor, minGap);

            // final RobotImageIO imageIo = new RobotImageIO();
            // for (int i = 0; i < rowImages.size(); i++)
            // {
            // final RobotImage image = rowImages.get(i);
            // imageIo.write(new File(Locations.MARKET_DATA_DIR, "temp/rowSplit_" + i + ".png"), image);
            // }

            if (rowImages.size() > 5)
            {
                final int index = rowImages.size() - 4;
                answer = rowImages.get(index);
            }
        }

        return answer;
    }

    /**
     * @return the minGap
     */
    public int getMinGap()
    {
        return minGap;
    }
}
