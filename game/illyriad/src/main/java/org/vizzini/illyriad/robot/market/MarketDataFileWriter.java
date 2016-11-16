package org.vizzini.illyriad.robot.market;

import java.io.IOException;
import java.io.Writer;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.ResourceType;

/**
 * Provides a file writer for market values.
 */
public final class MarketDataFileWriter
{
    /** Resource product collection. */
    private final ResourceProductCollection products;

    /** Writer. */
    private final Writer writer;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     * @param writer Writer.
     */
    @SuppressWarnings("hiding")
    public MarketDataFileWriter(final ResourceProductCollection products, final Writer writer)
    {
        if (products == null)
        {
            throw new IllegalArgumentException("products is null");
        }

        if (writer == null)
        {
            throw new IllegalArgumentException("writer is null");
        }

        this.products = products;
        this.writer = writer;
    }

    /**
     * @param marketDataList Market data list.
     */
    public void write(final List<MarketData> marketDataList)
    {
        try
        {
            writer.write("// Market values for useful and crafted resources.\n");
            writer.write("// bid ask resource\n");
            writer.write("// Report written ");
            writer.write(getDateTimeString());
            writer.write("\n");

            for (final ResourceType resourceType : ResourceType.values())
            {
                writer.write("\n// ");
                writer.write(resourceType.getDisplayName());
                writer.write("\n");
                final List<ResourceProduct> myProducts = products.findByType(resourceType);

                for (final ResourceProduct product : myProducts)
                {
                    final MarketData marketData = findByProduct(marketDataList, product);

                    if (marketData != null)
                    {
                        if (StringUtils.isEmpty(marketData.getBidPrice()))
                        {
                            writer.write("0");
                        }
                        else
                        {
                            writer.write(marketData.getBidPrice());
                        }

                        writer.write(" ");

                        if (StringUtils.isEmpty(marketData.getAskPrice()))
                        {
                            writer.write("0");
                        }
                        else
                        {
                            writer.write(marketData.getAskPrice());
                        }

                        writer.write(" ");
                        writer.write(marketData.getProduct().getName());
                        writer.write("\n");
                    }
                }
            }
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
    }

    /**
     * @param marketDataList Market data list.
     * @param product Resource.
     * 
     * @return market data for the given resource.
     */
    private MarketData findByProduct(final List<MarketData> marketDataList, final ResourceProduct product)
    {
        MarketData answer = null;

        for (final MarketData marketData : marketDataList)
        {
            if (marketData.getProduct().equals(product))
            {
                answer = marketData;
                break;
            }
        }

        return answer;
    }

    /**
     * @return a date time string.
     */
    private String getDateTimeString()
    {
        final Date date = new Date();
        final DateFormat formatter = new SimpleDateFormat("yyyy.MM.dd HH:mm");

        return formatter.format(date);
    }
}
