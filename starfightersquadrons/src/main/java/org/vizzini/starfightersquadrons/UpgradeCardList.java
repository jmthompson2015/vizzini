package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;
import java.util.Set;
import java.util.TreeSet;

import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides an upgrade card list for Starfighter Squadrons.
 */
public final class UpgradeCardList implements List<UpgradeCard>
{
    /** Upgrades. */
    private final List<UpgradeCard> upgrades = new ArrayList<UpgradeCard>();

    /**
     * Construct this object.
     */
    public UpgradeCardList()
    {
        // Nothing to do.
    }

    /**
     * Construct this object.
     *
     * @param upgrades Upgrades.
     */
    @SuppressWarnings("hiding")
    public UpgradeCardList(final Collection<UpgradeCard> upgrades)
    {
        this();

        this.upgrades.addAll(upgrades);
    }

    /**
     * Construct this object.
     *
     * @param upgrades Upgrades.
     */
    @SuppressWarnings("hiding")
    public UpgradeCardList(final UpgradeCard... upgrades)
    {
        this();

        for (final UpgradeCard upgrade : upgrades)
        {
            this.upgrades.add(upgrade);
        }
    }

    @Override
    public void add(final int index, final UpgradeCard element)
    {
        upgrades.add(index, element);
    }

    @Override
    public boolean add(final UpgradeCard e)
    {
        return upgrades.add(e);
    }

    @Override
    public boolean addAll(final Collection<? extends UpgradeCard> c)
    {
        return upgrades.addAll(c);
    }

    @Override
    public boolean addAll(final int index, final Collection<? extends UpgradeCard> c)
    {
        return upgrades.addAll(index, c);
    }

    @Override
    public void clear()
    {
        upgrades.clear();
    }

    @Override
    public boolean contains(final Object o)
    {
        return upgrades.contains(o);
    }

    @Override
    public boolean containsAll(final Collection<?> c)
    {
        return upgrades.containsAll(c);
    }

    @Override
    public boolean equals(final Object o)
    {
        return upgrades.equals(o);
    }

    @Override
    public UpgradeCard get(final int index)
    {
        return upgrades.get(index);
    }

    /**
     * @return a new set of secondary weapons.
     */
    public Set<Weapon> getSecondaryWeapons()
    {
        final Set<Weapon> answer = new TreeSet<Weapon>();

        for (final UpgradeCard upgrade : this)
        {
            if (upgrade instanceof Weapon)
            {
                answer.add((Weapon)upgrade);
            }
        }

        return answer;
    }

    /**
     * @return a new list of secondary weapon upgrade cards.
     */
    public UpgradeCardList getSecondaryWeaponUpgrades()
    {
        final UpgradeCardList answer = new UpgradeCardList();

        for (final UpgradeCard upgrade : this)
        {
            if (upgrade instanceof SecondaryWeaponUpgradeCard)
            {
                answer.add(upgrade);
            }
        }

        return answer;
    }

    @Override
    public int hashCode()
    {
        return upgrades.hashCode();
    }

    @Override
    public int indexOf(final Object o)
    {
        return upgrades.indexOf(o);
    }

    @Override
    public boolean isEmpty()
    {
        return upgrades.isEmpty();
    }

    @Override
    public Iterator<UpgradeCard> iterator()
    {
        return upgrades.iterator();
    }

    @Override
    public int lastIndexOf(final Object o)
    {
        return upgrades.lastIndexOf(o);
    }

    @Override
    public ListIterator<UpgradeCard> listIterator()
    {
        return upgrades.listIterator();
    }

    @Override
    public ListIterator<UpgradeCard> listIterator(final int index)
    {
        return upgrades.listIterator(index);
    }

    @Override
    public UpgradeCard remove(final int index)
    {
        return upgrades.remove(index);
    }

    @Override
    public boolean remove(final Object o)
    {
        return upgrades.remove(o);
    }

    @Override
    public boolean removeAll(final Collection<?> c)
    {
        return upgrades.removeAll(c);
    }

    @Override
    public boolean retainAll(final Collection<?> c)
    {
        return upgrades.retainAll(c);
    }

    @Override
    public UpgradeCard set(final int index, final UpgradeCard element)
    {
        return upgrades.set(index, element);
    }

    @Override
    public int size()
    {
        return upgrades.size();
    }

    @Override
    public List<UpgradeCard> subList(final int fromIndex, final int toIndex)
    {
        return upgrades.subList(fromIndex, toIndex);
    }

    @Override
    public Object[] toArray()
    {
        return upgrades.toArray();
    }

    @Override
    public <T> T[] toArray(final T[] a)
    {
        return upgrades.toArray(a);
    }

    @Override
    public String toString()
    {
        return upgrades.toString();
    }

    /**
     * @param type Type.
     *
     * @return values of the given type.
     */
    public UpgradeCardList valuesByType(final UpgradeType type)
    {
        final UpgradeCardList answer = new UpgradeCardList();

        for (final UpgradeCard upgrade : upgrades)
        {
            if (upgrade.getType() == type)
            {
                answer.add(upgrade);
            }
        }

        return answer;
    }
}
