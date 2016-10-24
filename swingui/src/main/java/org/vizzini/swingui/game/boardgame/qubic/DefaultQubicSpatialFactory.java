package org.vizzini.swingui.game.boardgame.qubic;

import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;
import org.vizzini.example.boardgame.qubic.QubicPosition;
import org.vizzini.example.boardgame.qubic.QubicTeam;
import org.vizzini.swingui.game.boardgame.DefaultSpatialFactory;
import org.vizzini.swingui.game.boardgame.SpatialFactory;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.math.Vector3f;
import com.jme3.scene.Geometry;
import com.jme3.scene.Spatial;
import com.jme3.scene.shape.Box;
import com.jme3.scene.shape.Cylinder;

/**
 * Provides a default implementation of a spatial factory.
 */
public final class DefaultQubicSpatialFactory implements QubicSpatialFactory
{
    /** Delegate. */
    private final SpatialFactory delegate;

    /**
     * Construct this object.
     * 
     * @param fileCount File count.
     * @param rankCount Rank count.
     * @param levelCount Level count.
     * @param firstSquareMaterial First square material. (required)
     * @param secondSquareMaterial Second square material. (required)
     * @param firstTokenMaterial First token material. (required)
     * @param secondTokenMaterial Second token material. (required)
     */
    public DefaultQubicSpatialFactory(final int fileCount, final int rankCount, final int levelCount,
            final Material firstSquareMaterial, final Material secondSquareMaterial, final Material firstTokenMaterial,
            final Material secondTokenMaterial)
    {
        delegate = new DefaultSpatialFactory(fileCount, rankCount, levelCount, firstSquareMaterial,
                secondSquareMaterial, firstTokenMaterial, secondTokenMaterial);
    }

    @Override
    public Spatial createBoard(final AssetManager assetManager)
    {
        return delegate.createBoard(assetManager);
    }

    @Override
    public Spatial createO(final QubicTeam team, final QubicPosition position)
    {
        final int axisSamples = 10;
        final int radialSamples = 30;
        final float radius = getTokenSize();
        final float height = 2.0f * getTokenSize();
        final boolean closed = true;
        final Cylinder shape = new Cylinder(axisSamples, radialSamples, radius, height, closed);

        final Geometry answer = new Geometry("O", shape);

        answer.setMaterial(getTokenMaterialFor(team));
        answer.setLocalTranslation(createVector(position, getTokenSize() + getSquareHeight()));

        return answer;
    }

    @Override
    public Spatial createSpatial(final Position<?> position, final Token token)
    {
        final QubicTeam team = (QubicTeam)token.getTeam();
        final QubicPosition qPosition = (QubicPosition)position;

        Spatial answer = null;

        if (team == QubicTeam.X)
        {
            answer = createX(team, qPosition);
        }
        else if (team == QubicTeam.O)
        {
            answer = createO(team, qPosition);
        }
        else
        {
            throw new RuntimeException("Unknown token team: " + team);
        }

        return answer;
    }

    @Override
    public Spatial createX(final QubicTeam team, final QubicPosition position)
    {
        final Box shape = new Box(getTokenSize(), getTokenSize(), getTokenSize());

        final Geometry answer = new Geometry("X", shape);

        answer.setMaterial(getTokenMaterialFor(team));
        answer.setLocalTranslation(createVector(position, getTokenSize() + getSquareHeight()));

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
        return team == QubicTeam.X ? getFirstTokenMaterial() : getSecondTokenMaterial();
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
    private Vector3f createVector(final QubicPosition position, final float zOffset)
    {
        final int file = position.getX();
        final int rank = position.getY();
        final int level = position.getZ();

        return new Vector3f(getX(file), getY(rank), getZ(level) + zOffset);
    }
}
