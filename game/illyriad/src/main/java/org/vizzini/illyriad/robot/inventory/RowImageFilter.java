package org.vizzini.illyriad.robot.inventory;

import java.io.File;
import java.util.List;

import org.vizzini.ai.robot.RobotColor;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.robot.ImageFilter;

/**
 * Provides a row image filter.
 */
public final class RowImageFilter implements ImageFilter
{
    /** Minimum region gap. */
    private final int minGap;

    /** Threshold color scale. */
    private final double thresholdColorScale;

    /**
     * Construct this object.
     */
    public RowImageFilter()
    {
        this(1.07, 4);
    }

    /**
     * Construct this object.
     * 
     * @param thresholdColorScale Threshold color scale.
     * @param minGap Minimum region gap.
     */
    @SuppressWarnings("hiding")
    public RowImageFilter(final double thresholdColorScale, final int minGap)
    {
        this.thresholdColorScale = thresholdColorScale;
        this.minGap = minGap;
    }

    @Override
    public RobotImage filter(final RobotImage rowImage)
    {
        RobotImage answer = null;

        if (rowImage != null)
        {
            // Split out count.
            final RobotColor thresholdColor = rowImage.getMidrangeColor().scale(thresholdColorScale);
            final List<RobotImage> rowImages = rowImage.splitAlongVerticalRegion(thresholdColor, minGap);

            final File outputDir = new File(Locations.INVENTORY_DATA_DIR, "temp");
            outputDir.delete();
            final RobotImageIO imageIo = new RobotImageIO();
            for (int i = 0; i < rowImages.size(); i++)
            {
                final RobotImage image = rowImages.get(i);
                imageIo.write(new File(outputDir, "rowSplit_" + i + ".png"), image);
            }

            if (rowImages.size() > 2)
            {
                answer = rowImages.get(2);
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
