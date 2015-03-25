package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Set;

import org.vizzini.starfightersquadrons.Maneuver.Bearing;
import org.vizzini.starfightersquadrons.Maneuver.Difficulty;
import org.vizzini.starfightersquadrons.Maneuver.StationaryManeuver;
import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Convert Java into JavaScript.
 */
public class JavaToJavaScript
{
    /**
     * Application method.
     *
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final JavaToJavaScript app = new JavaToJavaScript();

        // app.convertPhases();
        // app.convertManeuvers();
        // app.convertShips();
        // app.convertPilots();
        // app.convertDamageCards();
        app.convertUpgradeCards();
        // app.convertUpgradeTypes();
    }

    /**
     * Convert damage card data to JavaScript.
     */
    public void convertDamageCards()
    {
        final DamageCard[] values = DamageCard.values();
        final StringBuilder sb = new StringBuilder();

        for (final DamageCard damage : values)
        {
            final String name = toCamelCase(damage.getName());
            sb.append(toUpperCase(damage.getName())).append(": ");
            sb.append("\"").append(name).append("\",\n");
        }

        sb.append("properties: \n{\n");

        for (final DamageCard damage : values)
        {
            final String name = toCamelCase(damage.getName());
            sb.append("\"").append(name).append("\":\n{\n");
            sb.append("name: \"").append(damage.getName()).append("\",\n");
            sb.append("trait: Trait.").append(damage.getTrait().name()).append(",\n");
            sb.append("description: \"").append(convertQuotes(damage.getDescription())).append("\",\n");
            sb.append("shipState: new ShipState(").append(convert(damage.getShipState())).append("),\n");
            sb.append("hasAction: ").append(damage.hasAction()).append(",\n");
            if (damage.hasAction())
            {
                sb.append("actionDescription: \"").append(damage.getActionDescription()).append("\",\n");
                sb.append("actionShipState: new ShipState(").append(convert(damage.getActionShipState()))
                .append("),\n");
            }
            sb.append("value: \"").append(name).append("\",\n");
            sb.append("},\n");
        }

        sb.append("},\n");

        sb.append("values: [");

        for (final DamageCard damage : values)
        {
            final String name = toCamelCase(damage.getName());
            sb.append("\"").append(name).append("\", ");
        }

        sb.append("],\n");

        System.out.println(sb.toString());
    }

    /**
     * Convert maneuver data to JavaScript.
     */
    public void convertManeuvers()
    {
        final Maneuver[] values = Maneuver.values();
        final StringBuilder sb = new StringBuilder();

        for (final Maneuver maneuver : values)
        {
            final String name = createName(maneuver);
            sb.append(maneuver.getBearing()).append("_");
            sb.append(maneuver.getSpeed()).append("_");
            sb.append(maneuver.getDifficulty().name()).append(": ");
            sb.append("\"").append(name).append("\",\n");
        }

        // STATIONARY_0_HARD
        sb.append("STATIONARY_0_HARD: \"stationary0Hard\",\n");

        sb.append("properties: \n{\n");

        for (final Maneuver maneuver : values)
        {
            final String name = createName(maneuver);
            sb.append("\"").append(name).append("\":\n{\n");
            sb.append("bearing: Bearing.").append(maneuver.getBearing().name()).append(",\n");
            sb.append("speed: ").append(maneuver.getSpeed()).append(",\n");
            sb.append("difficulty: Difficulty.").append(maneuver.getDifficulty().name()).append(",\n");
            if (maneuver.getRadius() != null)
            {
                sb.append("radius: ").append(maneuver.getRadius()).append(",\n");
            }
            sb.append("value: \"").append(name).append("\",\n");
            sb.append("},\n");
        }

        // STATIONARY_0_HARD
        String name = "\"stationary0Hard\"";
        sb.append(name).append(":\n{\n");
        sb.append("speed: 0,\n");
        sb.append("difficulty: Difficulty.HARD,\n");
        sb.append("value: ").append(name).append(",\n");
        sb.append("},\n");

        sb.append("values: [\n");

        for (final Maneuver maneuver : values)
        {
            name = createName(maneuver);
            sb.append("\"");
            sb.append(name);
            sb.append("\", ");
        }

        sb.append("\"stationary0Hard\"");
        sb.append("],\n");

        sb.append("},\n");

        System.out.println(sb.toString());
    }

