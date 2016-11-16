package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.hamcrest.CoreMatchers.not;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

import org.junit.Test;

/**
 * Provides tests for the <code>Shipper</code> class.
 */
public final class ShipperTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>determineShipments()</code> method.
     */
    @Test
    public void determineShipments0()
    {
        final Shipper shipper = new Shipper(testData.getIngredientCollectionPopulated(), createCities1(),
                createCities1Reversed(), testData.createCityResourceMap());

        // shipper.determineShipments();
        shipper.getTotalDistance();
        final List<Shipment> result = shipper.getShipments();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(8));

        // printShipments(result);
        System.out.println(shipper);

        assertThat(String.format("%10.1f", shipper.getTotalDistance()).trim(), is("3487.7"));
    }

    /**
     * Test the <code>determineShipments()</code> method.
     */
    @Test
    public void determineShipments1()
    {
        final Shipper shipper = new Shipper(testData.getIngredientCollectionPopulated(), createCities1Reversed(),
                createCities1(), testData.createCityResourceMap());

        shipper.getTotalDistance();
        final List<Shipment> result = shipper.getShipments();

        assertNotNull(result);
        assertFalse(result.isEmpty());
        assertThat(result.size(), is(8));

        // printShipments(result);
        System.out.println(shipper);

        assertThat(String.format("%10.1f", shipper.getTotalDistance()).trim(), is("3487.7"));
    }

    /**
     * Test the <code>determineShipments()</code> method.
     */
    @Test
    public void testConstructorNull()
    {
        try
        {
            new Shipper(null, null, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("ingredients is null"));
        }

        try
        {
            new Shipper(testData.getIngredientCollectionPopulated(), null, null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("cities1 is null or empty"));
        }

        try
        {
            new Shipper(testData.getIngredientCollectionPopulated(), new ArrayList<City>(), null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("cities1 is null or empty"));
        }

        try
        {
            new Shipper(testData.getIngredientCollectionPopulated(), createCities1(), null, null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("cities2 is null or empty"));
        }

        try
        {
            new Shipper(testData.getIngredientCollectionPopulated(), createCities1(), new ArrayList<City>(), null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("cities2 is null or empty"));
        }

        try
        {
            new Shipper(testData.getIngredientCollectionPopulated(), createCities1(), createCities1Reversed(), null);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("cityResourceMap is null"));
        }
    }

    /**
     * Test the <code>equals()</code> method.
     */
    @Test
    public void testEquals()
    {
        final Shipper shipper0 = new Shipper(testData.getIngredientCollectionPopulated(), createCities1(),
                createCities1Reversed(), testData.createCityResourceMap());
        final Shipper shipper1 = new Shipper(testData.getIngredientCollectionPopulated(), createCities1Reversed(),
                createCities1(), testData.createCityResourceMap());
        final Shipper shipper2 = new Shipper(testData.getIngredientCollectionPopulated(), createCities1(),
                createCities1Reversed(), testData.createCityResourceMap());

        assertTrue(shipper0.equals(shipper0));
        assertFalse(shipper0.equals(shipper1));
        assertTrue(shipper0.equals(shipper2));
        assertFalse(shipper0.equals(null));
    }

    /**
     * Test the <code>hashCode()</code> method.
     */
    @Test
    public void testHashCode()
    {
        final Shipper shipper0 = new Shipper(testData.getIngredientCollectionPopulated(), createCities1(),
                createCities1Reversed(), testData.createCityResourceMap());
        final Shipper shipper1 = new Shipper(testData.getIngredientCollectionPopulated(), createCities1Reversed(),
                createCities1(), testData.createCityResourceMap());
        final Shipper shipper2 = new Shipper(testData.getIngredientCollectionPopulated(), createCities1(),
                createCities1Reversed(), testData.createCityResourceMap());

        assertThat(shipper0.hashCode(), is(shipper0.hashCode()));
        assertThat(shipper0.hashCode(), not(shipper1.hashCode()));
        assertThat(shipper0.hashCode(), is(shipper2.hashCode()));
    }

    /**
     * @return a list of cities.
     */
    private List<City> createCities1()
    {
        final List<City> answer = Arrays.asList(City.values());

        return answer;
    }

    /**
     * @return a list of cities.
     */
    private List<City> createCities1Reversed()
    {
        final List<City> answer = Arrays.asList(City.values());
        Collections.reverse(answer);

        return answer;
    }
}
