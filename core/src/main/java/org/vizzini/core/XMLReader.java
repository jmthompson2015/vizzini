package org.vizzini.core;

import java.io.IOException;
import java.io.Reader;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;

import org.w3c.dom.Document;
import org.w3c.dom.Element;
import org.xml.sax.InputSource;
import org.xml.sax.SAXException;

/**
 * Provides an XML reader.
 */
public final class XMLReader
{
    /**
     * @param reader Reader. (required)
     * 
     * @return an XML document element.
     */
    public Element read(final Reader reader)
    {
        return read(reader, true);
    }

    /**
     * @param reader Reader. (required)
     * @param isVerbose Flag indicating whether to print informational messages.
     * 
     * @return an XML document element.
     */
    public Element read(final Reader reader, final boolean isVerbose)
    {
        if (reader == null)
        {
            throw new IllegalArgumentException("reader is null");
        }

        final long start = System.currentTimeMillis();

        Element answer = null;

        try
        {
            final DocumentBuilderFactory factory = DocumentBuilderFactory.newInstance();
            final DocumentBuilder builder = factory.newDocumentBuilder();
            final Document dom = builder.parse(new InputSource(reader));
            answer = dom.getDocumentElement();
        }
        catch (final ParserConfigurationException e)
        {
            throw new RuntimeException(e);
        }
        catch (final SAXException e)
        {
            throw new RuntimeException(e);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        if (isVerbose)
        {
            final long end = System.currentTimeMillis();
            new TimePrinter().printElapsedTime("XMLReader.read()", start, end);
        }

        return answer;
    }
}
