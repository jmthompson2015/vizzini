package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides a terminal with a constant value. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * <li>Boolean</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class ConstantTerminal<T> implements Terminal<T>
{
    /** Delegate. */
    private final TreeNode<T> delegate;

    /** Value. */
    private final T value;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param value Value.
     */
    @SuppressWarnings("hiding")
    public ConstantTerminal(final Converter<T> converter, final T value)
    {
        if (value == null)
        {
            throw new IllegalArgumentException("value is null");
        }

        final String symbol = String.valueOf(value);

        this.delegate = new DefaultTerminal<T>(converter, symbol);
        this.value = value;
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
        return new ConstantTerminal<T>(getConverter(), getValue());
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
            final ConstantTerminal<T> another = (ConstantTerminal<T>)object;

            answer = value.equals(another.value);
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        return value;
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

    /**
     * @return value
     */
    public T getValue()
    {
        return value;
    }

    @Override
    public int hashCode()
    {
        return value.hashCode();
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
        builder.append("value", getValue());

        return builder.toString();
    }
}
