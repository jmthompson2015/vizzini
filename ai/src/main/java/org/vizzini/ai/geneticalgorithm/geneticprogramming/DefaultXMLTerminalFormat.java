package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.vizzini.core.XMLFormat;
import org.w3c.dom.Element;

/**
 * Provides a default implementation of an XML formatter for a terminal.
 * 
 * @param <T> Type.
 */
public final class DefaultXMLTerminalFormat<T> implements XMLTerminalFormat<T>
{
    /** XML formatter. */
    private final XMLFormat xmlFormatter;

    /**
     * Construct this object.
     * 
     * @param xmlFormatter XML formatter. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultXMLTerminalFormat(final XMLFormat xmlFormatter)
    {
        if (xmlFormatter == null)
        {
            throw new IllegalArgumentException("xmlFormatter is null");
        }

        this.xmlFormatter = xmlFormatter;
    }

    @Override
    public String format(final Terminal<T> terminal)
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("<terminal");
        sb.append(" class=\"").append(terminal.getClass().getName()).append("\"");
        sb.append(" returnType=\"").append(terminal.getReturnType().getName()).append("\"");
        sb.append(">");

        if (terminal instanceof ConstantTerminal)
        {
            sb.append("<value>");
            sb.append(((ConstantTerminal<T>)terminal).getValue());
            sb.append("</value>");
        }
        else if (terminal instanceof VariableTerminal)
        {
            sb.append("<variableName>");
            sb.append(((VariableTerminal<T>)terminal).getVariableName());
            sb.append("</variableName>");
        }
        else
        {
            throw new RuntimeException("Unknown terminal type " + terminal.getClass().getName());
        }

        sb.append("</terminal>");

        return sb.toString();
    }

    /**
     * @return the xmlFormatter
     */
    @Override
    public XMLFormat getXmlFormatter()
    {
        return xmlFormatter;
    }

    @Override
    public Terminal<T> parse(final String source)
    {
        final Element element = xmlFormatter.parse(source);

        final String className = element.getAttribute("class");
        final String returnTypeName = element.getAttribute("returnType");
        final Converter<T> converter = Converter.create(returnTypeName);

        Terminal<T> answer;

        if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.ConstantTerminal".equals(className))
        {
            final String valueString = element.getElementsByTagName("value").item(0).getTextContent();
            final T value = converter.toT(valueString);
            answer = new ConstantTerminal<T>(converter, value);
        }
        else if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.VariableTerminal".equals(className))
        {
            final String variableName = element.getElementsByTagName("variableName").item(0).getTextContent();
            answer = new VariableTerminal<T>(converter, variableName);
        }
        else
        {
            throw new RuntimeException("Unknown terminal class " + className);
        }

        return answer;
    }
}
