package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;
import java.net.URL;
import java.util.List;

import javax.swing.Icon;
import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JToggleButton;
import javax.swing.JToolBar;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Game;
import org.vizzini.starfightersquadrons.Phase;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEngine;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSGameInjector;
import org.vizzini.starfightersquadrons.SSPosition;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SquadBuilder;

/**
 * Provides a user interface for Starfighter Squadrons.
 */
public final class SSPanel extends JPanel
{
    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Logger. */
    private static final Logger LOGGER = LogManager.getLogger();

    /** Vertical gap. */
    private static final int VGAP = 5;

    /** Active token widget. */
    private final JLabel activeTokenUI;

    /** Agent factory. */
    private final SSAgentFactory agentFactory;

    /** Frame. */
    private final JFrame frame;

    /** Game. */
    private final Game game;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Main panel. */
    private final SSEnvironmentUI mainPanel;

    /** New game widget. */
    private NewGamePanel newGameUI;

    /** New button. */
    private JButton newButton;

    /** Phase widget. */
    private final JLabel phaseUI;

    /** Play/Pause button. */
    private JToggleButton playPauseButton;

    /** Round widget. */
    private final JLabel roundUI;

    /** Tool bar panel. */
    private final JPanel toolBarPanel;

    /**
     * Construct this object.
     *
     * @param frame Frame.
     */
    @SuppressWarnings("hiding")
    public SSPanel(final JFrame frame)
    {
        super();

        this.frame = frame;
        this.roundUI = new JLabel("0");
        this.phaseUI = new JLabel();
        this.activeTokenUI = new JLabel();
        this.agentFactory = new SSAgentFactory();

        final SSGameInjector gameInjector = new SSGameInjector();

        game = gameInjector.injectGame();

        setLayout(new BorderLayout());

        final JPanel panel = new JPanel(new BorderLayout());
        panel.add(createRoundPhasePanel(), BorderLayout.NORTH);
        mainPanel = createMainPanel();
        panel.add(mainPanel, BorderLayout.CENTER);

        toolBarPanel = createToolBarPanel();
        toolBarPanel.add(panel, BorderLayout.CENTER);

        add(toolBarPanel, BorderLayout.CENTER);

        setupNewGame();

        final SSEngine engine = (SSEngine)game.getEngine();
        final SSEnvironment environment = (SSEnvironment)game.getEnvironment();

        environment.addRoundListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Integer newValue = (Integer)event.getNewValue();

                if (newValue == null)
                {
                    roundUI.setText("");
                }
                else
                {
                    roundUI.setText(newValue.toString());
                }
            }
        });

        environment.addPhaseListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Phase newValue = (Phase)event.getNewValue();

                if (newValue == null)
                {
                    phaseUI.setText("");
                }
                else
                {
                    phaseUI.setText(newValue.toString());
                }
            }
        });

        environment.addActiveTokenListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final SSToken newValue = (SSToken)event.getNewValue();

                if (newValue == null)
                {
                    activeTokenUI.setText("");
                }
                else
                {
                    activeTokenUI.setText(newValue.getName());
                }
            }
        });

        // Listen for game over property changes.
        engine.addWinnerListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent event)
            {
                final Agent winner = (Agent)event.getNewValue();
                String message;
                final String title = "Game Over";

                if (winner == null)
                {
                    message = "Game is a draw.";
                    JOptionPane.showMessageDialog(frame, message, title, JOptionPane.INFORMATION_MESSAGE);
                }
                else
                {
                    message = winner.getName() + " won! ";
                    final ImageIcon image = imageUtils.createTeamIcon64((SSTeam)winner.getTeam());
                    JOptionPane.showMessageDialog(frame, message, title, JOptionPane.INFORMATION_MESSAGE, image);
                }
            }
        });
    }

    /**
     * @return the frame
     */
    public JFrame getFrame()
    {
        return frame;
    }

    /**
     * @return the game
     */
    public Game getGame()
    {
        return game;
    }

    /**
     * Start the game.
     */
    public void start()
    {
        new Thread()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void run()
            {
                try
                {
                    getGame().start();
                }
                catch (final Throwable e)
                {
                    LOGGER.error("Error in SSPanel.start().run()", e);
                    JOptionPane.showMessageDialog(SSPanel.this, "Exception thrown: " + e.getMessage());
                }
            }
        }.start();
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
    }

    /**
     * @return a new about action listener.
     */
    private ActionListener createAboutActionListener()
    {
        return new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent e)
            {
                final String description = "\n\nFor more information or to contribute, please see the open source project site at https://github.com/jmthompson2015/vizzini"
                        + "\n\nCopyright \u00A9 2004-2015 Vizzini.org. All rights reserved.\n\n";

                final String title = "About Vizzini Starfighter Squadrons";
                final Icon icon = imageUtils.createCupIcon();

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
    private SSEnvironmentUI createMainPanel()
    {
        final SSEngine engine = (SSEngine)game.getEngine();
        final SSEnvironment environment = (SSEnvironment)game.getEnvironment();

        return new SSEnvironmentUI(engine, environment);
    }

    /**
     * @return a new new action listener.
     */
    private ActionListener createNewActionListener()
    {
        return new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
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
     * @return a new button.
     */
    private JToggleButton createPlayPauseButton()
    {
        final JToggleButton answer = new JToggleButton();

        answer.setIcon(imageUtils.createPlayIcon());
        answer.setSelectedIcon(imageUtils.createPauseIcon());
        answer.setSelected(true);
        answer.addActionListener(new ActionListener()
        {
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final JToggleButton button = (JToggleButton)event.getSource();

                final SSEngine engine = (SSEngine)getGame().getEngine();

                if (button.isSelected())
                {
                    engine.resume();
                }
                else
                {
                    engine.pause();
                }
            }
        });

        return answer;
    }

    /**
     * @return a new round and phase panel.
     */
    private JPanel createRoundPhasePanel()
    {
        final JPanel answer = new JPanel(new FlowLayout(FlowLayout.LEFT, HGAP, VGAP));

        answer.add(new JLabel("Round:"));
        answer.add(roundUI);
        answer.add(new JLabel("Phase:"));
        answer.add(phaseUI);
        answer.add(new JLabel("Active Ship:"));
        answer.add(activeTokenUI);

        return answer;
    }

    /**
     * @return a new tool bar.
     */
    private JToolBar createToolBar()
    {
        newButton = createButton("New24.gif", "Start a new game", "New Game...", createNewActionListener());
        playPauseButton = createPlayPauseButton();

        final JButton aboutButton = createButton("About24.gif", "View information about this application.", "About",
                createAboutActionListener());

        final JToolBar answer = new JToolBar("Vizzini Tool Bar");

        answer.add(newButton);
        answer.add(playPauseButton);
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
    private SSEnvironmentUI getMainPanel()
    {
        return mainPanel;
    }

    /**
     * @param environment Environment.
     * @param tokens Tokens.
     */
    private void placeTokens(final SSEnvironment environment, final List<SSToken> tokens)
    {
        final boolean isImperial = tokens.get(0).getTeam() == SSTeam.IMPERIAL;

        final int size = tokens.size();
        final int dx = SSPosition.MAX_X / (size + 1);
        int i = 1;
        final int heading = isImperial ? 90 : -90;

        for (final SSToken token : tokens)
        {
            final Ship ship = token.getShip();
            final int x = i * dx;
            int y = (ship.getShipBase().getRectangle().height / 2);

            if (!isImperial)
            {
                y = SSPosition.MAX_Y - y;
            }

            final SSPosition position = new SSPosition(x, y, heading);
            environment.placeToken(position, token);
            i++;
        }
    }

    /**
     * Remove agents.
     */
    private void removeAgents()
    {
        final List<Agent> agents = getGame().getAgents();

        agents.clear();
    }

    /**
     * Setup a new game.
     */
    private void setupNewGame()
    {
        if (newGameUI == null)
        {
            newGameUI = new NewGamePanel(frame, agentFactory);
        }

        NewGamePanel.showDialog(this, newGameUI);

        final SSAgent imperialAgent = newGameUI.getFirstAgent();
        final SSAgent rebelAgent = newGameUI.getSecondAgent();

        final SSEnvironment environment = (SSEnvironment)getGame().getEnvironment();
        environment.clear();

        // Remove agents.
        removeAgents();

        // Add agents.
        addAgents(imperialAgent, rebelAgent);

        // Add Imperial tokens.
        SSToken.resetNextId();
        final SquadBuilder imperialSquadBuilder = newGameUI.getSelectedImperialSquadBuilder();
        LOGGER.debug("imperialSquadBuilder = " + imperialSquadBuilder);
        final SquadBuilder rebelSquadBuilder = newGameUI.getSelectedRebelSquadBuilder();
        LOGGER.debug("rebelSquadBuilder = " + rebelSquadBuilder);

        List<SSToken> imperialTokens;

        if (imperialSquadBuilder == null)
        {
            imperialTokens = imperialAgent.buildSquad();
        }
        else
        {
            imperialTokens = imperialSquadBuilder.buildSquad(imperialAgent);
        }

        List<SSToken> rebelTokens;

        if (rebelSquadBuilder == null)
        {
            rebelTokens = rebelAgent.buildSquad();
        }
        else
        {
            rebelTokens = rebelSquadBuilder.buildSquad(rebelAgent);
        }

        // Add tokens.
        placeTokens(environment, imperialTokens);
        placeTokens(environment, rebelTokens);

        environment.fireUpdateTrigger();
    }
}
