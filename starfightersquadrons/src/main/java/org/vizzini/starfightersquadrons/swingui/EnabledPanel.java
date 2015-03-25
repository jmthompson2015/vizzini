package org.vizzini.starfightersquadrons.swingui;

import java.awt.Component;
import java.awt.Container;
import java.awt.LayoutManager;

import javax.swing.JPanel;

/**
 * Provides a panel whose components can be enabled/disabled.
 */
public class EnabledPanel extends JPanel
{
    /**
     * Construct this object.
     */
    public EnabledPanel()
    {
        super();
    }

    /**
     * Construct this object.
     * 
     * @param layout Layout.
     */
    public EnabledPanel(final LayoutManager layout)
    {
        super(layout);
    }

    @Override
    public void setEnabled(final boolean isEnabled)
    {
        setEnabled(this, isEnabled);

        super.setEnabled(isEnabled);
    }

    /**
     * Sets whether or not this component is enabled.
     * 
     * @param parentComponent Parent component.
     * @param isEnabled <code>true</code> if this component should be enabled, <code>false</code> otherwise.
     */
    private void setEnabled(final Container parentComponent, final boolean isEnabled)
    {
        for (final Component component : parentComponent.getComponents())
        {
            component.setEnabled(isEnabled);

            if (component instanceof Container)
            {
                setEnabled((Container)component, isEnabled);
            }
        }
    }
}
