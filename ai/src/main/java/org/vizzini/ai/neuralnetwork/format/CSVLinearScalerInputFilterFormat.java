package org.vizzini.ai.neuralnetwork.format;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.InputFilter;
import org.vizzini.ai.neuralnetwork.LinearScalerFilter;

/**
 * Provides a linear scaler input filter formatter.
 */
public final class CSVLinearScalerInputFilterFormat implements LinearScalerInputFilterFormat
{
    @Override
    public String format(final InputFilter<double[]> filter)
    {
        String answer = null;

        if (filter != null)
        {
            final LinearScalerFilter myFilter = (LinearScalerFilter)filter;

            final StringBuilder sb = new StringBuilder();

            sb.append(filter.getClass().getName()).append(", ");
            sb.append(myFilter.getMinInput()).append(", ");
            sb.append(myFilter.getMaxInput()).append(", ");
            sb.append(myFilter.getMinOutput()).append(", ");
            sb.append(myFilter.getMaxOutput());

            answer = sb.toString();
        }

        return answer;
    }

    @Override
    public LinearScalerFilter parse(final String source)
    {
        LinearScalerFilter answer = null;

        if (StringUtils.isNotEmpty(source) && !"null".equals(source))
        {
            final String[] parts = source.split("[,]");

            int k = 0;

            k++;
            final double minInput = Double.parseDouble(parts[k++].trim());
            final double maxInput = Double.parseDouble(parts[k++].trim());
            final double minOutput = Double.parseDouble(parts[k++].trim());
            final double maxOutput = Double.parseDouble(parts[k++].trim());

            answer = new LinearScalerFilter(minInput, maxInput, minOutput, maxOutput);
        }

        return answer;
    }
}
