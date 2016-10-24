package org.vizzini.illyriad.robot.market;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;
import org.vizzini.illyriad.ResourceType;

/**
 * Provides a builder for a market data tree.
 */
public final class MarketDataTreeBuilder
{
    /** Resource comparator. */
    private final Comparator<ResourceProduct> comparator;

    /** Resource product collection. */
    private final ResourceProductCollection products;

    /**
     * Construct this object.
     * 
     * @param products Resource product collection.
     */
    @SuppressWarnings("hiding")
    public MarketDataTreeBuilder(final ResourceProductCollection products)
    {
        if (products == null)
        {
            throw new IllegalArgumentException("products is null");
        }

        this.products = products;
        this.comparator = createProductComparator();
    }

    /**
     * @return a new list of list items.
     */
    public TreeNode createTreeNodes()
    {
        final List<TreeNode> children = new ArrayList<TreeNode>();

        children.add(new MarketDataTreeNode("Wood", null));
        children.add(new MarketDataTreeNode("Clay", null));
        children.add(new MarketDataTreeNode("Iron", null));
        children.add(new MarketDataTreeNode("Stone", null));
        children.add(new MarketDataTreeNode("Food", null));

        children.add(new MarketDataTreeNode(">> Horses", createHorsesChildren()));
        children.add(new MarketDataTreeNode("Livestock", null));
        children.add(new MarketDataTreeNode(">> Swords", createSwordsChildren()));
        children.add(new MarketDataTreeNode(">> Bows", createBowsChildren()));
        children.add(new MarketDataTreeNode(">> Spears", createSpearsChildren()));

        children.add(new MarketDataTreeNode("Saddle", null));
        children.add(new MarketDataTreeNode("Book", null));
        children.add(new MarketDataTreeNode(">> Leather Armour", createLeatherArmourChildren()));
        children.add(new MarketDataTreeNode(">> Chainmail", createChainmailChildren()));
        children.add(new MarketDataTreeNode(">> Plate Armour", createPlateArmourChildren()));

        children.add(new MarketDataTreeNode("Siege Block", null));
        children.add(new MarketDataTreeNode(">> Beverages", createBeveragesChildren()));
        children.add(new MarketDataTreeNode(">> Anatomies", createAnatomiesChildren()));
        children.add(new MarketDataTreeNode(">> Minerals", createMineralsChildren()));
        children.add(new MarketDataTreeNode(">> Herbs", createHerbsChildren()));

        children.add(new MarketDataTreeNode(">> Exotics", createExoticsChildren()));
        children.add(new MarketDataTreeNode(">> Elemental", createElementalChildren()));

        return new MarketDataTreeNode(">> root", children);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createAnatomiesChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.ANATOMY);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(57));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createBeveragesChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.BEVERAGE);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createBowsChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.BOW);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(1));
        myProducts.add(10, myProducts.remove(3));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createChainmailChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.CHAINMAIL_ARMOUR);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        return createChildTreeNodes(myProducts);
    }

    /**
     * @param myProducts Child myProducts.
     * 
     * @return a new list of child tree nodes.
     */
    private List<TreeNode> createChildTreeNodes(final List<ResourceProduct> myProducts)
    {
        final List<TreeNode> answer = new ArrayList<TreeNode>();

        for (final ResourceProduct product : myProducts)
        {
            final TreeNode listItem = new MarketDataTreeNode(product, null);
            answer.add(listItem);
        }

        return answer;
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createElementalChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.ELEMENTAL);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createExoticsChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.EXOTIC);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(2));
        myProducts.add(1, myProducts.remove(2));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createHerbsChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.HERB);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(11));
        myProducts.add(1, myProducts.remove(11));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createHorsesChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.MOUNT);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(5));
        myProducts.add(1, myProducts.remove(2));
        myProducts.add(2, myProducts.remove(5));
        myProducts.add(3, myProducts.remove(6));
        myProducts.add(4, myProducts.remove(7));
        myProducts.add(5, myProducts.remove(8));
        myProducts.add(6, myProducts.remove(8));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createLeatherArmourChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.LEATHER_ARMOUR);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(11));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createMineralsChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.MINERAL);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(12));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createPlateArmourChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.PLATE_ARMOUR);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(12));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new product comparator.
     */
    private Comparator<ResourceProduct> createProductComparator()
    {
        return new Comparator<ResourceProduct>()
        {
            @Override
            public int compare(final ResourceProduct o1, final ResourceProduct o2)
            {
                return o1.getName().compareTo(o2.getName());
            }
        };
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createSpearsChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.SPEAR);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(24));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @return a new list of tree nodes.
     */
    private List<TreeNode> createSwordsChildren()
    {
        final List<ResourceProduct> myProducts = findByType(ResourceType.SWORD);

        // Put them in the right order.
        Collections.sort(myProducts, comparator);

        myProducts.add(0, myProducts.remove(25));
        myProducts.add(10, myProducts.remove(27));
        myProducts.add(myProducts.remove(25));

        return createChildTreeNodes(myProducts);
    }

    /**
     * @param type Type.
     * 
     * @return myProducts of the given type.
     */
    private List<ResourceProduct> findByType(final ResourceType type)
    {
        final ResourceProductCollection myProducts = products.findByType(type);

        return new ArrayList<ResourceProduct>(myProducts);
    }
}
