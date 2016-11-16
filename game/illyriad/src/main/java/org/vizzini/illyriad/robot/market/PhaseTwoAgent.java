package org.vizzini.illyriad.robot.market;

import java.awt.AWTException;
import java.awt.Toolkit;
import java.io.File;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.ResourceCrafter;

/**
 * Provides a Phase Two agent.
 * <ul>
 * <li>Phase Two: Process data images.
 * <ol>
 * <li>Filter market data images to make them easier to parse.</li>
 * <li>Perform OCR on market data images.</li>
 * <li>Write market report.</li>
 * </ol>
 * </li>
 * </ul>
 * <table style="border-width:1px; border-style:solid; border-top-color:#000000; text-align:center">
 * <tr>
 * <td/>
 * <td><b>MacMarketDataRobot</b></td>
 * <td/>
 * </tr>
 * <tr>
 * <td/>
 * <td style="border-top-width:1px; border-top-style:solid">&#8595;</td>
 * <td/>
 * </tr>
 * <tr>
 * <td colspan="2">marketData/capturedImages/*.png</td>
 * <td>marketData/rows/*.png (for reference)</td>
 * </tr>
 * <tr>
 * <td colspan="2" style="border-top-width:1px; border-top-style:solid">&#8595;</td>
 * <td/>
 * </tr>
 * <tr>
 * <td colspan="2">
 * <b>PriceImagePreparer</b></td>
 * <td/>
 * </tr>
 * <tr>
 * <td style="border-top-width:1px; border-top-style:solid">&#8595;</td>
 * <td style="border-top-width:1px; border-top-style:solid">&#8595;</td>
 * <td/>
 * <td/>
 * </tr>
 * <tr>
 * <td>
 * marketData/prices/*.png<br/>
 * </td>
 * <td>
 * marketData/digits/&#42;&#42;/&#42;.png<br/>
 * </td>
 * <td>neuralNetworkAppliance.txt</td>
 * </tr>
 * <tr>
 * <td style="border-top-width:1px; border-top-style:solid">&#8595;</td>
 * <td/>
 * <td style="border-top-width:1px; border-top-style:solid">&#8595;</td>
 * </tr>
 * <tr>
 * <td colspan="3" style="border-top-width:1px; border-top-style:solid"><b>MarketDataReporter</b></td>
 * </tr>
 * <tr>
 * <td colspan="3">&#8595;</td>
 * </tr>
 * <tr>
 * <td colspan="3">marketData/marketData.txt</br> &#8595;</td>
 * </tr>
 * <tr>
 * <td colspan="3"><b>ResourceReporter</b></td>
 * </tr>
 * <tr>
 * <td colspan="3">&#8595;</td>
 * </tr>
 * <tr>
 * <td colspan="3">marketData/html/*.html</td>
 * </tr>
 * <tr>
 * </table>
 */
public final class PhaseTwoAgent
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     * @throws AWTException if the robot cannot be constructed.
     */
    public static void main(final String args[]) throws AWTException
    {
        final long start = System.currentTimeMillis();

        final InputStream inputStream = ResourceReporter.class.getResourceAsStream("/marketData/marketData.txt");
        final Reader marketDataReader = new InputStreamReader(inputStream);
        final ResourceCrafter crafter = new ResourceCrafter(marketDataReader);

        final PhaseTwoAgent agent = new PhaseTwoAgent(crafter);

        agent.run();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("PhaseTwoAgent", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Resource crafter. */
    private final ResourceCrafter crafter;

    /**
     * Construct this object.
     * 
     * @param crafter Resource crafter.
     */
    @SuppressWarnings("hiding")
    public PhaseTwoAgent(final ResourceCrafter crafter)
    {
        if (crafter == null)
        {
            throw new IllegalArgumentException("crafter is null");
        }

        this.crafter = crafter;
    }

    /**
     * Run.
     */
    public void run()
    {
        final String separator = "==================================================";

        // Prepare the images for a neural network.
        {
            System.out.println(separator + "\nRunning PriceImagePreparer.prepare()");
            final File inputDirectory = Locations.CAPTURED_IMAGES_DIR;
            final File outputDirectory = Locations.MARKET_DATA_DIR;
            final PriceImagePreparer preparer = new PriceImagePreparer(crafter.getProductCollection(), inputDirectory,
                    outputDirectory);
            preparer.prepare();
        }

        final FileUtilities fileUtils = new FileUtilities();

        // Perform OCR and write marketData.txt.
        {
            System.out.println(separator + "\nRunning MarketDataReporter.report()");
            final File inputDirectory = Locations.MARKET_DATA_DIR;
            final Writer outputWriter = fileUtils.createFileWriter(Locations.MARKET_DATA_FILEPATH);
            final MarketDataReporter mdReporter = new MarketDataReporter(crafter.getProductCollection(),
                    inputDirectory, outputWriter);
            mdReporter.report();
        }

        // Write resource reports.
        {
            System.out.println(separator + "\nRunning ResourceReporter.report()");
            final ResourceReporter rReporter = new ResourceReporter(crafter, Locations.REPORTS_DIR);
            rReporter.report();
        }
    }
}
