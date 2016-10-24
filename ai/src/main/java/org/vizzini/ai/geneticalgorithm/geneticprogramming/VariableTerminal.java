package org.vizzini.ai.geneticalgorithm.geneticprogramming;

import org.apache.commons.lang3.StringUtils;
import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.Visitor;

/**
 * Provides a terminal with a variable value. This class supports the following types.
 * <ol>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * <li>Boolean</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class VariableTerminal<T> implements Terminal<T>
{
    /** Delegate. */
    private final TreeNode<T> delegate;

    /** Variable name. */
    private final String variableName;

    /**
     * Construct this object.
     * 
     * @param converter Converter.
     * @param variableName Variable name.
     */
    @SuppressWarnings("hiding")
    public VariableTerminal(final Converter<T> converter, final String variableName)
    {
        if (StringUtils.isEmpty(variableName))
        {
            throw new IllegalArgumentException("variableName is null or empty");
        }

        delegate = new DefaultTerminal<T>(converter, variableName);
        this.variableName = variableName;
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
        return new VariableTerminal<T>(getConverter(), getVariableName());
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
            final VariableTerminal<T> another = (VariableTerminal<T>)object;

            answer = variableName.equals(another.variableName);
        }

        return answer;
    }

    @Override
    public T evaluate(final Context context)
    {
        @SuppressWarnings("unchecked")
        T answer = (T)context.getVariable(variableName);

        if (answer == null)
        {
            answer = getConverter().getDefaultValue();
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

    /**
     * @return variableName
     */
    public String getVariableName()
    {
        return variableName;
    }

    @Override
    public int hashCode()
    {
        return variableName.hashCode();
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
        builder.append("variableName", getVariableName());

        return builder.toString();
    }
}
