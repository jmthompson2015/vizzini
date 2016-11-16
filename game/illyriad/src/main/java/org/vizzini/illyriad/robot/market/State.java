package org.vizzini.illyriad.robot.market;

import java.util.List;

import org.vizzini.ai.robot.RobotImage;

/**
 * Provides a state.
 */
public final class State
{
    /** Image index. */
    private final int index;

    /** Resource item images. */
    private final List<RobotImage> images;

    /** Tree node. */
    private final TreeNode treeNode;

    /**
     * Construct this object.
     * 
     * @param treeNode Resource tree node.
     * @param images Resource item images.
     * @param index Image index.
     */
    @SuppressWarnings("hiding")
    public State(final TreeNode treeNode, final List<RobotImage> images, final int index)
    {
        if (treeNode == null)
        {
            throw new IllegalArgumentException("treeNode is null");
        }

        if (images == null)
        {
            throw new IllegalArgumentException("images is null");
        }

        if ((index < 0) || (images.size() <= index))
        {
            throw new IllegalArgumentException("index out of bounds [0, " + images.size() + "): " + index);
        }

        this.treeNode = treeNode;
        this.images = images;
        this.index = index;
    }

    /**
     * @return the current resource image.
     */
    public RobotImage getImage()
    {
        return images.get(index);
    }

    /**
     * @return the images
     */
    public List<RobotImage> getImages()
    {
        return images;
    }

    /**
     * @return the index
     */
    public int getIndex()
    {
        return index;
    }

    /**
     * @return the treeNode
     */
    public TreeNode getTreeNode()
    {
        return treeNode;
    }

    /**
     * @return the y
     */
    public int getY()
    {
        return getImage().getAbsoluteOrigin().y;
    }
}
