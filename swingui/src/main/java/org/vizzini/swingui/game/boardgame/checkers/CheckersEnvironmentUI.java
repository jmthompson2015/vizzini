package org.vizzini.swingui.game.boardgame.checkers;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.Point;
import java.awt.RenderingHints;
import java.awt.Stroke;
import java.awt.geom.Ellipse2D;
import java.awt.geom.Rectangle2D;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.net.URL;
import java.util.Set;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JPanel;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.BoardGamePosition;
import org.vizzini.example.boardgame.checkers.CheckersAction;
import org.vizzini.example.boardgame.checkers.CheckersEnvironment;
import org.vizzini.example.boardgame.checkers.CheckersPosition;
import org.vizzini.example.boardgame.checkers.CheckersTeam;
import org.vizzini.example.boardgame.checkers.Pawn;
import org.vizzini.swingui.game.boardgame.DefaultEnvironment2DUI;
import org.vizzini.swingui.game.boardgame.Environment2DUI;

/**
 * Provides an environment user interface for checkers.
 */
public final class CheckersEnvironmentUI extends JPanel implements Environment2DUI
{
    /** Delegate. */
    private final Environment2DUI delegate;

    /** First square color. */
    private final Color firstSquareColor = new Color(0, 160, 0);

    /** King image. */
    private ImageIcon kingImage;

    /**
     * Construct this object with the given parameter.
     * 
     * @param environment Checkers environment.
     */
    public CheckersEnvironmentUI(final CheckersEnvironment environment)
    {
        final Color firstTokenColor = new Color(192, 0, 0);
        delegate = new DefaultEnvironment2DUI(environment, firstTokenColor, Color.WHITE);

        setBackground(new Color(245, 245, 220));
        final int margin = 10;
        setBorder(BorderFactory.createEmptyBorder(margin, margin, margin, margin));

        environment.addDoActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (Environment.DO_ACTION_PROPERTY.equals(event.getPropertyName()))
                {
                    final CheckersAction action = (CheckersAction)event.getNewValue();
                    clearHighlights();
                    addHighlight(action.getFromPosition());
                    addHighlight(action.getToPosition());
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
    public CheckersEnvironment getEnvironment()
    {
        return (CheckersEnvironment)delegate.getEnvironment();
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
    public CheckersPosition getPositionForPoint(final Point point)
    {
        CheckersPosition answer = null;

        final double width = computeWidth();
        final double height = computeHeight();
        final double startX = computeStartX();
        final double startY = computeStartY();
        final double cellWidth = computeCellWidth();
        final double cellHeight = computeCellHeight();

        if ((startX <= point.x) && (point.x < (startX + width)) && (startY <= point.y) && (point.y < (startY + height)))
        {
            final int x = (int)Math.min((point.x - startX) / cellWidth, CheckersPosition.MAX_X - 1);
            final int y = (int)Math.min((point.y - startY) / cellHeight, CheckersPosition.MAX_Y - 1);
            answer = CheckersPosition.findByCoordinates(x, y);
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
        return computeHeight() / CheckersPosition.MAX_Y;
    }

    /**
     * @return cell width.
     */
    private double computeCellWidth()
    {
        return computeWidth() / CheckersPosition.MAX_X;
    }

    /**
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     * @param tokenMargin Token margin.
     * @param i X index.
     * @param j Y index.
     * 
     * @return a new ellipse.
     */
    private Ellipse2D.Double computeEllipse(final double startX, final double startY, final double cellWidth,
            final double cellHeight, final double tokenMargin, final int i, final int j)
    {
        final double x = startX + (i * cellWidth) + tokenMargin;
        final double y = startY + (j * cellHeight) + tokenMargin;
        final double width = cellWidth - (2 * tokenMargin);
        final double height = cellHeight - (2 * tokenMargin);

        return new Ellipse2D.Double(x, y, width, height);
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
     * @param imageLocation Image location.
     * @param altText Alternate text.
     * 
     * @return a new image icon.
     */
    private ImageIcon createImageIcon(final String imageLocation, final String altText)
    {
        ImageIcon answer = null;

        final URL imageUrl = getClass().getClassLoader().getResource(imageLocation);

        if (imageUrl != null)
        {
            answer = new ImageIcon(imageUrl, altText);
        }

        return answer;
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
        g2d.setColor(firstSquareColor);
        g2d.setStroke(new BasicStroke(lineWidth, BasicStroke.CAP_SQUARE, 0));
        g2d.draw(new Rectangle2D.Double(startX, startY, width, height));

        for (int y = 0; y < CheckersPosition.MAX_Y; y++)
        {
            for (int x = 0; x < CheckersPosition.MAX_X; x++)
            {
                final boolean isFilled = (x % 2) != (y % 2);

                if (isFilled)
                {
                    g2d.fill(new Rectangle2D.Double(startX + (x * cellWidth), startY + (y * cellHeight), cellWidth,
                            cellHeight));
                }
            }
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
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     * @param tokenMargin Token margin.
     * @param i X index.
     * @param j Y index.
     * @param color Color.
     */
    private void drawKing(final Graphics2D g2d, final double startX, final double startY, final double cellWidth,
            final double cellHeight, final double tokenMargin, final int i, final int j, final Color color)
    {
        // Draw color.
        final Ellipse2D.Double ellipse = computeEllipse(startX, startY, cellWidth, cellHeight, tokenMargin, i, j);
        g2d.setColor(color);
        g2d.fill(ellipse);

        // Draw king image.
        final ImageIcon image = getKingImage();
        final double fraction = 0.9;
        final int x1 = (int)(ellipse.x + ((ellipse.width * (1 - fraction)) / 2.0));
        final int y1 = (int)(ellipse.y + ((ellipse.height * (1 - fraction)) / 2.0));
        final int width1 = (int)(fraction * ellipse.width);
        final int height1 = (int)(fraction * ellipse.height);
        g2d.drawImage(image.getImage(), x1, y1, width1, height1, this);
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
     * @param color Color.
     */
    private void drawPawn(final Graphics2D g2d, final double startX, final double startY, final double cellWidth,
            final double cellHeight, final double tokenMargin, final int i, final int j, final Color color)
    {
        // Draw color.
        final Ellipse2D.Double ellipse = computeEllipse(startX, startY, cellWidth, cellHeight, tokenMargin, i, j);
        g2d.setColor(color);
        g2d.fill(ellipse);
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

        for (final CheckersPosition position : CheckersPosition.values())
        {
            final Token token = getEnvironment().getTokenAt(position);

            if (token != null)
            {
                final Color color = token.getTeam() == CheckersTeam.RED ? getFirstTokenColor() : getSecondTokenColor();

                if (token instanceof Pawn)
                {
                    drawPawn(g2d, startX, startY, cellWidth, cellHeight, tokenMargin, position.getX(), position.getY(),
                            color);
                }
                else
                {
                    drawKing(g2d, startX, startY, cellWidth, cellHeight, tokenMargin, position.getX(), position.getY(),
                            color);
                }
            }
        }
    }

    /**
     * @return the kingImage
     */
    private ImageIcon getKingImage()
    {
        if (kingImage == null)
        {
            kingImage = createImageIcon("game/boardgame/checkers/king.png", "King");
        }

        return kingImage;
    }
}
