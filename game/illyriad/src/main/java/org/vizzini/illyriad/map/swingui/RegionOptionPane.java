package org.vizzini.illyriad.map.swingui;

import java.awt.Component;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.swing.JCheckBox;

import org.vizzini.illyriad.Region;

/**
 * Provides an option pane for the selection of regions.
 */
public final class RegionOptionPane extends AbstractSelectionOptionPane<Region>
{
    /**
     * Construct this object.
     * 
     * @param parentComponent The parent component.
     * @param columnCount Column count.
     */
    public RegionOptionPane(final Component parentComponent, final int columnCount)
    {
        super(parentComponent, "Select Regions", columnCount);

        // FIXME start
        findUIFor(Region.WOLGAST).setSelected(true);
        findUIFor(Region.URSOR).setSelected(true);
        findUIFor(Region.QAROSSLAN).setSelected(true);

        findUIFor(Region.WINDLOST).setSelected(true);
        findUIFor(Region.TAMARIN).setSelected(true);

        findUIFor(Region.RAGALLON).setSelected(true);
        findUIFor(Region.TAOMIST).setSelected(true);
        findUIFor(Region.LAOSHIN).setSelected(true);
        // FIXME end
    }

    @Override
    protected Comparator<Region> createComparator()
    {
        return new Comparator<Region>()
        {
            @Override
            public int compare(final Region region1, final Region region2)
            {
                return region1.getDisplayName().compareTo(region2.getDisplayName());
            }
        };
    }

    @Override
    protected void fillSelectionPanel()
    {
        final List<Region> regions = Arrays.asList(Region.values());
        Collections.sort(regions, createComparator());

        for (final Region region : regions)
        {
            final JCheckBox checkBox = new JCheckBox(region.getDisplayName());
            checkBox.putClientProperty(CLIENT_PROPERTY, region);
            selectionUI.add(checkBox);
        }
    }

    /**
     * @param region Region.
     * 
     * @return the check box representing the given parameter.
     */
    private JCheckBox findUIFor(final Region region)
    {
        JCheckBox answer = null;

        final int size = selectionUI.getComponentCount();

        for (int i = 0; (answer == null) && (i < size); i++)
        {
            final Component component = selectionUI.getComponent(i);

            if (component instanceof JCheckBox)
            {
                final JCheckBox checkBox = (JCheckBox)component;
                final Region myRegion = (Region)checkBox.getClientProperty(CLIENT_PROPERTY);

                if (region == myRegion)
                {
                    answer = checkBox;
                }
            }
        }

        return answer;
    }
}
