package org.vizzini.ai.geneticalgorithm.geneticprogramming.problem.artificialant;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Context;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Converter;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.DefaultTerminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.Terminal;
import org.vizzini.ai.geneticalgorithm.geneticprogramming.TreeNode;
import org.vizzini.core.Visitor;

/**
 * Provides a terminal which turns left.
 */
public final class LeftTerminal implements Terminal<Integer>
{
    /** Delegate. */
    private final TreeNode<Integer> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     */
    public LeftTerminal(final Converter<Integer> converter)
    {
        this.delegate = new DefaultTerminal<Integer>(converter, "left");
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
        return new LeftTerminal(getConverter());
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = true;

        if (object == this)
        {
            answer = true;
        }
        else if (object == null)
        {
            answer = false;
        }
        else if (getClass() != object.getClass())
        {
            answer = false;
        }

        return answer;
    }

    @Override
    public Integer evaluate(final Context context)
    {
        // A side effect turns the ant.
        final AntContext antContext = (AntContext)context;
        final Direction direction = antContext.getDirection();

        antContext.setDirection(direction.left());
        antContext.incrementTime();

        return 1;
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
    public int hashCode()
    {
        return 7;
    }

    @Override
    public void setParent(final TreeNode<Integer> parent)
    {
        delegate.setParent(parent);
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("returnType", getReturnType().getSimpleName());
        builder.append("parent", (getParent() == null ? null : getParent().getClass().getSimpleName()));

        return builder.toString();
    }
}
