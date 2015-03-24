package org.vizzini.swingui.game.boardgame.chess;

import java.awt.Canvas;
import java.awt.Color;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.vizzini.chess.ChessAction;
import org.vizzini.chess.ChessEnvironment;
import org.vizzini.chess.ChessPosition;
import org.vizzini.chess.ChessToken;
import org.vizzini.chess.Dimensions;
import org.vizzini.chess.GameType;
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.BoardGamePosition;
import org.vizzini.swingui.game.boardgame.DefaultEnvironment3DUI;
import org.vizzini.swingui.game.boardgame.Environment3DUI;
import org.vizzini.swingui.game.boardgame.MaterialFactory;
import org.vizzini.swingui.game.boardgame.SpatialFactory;
import org.vizzini.swingui.game.boardgame.TextureMaterialFactory;

import com.jme3.app.SimpleApplication;
import com.jme3.collision.CollisionResults;
import com.jme3.input.KeyInput;
import com.jme3.input.MouseInput;
import com.jme3.input.controls.ActionListener;
import com.jme3.input.controls.AnalogListener;
import com.jme3.input.controls.KeyTrigger;
import com.jme3.input.controls.MouseButtonTrigger;
import com.jme3.light.AmbientLight;
import com.jme3.light.DirectionalLight;
import com.jme3.material.Material;
import com.jme3.math.ColorRGBA;
import com.jme3.math.FastMath;
import com.jme3.math.Quaternion;
import com.jme3.math.Ray;
import com.jme3.math.Vector2f;
import com.jme3.math.Vector3f;
import com.jme3.renderer.Camera;
import com.jme3.scene.Geometry;
import com.jme3.scene.Node;
import com.jme3.scene.Spatial;
import com.jme3.system.JmeCanvasContext;

/**
 * Provides an environment user interface for chess.
 */
public final class ChessEnvironmentUI extends SimpleApplication implements Environment3DUI
{
    /** Mouse clicked property name. */
    private static final String MOUSE_CLICKED_PROPERTY = "mouseClicked";

    /** Squares. */
    Node squaresNode;

    /** Action listener. */
    private final ActionListener actionListener = createActionListener();

    /** Analog listener. */
    private final AnalogListener analogListener = createAnalogListener();

    /** Board. */
    private Node board;

    /** Delegate. */
    private final Environment3DUI delegate;

    /** First square color. */
    private final ColorRGBA firstSquareColor;

    /** Game type. */
    private final GameType gameType;

    /** Material factory. */
    private MaterialFactory materialFactory;

    /** Chess position class. */
    private final Class<?> positionClass;

    /** Map of position to spatial. */
    private final Map<ChessPosition, Spatial> positionToSpatialMap = new HashMap<ChessPosition, Spatial>();

    /** Spatial object factory. */
    private ChessSpatialFactory spatialFactory;

    /** Tokens. */
    private Node tokensNode;

