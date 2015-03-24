package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides an implementation of an if function. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * <li>Boolean</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class IfFunction<T> implements TernaryFunction<T>
{
    /** Delegate. */
    private final Function<T> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param child0 Child node.
     * @param child1 Child node.
     * @param child2 Child node.
     */
    public IfFunction(final Converter<T> converter, final TreeNode<T> child0, final TreeNode<T> child1,
            final TreeNode<T> child2)
    {
        final List<TreeNode<T>> children = new ArrayList<TreeNode<T>>(ARITY);
        children.add(child0);
        children.add(child1);
        children.add(child2);

        delegate = new DefaultFunction<T>(converter, "if", ARITY, children);

        final int size = getArity();

        for (int i = 0; i < size; i++)
        {
            final TreeNode<T> child = getChildAt(i);
            child.setParent(this);
        }
    }

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param children Child nodes.
     */
    private IfFunction(final Converter<T> converter, final List<TreeNode<T>> children)
    {
        delegate = new DefaultFunction<T>(converter, "if", ARITY, children);

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
            final IfFunction<T> another = (IfFunction<T>)object;

            answer = delegate.equals(another.delegate);
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        T answer = null;

        final T eval0 = getChild0().evaluate(context);
        final boolean isCondition = getConverter().toBoolean(eval0);

        if (isCondition)
        {
            answer = getChild1().evaluate(context);
        }
        else
        {
            answer = getChild2().evaluate(context);
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
    public TreeNode<T> getChild0()
    {
        return getChildAt(0);
    }

    @Override
    public TreeNode<T> getChild1()
    {
        return getChildAt(1);
    }

    @Override
    public TreeNode<T> getChild2()
    {
        return getChildAt(2);
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
    public IfFunction<T> withChildren(final List<TreeNode<T>> children)
    {
        return new IfFunction<T>(getConverter(), children);
    }

    @Override
    public IfFunction<T> withChildren(final TreeNode<T> child0, final TreeNode<T> child1, final TreeNode<T> child2)
    {
        return new IfFunction<T>(getConverter(), child0, child1, child2);
    }
}
