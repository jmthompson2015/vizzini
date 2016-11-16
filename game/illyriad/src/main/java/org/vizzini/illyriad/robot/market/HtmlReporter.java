package org.vizzini.illyriad.robot.market;

import java.io.Writer;
import java.util.Comparator;

import org.vizzini.illyriad.Reporter;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Defines methods required by a reporter which uses HTML.
 */
public interface HtmlReporter extends Reporter
{
    /**
     * @return a new product product comparator.
     */
    Comparator<ResourceProduct> createProductComparator();

    /**
     * @param amount Amount.
     * 
     * @return a string representation of the given parameter.
     */
    String formatAmount(double amount);

    /**
     * @param premium Premium.
     * 
     * @return a string representation of the given parameter.
     */
    String formatPremium(double premium);

    /**
     * @return a date time string.
     */
    String getDateTimeString();

    /**
     * @return the products
     */
    ResourceProductCollection getProducts();

    /**
     * @param writer Writer.
     */
    void writeHtmlFileFooter(Writer writer);

    /**
     * @param writer Writer.
     * @param title Title.
     */
    void writeHtmlFileHeader(Writer writer, String title);

    /**
     * @param writer Writer.
     * @param title Title.
     * @param products Resource product collection.
     */
    void writeResourceTable(Writer writer, String title, ResourceProductCollection products);

    /**
     * @param writer Writer.
     */
    void writeResourceTableHeader(Writer writer);

    /**
     * @param writer Writer.
     * @param product Resource.
     */
    void writeResourceTableLine(Writer writer, ResourceProduct product);
}
