package org.vizzini.starfightersquadrons.reporter;

import java.io.IOException;
import java.io.Writer;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.starfightersquadrons.DamageCard;

/**
 * Provides an HTML reporter for damage cards.
 */
public final class DamageCardHtmlReporter implements HtmlReporter
{
    @Override
    public void report(final Writer writer)
    {
        try
        {
            writer.write("<html>\n");
            writeHead(writer);
            writeBody(writer);
            writer.write("</html>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void writeBody(final Writer writer)
    {
        try
        {
            writer.write("<body>\n");

            writer.write("<p class=\"header1\">Damage Cards</p>");

            writer.write("<table class=\"sortable table-details\">\n");
            writer.write("<tr>\n");
            writeTableHeaderCell(writer, "Name");
            writeTableHeaderCell(writer, "Description");
            writeTableHeaderCell(writer, "Action<br/>Description");
            writer.write("</tr>\n");

            for (final DamageCard damage : DamageCard.values())
            {
                String actionDescription = null;

                if (StringUtils.isNotEmpty(damage.getActionDescription()))
                {
                    actionDescription = "<b>Action:</b> " + damage.getActionDescription();
                }

                writer.write("<tr>\n");
                writeTableCell(writer, damage.getName());
                writeTableCell(writer, damage.getDescription());
                writeTableCell(writer, actionDescription);
                writer.write("</tr>\n");
            }
            writer.write("</table>\n");

            writer.write("</body>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void writeHead(final Writer writer)
    {
        try
        {
            writer.write("<head>\n");
            writer.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/style.css\" />\n");
            writer.write("<title>Starfighter Squadrons: Damage Cards</title>\n");
            writer.write("<script src=\"sorttable.js\"></script><script src=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/sorttable.js\"></script>");
            writer.write("</head>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     * @param value Value.
     *
     * @throws IOException if there is a problem.
     */
    private void writeTableCell(final Writer writer, final String value) throws IOException
    {
        writeTableCell(writer, null, value);
    }

    /**
     * @param writer Writer.
     * @param aClass Class.
     * @param value Value.
     *
     * @throws IOException if there is a problem.
     */
    private void writeTableCell(final Writer writer, final String aClass, final String value) throws IOException
    {
        final String classString = (StringUtils.isEmpty(aClass) ? "" : aClass + " ") + "table-cell-details";
        final String valueString = StringUtils.isEmpty(value) ? "&nbsp;" : value;

        writer.write("<td class=\"");
        writer.write(classString);
        writer.write("\">");
        writer.write(valueString);
        writer.write("</td>");
    }

    /**
     * @param writer Writer.
     * @param value Value.
     *
     * @throws IOException if there is a problem.
     */
    private void writeTableHeaderCell(final Writer writer, final String value) throws IOException
    {
        writer.write("<th class=\"table-header-cell-details\">");
        writer.write(value);
        writer.write("</th>");
    }
}
