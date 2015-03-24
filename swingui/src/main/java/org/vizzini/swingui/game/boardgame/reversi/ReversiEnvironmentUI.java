package org.vizzini.swingui.game.boardgame.reversi;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.Stroke;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Line2D;
import java.awt.geom.Rectangle2D;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Set;

import javax.swing.BorderFactory;
import javax.swing.JPanel;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.BoardGamePosition;
import org.vizzini.example.boardgame.reversi.ReversiAction;
import org.vizzini.example.boardgame.reversi.ReversiEnvironment;
import org.vizzini.example.boardgame.reversi.ReversiPosition;
import org.vizzini.example.boardgame.reversi.ReversiTeam;
import org.vizzini.swingui.game.boardgame.DefaultEnvironment2DUI;
import org.vizzini.swingui.game.boardgame.Environment2DUI;

/**
 * Provides an environment user interface for reversi. The grid color is the panel foreground. The board color is the
 * panel background.
 */
public final class ReversiEnvironmentUI extends JPanel implements Environment2DUI
{
    /** Delegate. */
    private final Environment2DUI delegate;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     */
    public ReversiEnvironmentUI(final ReversiEnvironment environment)
    {
        delegate = new DefaultEnvironment2DUI(environment, Color.BLACK, Color.WHITE);

        setBackground(new Color(0, 128, 0));
        setForeground(Color.BLACK);
        final int margin = 10;
        setBorder(BorderFactory.createEmptyBorder(margin, margin, margin, margin));

        environment.addDoActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (Environment.DO_ACTION_PROPERTY.equals(event.getPropertyName()))
                {
                    final ReversiAction action = (ReversiAction)event.getNewValue();
                    clearHighlights();
                    addHighlight(action.getPosition());
                    playClick();
                    repaint();
                }
            }
        });
    }

    @Override
    public void addHighlight(final BoardGamePosition position)
    {
        delegate.addHighlight(position);
    }

    @Override
    public void clearHighlights()
    {
        delegate.clearHighlights();
    }

    @Override
    public ReversiEnvironment getEnvironment()
    {
        return (ReversiEnvironment)delegate.getEnvironment();
    }

    @Override
    public Color getFirstTokenColor()
    {
        return delegate.getFirstTokenColor();
    }

    @Override
    public Color getHighlightColor()
    {
        return delegate.getHighlightColor();
    }

    @Override
    public Set<BoardGamePosition> getHighlights()
    {
        return delegate.getHighlights();
    }

    @Override
    public ReversiPosition getPositionForPoint(final Point point)
    {
        ReversiPosition answer = null;

        final double width = computeWidth();
        final double height = computeHeight();
        final double startX = computeStartX();
        final double startY = computeStartY();
        final double cellWidth = computeCellWidth();
        final double cellHeight = computeCellHeight();

        if ((startX <= point.x) && (point.x < (startX + width)) && (startY <= point.y) && (point.y < (startY + height)))
        {
            final int x = (int)Math.min((point.x - startX) / cellWidth, ReversiPosition.MAX_X - 1);
            final int y = (int)Math.min((point.y - startY) / cellHeight, ReversiPosition.MAX_Y - 1);
            answer = ReversiPosition.findByCoordinates(x, y);
        }

        return answer;
    }

    @Override
    public Color getSecondTokenColor()
    {
        return delegate.getSecondTokenColor();
    }

    @Override
    public void paintComponent(final Graphics g)
    {
        super.paintComponent(g);

        final Graphics2D g2d = (Graphics2D)g;
        g2d.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);

        // Set up.
        final Stroke oldStroke = g2d.getStroke();
        final Color oldColor = g2d.getColor();
        final double width = computeWidth();
        final double height = computeHeight();
        final double startX = computeStartX();
        final double startY = computeStartY();
        final double cellWidth = computeCellWidth();
        final double cellHeight = computeCellHeight();
        final double lineWidthFraction = 0.05;
        final float lineWidth = (float)(lineWidthFraction * Math.min(cellWidth, cellHeight));

        // Draw grid lines.
        drawGrid(g2d, lineWidth, width, height, startX, startY, cellWidth, cellHeight);

        // Draw tokens.
        drawTokens(g2d, lineWidth, startX, startY, cellWidth, cellHeight);

        // Draw highlights.
        drawHighlights(g2d, lineWidth, startX, startY, cellWidth, cellHeight);

        // Clean up.
        g2d.setStroke(oldStroke);
        g2d.setColor(oldColor);
    }

    @Override
    public void playClick()
    {
        delegate.playClick();
    }

    /**
     * @return cell height.
     */
    private double computeCellHeight()
    {
        return computeHeight() / ReversiPosition.MAX_Y;
    }

    /**
     * @return cell width.
     */
    private double computeCellWidth()
    {
        return computeWidth() / ReversiPosition.MAX_X;
    }

    /**
     * @return the height.
     */
    private double computeHeight()
    {
        final Insets insets = getInsets();

        return getSize().height - insets.top - insets.bottom;
    }

    /**
     * @return the start x coordinate.
     */
    private double computeStartX()
    {
        return getInsets().left;
    }

    /**
     * @return the start y coordinate.
     */
    private double computeStartY()
    {
        return getInsets().top;
    }

    /**
     * @return the width.
     */
    private double computeWidth()
    {
        final Insets insets = getInsets();

        return getSize().width - insets.left - insets.right;
    }

    /**
     * @param g2d Graphics 2D.
     * @param lineWidth Line width.
     * @param width Width.
     * @param height Height.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     */
    private void drawGrid(final Graphics2D g2d, final float lineWidth, final double width, final double height,
            final double startX, final double startY, final double cellWidth, final double cellHeight)
    {
        g2d.setStroke(new BasicStroke(lineWidth, BasicStroke.CAP_SQUARE, 0));

        for (int x = 0; x <= ReversiPosition.MAX_X; x++)
        {
            g2d.draw(new Line2D.Double(startX + (x * cellWidth), startY, startX + (x * cellWidth), (startY + height)));
        }

        for (int y = 0; y <= ReversiPosition.MAX_Y; y++)
        {
            g2d.draw(new Line2D.Double(startX, startY + (y * cellHeight), (startX + width), startY + (y * cellHeight)));
        }
    }

    /**
     * @param g2d Graphics 2D.
     * @param lineWidth Line width.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     */
    private void drawHighlights(final Graphics2D g2d, final float lineWidth, final double startX, final double startY,
            final double cellWidth, final double cellHeight)
    {
        final float lineWidth2 = (float)(0.5 * lineWidth);
        g2d.setStroke(new BasicStroke(lineWidth2, BasicStroke.CAP_SQUARE, 0));
        g2d.setColor(getHighlightColor());
        final double width = cellWidth - (2.0 * lineWidth);
        final double height = cellHeight - (2.0 * lineWidth);

        final Set<BoardGamePosition> highlights = getHighlights();

        for (final BoardGamePosition position : highlights)
        {
            final double x = startX + (position.getX() * cellWidth) + lineWidth;
            final double y = startY + (position.getY() * cellHeight) + lineWidth;
            g2d.draw(new Rectangle2D.Double(x, y, width, height));
        }
    }

    /**
     * @param g2d Graphics 2D.
     * @param lineWidth Line width.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     */
    private void drawTokens(final Graphics2D g2d, final float lineWidth, final double startX, final double startY,
            final double cellWidth, final double cellHeight)
    {
        final double tokenMarginFraction = 1.95;
        final double tokenMargin = tokenMarginFraction * lineWidth;
        final double width0 = cellWidth - (2 * tokenMargin);
        final double height0 = cellHeight - (2 * tokenMargin);

        for (final ReversiPosition position : ReversiPosition.values())
        {
            final Token token = getEnvironment().getTokenAt(position);

            if (token != null)
            {
                final Color color = token.getTeam() == ReversiTeam.BLACK ? getFirstTokenColor() : getSecondTokenColor();
                g2d.setColor(color);
                final double x0 = startX + (position.getX() * cellWidth) + tokenMargin;
                final double y0 = startY + (position.getY() * cellHeight) + tokenMargin;
                g2d.fill(new Ellipse2D.Double(x0, y0, width0, height0));
            }
        }
    }
}
