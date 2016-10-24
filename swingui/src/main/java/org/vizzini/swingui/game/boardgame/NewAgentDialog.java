package org.vizzini.swingui.game.boardgame;

import java.awt.Component;
import java.awt.GridLayout;
import java.util.List;

import javax.swing.BorderFactory;
import javax.swing.JComboBox;
import javax.swing.JDialog;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JTextField;

import org.vizzini.core.game.Agent;
import org.vizzini.core.game.Team;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides a dialog to select a new agent.
 * <p>
 * The dialog is shown with <code>
 * optionPane.getDialog().setVisible(true)</code> and brought to the front with <code>
 * optionPane.getDialog().toFront()</code>.
 * </p>
 */
public final class NewAgentDialog extends JOptionPane
{
    /**
     * Provides an agent panel.
     */
    private static final class AgentPanel extends JPanel
    {
        /** Agent factory. */
        private final AgentFactory agentFactory;

        /** Agent type widget. */
        private final JComboBox agentTypeUI;

        /** Name widget. */
        private final JTextField nameUI;

        /** Team. */
        private final Team team;

        /**
         * Construct this object.
         * 
         * @param team Team.
         * @param agentFactory Agent factory.
         * @param selectedIndex Initial type selected index.
         */
        @SuppressWarnings("hiding")
        public AgentPanel(final Team team, final AgentFactory agentFactory, final int selectedIndex)
        {
            super();

            this.team = team;
            this.agentFactory = agentFactory;

            this.nameUI = new JTextField(team.getName());
            this.agentTypeUI = createAgentTypeSelector(selectedIndex);

            setLayout(new GridLayout2(0, 2));

            setBorder(BorderFactory.createTitledBorder("Agent " + team.getName()));
            add(new JLabel("Name"));
            add(nameUI);
            add(new JLabel("Type"));
            add(agentTypeUI);
        }

        /**
         * @return a new agent.
         */
        public Agent getAgent()
        {
            final Class<?> agentType = getAgentType();
            final String agentName = nameUI.getText();

            return agentFactory.create(agentType, agentName, team);
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

    /** Agent Black widget. */
    private final AgentPanel firstAgentUI;

    /** Agent White widget. */
    private final AgentPanel secondAgentUI;

    /** Dialog which holds this option pane. */
    private JDialog dialog;

    /** Parent component. */
    private final Component parentComponent;

    /** Title. */
    private final String title;

    /**
     * Construct this object.
     * 
     * @param parentComponent The parent component.
     * @param agentFactory Agent factory.
     */
    @SuppressWarnings("hiding")
    public NewAgentDialog(final Component parentComponent, final AgentFactory agentFactory)
    {
        super();

        if (agentFactory == null)
        {
            throw new IllegalArgumentException("agentFactory is null");
        }

        this.parentComponent = parentComponent;
        this.title = "Create A New Agent";

        firstAgentUI = new AgentPanel(agentFactory.getFirstTeam(), agentFactory, agentFactory.getFirstSelectedIndex());
        secondAgentUI = new AgentPanel(agentFactory.getSecondTeam(), agentFactory,
                agentFactory.getSecondSelectedIndex());

        setMessage(new Object[] { createMainPanel() });
    }

    /**
     * @return the dialog for this option pane, creating it if necessary.
     */
    public JDialog getDialog()
    {
        if (dialog == null)
        {
            dialog = createDialog(parentComponent, title);
        }

        return dialog;
    }

    /**
     * @return the first agent.
     */
    public Agent getFirstAgent()
    {
        return firstAgentUI.getAgent();
    }

    /**
     * @return the second agent.
     */
    public Agent getSecondAgent()
    {
        return secondAgentUI.getAgent();
    }

    /**
     * @return a new main panel.
     */
    private JPanel createMainPanel()
    {
        final JPanel answer = new JPanel(new GridLayout(0, 1));

        answer.add(firstAgentUI);
        answer.add(secondAgentUI);

        return answer;
    }
}
