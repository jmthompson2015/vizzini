package org.vizzini.swingui.game.boardgame.tictactoe;

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
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.Set;

import javax.swing.BorderFactory;
import javax.swing.JPanel;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.BoardGamePosition;
import org.vizzini.example.boardgame.tictactoe.TTTAction;
import org.vizzini.example.boardgame.tictactoe.TTTEnvironment;
import org.vizzini.example.boardgame.tictactoe.TTTPosition;
import org.vizzini.swingui.game.boardgame.DefaultEnvironment2DUI;
import org.vizzini.swingui.game.boardgame.Environment2DUI;

/**
 * Provides an environment user interface for a tic-tac-toe.
 */
public final class TTTEnvironmentUI extends JPanel implements Environment2DUI
{
    /** Delegate. */
    private final Environment2DUI delegate;

    /**
     * Construct this object with the given parameter.
     * 
     * @param environment Tic-tac-toe environment.
     */
    public TTTEnvironmentUI(final TTTEnvironment environment)
    {
        delegate = new DefaultEnvironment2DUI(environment, Color.RED, Color.BLUE);

        final int margin = 10;
        setBorder(BorderFactory.createEmptyBorder(margin, margin, margin, margin));

        environment.addDoActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (Environment.DO_ACTION_PROPERTY.equals(event.getPropertyName()))
                {
                    final TTTAction action = (TTTAction)event.getNewValue();
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
    public TTTEnvironment getEnvironment()
    {
        return (TTTEnvironment)delegate.getEnvironment();
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
    public TTTPosition getPositionForPoint(final Point point)
    {
        TTTPosition answer = null;

        final double width = computeWidth();
        final double height = computeHeight();
        final double startX = computeStartX();
        final double startY = computeStartY();
        final double cellWidth = computeCellWidth();
        final double cellHeight = computeCellHeight();

        if ((startX <= point.x) && (point.x < (startX + width)) && (startY <= point.y) && (point.y < (startY + height)))
        {
            final int x = (int)Math.min((point.x - startX) / cellWidth, 2);
            final int y = (int)Math.min((point.y - startY) / cellHeight, 2);
            answer = TTTPosition.findByCoordinates(x, y);
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
        final double lineWidthFraction = 0.1;
        final float lineWidth = (float)(lineWidthFraction * Math.min(cellWidth, cellHeight));

        // Draw grid lines.
        drawGrid(g2d, lineWidth, width, height, startX, startY, cellWidth, cellHeight);

        // Draw tokens.
        drawTokens(g2d, lineWidth, startX, startY, cellWidth, cellHeight);

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
        return computeHeight() / TTTPosition.MAX_Y;
    }

    /**
     * @return cell width.
     */
    private double computeCellWidth()
    {
        return computeWidth() / TTTPosition.MAX_X;
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
        g2d.setStroke(new BasicStroke(lineWidth, BasicStroke.CAP_ROUND, 0));
        g2d.draw(new Line2D.Double(startX + cellWidth, startY, startX + cellWidth, startY + height));
        g2d.draw(new Line2D.Double(startX + (2 * cellWidth), startY, startX + (2 * cellWidth), (startY + height)));
        g2d.draw(new Line2D.Double(startX, startY + cellHeight, (startX + width), startY + cellHeight));
        g2d.draw(new Line2D.Double(startX, startY + (2 * cellHeight), (startX + width), startY + (2 * cellHeight)));
    }

    /**
     * @param g2d Graphics 2D.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     * @param tokenMargin Token margin.
     * @param i X index.
     * @param j Y index.
     */
    private void drawO(final Graphics2D g2d, final double startX, final double startY, final double cellWidth,
            final double cellHeight, final double tokenMargin, final int i, final int j)
    {
        g2d.setColor(getSecondTokenColor());
        final double x0 = startX + (i * cellWidth) + tokenMargin;
        final double y0 = startY + (j * cellHeight) + tokenMargin;
        final double width0 = cellWidth - (2 * tokenMargin);
        final double height0 = cellHeight - (2 * tokenMargin);
        g2d.draw(new Ellipse2D.Double(x0, y0, width0, height0));
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
        final double tokenMarginFraction = 1.5;
        final double tokenMargin = tokenMarginFraction * lineWidth;
        // final double width0 = cellWidth - (2 * tokenMargin);
        // final double height0 = cellHeight - (2 * tokenMargin);

        for (final TTTPosition position : TTTPosition.values())
        {
            final Token token = getEnvironment().getTokenAt(position);

            if (token != null)
            {
                // final Color color = token.getTeam() == TTTTeam.X ? getFirstTokenColor() : getSecondTokenColor();
                // g2d.setColor(color);
                // final double x0 = startX + (position.getX() * cellWidth) + tokenMargin;
                // final double y0 = startY + (position.getY() * cellHeight) + tokenMargin;
                // g2d.fill(new Ellipse2D.Double(x0, y0, width0, height0));

                final int x = position.getX();
                final int y = position.getY();

                if (isX(token))
                {
                    drawX(g2d, startX, startY, cellWidth, cellHeight, tokenMargin, x, y);
                }
                else if (isO(token))
                {
                    drawO(g2d, startX, startY, cellWidth, cellHeight, tokenMargin, x, y);
                }
            }
        }
    }

    /**
     * @param g2d Graphics 2D.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     * @param tokenMargin Token margin.
     * @param i X index.
     * @param j Y index.
     */
    private void drawX(final Graphics2D g2d, final double startX, final double startY, final double cellWidth,
            final double cellHeight, final double tokenMargin, final int i, final int j)
    {
        g2d.setColor(getFirstTokenColor());
        final double x0 = startX + (i * cellWidth) + tokenMargin;
        final double y0 = startY + (j * cellHeight) + tokenMargin;
        final double x1 = (startX + ((i + 1) * cellWidth)) - tokenMargin;
        final double y1 = (startY + ((j + 1) * cellHeight)) - tokenMargin;
        g2d.draw(new Line2D.Double(x0, y0, x1, y1));
        g2d.draw(new Line2D.Double(x1, y0, x0, y1));
    }

    /**
     * @param token Token.
     * @return true if the token is O.
     */
    private boolean isO(final Token token)
    {
        return (token != null) && "O".equals(token.getName());
    }

    /**
     * @param token Token.
     * @return true if the token is X.
     */
    private boolean isX(final Token token)
    {
        return (token != null) && "X".equals(token.getName());
    }
}
