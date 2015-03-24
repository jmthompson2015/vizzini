package org.vizzini.illyriad.robot.inventory;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.Reader;
import java.io.StringWriter;
import java.io.Writer;

import org.junit.Test;
import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides tests for the <code>ShippingReporter</code> class.
 */
public final class ShippingReporterTest
{
    /** Resource ingredient collection. */
    private ResourceIngredientCollection ingredients;

    /**
     * Test the <code>report()</code> method.
     */
    @Test
    public void report()
    {
        final File shippingFile = createShippingFile();
        Reader shippingReader;

        try
        {
            shippingReader = new FileReader(shippingFile);
        }
        catch (final FileNotFoundException e)
        {
            throw new RuntimeException(e);
        }

        final Writer distanceWriter = new StringWriter();
        final Writer shippingWriter = new StringWriter();
        final ShippingReporter reporter = new ShippingReporter(getIngredientCollection(), shippingReader,
                distanceWriter, shippingWriter);

        reporter.report();

        final String expectedDistance0 = "<html>\n<head>\n<title>Illyriad Towns: Distances</title>\n<link rel=\"stylesheet\" type=\"text/css\" href=\"../../includes/style.css\" />\n<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />\n<link rel=\"stylesheet\" type=\"text/css\" href=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/style.css\" />\n</head>";
        final String expectedDistance1 = "</p></td>\n</tr>\n<script src='../../includes/footer.js' type='text/javascript'></script>\n</tbody>\n</table>\n</body>\n</html>";
        System.out.println("result   = " + distanceWriter.toString());
        assertTrue(distanceWriter.toString().startsWith(expectedDistance0));
        assertTrue(distanceWriter.toString().endsWith(expectedDistance1));

        final String expectedShipping0 = "\nShipments:\nLockstone to Lock Downs (371.2 sq)\n * Mineral";
        final String expectedShipping1 = "\n\nBest shipper fitness = ";
        assertTrue(shippingWriter.toString().startsWith(expectedShipping0));
        assertTrue(shippingWriter.toString().contains(expectedShipping1));
    }

    /**
     * Test the <code>ShippingReporter()</code> method.
     */
    @Test
    public void testConstructor()
    {
        Reader inventoryReader = null;
        Writer distanceWriter = null;
        final Writer shippingWriter = null;

        try
        {
            new ShippingReporter(getIngredientCollection(), inventoryReader, distanceWriter, shippingWriter);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("inventoryReader is null"));
        }

        try
        {
            final File shippingFile = createShippingFile();
            inventoryReader = new FileReader(shippingFile);
            new ShippingReporter(getIngredientCollection(), inventoryReader, distanceWriter, shippingWriter);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("distanceWriter is null"));
        }
        catch (final FileNotFoundException e)
        {
            throw new RuntimeException(e);
        }

        try
        {
            distanceWriter = new StringWriter();
            new ShippingReporter(getIngredientCollection(), inventoryReader, distanceWriter, shippingWriter);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("shippingWriter is null"));
        }
    }

    /**
     * @return a new shipping file.
     */
    private File createShippingFile()
    {
        File directory = new File(Locations.USER_DIR, "illyriad/src/test/resources/inventoryData");
        final String directoryString = directory.getAbsolutePath();
        System.out.println("0 directory = " + directoryString);

        if (directoryString.contains("illyriad/illyriad"))
        {
            directory = new File(Locations.USER_DIR, "src/test/resources/inventoryData");
            System.out.println("1 directory = " + directory.getAbsolutePath());
        }

        return new File(directory, "shipping.txt");
    }

    /**
     * @return a resource ingredient collection.
     */
    private ResourceIngredientCollection getIngredientCollection()
    {
        if (ingredients == null)
        {
            final IngredientRecipeBuilder builder = new IngredientRecipeBuilder();
            builder.build();

            ingredients = builder.getIngredientCollection();
        }

        return ingredients;
    }
}
