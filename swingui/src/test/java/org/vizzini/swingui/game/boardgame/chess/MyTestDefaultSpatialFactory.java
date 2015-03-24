package org.vizzini.swingui.game.boardgame.chess;

import org.vizzini.chess.ChessTeam;
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
public final class MyTestDefaultSpatialFactory extends SimpleApplication
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String[] args)
    {
        final MyTestDefaultSpatialFactory app = new MyTestDefaultSpatialFactory();

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

        initBoard();

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
     * Initialize board.
     */
    private void initBoard()
    {
        final MaterialFactory materialFactory = createMaterialFactory();
        final Material firstSquareMaterial = materialFactory.createFirstSquareMaterial();
        final Material secondSquareMaterial = materialFactory.createSecondSquareMaterial();
        final Material whiteTokenMaterial = materialFactory.createFirstTokenMaterial();
        final Material blackTokenMaterial = materialFactory.createSecondTokenMaterial();
        spatialFactory = new DefaultChessSpatialFactory(7, 2, 1, firstSquareMaterial, secondSquareMaterial,
                whiteTokenMaterial, blackTokenMaterial);
        board = (Node)spatialFactory.createBoard(assetManager);
        initTokens();
        board.rotate(-FastMath.HALF_PI, 0, 0);
        board.setLocalTranslation(0, -2, 0);
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
    private void initTokens()
    {
        board.attachChild(spatialFactory.createPawn(ChessTeam.WHITE, StandardPosition.a1));
        board.attachChild(spatialFactory.createQueen(ChessTeam.WHITE, StandardPosition.b1));
        board.attachChild(spatialFactory.createKing(ChessTeam.WHITE, StandardPosition.c1));
        board.attachChild(spatialFactory.createBishop(ChessTeam.WHITE, StandardPosition.d1));
        board.attachChild(spatialFactory.createKnight(ChessTeam.WHITE, StandardPosition.e1));
        board.attachChild(spatialFactory.createRook(ChessTeam.WHITE, StandardPosition.f1));
        board.attachChild(spatialFactory.createUnicorn(ChessTeam.WHITE, StandardPosition.g1));

        board.attachChild(spatialFactory.createPawn(ChessTeam.BLACK, StandardPosition.a2));
        board.attachChild(spatialFactory.createQueen(ChessTeam.BLACK, StandardPosition.b2));
        board.attachChild(spatialFactory.createKing(ChessTeam.BLACK, StandardPosition.c2));
        board.attachChild(spatialFactory.createBishop(ChessTeam.BLACK, StandardPosition.d2));
        board.attachChild(spatialFactory.createKnight(ChessTeam.BLACK, StandardPosition.e2));
        board.attachChild(spatialFactory.createRook(ChessTeam.BLACK, StandardPosition.f2));
        board.attachChild(spatialFactory.createUnicorn(ChessTeam.BLACK, StandardPosition.g2));
    }
}
