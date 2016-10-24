package org.vizzini.starfightersquadrons.reporter;

import java.io.IOException;
import java.io.Writer;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.starfightersquadrons.UpgradeCard;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;
import org.vizzini.starfightersquadrons.UpgradeCard.UpgradeHeader;
import org.vizzini.starfightersquadrons.UpgradeCard.UpgradeRestriction;

/**
 * Provides an HTML reporter for upgrade cards.
 */
public final class UpgradeCardHtmlReporter implements HtmlReporter
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

            writer.write("<p class=\"header1\">Upgrade Cards</p>");

            writer.write("<table class=\"sortable table-details\">\n");
            writer.write("<tr>\n");
            writeTableHeaderCell(writer, "Name");
            writeTableHeaderCell(writer, "Type");
            writeTableHeaderCell(writer, "Restrictions");
            writeTableHeaderCell(writer, "Description");
            writeTableHeaderCell(writer, "Secondary<br/>Weapon");
            writeTableHeaderCell(writer, "Squad<br/>Point<br/>Cost");
            writeTableHeaderCell(writer, "Wave");
            writer.write("</tr>\n");

            for (final UpgradeCard upgrade : SecondaryWeaponUpgradeCard.values())
            {
                final String restrictions = createRestrictions(upgrade);
                final String description = createDescription(upgrade);
                int secondaryWeaponValue = -1;

                if (upgrade instanceof SecondaryWeaponUpgradeCard)
                {
                    final SecondaryWeaponUpgradeCard upgrade2 = (SecondaryWeaponUpgradeCard)upgrade;
                    secondaryWeaponValue = upgrade2.getWeaponValue();
                }

                writer.write("<tr>\n");
                writeTableCell(writer, upgrade.getName());
                writeTableCell(writer, upgrade.getType().getDisplayName());
                writeTableCell(writer, restrictions);
                writeTableCell(writer, description);
                writeTableCell(writer, secondaryWeaponValue);
                writeTableCell(writer, upgrade.getSquadPointCost());
                writeTableCell(writer, upgrade.getWave().getDisplayName());
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
            writer.write("<title>Starfighter Squadrons: Upgrade Cards</title>\n");
            writer.write("<script src=\"sorttable.js\"></script><script src=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/sorttable.js\"></script>");
            writer.write("</head>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param upgrade Upgrade card.
     *
     * @return a description.
     */
    private String createDescription(final UpgradeCard upgrade)
    {
        String answer;

        final UpgradeHeader header = upgrade.getHeader();

        if (header == null)
        {
            answer = upgrade.getDescription();
        }
        else
        {
            answer = "<b>" + header.getDisplayName() + "</b> " + upgrade.getDescription();
        }

        return answer;
    }

    /**
     * @param upgrade Upgrade card.
     *
     * @return restrictions.
     */
    private String createRestrictions(final UpgradeCard upgrade)
    {
        String answer;

        final Set<UpgradeRestriction> restrictions = upgrade.getRestrictions();

        if (restrictions.isEmpty())
        {
            answer = "&nbsp;";
        }
        else
        {
            final List<UpgradeRestriction> list = new ArrayList<UpgradeRestriction>(restrictions);
            Collections.sort(list);

            final StringBuilder sb = new StringBuilder();

            final int size = list.size();
            int count = 0;

            for (final UpgradeRestriction restriction : list)
            {
                sb.append(restriction.getDisplayName());

                if (count < (size - 1))
                {
                    sb.append(" ");
                }

                count++;
            }

            answer = sb.toString();
        }

        return answer;
    }

    /**
     * @param writer Writer.
     * @param value Value.
     *
     * @throws IOException if there is a problem.
     */
    private void writeTableCell(final Writer writer, final int value) throws IOException
    {
        final String valueString = value < 0 ? null : String.valueOf(value);

        writeTableCell(writer, "right", valueString);
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
