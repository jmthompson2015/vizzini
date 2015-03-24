package org.vizzini.swingui.game.boardgame.chess;

import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.TokenType;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;
import org.vizzini.swingui.game.boardgame.DefaultSpatialFactory;
import org.vizzini.swingui.game.boardgame.SpatialFactory;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.FastMath;
import com.jme3.math.Vector3f;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.Spatial;
import com.jme3.scene.shape.Box;
import com.jme3.scene.shape.Cylinder;
import com.jme3.scene.shape.Dome;
import com.jme3.scene.shape.Sphere;

/**
 * Provides a default implementation of a spatial factory.
 */
public final class DefaultChessSpatialFactory implements ChessSpatialFactory
{
    /** Axis samples. */
    private final int axisSamples = 10;

    /** Base height. */
    private final float baseHeight = 0.1f;

    /** Delegate. */
    private final SpatialFactory delegate;

    /** Large scale. */
    private float largeScale = 1.0f;

    /** Large token height. */
    private float largeZ;

    /** Medium scale. */
    private float mediumScale = 0.8f;

    /** Medium token height. */
    private float mediumZ;

    /** Pawn size. */
    private final float pawnSize;

    /** Radial samples. */
    private final int radialSamples = 30;

    /** Small scale. */
    private float smallScale = 0.6f;

    /** Small token height. */
    private float smallZ;

    /**
     * Construct this object.
     * 
     * @param fileCount File count.
     * @param rankCount Rank count.
     * @param levelCount Level count.
     * @param firstSquareMaterial First square material. (required)
     * @param secondSquareMaterial Second square material. (required)
     * @param firstTokenMaterial First token material. (required)
     * @param secondTokenMaterial Black token material. (required)
     */
    public DefaultChessSpatialFactory(final int fileCount, final int rankCount, final int levelCount,
            final Material firstSquareMaterial, final Material secondSquareMaterial, final Material firstTokenMaterial,
            final Material secondTokenMaterial)
    {
        delegate = new DefaultSpatialFactory(fileCount, rankCount, levelCount, firstSquareMaterial,
                secondSquareMaterial, firstTokenMaterial, secondTokenMaterial);

        pawnSize = 0.5f * getSquareSize();
    }

    @Override
    public Spatial createBishop(final ChessTeam team, final ChessPosition position)
    {
        final Material material = getTokenMaterialFor(team);

        final Node answer = createMediumBase("bishop", team, position);

        // Create topper.
        final float topperSize = 0.3f * getTokenSize();
        final int zSamples = 10;
        final float zScale = 1.5f;
        final Sphere shape1 = new Sphere(zSamples, radialSamples, topperSize);
        final Geometry topper = new Geometry("bishop1", shape1);
        topper.setMaterial(material);
        topper.scale(1, 1, zScale);
        topper.setLocalTranslation(0, 0, mediumZ + (1.5f * ((zScale * topperSize) / 2.0f)));
        answer.attachChild(topper);

        return answer;
    }

    @Override
    public Spatial createBoard(final AssetManager assetManager)
    {
        return delegate.createBoard(assetManager);
    }

    @Override
    public Spatial createKing(final ChessTeam team, final ChessPosition position)
    {
        final Material material = getTokenMaterialFor(team);

        final Node answer = createLargeBase("king", team, position);

        // Create topper.
        final float topperSize = 0.4f * getTokenSize();
        final int planes = 10;
        final float topperHeight = 0.6f * getTokenSize();
        final Cylinder shape1 = new Cylinder(axisSamples, radialSamples, topperSize, topperHeight, true);
        final Geometry topper1 = new Geometry("queen5", shape1);
        topper1.setMaterial(material);
        topper1.setLocalTranslation(0, 0, largeZ + ((1.0f - 0.1f) * (topperHeight / 2.0f)));
        answer.attachChild(topper1);

        // Create topper.
        final float topperScale = 0.6f;
        final Dome shape2 = new Dome(Vector3f.ZERO, planes, radialSamples, topperSize, false);
        final Geometry topper2 = new Geometry("queen6", shape2);
        topper2.setMaterial(material);
        topper2.scale(1, topperScale, 1);
        topper2.rotate(FastMath.HALF_PI, 0, 0);
        topper2.setLocalTranslation(0, 0, largeZ + ((1.0f - 0.1f) * topperHeight));
        answer.attachChild(topper2);

        // Create topper.
        final Box shape3 = new Box(0.15f * getTokenSize(), 0.05f * getTokenSize(), 0.15f * getTokenSize());
        final Geometry topper3 = new Geometry("king7", shape3);
        topper3.setMaterial(material);
        topper3.setLocalTranslation(0, 0, largeZ + topperHeight + (topperScale * topperSize)
                + (0.5f * 0.15f * getTokenSize()));
        answer.attachChild(topper3);

        return answer;
    }

