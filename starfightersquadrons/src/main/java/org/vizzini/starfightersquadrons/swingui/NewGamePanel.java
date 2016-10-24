package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.Component;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.Icon;
import javax.swing.JComboBox;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

import org.vizzini.core.InputValidator;
import org.vizzini.starfightersquadrons.CoreSetSquadBuilder;
import org.vizzini.starfightersquadrons.SquadBuilder;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSTeam;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a user interface to gather new game information.
 */
public final class NewGamePanel extends JPanel
{
    /**
     * Provides an agent panel.
     */
    private final class AgentPanel extends JPanel
    {
        /** Agent factory. */
        private final SSAgentFactory agentFactory;

        /** Agent type widget. */
        private final JComboBox agentTypeUI;

        /** Name widget. */
        private final JTextField nameUI;

        /** Team. */
        private final SSTeam team;

        /** Scenario chooser. */
        private final ScenarioChooser scenarioChooser;

        /**
         * Construct this object.
         * 
         * @param team Team.
         * @param agentFactory Agent factory.
         * @param selectedIndex Initial type selected index.
         */
        @SuppressWarnings({ "hiding", "synthetic-access" })
        public AgentPanel(final SSTeam team, final SSAgentFactory agentFactory, final int selectedIndex)
        {
            super();

            InputValidator.validateNotNull("team", team);
            InputValidator.validateNotNull("agentFactory", agentFactory);

            this.team = team;
            this.agentFactory = agentFactory;

            this.nameUI = new JTextField(team.getName() + " Agent");
            this.agentTypeUI = createAgentTypeSelector(selectedIndex);

            scenarioChooser = new ScenarioChooser(team);

            final JPanel namePanel = new JPanel(new GridLayout2(0, 2));
            namePanel.add(new JLabel("Name"));
            namePanel.add(nameUI);
            namePanel.add(new JLabel("Type"));
            namePanel.add(agentTypeUI);

            final JPanel namePanel2 = new JPanel(new BorderLayout(HGAP, VGAP));
            namePanel2.add(new JLabel(imageUtils.createTeamIcon36(team)), BorderLayout.WEST);
            namePanel2.add(namePanel, BorderLayout.CENTER);

            setLayout(new GridLayout2(0, 1));
            setBorder(BorderFactory.createTitledBorder(team.getName() + " Agent"));
            add(namePanel2);
            add(new JLabel("Squad Builder"));
            add(scenarioChooser);
        }

        /**
         * @return a new agent.
         */
        @SuppressWarnings("synthetic-access")
        public SSAgent getAgent()
        {
            final Class<?> agentType = getAgentType();
            final String agentName = nameUI.getText();
            SquadBuilder squadBuilder;

            if (team == SSTeam.IMPERIAL)
            {
                squadBuilder = getSelectedImperialSquadBuilder();
            }
            else
            {
                squadBuilder = getSelectedRebelSquadBuilder();
            }

            if (squadBuilder == null)
            {
                squadBuilder = (team == SSTeam.IMPERIAL) ? CoreSetSquadBuilder.createImperial()
                        : CoreSetSquadBuilder.createRebel();
            }

            return agentFactory.create(agentType, agentName, team, parentComponent, squadBuilder);
        }

        /**
         * @return the selectedSquadBuilder
         */
        public SquadBuilder getSelectedSquadBuilder()
        {
            return scenarioChooser.getSelectedSquadBuilder();
        }

        /**
         * @param selectedIndex Initial type selected index.
         * 
         * @return a new agent type selector.
         */
        private JComboBox createAgentTypeSelector(final int selectedIndex)
        {
            final JComboBox answer = new JComboBox();

            final List<Class<?>> agentTypes = agentFactory.getAgentTypes();

            for (final Class<?> type : agentTypes)
            {
                answer.addItem(new ClassWrapper(type));
            }

            answer.setSelectedIndex(selectedIndex);

            return answer;
        }

        /**
         * @return the agent type.
         */
        private Class<?> getAgentType()
        {
            final ClassWrapper classWrapper = (ClassWrapper)agentTypeUI.getSelectedItem();

            return classWrapper.getWrappedClass();
        }
    }

    /**
     * Provides a class wrapper.
     */
    private static final class ClassWrapper
    {
        /** Class. */
        private final Class<?> aClass;

        /**
         * Construct this object.
         * 
         * @param aClass Class.
         */
        @SuppressWarnings("hiding")
        public ClassWrapper(final Class<?> aClass)
        {
            this.aClass = aClass;
        }

        /**
         * @return a wrappedClass
         */
        public Class<?> getWrappedClass()
        {
            return aClass;
        }

        @Override
        public String toString()
        {
            return aClass.getSimpleName();
        }
    }

    /** Image utilities. */
    private final ImageUtilities imageUtils = new ImageUtilities();

    /** Horizontal gap. */
    private static final int HGAP = 5;

    /** Vertical gap. */
    private static final int VGAP = 5;

    /**
     * @param parentComponent Parent component.
     * @param newGameUI New game panel.
     */
    public static void showDialog(final Component parentComponent, final NewGamePanel newGameUI)
    {
        InputValidator.validateNotNull("newGameUI", newGameUI);

        final String title = "New Game";
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;
        final Icon icon = null;
        final String[] options = { "OK" };
        final String initialValue = null;

        JOptionPane.showOptionDialog(parentComponent, newGameUI, title, optionType, messageType, icon, options,
                initialValue);

        // Modal dialog blocks here until done.
    }

    /** First agent widget. */
    private final AgentPanel firstAgentUI;

    /** Parent component. */
    private final JFrame parentComponent;

    /** Second agent widget. */
    private final AgentPanel secondAgentUI;

    /**
     * Construct this object.
     * 
     * @param parentComponent Parent component.
     * @param agentFactory Agent factory.
     */
    @SuppressWarnings("hiding")
    public NewGamePanel(final JFrame parentComponent, final SSAgentFactory agentFactory)
    {
        super();

        InputValidator.validateNotNull("agentFactory", agentFactory);

        this.parentComponent = parentComponent;

        firstAgentUI = new AgentPanel(agentFactory.getFirstTeam(), agentFactory, agentFactory.getFirstSelectedIndex());
        secondAgentUI = new AgentPanel(agentFactory.getSecondTeam(), agentFactory,
                agentFactory.getSecondSelectedIndex());

        setLayout(new GridLayout2(1, 0, HGAP, VGAP));
        add(firstAgentUI);
        add(secondAgentUI);
    }

    /**
     * @return the first agent.
     */
    public SSAgent getFirstAgent()
    {
        return firstAgentUI.getAgent();
    }

    /**
     * @return the second agent.
     */
    public SSAgent getSecondAgent()
    {
        return secondAgentUI.getAgent();
    }

    /**
     * @return the selectedSquadBuilder
     */
    public SquadBuilder getSelectedImperialSquadBuilder()
    {
        return firstAgentUI.getSelectedSquadBuilder();
    }

    /**
     * @return the selectedSquadBuilder
     */
    public SquadBuilder getSelectedRebelSquadBuilder()
    {
        return secondAgentUI.getSelectedSquadBuilder();
    }
}
