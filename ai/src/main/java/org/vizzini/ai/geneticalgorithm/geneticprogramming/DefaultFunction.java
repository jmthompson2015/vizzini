package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides a default implementation of a function. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * <li>Boolean</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class DefaultFunction<T> implements Function<T>
{
    /** Arity (child count). */
    private final int arity;

    /** Child nodes. */
    private final List<TreeNode<T>> children;

    /** Delegate. */
    private final TreeNode<T> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param symbol Symbol.
     * @param arity Maximum child count.
     * @param children Child nodes.
     */
    @SuppressWarnings("hiding")
    public DefaultFunction(final Converter<T> converter, final String symbol, final int arity,
            final List<TreeNode<T>> children)
    {
        if (children == null)
        {
            throw new IllegalArgumentException("children is null");
        }

        if (children.size() != arity)
        {
            throw new IllegalArgumentException("Should be " + arity + " children; have " + children.size());
        }

        this.delegate = new DefaultTreeNode<T>(converter, symbol);
        this.arity = arity;
        this.children = new ArrayList<TreeNode<T>>(arity);

        for (int i = 0; i < arity; i++)
        {
            final TreeNode<T> child = children.get(i);

            if (child == null)
            {
                throw new IllegalArgumentException("child" + i + " is null");
            }

            this.children.add(child);
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
        final List<TreeNode<T>> newChildren = new ArrayList<TreeNode<T>>(children.size());

        for (final TreeNode<T> child : children)
        {
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
            final DefaultFunction<T> another = (DefaultFunction<T>)object;

            answer = (arity == another.arity);

            if (answer)
            {
                answer = children.equals(another.children);
            }
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        return null;
    }

    @Override
    public int getArity()
    {
        return arity;
    }

    @Override
    public TreeNode<T> getChildAt(final int index)
    {
        return children.get(index);
    }

    @Override
    public List<TreeNode<T>> getChildren()
    {
        final List<TreeNode<T>> answer = new ArrayList<TreeNode<T>>();

        final int size = getArity();

        for (int i = 0; i < size; i++)
        {
            answer.add(getChildAt(i));
        }

        return answer;
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
        int answer = 0;

        final int[] primes = { 2, 3, 5, 7, };
        int i = 0;

        answer += primes[i++] * arity;
        answer += primes[i++] * children.hashCode();

        return answer;
    }

    @Override
    public int indexOf(final TreeNode<T> child)
    {
        return children.indexOf(child);
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
        builder.append("children", children);

        return builder.toString();
    }

    @Override
    @SuppressWarnings("hiding")
    public DefaultFunction<T> withChildren(final List<TreeNode<T>> children)
    {
        return new DefaultFunction<T>(getConverter(), getSymbol(), getArity(), children);
    }
}
