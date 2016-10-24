package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides an implementation of a multiply function. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class MultiplyFunction<T> implements BinaryFunction<T>
{
    /**
     * @param converter Converter.
     * @param children Child nodes.
     * 
     * @return a new tree containing the given children.
     */
    public static <T> MultiplyFunction<T> createTree(final Converter<T> converter, final List<TreeNode<T>> children)
    {
        MultiplyFunction<T> answer;

        final int size = children.size();

        TreeNode<T> child0 = children.get(size - 2);
        final TreeNode<T> child1 = children.get(size - 1);
        answer = new MultiplyFunction<T>(converter, child0, child1);

        for (int i = size - 3; i >= 0; i--)
        {
            child0 = children.get(i);
            answer = new MultiplyFunction<T>(converter, child0, answer);
        }

        return answer;
    }

    /** Delegate. */
    private final Function<T> delegate;

    /**
     * Construct this object. Note: don't mix generics and varargs.
     * 
     * @param converter Converter.
     * @param child0 Child node.
     * @param child1 Child node.
     */
    public MultiplyFunction(final Converter<T> converter, final TreeNode<T> child0, final TreeNode<T> child1)
    {
        final List<TreeNode<T>> children = new ArrayList<TreeNode<T>>(ARITY);
        children.add(child0);
        children.add(child1);

        delegate = new DefaultFunction<T>(converter, "*", ARITY, children);

        for (int i = 0; i < ARITY; i++)
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
    private MultiplyFunction(final Converter<T> converter, final List<TreeNode<T>> children)
    {
        delegate = new DefaultFunction<T>(converter, "*", ARITY, children);

        for (int i = 0; i < ARITY; i++)
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
        return withChildren(getChild0().copy(), getChild1().copy());
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
            final MultiplyFunction<T> another = (MultiplyFunction<T>)object;

            answer = delegate.equals(another.delegate);
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        T answer = null;

        final TreeNode<T> child0 = getChildAt(0);
        final T eval0 = child0.evaluate(context);

        final TreeNode<T> child1 = getChildAt(1);
        final T eval1 = child1.evaluate(context);

        final Class<?> returnType = getReturnType();
        final Converter<T> converter = getConverter();

        if (returnType == Double.class)
        {
            final double value0 = converter.toDouble(eval0);
            final double value1 = converter.toDouble(eval1);
            answer = converter.toT(value0 * value1);
        }
        else if (returnType == Integer.class)
        {
            final int value0 = converter.toInteger(eval0);
            final int value1 = converter.toInteger(eval1);
            answer = converter.toT(value0 * value1);
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
    public MultiplyFunction<T> withChildren(final List<TreeNode<T>> children)
    {
        return new MultiplyFunction<T>(getConverter(), children);
    }

    @Override
    public MultiplyFunction<T> withChildren(final TreeNode<T> child0, final TreeNode<T> child1)
    {
        return new MultiplyFunction<T>(getConverter(), child0, child1);
    }
}
