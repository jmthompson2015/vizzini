package org.vizzini.swingui.game.boardgame.chess;

import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.DirectionType;
import org.vizzini.chess.TokenType;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.FastMath;
import com.jme3.math.Vector3f;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.Spatial;
import com.jme3.scene.shape.Box;
import com.jme3.scene.shape.Sphere;

/**
 * Provides a spatial factory to create Josef Hartwig's Bauhaus style pieces for chess.
 * 
 * @see <a href="http://en.wikipedia.org/wiki/User:Hillbillyholiday/Articles/Josef_Hartwig">Josef Hartwig
 *      (Wikipedia)</a>
 * @see <a href="http://www.chesshouse.com/bauhaus_chess_set_s/435.htm">Bauhaus Chess Set</a>
 */
public final class BauhausSpatialFactory implements ChessSpatialFactory
{
    /** Delegate. */
    private final ChessSpatialFactory delegate;

    /**
     * Construct this object.
     * 
     * @param fileCount File count.
     * @param rankCount Rank count.
     * @param levelCount Level count.
     * @param firstSquareMaterial First square material.
     * @param secondSquareMaterial Second square material.
     * @param whiteTokenMaterial White token material.
     * @param blackTokenMaterial Black token material.
     */
    public BauhausSpatialFactory(final int fileCount, final int rankCount, final int levelCount,
            final Material firstSquareMaterial, final Material secondSquareMaterial, final Material whiteTokenMaterial,
            final Material blackTokenMaterial)
    {
        delegate = new DefaultChessSpatialFactory(fileCount, rankCount, levelCount, firstSquareMaterial,
                secondSquareMaterial, whiteTokenMaterial, blackTokenMaterial);
    }

    @Override
    public Node createBishop(final ChessTeam team, final ChessPosition position)
    {
        final float tokenSize = getTokenSize();
        final float squareHeight = getSquareHeight();
        final float width = 0.2f * tokenSize;
        final float length = 0.9f * (float)Math.sqrt(2.0 * tokenSize * tokenSize);
        final Material material = getTokenMaterialFor(team);

        final Node answer = new Node("bishop");

        for (int i = -1; i <= 1; i += 2)
        {
            final Box shape = new Box(length, width, tokenSize);
            final Geometry cross = new Geometry("bishop0", shape);
            cross.setMaterial(material);
            cross.rotate(0, 0, i * 45 * FastMath.DEG_TO_RAD);
            cross.setLocalTranslation(0, 0, tokenSize);
            answer.attachChild(cross);
        }

        answer.setLocalTranslation(createVector(position, squareHeight));

        return answer;
    }

    @Override
    public Spatial createBoard(final AssetManager assetManager)
    {
        return delegate.createBoard(assetManager);
    }

    @Override
    public Node createKing(final ChessTeam team, final ChessPosition position)
    {
        final float tokenSize = getTokenSize();
        final float squareHeight = getSquareHeight();
        final Material material = getTokenMaterialFor(team);

        final Node answer = new Node("king");

        // Create base.
        final Box shape0 = new Box(tokenSize, tokenSize, tokenSize);
        final Geometry base = new Geometry("king0", shape0);
        base.setMaterial(material);
        base.setLocalTranslation(0, 0, tokenSize);
        answer.attachChild(base);

        // Create topper.
        final float topperSize = 0.6f * tokenSize;
        final Box shape1 = new Box(topperSize, topperSize, topperSize);
        final Geometry topper = new Geometry("king1", shape1);
        topper.setMaterial(material);
        topper.setLocalTranslation(0, 0, topperSize + (2 * tokenSize));
        topper.rotate(0, 0, 45 * FastMath.DEG_TO_RAD);
        answer.attachChild(topper);

        answer.setLocalTranslation(createVector(position, squareHeight));

        return answer;
    }

