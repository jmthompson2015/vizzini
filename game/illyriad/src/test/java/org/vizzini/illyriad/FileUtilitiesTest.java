package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

import org.junit.Test;

/**
 * Provides tests for the <code>FileUtilities</code> class.
 */
public final class FileUtilitiesTest
{
    /** Flag indicating whether test output should be verbose. */
    private static final boolean IS_VERBOSE = false;

    /** File utilities. */
    private final FileUtilities fileUtils = new FileUtilities();

    /** User directory. */
    public static final File USER_DIR;

    static
    {
        String userDir = System.getProperty("user.dir");

        final String key = "/illyriad";

        if (userDir.endsWith(key))
        {
            userDir = userDir.substring(0, userDir.length() - key.length());
        }

        USER_DIR = new File(userDir);

        System.out.println("USER_DIR = [" + USER_DIR + "]");
    }

    /**
     * Test the <code>getUserDir()</code> method.
     */
    @Test
    public void getUserDir()
    {
        final String result = fileUtils.getUserDir();

        assertNotNull(result);
        assertThat(result, is(System.getProperty("user.dir")));
    }

    /**
     * Test the <code>listFiles()</code> method.
     */
    @Test
    public void listFiles()
    {
        final URL url = createUrl();
        final URL[] result = fileUtils.listFiles(url);

        assertNotNull(result);
        assertThat(result.length, is(11));
        assertThat(parseFilename(result[0].getFile()), is("captured-images"));
        assertThat(parseFilename(result[1].getFile()), is("numericNeuralNetworkAppliance.txt"));
        assertThat(parseFilename(result[2].getFile()), is("Adventurer's+Sword_Ask.png"));
        assertThat(parseFilename(result[3].getFile()), is(".DS_Store"));
        assertThat(parseFilename(result[4].getFile()), is("WoodAsk20131010.png"));
        assertThat(parseFilename(result[5].getFile()), is("marketData"));
    }

    /**
     * Test the <code>listFiles()</code> method.
     */
    @Test
    public void listFilesNull()
    {
        try
        {
            fileUtils.listFiles(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("url == null"));
        }
    }

    /**
     * Test the <code>listFilesSorted()</code> method.
     */
    @Test
    public void listFilesSorted()
    {
        final URL url = createUrl();
        final URL[] result = fileUtils.listFilesSorted(url);

        assertNotNull(result);
        assertThat(result.length, is(11));
        assertThat(parseFilename(result[0].getFile()), is(".DS_Store"));
        assertThat(parseFilename(result[1].getFile()), is(".svn"));
        assertThat(parseFilename(result[2].getFile()), is("Adventurer's+Sword_Ask.png"));
        assertThat(parseFilename(result[3].getFile()), is("WoodAsk2.png"));
    }

    /**
     * Test the <code>listFilesSorted()</code> method.
     */
    @Test
    public void listFilesSortedNull()
    {
        try
        {
            fileUtils.listFilesSorted(null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("url == null"));
        }
    }

    /**
     * @return a new URL to the test resources directory.
     */
    private URL createUrl()
    {
        final String protocol = "file";
        final String host = "";
        final String file = USER_DIR + "/illyriad/src/test/resources";

        if (IS_VERBOSE)
        {
            System.out.println("file = [" + file + "]");
        }

        URL answer;

        try
        {
            answer = new URL(protocol, host, file);
        }
        catch (final MalformedURLException e)
        {
            throw new RuntimeException(e);
        }

        if (IS_VERBOSE)
        {
            System.out.println("url = " + answer);
        }

        return answer;
    }

    /**
     * @param filepath Filepath.
     * 
     * @return the last element in the given parameter.
     */
    private String parseFilename(final String filepath)
    {
        String answer = filepath;

        final int index = filepath.lastIndexOf("/");
        if (index >= 0)
        {
            answer = filepath.substring(index + 1);
        }

        return answer;
    }
}
