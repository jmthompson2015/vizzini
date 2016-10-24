package org.vizzini.illyriad.robot;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.OutputFilter;
import org.vizzini.ai.neuralnetwork.format.OutputFilterFormat;

/**
 * Provides a numeric output filter formatter.
 */
public final class CSVNumericOutputFilterFormat implements OutputFilterFormat<String>
{
    @Override
    public String format(final OutputFilter<String> filter)
    {
        String answer = null;

        if (filter != null)
        {
            answer = filter.getClass().getName();
        }

        return answer;
    }

    @Override
    public NumericOutputFilter parse(final String source)
    {
        NumericOutputFilter answer = null;

        if (StringUtils.isNotEmpty(source) && !"null".equals(source))
        {
            answer = new NumericOutputFilter();
        }

        return answer;
    }
}
