package org.vizzini.core;

import java.io.ByteArrayOutputStream;
import java.io.StringReader;

import javax.xml.transform.OutputKeys;
import javax.xml.transform.Source;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerConfigurationException;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;

import org.apache.commons.lang3.StringUtils;
import org.w3c.dom.Element;

/**
 * Provides a formatter for XML.
 */
public final class XMLFormat implements Format<Element>
{
    /** Indent amount. */
    private final String amountProperty;

    /** Flag indicating whether to indent the formatted XML. */
    private final String indentProperty;

    /** Flag indicating whether to omit the XML declaration. */
    private final String omittedProperty;

    /** XML reader. */
    private final XMLReader xmlReader;

    /**
     * Construct this object.
     */
    public XMLFormat()
    {
        this(new XMLReader());
    }

    /**
     * Construct this object.
     * 
     * @param isXmlDeclarationOmitted Flag indicating whether to omit the XML declaration.
     * @param isIndented Flag indicating whether to indent the formatted XML.
     * @param indentAmount Indent amount.
     */
    public XMLFormat(final boolean isXmlDeclarationOmitted, final boolean isIndented, final int indentAmount)
    {
        this(isXmlDeclarationOmitted, isIndented, indentAmount, new XMLReader());
    }

    /**
     * Construct this object.
     * 
     * @param isXmlDeclarationOmitted Flag indicating whether to omit the XML declaration.
     * @param isIndented Flag indicating whether to indent the formatted XML.
     * @param indentAmount Indent amount.
     * @param xmlReader Reader.
     */
    @SuppressWarnings("hiding")
    public XMLFormat(final boolean isXmlDeclarationOmitted, final boolean isIndented, final int indentAmount,
            final XMLReader xmlReader)
    {
        if (xmlReader == null)
        {
            throw new IllegalArgumentException("xmlReader is null");
        }

        omittedProperty = (isXmlDeclarationOmitted ? "yes" : "no");
        indentProperty = (isIndented ? "yes" : "no");
        amountProperty = String.valueOf(indentAmount);
        this.xmlReader = xmlReader;
    }

    /**
     * Construct this object.
     * 
     * @param xmlReader Reader.
     */
    @SuppressWarnings("hiding")
    public XMLFormat(final XMLReader xmlReader)
    {
        this(true, true, 4, xmlReader);
    }

    @Override
    public String format(final Element element)
    {
        if (element == null)
        {
            throw new IllegalArgumentException("element is null");
        }

        final DOMSource source = new DOMSource(element);

        return format(source);
    }

    @Override
    public Element parse(final String source)
    {
        if (StringUtils.isEmpty(source))
        {
            throw new IllegalArgumentException("source is null or empty");
        }

        final StringReader reader = new StringReader(source);

        return xmlReader.read(reader, false);
    }

    /**
     * @return a new transformer.
     */
    private Transformer createTransformer()
    {
        Transformer answer = null;

        try
        {
            answer = TransformerFactory.newInstance().newTransformer();

            answer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, omittedProperty);
            answer.setOutputProperty(OutputKeys.INDENT, indentProperty);
            answer.setOutputProperty("{http://xml.apache.org/xslt}indent-amount", amountProperty);
        }
        catch (final TransformerConfigurationException e)
        {
            throw new RuntimeException(e);
        }
        catch (final TransformerFactoryConfigurationError e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @param source XML source.
     * 
     * @return a formatted string.
     */
    private String format(final Source source)
    {
        if (source == null)
        {
            throw new IllegalArgumentException("source is null");
        }

        String answer = null;

        try
        {
            final Transformer transformer = createTransformer();
            final StreamResult result = new StreamResult(new ByteArrayOutputStream());
            transformer.transform(source, result);

            answer = new String(((ByteArrayOutputStream)result.getOutputStream()).toByteArray());
        }
        catch (final TransformerException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }
}
