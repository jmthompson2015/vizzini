package org.vizzini.core.crafting;

import org.vizzini.core.NamedObject;

/**
 * Defines methods required by a class to register named objects.
 * 
 * @param <E> Element type.
 */
public interface Registry<E extends NamedObject>
{
    /**
     * @return the named object collection.
     */
    NamedObjectCollection<E> getCollection();
}
