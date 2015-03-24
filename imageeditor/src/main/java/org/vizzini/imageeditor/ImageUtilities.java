package org.vizzini.imageeditor;

import java.net.URL;

import javax.swing.ImageIcon;

/**
 * Provides utilities for working with images.
 */
public final class ImageUtilities
{
    /**
     * @return a new image icon.
     */
    public ImageIcon createOpenIcon()
    {
        return createImageIcon("Open24.gif", "Open");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createSaveAsIcon()
    {
        return createImageIcon("SaveAs24.gif", "Save As");
    }

    /**
     * @return a new image icon.
     */
    public ImageIcon createSaveIcon()
    {
        return createImageIcon("Save24.gif", "Save");
    }

    /**
     * @param imageLocation Image location.
     * @param description Description.
     * 
     * @return a new image icon.
     */
    private ImageIcon createImageIcon(final String imageLocation, final String description)
    {
        ImageIcon answer = null;

        final URL imageUrl = getClass().getClassLoader().getResource(imageLocation);

        if (imageUrl != null)
        {
            answer = new ImageIcon(imageUrl, description);
        }

        return answer;
    }
}
