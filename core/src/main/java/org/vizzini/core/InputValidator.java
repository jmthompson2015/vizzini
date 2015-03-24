package org.vizzini.core;

import java.util.Collection;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.ArrayUtils;
import org.apache.commons.lang3.StringUtils;

/**
 * Provides methods for input validation.
 */
public final class InputValidator
{
    /**
     * @param objectName Object name.
     * @param object Object.
     */
    public static void validateNotEmpty(final String objectName, final Collection<?> object)
    {
        if (CollectionUtils.isEmpty(object))
        {
            throw new IllegalArgumentException(objectName + " is null or empty.");
        }
    }

    /**
     * @param objectName Object name.
     * @param object Object.
     */
    public static void validateNotEmpty(final String objectName, final Map<?, ?> object)
    {
        if (MapUtils.isEmpty(object))
        {
            throw new IllegalArgumentException(objectName + " is null or empty.");
        }
    }

    /**
     * @param objectName Object name.
     * @param object Object.
     */
    public static void validateNotEmpty(final String objectName, final Object[] object)
    {
        if (ArrayUtils.isEmpty(object))
        {
            throw new IllegalArgumentException(objectName + " is null or empty.");
        }
    }

    /**
     * @param objectName Object name.
     * @param object Object.
     */
    public static void validateNotEmpty(final String objectName, final String object)
    {
        if (StringUtils.isEmpty(object))
        {
            throw new IllegalArgumentException(objectName + " is null or empty.");
        }
    }

    /**
     * @param objectName Object name.
     * @param object Object.
     */
    public static void validateNotNegative(final String objectName, final int object)
    {
        if (object < 0)
        {
            throw new IllegalArgumentException(objectName + " is less than zero.");
        }
    }

    /**
     * @param objectName Object name.
     * @param object Object.
     */
    public static void validateNotNull(final String objectName, final Object object)
    {
        if (object == null)
        {
            throw new IllegalArgumentException(objectName + " is null.");
        }
    }

    /**
     * @param objectName Object name.
     * @param object Object.
     */
    public static void validatePositive(final String objectName, final int object)
    {
        if (object <= 0)
        {
            throw new IllegalArgumentException(objectName + " is zero or less.");
        }
    }
}
