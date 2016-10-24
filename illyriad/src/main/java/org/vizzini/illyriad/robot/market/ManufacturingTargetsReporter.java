package org.vizzini.illyriad.robot.market;

import java.awt.Toolkit;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Collections;
import java.util.Comparator;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.Reporter;
import org.vizzini.illyriad.ResourceCrafter;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.ResourceType;

/**
 * Provides an implementation of an HTML reporter for manufacturing targets. This class assumes the Resource market
 * values have already been initialized.
 */
public final class ManufacturingTargetsReporter implements HtmlReporter
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
        final Reporter reporter = new ManufacturingTargetsReporter(crafter.getProductCollection());

        final File outputDirectory = new File(Locations.MARKET_DATA_DIR, "html");
        outputDirectory.mkdirs();
        final File outputFile = new File(outputDirectory, "manufacturingTargets.html");

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
        new TimePrinter().printElapsedTime("ManufacturingTargetsReporter", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Delegate. */
    private final HtmlReporter delegate;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     */
    public ManufacturingTargetsReporter(final ResourceProductCollection products)
    {
        this.delegate = new DefaultHtmlReporter(products);
    }

    @Override
    public Comparator<ResourceProduct> createProductComparator()
    {
        return new Comparator<ResourceProduct>()
        {
            @Override
            public int compare(final ResourceProduct r1, final ResourceProduct r2)
            {
                final ResourceProductCollection products = getProducts();
                final double premium1 = products.getPremium(r1);
                final double premium2 = products.getPremium(r2);

                int answer = (int)((premium2 - premium1) * 100.0);

                if (answer == 0)
                {
                    answer = r1.getName().compareTo(r2.getName());
                }

                return answer;
            }
        };
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
        try
        {
            writeHtmlFileHeader(writer, "Illyriad Crafting: Manufacturing Targets");
            writer.write("<p>The resources with the highest premiums by type.</a></p>");

            writeTopPremiumsTable(writer, ResourceType.MOUNT);
            writeTopPremiumsTable(writer, ResourceType.SPEAR);
            writeTopPremiumsTable(writer, ResourceType.SWORD);
            writeTopPremiumsTable(writer, ResourceType.BOW);
            writeTopPremiumsTable(writer, ResourceType.LEATHER_ARMOUR);
            writeTopPremiumsTable(writer, ResourceType.CHAINMAIL_ARMOUR);
            writeTopPremiumsTable(writer, ResourceType.PLATE_ARMOUR);
            writeTopPremiumsTable(writer, ResourceType.BEVERAGE);

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
        if (!list.isEmpty())
        {
            try
            {
                writer.write("<p><b>" + title + "</b>\n</p>\n");
                writer.write("<table class='sortable table-details'>\n");

                writeResourceTableHeader(writer);

                for (final ResourceProduct product : list)
                {
                    writeResourceTableLine(writer, product);
                }

                writer.write("</table>\n");
            }
            catch (final IOException e)
            {
                throw new RuntimeException(e);
            }
        }
    }

    @Override
    public void writeResourceTableHeader(final Writer writer)
    {
        try
        {
            writer.write("<tr>\n");
            writer.write("<th class='table-header-cell-details'>Premium</th>");
            writer.write("<th class='table-header-cell-details'>Resource</th>");
            writer.write("<th class='table-header-cell-details'>Cost</th>");
            writer.write("<th class='table-header-cell-details'>Bid</th>");
            writer.write("<th class='table-header-cell-details'>Ask</th>");
            writer.write("<th class='table-header-cell-details'>Estimated Value</th>");
            writer.write("<th class='table-header-cell-details'>Ingredients</th>");
            writer.write("</tr>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void writeResourceTableLine(final Writer writer, final ResourceProduct product)
    {
        try
        {
            // Highlight if the bid is greater than the ask. (flip opportunity)
            final boolean isHighlightedOrange = ((product.getBid() > 0) && (product.getAsk() > 0) && (product.getBid() > product
                    .getAsk()));

            // Highlight if there is a bid but no ask. (unfulfilled demand)
            final boolean isHighlightedYellow = ((product.getBid() > 0) && (product.getAsk() <= 0));

            if (isHighlightedOrange)
            {
                writer.write("<tr class='background-orange'>\n");
            }
            else
            {
                if (isHighlightedYellow)
                {
                    writer.write("<tr class='background-yellow'>\n");
                }
                else
                {
                    writer.write("<tr>\n");
                }
            }

            final String ingredientsString = product.getComponentsString();
            final ResourceProductCollection products = getProducts();

            writer.write("<td class='table-cell-details right'>");
            writer.write(formatPremium(products.getPremium(product)));
            writer.write("</td>\n");
            writer.write("<td class='table-cell-details'>");
            writer.write(product.getName());
            writer.write("</td>\n");
            writer.write("<td class='table-cell-details right'>");
            writer.write(formatAmount(products.getCost(product)));
            writer.write("</td>\n");
            writer.write("<td class='table-cell-details right'>");
            writer.write(formatAmount(product.getBid()));
            writer.write("</td>\n");
            writer.write("<td class='table-cell-details right'>");
            writer.write(formatAmount(product.getAsk()));
            writer.write("</td>\n");
            writer.write("<td class='table-cell-details right'>");
            writer.write(formatAmount(products.getValue(product)));
            writer.write("</td>\n");
            writer.write("<td class='table-cell-details'>");
            writer.write(ingredientsString);
            writer.write("</td>\n");
            writer.write("</tr>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    /**
     * @param writer Writer.
     * @param productType Resource type.
     */
    private void writeTopPremiumsTable(final Writer writer, final ResourceType productType)
    {
        ResourceProductCollection list = getProducts().findByType(productType);
        Collections.sort(list, createProductComparator());
        final int max = Math.min(5, list.size());
        list = list.subList(0, max);
        writeResourceTable(writer, productType.getDisplayName(), list);
    }
}
