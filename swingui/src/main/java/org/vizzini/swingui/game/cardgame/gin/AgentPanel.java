package org.vizzini.swingui.game.cardgame.gin;

import javax.swing.BorderFactory;
import javax.swing.JComboBox;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

import org.vizzini.core.game.Agent;
import org.vizzini.example.cardgame.gin.GinTeam;
import org.vizzini.example.cardgame.gin.MediumAgent;
import org.vizzini.example.cardgame.gin.SimpleAgent;
import org.vizzini.swingui.GridLayout2;

/**
 * Provides an agent panel.
 */
public final class AgentPanel extends JPanel
{
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

    /** Agent factory. */
    private final AgentFactory agentFactory;

    /** Agent type widget. */
    private final JComboBox agentTypeUI;

    /** Name widget. */
    private final JTextField nameUI;

    /** Team. */
    private final GinTeam team;

    /**
     * Construct this object.
     * 
     * @param team Team.
     * @param agentFactory Agent factory.
     * @param selectedIndex Initial type selected index.
     */
    @SuppressWarnings("hiding")
    public AgentPanel(final GinTeam team, final AgentFactory agentFactory, final int selectedIndex)
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

        answer.addItem(new ClassWrapper(SimpleAgent.class));
        answer.addItem(new ClassWrapper(MediumAgent.class));
        answer.addItem(new ClassWrapper(MouseAgent.class));

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
