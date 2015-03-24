package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.assertTrue;

import org.junit.Test;
import org.vizzini.illyriad.ProductBuilder;
import org.vizzini.illyriad.ResourceProductCollection;

/**
 * Provides tests for the <code>MarketDataTreeBuilder</code> class.
 */
public final class MarketDataTreeBuilderTest
{
    /** Resource product collection. */
    private final ResourceProductCollection products = new ProductBuilder().build().getProductCollection();

    /**
     * Test the <code>createTreeNodes()</code> method.
     */
    @Test
    public void createTreeNodes()
    {
        assertThat(products.size(), is(343));

        final MarketDataTreeBuilder builder = new MarketDataTreeBuilder(products);

        final TreeNode result = builder.createTreeNodes();

        assertNotNull(result);
        assertThat(result.getChildCount(), is(22));

        for (int i = 0; i < 22; i++)
        {
            final TreeNode treeNode = result.getChildAt(i);
            assertNotNull(treeNode);
            assertTrue(treeNode.getChildCount() >= 0);
        }

        {
            final TreeNode treeNode = result.getChildAt(0);
            assertThat(treeNode.getName(), is("Wood"));
            assertFalse(treeNode.isParent());
        }

        {
            final TreeNode item = result.getChildAt(2);
            assertThat(item.getName(), is("Iron"));
            assertFalse(item.isParent());
        }

        {
            final TreeNode parent = result.getChildAt(5);
            assertThat(parent.getName(), is(">> Horses"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(10));

            {
                final TreeNode child = parent.getChildAt(4);
                assertThat(child.getName(), is("Riding Horse"));
            }
        }

        {
            final TreeNode parent = result.getChildAt(7);
            assertThat(parent.getName(), is(">> Swords"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(28));

            {
                final TreeNode child = parent.getChildAt(18);
                assertThat(child.getName(), is("Razor-Edged Sword"));
            }
        }

        {
            final TreeNode parent = result.getChildAt(8);
            assertThat(parent.getName(), is(">> Bows"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(24));

            {
                final TreeNode child = parent.getChildAt(0);
                assertThat(child.getName(), is("Bow"));
            }

            {
                final TreeNode child = parent.getChildAt(6);
                assertThat(child.getName(), is("Hero's Bow"));
            }

            {
                final TreeNode child = parent.getChildAt(7);
                assertThat(child.getName(), is("High-Power Bow"));
            }

            {
                final TreeNode child = parent.getChildAt(8);
                assertThat(child.getName(), is("Hillsman's Bow"));
            }

            {
                final TreeNode child = parent.getChildAt(23);
                assertThat(child.getName(), is("Woodsman's Bow"));
            }
        }

        {
            final TreeNode parent = result.getChildAt(9);
            assertThat(parent.getName(), is(">> Spears"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(27));
        }

        {
            final TreeNode parent = result.getChildAt(12);
            assertThat(parent.getName(), is(">> Leather Armour"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(21));
        }

        {
            final TreeNode parent = result.getChildAt(13);
            assertThat(parent.getName(), is(">> Chainmail"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(20));
        }

        {
            final TreeNode parent = result.getChildAt(14);
            assertThat(parent.getName(), is(">> Plate Armour"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(20));
        }

        {
            final TreeNode parent = result.getChildAt(16);
            assertThat(parent.getName(), is(">> Beverages"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(2));
        }

        {
            final TreeNode parent = result.getChildAt(17);
            assertThat(parent.getName(), is(">> Anatomies"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(119));
        }

        {
            final TreeNode parent = result.getChildAt(18);
            assertThat(parent.getName(), is(">> Minerals"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(21));
        }

        {
            final TreeNode parent = result.getChildAt(19);
            assertThat(parent.getName(), is(">> Herbs"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(31));

            {
                final TreeNode child = parent.getChildAt(22);
                assertThat(child.getName(), is("Sharproot"));
            }
        }

        {
            final TreeNode parent = result.getChildAt(20);
            assertThat(parent.getName(), is(">> Exotics"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(4));
        }

        {
            final TreeNode parent = result.getChildAt(21);
            assertThat(parent.getName(), is(">> Elemental"));
            assertTrue(parent.isParent());
            assertThat(parent.getChildCount(), is(4));
        }
    }
}
