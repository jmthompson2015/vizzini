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
 * Provides a terminal which moves forward.
 */
public final class MoveTerminal implements Terminal<Integer>
{
    /** Delegate. */
    private final TreeNode<Integer> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     */
    public MoveTerminal(final Converter<Integer> converter)
    {
        this.delegate = new DefaultTerminal<Integer>(converter, "move");
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
        return new MoveTerminal(getConverter());
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
        // A side effect moves the ant.
        final AntContext antContext = (AntContext)context;
        final Direction direction = antContext.getDirection();

        antContext.setX(antContext.getX() + direction.getDx());
        antContext.setY(antContext.getY() + direction.getDy());

        final SantaFeTrail environment = antContext.getEnvironment();
        environment.placeAnt(antContext.getX(), antContext.getY());

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
        return 5;
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
