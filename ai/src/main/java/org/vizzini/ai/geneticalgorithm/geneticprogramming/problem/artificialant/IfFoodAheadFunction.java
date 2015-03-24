package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.BinaryFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultFunction;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Function;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.core.Visitor;

/**
 * Provides a specialized implementation of an if function.
 */
public final class IfFoodAheadFunction implements BinaryFunction<Integer>
{
    /** Delegate. */
    private final Function<Integer> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param child0 Child node.
     * @param child1 Child node.
     */
    public IfFoodAheadFunction(final Converter<Integer> converter, final TreeNode<Integer> child0,
            final TreeNode<Integer> child1)
    {
        final List<TreeNode<Integer>> children = new ArrayList<TreeNode<Integer>>(ARITY);
        children.add(child0);
        children.add(child1);

        delegate = new DefaultFunction<Integer>(converter, "if-food-ahead", ARITY, children);

        for (int i = 0; i < ARITY; i++)
        {
            final TreeNode<Integer> child = getChildAt(i);
            child.setParent(this);
        }
    }

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param children Child nodes.
     */
    private IfFoodAheadFunction(final Converter<Integer> converter, final List<TreeNode<Integer>> children)
    {
        delegate = new DefaultFunction<Integer>(converter, "if", ARITY, children);

        for (int i = 0; i < ARITY; i++)
        {
            final TreeNode<Integer> child = getChildAt(i);
            child.setParent(this);
        }
    }

    @Override
    public void accept(final Visitor<TreeNode<Integer>> visitor)
    {
        if (visitor == null)
        {
            throw new IllegalArgumentException("visitor is null");
        }

        visitor.visit(this);
    }

    @Override
    public TreeNode<Integer> copy()
    {
        return withChildren(getChild0().copy(), getChild1().copy());
    }

    @Override
    public Integer evaluate(final Context context)
    {
        Integer answer = null;

        final AntContext antContext = (AntContext)context;
        final boolean isCondition = isFoodAhead(antContext);

        if (isCondition)
        {
            answer = getChild0().evaluate(context);
        }
        else
        {
            answer = getChild1().evaluate(context);
        }

        if (answer == null)
        {
            answer = getConverter().getDefaultValue();
        }

        return answer;
    }

    @Override
    public int getArity()
    {
        return delegate.getArity();
    }

    @Override
    public TreeNode<Integer> getChild0()
    {
        return getChildAt(0);
    }

    @Override
    public TreeNode<Integer> getChild1()
    {
        return getChildAt(1);
    }

    @Override
    public TreeNode<Integer> getChildAt(final int index)
    {
        return delegate.getChildAt(index);
    }

    @Override
    public List<TreeNode<Integer>> getChildren()
    {
        return delegate.getChildren();
    }

    @Override
    public Converter<Integer> getConverter()
    {
        return delegate.getConverter();
    }

    @Override
    public TreeNode<Integer> getParent()
    {
        return delegate.getParent();
    }

    @Override
    public Class<Integer> getReturnType()
    {
        return delegate.getReturnType();
    }

    @Override
    public String getSymbol()
    {
        return delegate.getSymbol();
    }

    @Override
    public int indexOf(final TreeNode<Integer> child)
    {
        return delegate.indexOf(child);
    }

    @Override
    public void setParent(final TreeNode<Integer> parent)
    {
        delegate.setParent(parent);
    }

    @Override
    public String toString()
    {
        final List<TreeNode<Integer>> children = getChildren();

        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("returnType", getReturnType().getSimpleName());
        builder.append("parent", (getParent() == null ? null : getParent().getClass().getSimpleName()));
        builder.append("symbol", getSymbol());
        builder.append("children", children);

        return builder.toString();
    }

    @Override
    public IfFoodAheadFunction withChildren(final List<TreeNode<Integer>> children)
    {
        return new IfFoodAheadFunction(getConverter(), children);
    }

    @Override
    public IfFoodAheadFunction withChildren(final TreeNode<Integer> child0, final TreeNode<Integer> child1)
    {
        return new IfFoodAheadFunction(getConverter(), child0, child1);
    }

    /**
     * @param context Context.
     * 
     * @return true if there is food ahead of the ant.
     */
    private boolean isFoodAhead(final AntContext context)
    {
        final Direction direction = context.getDirection();
        final SantaFeTrail environment = context.getEnvironment();

        final int newX = context.getX() + direction.getDx();
        final int newY = context.getY() + direction.getDy();

        return environment.isFood(newX, newY);
    }
}