    @Override
    public Node createKnight(final ChessTeam team, final ChessPosition position)
    {
        final float tokenSize = getTokenSize();
        final float squareHeight = getSquareHeight();
        final float halfSize = 0.5f * tokenSize;
        final Material material = getTokenMaterialFor(team);

        final Node answer = new Node("knight");

        {
            final Box shape = new Box(halfSize, tokenSize, halfSize);
            final Geometry top = new Geometry("knight0", shape);
            top.setMaterial(material);
            top.setLocalTranslation(-halfSize, 0, halfSize + tokenSize + squareHeight);
            answer.attachChild(top);
        }

        {
            final Box shape = new Box(halfSize, halfSize, tokenSize);
            final Geometry side = new Geometry("knight1", shape);
            side.setMaterial(material);
            side.setLocalTranslation(halfSize, halfSize, tokenSize + squareHeight);
            answer.attachChild(side);
        }

        {
            final Box shape = new Box(tokenSize, halfSize, halfSize);
            final Geometry bottom = new Geometry("knight2", shape);
            bottom.setMaterial(material);
            bottom.setLocalTranslation(0, -halfSize, -halfSize + tokenSize + squareHeight);
            answer.attachChild(bottom);
        }

        answer.setLocalTranslation(createVector(position, 0));

        return answer;
    }

    @Override
    public Geometry createPawn(final ChessTeam team, final ChessPosition position)
    {
        final float pawnSize = getPawnSize();
        final float squareHeight = getSquareHeight();
        final Box shape = new Box(pawnSize, pawnSize, pawnSize);

        final Geometry answer = new Geometry("pawn", shape);

        answer.setMaterial(getTokenMaterialFor(team));
        answer.setLocalTranslation(createVector(position, pawnSize + squareHeight));

        return answer;
    }

    @Override
    public Node createQueen(final ChessTeam team, final ChessPosition position)
    {
        final float tokenSize = getTokenSize();
        final float squareHeight = getSquareHeight();
        final Material material = getTokenMaterialFor(team);

        final Node answer = new Node("queen");

        // Create base.
        final Box shape0 = new Box(tokenSize, tokenSize, tokenSize);
        final Geometry base = new Geometry("queen0", shape0);
        base.setMaterial(material);
        base.setLocalTranslation(0, 0, tokenSize);
        answer.attachChild(base);

        // Create topper.
        final float topperSize = 0.7f * tokenSize;
        final int zSamples = 10;
        final int radialSamples = 20;
        final Sphere shape1 = new Sphere(zSamples, radialSamples, topperSize);
        final Geometry topper = new Geometry("queen1", shape1);
        topper.setMaterial(material);
        topper.setLocalTranslation(0, 0, (topperSize + (2 * tokenSize)) - (0.5f * squareHeight));
        answer.attachChild(topper);

        answer.setLocalTranslation(createVector(position, squareHeight));

        return answer;
    }

    @Override
    public Geometry createRook(final ChessTeam team, final ChessPosition position)
    {
        final float tokenSize = getTokenSize();
        final float squareHeight = getSquareHeight();
        final Box shape = new Box(tokenSize, tokenSize, tokenSize);

        final Geometry answer = new Geometry("rook", shape);

        answer.setMaterial(getTokenMaterialFor(team));
        answer.setLocalTranslation(createVector(position, tokenSize + squareHeight));

        return answer;
    }

    @Override
    public Spatial createSpatial(final Position<?> position, final Token token)
    {
        final ChessTeam team = (ChessTeam)token.getTeam();
        final TokenType type = ((ChessToken)token).getType();
        final ChessPosition cPosition = (ChessPosition)position;

        Spatial answer = null;

        switch (type)
        {
        case BISHOP:
            answer = createBishop(team, cPosition);
            break;
        case KING:
            answer = createKing(team, cPosition);
            break;
        case KNIGHT:
            answer = createKnight(team, cPosition);
            break;
        case PAWN:
            answer = createPawn(team, cPosition);
            break;
        case QUEEN:
            answer = createQueen(team, cPosition);
            break;
        case ROOK:
            answer = createRook(team, cPosition);
            break;
        case UNICORN:
            answer = createUnicorn(team, cPosition);
            break;
        default:
            throw new RuntimeException("Unknown token type: " + type);
        }

        return answer;
    }

