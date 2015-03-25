package org.vizzini.starfightersquadrons.swingui;

import java.awt.Dimension;
import java.awt.Rectangle;

import javax.swing.JDialog;
import javax.swing.JFrame;
import javax.swing.JOptionPane;

import org.vizzini.core.InputValidator;

/**
 * Provides a wrapper for an option pane which positions the pane's dialog.
 */
public final class PositionedDialog
{
    /** Option pane. */
    private final JOptionPane pane;

    /** Dialog. */
    private final JDialog dialog;

    /**
     * Construct this object.
     * 
     * @param parentComponent Parent component.
     * @param title Title.
     * @param message Message component.
     * @param optionType Option type.
     * @param messageType Message type.
     * @param y Y coordinate.
     */
    public PositionedDialog(final JFrame parentComponent, final String title, final Object message,
            final int optionType, final int messageType, final int y)
    {
        InputValidator.validateNotNull("parentComponent", parentComponent);
        InputValidator.validateNotEmpty("title", title);
        InputValidator.validateNotNull("message", message);

        pane = new JOptionPane(message, messageType, optionType);
        dialog = pane.createDialog(title);

        final Rectangle parentBounds = parentComponent.getBounds();
        final Dimension dialogSize = pane.getSize();
        final int x = (parentBounds.x + (parentBounds.width / 2)) - (dialogSize.width / 2);
        dialog.setLocation(x, y);
        dialog.setModal(true);
    }

    /**
     * Releases all of the native screen resources used by this Window, its subcomponents, and all of its owned
     * children.
     */
    public void dispose()
    {
        dialog.dispose();
    }

    /**
     * @return the result
     */
    public int getResult()
    {
        return (Integer)pane.getValue();
    }

    /**
     * Shows or hides this Dialog depending on the value of parameter b.
     * 
     * @param isVisible Flag indicating if this is visible.
     */
    public void setVisible(final boolean isVisible)
    {
        dialog.setVisible(isVisible);
    }
}
