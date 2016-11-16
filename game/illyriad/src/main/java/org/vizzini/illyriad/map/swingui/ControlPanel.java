package org.vizzini.illyriad.map.swingui;

import java.awt.BorderLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Set;

import javax.swing.BorderFactory;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JSpinner;

import org.vizzini.illyriad.Region;
import org.vizzini.illyriad.map.TerrainCombat;
import org.vizzini.illyriad.map.TerrainSpecific;

/**
 * Provides a control panel for a sweetspot finder user interface.
 */
public final class ControlPanel extends JPanel
{
    /** Gap. */
    private static final int GAP = 5;

    /** Region selection option pane. */
    RegionOptionPane regionOptionPane;

    /** Terrain combat selection option pane. */
    TerrainCombatOptionPane terrainCombatOptionPane;

    /** Terrain specific selection option pane. */
    TerrainSpecificOptionPane terrainSpecificOptionPane;

    /** Check box. */
    private final JCheckBox eightFoodUI = new JCheckBox("Eight food");

    /** Check box. */
    private final JCheckBox fiveClayUI = new JCheckBox("Five clay");

    /** Check box. */
    private final JCheckBox fiveIronUI = new JCheckBox("Five iron");

    /** Check box. */
    private final JCheckBox fiveStoneUI = new JCheckBox("Five stone");

    /** Check box. */
    private final JCheckBox fiveWoodUI = new JCheckBox("Five wood");

    /** Check box. */
    private final JCheckBox highFoodCloseUI = new JCheckBox("High food close");

    /** Radius widget. */
    private final JSpinner highFoodRadiusUI = new JSpinner();

    /** Check box. */
    private final JCheckBox mineralCloseUI = new JCheckBox("Mineral close");

    /** Radius widget. */
    private final JSpinner mineralRadiusUI = new JSpinner();

    /** Radius widget. */
    private JSpinner noTownTooCloseRadiusUI;

    /** Check box. */
    private final JCheckBox noTownTooCloseUI = new JCheckBox("No town too close");

    /** Refresh button. */
    private JButton refreshUI;

    /** Region edit button. */
    private JButton regionEditUI;

    /** Check box. */
    private final JCheckBox regionUI = new JCheckBox("Selected regions");

    /** Check box. */
    private final JCheckBox sevenFoodUI = new JCheckBox("Seven food");

    /** Terrain combat edit button. */
    private JButton terrainCombatEditUI;

    /** Check box. */
    private final JCheckBox terrainCombatUI = new JCheckBox("Selected terrain (Combat)");

    /** Terrain specific edit button. */
    private JButton terrainSpecificEditUI;

    /** Check box. */
    private final JCheckBox terrainSpecificUI = new JCheckBox("Selected terrain (Specific)");

    /** Check box. */
    private final JCheckBox tradeHubCloseUI = new JCheckBox("Trade hub close");

    /** Radius widget. */
    private final JSpinner tradeHubRadiusUI = new JSpinner();

    /**
     * Construct this object.
     */
    public ControlPanel()
    {
        final JPanel panel = new JPanel(new GridLayout2(0, 1));

        panel.add(createFoodPanel());
        panel.add(createAndLabel());
        panel.add(fiveWoodUI);
        panel.add(createAndLabel());
        panel.add(fiveClayUI);
        panel.add(createAndLabel());
        panel.add(fiveIronUI);
        panel.add(createAndLabel());
        panel.add(fiveStoneUI);
        panel.add(createAndLabel());
        panel.add(createNoTownTooClosePanel());
        panel.add(createAndLabel());
        panel.add(createRegionPanel());
        panel.add(createAndLabel());
        panel.add(createTerrainCombatPanel());
        panel.add(createAndLabel());
        panel.add(createTerrainSpecificPanel());
        panel.add(createAndLabel());
        panel.add(createFeaturePanel());
        panel.add(createButtonPanel());

        setBorder(BorderFactory.createEmptyBorder(GAP, GAP, GAP, GAP));
        setLayout(new BorderLayout());
        add(panel, BorderLayout.NORTH);

        sevenFoodUI.setSelected(true);
        eightFoodUI.setSelected(true);
        fiveStoneUI.setSelected(true);
        noTownTooCloseUI.setSelected(true);
        highFoodCloseUI.setSelected(true);
        mineralCloseUI.setSelected(true);
        tradeHubCloseUI.setSelected(true);

        // FIXME start
        regionUI.setSelected(true);
        // FIXME end

        terrainSpecificUI.setSelected(true);
    }

    /**
     * @return the radius.
     */
    public int getHighFoodRadius()
    {
        return (Integer)highFoodRadiusUI.getValue();
    }

    /**
     * @return the radius.
     */
    public int getMineralRadius()
    {
        return (Integer)mineralRadiusUI.getValue();
    }

    /**
     * @return the radius.
     */
    public int getNoTownTooCloseRadius()
    {
        return (Integer)noTownTooCloseRadiusUI.getValue();
    }

    /**
     * @return regions.
     */
    public Set<Region> getRegions()
    {
        Set<Region> answer;

        if (regionOptionPane == null)
        {
            regionOptionPane = new RegionOptionPane(ControlPanel.this, 2);
        }

        answer = regionOptionPane.getSelections();

        return answer;
    }

    /**
     * @return terrain combats.
     */
    public Set<TerrainCombat> getTerrainCombats()
    {
        Set<TerrainCombat> answer;

        if (terrainCombatOptionPane == null)
        {
            terrainCombatOptionPane = new TerrainCombatOptionPane(ControlPanel.this, 1);
        }

        answer = terrainCombatOptionPane.getSelections();

        return answer;
    }

