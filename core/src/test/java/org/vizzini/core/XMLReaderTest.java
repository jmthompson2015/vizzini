package org.vizzini.core;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import java.io.StringReader;

import org.junit.Test;
import org.w3c.dom.Element;

/**
 * Provides tests for the <code>XMLReader</code> class.
 */
public final class XMLReaderTest
{
    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void read()
    {
        // Setup.
        final StringReader reader = new StringReader("<node attr1=\"2\"><data>3</data><data>4</data></node>");
        final XMLReader xmlReader = new XMLReader();

        // Run.
        final Element result = xmlReader.read(reader, false);

        // Verify.
        assertNotNull(result);
        assertThat(result.getAttribute("attr1"), is("2"));
        assertThat(result.getFirstChild().getTextContent(), is("3"));
        assertThat(result.getLastChild().getTextContent(), is("4"));
        assertThat(result.getElementsByTagName("data").item(0).getTextContent(), is("3"));
        assertThat(result.getElementsByTagName("data").item(1).getTextContent(), is("4"));
    }

    /**
     * Test the <code>read()</code> method.
     */
    @Test
    public void readNull()
    {
        final XMLReader xmlReader = new XMLReader();

        try
        {
            xmlReader.read(null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("reader is null"));
        }
    }
}