    /**
     * Convert phase data to JavaScript.
     */
    public void convertPhases()
    {
        final Phase[] values = Phase.values();
        final StringBuilder sb = new StringBuilder();

        for (final Phase phase : values)
        {
            final String name = toCamelCase(phase.name());
            sb.append(phase.name()).append(": ");
            sb.append("\"").append(name).append("\",\n");
        }

        sb.append("properties: \n{\n");

        for (final Phase phase : values)
        {
            final String name = toCamelCase(phase.name());
            sb.append("\"").append(name).append("\":\n{\n");
            // sb.append("bearing: Bearing.").append(phase.getBearing().name()).append(",\n");
            // sb.append("speed: ").append(phase.getSpeed()).append(",\n");
            // sb.append("difficulty: Difficulty.").append(phase.getDifficulty().name()).append(",\n");
            // if (phase.getRadius() != null)
            // {
            // sb.append("radius: ").append(phase.getRadius()).append(",\n");
            // }
            sb.append("displayName: \"").append(phase.getDisplayName()).append("\",\n");
            sb.append("value: \"").append(name).append("\",\n");
            sb.append("},\n");
        }

        sb.append("},\n");

        sb.append("values: [");

        for (final Phase phase : values)
        {
            final String name = toCamelCase(phase.name());
            sb.append("\"").append(name).append("\", ");
        }

        sb.append("],\n");

        System.out.println(sb.toString());
    }

    /**
     * Convert ship data to JavaScript.
     */
    public void convertPilots()
    {
        final Pilot[] values = Pilot.values();
        final StringBuilder sb = new StringBuilder();

        for (final Pilot pilot : values)
        {
            final String enumName = toUpperCase(pilot.getName());
            final String name = toCamelCase(pilot.getName());
            sb.append(enumName).append(": \"").append(name).append("\",\n");
        }

        sb.append("properties: \n{\n");

        for (final Pilot pilot : values)
        {
            // if (pilot != Pilot.BACKSTABBER)
            // {
            // continue;
            // }

            final String name = toCamelCase(pilot.getName());
            sb.append("\"").append(name).append("\":\n{\n");
            String name2 = pilot.getName();
            // System.out.println("0 name2 = [" + name2 + "]");
            // System.out.println("name2.contains(\"\"\") ? " + name2.contains("\""));
            if (name2.contains("\""))
            {
                name2 = name2.replaceAll("\"", "\\\\\"");
                // System.out.println("1 name2 = [" + name2 + "]");
            }

            sb.append("name: \"").append(name2).append("\",\n");
            sb.append("description: \"").append(pilot.getDescription()).append("\",\n");
            sb.append("isUnique: ").append(pilot.isUnique()).append(",\n");

            String weaponType = "Weapon";
            if (pilot.getShip() == Ship.YT_1300)
            {
                weaponType = "TurretWeapon";
            }

            sb.append("primaryWeapon: new ").append(weaponType).append("(\"Primary Weapon\", true, ")
            .append(pilot.getShipState().getPrimaryWeaponValue())
            .append(", [Range.ONE, Range.TWO, Range.THREE]),\n");
            sb.append("ship: Ship.").append(pilot.getShip().name()).append(",\n");
            sb.append("shipState: new ShipState(").append(convert(pilot.getShipState())).append("),\n");
            sb.append("squadPointCost: ").append(pilot.getSquadPointCost()).append(",\n");
            sb.append("value: \"").append(name).append("\",\n");
            sb.append("},\n");
        }

        sb.append("},\n");

        System.out.println(sb.toString());
    }

    /**
     * Convert ship data to JavaScript.
     */
    public void convertShips()
    {
        final Ship[] values = Ship.values();
        final StringBuilder sb = new StringBuilder();

        for (final Ship ship : values)
        {
            final String name = toCamelCase(ship.name());
            sb.append(ship.name()).append(": \"").append(name).append("\",\n");
        }

        sb.append("properties: \n{\n");

        for (final Ship ship : values)
        {
            final String name = toCamelCase(ship.name());
            sb.append("\"").append(name).append("\":\n{\n");
            sb.append("name: \"").append(ship.getName()).append("\",\n");
            sb.append("description: \"").append(ship.getDescription()).append("\",\n");
            sb.append("team: SSTeam.").append(ship.getTeam().getName().toUpperCase()).append(",\n");
            sb.append("shipBase: ShipBase.").append(ship.getShipBase().name()).append(",\n");
            sb.append("primaryFiringArc: FiringArc.").append(ship.getPrimaryFiringArc().name()).append(",\n");
            sb.append("maneuvers: [").append(convert(ship.getManeuvers())).append("]").append(",\n");
            sb.append("shipActions: [ ").append(convert(ship.getShipActions())).append("]").append(",\n");
            sb.append("value: \"").append(name).append("\",\n");
            sb.append("},\n");
        }

        sb.append("},\n");

        System.out.println(sb.toString());
    }

