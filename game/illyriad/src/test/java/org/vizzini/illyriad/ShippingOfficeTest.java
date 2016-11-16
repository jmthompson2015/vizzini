package org.vizzini.illyriad;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;

import org.junit.Test;

/**
 * Provides tests for the <code>ShippingOffice</code> class.
 */
public final class ShippingOfficeTest
{
    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Test the <code>determineShipper()</code> method.
     */
    @Test
    public void determineShipper()
    {
        final ShippingOffice office = new ShippingOffice(testData.getIngredientCollectionPopulated(),
                testData.createCityResourceMap());
        final Shipper result = office.determineShipper();

        assertNotNull(result);
        assertThat(String.format("%10.1f", result.getTotalDistance()).trim(), is("2059.5"));
    }

    /**
     * Test the <code>determineShipper()</code> method.
     */
    // @Test
    // public void determineShipper2()
    // {
    // final ShippingOffice office = new ShippingOffice(testData.createCityResourceMap());
    // final Shipper result = office.determineShipper2();
    //
    // assertNotNull(result);
    // assertThat(String.format("%10.1f", result.getTotalDistance()).trim(), is("1071.4"));
    // }
}
