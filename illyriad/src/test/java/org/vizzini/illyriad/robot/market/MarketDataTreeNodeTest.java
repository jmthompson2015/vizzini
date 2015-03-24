package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;
import static org.junit.Assert.fail;

import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProduct;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Provides tests for the <code>MarketDataTreeNode</code> class.
 */
public final class MarketDataTreeNodeTest
{
    /** Resource product collection. */
    private final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();

    /**
     * Test the <code>getChildAt()</code> method.
     */
    @Test
    public void getChildAt()
    {
        final TreeNode root = createTree();

        {
            final int i = 0;
            final TreeNode child = root.getChildAt(i);
            assertThat(child.getName(), is("node1_1"));
        }

        assertNull(root.getChildAt(-1));
        assertNull(root.getChildAt(root.getChildCount()));
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndex()
    {
        final TreeNode root = createTree();

        {
            final int i = 0;
            final TreeNode child = root.getChildAt(i);
            assertThat(child.getName(), is("node1_1"));
            assertThat(root.getIndex(child), is(i));
        }

        {
            final int i = 1;
            final TreeNode child = root.getChildAt(i);
            assertThat(child.getName(), is(">> node1_2"));
            assertThat(root.getIndex(child), is(i));
        }

        {
            final int i = 2;
            final TreeNode child = root.getChildAt(i);
            assertThat(child.getName(), is(">> node1_3"));
            assertThat(root.getIndex(child), is(i));
        }
    }

    /**
     * Test the <code>getIndex()</code> method.
     */
    @Test
    public void getIndexNull()
    {
        final TreeNode root = createTree();

        assertThat(root.getIndex(null), is(-1));

        final TreeNode bogus = new MarketDataTreeNode("bogus", null);
        assertThat(root.getIndex(bogus), is(-1));
    }

    /**
     * Test the <code>getNameForFile()</code> method.
     */
    @Test
    public void getNameForFile()
    {
        final String name = "something else";
        final List<TreeNode> children = null;

        final TreeNode result = new MarketDataTreeNode(name, children);

        assertThat(result.getName(), is(name));
        assertThat(result.getNameForFile(), is("something+else"));
    }

    /**
     * Test the <code>getParent()</code> method.
     */
    @Test
    public void getParent()
    {
        final TreeNode root = createTree();

        assertNull(root.getParent());

        {
            final TreeNode item = root.getChildAt(0);
            assertThat(item.getName(), is("node1_1"));
            assertThat(item.getParent(), is(root));
        }

        {
            final TreeNode parent = root.getChildAt(1);
            assertThat(parent.getName(), is(">> node1_2"));
            assertThat(parent.getParent(), is(root));

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_1"));
                assertThat(child.getParent(), is(parent));
            }
        }

        {
            final TreeNode parent = root.getChildAt(2);
            assertThat(parent.getName(), is(">> node1_3"));
            assertThat(parent.getParent(), is(root));

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_3"));
                assertThat(child.getParent(), is(parent));
            }
        }
    }

    /**
     * Test the <code>isChild()</code> method.
     */
    @Test
    public void isChild()
    {
        final TreeNode root = createTree();

        assertFalse(root.isItem());

        {
            final TreeNode item = root.getChildAt(0);
            assertThat(item.getName(), is("node1_1"));
            assertFalse(item.isChild());
        }

        {
            final TreeNode parent = root.getChildAt(1);
            assertThat(parent.getName(), is(">> node1_2"));
            assertFalse(parent.isChild());

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_1"));
                assertTrue(child.isChild());
            }
        }

        {
            final TreeNode parent = root.getChildAt(2);
            assertThat(parent.getName(), is(">> node1_3"));
            assertFalse(parent.isChild());

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_3"));
                assertTrue(child.isChild());
            }
        }
    }

    /**
     * Test the <code>isItem()</code> method.
     */
    @Test
    public void isItem()
    {
        final TreeNode root = createTree();

        assertFalse(root.isItem());

        {
            final TreeNode item = root.getChildAt(0);
            assertThat(item.getName(), is("node1_1"));
            assertTrue(item.isItem());
        }

        {
            final TreeNode parent = root.getChildAt(1);
            assertThat(parent.getName(), is(">> node1_2"));
            assertFalse(parent.isItem());

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_1"));
                assertFalse(child.isItem());
            }
        }

        {
            final TreeNode parent = root.getChildAt(2);
            assertThat(parent.getName(), is(">> node1_3"));
            assertFalse(parent.isItem());

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_3"));
                assertFalse(child.isItem());
            }
        }
    }

    /**
     * Test the <code>isParent()</code> method.
     */
    @Test
    public void isParent()
    {
        final TreeNode root = createTree();

        assertFalse(root.isItem());

        {
            final TreeNode item = root.getChildAt(0);
            assertThat(item.getName(), is("node1_1"));
            assertFalse(item.isParent());
        }

        {
            final TreeNode parent = root.getChildAt(1);
            assertThat(parent.getName(), is(">> node1_2"));
            assertTrue(parent.isParent());

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_1"));
                assertFalse(child.isParent());
            }
        }

        {
            final TreeNode parent = root.getChildAt(2);
            assertThat(parent.getName(), is(">> node1_3"));
            assertTrue(parent.isParent());

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("node2_3"));
                assertFalse(child.isParent());
            }
        }
    }

    /**
     * Test the <code>MarketDataTreeNode()</code> method.
     */
    @Test
    public void testConstructorResource()
    {
        final ResourceProduct product = products.findByName("Horse");
        assertNotNull(product);
        final List<TreeNode> children = null;

        final TreeNode result = new MarketDataTreeNode(product, children);

        assertThat(result.getName(), is("Horse"));
        assertThat(result.getProduct(), is(product));
        assertFalse(result.isParent());
        assertThat(result.getChildCount(), is(0));
    }

    /**
     * Test the <code>MarketDataTreeNode()</code> method.
     */
    @Test
    public void testConstructorResourceNull()
    {
        final List<TreeNode> children = null;

        try
        {
            new MarketDataTreeNode((ResourceProduct)null, children);
            fail("Should have thrown an exception");
        }
        catch (final NullPointerException e)
        {
            assertNull(e.getMessage());
        }
    }

    /**
     * Test the <code>MarketDataTreeNode()</code> method.
     */
    @Test
    public void testConstructorString()
    {
        final String name = "something";
        final List<TreeNode> children = null;

        final TreeNode result = new MarketDataTreeNode(name, children);

        assertThat(result.getName(), is(name));
        assertNull(result.getProduct());
        assertFalse(result.isParent());
        assertThat(result.getChildCount(), is(0));
    }

    /**
     * Test the <code>MarketDataTreeNode()</code> method.
     */
    @Test
    public void testConstructorStringNull()
    {
        final List<TreeNode> children = null;

        try
        {
            new MarketDataTreeNode((String)null, children);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("name is null or empty"));
        }
    }

    /**
     * @return a new tree.
     */
    private TreeNode createTree()
    {
        final TreeNode node2_1 = new MarketDataTreeNode("node2_1", null);
        final TreeNode node2_2 = new MarketDataTreeNode("node2_2", null);
        final List<TreeNode> children1_2 = new ArrayList<TreeNode>();
        children1_2.add(node2_1);
        children1_2.add(node2_2);

        final TreeNode node2_3 = new MarketDataTreeNode("node2_3", null);
        final TreeNode node2_4 = new MarketDataTreeNode("node2_4", null);
        final TreeNode node2_5 = new MarketDataTreeNode("node2_5", null);
        final List<TreeNode> children1_3 = new ArrayList<TreeNode>();
        children1_3.add(node2_3);
        children1_3.add(node2_4);
        children1_3.add(node2_5);

        final TreeNode node1_1 = new MarketDataTreeNode("node1_1", null);
        final TreeNode node1_2 = new MarketDataTreeNode(">> node1_2", children1_2);
        final TreeNode node1_3 = new MarketDataTreeNode(">> node1_3", children1_3);
        final List<TreeNode> children0 = new ArrayList<TreeNode>();
        children0.add(node1_1);
        children0.add(node1_2);
        children0.add(node1_3);

        final TreeNode root = new MarketDataTreeNode(">> root", children0);

        return root;
    }
}