    /**
     * @return terrain specifics.
     */
    public Set<TerrainSpecific> getTerrainSpecifics()
    {
        Set<TerrainSpecific> answer;

        if (terrainSpecificOptionPane == null)
        {
            terrainSpecificOptionPane = new TerrainSpecificOptionPane(ControlPanel.this, 5);
        }

        answer = terrainSpecificOptionPane.getSelections();

        return answer;
    }

    /**
     * @return the radius.
     */
    public int getTradeHubRadius()
    {
        return (Integer)tradeHubRadiusUI.getValue();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isEightFoodSelected()
    {
        return eightFoodUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isFiveClaySelected()
    {
        return fiveClayUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isFiveIronSelected()
    {
        return fiveIronUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isFiveStoneSelected()
    {
        return fiveStoneUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isFiveWoodSelected()
    {
        return fiveWoodUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isHighFoodCloseSelected()
    {
        return highFoodCloseUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isMineralCloseSelected()
    {
        return mineralCloseUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isNoTownTooCloseSelected()
    {
        return noTownTooCloseUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isRegionSelected()
    {
        return regionUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isSevenFoodSelected()
    {
        return sevenFoodUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isTerrainCombatSelected()
    {
        return terrainCombatUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isTerrainSpecificSelected()
    {
        return terrainSpecificUI.isSelected();
    }

    /**
     * @return true if the check box is selected.
     */
    public boolean isTradeHubCloseSelected()
    {
        return tradeHubCloseUI.isSelected();
    }

    /**
     * @return a new label.
     */
    private JLabel createAndLabel()
    {
        final JLabel answer = new JLabel("-AND-");

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createButtonPanel()
    {
        refreshUI = new JButton("Refresh");
        refreshUI.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                firePropertyChange("refreshUI", false, true);
            }
        });

        final JPanel panel = new JPanel(new GridLayout2(0, 1));

        panel.add(refreshUI);

        final JPanel answer = new JPanel();

        answer.add(panel);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createFeaturePanel()
    {
        highFoodRadiusUI.setValue(5);
        mineralRadiusUI.setValue(12);
        tradeHubRadiusUI.setValue(200);

        final JPanel panel = new JPanel(new GridLayout2(0, 2));

        panel.setBorder(BorderFactory.createTitledBorder("Nearby Features"));

        panel.add(highFoodCloseUI);
        panel.add(highFoodRadiusUI);

        panel.add(createOrLabel());
        panel.add(new JLabel());

        panel.add(mineralCloseUI);
        panel.add(mineralRadiusUI);

        panel.add(createOrLabel());
        panel.add(new JLabel());

        panel.add(tradeHubCloseUI);
        panel.add(tradeHubRadiusUI);

        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(panel, BorderLayout.WEST);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createFoodPanel()
    {
        final JPanel panel = new JPanel(new GridLayout2(0, 1));

        panel.setBorder(BorderFactory.createTitledBorder("Food"));

        panel.add(sevenFoodUI);
        panel.add(createOrLabel());
        panel.add(eightFoodUI);

        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(panel, BorderLayout.WEST);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createNoTownTooClosePanel()
    {
        noTownTooCloseRadiusUI = new JSpinner();
        noTownTooCloseRadiusUI.setValue(12);

        final JPanel panel = new JPanel(new GridLayout2(0, 2));

        panel.add(noTownTooCloseUI);
        panel.add(noTownTooCloseRadiusUI);

        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(panel, BorderLayout.WEST);

        return answer;
    }

    /**
     * @return a new label.
     */
    private JLabel createOrLabel()
    {
        final JLabel answer = new JLabel("-OR-");

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createRegionPanel()
    {
        regionEditUI = new JButton("Edit");
        regionEditUI.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                if (regionOptionPane == null)
                {
                    regionOptionPane = new RegionOptionPane(ControlPanel.this, 2);
                }

                regionOptionPane.getDialog().setVisible(true);

                // Modal dialog blocks here until done.
            }
        });

        final JPanel panel = new JPanel(new GridLayout2(0, 2));

        panel.add(regionUI);
        panel.add(regionEditUI);

        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(panel, BorderLayout.WEST);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createTerrainCombatPanel()
    {
        terrainCombatEditUI = new JButton("Edit");
        terrainCombatEditUI.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                if (terrainCombatOptionPane == null)
                {
                    terrainCombatOptionPane = new TerrainCombatOptionPane(ControlPanel.this, 1);
                }

                terrainCombatOptionPane.getDialog().setVisible(true);

                // Modal dialog blocks here until done.
            }
        });

        final JPanel panel = new JPanel(new GridLayout2(0, 2));

        panel.add(terrainCombatUI);
        panel.add(terrainCombatEditUI);

        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(panel, BorderLayout.WEST);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createTerrainSpecificPanel()
    {
        terrainSpecificEditUI = new JButton("Edit");
        terrainSpecificEditUI.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                if (terrainSpecificOptionPane == null)
                {
                    terrainSpecificOptionPane = new TerrainSpecificOptionPane(ControlPanel.this, 5);
                }

                terrainSpecificOptionPane.getDialog().setVisible(true);

                // Modal dialog blocks here until done.
            }
        });

        final JPanel panel = new JPanel(new GridLayout2(0, 2));

        panel.add(terrainSpecificUI);
        panel.add(terrainSpecificEditUI);

        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(panel, BorderLayout.WEST);

        return answer;
    }
}
