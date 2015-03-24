package org.vizzini.swingui.game.boardgame.checkers;

import java.awt.BorderLayout;
import java.awt.Cursor;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.MouseListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.net.URL;
import java.util.List;

import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JToolBar;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.example.boardgame.checkers.CheckersActionGenerator;
import org.vizzini.example.boardgame.checkers.CheckersEnvironment;
import org.vizzini.example.boardgame.checkers.CheckersGameInjector;
import org.vizzini.example.boardgame.checkers.CheckersSearchAgent;
import org.vizzini.swingui.game.boardgame.AgentFactory;
import org.vizzini.swingui.game.boardgame.NewAgentDialog;

/**
 * Provides a user interface for checkers.
 */
public final class CheckersPanel extends JPanel
{
    /** Agent factory. */
    private final AgentFactory agentFactory;

    /** Busy property change listener. */
    private PropertyChangeListener busyListener;

    /** Frame. */
    private final JFrame frame;

    /** Game. */
    private final Game game;

    /** Main panel. */
    private final CheckersEnvironmentUI mainPanel;

    /** New agent dialog. */
    private NewAgentDialog newAgentUI;

    /** New button. */
    private JButton newButton;

    /** Previous cursor. */
    private Cursor previousCursor;

    /** Tool bar panel. */
    private final JPanel toolBarPanel;