    /**
     * Convert upgrade card data to JavaScript.
     */
    public void convertUpgradeCards()
    {
        final UpgradeCard[] values = SecondaryWeaponUpgradeCard.values();
        final StringBuilder sb = new StringBuilder();

        for (final UpgradeCard upgrade : values)
        {
            final String name = toCamelCase(upgrade.getName());
            sb.append(toUpperCase(upgrade.getName())).append(": ");
            sb.append("\"").append(name).append("\",\n");
        }

        sb.append("properties: \n{\n");

        for (final UpgradeCard upgrade : values)
        {
            final String name = toCamelCase(upgrade.getName());
            sb.append("\"").append(name).append("\":\n{\n");
            sb.append("name: \"").append(upgrade.getName()).append("\",\n");
            sb.append("type: UpgradeType.").append(upgrade.getType().name()).append(",\n");
            sb.append("description: \"").append(convertQuotes(upgrade.getDescription())).append("\",\n");
            sb.append("squadPointCost: ").append(upgrade.getSquadPointCost()).append(",\n");
            sb.append("hasAction: ").append(upgrade.hasAction()).append(",\n");
            if (upgrade.hasAction())
            {
                // sb.append("actionDescription: \"").append(upgrade.getActionDescription()).append("\",\n");
                // sb.append("actionShipState: new ShipState(").append(convert(upgrade.getActionShipState()))
                // .append("),\n");
            }
            sb.append("value: \"").append(name).append("\",\n");
            sb.append("},\n");
        }

        sb.append("},\n");

        sb.append("values: [");

        for (final UpgradeCard upgrade : values)
        {
            final String name = toCamelCase(upgrade.getName());
            sb.append("\"").append(name).append("\", ");
        }

        sb.append("],\n");

        System.out.println(sb.toString());
    }

    /**
     * Convert phase data to JavaScript.
     */
    public void convertUpgradeTypes()
    {
        final UpgradeType[] values = UpgradeType.values();
        final StringBuilder sb = new StringBuilder();

        for (final UpgradeType upgradeType : values)
        {
            final String name = toCamelCase(upgradeType.name());
            sb.append(upgradeType.name()).append(": ");
            sb.append("\"").append(name).append("\",\n");
        }

        sb.append("properties: \n{\n");

        for (final UpgradeType upgradeType : values)
        {
            final String name = toCamelCase(upgradeType.name());
            sb.append("\"").append(name).append("\":\n{\n");
            sb.append("displayName: \"").append(upgradeType.getDisplayName()).append("\",\n");
            sb.append("value: \"").append(name).append("\",\n");
            sb.append("},\n");
        }

        sb.append("},\n");

        sb.append("values: [");

        for (final UpgradeType upgradeType : values)
        {
            final String name = toCamelCase(upgradeType.name());
            sb.append("\"").append(name).append("\", ");
        }

        sb.append("],\n");

        System.out.println(sb.toString());
    }

    /**
     * @param maneuvers Maneuvers.
     *
     * @return a string representing the collection.
     */
    private String convert(final ManeuverSet maneuvers)
    {
        final List<Maneuver> myManeuvers = new ArrayList<Maneuver>(maneuvers);
        Collections.sort(myManeuvers, createManeuverComparator());

        final StringBuilder sb = new StringBuilder();

        final int size = myManeuvers.size();
        int count = 0;

        for (final Maneuver maneuver : myManeuvers)
        {
            if (maneuver == StationaryManeuver.STATIONARY_0_HARD)
            {
                sb.append("Maneuver.STATIONARY_0_HARD");
            }
            else
            {
                final String name = maneuver.getBearing().name() + "_" + maneuver.getSpeed() + "_"
                        + maneuver.getDifficulty().name();
                sb.append("Maneuver.").append(name);
            }

            count++;
            if (count < size)
            {
                sb.append(", ");
            }
        }

        return sb.toString();
    }

