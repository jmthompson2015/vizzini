package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Component;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.ArrayList;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.DefaultListModel;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JList;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.ListSelectionModel;
import javax.swing.SwingConstants;
import javax.swing.event.ListSelectionEvent;
import javax.swing.event.ListSelectionListener;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.Pilot;
import org.vizzini.starfightersquadrons.Ship;
import org.vizzini.starfightersquadrons.SquadStatistics;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.starfightersquadrons.SSToken;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to build a squad.
 */
public final class SquadBuilderPanel extends JPanel
{
    /**
     * Provides a wrapper for a pilot.
     */
    class PilotWrapper
    {
        /** Pilot. */
        private final Pilot pilot;

        /**
         * Construct this object.
         * 
         * @param pilot Pilot.
         */
        @SuppressWarnings("hiding")
        public PilotWrapper(final Pilot pilot)
        {
            InputValidator.validateNotNull("pilot", pilot);

            this.pilot = pilot;
        }

        /**
         * @return the pilot
         */
        public Pilot getPilot()
        {
            return pilot;
        }

        @Override
        public String toString()
        {
            final StringBuilder sb = new StringBuilder();

            sb.append(pilot.getSquadPointCost());
            sb.append(" ");
            sb.append(pilot.getName());

            return sb.toString();
        }
    }

    /**
     * Provides a wrapper for a ship.
     */
    class ShipWrapper
    {
        /** Ship. */
        private final Ship ship;

        /**
         * Construct this object.
         * 
         * @param ship Ship.
         */
        @SuppressWarnings("hiding")
        public ShipWrapper(final Ship ship)
        {
            InputValidator.validateNotNull("ship", ship);

            this.ship = ship;
        }

        /**
         * @return the ship
         */
        public Ship getShip()
        {
            return ship;
        }

        @Override
        public String toString()
        {
            return ship.getName();
        }
    }

    /**
     * Provides a wrapper for a token.
     */
    class TokenWrapper
    {
        /** Token. */
        private final SSToken token;

        /**
         * Construct this object.
         * 
         * @param token Token.
         */
        @SuppressWarnings("hiding")
        public TokenWrapper(final SSToken token)
        {
            InputValidator.validateNotNull("token", token);

            this.token = token;
        }

        /**
         * @return the token
         */
        public SSToken getToken()
        {
            return token;
        }

        @Override
        public String toString()
        {
            return token.getName();
        }
    }

    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Summation symbol. */
    private static final String SIGMA = "\u03A3";

    /** Vertical gap. */
    private static final int VGAP = 5;

    /**
     * @param parentComponent Parent component.
     * @param agent Agent.
     * 
     * @return a new modify attack dice action, or null.
     */
    public static List<SSToken> showDialog(final Component parentComponent, final SSAgent agent)
    {
        List<SSToken> answer = null;

        final String title = "Select Squad Members";
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;

        final SquadBuilderPanel message = new SquadBuilderPanel(agent);
        final int result = JOptionPane.showConfirmDialog(parentComponent, message, title, optionType, messageType);

        // Modal dialog blocks until done.

        if (result == JOptionPane.OK_OPTION)
        {
            answer = message.buildSquad();
        }

        return answer;
    }

    /** Add button. */
    private final JButton addButton = new JButton("Add >");

    /** Agent. */
    private final SSAgent agent;

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Pilot card widget holder. */
    private final JPanel pilotCardHolder = new JPanel();

    /** Pilot card widget. */
    private PilotCardUI pilotCardUI;

    /** Pilots widget. */
    private final JList pilotsUI = new JList(new DefaultListModel());

    /** Remove button. */
    private final JButton removeButton = new JButton("< Remove");

    /** Ship image widget. */
    private final JLabel shipImageUI = new JLabel();

    /** Ships widget. */
    private final JComboBox shipsUI;

    /** Squad list widget. */
    private final JList squadListUI = new JList(new DefaultListModel());

    /** Statistics holder. */
    private final JPanel statisticsHolder = new JPanel(new GridLayout2(0, 2, HGAP, VGAP));

    /** Statistics labels. */
    private final List<JLabel> statisticsLabels = new ArrayList<JLabel>();

    /**
     * Construct this object.
     * 
     * @param agent Agent.
     */
    @SuppressWarnings("hiding")
    public SquadBuilderPanel(final SSAgent agent)
    {
        super();

        InputValidator.validateNotNull("agent", agent);

        this.agent = agent;

        final Ship[] ships = Ship.valuesByTeam(getTeam());
        shipsUI = new JComboBox(wrapShips(ships));

        createStatisticsPanel();

        setLayout(new BorderLayout(HGAP, VGAP));
        add(createShipsAndPilotsPanel(), BorderLayout.WEST);
        add(createCenterPanel(), BorderLayout.CENTER);
        add(createSquadPanel(), BorderLayout.EAST);
    }

