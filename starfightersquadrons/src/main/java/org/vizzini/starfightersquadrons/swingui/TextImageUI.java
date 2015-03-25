package org.vizzini.starfightersquadrons.swingui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.GroupLayout;
import javax.swing.GroupLayout.Alignment;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

import org.vizzini.core.InputValidator;

/**
 * Provides a component which displays a text over an image.
 */
public final class TextImageUI extends JPanel
{
    /** Image widget. */
    private final JLabel imageUI;

    /** Preferred size. */
    private final Dimension preferredSize;

    /** Text widget. */
    private final JLabel textUI;

    /**
     * Construct this object.
     * 
     * @param text Text.
     * @param image Image.
     */
    public TextImageUI(final String text, final ImageIcon image)
    {
        super();

        InputValidator.validateNotEmpty("text", text);
        InputValidator.validateNotNull("image", image);

        imageUI = new JLabel(image);
        imageUI.setBounds(0, 0, image.getIconWidth(), image.getIconHeight());

        textUI = new JLabel(String.valueOf(text));
        textUI.setBounds(0, 0, image.getIconWidth(), image.getIconHeight());
        textUI.setForeground(Color.WHITE);
        final Font font = textUI.getFont();
        textUI.setFont(new Font(font.getName(), Font.BOLD, font.getSize()));

        final int size = Math.max(image.getIconWidth(), image.getIconHeight());

        final GroupLayout layout = new GroupLayout(this);
        layout.setHorizontalGroup(layout.createParallelGroup(Alignment.CENTER).addComponent(textUI)
                .addComponent(imageUI));
        layout.setVerticalGroup(layout.createParallelGroup(Alignment.CENTER).addComponent(textUI).addComponent(imageUI));
        setLayout(layout);

        setOpaque(false);

        preferredSize = new Dimension(size, size);
    }

    @Override
    public Dimension getPreferredSize()
    {
        return preferredSize;
    }
}