    @Override
    public Spatial createKnight(final ChessTeam team, final ChessPosition position)
    {
        // FIXME
        return createRook(team, position);
    }

    @Override
    public Spatial createPawn(final ChessTeam team, final ChessPosition position)
    {
        final Material material = getTokenMaterialFor(team);

        final Node answer = createSmallBase("pawn", team, position);

        // Create topper.
        final float topperSize = 0.4f * getTokenSize();
        final int zSamples = 10;
        final Sphere shape1 = new Sphere(zSamples, radialSamples, topperSize);
        final Geometry topper = new Geometry("pawn4", shape1);
        topper.setMaterial(material);
        topper.setLocalTranslation(0, 0, smallZ + (1.5f * (topperSize / 2.0f)));
        answer.attachChild(topper);

        return answer;
    }

    @Override
    public Spatial createQueen(final ChessTeam team, final ChessPosition position)
    {
        final Material material = getTokenMaterialFor(team);

        final Node answer = createLargeBase("queen", team, position);

        // Create topper.
        final float topperSize = 0.3f * getTokenSize();
        final int planes = 10;
        final float topperHeight = 0.6f * getTokenSize();
        final Cylinder shape1 = new Cylinder(axisSamples, radialSamples, topperSize, topperHeight, true);
        final Geometry topper1 = new Geometry("queen5", shape1);
        topper1.setMaterial(material);
        topper1.setLocalTranslation(0, 0, largeZ + ((1.0f - 0.1f) * (topperHeight / 2.0f)));
        answer.attachChild(topper1);

        // Create topper.
        final float topperScale = 0.5f;
        final Dome shape2 = new Dome(Vector3f.ZERO, planes, radialSamples, topperSize, false);
        final Geometry topper2 = new Geometry("queen6", shape2);
        topper2.setMaterial(material);
        topper2.scale(1, topperScale, 1);
        topper2.rotate(FastMath.HALF_PI, 0, 0);
        topper2.setLocalTranslation(0, 0, largeZ + ((1.0f - 0.1f) * topperHeight));
        answer.attachChild(topper2);

        return answer;
    }