    /**
     * @return a collection of tokens.
     */
    public List<SSToken> buildSquad()
    {
        final List<SSToken> answer = new ArrayList<SSToken>();
        final DefaultListModel listModel = (DefaultListModel)squadListUI.getModel();

        final int size = listModel.getSize();

        for (int i = 0; i < size; i++)
        {
            final TokenWrapper wrapper = (TokenWrapper)listModel.get(i);
            final SSToken token = wrapper.getToken();
            answer.add(token);
        }

        return answer;
    }

    /**
     * Check the button enabled states.
     */
    private void checkButtons()
    {
        final PilotWrapper pilotWrapper = (PilotWrapper)pilotsUI.getSelectedValue();
        boolean isAddEnabled = false;

        if (pilotWrapper != null)
        {
            final Pilot pilot = pilotWrapper.getPilot();
            isAddEnabled = !pilot.isUnique() || (pilot.isUnique() && !squadListContains(pilot));
        }

        addButton.setEnabled(isAddEnabled);

        final boolean isRemoveEnabled = squadListUI.getSelectedValue() != null;

        removeButton.setEnabled(isRemoveEnabled);
    }

    /**
     * @return a new panel.
     */
    private JPanel createButtonPanel()
    {
        addButton.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                if (pilotCardUI != null)
                {
                    final SSToken token = pilotCardUI.getToken();

                    if (token != null)
                    {
                        final DefaultListModel listModel = (DefaultListModel)squadListUI.getModel();

                        if (!token.getPilot().isUnique() || (token.getPilot().isUnique() && !listModel.contains(token)))
                        {
                            listModel.addElement(new TokenWrapper(token));
                            updateStatistics();
                        }
                    }

                    checkButtons();
                }
            }
        });

        removeButton.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final TokenWrapper wrapper = (TokenWrapper)squadListUI.getSelectedValue();

                if (wrapper != null)
                {
                    final DefaultListModel listModel = (DefaultListModel)squadListUI.getModel();
                    listModel.removeElement(wrapper);
                    updateStatistics();
                }

                checkButtons();
            }
        });

        final JPanel answer = new JPanel();

        answer.setLayout(new GridLayout2(0, 1, HGAP, VGAP));
        answer.add(addButton);
        answer.add(removeButton);

        // Initialize.
        checkButtons();

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createCenterPanel()
    {
        final JPanel buttonPanel = createButtonPanel();

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));

        answer.add(pilotCardHolder);
        answer.add(wrap(buttonPanel));

        // Set width to handle the longest pilot name.
        answer.setPreferredSize(new Dimension(220, answer.getPreferredSize().height));

        return answer;
    }

    /**
     * @param value Value.
     * 
     * @return a new label.
     */
    private JLabel createRightAlignedLabel(final int value)
    {
        final JLabel answer = new JLabel(String.valueOf(value));

        answer.setHorizontalAlignment(SwingConstants.RIGHT);
        answer.setHorizontalTextPosition(SwingConstants.RIGHT);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createShipsAndPilotsPanel()
    {
        pilotsUI.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        shipsUI.addActionListener(new ActionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void actionPerformed(final ActionEvent event)
            {
                final JComboBox comboBox = (JComboBox)event.getSource();
                final ShipWrapper wrapper = (ShipWrapper)comboBox.getSelectedItem();
                final Ship ship = wrapper.getShip();

                // Update image.
                shipImageUI.setIcon(imageUtils.createShipIcon(ship));

                // Update pilots.
                final DefaultListModel listModel = (DefaultListModel)pilotsUI.getModel();
                populateListModel(listModel, Pilot.valuesByShip(ship));
                pilotsUI.setSelectedIndex(0);

                checkButtons();
            }
        });

        pilotsUI.addListSelectionListener(new ListSelectionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void valueChanged(final ListSelectionEvent event)
            {
                final JList list = (JList)event.getSource();
                final PilotWrapper wrapper = (PilotWrapper)list.getSelectedValue();
                pilotCardHolder.removeAll();

                if (wrapper != null)
                {
                    final SSToken token = new SSToken(wrapper.getPilot(), agent);
                    pilotCardUI = new PilotCardUI(token);
                    pilotCardHolder.add(pilotCardUI);
                }

                pilotCardHolder.revalidate();
                pilotCardHolder.repaint();

                // Enable the add button.
                checkButtons();
            }
        });

        final JPanel comboBoxPanel = new JPanel(new GridLayout2(1, 0, HGAP, VGAP));

        comboBoxPanel.add(shipImageUI);
        comboBoxPanel.add(shipsUI);

        final JPanel pilotPanel = new JPanel(new BorderLayout(HGAP, VGAP));

        pilotPanel.add(new JLabel("Pilots"), BorderLayout.NORTH);
        pilotPanel.add(new JScrollPane(pilotsUI), BorderLayout.CENTER);

        final JPanel answer = new JPanel(new BorderLayout(HGAP, VGAP));

        answer.add(comboBoxPanel, BorderLayout.NORTH);
        answer.add(pilotPanel, BorderLayout.CENTER);

        // Initialize.
        final Ship[] ships = Ship.valuesByTeam(getTeam());
        shipImageUI.setIcon(imageUtils.createShipIcon(ships[0]));
        shipsUI.setSelectedItem(ships[0]);
        final DefaultListModel listModel = (DefaultListModel)pilotsUI.getModel();
        populateListModel(listModel, Pilot.valuesByShip(ships[0]));
        pilotsUI.setSelectedIndex(0);

        return answer;
    }

    /**
     * @return a new panel.
     */
    private JPanel createSquadPanel()
    {
        squadListUI.setSelectionMode(ListSelectionModel.SINGLE_SELECTION);

        squadListUI.addListSelectionListener(new ListSelectionListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void valueChanged(final ListSelectionEvent event)
            {
                // Enable the remove button.
                checkButtons();
            }
        });

        statisticsHolder.setBorder(BorderFactory.createTitledBorder("Statistics"));

        final JPanel answer = new JPanel(new GridLayout2(0, 1, HGAP, VGAP));

        answer.add(new JLabel("Squad List"));
        answer.add(new JScrollPane(squadListUI));
        answer.add(statisticsHolder);

        // Initialize.
        updateStatistics();

        return answer;
    }

    /**
     * Update the contents of the statistics panel.
     */
    private void createStatisticsPanel()
    {
        for (int i = 0; i < 6; i++)
        {
            statisticsLabels.add(createRightAlignedLabel(0));
        }

        int i = 0;

        statisticsHolder.add(new JLabel(SIGMA + "(Pilot Skill)"));
        statisticsHolder.add(statisticsLabels.get(i++));
        statisticsHolder.add(new JLabel(SIGMA + "(Primary Weapon)"));
        statisticsHolder.add(statisticsLabels.get(i++));
        statisticsHolder.add(new JLabel(SIGMA + "(Agility)"));
        statisticsHolder.add(statisticsLabels.get(i++));
        statisticsHolder.add(new JLabel(SIGMA + "(Hull)"));
        statisticsHolder.add(statisticsLabels.get(i++));
        statisticsHolder.add(new JLabel(SIGMA + "(Shield)"));
        statisticsHolder.add(statisticsLabels.get(i++));
        statisticsHolder.add(new JLabel(SIGMA + "(Squad Points)"));
        statisticsHolder.add(statisticsLabels.get(i++));
    }

    /**
     * @return the team
     */
    private SSTeam getTeam()
    {
        return (SSTeam)agent.getTeam();
    }

    /**
     * @param listModel List model.
     * @param pilots Pilots.
     */
    private void populateListModel(final DefaultListModel listModel, final Pilot[] pilots)
    {
        final PilotWrapper[] wrappers = wrapPilots(pilots);

        listModel.removeAllElements();

        for (final PilotWrapper wrapper : wrappers)
        {
            listModel.addElement(wrapper);
        }
    }

    /**
     * @param pilot Pilot.
     * 
     * @return true if the squad list contains a token for the given pilot.
     */
    private boolean squadListContains(final Pilot pilot)
    {
        boolean answer = false;

        final DefaultListModel squadListModel = (DefaultListModel)squadListUI.getModel();
        final int size = squadListModel.getSize();

        for (int i = 0; i < size; i++)
        {
            final TokenWrapper wrapper = (TokenWrapper)squadListModel.get(i);
            if (wrapper.getToken().getPilot() == pilot)
            {
                answer = true;
                break;
            }
        }

        return answer;
    }

    /**
     * Update the contents of the statistics panel.
     */
    private void updateStatistics()
    {
        final SquadStatistics statistics = new SquadStatistics(buildSquad());

        int i = 0;

        statisticsLabels.get(i++).setText(String.valueOf(statistics.getPilotSkillValue()));
        statisticsLabels.get(i++).setText(String.valueOf(statistics.getPrimaryWeaponValue()));
        statisticsLabels.get(i++).setText(String.valueOf(statistics.getAgilityValue()));
        statisticsLabels.get(i++).setText(String.valueOf(statistics.getHullValue()));
        statisticsLabels.get(i++).setText(String.valueOf(statistics.getShieldValue()));
        statisticsLabels.get(i++).setText(String.valueOf(statistics.getSquadPointCost()));
    }

    /**
     * @param component Component.
     * 
     * @return a new panel which wraps the given component.
     */
    private JPanel wrap(final JComponent component)
    {
        final JPanel answer = new JPanel(new FlowLayout(FlowLayout.CENTER, 0, 0));

        answer.add(component);

        return answer;
    }

    /**
     * @param pilots Pilots.
     * 
     * @return a collection of pilot wrappers.
     */
    private PilotWrapper[] wrapPilots(final Pilot[] pilots)
    {
        final List<PilotWrapper> list = new ArrayList<PilotWrapper>();

        for (final Pilot pilot : pilots)
        {
            list.add(new PilotWrapper(pilot));
        }

        return list.toArray(new PilotWrapper[list.size()]);
    }

    /**
     * @param ships Ships.
     * 
     * @return a collection of ship wrappers.
     */
    private ShipWrapper[] wrapShips(final Ship[] ships)
    {
        final List<ShipWrapper> list = new ArrayList<ShipWrapper>();

        for (final Ship ship : ships)
        {
            list.add(new ShipWrapper(ship));
        }

        return list.toArray(new ShipWrapper[list.size()]);
    }
}
