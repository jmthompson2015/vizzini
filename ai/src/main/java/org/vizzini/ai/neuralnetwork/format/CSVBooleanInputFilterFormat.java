package org.vizzini.ai.neuralnetwork.format;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.BooleanInputFilter;
import org.vizzini.ai.neuralnetwork.InputFilter;

/**
 * Provides a boolean input filter formatter.
 */
public final class CSVBooleanInputFilterFormat implements BooleanInputFilterFormat
{
    @Override
    public String format(final InputFilter<boolean[]> filter)
    {
        String answer = null;

        if (filter != null)
        {
            answer = filter.getClass().getName();
        }

        return answer;
    }

    @Override
    public InputFilter<boolean[]> parse(final String source)
    {
        BooleanInputFilter answer = null;

        if (StringUtils.isNotEmpty(source) && !"null".equals(source))
        {
            answer = new BooleanInputFilter();
        }

        return answer;
    }
}
