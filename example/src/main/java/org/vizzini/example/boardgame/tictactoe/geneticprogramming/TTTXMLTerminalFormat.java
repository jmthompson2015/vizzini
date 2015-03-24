package org.vizzini.example.boardgame.tictactoe.geneticprogramming;

import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.XMLTerminalFormat;
import org.vizzini.core.XMLFormat;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;
import org.w3c.dom.Element;

/**
 * Provides an XML formatter for a terminal.
 */
public final class TTTXMLTerminalFormat implements XMLTerminalFormat<Integer>
{
    /** XML terminal formatter. */
    private final XMLTerminalFormat<Integer> xmlTerminalFormatter;

    /**
     * Construct this object.
     * 
     * @param xmlTerminalFormatter XML terminal formatter. (required)
     */
    @SuppressWarnings("hiding")
    public TTTXMLTerminalFormat(final XMLTerminalFormat<Integer> xmlTerminalFormatter)
    {
        if (xmlTerminalFormatter == null)
        {
            throw new IllegalArgumentException("xmlTerminalFormat is null");
        }

        this.xmlTerminalFormatter = xmlTerminalFormatter;
    }

    @Override
    public String format(final Terminal<Integer> terminal)
    {
        final StringBuilder sb = new StringBuilder();

        if (terminal instanceof TokenTerminal)
        {
            sb.append("<terminal");
            sb.append(" class=\"").append(terminal.getClass().getName()).append("\"");
            sb.append(" returnType=\"").append(terminal.getReturnType().getName()).append("\"");
            sb.append(">");
            sb.append("<position>");
            sb.append(((TokenTerminal)terminal).getPosition().getIndex());
            sb.append("</position>");
            sb.append("</terminal>");
        }
        else
        {
            sb.append(xmlTerminalFormatter.format(terminal));
        }

        return sb.toString();
    }

    @Override
    public XMLFormat getXmlFormatter()
    {
        return xmlTerminalFormatter.getXmlFormatter();
    }

    @Override
    public Terminal<Integer> parse(final String source)
    {
        final Element element = xmlTerminalFormatter.getXmlFormatter().parse(source);

        final String className = element.getAttribute("class");
        final String returnTypeName = element.getAttribute("returnType");
        final Converter<Integer> converter = Converter.create(returnTypeName);

        Terminal<Integer> answer;

        if ("org.vizzini.ai.geneticalgorithm.geneticprogramming.TokenTerminal".equals(className))
        {
            final String indexString = element.getElementsByTagName("position").item(0).getTextContent();
            final TTTPosition position = TTTPosition.findByIndex(converter.toT(indexString));
            answer = new TokenTerminal(converter, position);
        }
        else
        {
            answer = xmlTerminalFormatter.parse(source);
        }

        return answer;
    }
}
