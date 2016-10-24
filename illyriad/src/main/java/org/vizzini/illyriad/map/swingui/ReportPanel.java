package org.vizzini.illyriad.map.swingui;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.io.StringWriter;
import java.util.BitSet;

import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;

import org.vizzini.illyriad.map.GeoIdConverter;
import org.vizzini.illyriad.map.SquareReporter;
import org.vizzini.illyriad.map.SweetspotFinder;

/**
 * Provides a report panel for a sweetspot finder user interface.
 */
public final class ReportPanel extends JPanel
{
    /** Geospatial ID converter. */
    private final GeoIdConverter converter;

    /** Report widget. */
    private JTextArea reportUI;

    /** Points. */
    private BitSet points = new BitSet();

    /** Sweetspot finder. */
    private final SweetspotFinder sweetspotFinder;

    /**
     * Construct this object.
     * 
     * @param converter Geospatial ID converter.
     * @param sweetspotFinder Sweetspot finder.
     */
    @SuppressWarnings("hiding")
    public ReportPanel(final GeoIdConverter converter, final SweetspotFinder sweetspotFinder)
    {
        this.converter = converter;
        this.sweetspotFinder = sweetspotFinder;

        createReportUI();

        setLayout(new BorderLayout());

        add(new JScrollPane(reportUI), BorderLayout.CENTER);
    }

    /**
     * @return the squares
     */
    public BitSet getSquares()
    {
        return points;
    }

    /**
     * @param points the points to set
     */
    @SuppressWarnings("hiding")
    public void setSquares(final BitSet points)
    {
        this.points = points;

        final SquareReporter reporter = new SquareReporter(converter, points, sweetspotFinder);
        final StringWriter writer = new StringWriter();
        reporter.report(writer);

        reportUI.setText(writer.toString());
        reportUI.setCaretPosition(0);
    }

    /**
     * Create a new configured report widget.
     */
    private void createReportUI()
    {
        reportUI = new JTextArea();
        final Font currentFont = reportUI.getFont();
        System.out.println("currentFont.getSize() = " + currentFont.getSize());
        reportUI.setFont(new Font("Courier New", Font.BOLD, 11));
        reportUI.setEditable(false);
        reportUI.setRows(10);
        reportUI.setBackground(Color.WHITE);
        reportUI.setForeground(Color.BLACK);
    }
}
