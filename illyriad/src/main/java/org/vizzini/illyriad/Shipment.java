package org.vizzini.illyriad;

import java.util.Map.Entry;

/**
 * Provides a shipment.
 */
public final class Shipment implements Comparable<Shipment>
{
    /** Supplier city. */
    private final City supplier;

    /** Consumer city. */
    private final City consumer;

    /** Map of resource to amount. */
    private final ResourceMap resourceMap = new ResourceMap();

    /**
     * @param supplier Supplier city.
     * @param consumer Consumer city.
     */
    @SuppressWarnings("hiding")
    public Shipment(final City supplier, final City consumer)
    {
        this.supplier = supplier;
        this.consumer = consumer;
    }

    @Override
    public int compareTo(final Shipment another)
    {
        int answer = supplier.compareTo(another.supplier);

        if (answer == 0)
        {
            answer = consumer.compareTo(another.consumer);
        }

        return answer;
    }

    /**
     * @return the consumer
     */
    public City getConsumer()
    {
        return consumer;
    }

    /**
     * @return the distance between supplier and consumer.
     */
    public double getDistance()
    {
        return supplier.computeDistance(consumer);
    }

    /**
     * @return the resourceMap
     */
    public ResourceMap getResourceMap()
    {
        return resourceMap;
    }

    /**
     * @return the supplier
     */
    public City getSupplier()
    {
        return supplier;
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(supplier);
        sb.append(" to ");
        sb.append(consumer);
        sb.append(" (");
        sb.append(String.format("%10.1f", supplier.computeDistance(consumer)).trim());
        sb.append(" sq)\n");

        for (final Entry<ResourceIngredient, Integer> entry : resourceMap.entrySet())
        {
            sb.append(" * ");
            sb.append(entry.getKey().getName());
            sb.append(" ");
            sb.append(entry.getValue());
            sb.append("\n");
        }

        return sb.toString();
    }
}
