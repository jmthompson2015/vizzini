package org.vizzini.illyriad.robot.market;

import java.awt.AWTException;
import java.awt.Toolkit;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;

import org.vizzini.core.TimePrinter;
import org.vizzini.illyriad.ResourceCrafter;

/**
 * Provides an agent for collecting and reporting on Illyriad market data.
 */
public final class MarketDataAgent
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     * @throws AWTException if the robot cannot be constructed.
     */
    public static void main(final String args[]) throws AWTException
    {
        final long start = System.currentTimeMillis();

        final InputStream inputStream = ResourceReporter.class.getResourceAsStream("/marketData/marketData.txt");
        final Reader marketDataReader = new InputStreamReader(inputStream);
        final ResourceCrafter crafter = new ResourceCrafter(marketDataReader);

        final MarketDataAgent agent = new MarketDataAgent(crafter);

        agent.run();

        final long end = System.currentTimeMillis();
        new TimePrinter().printElapsedTime("MarketDataAgent", start, end);
        Toolkit.getDefaultToolkit().beep();
    }

    /** Resource crafter. */
    private final ResourceCrafter crafter;

    /**
     * Construct this object.
     * 
     * @param crafter Resource crafter.
     */
    @SuppressWarnings("hiding")
    public MarketDataAgent(final ResourceCrafter crafter)
    {
        if (crafter == null)
        {
            throw new IllegalArgumentException("crafter is null");
        }

        this.crafter = crafter;
    }

    /**
     * Run.
     */
    public void run()
    {
        // Capture market data images.
        final MacMarketDataRobot robot = new MacMarketDataRobot(crafter.getProductCollection());
        robot.reportMarketData();

        // Assume we have a trained neural network.

        final PhaseTwoAgent phaseTwoAgent = new PhaseTwoAgent(crafter);
        phaseTwoAgent.run();
    }
}
