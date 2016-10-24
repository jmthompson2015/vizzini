package org.vizzini.illyriad.robot.market;

import org.vizzini.illyriad.ResourceProduct;

/**
 * Defines methods required by a tree node.
 */
public interface TreeNode
{
    /**
     * @param index Child index.
     * 
     * @return the child at the given index.
     */
    TreeNode getChildAt(int index);

    /**
     * @return the childCount
     */
    int getChildCount();

    /**
     * @param child Child node.
     * 
     * @return the index of <code>child</code> in the receivers children. If the receiver does not contain
     *         <code>child</code>, -1 will be returned.
     */
    int getIndex(TreeNode child);

    /**
     * @return the name
     */
    String getName();

    /**
     * @return the name modified to use as a filename
     */
    String getNameForFile();

    /**
     * @return the parent
     */
    TreeNode getParent();

    /**
     * @return the resourceProduct
     */
    ResourceProduct getProduct();

    /**
     * @return true if this is level2.
     */
    boolean isChild();

    /**
     * @return true if this is level1 and has no children.
     */
    boolean isItem();

    /**
     * @return true if this is level1 and can have children.
     */
    boolean isParent();
}
