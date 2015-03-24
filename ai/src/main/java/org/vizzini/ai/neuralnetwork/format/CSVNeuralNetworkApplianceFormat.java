package org.vizzini.ai.neuralnetwork.format;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.DefaultNeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.InputFilter;
import org.vizzini.ai.neuralnetwork.NeuralNetwork;
import org.vizzini.ai.neuralnetwork.NeuralNetworkAppliance;
import org.vizzini.ai.neuralnetwork.OutputFilter;

/**
 * Provides a neural network appliance formatter.
 * 
 * @param <I> Input type.
 * @param <O> Output type.
 */
public final class CSVNeuralNetworkApplianceFormat<I, O> implements NeuralNetworkApplianceFormat<I, O>
{
    /** Input filter formatter. */
    private final InputFilterFormat<I> inputFilterFormatter;

    /** Neural network formatter. */
    private final NeuralNetworkFormat neuralNetworkFormatter;

    /** Output filter formatter. */
    private final OutputFilterFormat<O> outputFilterFormatter;

    /**
     * Construct this object.
     * 
     * @param inputFilterFormatter Input filter formatter.
     * @param neuralNetworkFormatter Neural network formatter.
     * @param outputFilterFormatter Output filter formatter.
     */
    @SuppressWarnings("hiding")
    public CSVNeuralNetworkApplianceFormat(final InputFilterFormat<I> inputFilterFormatter,
            final NeuralNetworkFormat neuralNetworkFormatter, final OutputFilterFormat<O> outputFilterFormatter)
    {
        this.inputFilterFormatter = inputFilterFormatter;
        this.neuralNetworkFormatter = neuralNetworkFormatter;
        this.outputFilterFormatter = outputFilterFormatter;
    }

    @Override
    public String format(final NeuralNetworkAppliance<I, O> appliance)
    {
        String answer = null;

        if (appliance != null)
        {
            final StringBuilder sb = new StringBuilder();

            sb.append(appliance.getClass().getName()).append("\n");
            sb.append(inputFilterFormatter.format(appliance.getInputFilter())).append("\n");
            sb.append(neuralNetworkFormatter.format(appliance.getNeuralNetwork()));
            sb.append(outputFilterFormatter.format(appliance.getOutputFilter()));

            answer = sb.toString();
        }

        return answer;
    }

    @Override
    public NeuralNetworkAppliance<I, O> parse(final String source)
    {
        NeuralNetworkAppliance<I, O> answer = null;

        if (StringUtils.isNotEmpty(source))
        {
            final String[] lines = source.split("[\n]");
            final int lineCount = lines.length;

            // for (int i = 0; i < lineCount; i++)
            // {
            // System.out.println(i + " " + lines[i]);
            // }

            final StringBuilder sb = new StringBuilder();

            for (int i = 2; i < (lineCount - 1); i++)
            {
                sb.append(lines[i]).append("\n");
            }

            final InputFilter<I> inputFilter = inputFilterFormatter.parse(lines[1]);
            final NeuralNetwork neuralNetwork = neuralNetworkFormatter.parse(sb.toString());
            final OutputFilter<O> outputFilter = outputFilterFormatter.parse(lines[lineCount - 1]);

            answer = new DefaultNeuralNetworkAppliance<I, O>(inputFilter, neuralNetwork, outputFilter);
        }

        return answer;
    }
}
