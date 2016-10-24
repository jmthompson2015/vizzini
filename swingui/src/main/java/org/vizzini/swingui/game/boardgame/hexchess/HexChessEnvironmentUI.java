package org.vizzini.swingui.game.boardgame.hexchess;

import java.awt.BasicStroke;
import java.awt.Color;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Insets;
import java.awt.Point;
import java.awt.Stroke;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import javax.swing.BorderFactory;
import javax.swing.ImageIcon;
import javax.swing.JPanel;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.boardgame.BoardGamePosition;
import org.vizzini.example.boardgame.hexchess.HexChessAction;
import org.vizzini.example.boardgame.hexchess.HexChessEnvironment;
import org.vizzini.example.boardgame.hexchess.HexChessPosition;
import org.vizzini.example.boardgame.hexchess.HexChessTeam;
import org.vizzini.example.boardgame.hexchess.HexChessToken;
import org.vizzini.example.boardgame.hexchess.TokenType;
import org.vizzini.swingui.game.boardgame.DefaultEnvironment2DUI;
import org.vizzini.swingui.game.boardgame.Environment2DUI;

/**
 * Provides an environment user interface for hex chess.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/Hexagonal_chess">Hexagonal chess (Wikipedia)</a>
 * @see <a href="http://www.redblobgames.com/grids/hexagons/">Hexagonal Grids</a>
 */
public final class HexChessEnvironmentUI extends JPanel implements Environment2DUI
{
    /** Sine of 60 degrees. */
    private static final double SIN_60 = Math.sin(Math.toRadians(60.0));

    /** Square root of 3. */
    private static final double SQRT_3 = Math.sqrt(3.0);

    /** Fill color. */
    private final Color darkColor = new Color(210, 105, 30);

    /** Delegate. */
    private final Environment2DUI delegate;

    /** Fill color. */
    private final Color lightColor = new Color(245, 222, 179);

    /** Fill color. */
    private final Color mediumColor = new Color(244, 164, 96);

    /** Map of team to token type to icon. */
    private final Map<HexChessTeam, Map<TokenType, ImageIcon>> teamToTypeToImage = new HashMap<HexChessTeam, Map<TokenType, ImageIcon>>();

