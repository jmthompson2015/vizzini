package org.vizzini.starfightersquadrons.reporter;

import java.io.IOException;
import java.io.Writer;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SSTeam;

/**
 * Provides a reporter for pilots.
 */
public final class PilotReporter implements TextReporter
{
    /**
     * Provides a comparator.
     */
    private static class OffenseDefenseComparator implements Comparator<Pilot>
    {
        @SuppressWarnings("synthetic-access")
        @Override
        public int compare(final Pilot pilot1, final Pilot pilot2)
        {
            final double offense1 = computeOffense(pilot1);
            final double offense2 = computeOffense(pilot2);

            int answer = (int)Math.round(100.0 * (offense1 - offense2));

            if (answer == 0)
            {
                final double defense1 = computeDefense(pilot1);
                final double defense2 = computeDefense(pilot2);

                answer = (int)Math.round(100.0 * (defense1 - defense2));
            }

            return answer;
        }
    }

    /**
     * Provides a comparator.
     */
    @SuppressWarnings("unused")
    private static class PilotSkillCostComparator implements Comparator<Pilot>
    {
        @Override
        public int compare(final Pilot pilot1, final Pilot pilot2)
        {
            final int pilotSkill1 = pilot1.getPilotSkillValue();
            final int pilotSkill2 = pilot2.getPilotSkillValue();

            int answer = pilotSkill1 - pilotSkill2;

            if (answer == 0)
            {
                final int cost1 = pilot1.getSquadPointCost();
                final int cost2 = pilot2.getSquadPointCost();

                answer = cost1 - cost2;
            }

            return answer;
        }
    }

    /**
     * Provides a comparator.
     */
    @SuppressWarnings("unused")
    private static class ShipPilotSkillCostComparator implements Comparator<Pilot>
    {
        @Override
        public int compare(final Pilot pilot1, final Pilot pilot2)
        {
            final Ship ship1 = pilot1.getShip();
            final Ship ship2 = pilot2.getShip();

            int answer = ship1.compareTo(ship2);

            if (answer == 0)
            {
                final int pilotSkill1 = pilot1.getPilotSkillValue();
                final int pilotSkill2 = pilot2.getPilotSkillValue();

                answer = pilotSkill1 - pilotSkill2;
            }

            if (answer == 0)
            {
                final int cost1 = pilot1.getSquadPointCost();
                final int cost2 = pilot2.getSquadPointCost();

                answer = cost1 - cost2;
            }

            return answer;
        }
    }

    /**
     * @param pilot Pilot.
     * 
     * @return a defense ratio.
     */
    private static double computeDefense(final Pilot pilot)
    {
        return (1.0 * (pilot.getAgilityValue() + pilot.getHullValue() + pilot.getShieldValue()))
                / pilot.getSquadPointCost();
    }

    /**
     * @param pilot Pilot.
     * 
     * @return an offense ratio.
     */
    private static double computeOffense(final Pilot pilot)
    {
        return (1.0 * (pilot.getPilotSkillValue() + pilot.getPrimaryWeaponValue())) / pilot.getSquadPointCost();
    }

    @Override
    @SuppressWarnings("synthetic-access")
    public void report(final Writer writer)
    {
        final Comparator<Pilot> comparator = new OffenseDefenseComparator();
        // final Comparator<Pilot> comparator = new PilotSkillCostComparator();
        // final Comparator<Pilot> comparator = new ShipPilotSkillCostComparator();

        report(writer, null, comparator);
    }

    /**
     * @param writer Writer.
     */
    @SuppressWarnings("synthetic-access")
    public void reportByTeam(final Writer writer)
    {
        for (final SSTeam team : SSTeam.values())
        {
            report(writer, team, new OffenseDefenseComparator());
        }
    }

    /**
     * @param writer Writer.
     * @param team Team. (optional)
     * @param comparator Comparator.
     */
    private void report(final Writer writer, final SSTeam team, final Comparator<Pilot> comparator)
    {
        final Pilot[] values = (team == null) ? Pilot.values() : Pilot.valuesByTeam(team);
        final List<Pilot> pilots = Arrays.asList(values);
        Collections.sort(pilots, comparator);

        final int shipSize = 20;
        final int statSize = 7;
        final int[] widths = { 24, shipSize, statSize, statSize, statSize, statSize, statSize, 4, 7, 7 };
        final String[] types = { "s", "s", "d", "d", "d", "d", "d", "d", ".2f", ".2f" };
        final String[] headerLabels0 = { "", "", "Pilot", "Primary", "", "", "", "Squad", "Offense", "Defense" };
        final String[] headerLabels1 = { "Pilot", "Ship", "Skill", "Weapon", "Agility", "Hull", "Shield", "Cost",
                "Ratio", "Ratio" };

        final StringBuilder sb = new StringBuilder();

        for (int i = 0; i < widths.length; i++)
        {
            sb.append(" %").append(widths[i]).append(types[i]);
        }

        final String format = sb.toString().trim();

        try
        {
            if (team != null)
            {
                writer.write("Team: ");
                writer.write(team.getName());
                writer.write("\n");
            }

            writeHeader(writer, headerLabels0, headerLabels1, widths);

            for (final Pilot pilot : pilots)
            {
                final String pilotName = pilot.getName();
                final String shipName = StringUtils.center(pilot.getShip().getName(), shipSize);
                final double offense = computeOffense(pilot);
                final double defense = computeDefense(pilot);

                final String line = String.format(format, pilotName, shipName, pilot.getPilotSkillValue(),
                        pilot.getPrimaryWeaponValue(), pilot.getAgilityValue(), pilot.getHullValue(),
                        pilot.getShieldValue(), pilot.getSquadPointCost(), offense, defense);
                writer.write(line);
                writer.write("\n");
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     * @param headerLabels0 Header labels.
     * @param headerLabels1 Header labels.
     * @param widths Widths.
     */
    private void writeHeader(final Writer writer, final String[] headerLabels0, final String[] headerLabels1,
            final int[] widths)
    {
        final String underline = "=";

        final StringBuilder sb0 = new StringBuilder();
        final StringBuilder sb1 = new StringBuilder();
        final StringBuilder sb2 = new StringBuilder();

        for (int i = 0; i < widths.length; i++)
        {
            sb0.append(StringUtils.center(headerLabels0[i], widths[i])).append(" ");
            sb1.append(StringUtils.center(headerLabels1[i], widths[i])).append(" ");
            sb2.append(StringUtils.repeat(underline, widths[i])).append(" ");
        }

        try
        {
            writer.write(sb0.toString());
            writer.write("\n");
            writer.write(sb1.toString());
            writer.write("\n");
            writer.write(sb2.toString());
            writer.write("\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