    @Override
    public Node createUnicorn(final ChessTeam team, final ChessPosition position)
    {
        final float tokenSize = getTokenSize();
        final float squareHeight = getSquareHeight();
        final Material material = getTokenMaterialFor(team);

        final Node answer = new Node("unicorn");

        // Create center.
        final float centerSize = 0.8f * tokenSize;
        final Box shape0 = new Box(centerSize, centerSize, centerSize);
        final Geometry base = new Geometry("unicorn0", shape0);
        base.setMaterial(material);
        base.setLocalTranslation(0, 0, tokenSize);
        answer.attachChild(base);

        // Create corners.
        final float cornerSize = 0.45f * tokenSize;
        final float cornerOffset = tokenSize - cornerSize;
        final DirectionType[] directions = DirectionType.getTriaxialDirections();

        for (final DirectionType d : directions)
        {
            final Box shape1 = new Box(cornerSize, cornerSize, cornerSize);
            final Geometry topper = new Geometry("unicorn1", shape1);
            topper.setMaterial(material);
            topper.setLocalTranslation((d.getDx() * cornerOffset), (d.getDy() * cornerOffset),
                    (d.getDz() * cornerOffset) + tokenSize);
            answer.attachChild(topper);
        }

        answer.setLocalTranslation(createVector(position, squareHeight));

        return answer;
    }

    @Override
    public float getFileCenter()
    {
        return delegate.getFileCenter();
    }

    @Override
    public int getFileCount()
    {
        return delegate.getFileCount();
    }

    @Override
    public Material getFirstSquareMaterial()
    {
        return delegate.getFirstSquareMaterial();
    }

    @Override
    public Material getFirstTokenMaterial()
    {
        return delegate.getFirstTokenMaterial();
    }

    @Override
    public float getLevelCenter()
    {
        return delegate.getLevelCenter();
    }

    @Override
    public int getLevelCount()
    {
        return delegate.getLevelCount();
    }

    @Override
    public float getPawnSize()
    {
        return delegate.getPawnSize();
    }

    @Override
    public float getRankCenter()
    {
        return delegate.getRankCenter();
    }

    @Override
    public int getRankCount()
    {
        return delegate.getRankCount();
    }

    @Override
    public Material getSecondSquareMaterial()
    {
        return delegate.getSecondSquareMaterial();
    }

    @Override
    public Material getSecondTokenMaterial()
    {
        return delegate.getSecondTokenMaterial();
    }

    @Override
    public float getSquareHeight()
    {
        return delegate.getSquareHeight();
    }

    @Override
    public Material getSquareMaterialFor(final int file, final int rank, final int level)
    {
        return delegate.getSquareMaterialFor(file, rank, level);
    }

    @Override
    public float getSquareSize()
    {
        return delegate.getSquareSize();
    }

    @Override
    public Material getTokenMaterialFor(final Team team)
    {
        return delegate.getTokenMaterialFor(team);
    }

    @Override
    public float getTokenSize()
    {
        return delegate.getTokenSize();
    }

    @Override
    public float getX(final int file)
    {
        return delegate.getX(file);
    }

    @Override
    public float getY(final int rank)
    {
        return delegate.getY(rank);
    }

    @Override
    public float getZ(final int level)
    {
        return delegate.getZ(level);
    }

    /**
     * @param position Position.
     * @param zOffset Z offset.
     * 
     * @return a new vector.
     */
    private Vector3f createVector(final ChessPosition position, final float zOffset)
    {
        final int file = position.getFile();
        final int rank = position.getRank();
        final int level = position.getLevel();

        return new Vector3f(getX(file), getY(rank), getZ(level) + zOffset);
    }
}
