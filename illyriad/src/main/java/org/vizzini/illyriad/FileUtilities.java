package org.vizzini.illyriad;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Scanner;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Provides utilities for a file.
 */
public final class FileUtilities
{
    /**
     * @param inputStream Input stream.
     */
    public void close(final InputStream inputStream)
    {
        if (inputStream != null)
        {
            try
            {
                inputStream.close();
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * @param reader Reader.
     */
    public void close(final Reader reader)
    {
        if (reader != null)
        {
            try
            {
                reader.close();
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * @param writer Writer.
     */
    public void close(final Writer writer)
    {
        if (writer != null)
        {
            try
            {
                writer.flush();
                writer.close();
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * @param inputFilepath Input filepath.
     * 
     * @return a new input reader.
     */
    public Reader createFileReader(final File inputFilepath)
    {
        Reader answer;

        try
        {
            answer = new FileReader(inputFilepath);
        }
        catch (final FileNotFoundException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @param outputFilepath Output filepath.
     * 
     * @return a new output writer.
     */
    public Writer createFileWriter(final File outputFilepath)
    {
        outputFilepath.delete();
        outputFilepath.getParentFile().mkdirs();

        Writer answer;

        try
        {
            answer = new FileWriter(outputFilepath);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @return the user directory.
     */
    public String getUserDir()
    {
        String userDir = System.getProperty("user.dir");
        final char charKey = '\\';
        int index = userDir.indexOf(charKey);

        while (index >= 0)
        {
            userDir = userDir.replace(charKey, '/');
            index = userDir.indexOf(charKey, index + 1);
        }

        final String key = "jmthompson";

        if (userDir.endsWith(key))
        {
            userDir += "/Dropbox/SoftwareDev/JavaProjects/vizzini";
        }

        return userDir;
    }

    /**
     * @param url Parent directory of the files to list.
     * 
     * @return a collection of URLs representing files.
     */
    public URL[] listFiles(final URL url)
    {
        if (url == null)
        {
            throw new IllegalArgumentException("url == null");
        }

        String urlStr = url.toString();

        if (!urlStr.endsWith("/"))
        {
            urlStr += "/";
        }

        final Set<URL> files = new HashSet<URL>();
        BufferedReader reader = null;

        try
        {
            reader = new BufferedReader(new InputStreamReader((InputStream)url.getContent()));

            // Step through each line and attempt to parse out a filename.
            String inputLine;

            while ((inputLine = reader.readLine()) != null)
            {
                final String filename = parseFilename(inputLine);

                if (filename != null)
                {
                    files.add(new URL(urlStr + filename));
                }
            }
        }
        catch (final MalformedURLException e)
        {
            throw new RuntimeException(e);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            if (reader != null)
            {
                try
                {
                    reader.close();
                }
                catch (final IOException ignore)
                {
                    // Nothing to do.
                }
            }
        }

        return files.toArray(new URL[files.size()]);
    }

    /**
     * @param url Parent directory of the files to list.
     * 
     * @return a collection of URLs representing files.
     */
    public URL[] listFilesSorted(final URL url)
    {
        final URL[] files = listFiles(url);

        final List<URL> fileList = new ArrayList<URL>();

        for (final URL file : files)
        {
            fileList.add(file);
        }

        final Comparator<URL> comparator = new Comparator<URL>()
        {
            @Override
            public int compare(final URL url1, final URL url2)
            {
                return url1.getFile().compareTo(url2.getFile());
            }
        };

        Collections.sort(fileList, comparator);

        return fileList.toArray(new URL[fileList.size()]);
    }

    /**
     * @param reader Reader.
     * 
     * @return the content of the given parameter.
     */
    public String readContent(final Reader reader)
    {
        final StringBuilder sb = new StringBuilder();
        final Scanner scanner = new Scanner(reader);

        while (scanner.hasNextLine())
        {
            sb.append(scanner.nextLine()).append("\n");
        }

        return sb.toString();
    }

    /**
     * Parse out the filename from the given HTML input line. The given line is assumed to be from a directory listing
     * in HTML.
     * 
     * @param inputLine Line to parse.
     * 
     * @return the filename.
     */
    private String parseFilename(final String inputLine)
    {
        String answer = null;

        // Input line is assumed to contain something like <A HREF="filename">whatever</A>.
        final Matcher m = Pattern.compile("<a href=\"(.*)\">.*</a>", Pattern.CASE_INSENSITIVE).matcher(inputLine);

        if (m.find())
        {
            final String filename = m.group(1);

            if ((filename != null) && (filename.length() > 0))
            {
                answer = filename;
            }
        }

        if (answer == null)
        {
            answer = inputLine;
        }

        return answer;
    }
}