    /**
     * Construct this object.
     * 
     * @param frame Frame.
     */
    @SuppressWarnings("hiding")
    public CheckersPanel(final JFrame frame)
    {
        this.frame = frame;

        final CheckersGameInjector gameInjector = new CheckersGameInjector();
        final CheckersActionGenerator actionGenerator = gameInjector.injectActionGenerator();
        this.agentFactory = new CheckersAgentFactory(actionGenerator);

        game = gameInjector.injectGame();

        setLayout(new BorderLayout());

        mainPanel = createMainPanel();

        toolBarPanel = createToolBarPanel();
        toolBarPanel.add(mainPanel, BorderLayout.CENTER);

        add(toolBarPanel, BorderLayout.CENTER);

        setupNewGame();

        // Listen for game over property changes.
        final SynchronousEngine engine = (SynchronousEngine)game.getEngine();
        engine.addPropertyChangeListener(new PropertyChangeListener()
        {
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                if (SynchronousEngine.WINNER_PROPERTY.equals(event.getPropertyName()))
                {
                    final Agent winner = (Agent)event.getNewValue();
                    String message;

                    if (winner == null)
                    {
                        message = "Game is a draw.";
                    }
                    else
                    {
                        message = "Agent " + winner.getName() + " won!";
                    }

                    final String title = "Game Over";
                    JOptionPane.showMessageDialog(frame, message, title, JOptionPane.INFORMATION_MESSAGE);
                }
            }
        });
    }

    /**
     * Start the game.
     */
    public void start()
    {
        new Thread()
        {
            @Override
            public void run()
            {
                getGame().start();
            }
        }.start();
    }

    /**
     * @param imageLocation Image location.
     * @param altText Alternate text.
     * 
     * @return a new image icon.
     */
    ImageIcon createImageIcon(final String imageLocation, final String altText)
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
     * @return the frame
     */
    JFrame getFrame()
    {
        return frame;
    }

    /**
     * @return the game
     */
    Game getGame()
    {
        return game;
    }

    /**
     * @return the mainPanel
     */
    CheckersEnvironmentUI getMainPanel()
    {
        return mainPanel;
    }

    /**
     * Set the cursor to busy depending upon the given state.
     * 
     * @param isBusy Flag indicating if the app is busy.
     */
    void setCursorBusy(final boolean isBusy)
    {
        Cursor newCursor;

        if (isBusy)
        {
            previousCursor = getCursor();
            newCursor = Cursor.getPredefinedCursor(Cursor.WAIT_CURSOR);
        }
        else
        {
            if (previousCursor != null)
            {
                newCursor = previousCursor;
                previousCursor = null;
            }
            else
            {
                newCursor = Cursor.getPredefinedCursor(Cursor.DEFAULT_CURSOR);
            }
        }

        setCursor(newCursor);
    }

    /**
     * Setup a new game.
     */
    void setupNewGame()
    {
        if (newAgentUI == null)
        {
            newAgentUI = new NewAgentDialog(CheckersPanel.this, agentFactory);
        }

        newAgentUI.getDialog().setVisible(true);

        // Modal dialog blocks here until done.

        getGame().getEnvironment().clear();

        // Remove agents.
        removeAgents();

        // Add agents.
        addAgents(newAgentUI.getFirstAgent(), newAgentUI.getSecondAgent());
    }

    /**
     * @param agentBlack Agent black.
     * @param agentWhite Agent white.
     */
    private void addAgents(final Agent agentBlack, final Agent agentWhite)
    {
        final List<Agent> agents = getGame().getAgents();

        agents.add(agentBlack);
        agents.add(agentWhite);

        for (final Agent agent : agents)
        {
            if (agent instanceof MouseListener)
            {
                getMainPanel().addMouseListener((MouseListener)agent);
            }
            else if (agent instanceof CheckersSearchAgent)
            {
                ((CheckersSearchAgent)agent).addPropertyChangeListener(getBusyListener());
            }
        }
    }

    /**
     * @return a new about action listener.
     */
    private ActionListener createAboutActionListener()
    {
        return new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                final String description = "\n\nFor more information or to contribute, please see the open source project site at http://code.google.com/p/vizzini/"
                        + "\n\nCopyright \u00A9 2014 Vizzini.org. All rights reserved.\n\n";

                final String title = "About Vizzini Checkers";
                final Icon icon = createImageIcon("game/cup48.jpg", "Vizzini.org");

                JOptionPane.showMessageDialog(getFrame(), description, title, JOptionPane.INFORMATION_MESSAGE, icon);
            }
        };
    }

    /**
     * @param imageName Image name.
     * @param toolTipText Tool tip text.
     * @param altText Alternate text.
     * @param actionListener Action listener.
     * 
     * @return a new button.
     */
    private JButton createButton(final String imageName, final String toolTipText, final String altText,
            final ActionListener actionListener)
    {
        // Look for the image.
        final String imgLocation = "game/" + imageName;
        final URL imageURL = getClass().getClassLoader().getResource(imgLocation);

        // Create and initialize the button.
        final JButton button = new JButton();
        button.setToolTipText(toolTipText);
        button.addActionListener(actionListener);

        if (imageURL != null)
        {
            // image found
            button.setIcon(new ImageIcon(imageURL, altText));
        }
        else
        {
            // no image found
            button.setText(altText);
            System.err.println("Resource not found: " + imgLocation);
        }

        return button;
    }

    /**
     * @return a new main panel.
     */
    private CheckersEnvironmentUI createMainPanel()
    {
        final CheckersEnvironment environment = (CheckersEnvironment)game.getEnvironment();
        final CheckersEnvironmentUI answer = new CheckersEnvironmentUI(environment);

        return answer;
    }

    /**
     * @return a new new action listener.
     */
    private ActionListener createNewActionListener()
    {
        return new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                setupNewGame();
                getMainPanel().repaint();
                start();
            }
        };
    }

    /**
     * @return a new tool bar.
     */
    private JToolBar createToolBar()
    {
        newButton = createButton("New24.gif", "Start a new game", "New Game...", createNewActionListener());

        final JButton aboutButton = createButton("About24.gif", "View information about this application.", "About",
                createAboutActionListener());

        final JToolBar answer = new JToolBar("Vizzini Tool Bar");

        answer.add(newButton);
        answer.addSeparator();
        answer.add(aboutButton);

        return answer;
    }

    /**
     * @return a new tool bar panel.
     */
    private JPanel createToolBarPanel()
    {
        final JPanel answer = new JPanel(new BorderLayout());

        answer.add(createToolBar(), BorderLayout.PAGE_START);

        return answer;
    }

    /**
     * @return a property change listener.
     */
    private PropertyChangeListener getBusyListener()
    {
        if (busyListener == null)
        {
            busyListener = new PropertyChangeListener()
            {
                @Override
                public void propertyChange(final PropertyChangeEvent event)
                {
                    if (CheckersSearchAgent.BUSY_PROPERTY.equals(event.getPropertyName()))
                    {
                        final boolean isBusy = (Boolean)event.getNewValue();
                        setCursorBusy(isBusy);
                    }
                }
            };
        }

        return busyListener;
    }

    /**
     * Remove agents.
     */
    private void removeAgents()
    {
        final List<Agent> agents = getGame().getAgents();

        for (final Agent agent : agents)
        {
            if (agent instanceof MouseListener)
            {
                getMainPanel().removeMouseListener((MouseListener)agent);
            }
            else if (agent instanceof CheckersSearchAgent)
            {
                ((CheckersSearchAgent)agent).removePropertyChangeListener(getBusyListener());
            }
        }

        agents.clear();
    }
}
