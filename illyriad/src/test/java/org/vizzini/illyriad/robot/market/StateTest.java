package org.vizzini.illyriad.robot.market;

import static org.hamcrest.CoreMatchers.is;
import static org.junit.Assert.assertThat;
import static org.junit.Assert.fail;

import java.awt.Point;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.junit.Test;
import org.vizzini.ai.robot.DefaultRobotImage;
import org.vizzini.ai.robot.RobotImage;
import org.vizzini.ai.robot.RobotImageIO;

/**
 * Provides tests for the <code>State</code> class.
 */
public final class StateTest
{
    /**
     * Test the <code>State()</code> method.
     */
    @Test
    public void testConstructor()
    {
        final TreeNode treeNode = createTreeNode();
        final List<RobotImage> images = createImages();
        final int index = 1;

        final State state = new State(treeNode, images, index);

        assertThat(state.getImages(), is(images));
        assertThat(state.getIndex(), is(index));
        assertThat(state.getY(), is(12));
    }

    /**
     * Test the <code>State()</code> method.
     */
    @Test
    public void testConstructorIllegalIndex()
    {
        final TreeNode treeNode = createTreeNode();
        final List<RobotImage> images = createImages();

        try
        {
            new State(treeNode, images, -1);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("index out of bounds [0, 2): -1"));
        }

        try
        {
            new State(treeNode, images, 2);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("index out of bounds [0, 2): 2"));
        }
    }

    /**
     * Test the <code>State()</code> method.
     */
    @Test
    public void testConstructorImagesNull()
    {
        final TreeNode treeNode = createTreeNode();
        final int index = 1;

        try
        {
            new State(treeNode, null, index);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("images is null"));
        }
    }

    /**
     * Test the <code>State()</code> method.
     */
    @Test
    public void testConstructorTreeNodeNull()
    {
        final List<RobotImage> images = createImages();
        final int index = 1;

        try
        {
            new State(null, images, index);
            fail("Should have thrown an exception");
        }
        catch (final IllegalArgumentException e)
        {
            assertThat(e.getMessage(), is("treeNode is null"));
        }
    }

    /**
     * Test the <code>withIncrementedIndex()</code> method.
     */
    // @Test
    // public void withIncrementedIndex()
    // {
    // final TreeNode treeNode = createTreeNode();
    // final List<RobotImage> images = createImages();
    // final int index = 0;
    //
    // final State state0 = new State(treeNode, images, index);
    //
    // assertThat(state0.getIndex(), is(index));
    // assertThat(state0.getY(), is(4));
    //
    // final State state1 = state0.withIncrementedIndex();
    //
    // assertThat(state1.getIndex(), is(index + 1));
    // assertThat(state1.getY(), is(12));
    //
    // try
    // {
    // state1.withIncrementedIndex();
    // fail("Should have thrown an exception");
    // }
    // catch (final IllegalArgumentException e)
    // {
    // assertThat(e.getMessage(), is("index out of bounds [0, 2): 2"));
    // }
    // }

    /**
     * @return a new list of images.
     */
    private List<RobotImage> createImages()
    {
        final List<RobotImage> answer = new ArrayList<RobotImage>();

        answer.add(getAskImage());
        answer.add(getBidImage());

        return answer;
    }

    /**
     * @return a new tree node.
     */
    private TreeNode createTreeNode()
    {
        final String name = "Horses";
        final List<TreeNode> children = null;

        final TreeNode answer = new MarketDataTreeNode(name, children);

        return answer;
    }

    /**
     * @return a new robot image.
     */
    private RobotImage getAskImage()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/WoodAsk20131010.png");
        final RobotImageIO imageIo = new RobotImageIO();
        final RobotImage image = imageIo.read(inputStream);
        final int x = 3;
        final int y = 4;

        return new DefaultRobotImage(image, null, new Point(x, y));
    }

    /**
     * @return a new robot image.
     */
    private RobotImage getBidImage()
    {
        final InputStream inputStream = getClass().getResourceAsStream("/WoodBid20131010.png");
        final RobotImageIO imageIo = new RobotImageIO();
        final RobotImage image = imageIo.read(inputStream);
        final int x = 11;
        final int y = 12;

        return new DefaultRobotImage(image, null, new Point(x, y));
    }
}
