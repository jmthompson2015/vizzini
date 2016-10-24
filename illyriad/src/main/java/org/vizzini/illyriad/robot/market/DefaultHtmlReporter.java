package org.vizzini.illyriad.robot.market;

import java.io.IOException;
import java.io.Writer;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Comparator;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Provides a default implementation of an HTML reporter.
 */
public final class DefaultHtmlReporter implements HtmlReporter
{
    /** Product collection. */
    private final ResourceProductCollection products;

    /**
     * Construct this object.
     * 
     * @param products Product collection. (required)
     */
    @SuppressWarnings("hiding")
    public DefaultHtmlReporter(final ResourceProductCollection products)
    {
        if (products == null)
        {
            throw new IllegalArgumentException("products is null");
        }

        this.products = products;
    }

    @Override
    public Comparator<ResourceProduct> createProductComparator()
    {
        return new Comparator<ResourceProduct>()
        {
            @Override
            public int compare(final ResourceProduct r1, final ResourceProduct r2)
            {
                return r1.getName().compareTo(r2.getName());
            }
        };
    }

    @Override
    public String formatAmount(final double amount)
    {
        String answer = "";

        if (amount > 0)
        {
            final double fractionalPart = amount % 1;

            if (fractionalPart == 0.0)
            {
                final double integralPart = amount - fractionalPart;
                answer = String.format("%,.0f", integralPart);
            }
            else
            {
                answer = String.format("%,.2f", amount);
            }
        }

        return answer;
    }

    @Override
    public String formatPremium(final double premium)
    {
        String answer = "";

        if (premium > 0)
        {
            answer = String.format("%3.1f", premium);
        }

        return answer;
    }

    @Override
    public String getDateTimeString()
    {
        final Date date = new Date();
        final DateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm");

        return formatter.format(date);
    }

    @Override
    public ResourceProductCollection getProducts()
    {
        return products;
    }

    @Override
    public void report(final Writer writer)
    {
        throw new RuntimeException("method not supported");
    }

    @Override
    public void writeHtmlFileFooter(final Writer writer)
    {
        try
        {
            writer.write("<tr><td>\n");
            writer.write("<hr/>");
            writer.write("</td></tr>\n");

            writer.write("<tr><td>\n");
            writeDefinitions(writer);
            writer.write("</td></tr>\n");

            writer.write("<tr><td>\n");
            writer.write("<span class='background-orange'>Highlighted</span> lines have Bid > Ask (flip opportunity)\n");
            writer.write("</td></tr>\n");

            writer.write("<tr><td>\n");
            writer.write("<span class='background-yellow'>Highlighted</span> lines have Bid but no Ask (unfulfilled demand)\n");
            writer.write("</td></tr>\n");

            writer.write("<tr><td class='padding-top-20'>\n");
            writer.write("Price data is from trade hubs I can see (Centrum, Eartholme, Grovinton, Kelsmouth, Tilverdale), updated sporadically.\n");
            writer.write("</td></tr>\n");

            writer.write("<tr><td class='padding-top-10'>\n");
            writer.write("<p>Generated " + getDateTimeString() + "</p>");
            writer.write("</td></tr>\n");

            writer.write("<script src='../../includes/footer.js' type='text/javascript'></script>\n");
            writer.write("</tbody>\n");
            writer.write("</table>\n");

            writer.write("</body>\n");
            writer.write("</html>");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }

    @Override
    public void writeHtmlFileHeader(final Writer writer, final String title)
    {
        try
        {
            writer.write("<html>\n");
            writer.write("<head>\n");
            writer.write("<title>");
            writer.write(title);
            writer.write("</title>\n");
            writer.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"../../includes/style.css\" />\n");
            writer.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"style.css\" />\n");
            writer.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/style.css\" />\n");
            writer.write("<script src=\"sorttable.js\"></script>");
            writer.write("<script src=\"https://dl.dropboxusercontent.com/u/1267954/website/includes/sorttable.js\"></script>");
            writer.write("</head>\n");
            writer.write("<body>\n");
            writer.write("<table id='mainTable'>\n");
            writer.write("<tbody>\n");

            writer.write("<tr>\n");
            writer.write("<td style='font-size: small; padding: 0px;'>\n");
            writer.write("<a href='../../index.html'>Home</a> &gt; <a href='../index.html'>Game</a> &gt; <a href='index.html'>Illyriad</a>\n");
            writer.write("</td>\n");
            writer.write("</tr>\n");

            writer.write("<tr class='accent'>\n");
            writer.write("<td class='header1' colspan='2'>" + title + "</td>\n");
            writer.write("</tr>\n");

            writer.write("<tr><td>&nbsp;</td></tr>\n");

            writer.write("<tr><td>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
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
            writer.write("<th class='table-header-cell-details'>Resource</th>");
            writer.write("<th class='table-header-cell-details'>Cost</th>");
            writer.write("<th class='table-header-cell-details'>Bid</th>");
            writer.write("<th class='table-header-cell-details'>Ask</th>");
            writer.write("<th class='table-header-cell-details'>Estimated Value</th>");
            writer.write("<th class='table-header-cell-details'>Premium</th>");
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
            // Highlight if the bid is greater than the ask.
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

            writer.write("<td class='table-cell-details'");

            if (StringUtils.isNotEmpty(ingredientsString))
            {
                writer.write(" title='");
                writer.write(ingredientsString);
                writer.write("'");
            }

            writer.write(">");
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
            writer.write("<td class='table-cell-details right'>");
            writer.write(formatPremium(products.getPremium(product)));
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
     */
    private void writeDefinitions(final Writer writer)
    {
        try
        {
            writer.write("<dl>\n");
            writer.write("<dt>Cost</dt>\n");
            writer.write("<dd>Cost to buy the ingredients in the market.</dd>\n");
            writer.write("<dt>Bid</dt>\n");
            writer.write("<dd>Highest per item buy order in the market.</dd>\n");
            writer.write("<dt>Ask</dt>\n");
            writer.write("<dd>Lowest per item sell order in the market.</dd>\n");
            writer.write("<dt>Estimated Value</dt>\n");
            writer.write("<dd>");
            writer.write("&bull; average of bid and ask if both exist<br/>\n");
            writer.write("&bull; bid or ask if only one exists<br/>\n");
            writer.write("&bull; triple the cost if no bid or ask exist<br/>\n");
            writer.write("</dd>\n");
            writer.write("<dt>Premium</dt>\n");
            writer.write("<dd>Ratio of value to cost.</dd>\n");
            writer.write("</dl>\n");
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }
    }
}