    /**
     * Construct this object.
     * 
     * @param environment Hex chess environment.
     */
    public HexChessEnvironmentUI(final HexChessEnvironment environment)
    {
        delegate = new DefaultEnvironment2DUI(environment);

        final int margin = 10;
        setBorder(BorderFactory.createEmptyBorder(margin, margin, margin, margin));
        setBackground(new Color(0.7f, 0.9f, 1));

        loadImages();

        environment.addDoActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (Environment.DO_ACTION_PROPERTY.equals(event.getPropertyName()))
                {
                    final HexChessAction action = (HexChessAction)event.getNewValue();
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
    public HexChessEnvironment getEnvironment()
    {
        return (HexChessEnvironment)delegate.getEnvironment();
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
    public HexChessPosition getPositionForPoint(final Point point)
    {
        HexChessPosition answer = null;

        final double startX = computeStartX();
        final double startY = computeStartY();
        final double radius = computeRadius();

        final double screenX = point.x - startX;
        final double screenY = point.y - startY;

        // Approximate position.
        final double q0 = ((2.0 * screenX) / 3.0) / radius;
        final double r0 = (((screenY * SQRT_3) / 3.0) - (screenX / 3.0)) / radius;
        final double x0 = q0;
        final double z0 = r0;
        final double y0 = -x0 - z0;
        // System.out.println("q0, r0 = " + q0 + ", " + r0 + " x0, y0, z0 = " + x0 + ", " + y0 + ", " + z0);

        // Find the nearest hex.
        int x = (int)Math.round(x0);
        int y = (int)Math.round(y0);
        int z = (int)Math.round(z0);

        final int xDiff = (int)Math.abs(x - x0);
        final int yDiff = (int)Math.abs(y - y0);
        final int zDiff = (int)Math.abs(z - z0);

        if ((xDiff > yDiff) && (xDiff > zDiff))
        {
            x = -y - z;
        }
        else if (yDiff > zDiff)
        {
            y = -x - z;
        }
        else
        {
            z = -x - y;
        }

        // System.out.println("x, y, z = " + x + ", " + y + ", " + z);

        answer = HexChessPosition.findByCoordinates(x, y, z);

        // System.out.println("getPositionForPoint() answer = " + answer);

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

        // Set up.
        final Stroke oldStroke = g2d.getStroke();
        final Color oldColor = g2d.getColor();
        final double startX = computeStartX();
        final double startY = computeStartY();
        final double cellWidth = computeCellWidth();
        final double cellHeight = computeCellHeight();
        final double lineWidthFraction = 0.05;
        final float lineWidth = (float)(lineWidthFraction * Math.min(cellWidth, cellHeight));

        // Draw grid lines.
        drawGrid(g2d, lineWidth, startX, startY, cellWidth, cellHeight);

        // Draw tokens.
        drawTokens(g2d, startX, startY);

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
        return computeHeight() / 9.5;
    }

    /**
     * @return cell width.
     */
    private double computeCellWidth()
    {
        return computeWidth() / 8.5;
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
     * @return hex inner radius.
     */
    private double computeInnerRadius()
    {
        return computeRadius() * SIN_60;
    }

    /**
     * @return hex radius.
     */
    private double computeRadius()
    {
        final double cellWidth = computeCellWidth();
        final double cellHeight = computeCellHeight();

        return Math.min(cellWidth / 2.0, cellHeight / 2.0);
    }

    /**
     * @param q Axial coordinate q.
     * @param radius Hex radius.
     * 
     * @return the screen X coordinate.
     */
    private double computeScreenX(final int q, final double radius)
    {
        return radius * 1.5 * q;
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * @param radius Hex radius.
     * 
     * @return the screen Y coordinate.
     */
    private double computeScreenY(final int q, final int r, final double radius)
    {
        return radius * SQRT_3 * (r + (q / 2.0));
    }

    /**
     * @return the start x coordinate.
     */
    private double computeStartX()
    {
        return getInsets().left + (computeWidth() / 2.0);
    }

    /**
     * @return the start y coordinate.
     */
    private double computeStartY()
    {
        return getInsets().top + (computeHeight() / 2.0);
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
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param cellWidth Cell width.
     * @param cellHeight Cell height.
     */
    private void drawGrid(final Graphics2D g2d, final float lineWidth, final double startX, final double startY,
            final double cellWidth, final double cellHeight)
    {
        g2d.setStroke(new BasicStroke(lineWidth, BasicStroke.CAP_SQUARE, 0));

        final double radius = computeRadius();
        final double halfSize = radius / 2.0;
        final double innerRadius = computeInnerRadius();

        for (int q = HexChessPosition.MIN_Q; q < HexChessPosition.MAX_Q; q++)
        {
            final double myStartX = startX + computeScreenX(q, radius);

            for (int r = HexChessPosition.MIN_R; r < HexChessPosition.MAX_R; r++)
            {
                final HexChessPosition position = HexChessPosition.findByCoordinates(q, r);

                if (position != null)
                {
                    final double myStartY = startY + computeScreenY(q, r, radius);
                    final Color color = getColorFor(q, r);

                    drawHex(g2d, color, myStartX, myStartY, radius, halfSize, innerRadius);
                    // g2d.drawString(position.name(), (int)myStartX - 8, (int)myStartY - 10);
                    // g2d.drawString(position.getX() + "," + position.getY() + "," + position.getZ(), (int)myStartX -
                    // 24,
                    // (int)myStartY + 6);
                    // g2d.drawString(String.valueOf(position.getIndex()), (int)myStartX - 8, (int)myStartY + 22);
                }
            }
        }
    }

    /**
     * @param g2d Graphics 2D.
     * @param color Fill color.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param radius Hex radius.
     * @param halfRadius Half radius.
     * @param innerRadius Hex inner radius.
     */
    private void drawHex(final Graphics2D g2d, final Color color, final double startX, final double startY,
            final double radius, final double halfRadius, final double innerRadius)
    {
        final int x0 = (int)(startX - halfRadius);
        final int x1 = (int)(startX + halfRadius);
        final int x2 = (int)(startX + radius);
        final int x3 = (int)(startX - radius);

        final int y0 = (int)(startY - innerRadius);
        final int y1 = (int)startY;
        final int y2 = (int)(startY + innerRadius);

        final int[] xPoints = { x0, x1, x2, x1, x0, x3, };
        final int[] yPoints = { y0, y0, y1, y2, y2, y1, };
        final int nPoints = 6;

        g2d.setColor(color);
        g2d.fillPolygon(xPoints, yPoints, nPoints);
        g2d.setColor(Color.BLACK);
        g2d.drawPolygon(xPoints, yPoints, nPoints);
    }

    /**
     * @param g2d Graphics 2D.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     * @param radius Hex radius.
     * @param halfRadius Half radius.
     * @param innerRadius Hex inner radius.
     */
    private void drawHexOutline(final Graphics2D g2d, final double startX, final double startY, final double radius,
            final double halfRadius, final double innerRadius)
    {
        final int x0 = (int)(startX - halfRadius);
        final int x1 = (int)(startX + halfRadius);
        final int x2 = (int)(startX + radius);
        final int x3 = (int)(startX - radius);

        final int y0 = (int)(startY - innerRadius);
        final int y1 = (int)startY;
        final int y2 = (int)(startY + innerRadius);

        final int[] xPoints = { x0, x1, x2, x1, x0, x3, };
        final int[] yPoints = { y0, y0, y1, y2, y2, y1, };
        final int nPoints = 6;

        g2d.drawPolygon(xPoints, yPoints, nPoints);
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

        final double radius = computeRadius();
        final double innerRadius = computeInnerRadius();

        final double radius2 = radius - (lineWidth / 2.0);
        final double halfRadius2 = radius2 / 2.0;
        final double innerRadius2 = innerRadius - (lineWidth / 2.0);

        final Set<BoardGamePosition> highlights = getHighlights();

        for (final BoardGamePosition position : highlights)
        {
            final HexChessPosition hPosition = (HexChessPosition)position;
            final double myStartX = startX + computeScreenX(hPosition.getQ(), radius);
            final double myStartY = startY + computeScreenY(hPosition.getQ(), hPosition.getR(), radius);
            drawHexOutline(g2d, myStartX, myStartY, radius2, halfRadius2, innerRadius2);
        }
    }

    /**
     * @param g2d Graphics 2D.
     * @param startX Start X coordinate.
     * @param startY Start Y coordinate.
     */
    private void drawTokens(final Graphics2D g2d, final double startX, final double startY)
    {
        final double size = computeRadius();
        final double fraction = 0.7;
        final int halfWidth1 = (int)(fraction * size);
        final int halfHeight1 = (int)(fraction * size);
        final int width1 = (int)(2.0 * fraction * size);
        final int height1 = (int)(2.0 * fraction * size);

        for (int q = HexChessPosition.MIN_Q; q < HexChessPosition.MAX_Q; q++)
        {
            final double x0 = startX + computeScreenX(q, size);

            for (int r = HexChessPosition.MIN_R; r < HexChessPosition.MAX_R; r++)
            {
                final HexChessPosition position = HexChessPosition.findByCoordinates(q, r);

                if (position != null)
                {
                    final HexChessToken token = getEnvironment().getTokenAt(position);

                    if (token != null)
                    {
                        final double y0 = startY + computeScreenY(q, r, size);

                        final ImageIcon image = getImageFor(token);
                        final int x1 = (int)(x0 - halfWidth1);
                        final int y1 = (int)(y0 - halfHeight1);

                        g2d.drawImage(image.getImage(), x1, y1, width1, height1, this);
                    }
                }
            }
        }
    }

    /**
     * @param q Axial coordinate q.
     * @param r Axial coordinate r.
     * 
     * @return the color.
     */
    private Color getColorFor(final int q, final int r)
    {
        Color answer;

        final int sum = (q + 5 + Math.abs(5 - r)) % 3;

        switch (sum)
        {
        case 0:
            answer = darkColor;
            break;
        case 1:
            answer = mediumColor;
            break;
        case 2:
            answer = lightColor;
            break;
        default:
            throw new RuntimeException("Unknown sum = " + sum + " for q, r = " + q + ", " + r);
        }

        return answer;
    }

    /**
     * @param token Token.
     * 
     * @return the image for the given token.
     */
    private ImageIcon getImageFor(final HexChessToken token)
    {
        final Map<TokenType, ImageIcon> typeToImage = teamToTypeToImage.get(token.getTeam());

        return typeToImage.get(token.getType());
    }

    /**
     * Load chess piece images.
     */
    private void loadImages()
    {
        for (final HexChessTeam team : HexChessTeam.values())
        {
            Map<TokenType, ImageIcon> typeToImage = teamToTypeToImage.get(team);

            if (typeToImage == null)
            {
                typeToImage = new HashMap<TokenType, ImageIcon>();
                teamToTypeToImage.put(team, typeToImage);
            }

            final String teamSymbol = team == HexChessTeam.WHITE ? "l" : "d";

            for (final TokenType type : TokenType.values())
            {
                final String tokenSymbol = type.getSymbol().toLowerCase();
                final String filename = "50px-Chess_" + tokenSymbol + teamSymbol + "t45.png";
                final ImageIcon image = createImageIcon("game/boardgame/hexchess/" + filename, "King");
                typeToImage.put(type, image);
            }
        }
    }
}
