package org.vizzini.ai.robot;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

import javax.imageio.ImageIO;

import org.apache.commons.lang3.StringUtils;

/**
 * Provides input/output functionality for a robot image.
 */
public final class RobotImageIO
{
    /**
     * @param file File.
     * 
     * @return the image read from the given parameter.
     */
    public RobotImage read(final File file)
    {
        if (file == null)
        {
            throw new IllegalArgumentException("file is null");
        }

        FileInputStream inputStream;

        try
        {
            inputStream = new FileInputStream(file);
        }
        catch (final FileNotFoundException e)
        {
            throw new RuntimeException(e);
        }

        return read(inputStream);
    }

    /**
     * @param inputStream Input stream.
     * 
     * @return the image read from the given parameter.
     */
    public RobotImage read(final InputStream inputStream)
    {
        if (inputStream == null)
        {
            throw new IllegalArgumentException("inputStream is null");
        }

        RobotImage answer = null;

        try
        {
            final BufferedImage image = ImageIO.read(inputStream);
            answer = new DefaultRobotImage(image);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @param filename Filename.
     * 
     * @return the image read from the given parameter.
     */
    public RobotImage read(final String filename)
    {
        if (StringUtils.isEmpty(filename))
        {
            throw new IllegalArgumentException("filename is null or empty");
        }

        final InputStream inputStream = getClass().getResourceAsStream(filename);

        return read(inputStream);
    }

    /**
     * @param file File.
     * @param image Image.
     */
    public void write(final File file, final RobotImage image)
    {
        if (file == null)
        {
            throw new IllegalArgumentException("file is null");
        }

        if (image == null)
        {
            throw new IllegalArgumentException("image is null");
        }

        try
        {
            file.mkdirs();
            ImageIO.write(image, "png", file);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param filename Filename.
     * @param image Image.
     */
    public void write(final String filename, final RobotImage image)
    {
        if (StringUtils.isEmpty(filename))
        {
            throw new IllegalArgumentException("filename is null or empty");
        }

        if (image == null)
        {
            throw new IllegalArgumentException("image is null");
        }

        try
        {
            final File file = new File(filename + ".png");
            file.mkdirs();
            ImageIO.write(image, "png", file);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
