package org.vizzini.starfightersquadrons.swingui;

import java.awt.Dimension;
import java.awt.Frame;
import java.awt.Rectangle;
import java.awt.event.WindowAdapter;
import java.awt.event.WindowEvent;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.Icon;
import javax.swing.JDialog;
import javax.swing.JOptionPane;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.PlanningAction;
import org.vizzini.starfightersquadrons.SSAdjudicator;
import org.vizzini.starfightersquadrons.SSAgent;
import org.vizzini.starfightersquadrons.SSEnvironment;

/**
 * Provides a dialog to create the planning action.
 */
public final class PlanningDialog extends JDialog
{
    /** Option pane. */
    private final JOptionPane optionPane;

    /** Planning widget. */
    private final PlanningPanel planningUI;

    /**
     * Construct this object.
     * 
     * @param owner The <code>Frame</code> from which the dialog is displayed.
     * @param environment Environment.
     * @param adjudicator Adjudicator.
     * @param agent Agent.
     * @param y Y coordinate.
     */
    public PlanningDialog(final Frame owner, final SSEnvironment environment, final SSAdjudicator adjudicator,
            final SSAgent agent, final int y)
    {
        super(owner, "Plan Maneuvers", true);

        planningUI = new PlanningPanel(environment, adjudicator, agent);
        final int optionType = JOptionPane.OK_CANCEL_OPTION;
        final int messageType = JOptionPane.PLAIN_MESSAGE;
        final Icon icon = null;
        final String[] options = { "OK" };
        final String initialValue = options[0];

        optionPane = new JOptionPane(planningUI, messageType, optionType, icon, options, initialValue);
        setContentPane(optionPane);
        setDefaultCloseOperation(WindowConstants.DO_NOTHING_ON_CLOSE);
        addWindowListener(new WindowAdapter()
        {
            @Override
            public void windowClosing(final WindowEvent event)
            {
                // System.err.println("Thwarted user attempt to close window.");
            }
        });

        optionPane.addPropertyChangeListener(new PropertyChangeListener()
        {
            @SuppressWarnings("synthetic-access")
            @Override
            public void propertyChange(final PropertyChangeEvent e)
            {
                final String prop = e.getPropertyName();

                if (isVisible() && (e.getSource() == optionPane) && (prop.equals(JOptionPane.VALUE_PROPERTY)))
                {
                    // If you were going to check something before closing the window, you'd do it here.
                    if (planningUI.getPlanningAction() != null)
                    {
                        setVisible(false);
                        dispose();
                    }
                    else
                    {
                        // Reset the JOptionPane's value. If you don't do this, then if the user presses the same button
                        // next time, no property change event will be fired.
                        optionPane.setValue(JOptionPane.UNINITIALIZED_VALUE);
                    }
                }
            }
        });

        pack();

        final Rectangle parentBounds = owner.getBounds();
        final Dimension dialogSize = optionPane.getSize();
        final int x = (parentBounds.x + (parentBounds.width / 2)) - (dialogSize.width / 2);
        setLocation(x, y);
        setModal(true);
    }

    /**
     * @return a new planning action.
     */
    public PlanningAction getPlanningAction()
    {
        return planningUI.getPlanningAction();
    }
}
