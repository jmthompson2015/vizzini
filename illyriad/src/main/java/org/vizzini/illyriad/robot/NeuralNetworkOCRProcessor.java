package org.vizzini.illyriad.robot;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a neural network implementation of an OCR processor.
 */
public final class NeuralNetworkOCRProcessor implements OCRProcessor
{
    /** Neural network appliance. */
    private final NeuralNetworkAppliance<RobotImage, String> neuralNetworkAppliance;

    /** Image splitter. */
    private final ImageSplitter splitter;

    /**
     * Construct this object.
     * 
     * @param splitter Image splitter.
     * @param neuralNetworkAppliance Neural network appliance. (required)
     */
    @SuppressWarnings("hiding")
    public NeuralNetworkOCRProcessor(final ImageSplitter splitter,
            final NeuralNetworkAppliance<RobotImage, String> neuralNetworkAppliance)
    {
        if (splitter == null)
        {
            throw new IllegalArgumentException("splitter is null");
        }

        if (neuralNetworkAppliance == null)
        {
            throw new IllegalArgumentException("neuralNetworkAppliance is null");
        }

        this.splitter = splitter;
        this.neuralNetworkAppliance = neuralNetworkAppliance;
    }

    /**
     * Construct this object.
     * 
     * @param neuralNetworkAppliance Neural network appliance. (required)
     */
    @SuppressWarnings("hiding")
    public NeuralNetworkOCRProcessor(final NeuralNetworkAppliance<RobotImage, String> neuralNetworkAppliance)
    {
        this(new DefaultImageSplitter(), neuralNetworkAppliance);
    }

    @Override
    public List<String> process(final List<RobotImage> images)
    {
        final List<String> answer = new ArrayList<String>();

        for (final RobotImage image : images)
        {
            final String value = process(image);
            answer.add(value);
        }

        return answer;
    }

    @Override
    public String process(final RobotImage image)
    {
        final StringBuilder sb = new StringBuilder();

        // Split the image into single character segments.
        final List<RobotImage> characterImages = splitter.split(image);

        for (final RobotImage characterImage : characterImages)
        {
            // Evaluate each segment with the neural network.
            final String result = neuralNetworkAppliance.evaluate(characterImage);

            // Append the results.
            if (StringUtils.isNotEmpty(result))
            {
                sb.append(result);
            }
        }

        return sb.toString();
    }
}
