package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides an implementation of a divide function. This function supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class DivideFunction<T> implements BinaryFunction<T>
{
    /** Delegate. */
    private final Function<T> delegate;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param child0 Child node.
     * @param child1 Child node.
     */
    public DivideFunction(final Converter<T> converter, final TreeNode<T> child0, final TreeNode<T> child1)
    {
        final List<TreeNode<T>> children = new ArrayList<TreeNode<T>>(ARITY);
        children.add(child0);
        children.add(child1);

        delegate = new DefaultFunction<T>(converter, "/", ARITY, children);

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
    private DivideFunction(final Converter<T> converter, final List<TreeNode<T>> children)
    {
        delegate = new DefaultFunction<T>(converter, "/", ARITY, children);

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
            final DivideFunction<T> another = (DivideFunction<T>)object;

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

        final Class<T> returnType = getReturnType();
        final Converter<T> converter = getConverter();

        if (returnType == Double.class)
        {
            final double numerator = converter.toDouble(eval0);
            final double denominator = converter.toDouble(eval1);

            if (denominator == 0.0)
            {
                // Protected division function.
                answer = converter.toT(1.0);
            }
            else
            {
                final double result = numerator / denominator;
                answer = converter.toT(result);
            }
        }
        else if (returnType == Integer.class)
        {
            final int numerator = converter.toInteger(eval0);
            final int denominator = converter.toInteger(eval1);

            // Protected division function.
            if (denominator == 0)
            {
                answer = converter.toT(1);
            }
            else
            {
                final int result = numerator / denominator;
                answer = converter.toT(result);
            }
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
    public DivideFunction<T> withChildren(final List<TreeNode<T>> children)
    {
        return new DivideFunction<T>(getConverter(), children);
    }

    @Override
    public DivideFunction<T> withChildren(final TreeNode<T> child0, final TreeNode<T> child1)
    {
        return new DivideFunction<T>(getConverter(), child0, child1);
    }
}
