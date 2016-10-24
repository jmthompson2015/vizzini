package org.vizzini.starfightersquadrons.reporter;

import java.io.IOException;
import java.io.Writer;

import org.vizzini.starfightersquadrons.Pilot;

/**
 * Provides an HTML reporter for pilot statistics.
 */
public class PilotStatisticsHtmlReporter implements HtmlReporter
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

            writer.write("<p class=\"header1\">Pilot Statistics</p>");

            writer.write("<table class=\"sortable table-details\">\n");
            writer.write("<tr>\n");
            writeTableHeaderCell(writer, "Name");
            writeTableHeaderCell(writer, "Ship");
            writeTableHeaderCell(writer, "Faction");
            writeTableHeaderCell(writer, "Wave");
            writeTableHeaderCell(writer, "Pilot<br/>Skill");
            writeTableHeaderCell(writer, "Primary<br/>Weapon");
            writeTableHeaderCell(writer, "Agility");
            writeTableHeaderCell(writer, "Hull");
            writeTableHeaderCell(writer, "Shield");
            writeTableHeaderCell(writer, "Squad<br/>Point<br/>Cost");
            writeTableHeaderCell(writer, "Offense<sup>1</sup>");
            writeTableHeaderCell(writer, "Defense<sup>2</sup>");
            writeTableHeaderCell(writer, "Ship<br/>Ratio<sup>3</sup>");
            writeTableHeaderCell(writer, "Balance<br/>Ratio<sup>4</sup>");
            writeTableHeaderCell(writer, "Offense<br/>Ratio<sup>5</sup>");
            writeTableHeaderCell(writer, "Defense<br/>Ratio<sup>6</sup>");
            writer.write("</tr>\n");

            for (final Pilot pilot : Pilot.values())
            {
                final int offense = pilot.getPilotSkillValue() + pilot.getPrimaryWeaponValue();
                final int defense = pilot.getAgilityValue() + pilot.getHullValue() + pilot.getShieldValue();
                final double offenseRatio = (1.0 * offense) / pilot.getSquadPointCost();
                final double defenseRatio = (1.0 * defense) / pilot.getSquadPointCost();
                final double shipRatio = (1.0 * (offense + defense)) / pilot.getSquadPointCost();
                final double balanceRatio = (1.0 * offense) / defense;

                writer.write("<tr>\n");
                writeTableCell(writer, pilot.getName());
                writeTableCell(writer, pilot.getShip().getName());
                writeTableCell(writer, pilot.getShip().getTeam().getName());
                writeTableCell(writer, pilot.getWave().getDisplayName());
                writeTableCell(writer, pilot.getPilotSkillValue());
                writeTableCell(writer, pilot.getPrimaryWeaponValue());
                writeTableCell(writer, pilot.getAgilityValue());
                writeTableCell(writer, pilot.getHullValue());
                writeTableCell(writer, pilot.getShieldValue());
                writeTableCell(writer, pilot.getSquadPointCost());
                writeTableCell(writer, offense);
                writeTableCell(writer, defense);
                writeTableCell(writer, shipRatio);
                writeTableCell(writer, balanceRatio);
                writeTableCell(writer, offenseRatio);
                writeTableCell(writer, defenseRatio);
                writer.write("</tr>\n");
            }
            writer.write("</table>\n");

            writer.write("<br/>\n");
            writer.write("<sup>1</sup> Sum of Pilot Skill and Primary Weapon.<br/>\n");
            writer.write("<sup>2</sup> Sum of Agility, Hull, and Shield.<br/>\n");
            writer.write("<sup>3</sup> Ratio of Offense plus Defense to Squad Point Cost.<br/>\n");
            writer.write("<sup>4</sup> Ratio of Offense to Defense.<br/>\n");
            writer.write("<sup>5</sup> Ratio of Offense to Squad Point Cost.<br/>\n");
            writer.write("<sup>6</sup> Ratio of Defense to Squad Point Cost.<br/>\n");

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
            writer.write("<title>Starfighter Squadrons: Pilots</title>\n");
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
    private void writeTableCell(final Writer writer, final double value) throws IOException
    {
        writeTableCell(writer, "right", String.format("%5.2f", value));
    }

    /**
     * @param writer Writer.
     * @param value Value.
     *
     * @throws IOException if there is a problem.
     */
    private void writeTableCell(final Writer writer, final int value) throws IOException
    {
        writeTableCell(writer, "right", String.valueOf(value));
    }

    /**
     * @param writer Writer.
     * @param value Value.
     *
     * @throws IOException if there is a problem.
     */
    private void writeTableCell(final Writer writer, final String value) throws IOException
    {
        writer.write("<td class=\"table-cell-details\">");
        writer.write(value);
        writer.write("</td>");
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
        writer.write("<td class=\"");
        writer.write(aClass);
        writer.write(" table-cell-details\">");
        writer.write(value);
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
