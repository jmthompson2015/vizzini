package org.vizzini.illyriad.robot.market;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.illyriad.ResourceProduct;

/**
 * Provides a market data implementation of a tree node.
 */
public final class MarketDataTreeNode implements TreeNode
{
    /** Children. */
    private final List<TreeNode> children;

    /** Flag indicating whether this can have children. */
    private final boolean isParent;

    /** Name. */
    private final String name;

    /** Parent. */
    private TreeNode parent;

    /** Resource product. */
    private ResourceProduct product;

    /**
     * Construct this object.
     * 
     * @param product Resource. (required)
     * @param children Children. (optional)
     */
    @SuppressWarnings("hiding")
    public MarketDataTreeNode(final ResourceProduct product, final List<TreeNode> children)
    {
        this(product.getName(), children);

        this.product = product;
    }

    /**
     * Construct this object.
     * 
     * @param name Name. (required)
     * @param children Children. (optional)
     */
    @SuppressWarnings("hiding")
    public MarketDataTreeNode(final String name, final List<TreeNode> children)
    {
        if (StringUtils.isEmpty(name))
        {
            throw new IllegalArgumentException("name is null or empty");
        }

        this.name = name;
        this.isParent = ((children != null) && !children.isEmpty());
        this.product = null;

        if (isParent)
        {
            this.children = new ArrayList<TreeNode>();

            if (children != null)
            {
                for (final TreeNode child : children)
                {
                    this.children.add(child);

                    if (child instanceof MarketDataTreeNode)
                    {
                        ((MarketDataTreeNode)child).parent = this;
                    }
                }
            }
        }
        else
        {
            final List<TreeNode> list = Collections.emptyList();
            this.children = list;
        }
    }

    @Override
    public TreeNode getChildAt(final int index)
    {
        TreeNode answer = null;

        if ((0 <= index) && (index < getChildCount()))
        {
            answer = children.get(index);
        }

        return answer;
    }

    @Override
    public int getChildCount()
    {
        return children.size();
    }

    @Override
    public int getIndex(final TreeNode child)
    {
        int answer = -1;

        if (child != null)
        {
            answer = children.indexOf(child);
        }

        return answer;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public String getNameForFile()
    {
        final String answer = getName().replaceAll("[ ]", "+");

        return answer;
    }

    @Override
    public TreeNode getParent()
    {
        return parent;
    }

    @Override
    public ResourceProduct getProduct()
    {
        return product;
    }

    @Override
    public boolean isChild()
    {
        return isLevel2();
    }

    @Override
    public boolean isItem()
    {
        return (isLevel1() && (getChildCount() == 0));
    }

    @Override
    public boolean isParent()
    {
        return isParent && isLevel1();
    }

    /**
     * @return true if this is in the item or parent level.
     */
    private boolean isLevel1()
    {
        return (parent != null) && (parent.getParent() == null);
    }

    /**
     * @return true if this is in the leaf level.
     */
    private boolean isLevel2()
    {
        return (parent != null) && (parent.getParent() != null);
    }
}
