package org.vizzini.swingui.game.cardgame.gin;

import java.awt.Component;
import java.awt.GridLayout;

import javax.swing.JDialog;
import javax.swing.JOptionPane;
import javax.swing.JPanel;

import org.vizzini.core.game.Agent;
import org.vizzini.example.cardgame.gin.GinTeam;

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
    /** Agent First widget. */
    private final AgentPanel agentFirstUI;

    /** Agent Second widget. */
    private final AgentPanel agentSecondUI;

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

        agentFirstUI = new AgentPanel(GinTeam.FIRST, agentFactory, 2);
        agentSecondUI = new AgentPanel(GinTeam.SECOND, agentFactory, 1);

        setMessage(new Object[] { createMainPanel() });
    }

    /**
     * @return agent first.
     */
    public Agent getAgentFirst()
    {
        return agentFirstUI.getAgent();
    }

    /**
     * @return agent second.
     */
    public Agent getAgentSecond()
    {
        return agentSecondUI.getAgent();
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
     * @return a new main panel.
     */
    private JPanel createMainPanel()
    {
        final JPanel answer = new JPanel(new GridLayout(0, 1));

        answer.add(agentFirstUI);
        answer.add(agentSecondUI);

        return answer;
    }
}
