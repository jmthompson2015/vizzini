package org.vizzini.illyriad.map.swingui;

import java.awt.BorderLayout;
import java.awt.Cursor;
import java.awt.EventQueue;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.BitSet;

import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JSplitPane;
import javax.swing.WindowConstants;

import org.vizzini.illyriad.map.DefaultMineralDatabase;
import org.vizzini.illyriad.map.DefaultTownDatabase;
import org.vizzini.illyriad.map.FastWorldMapDatabase;
import org.vizzini.illyriad.map.GeoIdConverter;
import org.vizzini.illyriad.map.MineralDatabase;
import org.vizzini.illyriad.map.SweetspotFinder;
import org.vizzini.illyriad.map.TownDatabase;
import org.vizzini.illyriad.map.WorldMapDatabase;

/**
 * Provides a user interface for a sweetspot finder.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Sweetspot Finder"</code>
 */
public final class SweetspotFinderUI extends JPanel
{
    /** Frame. */
    static JFrame _frame;

    /**
     * @return the frame
     */
    public static JFrame getFrame()
    {
        return _frame;
    }

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        EventQueue.invokeLater(new Runnable()
        {
            @Override
            public void run()
            {
                final SweetspotFinderUI app = new SweetspotFinderUI();

                _frame = new JFrame("Vizzini Sweetspot Finder");
                _frame.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
                _frame.getContentPane().add(app, BorderLayout.CENTER);
                _frame.setSize(1280, 850);
                _frame.setLocationByPlatform(true);
                _frame.setVisible(true);
            }
        });
    }

    /** Control panel. */
    private final ControlPanel controlPanel;

    /** Map panel. */
    private final MapPanel mapPanel;

    /** Report panel. */
    private final ReportPanel reportPanel;

    /** Sweetspot finder. */
    private final SweetspotFinder sweetspotFinder;

    /** Previous cursor. */
    private Cursor previousCursor;

    /**
     * Construct this object.
     */
    public SweetspotFinderUI()
    {
        final boolean isElgea = true;
        final GeoIdConverter converter = new GeoIdConverter(isElgea);
        final WorldMapDatabase worldMapDatabase = new FastWorldMapDatabase(converter);
        final MineralDatabase mineralDatabase = new DefaultMineralDatabase(converter);
        final TownDatabase townDatabase = new DefaultTownDatabase(converter);
        sweetspotFinder = new SweetspotFinder(converter, worldMapDatabase, mineralDatabase, townDatabase);

        controlPanel = new ControlPanel();
        mapPanel = new MapPanel();
        reportPanel = new ReportPanel(converter, sweetspotFinder);

        final JSplitPane splitPane = new JSplitPane(JSplitPane.VERTICAL_SPLIT, mapPanel, reportPanel);
        splitPane.setResizeWeight(0.95);

        setLayout(new BorderLayout());

        add(splitPane, BorderLayout.CENTER);
        add(controlPanel, BorderLayout.EAST);

        controlPanel.addPropertyChangeListener(createPropertyChangeListener());

        updateData();
    }

    /**
     * Update data.
     */
    void updateData()
    {
        setCursorBusy(true);

        sweetspotFinder.setSevenFood(controlPanel.isSevenFoodSelected());
        sweetspotFinder.setEightFood(controlPanel.isEightFoodSelected());
        sweetspotFinder.setFiveWood(controlPanel.isFiveWoodSelected());
        sweetspotFinder.setFiveClay(controlPanel.isFiveClaySelected());
        sweetspotFinder.setFiveIron(controlPanel.isFiveIronSelected());
        sweetspotFinder.setFiveStone(controlPanel.isFiveStoneSelected());

        sweetspotFinder.setNoTownTooClose(controlPanel.isNoTownTooCloseSelected());
        sweetspotFinder.setNoTownTooCloseRadius(controlPanel.getNoTownTooCloseRadius());

        sweetspotFinder.setInRegions(controlPanel.isRegionSelected());
        sweetspotFinder.setRegions(controlPanel.getRegions());

        sweetspotFinder.setOnTerrainCombat(controlPanel.isTerrainCombatSelected());
        sweetspotFinder.setTerrainCombats(controlPanel.getTerrainCombats());

        sweetspotFinder.setOnTerrainSpecific(controlPanel.isTerrainSpecificSelected());
        sweetspotFinder.setTerrainSpecifics(controlPanel.getTerrainSpecifics());

        sweetspotFinder.setHighFoodClose(controlPanel.isHighFoodCloseSelected());
        sweetspotFinder.setHighFoodRadius(controlPanel.getHighFoodRadius());
        sweetspotFinder.setMineralClose(controlPanel.isMineralCloseSelected());
        sweetspotFinder.setMineralRadius(controlPanel.getMineralRadius());
        sweetspotFinder.setTradeHubClose(controlPanel.isTradeHubCloseSelected());
        sweetspotFinder.setTradeHubRadius(controlPanel.getTradeHubRadius());

        final BitSet squares = sweetspotFinder.search();

        mapPanel.setSquares(squares);

        reportPanel.setSquares(squares);

        setCursorBusy(false);
    }

    /**
     * @return a new property change listener.
     */
    private PropertyChangeListener createPropertyChangeListener()
    {
        return new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if ("refreshUI".equals(event.getPropertyName()))
                {
                    updateData();
                }
            }
        };
    }

    /**
     * Set the cursor to busy depending upon the given state.
     * 
     * @param isBusy Flag indicating if the app is busy.
     */
    private void setCursorBusy(final boolean isBusy)
    {
        Cursor newCursor;

        if (isBusy)
        {
            previousCursor = getCursor();
            newCursor = Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR);
        }
        else
        {
            if (previousCursor != null)
            {
                newCursor = previousCursor;
                previousCursor = null;
            }
            else
            {
                newCursor = Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR);
            }
        }

        setCursor(newCursor);
    }
}
