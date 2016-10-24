package org.vizzini.swingui;

import java.awt.Component;
import java.awt.Container;
import java.awt.Dimension;
import java.awt.GridLayout;
import java.awt.Insets;

/**
 * Provides a layout manager which extends GridLayout to allow columns of different widths or rows of different heights.
 * 
 * @see <a href="http://www.javaworld.com/article/2077486/core-java/java-tip-121--flex-your-grid-layout.html">Java Tip
 *      121: Flex your grid layout</a>
 */
public final class GridLayout2 extends GridLayout
{
    /**
     * Construct this object with the given parameters.
     * 
     * @param rows Number of rows, with the value zero meaning any number of rows.
     * @param cols Number of columns, with the value zero meaning any number of columns.
     */
    public GridLayout2(final int rows, final int cols)
    {
        this(rows, cols, 0, 0);
    }

    /**
     * Construct this object with the given parameters.
     * 
     * @param rows Number of rows, with the value zero meaning any number of rows.
     * @param cols Number of columns, with the value zero meaning any number of columns.
     * @param hgap Horizontal gap.
     * @param vgap Vertical gap.
     */
    public GridLayout2(final int rows, final int cols, final int hgap, final int vgap)
    {
        super(rows, cols, hgap, vgap);
    }

    @Override
    public void layoutContainer(final Container parent)
    {
        synchronized (parent.getTreeLock())
        {
            final Insets insets = parent.getInsets();
            final int ncomponents = parent.getComponentCount();
            int nrows = getRows();
            int ncols = getColumns();

            if (ncomponents == 0)
            {
                return;
            }

            if (nrows > 0)
            {
                ncols = ((ncomponents + nrows) - 1) / nrows;
            }
            else
            {
                nrows = ((ncomponents + ncols) - 1) / ncols;
            }

            final int hgap = getHgap();
            final int vgap = getVgap();

            // scaling factors
            final Dimension pd = preferredLayoutSize(parent);
            final double sw = (1.0 * parent.getWidth()) / pd.width;
            final double sh = (1.0 * parent.getHeight()) / pd.height;

            // scale
            final int[] w = new int[ncols];
            final int[] h = new int[nrows];

            for (int i = 0; i < ncomponents; i++)
            {
                final int r = i / ncols;
                final int c = i % ncols;
                final Component comp = parent.getComponent(i);
                final Dimension d = comp.getPreferredSize();
                d.width = (int)(sw * d.width);
                d.height = (int)(sh * d.height);

                if (w[c] < d.width)
                {
                    w[c] = d.width;
                }

                if (h[r] < d.height)
                {
                    h[r] = d.height;
                }
            }

            for (int c = 0, x = insets.left; c < ncols; c++)
            {
                for (int r = 0, y = insets.top; r < nrows; r++)
                {
                    final int i = (r * ncols) + c;

                    if (i < ncomponents)
                    {
                        parent.getComponent(i).setBounds(x, y, w[c], h[r]);
                    }

                    y += (h[r] + vgap);
                }

                x += (w[c] + hgap);
            }
        }
    }

    @Override
    public Dimension minimumLayoutSize(final Container parent)
    {
        synchronized (parent.getTreeLock())
        {
            final Insets insets = parent.getInsets();
            final int ncomponents = parent.getComponentCount();
            int nrows = getRows();
            int ncols = getColumns();

            if (nrows > 0)
            {
                ncols = ((ncomponents + nrows) - 1) / nrows;
            }
            else
            {
                nrows = ((ncomponents + ncols) - 1) / ncols;
            }

            final int[] w = new int[ncols];
            final int[] h = new int[nrows];

            for (int i = 0; i < ncomponents; i++)
            {
                final int r = i / ncols;
                final int c = i % ncols;
                final Component comp = parent.getComponent(i);
                final Dimension d = comp.getMinimumSize();

                if (w[c] < d.width)
                {
                    w[c] = d.width;
                }

                if (h[r] < d.height)
                {
                    h[r] = d.height;
                }
            }

            int nw = 0;

            for (int j = 0; j < ncols; j++)
            {
                nw += w[j];
            }

            int nh = 0;

            for (int i = 0; i < nrows; i++)
            {
                nh += h[i];
            }

            return new Dimension(insets.left + insets.right + nw + ((ncols - 1) * getHgap()), insets.top
                    + insets.bottom + nh + ((nrows - 1) * getVgap()));
        }
    }

    @Override
    public Dimension preferredLayoutSize(final Container parent)
    {
        synchronized (parent.getTreeLock())
        {
            final Insets insets = parent.getInsets();
            final int ncomponents = parent.getComponentCount();
            int nrows = getRows();
            int ncols = getColumns();

            if (nrows > 0)
            {
                ncols = ((ncomponents + nrows) - 1) / nrows;
            }
            else
            {
                nrows = ((ncomponents + ncols) - 1) / ncols;
            }

            final int[] w = new int[ncols];
            final int[] h = new int[nrows];

            for (int i = 0; i < ncomponents; i++)
            {
                final int r = i / ncols;
                final int c = i % ncols;
                final Component comp = parent.getComponent(i);
                final Dimension d = comp.getPreferredSize();

                if (w[c] < d.width)
                {
                    w[c] = d.width;
                }

                if (h[r] < d.height)
                {
                    h[r] = d.height;
                }
            }

            int nw = 0;

            for (int j = 0; j < ncols; j++)
            {
                nw += w[j];
            }

            int nh = 0;

            for (int i = 0; i < nrows; i++)
            {
                nh += h[i];
            }

            return new Dimension(insets.left + insets.right + nw + ((ncols - 1) * getHgap()), insets.top
                    + insets.bottom + nh + ((nrows - 1) * getVgap()));
        }
    }
}
