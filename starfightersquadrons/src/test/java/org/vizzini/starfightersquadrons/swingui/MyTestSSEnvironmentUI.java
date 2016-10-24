package org.vizzini.starfightersquadrons.swingui;

import java.awt.BorderLayout;
import java.awt.EventQueue;

import javax.swing.JFrame;
import javax.swing.WindowConstants;

import org.vizzini.starfightersquadrons.SSEngine;
import org.vizzini.starfightersquadrons.SSEnvironment;
import org.vizzini.starfightersquadrons.SSGameInjector;
import org.vizzini.starfightersquadrons.TestData;

/**
 * Provides tests for the <code>SSEnvironmentUI</code> class.
 */
public final class MyTestSSEnvironmentUI extends JFrame
{
    /**
     * Application method.
     *
     * @param args Application arguments.
     */
    public static final void main(final String[] args)
    {
        EventQueue.invokeLater(new Runnable()
        {
            @Override
            public void run()
            {
                final MyTestSSEnvironmentUI app = new MyTestSSEnvironmentUI();
                app.setVisible(true);
            }
        });
    }

    /** Test data. */
    private final TestData testData = new TestData();

    /**
     * Construct this object.
     */
    public MyTestSSEnvironmentUI()
    {
        final SSGameInjector injector = new SSGameInjector();
        final SSEngine engine = injector.injectEngine();
        final SSEnvironment environment = testData.createEnvironment();
        final SSEnvironmentUI environmentUI = new SSEnvironmentUI(engine, environment);

        setTitle("Vizzini Starfighter Squadrons");
        setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
        getContentPane().add(environmentUI, BorderLayout.CENTER);
        pack();
        setLocationRelativeTo(null);
    }
}
