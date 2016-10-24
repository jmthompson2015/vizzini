package org.vizzini.ai.geneticalgorithm.geneticprogramming;

/**
 * Provides utilities for number conversion. This class supports the following types.
 * <ol>
 * <li>Boolean</li>
 * <li>Double</li>
 * <li>Integer</li>
 * <li>String</li>
 * </ol>
 * 
 * @param <T> Type.
 */
public final class Converter<T>
{
    /**
     * @param returnTypeName Return type name.
     * 
     * @return a new converter.
     */
    public static <T> Converter<T> create(final String returnTypeName)
    {
        Converter<T> answer;

        if ("java.lang.Boolean".equals(returnTypeName))
        {
            @SuppressWarnings("unchecked")
            final Converter<T> converter = (Converter<T>)new Converter<Boolean>(Boolean.class);
            answer = converter;
        }
        else if ("java.lang.Double".equals(returnTypeName))
        {
            @SuppressWarnings("unchecked")
            final Converter<T> converter = (Converter<T>)new Converter<Double>(Double.class);
            answer = converter;
        }
        else if ("java.lang.Integer".equals(returnTypeName))
        {
            @SuppressWarnings("unchecked")
            final Converter<T> converter = (Converter<T>)new Converter<Integer>(Integer.class);
            answer = converter;
        }
        else if ("java.lang.String".equals(returnTypeName))
        {
            @SuppressWarnings("unchecked")
            final Converter<T> converter = (Converter<T>)new Converter<String>(String.class);
            answer = converter;
        }
        else
        {
            throw new RuntimeException("Unknown return type " + returnTypeName);
        }

        return answer;
    }

    /** Return type. */
    private final Class<T> returnType;

    /**
     * Construct this object.
     * 
     * @param returnType Return type.
     */
    @SuppressWarnings("hiding")
    public Converter(final Class<T> returnType)
    {
        if (returnType == null)
        {
            throw new IllegalArgumentException("returnType is null");
        }

        this.returnType = returnType;
    }

    /**
     * @param value0 Value.
     * @param value1 Value.
     * 
     * @return the sum of the values.
     */
    public T add(final T value0, final T value1)
    {
        final TreeNode<T> child0 = new ConstantTerminal<T>(this, value0);
        final TreeNode<T> child1 = new ConstantTerminal<T>(this, value1);
        final Function<T> function = new AddFunction<T>(this, child0, child1);
        final Context context = new DefaultContext();

        return function.evaluate(context);
    }

    /**
     * @return the defaultValue.
     */
    public T getDefaultValue()
    {
        T answer = null;

        if (returnType == Boolean.class)
        {
            answer = toT(false);
        }
        else if (returnType == Double.class)
        {
            answer = toT(0.0);
        }
        else if (returnType == Integer.class)
        {
            answer = toT(0);
        }
        else if (returnType == String.class)
        {
            answer = toT("");
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @return the returnType
     */
    public Class<T> getReturnType()
    {
        return returnType;
    }

    /**
     * @param value Value.
     * 
     * @return an incremented value.
     */
    public T increment(final T value)
    {
        return add(value, toT(1));
    }

    /**
     * @param value Input value.
     * 
     * @return the given parameter as a double.
     */
    public boolean toBoolean(final T value)
    {
        boolean answer;

        if (returnType == Boolean.class)
        {
            answer = ((Boolean)value).booleanValue();
        }
        else if (returnType == Double.class)
        {
            answer = ((Double)value).doubleValue() >= 0.0;
        }
        else if (returnType == Integer.class)
        {
            answer = ((Integer)value).intValue() >= 0;
        }
        else if (returnType == String.class)
        {
            answer = "true".equals(value);
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @param value Input value.
     * 
     * @return the given parameter as a double.
     */
    public double toDouble(final T value)
    {
        double answer;

        if (returnType == Boolean.class)
        {
            answer = ((Boolean)value ? 1.0 : -1.0);
        }
        else if (returnType == Double.class)
        {
            answer = (Double)value;
        }
        else if (returnType == Integer.class)
        {
            answer = ((Integer)value).doubleValue();
        }
        else if (returnType == String.class)
        {
            answer = Double.parseDouble((String)value);
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @param value Input value.
     * 
     * @return the given parameter as an integer.
     */
    public int toInteger(final T value)
    {
        int answer;

        if (returnType == Boolean.class)
        {
            answer = ((Boolean)value ? 1 : -1);
        }
        else if (returnType == Double.class)
        {
            answer = ((Double)value).intValue();
        }
        else if (returnType == Integer.class)
        {
            answer = (Integer)value;
        }
        else if (returnType == String.class)
        {
            answer = Integer.parseInt((String)value);
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @param value Input value.
     * 
     * @return the given parameter as a string.
     */
    public String toString(final T value)
    {
        String answer;

        if (returnType == Boolean.class)
        {
            answer = ((Boolean)value).toString();
        }
        else if (returnType == Double.class)
        {
            answer = ((Double)value).toString();
        }
        else if (returnType == Integer.class)
        {
            answer = ((Integer)value).toString();
        }
        else if (returnType == String.class)
        {
            answer = (String)value;
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @param input Input value.
     * 
     * @return the given parameter as a boolean.
     */
    public T toT(final boolean input)
    {
        T answer;

        if (returnType == Boolean.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)(Boolean)input;
            answer = value;
        }
        else if (returnType == Double.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)(Double)(input ? 1.0 : -1.0);
            answer = value;
        }
        else if (returnType == Integer.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)(Integer)(input ? 1 : -1);
            answer = value;
        }
        else if (returnType == String.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Boolean.valueOf(input).toString();
            answer = value;
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @param input Input value.
     * 
     * @return the given parameter as a double.
     */
    public T toT(final double input)
    {
        T answer;

        if (returnType == Boolean.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Boolean.valueOf(input >= 0.0);
            answer = value;
        }
        else if (returnType == Double.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)(Double)input;
            answer = value;
        }
        else if (returnType == Integer.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)(Integer)((Double)input).intValue();
            answer = value;
        }
        else if (returnType == String.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Double.valueOf(input).toString();
            answer = value;
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @param input Input value.
     * 
     * @return the given parameter as a double.
     */
    public T toT(final int input)
    {
        T answer;

        if (returnType == Boolean.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Boolean.valueOf(input >= 0);
            answer = value;
        }
        else if (returnType == Double.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)(Double)((Integer)input).doubleValue();
            answer = value;
        }
        else if (returnType == Integer.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)(Integer)input;
            answer = value;
        }
        else if (returnType == String.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Integer.valueOf(input).toString();
            answer = value;
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }

    /**
     * @param input Input value.
     * 
     * @return the given parameter as a boolean.
     */
    public T toT(final String input)
    {
        T answer;

        if (returnType == Boolean.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Boolean.valueOf(input);
            answer = value;
        }
        else if (returnType == Double.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Double.valueOf(input);
            answer = value;
        }
        else if (returnType == Integer.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)Integer.valueOf(input);
            answer = value;
        }
        else if (returnType == String.class)
        {
            @SuppressWarnings("unchecked")
            final T value = (T)input;
            answer = value;
        }
        else
        {
            throw new RuntimeException("Unsupported type: " + returnType.getName());
        }

        return answer;
    }
}
