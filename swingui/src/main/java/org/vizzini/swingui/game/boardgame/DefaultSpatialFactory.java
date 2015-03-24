package org.vizzini.swingui.game.boardgame;

import org.vizzini.core.game.Position;
import org.vizzini.core.game.Team;
import org.vizzini.core.game.Token;

import com.jme3.asset.AssetManager;
import com.jme3.material.Material;
import com.jme3.renderer.queue.RenderQueue.Bucket;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.Spatial;
import com.jme3.scene.shape.Box;

/**
 * Provides a default implementation of a spatial factory.
 */
public final class DefaultSpatialFactory implements SpatialFactory
{
    /** File center. */
    private final float fileCenter;

    /** File count. */
    private final int fileCount;

    /** First square material. */
    private final Material firstSquareMaterial;

    /** First token material. */
    private final Material firstTokenMaterial;

    /** Level center. */
    private final float levelCenter;

    /** Level count. */
    private final int levelCount;

    /** Rank center. */
    private final float rankCenter;

    /** Rank count. */
    private final int rankCount;

    /** Second square material. */
    private final Material secondSquareMaterial;

    /** Second token material. */
    private final Material secondTokenMaterial;

    /** Square height. */
    private final float squareHeight = 0.05f;

    /** Square size. */
    private final float squareSize = 0.5f;

    /** Token size. */
    private final float tokenSize;

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
    @SuppressWarnings("hiding")
    public DefaultSpatialFactory(final int fileCount, final int rankCount, final int levelCount,
            final Material firstSquareMaterial, final Material secondSquareMaterial, final Material firstTokenMaterial,
            final Material secondTokenMaterial)
    {
        if (firstSquareMaterial == null)
        {
            throw new IllegalArgumentException("firstSquareMaterial is null");
        }

        if (secondSquareMaterial == null)
        {
            throw new IllegalArgumentException("secondSquareMaterial is null");
        }

        if (firstTokenMaterial == null)
        {
            throw new IllegalArgumentException("firstTokenMaterial is null");
        }

        if (secondTokenMaterial == null)
        {
            throw new IllegalArgumentException("secondTokenMaterial is null");
        }

        this.fileCount = fileCount;
        this.rankCount = rankCount;
        this.levelCount = levelCount;

        this.firstSquareMaterial = firstSquareMaterial;
        this.secondSquareMaterial = secondSquareMaterial;
        this.firstTokenMaterial = firstTokenMaterial;
        this.secondTokenMaterial = secondTokenMaterial;

        tokenSize = 0.8f * squareSize;

        // Calculate centers.
        fileCenter = (2.0f * squareSize * fileCount) / 2.0f;
        rankCenter = (2.0f * squareSize * rankCount) / 2.0f;
        levelCenter = (2.0f * squareSize * levelCount) / 2.0f;
    }

    @Override
    public Spatial createBoard(final AssetManager assetManager)
    {
        final Node squares = new Node("squares");
        final Node tokens = new Node("tokens");

        for (int level = 0; level < levelCount; level++)
        {
            final Spatial board = createBoard(assetManager, level);
            squares.attachChild(board);
        }

        final Node answer = new Node("board");

        answer.attachChild(squares);
        answer.attachChild(tokens);

        return answer;
    }

    @Override
    public Spatial createSpatial(final Position<?> position, final Token token)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public float getFileCenter()
    {
        return fileCenter;
    }

    @Override
    public int getFileCount()
    {
        return fileCount;
    }

    @Override
    public Material getFirstSquareMaterial()
    {
        return firstSquareMaterial;
    }

    @Override
    public Material getFirstTokenMaterial()
    {
        return firstTokenMaterial;
    }

    @Override
    public float getLevelCenter()
    {
        return levelCenter;
    }

    @Override
    public int getLevelCount()
    {
        return levelCount;
    }

    @Override
    public float getRankCenter()
    {
        return rankCenter;
    }

    @Override
    public int getRankCount()
    {
        return rankCount;
    }

    @Override
    public Material getSecondSquareMaterial()
    {
        return secondSquareMaterial;
    }

    @Override
    public Material getSecondTokenMaterial()
    {
        return secondTokenMaterial;
    }

    @Override
    public float getSquareHeight()
    {
        return squareHeight;
    }

    @Override
    public Material getSquareMaterialFor(final int file, final int rank, final int level)
    {
        final boolean isFirst = (((file % 2) == (rank % 2)) && ((level % 2) == 0))
                || (((file % 2) != (rank % 2)) && ((level % 2) == 1));

        return isFirst ? firstSquareMaterial : secondSquareMaterial;
    }

    @Override
    public float getSquareSize()
    {
        return squareSize;
    }

    @Override
    public Material getTokenMaterialFor(final Team team)
    {
        throw new RuntimeException("method not implemented");
    }

    @Override
    public float getTokenSize()
    {
        return tokenSize;
    }

    @Override
    public float getX(final int file)
    {
        return file - fileCenter;
    }

    @Override
    public float getY(final int rank)
    {
        return rank - rankCenter;
    }

    @Override
    public float getZ(final int level)
    {
        return (level - levelCenter) * 2.0f;
    }

    /**
     * @param assetManager Asset manager.
     * @param level Level.
     * 
     * @return a new board.
     */
    private Node createBoard(final AssetManager assetManager, final int level)
    {
        final Node answer = new Node("board" + level);

        final float z = getZ(level);

        for (int rank = 0; rank < rankCount; rank++)
        {
            for (int file = 0; file < fileCount; file++)
            {
                final Box box = new Box(squareSize, squareSize, squareHeight);

                final float x = getX(file);
                final float y = getY(rank);

                final Material material = getSquareMaterialFor(file, rank, level);

                final Geometry square = new Geometry("square" + file + rank + level, box);
                square.setLocalTranslation(x, y, z);
                square.setQueueBucket(Bucket.Transparent);
                square.setMaterial(material);
                square.setUserData("file", file);
                square.setUserData("rank", rank);
                square.setUserData("level", level);

                answer.attachChild(square);
            }
        }

        return answer;
    }
}
