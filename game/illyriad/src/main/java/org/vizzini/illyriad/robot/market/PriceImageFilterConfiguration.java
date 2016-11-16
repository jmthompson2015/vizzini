package org.vizzini.illyriad.robot.market;

import java.awt.RenderingHints;

/**
 * Provides a price image filter configuration for a market data price image.
 */
public final class PriceImageFilterConfiguration
{
    /** Black and white threshold color scale. */
    private final double blackAndWhiteColorScale;

    /** First flag indicating whether the image is normalized. */
    private final boolean isNormalized0;

    /** Second flag indicating whether the image is normalized. */
    private final boolean isNormalized1;

    /** Rescale offset. */
    private final Float offset;

    /** Rescale offsets. */
    private final Float[] offsets;

    /** Rescale rendering hints. */
    private final RenderingHints renderingHints = null;

    /** Rescale scale factor. */
    private final Float scaleFactor;

    /** Rescale scale factors. */
    private final Float[] scaleFactors;

    /** Trim threshold color scale. */
    private final double trimColorScale;

    /**
     * Construct this object.
     */
    public PriceImageFilterConfiguration()
    {
        this(true, new Float[] { 5.22f, 6.33f, 3.35f, }, new Float[] { -458.0f, -761.0f, 227.0f, }, false, 2.0, 1.41);
    }

    /**
     * Construct this object.
     * 
     * @param isNormalized0 First flag indicating whether the image is normalized.
     * @param scaleFactor Rescale scale factor.
     * @param offset Rescale offset.
     * @param isNormalized1 Second flag indicating whether the image is normalized.
     * @param trimColorScale Trim threshold color scale.
     * @param blackAndWhiteColorScale Black and white threshold color scale.
     */
    @SuppressWarnings("hiding")
    public PriceImageFilterConfiguration(final boolean isNormalized0, final float scaleFactor, final float offset,
            final boolean isNormalized1, final double trimColorScale, final double blackAndWhiteColorScale)
    {
        this.isNormalized0 = isNormalized0;
        this.scaleFactor = scaleFactor;
        this.offset = offset;
        this.isNormalized1 = isNormalized1;
        this.trimColorScale = trimColorScale;
        this.blackAndWhiteColorScale = blackAndWhiteColorScale;

        this.scaleFactors = null;
        this.offsets = null;
    }

    /**
     * Construct this object.
     * 
     * @param isNormalized0 First flag indicating whether the image is normalized.
     * @param scaleFactors Rescale scale factors.
     * @param offsets Rescale offsets.
     * @param isNormalized1 Second flag indicating whether the image is normalized.
     * @param trimColorScale Trim threshold color scale.
     * @param blackAndWhiteColorScale Black and white threshold color scale.
     */
    @SuppressWarnings("hiding")
    public PriceImageFilterConfiguration(final boolean isNormalized0, final Float[] scaleFactors,
            final Float[] offsets, final boolean isNormalized1, final double trimColorScale,
            final double blackAndWhiteColorScale)
    {
        if (scaleFactors == null)
        {
            throw new IllegalArgumentException("scaleFactors is null");
        }

        if (offsets == null)
        {
            throw new IllegalArgumentException("offsets is null");
        }

        this.isNormalized0 = isNormalized0;
        this.scaleFactors = scaleFactors;
        this.offsets = offsets;
        this.isNormalized1 = isNormalized1;
        this.trimColorScale = trimColorScale;
        this.blackAndWhiteColorScale = blackAndWhiteColorScale;

        this.scaleFactor = null;
        this.offset = null;
    }

    /**
     * @return the blackAndWhiteColorScale
     */
    public double getBlackAndWhiteColorScale()
    {
        return blackAndWhiteColorScale;
    }

    /**
     * @return the offset
     */
    public Float getOffset()
    {
        return offset;
    }

    /**
     * @return the offsets
     */
    public Float[] getOffsets()
    {
        return offsets;
    }

    /**
     * @return the renderingHints
     */
    public RenderingHints getRenderingHints()
    {
        return renderingHints;
    }

    /**
     * @return the scaleFactor
     */
    public Float getScaleFactor()
    {
        return scaleFactor;
    }

    /**
     * @return the scaleFactors
     */
    public Float[] getScaleFactors()
    {
        return scaleFactors;
    }

    /**
     * @return the trimColorScale
     */
    public double getTrimColorScale()
    {
        return trimColorScale;
    }

    /**
     * @return the isNormalized0
     */
    public boolean isNormalized0()
    {
        return isNormalized0;
    }

    /**
     * @return the isNormalized1
     */
    public boolean isNormalized1()
    {
        return isNormalized1;
    }
}
