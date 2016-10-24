package org.vizzini.swingui.game.cardgame.gin;

import java.awt.BorderLayout;
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
import org.vizzini.core.game.Environment;
import org.vizzini.core.game.Game;
import org.vizzini.core.game.SynchronousEngine;
import org.vizzini.example.cardgame.gin.GinEnvironment;
import org.vizzini.example.cardgame.gin.GinGameInjector;
import org.vizzini.example.cardgame.gin.GinTeam;

/**
 * Provides a user interface for gin.
 */
public final class GinPanel extends JPanel
{
    /** Agent factory. */
    private final AgentFactory agentFactory;

    /** Frame. */
    private final JFrame frame;

    /** Game. */
    private final Game game;

    /** Main panel. */
    private final GinEnvironmentUI mainPanel;

    /** New agent dialog. */
    private NewAgentDialog newAgentUI;

    /** New button. */
    private JButton newButton;

    /** Tool bar panel. */
    private final JPanel toolBarPanel;

    /**
     * Construct this object.
     * 
     * @param frame Frame.
     */
    @SuppressWarnings("hiding")
    public GinPanel(final JFrame frame)
    {
        this.frame = frame;

        final GinGameInjector gameInjector = new GinGameInjector();
        this.agentFactory = new AgentFactory();

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
                        final Environment environment = getGame().getEnvironment();
                        final GinTeam winnerTeam = (GinTeam)winner.getTeam();
                        final int winnerCount = environment.getTokenCountFor(winnerTeam);
                        final int loserCount = environment.getTokenCountFor(winnerTeam.opposite());
                        message = "Agent " + winner.getName() + " won! " + winnerCount + " to " + loserCount;
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
     * Setup a new game.
     */
    void setupNewGame()
    {
        if (newAgentUI == null)
        {
            newAgentUI = new NewAgentDialog(GinPanel.this, agentFactory);
        }

        newAgentUI.getDialog().setVisible(true);

        // Modal dialog blocks here until done.

        getGame().getEnvironment().clear();

        // Remove agents.
        removeAgents();

        // Add agents.
        addAgents(newAgentUI.getAgentFirst(), newAgentUI.getAgentSecond());
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

                final String title = "About Vizzini Gin";
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
    private GinEnvironmentUI createMainPanel()
    {
        final GinEnvironment environment = (GinEnvironment)game.getEnvironment();

        return new GinEnvironmentUI(environment);
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
     * @return the mainPanel
     */
    private GinEnvironmentUI getMainPanel()
    {
        return mainPanel;
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
        }

        agents.clear();
    }
}