    /**
     * Construct this object.
     * 
     * @param environment Environment. (required)
     * @param gameType Game type. (required)
     * @param firstSquareColor First square color. (required)
     */
    @SuppressWarnings("hiding")
    public ChessEnvironmentUI(final ChessEnvironment environment, final GameType gameType,
            final ColorRGBA firstSquareColor)
    {
        if (environment == null)
        {
            throw new IllegalArgumentException("environment is null");
        }

        if (gameType == null)
        {
            throw new IllegalArgumentException("gameType is null");
        }

        if (firstSquareColor == null)
        {
            throw new IllegalArgumentException("firstSquareColor is null");
        }

        delegate = new DefaultEnvironment3DUI(environment);

        this.gameType = gameType;
        this.firstSquareColor = firstSquareColor;
        this.positionClass = environment.getPositionValues()[0].getClass();

        environment.addDoActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (Environment.DO_ACTION_PROPERTY.equals(event.getPropertyName()))
                {
                    clearHighlights();

                    final ChessAction action = (ChessAction)event.getNewValue();

                    if (action != null)
                    {
                        addHighlight(action.getFromPosition());
                        addHighlight(action.getToPosition());
                        playClick();
                    }

                    reconcileTokens();
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
    public void addTokenUIAt(final Position<?> position, final Token token)
    {
        final ChessPosition cPosition = (ChessPosition)position;

        final Spatial spatial = spatialFactory.createSpatial(position, token);

        positionToSpatialMap.put(cPosition, spatial);
        tokensNode.attachChild(spatial);
    }

    @Override
    public void clearHighlights()
    {
        delegate.clearHighlights();
    }

    @Override
    public AmbientLight createAmbientLight()
    {
        return delegate.createAmbientLight();
    }

    @Override
    public DirectionalLight createDirectionalLight()
    {
        return delegate.createDirectionalLight();
    }

    @Override
    public ChessEnvironment getEnvironment()
    {
        return (ChessEnvironment)delegate.getEnvironment();
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
    public MaterialFactory getMaterialFactory()
    {
        return materialFactory;
    }

    @Override
    public SpatialFactory getSpatialFactory()
    {
        return delegate.getSpatialFactory();
    }

    @Override
    public void initKeys()
    {
        // You can map one or several inputs to one named action
        inputManager.addMapping("Left", new KeyTrigger(KeyInput.KEY_J));
        inputManager.addMapping("Right", new KeyTrigger(KeyInput.KEY_L));
        inputManager.addMapping("Up", new KeyTrigger(KeyInput.KEY_I));
        inputManager.addMapping("Down", new KeyTrigger(KeyInput.KEY_K));
        inputManager.addMapping("Orient", new KeyTrigger(KeyInput.KEY_O));
        inputManager.addMapping("pick target", new MouseButtonTrigger(MouseInput.BUTTON_LEFT));

        // Add the names to the listener.
        inputManager.addListener(analogListener, "Left", "Right", "Up", "Down", "Orient");
        inputManager.addListener(actionListener, "pick target");
    }

    @Override
    public void playClick()
    {
        delegate.playClick();
    }

    @Override
    public synchronized void reconcileTokens()
    {
        if ((spatialFactory == null) || (tokensNode == null))
        {
            return;
        }

        for (final ChessPosition position : getEnvironment().getPositionValues())
        {
            final ChessToken token = (ChessToken)getEnvironment().getTokenAt(position);
            final Spatial tokenUI = positionToSpatialMap.get(position);

            if (token == null)
            {
                if (tokenUI != null)
                {
                    // Remove it.
                    removeTokenUIAt(position);
                }
            }
            else
            {
                if (tokenUI == null)
                {
                    // Add it.
                    addTokenUIAt(position, token);
                }
                else
                {
                    // Make sure the widget matches the token type.
                    final String name0 = token.getType().name().toLowerCase();
                    final String name1 = tokenUI.getName();

                    if (!name0.equals(name1))
                    {
                        System.out.println("mismatch between token and tokenUI: " + name0 + " " + name1);
                        removeTokenUIAt(position);
                        addTokenUIAt(position, token);
                    }
                }
            }
        }

        tokensNode.updateGeometricState();
    }

    @Override
    public void removeTokenUIAt(final Position<?> position)
    {
        final ChessPosition cPosition = (ChessPosition)position;
        final Spatial spatial = positionToSpatialMap.remove(cPosition);
        spatial.removeFromParent();
    }

    @Override
    public void simpleInitApp()
    {
        // Activate windowed input behavior.
        flyCam.setDragToRotate(true);
        inputManager.setCursorVisible(true);

        viewPort.setBackgroundColor(new ColorRGBA(0.7f, 0.9f, 1, 1));

        materialFactory = createMaterialFactory();
        spatialFactory = createSpatialFactory(gameType.getDimensions());
        board = (Node)spatialFactory.createBoard(assetManager);
        squaresNode = (Node)board.getChild("squares");
        tokensNode = (Node)board.getChild("tokens");

        rootNode.attachChild(board);
        rootNode.addLight(createDirectionalLight());
        rootNode.addLight(createAmbientLight());

        initKeys();

        reconcileTokens();
        setTheScene();
    }

    /**
     * @param file File.
     * @param rank Rank.
     * @param level Level.
     * 
     * @return the position.
     */
    ChessPosition findPositionFor(final int file, final int rank, final int level)
    {
        ChessPosition answer = null;
        try
        {
            final Method method = positionClass.getDeclaredMethod("findByCoordinates", int.class, int.class, int.class);
            answer = (ChessPosition)method.invoke(positionClass, file, rank, level);
        }
        catch (final SecurityException e)
        {
            throw new RuntimeException(e);
        }
        catch (final NoSuchMethodException e)
        {
            throw new RuntimeException(e);
        }
        catch (final IllegalArgumentException e)
        {
            throw new RuntimeException(e);
        }
        catch (final IllegalAccessException e)
        {
            throw new RuntimeException(e);
        }
        catch (final InvocationTargetException e)
        {
            throw new RuntimeException(e);
        }

        return answer;
    }

    /**
     * @return a new action listener.
     */
    private ActionListener createActionListener()
    {
        return new ActionListener()
        {
            @Override
            public void onAction(final String name, final boolean keyPressed, final float tpf)
            {
                if (name.equals("pick target"))
                {
                    // Reset results list.
                    final CollisionResults results = new CollisionResults();

                    // Convert screen click to 3d position
                    @SuppressWarnings("synthetic-access")
                    final Vector2f click2d = inputManager.getCursorPosition();
                    @SuppressWarnings("synthetic-access")
                    final Camera cam2 = cam;
                    final Vector3f click3d = cam2.getWorldCoordinates(new Vector2f(click2d.x, click2d.y), 0f).clone();
                    final Vector3f dir = cam2.getWorldCoordinates(new Vector2f(click2d.x, click2d.y), 1f)
                            .subtractLocal(click3d).normalizeLocal();

                    // Aim the ray from the clicked spot forwards.
                    final Ray ray = new Ray(click3d, dir);

                    // Collect intersections between ray and all nodes in results list.
                    squaresNode.collideWith(ray, results);

                    // Use the results -- we rotate the selected geometry.
                    if (results.size() > 0)
                    {
                        // The closest result is the target that the player picked:
                        final Geometry target = results.getClosestCollision().getGeometry();

                        // Here comes the action:
                        final int file = (Integer)target.getUserData("file");
                        final int rank = (Integer)target.getUserData("rank");
                        final int level = (Integer)target.getUserData("level");
                        final ChessPosition position = findPositionFor(file, rank, level);
                        // System.out.println("clicked on " + position);

                        // Notify property change listener(s)
                        final JmeCanvasContext canvasContext = (JmeCanvasContext)ChessEnvironmentUI.this.getContext();
                        final Canvas canvas = canvasContext.getCanvas();

                        final PropertyChangeEvent event1 = new PropertyChangeEvent(ChessEnvironmentUI.this,
                                MOUSE_CLICKED_PROPERTY, null, position);

                        for (final PropertyChangeListener pcListener : canvas.getPropertyChangeListeners())
                        {
                            pcListener.propertyChange(event1);
                        }
                    }
                }
            }
        };
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
                    setTheScene();
                }
            }
        };
    }

    /**
     * @return a new material factory.
     */
    private MaterialFactory createMaterialFactory()
    {
        // return new ColorMaterialFactory(assetManager, true, firstSquareColor);
        return new TextureMaterialFactory(assetManager, true, firstSquareColor);
    }

    /**
     * @param dimensions Dimensions.
     * 
     * @return a new spatial factory.
     */
    private ChessSpatialFactory createSpatialFactory(final Dimensions dimensions)
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
     * Orient and position the board.
     */
    private void setTheScene()
    {
        board.setLocalRotation(Quaternion.IDENTITY);
        board.rotate(-FastMath.HALF_PI, -FastMath.HALF_PI, 0);
        board.setLocalTranslation(0, 0, -5);

        cam.setLocation(new Vector3f(0, 0, 10));
        cam.lookAt(Vector3f.ZERO, Vector3f.UNIT_Y);
    }
}
