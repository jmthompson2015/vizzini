package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import org.vizzini.starfightersquadrons.DamageCard.Trait;

/**
 * Provides a damage card list for Starfighter Squadrons.
 */
public final class DamageCardList implements List<DamageCard>
{
    /** Damages. */
    private final List<DamageCard> damages = new ArrayList<DamageCard>();

    @Override
    public boolean add(final DamageCard e)
    {
        return damages.add(e);
    }

    @Override
    public void add(final int index, final DamageCard element)
    {
        damages.add(index, element);
    }

    @Override
    public boolean addAll(final Collection<? extends DamageCard> c)
    {
        return damages.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends DamageCard> c)
    {
        return damages.addAll(index, c);
    }

    @Override
    public void clear()
    {
        damages.clear();
    }

    @Override
    public boolean contains(final Object o)
    {
        return damages.contains(o);
    }

    @Override
    public boolean containsAll(final Collection<?> c)
    {
        return damages.containsAll(c);
    }

    @Override
    public boolean equals(final Object o)
    {
        return damages.equals(o);
    }

    @Override
    public DamageCard get(final int index)
    {
        return damages.get(index);
    }

    @Override
    public int hashCode()
    {
        return damages.hashCode();
    }

    @Override
    public int indexOf(final Object o)
    {
        return damages.indexOf(o);
    }

    @Override
    public boolean isEmpty()
    {
        return damages.isEmpty();
    }

    @Override
    public Iterator<DamageCard> iterator()
    {
        return damages.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return damages.lastIndexOf(o);
    }

    @Override
    public ListIterator<DamageCard> listIterator()
    {
        return damages.listIterator();
    }

    @Override
    public ListIterator<DamageCard> listIterator(final int index)
    {
        return damages.listIterator(index);
    }

    @Override
    public DamageCard remove(final int index)
    {
        return damages.remove(index);
    }

    @Override
    public boolean remove(final Object o)
    {
        return damages.remove(o);
    }

    @Override
    public boolean removeAll(final Collection<?> c)
    {
        return damages.removeAll(c);
    }

    @Override
    public boolean retainAll(final Collection<?> c)
    {
        return damages.retainAll(c);
    }

    @Override
    public DamageCard set(final int index, final DamageCard element)
    {
        return damages.set(index, element);
    }

    @Override
    public int size()
    {
        return damages.size();
    }

    @Override
    public List<DamageCard> subList(final int fromIndex, final int toIndex)
    {
        return damages.subList(fromIndex, toIndex);
    }

    @Override
    public Object[] toArray()
    {
        return damages.toArray();
    }

    @Override
    public <T> T[] toArray(final T[] a)
    {
        return damages.toArray(a);
    }

    /**
     * @param trait Trait.
     *
     * @return damage cards with the given trait.
     */
    public DamageCardList valuesByTrait(final Trait trait)
    {
        final DamageCardList answer = new DamageCardList();

        for (final DamageCard damage : damages)
        {
            if (damage.getTrait() == trait)
            {
                answer.add(damage);
            }
        }

        return answer;
    }
}
