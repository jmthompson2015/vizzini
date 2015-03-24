package org.vizzini.illyriad;

import java.awt.Toolkit;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;
import java.util.HashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.TreeMap;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.map.DefaultWorldMapDatabase;
import org.vizzini.illyriad.map.MapSquareParser;

/**
 * Provides an enum generator for regions.
 */
public final class RegionEnumGenerator
{
    /** Map of region ID to region name. */
    private static final Map<Integer, String> idToName = new TreeMap<Integer, String>();

    static
    {
        idToName.put(1, "The Wastes");
        idToName.put(2, "Kal Tirikan");
        idToName.put(3, "Wolgast");
        idToName.put(4, "Ursor");
        idToName.put(5, "Qarosslan");
        idToName.put(6, "Windlost");
        idToName.put(7, "Tamarin");
        idToName.put(8, "Fremorn");
        idToName.put(9, "Norweld");
        idToName.put(10, "Laoshin");
        idToName.put(11, "Ragallon");
        idToName.put(12, "Taomist");
        idToName.put(13, "Meilla");
        idToName.put(14, "Lucerna");
        idToName.put(15, "Middle Kingdom");
        idToName.put(16, "Mal Motsha");
        idToName.put(17, "Keppen");
        idToName.put(18, "Tor Carrock");
        idToName.put(19, "The Western Realms");
        idToName.put(20, "Keshalia");
        idToName.put(21, "Perrigor");
        idToName.put(22, "Kul Tar");
        idToName.put(23, "Kumala");
        idToName.put(24, "Lan Larosh");
        idToName.put(25, "Arran");
        idToName.put(26, "Turalia");
        idToName.put(27, "Zanpur");
        idToName.put(28, "Elijal");
        idToName.put(29, "Azura");
        idToName.put(30, "Djebeli");
        idToName.put(31, "OCEAN");
        idToName.put(32, "Tallimar");
        idToName.put(33, "Larn");
        idToName.put(34, "Kem");
        idToName.put(35, "Farra Isle");
        idToName.put(36, "Trome");
        idToName.put(37, "Rill Archipelago");
        idToName.put(38, "Stormstone Island");
        idToName.put(39, "UNKNOWN_39");
        idToName.put(40, "Calumnex");
        idToName.put(41, "Puchuallpa");
        idToName.put(42, "UNKNOWN_42");
        idToName.put(43, "Pamanyallpa");
        idToName.put(44, "Huronire");
        idToName.put(45, "Clarien");
        idToName.put(46, "Pawanallpa");
        idToName.put(47, "UNKNOWN_47");
        idToName.put(48, "The Poisoned Isle");
        idToName.put(49, "Glanhad");
        idToName.put(50, "Northmarch");
        idToName.put(51, "High Hills");
        idToName.put(52, "Westmarch");
        idToName.put(53, "UNKNOWN_53");
        idToName.put(54, "Oarnamly");
        idToName.put(55, "UNKNOWN_55");
        idToName.put(56, "Gremont");
        idToName.put(57, "Coanhara");
        idToName.put(58, "Lapo'a Lua");
        idToName.put(59, "Newlands");
        idToName.put(60, "UNKNOWN_60");
        idToName.put(61, "Aindara");
        idToName.put(62, "The Pirate Isles");
        idToName.put(63, "Silbeaur");
        idToName.put(64, "Fellandire");
        idToName.put(65, "UNKNOWN_65");
        idToName.put(66, "Vindorel");
        idToName.put(67, "Almenly");
        idToName.put(68, "Kormandly");
        idToName.put(69, "The Orken Coast");
        idToName.put(70, "Kingslands");
        idToName.put(71, "Farshards");
        idToName.put(72, "Shardlands");
        idToName.put(73, "Strendur");
        idToName.put(74, "Chulbran");
        idToName.put(75, "Jurgor");
        idToName.put(76, "The Long White");
        idToName.put(77, "Unknown Lands");
    }

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String args[])
    {
        final long start = System.currentTimeMillis();

        final StringWriter writer = new StringWriter();

        try
        {
            final RegionEnumGenerator generator = new RegionEnumGenerator(writer);
            // generator.generateIdToName();
            generator.generate();
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(writer);
        }

        System.out.println(writer.toString());

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("RegionEnumGenerator", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Map of region ID to minimum X coordinate. */
    private final Map<Integer, Integer> idToMinX = new HashMap<Integer, Integer>();

    /** Map of region ID to minimum Y coordinate. */
    private final Map<Integer, Integer> idToMinY = new HashMap<Integer, Integer>();

    /** Map of region ID to maximum X coordinate. */
    private final Map<Integer, Integer> idToMaxX = new HashMap<Integer, Integer>();

    /** Map of region ID to maximum Y coordinate. */
    private final Map<Integer, Integer> idToMaxY = new HashMap<Integer, Integer>();

    /** Writer. */
    private final Writer writer;

    /**
     * Construct this object.
     * 
     * @param writer Writer.
     */
    @SuppressWarnings("hiding")
    public RegionEnumGenerator(final Writer writer)
    {
        this.writer = writer;
    }

    /**
     * Generate enums.
     */
    public void generate()
    {
        final Reader worldmapDataReader = new InputStreamReader(DefaultWorldMapDatabase.class.getClassLoader()
                .getResourceAsStream("mapData/datafile_worldmap.txt"));
        loadMapSquares(worldmapDataReader);

        final int size = idToName.size();
        int count = 0;

        for (final Entry<Integer, String> entry : idToName.entrySet())
        {
            final Integer id = entry.getKey();
            final String name = entry.getValue();
            final String enumName = createEnumName(name);

            final Integer minX = idToMinX.get(id);
            final Integer minY = idToMinY.get(id);
            final Integer maxX = idToMaxX.get(id);
            final Integer maxY = idToMaxY.get(id);

            final boolean isElgea = !"OCEAN".equals(enumName) && (maxY >= -1000);

            try
            {
                writer.write("\n/** Region. */\n");
                writer.write(enumName);
                writer.write("(");
                writer.write(String.valueOf(id));
                writer.write(", \"");
                writer.write(name);
                writer.write("\", ");
                writer.write(String.valueOf(minX));
                writer.write(", ");
                writer.write(String.valueOf(minY));
                writer.write(", ");
                writer.write(String.valueOf(maxX));
                writer.write(", ");
                writer.write(String.valueOf(maxY));
                writer.write(", ");
                writer.write(String.valueOf(isElgea));
                writer.write(")");

                if (count < (size - 1))
                {
                    writer.write(",");
                }
                else
                {
                    writer.write(";");
                }

                writer.write("\n");

                count++;
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
            finally
            {
                final FileUtilities fileUtils = new FileUtilities();
                fileUtils.close(worldmapDataReader);
            }
        }
    }

    /**
     * Generate code to initialize the idToName map.
     */
    public void generateIdToName()
    {
        for (final Region region : Region.values())
        {
            final int id = region.getId();
            final String name = region.getDisplayName();

            try
            {
                writer.write("idToName.put(");
                writer.write(String.valueOf(id));
                writer.write(", \"");
                writer.write(name);
                writer.write("\");\n");
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    /**
     * @param name Name.
     * 
     * @return a new enum name.
     */
    private String createEnumName(final String name)
    {
        String answer = name.replaceAll(" ", "_").toUpperCase();
        answer = answer.replaceAll("[-]", "_");
        answer = answer.replaceAll("[']", "");

        return answer;
    }

    /**
     * @param worldmapDataReader World map data reader.
     */
    private void loadMapSquares(final Reader worldmapDataReader)
    {
        final long start = System.currentTimeMillis();

        BufferedReader myReader = null;

        try
        {
            myReader = new BufferedReader(worldmapDataReader);
            final MapSquareParser parser = new MapSquareParser();

            // Skip the first line.
            String line = myReader.readLine();

            while ((line = myReader.readLine()) != null)
            {
                final String[] parts = parser.split(line);
                final int regionId = parser.getRegionId(parts);

                final int x = parser.getX(parts);

                {
                    final Integer minX = idToMinX.get(regionId);

                    if ((minX == null) || (minX > x))
                    {
                        idToMinX.put(regionId, x);
                    }

                    final Integer maxX = idToMaxX.get(regionId);

                    if ((maxX == null) || (maxX < x))
                    {
                        idToMaxX.put(regionId, x);
                    }
                }

                final int y = parser.getY(parts);

                {
                    final Integer minY = idToMinY.get(regionId);

                    if ((minY == null) || (minY > y))
                    {
                        idToMinY.put(regionId, y);
                    }

                    final Integer maxY = idToMaxY.get(regionId);

                    if ((maxY == null) || (maxY < y))
                    {
                        idToMaxY.put(regionId, y);
                    }
                }

                final String name = idToName.get(regionId);

                if (StringUtils.isEmpty(name))
                {
                    throw new RuntimeException("Unknown region for ID = " + regionId + " and coordinates " + x + ", "
                            + y);
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
        {
            final FileUtilities fileUtils = new FileUtilities();
            fileUtils.close(myReader);
        }

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("RegionEnumGenerator.loadMapSquares()", start, end);
    }
}
