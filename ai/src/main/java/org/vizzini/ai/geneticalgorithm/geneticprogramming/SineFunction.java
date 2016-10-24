package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.Collections;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides an implementation of a sine function. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class SineFunction<T> implements UnaryFunction<T>
{
    /** Delegate. */
    private final Function<T> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param child Child node.
     */
    public SineFunction(final Converter<T> converter, final TreeNode<T> child)
    {
        this(converter, Collections.singletonList(child));
    }

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param children Child nodes.
     */
    private SineFunction(final Converter<T> converter, final List<TreeNode<T>> children)
    {
        delegate = new DefaultFunction<T>(converter, "sin", ARITY, children);

        final int size = getArity();

        for (int i = 0; i < size; i++)
        {
            final TreeNode<T> child = getChildAt(i);
            child.setParent(this);
        }
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
        return withChild(getChild().copy());
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
            final SineFunction<T> another = (SineFunction<T>)object;

            answer = delegate.equals(another.delegate);
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        T answer = null;

        final TreeNode<T> child = getChild();
        final T eval = child.evaluate(context);

        final Class<?> returnType = getReturnType();
        final Converter<T> converter = getConverter();

        if (returnType == Double.class)
        {
            final double value = converter.toDouble(eval);
            answer = converter.toT(Math.sin(value));
        }
        else if (returnType == Integer.class)
        {
            final int value = converter.toInteger(eval);
            answer = converter.toT(Math.sin(value));
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        if (answer == null)
        {
            answer = converter.getDefaultValue();
        }

        return answer;
    }

    @Override
    public int getArity()
    {
        return delegate.getArity();
    }

    @Override
    public TreeNode<T> getChild()
    {
        return getChildAt(0);
    }

    @Override
    public TreeNode<T> getChildAt(final int index)
    {
        return delegate.getChildAt(index);
    }

    @Override
    public List<TreeNode<T>> getChildren()
    {
        return delegate.getChildren();
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
    public int hashCode()
    {
        return delegate.hashCode();
    }

    @Override
    public int indexOf(final TreeNode<T> child)
    {
        return delegate.indexOf(child);
    }

    @Override
    public void setParent(final TreeNode<T> parent)
    {
        delegate.setParent(parent);
    }

    @Override
    public String toString()
    {
        final List<TreeNode<T>> children = getChildren();

        final ToStringBuilder builder = new ToStringBuilder(this, ToStringStyle.SHORT_PREFIX_STYLE);

        builder.append("returnType", getReturnType().getSimpleName());
        builder.append("parent", (getParent() == null ? null : getParent().getClass().getSimpleName()));
        builder.append("symbol", getSymbol());
        builder.append("children", children);

        return builder.toString();
    }

    @Override
    public SineFunction<T> withChild(final TreeNode<T> child)
    {
        return new SineFunction<T>(getConverter(), child);
    }

    @Override
    public SineFunction<T> withChildren(final List<TreeNode<T>> children)
    {
        return new SineFunction<T>(getConverter(), children);
    }
}
