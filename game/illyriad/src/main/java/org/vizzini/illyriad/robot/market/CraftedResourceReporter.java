package org.vizzini.illyriad.robot.market;

import java.awt.Toolkit;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.Map;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.Reporter;
import org.vizzini.illyriad.ResourceCrafter;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.ResourceType;

/**
 * Provides an implementation of an HTML reporter for crafted products. This class assumes the Resource market values
 * have already been initialized.
 */
public final class CraftedResourceReporter implements HtmlReporter
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        final long start = System.currentTimeMillis();

        final ResourceCrafter crafter = new ResourceCrafter();
        final Reporter reporter = new CraftedResourceReporter(crafter.getProductCollection());

        final File outputDirectory = new File(Locations.MARKET_DATA_DIR, "html");
        outputDirectory.mkdirs();
        final File outputFile = new File(outputDirectory, "craftedResources.html");

        Writer writer = null;

        try
        {
            writer = new FileWriter(outputFile);
            reporter.report(writer);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
        finally
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

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("CraftedResourceReporter", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Map of product type to useful products. */
    private final Map<ResourceType, ResourceProductCollection> craftedResources = new HashMap<ResourceType, ResourceProductCollection>();

    /** Delegate. */
    private final HtmlReporter delegate;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     */
    public CraftedResourceReporter(final ResourceProductCollection products)
    {
        this.delegate = new DefaultHtmlReporter(products);
    }

    @Override
    public Comparator<ResourceProduct> createProductComparator()
    {
        return delegate.createProductComparator();
    }

    @Override
    public String formatAmount(final double amount)
    {
        return delegate.formatAmount(amount);
    }

    @Override
    public String formatPremium(final double premium)
    {
        return delegate.formatPremium(premium);
    }

    @Override
    public String getDateTimeString()
    {
        return delegate.getDateTimeString();
    }

    @Override
    public ResourceProductCollection getProducts()
    {
        return delegate.getProducts();
    }

    @Override
    public void report(final Writer writer)
    {
        determineResourceUsefulness();

        try
        {
            writeHtmlFileHeader(writer, "Illyriad Crafting: Crafted Resources");
            writer.write("<p>These resources are crafted from other <a href='usefulResources.html'>products.</a></p>");

            for (final ResourceType type : ResourceType.values())
            {
                final ResourceProductCollection list = getResourceList(craftedResources, type);

                if (!list.isEmpty())
                {
                    Collections.sort(list, createProductComparator());

                    writeResourceTable(writer, type.getDisplayName(), list);
                }
            }

            writeHtmlFileFooter(writer);
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void writeHtmlFileFooter(final Writer writer)
    {
        delegate.writeHtmlFileFooter(writer);
    }

    @Override
    public void writeHtmlFileHeader(final Writer writer, final String title)
    {
        delegate.writeHtmlFileHeader(writer, title);
    }

    @Override
    public void writeResourceTable(final Writer writer, final String title, final ResourceProductCollection list)
    {
        delegate.writeResourceTable(writer, title, list);
    }

    @Override
    public void writeResourceTableHeader(final Writer writer)
    {
        delegate.writeResourceTableHeader(writer);
    }

    @Override
    public void writeResourceTableLine(final Writer writer, final ResourceProduct product)
    {
        delegate.writeResourceTableLine(writer, product);
    }

    /**
     * Fill the crafted list.
     */
    private void determineResourceUsefulness()
    {
        craftedResources.clear();

        for (final ResourceType type : ResourceType.values())
        {
            final ResourceProductCollection products = getProducts().findByType(type);

            if (!products.isEmpty())
            {
                for (final ResourceProduct product : products)
                {
                    if (product.isCrafted())
                    {
                        getResourceList(craftedResources, type).add(product);
                    }
                }
            }
        }

        System.out.println();
        System.out.println("Crafted products: " + craftedResources.size());
    }

    /**
     * @param products Map of product type to products.
     * @param type Resource type.
     * 
     * @return the product list for the given parameter.
     */
    private ResourceProductCollection getResourceList(final Map<ResourceType, ResourceProductCollection> products,
            final ResourceType type)
    {
        ResourceProductCollection answer = products.get(type);

        if (answer == null)
        {
            answer = new ResourceProductCollection();
            products.put(type, answer);
        }

        return answer;
    }
}
