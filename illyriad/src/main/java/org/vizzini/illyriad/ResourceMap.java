package org.vizzini.illyriad;

import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;

/**
 * Provides a map of resource to amount.
 */
public final class ResourceMap
{
    /** Map of resource to amount. */
    private final Map<ResourceIngredient, Integer> map = new LinkedHashMap<ResourceIngredient, Integer>();

    /**
     * @return a new copy of this.
     */
    public ResourceMap copy()
    {
        final ResourceMap answer = new ResourceMap();

        for (final Entry<ResourceIngredient, Integer> resourceEntry : entrySet())
        {
            answer.put(resourceEntry.getKey(), resourceEntry.getValue());
        }

        return answer;
    }

    /**
     * @return entry set.
     * @see java.util.Map#entrySet()
     */
    public Set<Entry<ResourceIngredient, Integer>> entrySet()
    {
        return map.entrySet();
    }

    /**
     * @param key Key.
     * @return value for the given key.
     * @see java.util.Map#get(java.lang.Object)
     */
    public Integer get(final ResourceIngredient key)
    {
        return map.get(key);
    }

    /**
     * @param key Key.
     * @param value Value.
     * @return value.
     * @see java.util.Map#put(java.lang.Object, java.lang.Object)
     */
    public Integer put(final ResourceIngredient key, final Integer value)
    {
        return map.put(key, value);
    }

    /**
     * @return size.
     * @see java.util.Map#size()
     */
    public int size()
    {
        return map.size();
    }

    @Override
    public String toString()
    {
        final StringBuilder sb = new StringBuilder();

        sb.append(map);

        return sb.toString();
    }
}
