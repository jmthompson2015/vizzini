package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides a default implementation of a terminal. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * <li>Boolean</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class DefaultTerminal<T> implements Terminal<T>
{
    /** Delegate. */
    private final TreeNode<T> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param symbol Symbol.
     */
    public DefaultTerminal(final Converter<T> converter, final String symbol)
    {
        this.delegate = new DefaultTreeNode<T>(converter, symbol);
    }

    @Override
    public void accept(final Visitor<TreeNode<T>> visitor)
    {
        delegate.accept(visitor);
    }

    @Override
    public TreeNode<T> copy()
    {
        return delegate.copy();
    }

    @Override
    public T evaluate(final Context context)
    {
        return delegate.evaluate(context);
    }

    @Override
    public Converter<T> getConverter()
    {
        return delegate.getConverter();
    }

    @Override
    public TreeNode<T> getParent()
    {
        return delegate.getParent();
    }

    @Override
    public Class<T> getReturnType()
    {
        return delegate.getReturnType();
    }

    @Override
    public String getSymbol()
    {
        return delegate.getSymbol();
    }

    @Override
    public void setParent(final TreeNode<T> parent)
    {
        delegate.setParent(parent);
    }

    @Override
    public String toString()
    {
        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("returnType", getReturnType().getSimpleName());
        builder.append("parent", (getParent() == null ? null : getParent().getClass().getSimpleName()));
        builder.append("symbol", getSymbol());

        return builder.toString();
    }
}
