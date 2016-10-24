package org.vizzini.illyriad.map.swingui;

import java.awt.Component;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.swing.JCheckBox;

import org.vizzini.illyriad.map.TerrainCombat;

/**
 * Provides an option pane for the selection of combat terrain.
 */
public final class TerrainCombatOptionPane extends AbstractSelectionOptionPane<TerrainCombat>
{
    /**
     * Construct this object.
     * 
     * @param parentComponent The parent component.
     * @param columnCount Column count.
     */
    public TerrainCombatOptionPane(final Component parentComponent, final int columnCount)
    {
        super(parentComponent, "Select Combat Terrains", columnCount);
    }

    @Override
    protected Comparator<TerrainCombat> createComparator()
    {
        return new Comparator<TerrainCombat>()
        {
            @Override
            public int compare(final TerrainCombat terrain1, final TerrainCombat terrain2)
            {
                return terrain1.getDisplayName().compareTo(terrain2.getDisplayName());
            }
        };
    }

    @Override
    protected void fillSelectionPanel()
    {
        final List<TerrainCombat> terrains = Arrays.asList(TerrainCombat.values());
        Collections.sort(terrains, createComparator());

        for (final TerrainCombat terrain : terrains)
        {
            final JCheckBox checkBox = new JCheckBox(terrain.getDisplayName());
            checkBox.putClientProperty(CLIENT_PROPERTY, terrain);
            selectionUI.add(checkBox);
        }
    }
}
