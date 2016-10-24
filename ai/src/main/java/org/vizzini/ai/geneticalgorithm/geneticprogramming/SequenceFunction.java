package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides an implementation of a sequence function. This function supports the following types.
 * <ol>
 * <li>Boolean</li>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class SequenceFunction<T> implements Function<T>
{
    /** Delegate. */
    private final Function<T> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param children Child nodes.
     */
    public SequenceFunction(final Converter<T> converter, final List<TreeNode<T>> children)
    {
        if (CollectionUtils.isEmpty(children))
        {
            throw new IllegalArgumentException("children is null or empty");
        }

        final int arity = children.size();

        delegate = new DefaultFunction<T>(converter, "seq", arity, children);

        for (int i = 0; i < arity; i++)
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
        final int size = getArity();

        final List<TreeNode<T>> newChildren = new ArrayList<TreeNode<T>>(size);

        for (int i = 0; i < size; i++)
        {
            final TreeNode<T> child = getChildAt(i);
            newChildren.add(child.copy());
        }

        return withChildren(newChildren);
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
            final SequenceFunction<T> another = (SequenceFunction<T>)object;

            answer = delegate.equals(another.delegate);
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        T answer = null;

        final int arity = getArity();

        for (int i = 0; i < arity; i++)
        {
            final TreeNode<T> child = getChildAt(i);
            answer = child.evaluate(context);
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
        return delegate.getSymbol() + getArity();
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
    public Function<T> withChildren(final List<TreeNode<T>> children)
    {
        return new SequenceFunction<T>(getConverter(), children);
    }
}
