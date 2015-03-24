package org.vizzini.swingui.game.boardgame.qubic;

import java.awt.Canvas;
import java.awt.Color;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Position;
import org.vizzini.core.game.Token;
import org.vizzini.core.game.boardgame.BoardGamePosition;
import org.vizzini.example.boardgame.qubic.QubicAction;
import org.vizzini.example.boardgame.qubic.QubicEnvironment;
import org.vizzini.example.boardgame.qubic.QubicPosition;
import org.vizzini.example.boardgame.qubic.QubicToken;
import org.vizzini.swingui.game.boardgame.ColorMaterialFactory;
import org.vizzini.swingui.game.boardgame.DefaultEnvironment3DUI;
import org.vizzini.swingui.game.boardgame.Environment3DUI;
import org.vizzini.swingui.game.boardgame.MaterialFactory;
import org.vizzini.swingui.game.boardgame.SpatialFactory;

import com.jme3.app.SimpleApplication;
import com.jme3.app.StatsAppState;
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
 * Provides an environment user interface for qubic.
 */
public final class QubicEnvironmentUI extends SimpleApplication implements Environment3DUI
{
    /** Default first square color. */
    private static final ColorRGBA DEFAULT_FIRST_SQUARE_COLOR = new ColorRGBA(0, 0.5f, 0, 0.5f);

    /** Default O token color. */
    private static final ColorRGBA DEFAULT_O_TOKEN_COLOR = ColorRGBA.Blue;

    /** Default second square color. */
    private static final ColorRGBA DEFAULT_SECOND_SQUARE_COLOR = new ColorRGBA(1, 1, 1, 0.5f);

    /** Default X token color. */
    private static final ColorRGBA DEFAULT_X_TOKEN_COLOR = ColorRGBA.Red;

    /** Mouse clicked property name. */
    private static final String MOUSE_CLICKED_PROPERTY = "mouseClicked";

    /** Squares. */
    Node squaresNode;

    /** Delegate. */
    private final Environment3DUI delegate;

    /** Action listener. */
    private final ActionListener actionListener = createActionListener();

    /** Analog listener. */
    private final AnalogListener analogListener = createAnalogListener();

    /** Board. */
    private Node board;

    /** Material factory. */
    private MaterialFactory materialFactory;

    /** Map of position to spatial. */
    private final Map<QubicPosition, Spatial> positionToSpatialMap = new HashMap<QubicPosition, Spatial>();

    /** Spatial object factory. */
    private QubicSpatialFactory spatialFactory;

    /** Tokens. */
    private Node tokensNode;

    /**
     * Construct this object.
     * 
     * @param environment Environment.
     */
    public QubicEnvironmentUI(final QubicEnvironment environment)
    {
        delegate = new DefaultEnvironment3DUI(environment);

        environment.addDoActionListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (Environment.DO_ACTION_PROPERTY.equals(event.getPropertyName()))
                {
                    clearHighlights();

                    final QubicAction action = (QubicAction)event.getNewValue();

                    if (action != null)
                    {
                        addHighlight(action.getPosition());
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
        final QubicPosition qPosition = (QubicPosition)position;

        final Spatial spatial = spatialFactory.createSpatial(qPosition, token);

        positionToSpatialMap.put(qPosition, spatial);
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
    public QubicEnvironment getEnvironment()
    {
        return (QubicEnvironment)delegate.getEnvironment();
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

        for (final QubicPosition position : QubicPosition.values())
        {
            final QubicToken token = getEnvironment().getTokenAt(position);
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
                    final String name0 = token.getTeam().getName();
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
        final QubicPosition qPosition = (QubicPosition)position;
        final Spatial spatial = positionToSpatialMap.remove(qPosition);
        spatial.removeFromParent();
    }

    @Override
    public void simpleInitApp()
    {
        // Remove the statistics display.
        stateManager.detach(stateManager.getState(StatsAppState.class));

        // Activate windowed input behavior.
        flyCam.setDragToRotate(true);
        inputManager.setCursorVisible(true);

        viewPort.setBackgroundColor(new ColorRGBA(0.7f, 0.9f, 1, 1));

        materialFactory = createMaterialFactory();
        spatialFactory = createSpatialFactory();
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
                        final QubicPosition position = QubicPosition.findByCoordinates(file, rank, level);

                        // Notify property change listener(s)
                        final JmeCanvasContext canvasContext = (JmeCanvasContext)QubicEnvironmentUI.this.getContext();
                        final Canvas canvas = canvasContext.getCanvas();

                        final PropertyChangeEvent event1 = new PropertyChangeEvent(QubicEnvironmentUI.this,
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
        return new ColorMaterialFactory(assetManager, true, DEFAULT_FIRST_SQUARE_COLOR, DEFAULT_SECOND_SQUARE_COLOR,
                DEFAULT_X_TOKEN_COLOR, DEFAULT_O_TOKEN_COLOR);
    }

    /**
     * @return a new spatial factory.
     */
    private QubicSpatialFactory createSpatialFactory()
    {
        final Material firstSquareMaterial = materialFactory.createFirstSquareMaterial();
        final Material secondSquareMaterial = materialFactory.createSecondSquareMaterial();
        final Material xTokenMaterial = materialFactory.createFirstTokenMaterial();
        final Material oTokenMaterial = materialFactory.createSecondTokenMaterial();

        final int fileCount = 4;
        final int rankCount = 4;
        final int levelCount = 4;

        return new DefaultQubicSpatialFactory(fileCount, rankCount, levelCount, firstSquareMaterial,
                secondSquareMaterial, xTokenMaterial, oTokenMaterial);
    }

    /**
     * Orient and position the board.
     */
    private void setTheScene()
    {
        board.setLocalRotation(Quaternion.IDENTITY);
        board.rotate(-FastMath.HALF_PI, -FastMath.HALF_PI, 0);
        board.setLocalTranslation(0, 0, -3);

        cam.setLocation(new Vector3f(0, 0, 10));
        cam.lookAt(Vector3f.ZERO, Vector3f.UNIT_Y);
    }
}
