package org.vizzini.illyriad.robot.market;

import java.awt.Toolkit;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.Writer;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.FileUtilities;
import org.vizzini.illyriad.Reporter;
import org.vizzini.illyriad.ResourceCrafter;

/**
 * Provides a resource reporter.
 * 
 * <p>
 * Outputs
 * </p>
 * <ol>
 * <li>HTML page of all resources</li>
 * <li>HTML page of crafted resources</li>
 * <li>HTML page of useful resources</li>
 * <li>HTML page of useful resources by type</li>
 * <li>HTML page of useless resources</li>
 * </ol>
 */
public final class ResourceReporter
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final long start = System.currentTimeMillis();

        final InputStream inputStream = ResourceReporter.class.getResourceAsStream("/marketData/marketData.txt");
        final Reader marketDataReader = new InputStreamReader(inputStream);
        final ResourceCrafter crafter = new ResourceCrafter(marketDataReader);
        final FileUtilities fileUtils = new FileUtilities();
        final File outputDirectory = new File(fileUtils.getUserDir(), "marketData");

        final ResourceReporter reporter = new ResourceReporter(crafter, outputDirectory);

        reporter.report();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("ResourceReporter", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Resource crafter. */
    private final ResourceCrafter crafter;

    /** HTML output directory. */
    private final File htmlDirectory;

    /**
     * Construct this object.
     * 
     * @param crafter Resource crafter. (required)
     * @param outputDirectory Output directory. (required)
     */
    @SuppressWarnings("hiding")
    public ResourceReporter(final ResourceCrafter crafter, final File outputDirectory)
    {
        if (crafter == null)
        {
            throw new IllegalArgumentException("crafter is null");
        }

        if (outputDirectory == null)
        {
            throw new IllegalArgumentException("outputDirectory is null");
        }

        htmlDirectory = new File(outputDirectory, "html");

        this.crafter = crafter;
    }

    /**
     * Write a resource report.
     */
    public void report()
    {
        htmlDirectory.mkdirs();

        writeAllResourceReport();
        writeCraftedResourceReport();
        writeManufacturingTargetsReport();
        writeUselessResourceReport();
        writeUsefulResourceReport();
        writeUsefulResourceReportByType();
    }

    /**
     * @param writer Writer.
     */
    private void close(final Writer writer)
    {
        if (writer != null)
        {
            try
            {
                writer.flush();
                writer.close();
            }
            catch (final IOException ignore)
            {
                // Nothing to do.
            }
        }
    }

    /**
     * Write an all resource report.
     */
    private void writeAllResourceReport()
    {
        final File file = new File(htmlDirectory, "allResources.html");
        final AllResourceReporter reporter = new AllResourceReporter(crafter.getProductCollection());

        writeReport(file, reporter);
    }

    /**
     * Write a crafted resource report.
     */
    private void writeCraftedResourceReport()
    {
        final File file = new File(htmlDirectory, "craftedResources.html");
        final CraftedResourceReporter reporter = new CraftedResourceReporter(crafter.getProductCollection());

        writeReport(file, reporter);
    }

    /**
     * Write a manufacturing targets resource report.
     */
    private void writeManufacturingTargetsReport()
    {
        final File file = new File(htmlDirectory, "manufacturingTargets.html");
        final ManufacturingTargetsReporter reporter = new ManufacturingTargetsReporter(crafter.getProductCollection());

        writeReport(file, reporter);
    }

    /**
     * Write a resource report.
     * 
     * @param file File.
     * @param reporter Reporter.
     */
    private void writeReport(final File file, final Reporter reporter)
    {
        Writer writer = null;

        try
        {
            writer = new FileWriter(file);
            reporter.report(writer);
        }
        catch (final IOException ignore)
        {
            // Nothing to do.
        }
        finally
        {
            close(writer);
        }
    }

    /**
     * Write a resource report.
     */
    private void writeUsefulResourceReport()
    {
        final File file = new File(htmlDirectory, "usefulResources.html");
        final UsefulResourceReporter reporter = new UsefulResourceReporter(crafter.getRecipeCollection(),
                crafter.getProductCollection());

        writeReport(file, reporter);
    }

    /**
     * Write a resource report.
     */
    private void writeUsefulResourceReportByType()
    {
        final File file = new File(htmlDirectory, "usefulResources2.html");
        final UsefulResourceByTypeReporter reporter = new UsefulResourceByTypeReporter(crafter.getRecipeCollection(),
                crafter.getProductCollection());

        writeReport(file, reporter);
    }

    /**
     * Write a resource report.
     */
    private void writeUselessResourceReport()
    {
        final File file = new File(htmlDirectory, "uselessResources.html");
        final UselessResourceReporter reporter = new UselessResourceReporter(crafter.getRecipeCollection(),
                crafter.getProductCollection());

        writeReport(file, reporter);
    }
}
