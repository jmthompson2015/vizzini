package org.vizzini.starfightersquadrons.swingui;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;

import javax.swing.GroupLayout;
import javax.swing.GroupLayout.Alignment;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;

/**
 * Provides a component which displays a count over an image.
 */
public final class CountImageUI extends JPanel
{
    /** Count. */
    private int count;

    /** Count widget. */
    private final JLabel countUI;

    /** Image widget. */
    private final JLabel imageUI;

    /** Preferred size. */
    private final Dimension preferredSize;

    /**
     * Construct this object.
     * 
     * @param count Count.
     * @param image Image.
     */
    @SuppressWarnings("hiding")
    public CountImageUI(final int count, final ImageIcon image)
    {
        super();

        imageUI = new JLabel(image);
        imageUI.setBounds(0, 0, image.getIconWidth(), image.getIconHeight());

        countUI = new JLabel(String.valueOf(count));
        countUI.setBounds(0, 0, image.getIconWidth(), image.getIconHeight());
        countUI.setForeground(Color.WHITE);
        final Font font = countUI.getFont();
        countUI.setFont(new Font(font.getName(), Font.BOLD, font.getSize()));

        final int size = Math.max(image.getIconWidth(), image.getIconHeight());

        final GroupLayout layout = new GroupLayout(this);
        layout.setHorizontalGroup(layout.createParallelGroup(Alignment.CENTER).addComponent(countUI)
                .addComponent(imageUI));
        layout.setVerticalGroup(layout.createParallelGroup(Alignment.CENTER).addComponent(countUI)
                .addComponent(imageUI));
        setLayout(layout);

        setOpaque(false);

        preferredSize = new Dimension(size, size);

        setCount(count);
    }

    /**
     * @return the count
     */
    public int getCount()
    {
        return count;
    }

    @Override
    public Dimension getPreferredSize()
    {
        return preferredSize;
    }

    /**
     * @param count the count to set
     */
    @SuppressWarnings("hiding")
    public void setCount(final int count)
    {
        this.count = count;

        if (count > 0)
        {
            countUI.setText(String.valueOf(count));
            imageUI.setEnabled(true);
        }
        else
        {
            countUI.setText("");
            imageUI.setEnabled(false);
        }
    }
}