    /**
     * @param shipActions Ship actions.
     *
     * @return a string representing the collection.
     */
    private String convert(final Set<ShipAction> shipActions)
    {
        final StringBuilder sb = new StringBuilder();

        final int size = shipActions.size();
        int count = 0;

        for (final ShipAction shipAction : shipActions)
        {
            final String name = toUpperCase(shipAction.getName());
            sb.append("ShipAction.").append(name);

            count++;
            if (count < size)
            {
                sb.append(", ");
            }
        }

        return sb.toString();
    }

    /**
     * @param shipState Ship state.
     *
     * @return a string representing the parameter.
     */
    private String convert(final ShipState shipState)
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(shipState.getPilotSkillValue()).append(", ");
        sb.append(shipState.getPrimaryWeaponValue()).append(", ");
        sb.append(shipState.getAgilityValue()).append(", ");
        sb.append(shipState.getHullValue()).append(", ");
        sb.append(shipState.getShieldValue());

        return sb.toString();
    }

    /**
     * @param string String.
     *
     * @return the string with converted quotes.
     */
    private String convertQuotes(final String string)
    {
        String answer = string;

        answer = answer.replaceAll("[\"]", "\\\\\"");

        return answer;
    }

    /**
     * @return a new maneuver comparator.
     */
    private Comparator<Maneuver> createManeuverComparator()
    {
        return new Comparator<Maneuver>()
                {
            @Override
            public int compare(final Maneuver m1, final Maneuver m2)
            {
                int answer = m1.getSpeed() - m2.getSpeed();

                if (answer == 0)
                {
                    final Bearing b1 = m1.getBearing();
                    final Bearing b2 = m2.getBearing();

                    if (b1 == b2)
                    {
                        answer = 0;
                    }
                    else if ((b1 != null) && (b2 == null))
                    {
                        answer = 1;
                    }
                    else if ((b1 == null) && (b2 != null))
                    {
                        answer = -1;
                    }
                    else if ((b1 != null) && (b2 != null))
                    {
                        answer = b1.ordinal() - b2.ordinal();
                    }
                }

                if (answer == 0)
                {
                    final Difficulty d1 = m1.getDifficulty();
                    final Difficulty d2 = m2.getDifficulty();

                    answer = d1.ordinal() - d2.ordinal();
                }

                return answer;
            }
                };
    }

    /**
     * @param maneuver Maneuver.
     *
     * @return a new name.
     */
    private String createName(final Maneuver maneuver)
    {
        final String bearingName = maneuver.getBearing() == null ? "" : maneuver.getBearing().name();
        final String difficultyName = maneuver.getDifficulty().name();

        return toCamelCase(bearingName + maneuver.getSpeed() + "_" + difficultyName);
    }

    /**
     * @param string String.
     *
     * @return the string in camel case.
     */
    private String toCamelCase(final String string)
    {
        String answer = string.toLowerCase();

        answer = answer.replaceAll("[\"]", "");
        answer = answer.replaceAll("[\']", "");
        answer = answer.replaceAll("[!]", "");

        for (char i = 'a'; i <= 'z'; i++)
        {
            answer = answer.replaceAll("[ ]" + i, String.valueOf(Character.toUpperCase(i)));
            answer = answer.replaceAll("[_]" + i, String.valueOf(Character.toUpperCase(i)));
            answer = answer.replaceAll("[-]" + i, String.valueOf(Character.toUpperCase(i)));
            answer = answer.replaceAll("[(]" + i, String.valueOf(Character.toUpperCase(i)));
        }

        answer = answer.replaceAll("[ ]", "");
        answer = answer.replaceAll("[_]", "");
        answer = answer.replaceAll("[-]", "");
        answer = answer.replaceAll("[)]", "");

        return answer;
    }

    /**
     * @param string String.
     *
     * @return the string in uppercase.
     */
    private String toUpperCase(final String string)
    {
        String answer = string.toUpperCase();

        answer = answer.replaceAll("[\"]", "");
        answer = answer.replaceAll("[\']", "");
        answer = answer.replaceAll("[!]", "");
        answer = answer.replaceAll("[ ]", "_");
        answer = answer.replaceAll("[-]", "_");
        answer = answer.replaceAll("[()]", "");

        return answer;
    }
}
