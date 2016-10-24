package org.vizzini.swingui.game.boardgame.chess;

import org.vizzini.chess.ChessTeam;
import org.vizzini.chess.Dimensions;
import org.vizzini.chess.GameType;
import org.vizzini.chess.artemis.ArtemisPosition;
import org.vizzini.chess.raumschach.RaumschachPosition;
import org.vizzini.chess.standard.StandardPosition;
import org.vizzini.swingui.game.boardgame.MaterialFactory;
import org.vizzini.swingui.game.boardgame.TextureMaterialFactory;

import com.jme3.app.SimpleApplication;
import com.jme3.app.StatsAppState;
import com.jme3.input.KeyInput;
import com.jme3.input.controls.AnalogListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.light.AmbientLight;
import com.jme3.light.DirectionalLight;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.math.FastMath;
import com.jme3.math.Quaternion;
import com.jme3.math.Vector3f;
import com.jme3.scene.Node;
import com.jme3.system.AppSettings;

/**
 * Provides a user interface for chess.
 * <p>
 * To get the application name in the Mac menu bar, add this to the run configuration:
 * </p>
 * <code>-Dcom.apple.mrj.application.apple.menu.about.name="Vizzini Chess"</code>
 */
public final class MyTestBauhausSpatialFactory extends SimpleApplication
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String[] args)
    {
        final MyTestBauhausSpatialFactory app = new MyTestBauhausSpatialFactory();

        // Settings.
        app.setShowSettings(false);
        final AppSettings settings = new AppSettings(true);
        settings.setWidth(1024);
        settings.setHeight(768);
        app.setSettings(settings);

        app.start();
    }

    /** Analog listener. */
    private final AnalogListener analogListener = createAnalogListener();

    /** Board. */
    private Node board;

    /** Spatial object factory. */
    private ChessSpatialFactory spatialFactory;

    @Override
    public void simpleInitApp()
    {
        // Remove the statistics display.
        stateManager.detach(stateManager.getState(StatsAppState.class));

        viewPort.setBackgroundColor(new ColorRGBA(0.7f, 0.9f, 1, 1));

        // initBoard(GameType.ARTEMIS);
        initBoard(GameType.RAUMSCHACH);
        // initBoard(GameType.STANDARD);
        // initBoard(GameType.TRIDIMENSIONAL);

        board.rotate(-FastMath.HALF_PI, -FastMath.HALF_PI, 0);
        board.setLocalTranslation(0, 0, -5);

        rootNode.attachChild(board);
        rootNode.addLight(createDirectionalLight());
        rootNode.addLight(createAmbientLight());

        initKeys();
    }

    /**
     * @return a new light source.
     */
    private AmbientLight createAmbientLight()
    {
        final AmbientLight answer = new AmbientLight();

        answer.setColor(ColorRGBA.White);

        return answer;
    }

    /**
     * @return a new analog listener.
     */
    private AnalogListener createAnalogListener()
    {
        return new AnalogListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void onAnalog(final String name, final float value, final float tpf)
            {
                if (name.equals("Right"))
                {
                    board.rotate(0, 0, value * speed);
                }
                else if (name.equals("Left"))
                {
                    board.rotate(0, 0, -value * speed);
                }
                else if (name.equals("Up"))
                {
                    board.rotate(0, -value * speed, 0);
                }
                else if (name.equals("Down"))
                {
                    board.rotate(0, value * speed, 0);
                }
                else if (name.equals("Orient"))
                {
                    board.setLocalRotation(Quaternion.IDENTITY);
                    board.rotate(-FastMath.HALF_PI, -FastMath.HALF_PI, 0);
                    board.setLocalTranslation(0, 0, -5);

                    cam.setLocation(new Vector3f(0, 0, 10));
                    cam.lookAt(Vector3f.ZERO, Vector3f.UNIT_Y);
                }
            }
        };
    }

    /**
     * @return a new light source.
     */
    private DirectionalLight createDirectionalLight()
    {
        final DirectionalLight answer = new DirectionalLight();

        answer.setColor(ColorRGBA.White);
        answer.setDirection(new Vector3f(-1, -1, -1).normalizeLocal());

        return answer;
    }

    /**
     * @return a new material factory.
     */
    private MaterialFactory createMaterialFactory()
    {
        // return new ColorMaterialFactory(assetManager, true);
        return new TextureMaterialFactory(assetManager, true);
    }

    /**
     * @param materialFactory Material factory.
     * @param dimensions Dimensions.
     * 
     * @return a new spatial factory.
     */
    private ChessSpatialFactory createSpatialFactory(final MaterialFactory materialFactory, final Dimensions dimensions)
    {
        final Material firstSquareMaterial = materialFactory.createFirstSquareMaterial();
        final Material secondSquareMaterial = materialFactory.createSecondSquareMaterial();
        final Material whiteTokenMaterial = materialFactory.createFirstTokenMaterial();
        final Material blackTokenMaterial = materialFactory.createSecondTokenMaterial();

        final int fileCount = dimensions.getFileCount();
        final int rankCount = dimensions.getRankCount();
        final int levelCount = dimensions.getLevelCount();

        return new BauhausSpatialFactory(fileCount, rankCount, levelCount, firstSquareMaterial, secondSquareMaterial,
                whiteTokenMaterial, blackTokenMaterial);
    }

    /**
     * @param gameType Game type.
     */
    private void initBoard(final GameType gameType)
    {
        spatialFactory = createSpatialFactory(createMaterialFactory(), gameType.getDimensions());
        board = (Node)spatialFactory.createBoard(assetManager);

        switch (gameType)
        {
        case ARTEMIS:
            initTokensArtemis();
            break;
        case RAUMSCHACH:
            initTokensRaumschach();
            break;
        case STANDARD:
            initTokensStandard();
            break;
        default:
            throw new RuntimeException("Unknown game type: " + gameType);
        }
    }

    /**
     * Custom Keybinding: Map named actions to inputs.
     */
    private void initKeys()
    {
        // You can map one or several inputs to one named action
        inputManager.addMapping("Left", new KeyTrigger(KeyInput.KEY_J));
        inputManager.addMapping("Right", new KeyTrigger(KeyInput.KEY_L));
        inputManager.addMapping("Up", new KeyTrigger(KeyInput.KEY_I));
        inputManager.addMapping("Down", new KeyTrigger(KeyInput.KEY_K));
        inputManager.addMapping("Orient", new KeyTrigger(KeyInput.KEY_O));

        // Add the names to the action listener.
        inputManager.addListener(analogListener, "Left", "Right", "Up", "Down", "Orient");
    }

    /**
     * Initialize tokens.
     */
    private void initTokensArtemis()
    {
        board.attachChild(spatialFactory.createRook(ChessTeam.WHITE, ArtemisPosition.a1A));
        board.attachChild(spatialFactory.createQueen(ChessTeam.WHITE, ArtemisPosition.b1A));
        board.attachChild(spatialFactory.createKing(ChessTeam.WHITE, ArtemisPosition.c1A));
        board.attachChild(spatialFactory.createRook(ChessTeam.WHITE, ArtemisPosition.d1A));

        int rank = 1;
        int level = 0;

        for (int file = 0; file < 4; file++)
        {
            final ArtemisPosition position = ArtemisPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.WHITE, position));
        }

        board.attachChild(spatialFactory.createKnight(ChessTeam.WHITE, ArtemisPosition.a1B));
        board.attachChild(spatialFactory.createBishop(ChessTeam.WHITE, ArtemisPosition.b1B));
        board.attachChild(spatialFactory.createBishop(ChessTeam.WHITE, ArtemisPosition.c1B));
        board.attachChild(spatialFactory.createKnight(ChessTeam.WHITE, ArtemisPosition.d1B));

        rank = 1;
        level = 1;

        for (int file = 0; file < 4; file++)
        {
            final ArtemisPosition position = ArtemisPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.WHITE, position));
        }

        rank = 2;
        level = 2;

        for (int file = 0; file < 4; file++)
        {
            final ArtemisPosition position = ArtemisPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.BLACK, position));
        }

        board.attachChild(spatialFactory.createKnight(ChessTeam.BLACK, ArtemisPosition.a4C));
        board.attachChild(spatialFactory.createBishop(ChessTeam.BLACK, ArtemisPosition.b4C));
        board.attachChild(spatialFactory.createBishop(ChessTeam.BLACK, ArtemisPosition.c4C));
        board.attachChild(spatialFactory.createKnight(ChessTeam.BLACK, ArtemisPosition.d4C));

        rank = 2;
        level = 3;

        for (int file = 0; file < 4; file++)
        {
            final ArtemisPosition position = ArtemisPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.BLACK, position));
        }

        board.attachChild(spatialFactory.createRook(ChessTeam.BLACK, ArtemisPosition.a4D));
        board.attachChild(spatialFactory.createQueen(ChessTeam.BLACK, ArtemisPosition.a4D));
        board.attachChild(spatialFactory.createKing(ChessTeam.BLACK, ArtemisPosition.a4D));
        board.attachChild(spatialFactory.createRook(ChessTeam.BLACK, ArtemisPosition.a4D));
    }

    /**
     * Initialize tokens.
     */
    private void initTokensRaumschach()
    {
        board.attachChild(spatialFactory.createRook(ChessTeam.WHITE, RaumschachPosition.a1A));
        board.attachChild(spatialFactory.createKnight(ChessTeam.WHITE, RaumschachPosition.b1A));
        board.attachChild(spatialFactory.createKing(ChessTeam.WHITE, RaumschachPosition.c1A));
        board.attachChild(spatialFactory.createKnight(ChessTeam.WHITE, RaumschachPosition.d1A));
        board.attachChild(spatialFactory.createRook(ChessTeam.WHITE, RaumschachPosition.e1A));

        int rank = 1;
        int level = 0;

        for (int file = 0; file < 5; file++)
        {
            final RaumschachPosition position = RaumschachPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.WHITE, position));
        }

        board.attachChild(spatialFactory.createBishop(ChessTeam.WHITE, RaumschachPosition.a1B));
        board.attachChild(spatialFactory.createUnicorn(ChessTeam.WHITE, RaumschachPosition.b1B));
        board.attachChild(spatialFactory.createQueen(ChessTeam.WHITE, RaumschachPosition.c1B));
        board.attachChild(spatialFactory.createBishop(ChessTeam.WHITE, RaumschachPosition.d1B));
        board.attachChild(spatialFactory.createUnicorn(ChessTeam.WHITE, RaumschachPosition.e1B));

        rank = 1;
        level = 1;

        for (int file = 0; file < 5; file++)
        {
            final RaumschachPosition position = RaumschachPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.WHITE, position));
        }

        rank = 3;
        level = 3;

        for (int file = 0; file < 5; file++)
        {
            final RaumschachPosition position = RaumschachPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.BLACK, position));
        }

        board.attachChild(spatialFactory.createBishop(ChessTeam.BLACK, RaumschachPosition.a5D));
        board.attachChild(spatialFactory.createUnicorn(ChessTeam.BLACK, RaumschachPosition.b5D));
        board.attachChild(spatialFactory.createQueen(ChessTeam.BLACK, RaumschachPosition.c5D));
        board.attachChild(spatialFactory.createBishop(ChessTeam.BLACK, RaumschachPosition.d5D));
        board.attachChild(spatialFactory.createUnicorn(ChessTeam.BLACK, RaumschachPosition.e5D));

        rank = 3;
        level = 4;

        for (int file = 0; file < 5; file++)
        {
            final RaumschachPosition position = RaumschachPosition.findByCoordinates(file, rank, level);
            board.attachChild(spatialFactory.createPawn(ChessTeam.BLACK, position));
        }

        board.attachChild(spatialFactory.createRook(ChessTeam.BLACK, RaumschachPosition.a5E));
        board.attachChild(spatialFactory.createKnight(ChessTeam.BLACK, RaumschachPosition.b5E));
        board.attachChild(spatialFactory.createKing(ChessTeam.BLACK, RaumschachPosition.c5E));
        board.attachChild(spatialFactory.createKnight(ChessTeam.BLACK, RaumschachPosition.d5E));
        board.attachChild(spatialFactory.createRook(ChessTeam.BLACK, RaumschachPosition.e5E));
    }

    /**
     * Initialize tokens.
     */
    private void initTokensStandard()
    {
        board.attachChild(spatialFactory.createRook(ChessTeam.WHITE, StandardPosition.a1));
        board.attachChild(spatialFactory.createKnight(ChessTeam.WHITE, StandardPosition.b1));
        board.attachChild(spatialFactory.createBishop(ChessTeam.WHITE, StandardPosition.c1));
        board.attachChild(spatialFactory.createQueen(ChessTeam.WHITE, StandardPosition.d1));
        board.attachChild(spatialFactory.createKing(ChessTeam.WHITE, StandardPosition.e1));
        board.attachChild(spatialFactory.createBishop(ChessTeam.WHITE, StandardPosition.f1));
        board.attachChild(spatialFactory.createKnight(ChessTeam.WHITE, StandardPosition.g1));
        board.attachChild(spatialFactory.createRook(ChessTeam.WHITE, StandardPosition.h1));

        int rank = 1;

        for (int file = 0; file < 8; file++)
        {
            final StandardPosition position = StandardPosition.findByCoordinates(file, rank);
            board.attachChild(spatialFactory.createPawn(ChessTeam.WHITE, position));
        }

        rank = 6;

        for (int file = 0; file < 8; file++)
        {
            final StandardPosition position = StandardPosition.findByCoordinates(file, rank);
            board.attachChild(spatialFactory.createPawn(ChessTeam.BLACK, position));
        }

        board.attachChild(spatialFactory.createRook(ChessTeam.BLACK, StandardPosition.a8));
        board.attachChild(spatialFactory.createKnight(ChessTeam.BLACK, StandardPosition.b8));
        board.attachChild(spatialFactory.createBishop(ChessTeam.BLACK, StandardPosition.c8));
        board.attachChild(spatialFactory.createQueen(ChessTeam.BLACK, StandardPosition.d8));
        board.attachChild(spatialFactory.createKing(ChessTeam.BLACK, StandardPosition.e8));
        board.attachChild(spatialFactory.createBishop(ChessTeam.BLACK, StandardPosition.f8));
        board.attachChild(spatialFactory.createKnight(ChessTeam.BLACK, StandardPosition.g8));
        board.attachChild(spatialFactory.createRook(ChessTeam.BLACK, StandardPosition.h8));
    }
}