    @Override
    public Spatial createRook(final ChessTeam team, final ChessPosition position)
    {
        final Material material = getTokenMaterialFor(team);

        final Node answer = createMediumBase("rook", team, position);

        // Create topper.
        final float topperSize = mediumScale * 0.5f * getTokenSize();
        final float topperScale = 0.7f;
        final int planes = 10;
        final Dome shape0 = new Dome(Vector3f.ZERO, planes, radialSamples, topperSize, false);
        final Geometry topper0 = new Geometry("rook4", shape0);
        topper0.setMaterial(material);
        topper0.scale(1, topperScale, 1);
        topper0.rotate(-FastMath.HALF_PI, 0, 0);
        topper0.setLocalTranslation(0, 0, mediumZ + (0.9f * (topperScale * topperSize)));
        answer.attachChild(topper0);

        // Create topper.
        final float topperHeight = mediumScale * 0.4f * getTokenSize();
        final Cylinder shape1 = new Cylinder(axisSamples, radialSamples, topperSize, topperHeight, true);
        final Geometry topper1 = new Geometry("rook5", shape1);
        topper1.setMaterial(material);
        topper1.setLocalTranslation(0, 0, mediumZ + (0.9f * (topperScale * topperSize)) + (topperHeight / 2.0f));
        answer.attachChild(topper1);

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
    public Spatial createUnicorn(final ChessTeam team, final ChessPosition position)
    {
        // FIXME
        return createRook(team, position);
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
        return pawnSize;
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
        return team == ChessTeam.WHITE ? getFirstTokenMaterial() : getSecondTokenMaterial();
    }

    @Override
    public float getTokenSize()
    {
        return delegate.getTokenSize();
    }

    @Override
    public float getX(final int file)
    {
        return file - getFileCenter();
    }

    @Override
    public float getY(final int rank)
    {
        return rank - getRankCenter();
    }

    @Override
    public float getZ(final int level)
    {
        return (level - getLevelCenter()) * 2.0f;
    }

    /**
     * @param name Name.
     * @param team Team.
     * @param position Position.
     * @param scale Scale.
     * 
     * @return a new base.
     */
    private Node createBase(final String name, final ChessTeam team, final ChessPosition position, final float scale)
    {
        final Material material = getTokenMaterialFor(team);

        final Node answer = new Node(name);

        // Create base.
        final float baseSize = scale * getTokenSize();
        final Cylinder shape0 = new Cylinder(axisSamples, radialSamples, baseSize, baseHeight, true);
        final Geometry base = new Geometry(name + "0", shape0);
        base.setMaterial(material);
        float z = baseHeight / 2.0f;
        base.setLocalTranslation(0, 0, z);
        answer.attachChild(base);

        // Create bulb.
        final float bulbSize = baseSize;
        final float bulbScale = 0.5f;
        final Sphere shape1 = new Sphere(axisSamples, radialSamples, bulbSize);
        final Geometry bulb = new Geometry(name + "1", shape1);
        bulb.setMaterial(material);
        bulb.scale(1, 1, bulbScale);
        z = bulbScale * bulbSize;
        bulb.setLocalTranslation(0, 0, z);
        answer.attachChild(bulb);

        // Create shaft.
        final float shaftSize = 0.8f * baseSize;
        final float shaftScale = 3.0f;
        final Dome shape2 = new Dome(Vector3f.ZERO, 2, radialSamples, shaftSize, false);
        final Geometry shaft = new Geometry(name + "2", shape2);
        shaft.setMaterial(material);
        shaft.scale(1, shaftScale, 1);
        z = bulbScale * bulbSize;
        shaft.setLocalTranslation(0, 0, z);
        shaft.rotate(FastMath.HALF_PI, 0, 0);
        answer.attachChild(shaft);

        // Create collar.
        final float collarSize = 0.65f * baseSize;
        final float collarScale = 0.2f;
        final Sphere shape3 = new Sphere(axisSamples, radialSamples, collarSize);
        final Geometry collar = new Geometry(name + "3", shape3);
        collar.setMaterial(material);
        collar.scale(1, 1, collarScale);
        z += (collarScale * collarSize) + (0.6f * shaftScale * shaftSize);
        collar.setLocalTranslation(0, 0, z);
        answer.attachChild(collar);

        answer.setLocalTranslation(createVector(position, getSquareHeight()));

        z += collarScale * collarSize;

        if (scale == smallScale)
        {
            smallZ = z;
        }
        else if (scale == mediumScale)
        {
            mediumZ = z;
        }
        else
        {
            largeZ = z;
        }

        return answer;
    }

    /**
     * @param name Name.
     * @param team Team.
     * @param position Position.
     * 
     * @return a new base.
     */
    private Node createLargeBase(final String name, final ChessTeam team, final ChessPosition position)
    {
        return createBase(name, team, position, largeScale);
    }

    /**
     * @param name Name.
     * @param team Team.
     * @param position Position.
     * 
     * @return a new base.
     */
    private Node createMediumBase(final String name, final ChessTeam team, final ChessPosition position)
    {
        return createBase(name, team, position, mediumScale);
    }

    /**
     * @param name Name.
     * @param team Team.
     * @param position Position.
     * 
     * @return a new base.
     */
    private Node createSmallBase(final String name, final ChessTeam team, final ChessPosition position)
    {
        return createBase(name, team, position, smallScale);
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
