package org.vizzini.illyriad;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import org.vizzini.ai.geneticalgorithm.Genome;

/**
 * Provides a shipper.
 */
public final class Shipper implements Comparable<Shipper>, Genome<List<City>>
{
    /**
     * @param cityResourceMap Map of city to map of resource to amount.
     * 
     * @return a clone of the given parameter.
     */
    private static Map<City, ResourceMap> cloneCityResourceMap(final Map<City, ResourceMap> cityResourceMap)
    {
        final Map<City, ResourceMap> answer = new HashMap<City, ResourceMap>();

        for (final Entry<City, ResourceMap> cityEntry : cityResourceMap.entrySet())
        {
            final City city = cityEntry.getKey();
            final ResourceMap resourceMap = cityEntry.getValue();
            final ResourceMap map = resourceMap.copy();
            answer.put(city, map);
        }

        return answer;
    }

    /** Ordered list of cities. */
    private final List<City> cities1;

    /** Ordered list of cities. */
    private final List<City> cities2;

    /** Map of city to map of resource to amount. */
    private final Map<City, ResourceMap> cityResourceMap;

    /** Herb share. */
    private int herbShare;

    /** Hides share. */
    private int hidesShare;

    /** Horse share. */
    private int horsesShare;

    /** Ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /** Mineral share. */
    private int mineralShare;

    /** Map of city to map of resource to amount. */
    private final Map<City, ResourceMap> originalCityResourceMap;

    /** Shipments. */
    private final List<Shipment> shipments = new ArrayList<Shipment>();

    /** Total distance of shipments. */
    private Double totalDistance = null;

    /**
     * Construct this object.
     * 
     * @param ingredients Ingredient collection.
     * @param cities1 First list of cities.
     * @param cities2 Second list of cities.
     * @param cityResourceMap Map of city to map of resource to amount.
     */
    @SuppressWarnings("hiding")
    public Shipper(final ResourceIngredientCollection ingredients, final List<City> cities1, final List<City> cities2,
            final Map<City, ResourceMap> cityResourceMap)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        if ((cities1 == null) || cities1.isEmpty())
        {
            throw new IllegalArgumentException("cities1 is null or empty");
        }

        if ((cities2 == null) || cities2.isEmpty())
        {
            throw new IllegalArgumentException("cities2 is null or empty");
        }

        if (cityResourceMap == null)
        {
            throw new IllegalArgumentException("cityResourceMap is null");
        }

        this.ingredients = ingredients;
        this.cities1 = new ArrayList<City>(cities1);
        this.cities2 = new ArrayList<City>(cities2);
        this.originalCityResourceMap = cityResourceMap;
        this.cityResourceMap = cloneCityResourceMap(cityResourceMap);

