package org.vizzini.ai.neuralnetwork.format;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.ActivationFunction;
import org.vizzini.ai.neuralnetwork.BipolarSigmoidFunction;
import org.vizzini.ai.neuralnetwork.DefaultLayer;
import org.vizzini.ai.neuralnetwork.Layer;
import org.vizzini.ai.neuralnetwork.PassThroughFunction;
import org.vizzini.ai.neuralnetwork.SigmoidFunction;
import org.vizzini.ai.neuralnetwork.ThresholdFunction;
import org.vizzini.ai.neuralnetwork.ThresholdLinearFunction;

/**
 * Provides a layer formatter.
 */
public final class CSVLayerFormat implements LayerFormat
{
    @Override
    public String format(final Layer layer)
    {
        String answer = null;

        if (layer != null)
        {
            final ActivationFunction function = layer.getActivationFunction();

            final StringBuilder sb = new StringBuilder();

            sb.append(layer.getClass().getName()).append(", ");
            sb.append(layer.getName()).append(", ");
            sb.append(layer.getNodeCountWithoutBias()).append(", ");

            if (function != null)
            {
                sb.append(function.getClass().getSimpleName());
            }

            sb.append(", ");
            sb.append(layer.isBiasNodeUsed());

            answer = sb.toString();
        }

        return answer;
    }

    @Override
    public Layer parse(final String source)
    {
        Layer answer = null;

        if (StringUtils.isNotEmpty(source))
        {
            final String[] parts = source.split("[,]");

            int k = 0;

            k++;
            final String name = parts[k++].trim();
            final int nodeCount = Integer.parseInt(parts[k++].trim());
            final ActivationFunction function = createActivationFunction(parts[k++].trim());
            final boolean isBiasNodeUsed = Boolean.parseBoolean(parts[k++].trim());

            answer = new DefaultLayer(name, nodeCount, function, isBiasNodeUsed);
        }

        return answer;
    }

    /**
     * @param functionName Activation function name.
     * 
     * @return a new instance of the given class.
     */
    private ActivationFunction createActivationFunction(final String functionName)
    {
        ActivationFunction answer = null;

        if (StringUtils.isNotEmpty(functionName))
        {
            if ("BipolarSigmoidFunction".equals(functionName))
            {
                answer = new BipolarSigmoidFunction();
            }
            else if ("PassThroughFunction".equals(functionName))
            {
                answer = new PassThroughFunction();
            }
            else if ("SigmoidFunction".equals(functionName))
            {
                answer = new SigmoidFunction();
            }
            else if ("ThresholdFunction".equals(functionName))
            {
                answer = new ThresholdFunction();
            }
            else if ("ThresholdLinearFunction".equals(functionName))
            {
                answer = new ThresholdLinearFunction();
            }
            else
            {
                throw new RuntimeException("Unknown function: [" + functionName + "]");
            }
        }

        return answer;
    }
}
