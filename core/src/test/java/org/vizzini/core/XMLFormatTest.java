package org.vizzini.core;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;
import org.w3c.dom.Element;

/**
 * Provides tests for the <code>XMLFormat</code> class.
 */
public final class XMLFormatTest
{
    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void format()
    {
        // Setup.
        final XMLFormat formatter = new XMLFormat();
        final Element element = formatter.parse("<node attr1=\"2\"><data>3</data><data>4</data></node>");

        // Run.
        final String result = formatter.format(element);

        // Verify.
        assertNotNull(result);
        final String expected = "<node attr1=\"2\">\n    <data>3</data>\n    <data>4</data>\n</node>\n";
        System.out.println(result);
        assertThat(result, is(expected));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void formatNull()
    {
        final XMLFormat formatter = new XMLFormat();

        try
        {
            formatter.format((Element)null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("element is null"));
        }
    }

    /**
     * Test the <code>parse()</code> method.
     */
    @Test
    public void parse()
    {
        // Setup.
        final String source = "<node attr1=\"2\"><data>3</data><data>4</data></node>";
        final XMLFormat formatter = new XMLFormat();

        // Run.
        final Element result = formatter.parse(source);

        // Verify.
        assertNotNull(result);
        assertThat(result.getAttribute("attr1"), is("2"));
        assertThat(result.getFirstChild().getTextContent(), is("3"));
        assertThat(result.getLastChild().getTextContent(), is("4"));
        assertThat(result.getElementsByTagName("data").item(0).getTextContent(), is("3"));
        assertThat(result.getElementsByTagName("data").item(1).getTextContent(), is("4"));
    }

    /**
     * Test the <code>format()</code> method.
     */
    @Test
    public void parseNull()
    {
        final XMLFormat formatter = new XMLFormat();

        try
        {
            formatter.parse((String)null);
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("source is null or empty"));
        }
    }
}
