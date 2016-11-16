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
import org.vizzini.illyriad.ResourceRecipeCollection;
import org.vizzini.illyriad.ResourceType;

/**
 * Provides an implementation of an HTML reporter for useless resources. This class assumes the Resource market values
 * have already been initialized.
 */
public final class UselessResourceReporter implements HtmlReporter
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
        final Reporter reporter = new UselessResourceReporter(crafter.getRecipeCollection(),
                crafter.getProductCollection());

        final File outputDirectory = new File(Locations.MARKET_DATA_DIR, "html");
        outputDirectory.mkdirs();
        final File outputFile = new File(outputDirectory, "uselessResources.html");

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
        new TimePrinter().printElapsedTime("UselessResourceReporter", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Delegate. */
    private final HtmlReporter delegate;

    /** Resource recipe collection. */
    private final ResourceRecipeCollection recipes;

    /** Map of resource type to useless resources. */
    private final Map<ResourceType, ResourceProductCollection> uselessResources = new HashMap<ResourceType, ResourceProductCollection>();

    /**
     * Construct this object.
     * 
     * @param recipes Resource recipe collection.
     * @param products Resource product collection.
     */
    @SuppressWarnings("hiding")
    public UselessResourceReporter(final ResourceRecipeCollection recipes, final ResourceProductCollection products)
    {
        this.recipes = recipes;
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
            writeHtmlFileHeader(writer, "Illyriad Crafting: Useless Resources");
            writer.write("<p>These resources are not used in <a href='craftedResources.html'>crafting</a>.</p>");

            for (final ResourceType type : ResourceType.values())
            {
                final ResourceProductCollection list = getResourceList(uselessResources, type);

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
    public void writeResourceTableLine(final Writer writer, final ResourceProduct resource)
    {
        delegate.writeResourceTableLine(writer, resource);
    }

    /**
     * Fill the useless list.
     */
    private void determineResourceUsefulness()
    {
        uselessResources.clear();

        for (final ResourceType type : ResourceType.values())
        {
            final ResourceProductCollection resources = getProducts().findByType(type);

            if (!resources.isEmpty())
            {
                for (final ResourceProduct resource : resources)
                {
                    if (recipes.isUseless(resource.getIngredient()))
                    {
                        getResourceList(uselessResources, type).add(resource);
                    }
                }
            }
        }

        System.out.println();
        System.out.println("Useless resources: " + uselessResources.size());
    }

    /**
     * @param resources Map of resource type to resources.
     * @param type Resource type.
     * 
     * @return the resource list for the given parameter.
     */
    private ResourceProductCollection getResourceList(final Map<ResourceType, ResourceProductCollection> resources,
            final ResourceType type)
    {
        ResourceProductCollection answer = resources.get(type);

        if (answer == null)
        {
            answer = new ResourceProductCollection();
            resources.put(type, answer);
        }

        return answer;
    }
}
