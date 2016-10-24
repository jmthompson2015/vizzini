package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides a default implementation of a tree node. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * <li>Boolean</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class DefaultTreeNode<T> implements TreeNode<T>
{
    /** Converter. */
    private final Converter<T> converter;

    /** Parent. */
    private TreeNode<T> parent;

    /** Symbol. */
    private final String symbol;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param symbol Symbol.
     */
    @SuppressWarnings("hiding")
    public DefaultTreeNode(final Converter<T> converter, final String symbol)
    {
        if (converter == null)
        {
            throw new IllegalArgumentException("converter is null");
        }

        if (StringUtils.isEmpty(symbol))
        {
            throw new IllegalArgumentException("symbol is null or empty");
        }

        this.converter = converter;
        this.symbol = symbol;
    }

    @Override
    public void accept(final Visitor<TreeNode<T>> visitor)
    {
        if (visitor == null)
        {
            throw new IllegalArgumentException("visitor is null");
        }

        visitor.visit(this);
    }

    @Override
    public TreeNode<T> copy()
    {
        return new DefaultTreeNode<T>(getConverter(), getSymbol());
    }

    @Override
    public boolean equals(final Object object)
    {
        boolean answer = false;

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
        else
        {
            @SuppressWarnings("unchecked")
            final DefaultTreeNode<T> another = (DefaultTreeNode<T>)object;

            answer = symbol.equals(another.symbol);
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public Converter<T> getConverter()
    {
        return converter;
    }

    @Override
    public TreeNode<T> getParent()
    {
        return parent;
    }

    @Override
    public Class<T> getReturnType()
    {
        return converter.getReturnType();
    }

    @Override
    public String getSymbol()
    {
        return symbol;
    }

    @Override
    public int hashCode()
    {
        return symbol.hashCode();
    }

    @Override
    @SuppressWarnings("hiding")
    public void setParent(final TreeNode<T> parent)
    {
        this.parent = parent;
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