        determineShipments();
    }

    /**
     * Copy constructor.
     * 
     * @param ingredients Ingredient collection.
     * @param another Another shipper.
     * @param cityResourceMap Map of city to map of resource to amount.
     */
    @SuppressWarnings("hiding")
    public Shipper(final ResourceIngredientCollection ingredients, final Shipper another,
            final Map<City, ResourceMap> cityResourceMap)
    {
        this(ingredients, another.cities1, another.cities2, cityResourceMap);
    }

    @Override
    public boolean add(final List<City> value)
    {
        throw new RuntimeException("Method not implemented");
    }

    @Override
    public int compareTo(final Shipper another)
    {
        return getTotalDistance().compareTo(another.getTotalDistance());
    }

    @Override
    public Genome<List<City>> copy()
    {
        final Shipper answer = new Shipper(this.ingredients, this.cities1, this.cities2, this.originalCityResourceMap);

        return answer;
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }
        else
        {
            final Shipper another = (Shipper)object;

            answer = cities1.equals(another.cities1) && cities2.equals(another.cities2);
        }

        return answer;
    }

    @Override
    public List<City> get(final int index)
    {
        List<City> answer = null;

        switch (index)
        {
        case 0:
            answer = cities1;
            break;
        case 1:
            answer = cities2;
            break;
        default:
            throw new IllegalArgumentException("Index out of bounds [0,1]: " + index);
        }

        return answer;
    }

    /**
     * @return the cities1
     */
    public List<City> getCities1()
    {
        return cities1;
    }

    /**
     * @return the cities2
     */
    public List<City> getCities2()
    {
        return cities2;
    }

    /**
     * @return the cityResourceMap
     */
    public Map<City, ResourceMap> getCityResourceMap()
    {
        return cityResourceMap;
    }

    @Override
    public double getFitness()
    {
        return getTotalDistance();
    }

    /**
     * @return the herbShare
     */
    public int getHerbShare()
    {
        return herbShare;
    }

    /**
     * @return the hidesShare
     */
    public int getHidesShare()
    {
        return hidesShare;
    }

    /**
     * @return the horsesShare
     */
    public int getHorsesShare()
    {
        return horsesShare;
    }

    /**
     * @return the mineralShare
     */
    public int getMineralShare()
    {
        return mineralShare;
    }

    /**
     * @return the shipments
     */
    public List<Shipment> getShipments()
    {
        return shipments;
    }

    /**
     * @return the sum of the distances for all shipments.
     */
    public Double getTotalDistance()
    {
        if (totalDistance == null)
        {
            if (shipments.isEmpty())
            {
                // FIXME Why would this happen?
                totalDistance = Double.MAX_VALUE;

                // System.out.println("Shipper" + hashCode() + " totalDistance = " + totalDistance);
                // System.out.println("shipments.size() = " + shipments.size());
                // System.out.println("cities1 = " + cities1);
                // System.out.println("cities2 = " + cities2);
                // System.out.println("cityResourceMap = " + cityResourceMap);
            }
            else
            {
                totalDistance = 0.0;

                for (final Shipment shipment : shipments)
                {
                    totalDistance += shipment.getDistance();
                }
            }
        }

        return totalDistance;
    }

    @Override
    public int hashCode()
    {
        int answer = cities1.hashCode();

        answer += 37 * cities2.hashCode();

        return answer;
    }

    @Override
    public int length()
    {
        return 2;
    }

    @Override
    public void setFitness(final double fitness)
    {
        // Nothing to do.
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append("Shipments:\n");

        Shipment previousShipment = null;

        for (final Shipment shipment : shipments)
        {
            if ((previousShipment != null) && (previousShipment.getSupplier() != shipment.getSupplier()))
            {
                sb.append("\n");
            }
            sb.append(shipment);
            previousShipment = shipment;
        }

        return sb.toString();
    }

    /**
     * @param supplier Supplier city.
     * @param consumer Consumer city.
     * @param resource Resource.
     * @param share Target resource amount.
     */
    private void addShipment(final City supplier, final City consumer, final ResourceIngredient resource,
            final int share)
    {
        final int supply = getAmount(supplier, resource) - share;

        if (supply > 0)
        {
            final int demand = share - getAmount(consumer, resource);

            if (demand > 0)
            {
                final int shipment = (supply > demand ? demand : supply);
                // System.out.println("supply = " + supply + " demand = " + demand + " shipment = " + shipment);

                if (shipment > 0)
                {
                    getShipment(supplier, consumer).getResourceMap().put(resource, shipment);

                    final ResourceMap resourceMap0 = getResourceMap(supplier);
                    resourceMap0.put(resource, getAmount(supplier, resource) - shipment);

                    final ResourceMap resourceMap1 = getResourceMap(consumer);
                    resourceMap1.put(resource, getAmount(consumer, resource) + shipment);
                }
            }

        }
    }

    /**
     * @param resource Resource.
     * 
     * @return the sum of the given resource in all cities.
     */
    private int computeTotal(final ResourceIngredient resource)
    {
        int answer = 0;

        for (final City city : City.values())
        {
            final ResourceMap resourceMap = getResourceMap(city);
            final Integer amount = resourceMap.get(resource);

            if (amount != null)
            {
                answer += amount;
            }
        }

        return answer;
    }

    /**
     * Determine shipments.
     */
    private void determineShipments()
    {
        totalDistance = null;

        // Determine shares.
        final int cityCount = cities1.size();
        final ResourceIngredient herb = ingredients.findByName("Herb");
        final ResourceIngredient hides = ingredients.findByName("Hides");
        final ResourceIngredient horses = ingredients.findByName("Horse");
        final ResourceIngredient mineral = ingredients.findByName("Mineral");

        herbShare = computeTotal(herb) / cityCount;
        hidesShare = computeTotal(hides) / cityCount;
        horsesShare = computeTotal(horses) / cityCount;
        mineralShare = computeTotal(mineral) / cityCount;

        for (final City city1 : cities1)
        {
            for (final City city2 : cities2)
            {
                if (city1 != city2)
                {
                    addShipment(city1, city2, horses, horsesShare);
                    addShipment(city1, city2, hides, hidesShare);
                    addShipment(city1, city2, mineral, mineralShare);
                    addShipment(city1, city2, herb, herbShare);
                }
            }
        }

        if (shipments.isEmpty())
        {
            System.err.println("shipments is empty for\n" + getCities1() + " to " + getCities2());
            System.err.println("cityResourceMap.size() = " + getCityResourceMap().size());
            for (final Entry<City, ResourceMap> entry : cityResourceMap.entrySet())
            {
                System.err.println(" " + entry);
            }
            System.err.println("shares = " + herbShare + " " + hidesShare + " " + mineralShare + " " + horsesShare);
            System.err.println("totalDistance = " + getTotalDistance());
        }

        Collections.sort(shipments);

        getTotalDistance();
    }

    /**
     * @param city City.
     * @param resource Resource.
     * 
     * @return the amount of the given resource in the given city.
     */
    private int getAmount(final City city, final ResourceIngredient resource)
    {
        int answer = 0;

        final ResourceMap resourceMap = getResourceMap(city);

        final Integer amount = resourceMap.get(resource);

        if (amount != null)
        {
            answer = amount;
        }

        return answer;
    }

    /**
     * @param city City.
     * 
     * @return the resource map for the given parameter.
     */
    private ResourceMap getResourceMap(final City city)
    {
        ResourceMap answer = cityResourceMap.get(city);

        if (answer == null)
        {
            answer = new ResourceMap();
            cityResourceMap.put(city, answer);
        }

        return answer;
    }

    /**
     * @param supplier Supplier city.
     * @param consumer Consumer city.
     * 
     * @return the shipment for the given parameters, creating it if necessary.
     */
    private Shipment getShipment(final City supplier, final City consumer)
    {
        Shipment answer = null;

        for (final Shipment shipment : shipments)
        {
            if ((shipment.getSupplier() == supplier) && (shipment.getConsumer() == consumer))
            {
                answer = shipment;
                break;
            }
        }

        if (answer == null)
        {
            answer = new Shipment(supplier, consumer);
            shipments.add(answer);
        }

        return answer;
    }
}
