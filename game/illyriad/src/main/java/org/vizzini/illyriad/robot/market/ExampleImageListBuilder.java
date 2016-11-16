package org.vizzini.illyriad.robot.market;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * Provides a builder of an example image list.
 */
public final class ExampleImageListBuilder
{
    /**
     * @return a new list of example images.
     */
    public List<ExampleImage> build()
    {
        final int height = 7;
        final int decimalPointHeight = 7;
        final int commaHeight = 8;

        /** Example images. */
        final List<ExampleImage> exampleImages = new ArrayList<ExampleImage>();

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 3, 4, 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Air+Salt_Ask_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Arctic+Bow_Ask_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Battle+Sword_Bid_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 4, 5, 4, });
            exampleImages.add(new ExampleImage("Bone+Handled+Sword_Bid_20131210", digitWidths, height));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 4, 5, 4, });
            exampleImages.add(new ExampleImage("Bow_Bid_20131204", digitWidths, height));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 4, 5, 4, });
            exampleImages.add(new ExampleImage("Bow_Bid_20131210", digitWidths, height));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 5, 1, 4, });
            exampleImages.add(new ExampleImage("Clay_Ask_20131210", digitWidths, decimalPointHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 3, });
            exampleImages.add(new ExampleImage("Clay_Bid_20131210", digitWidths, decimalPointHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 3, 2, 5, 4, 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Cyclops+Entrail_Bid_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 3, 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Cyclops+Heart_Bid_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 4, 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Draught+Horse_Ask_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 5, 4, 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Silversteel+Sword_Bid_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("Steady+Warhorse_Ask_20131210", digitWidths, commaHeight));
        }

        {
            final List<Integer> digitWidths = Arrays.asList(new Integer[] { 3, 5, 2, 4, 5, 4, });
            exampleImages.add(new ExampleImage("War+Wolf_Bid_20131210", digitWidths, commaHeight));
        }

        return exampleImages;
    }
}
