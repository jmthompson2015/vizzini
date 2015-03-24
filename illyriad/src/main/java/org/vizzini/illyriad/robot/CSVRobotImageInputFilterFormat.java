package org.vizzini.illyriad.robot;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.ai.neuralnetwork.InputFilter;
import org.vizzini.ai.neuralnetwork.format.InputFilterFormat;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a robot image input filter formatter.
 */
public final class CSVRobotImageInputFilterFormat implements InputFilterFormat<RobotImage>
{
    @Override
    public String format(final InputFilter<RobotImage> filter)
    {
        String answer = null;

        if (filter != null)
        {
            final RobotImageInputFilter myFilter = (RobotImageInputFilter)filter;

            final StringBuilder sb = new StringBuilder();

            sb.append(filter.getClass().getName()).append(", ");
            sb.append(myFilter.getMaxWidth()).append(", ");
            sb.append(myFilter.getMaxHeight());

            answer = sb.toString();
        }

        return answer;
    }

    @Override
    public RobotImageInputFilter parse(final String source)
    {
        RobotImageInputFilter answer = null;

        if (StringUtils.isNotEmpty(source) && !"null".equals(source))
        {
            final String[] parts = source.split("[,]");

            int k = 0;

            final String className = parts[k++].trim();
            final int maxWidth = Integer.parseInt(parts[k++].trim());
            final int maxHeight = Integer.parseInt(parts[k++].trim());

            if ("org.vizzini.illyriad.robot.BlackAndWhiteImageInputFilter".equals(className))
            {
                answer = new BlackAndWhiteImageInputFilter(maxWidth, maxHeight);
            }
            else if ("org.vizzini.illyriad.robot.GrayscaleImageInputFilter".equals(className))
            {
                answer = new GrayScaleImageInputFilter(maxWidth, maxHeight);
            }
            else if ("org.vizzini.illyriad.robot.RGBImageInputFilter".equals(className))
            {
                answer = new RGBImageInputFilter(maxWidth, maxHeight);
            }
            else
            {
                throw new RuntimeException("Unknown input filter type: " + className);
            }
        }

        return answer;
    }
}
