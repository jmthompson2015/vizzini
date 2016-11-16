package org.vizzini.illyriad.robot;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.io.File;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.net.URL;

import org.junit.Test;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;
import org.vizzini.illyriad.FileUtilities;

/**
 * Provides tests for the <code>Example</code> class.
 */
public final class ExampleTest
{
    /** User directory. */
    public static final File USER_DIR;

    static
    {
        final FileUtilities fileUtils = new FileUtilities();
        String userDir = fileUtils.getUserDir();

        final String key = "/illyriad";

        if (!userDir.endsWith(key))
        {
            userDir += key;
        }

        USER_DIR = new File(userDir);

        System.out.println("USER_DIR = [" + USER_DIR + "]");
    }

    /**
     * Test the <code>getDirectoryName()</code> method.
     */
    @Test
    public void getDirectoryName()
    {
        final Example example = createExample();

        final String result = example.getDirectoryName();

        assertNotNull(result);
        assertThat(result, is("resources"));
    }

    /**
     * Test the <code>getFilename()</code> method.
     */
    @Test
    public void getFilename()
    {
        final Example example = createExample();

        final String result = example.getFilename();

        assertNotNull(result);
        assertThat(result, is("WoodAsk2.png"));
    }

    /**
     * Test the <code>getImage()</code> method.
     */
    @Test
    public void getImage()
    {
        final Example example = createExample();

        final RobotImage result = example.getImage();

        assertNotNull(result);
        assertThat(result.getWidth(), is(5));
        assertThat(result.getHeight(), is(12));
    }

    /**
     * Test the <code>getUrl()</code> method.
     */
    @Test
    public void getUrl()
    {
        final Example example = createExample();

        final URL result = example.getUrl();

        assertNotNull(result);
        assertThat(
                result.getFile(),
                is("/Users/jmthompson/Dropbox/SoftwareDev/JavaProjects/vizzini/illyriad/src/test/resources/WoodAsk2.png"));
    }

    /**
     * @return a new example.
     */
    private Example createExample()
    {
        final URL url = createUrl();

        String imageFilename = url.getFile();
        final int index = imageFilename.lastIndexOf("/");
        imageFilename = imageFilename.substring(index);
        System.out.println("imageFilename = [" + imageFilename + "]");

        final RobotImageIO imageIo = new RobotImageIO();
        final InputStream inputStream = getClass().getResourceAsStream(imageFilename);

        final RobotImage image = imageIo.read(inputStream);

        final String output = "8";

        return new Example(url, image, output);
    }

    /**
     * @return a new URL to the test resources directory.
     */
    private URL createUrl()
    {
        final String protocol = "file";
        final String host = "";
        final String file = USER_DIR + "/src/test/resources/WoodAsk2.png";

        URL answer;

        try
        {
            answer = new URL(protocol, host, file);
        }
        catch (final MalformedURLException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }
}
