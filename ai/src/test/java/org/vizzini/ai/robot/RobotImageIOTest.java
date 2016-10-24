package org.vizzini.ai.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.File;
import java.io.InputStream;

import org.junit.Test;

/**
 * Provides tests for the <code>RobotImageIO</code> class.
 */
public final class RobotImageIOTest
{
    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readFile()
    {
        final File file = new File(getUserDir() + "/ai/src/test/resources/captured-images/Clay_Ask_20131107.png");
        final RobotImageIO imageIo = new RobotImageIO();

        final RobotImage result = imageIo.read(file);

        assertNotNull(result);
        assertThat(result.getWidth(), is(18));
        assertThat(result.getHeight(), is(7));
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readFileNull()
    {
        final RobotImageIO imageIo = new RobotImageIO();

        try
        {
            imageIo.read((File)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("file is null"));
        }
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readInputStream()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/captured-images/Clay_Ask_20131107.png");
        assertNotNull(inputStream);

        final RobotImageIO imageIo = new RobotImageIO();

        final RobotImage result = imageIo.read(inputStream);

        assertNotNull(result);
        assertThat(result.getWidth(), is(18));
        assertThat(result.getHeight(), is(7));
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readInputStreamNull()
    {
        final RobotImageIO imageIo = new RobotImageIO();

        try
        {
            imageIo.read((InputStream)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("inputStream is null"));
        }
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readString()
    {
        final RobotImageIO imageIo = new RobotImageIO();

        final RobotImage result = imageIo.read("/captured-images/Clay_Ask_20131107.png");

        assertNotNull(result);
        assertThat(result.getWidth(), is(18));
        assertThat(result.getHeight(), is(7));
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readStringNull()
    {
        final RobotImageIO imageIo = new RobotImageIO();

        try
        {
            imageIo.read((String)null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("filename is null or empty"));
        }
    }

    /**
     * @return the user directory.
     */
    private String getUserDir()
    {
        String userDir = System.getProperty("user.dir");
        final char charKey = '\\';
        int index = userDir.indexOf(charKey);

        while (index >= 0)
        {
            userDir = userDir.replace(charKey, '/');
            index = userDir.indexOf(charKey, index + 1);
        }

        String key = "jmthompson";

        if (userDir.endsWith(key))
        {
            userDir += "/Dropbox/SoftwareDev/JavaProjects/vizzini";
        }

        key = "/ai";

        if (userDir.endsWith(key))
        {
            final int len = userDir.length() - key.length();
            userDir = userDir.substring(0, len);
        }

        return userDir;
    }
}
