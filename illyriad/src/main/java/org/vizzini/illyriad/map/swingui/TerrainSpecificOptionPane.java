package org.vizzini.illyriad.map.swingui;

import java.awt.Component;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JPanel;

import org.vizzini.illyriad.map.TerrainSpecific;

/**
 * Provides an option pane for the selection of specific terrain.
 */
public final class TerrainSpecificOptionPane extends AbstractSelectionOptionPane<TerrainSpecific>
{
    /** Settleable widget. */
    private JButton settleableUI;

    /**
     * Construct this object.
     * 
     * @param parentComponent The parent component.
     * @param columnCount Column count.
     */
    public TerrainSpecificOptionPane(final Component parentComponent, final int columnCount)
    {
        super(parentComponent, "Select Specific Terrains", columnCount);

        settleableUI.doClick();
    }

    @Override
    protected JPanel createButtonPanel()
    {
        final JPanel answer = super.createButtonPanel();

        settleableUI = createSelectSettleableButton();
        answer.add(settleableUI);

        return answer;
    }

    @Override
    protected Comparator<TerrainSpecific> createComparator()
    {
        return new Comparator<TerrainSpecific>()
        {
            @Override
            public int compare(final TerrainSpecific terrain1, final TerrainSpecific terrain2)
            {
                return terrain1.getDisplayName().compareTo(terrain2.getDisplayName());
            }
        };
    }

    @Override
    protected void fillSelectionPanel()
    {
        final List<TerrainSpecific> terrains = Arrays.asList(TerrainSpecific.values());
        Collections.sort(terrains, createComparator());

        for (final TerrainSpecific terrain : terrains)
        {
            final JCheckBox checkBox = new JCheckBox(terrain.getDisplayName());
            checkBox.putClientProperty(CLIENT_PROPERTY, terrain);
            selectionUI.add(checkBox);
        }
    }

    /**
     * @return a new button.
     */
    private JButton createSelectSettleableButton()
    {
        final JButton answer = new JButton("Select Settleable");

        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                for (final Component component : selectionUI.getComponents())
                {
                    if (component instanceof JCheckBox)
                    {
                        final JCheckBox checkBox = (JCheckBox)component;
                        final TerrainSpecific subject = (TerrainSpecific)checkBox.getClientProperty(CLIENT_PROPERTY);

                        if (subject.isSettleable())
                        {
                            checkBox.setSelected(true);
                        }
                    }
                }
            }
        });

        return answer;
    }
}
