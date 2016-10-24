package org.vizzini.core.crafting;

import java.util.List;

import org.vizzini.core.NamedObject;
import org.vizzini.core.Visitable;

/**
 * Defines methods required by a named object collection. This assumes the names are unique.
 * 
 * @param <E> Element type.
 */
public interface NamedObjectCollection<E extends NamedObject> extends List<E>, Visitable<E>
{
    /**
     * @param name Name.
     * 
     * @return the element with the given name.
     */
    E findByName(final String name);
}
