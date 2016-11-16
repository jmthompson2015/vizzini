package org.vizzini.illyriad.robot.market;

import java.awt.Toolkit;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Writer;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.Reporter;
import org.vizzini.illyriad.ResourceCrafter;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.ResourceRecipe;
import org.vizzini.illyriad.ResourceRecipeCollection;
import org.vizzini.illyriad.ResourceType;

/**
 * Provides an implementation of an HTML reporter for useful products. This class assumes the Resource market values
 * have already been initialized.
 */
public final class UsefulResourceByTypeReporter implements HtmlReporter
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
        final Reporter reporter = new UsefulResourceByTypeReporter(crafter.getRecipeCollection(),
                crafter.getProductCollection());

        final File outputDirectory = new File(Locations.MARKET_DATA_DIR, "html");
        outputDirectory.mkdirs();
        final File outputFile = new File(outputDirectory, "usefulResources2.html");

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
        new TimePrinter().printElapsedTime("UsefulResourceByTypeReporter", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Map of product type to useful products. */
    private final Map<ResourceType, Set<ResourceProduct>> armourResources = new HashMap<ResourceType, Set<ResourceProduct>>();

    /** Delegate. */
    private final HtmlReporter delegate;

    /** Map of product type to useful products. */
    private final Map<ResourceType, Set<ResourceProduct>> mountResources = new HashMap<ResourceType, Set<ResourceProduct>>();

    /** Resource recipe collection. */
    private final ResourceRecipeCollection recipes;

    /** Map of product type to useful products. */
    private final Map<ResourceType, Set<ResourceProduct>> weaponResources = new HashMap<ResourceType, Set<ResourceProduct>>();

    /**
     * Construct this object.
     * 
     * @param recipes Resource recipe collection.
     * @param products Resource product collection.
     */
    @SuppressWarnings("hiding")
    public UsefulResourceByTypeReporter(final ResourceRecipeCollection recipes, final ResourceProductCollection products)
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

        final Comparator<ResourceProduct> comparator = createProductComparator();

        try
        {
            writeHtmlFileHeader(writer, "Illyriad Crafting: Useful Resources by Crafted Resource");
            writer.write("<p>These resources are used in <a href='craftedResources.html'>crafting</a>.</p>");

            writer.write("<h1>Mounts</h1>");
            for (final ResourceType type : ResourceType.values())
            {
                final ResourceProductCollection list = new ResourceProductCollection(getResourceSet(mountResources,
                        type));
                Collections.sort(list, comparator);
                writeResourceTable(writer, type.getDisplayName(), list);
            }

            writer.write("<h1>Weapons</h1>");
            for (final ResourceType type : ResourceType.values())
            {
                final ResourceProductCollection list = new ResourceProductCollection(getResourceSet(weaponResources,
                        type));
                Collections.sort(list, comparator);
                writeResourceTable(writer, type.getDisplayName(), list);
            }

            writer.write("<h1>Armour</h1>");
            for (final ResourceType type : ResourceType.values())
            {
                final ResourceProductCollection list = new ResourceProductCollection(getResourceSet(armourResources,
                        type));
                Collections.sort(list, comparator);
                writeResourceTable(writer, type.getDisplayName(), list);
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
     * Fill the useful and useless lists.
     */
    private void determineResourceUsefulness()
    {
        armourResources.clear();
        mountResources.clear();
        weaponResources.clear();

        final ResourceProductCollection products = getProducts();

        for (final ResourceType type : ResourceType.values())
        {
            final List<ResourceProduct> myProducts = products.findByType(type);

            if (!myProducts.isEmpty())
            {
                for (final ResourceProduct product : myProducts)
                {
                    final ResourceRecipeCollection myRecipes = recipes.whichUse(product.getIngredient());

                    if (!myRecipes.isEmpty())
                    {
                        for (final ResourceRecipe recipe : myRecipes)
                        {
                            final ResourceProduct myProduct = products.findByName(recipe.getName());

                            if (myProduct.getType() == ResourceType.MOUNT)
                            {
                                getResourceSet(mountResources, ResourceType.BASIC).add(product);
                            }
                            else if (myProduct.getType().isWeapon())
                            {
                                if ("Spears".equals(product.getName()) || "Swords".equals(product.getName())
                                        || "Bows".equals(product.getName()))
                                {
                                    getResourceSet(weaponResources, ResourceType.BASIC).add(product);
                                }
                                else
                                {
                                    getResourceSet(weaponResources, type).add(product);
                                }
                            }
                            else if (myProduct.getType().isArmour())
                            {
                                if ("Leather Armour".equals(product.getName())
                                        || "Chainmail Armour".equals(product.getName())
                                        || "Plate Armour".equals(product.getName()))
                                {
                                    getResourceSet(armourResources, ResourceType.BASIC).add(product);
                                }
                                else
                                {
                                    getResourceSet(armourResources, type).add(product);
                                }
                            }
                        }
                    }
                }
            }
        }

        System.out.println();
        System.out.println("Mount products : " + mountResources.size());
        System.out.println("Weapon products: " + weaponResources.size());
        System.out.println("Armour products: " + armourResources.size());
    }

    /**
     * @param products Map of product type to products.
     * @param type Resource type.
     * 
     * @return the product list for the given parameter.
     */
    private Set<ResourceProduct> getResourceSet(final Map<ResourceType, Set<ResourceProduct>> products,
            final ResourceType type)
    {
        Set<ResourceProduct> answer = products.get(type);

        if (answer == null)
        {
            answer = new HashSet<ResourceProduct>();
            products.put(type, answer);
        }

        return answer;
    }
}
