package org.vizzini.illyriad.robot;

import java.io.File;
import java.net.URL;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a training example.
 */
public final class Example
{
    /** Image. */
    private final RobotImage image;

    /** Desired neural network appliance output. */
    private final String output;

    /** Image file URL. */
    private final URL url;

    /**
     * Construct this object.
     * 
     * @param url Image file URL.
     * @param image Image.
     * @param output Desired neural network appliance output.
     */
    @SuppressWarnings("hiding")
    public Example(final URL url, final RobotImage image, final String output)
    {
        this.url = url;
        this.image = image;
        this.output = output;
    }

    /**
     * @return image directory name.
     */
    public String getDirectoryName()
    {
        final File file = new File(url.toExternalForm());
        String answer = file.getAbsolutePath();

        final int index2 = answer.lastIndexOf("/");
        final int index = answer.lastIndexOf("/", index2 - 1);
        answer = answer.substring(index + 1, index2);

        return answer;
    }

    /**
     * @return image filename.
     */
    public String getFilename()
    {
        final File file = new File(url.toExternalForm());

        return file.getName();
    }

    /**
     * @return the image
     */
    public RobotImage getImage()
    {
        return image;
    }

    /**
     * @return the outputs
     */
    public String getOutput()
    {
        return output;
    }

    /**
     * @return the url
     */
    public URL getUrl()
    {
        return url;
    }

    /**
     * @return a string representation of this object.
     */
    @Override
    public String toString()
    {
        return ToStringBuilder.reflectionToString(this, ToStringStyle.MULTI_LINE_STYLE);
    }
}
