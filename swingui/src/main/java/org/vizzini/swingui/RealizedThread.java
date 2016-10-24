package org.vizzini.swingui;

import java.awt.Component;

/**
 * Provides a thread that waits until a component is realized, then performs an action. A subclass must override the
 * method <code>realized()</code> to provide the action.
 */
public abstract class RealizedThread extends Thread
{
    /** Component we're waiting on. */
    protected Component component;

    /** Sleep time between checks in milliseconds. */
    private int sleepTimeMillis = 100;

    /**
     * Construct this object.
     * 
     * @param component Component.
     */
    @SuppressWarnings("hiding")
    public RealizedThread(final Component component)
    {
        this.component = component;
    }

    /**
     * Construct this object.
     * 
     * @param component Component.
     * @param sleepTimeMillis Sleep time between checks in milliseconds.
     */
    @SuppressWarnings("hiding")
    public RealizedThread(final Component component, final int sleepTimeMillis)
    {
        this.component = component;
        this.sleepTimeMillis = sleepTimeMillis;
    }

    /**
     * Action to perform when the component is realized.
     */
    public abstract void realized();

    /**
     * Wait for the component to be realized, then call <code>realized()</code>.
     */
    @Override
    public void run()
    {
        while (true)
        {
            final java.awt.Dimension size = component.getSize();

            if ((size.width == 0) && (size.height == 0))
            {
                try
                {
                    sleep(sleepTimeMillis);
                }
                catch (final InterruptedException e)
                {
                    e.printStackTrace();
                }
            }
            else
            {
                realized();

                return;
            }
        }
    }
}
