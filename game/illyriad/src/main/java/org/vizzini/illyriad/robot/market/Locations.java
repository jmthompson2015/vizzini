package org.vizzini.illyriad.robot.market;

import java.io.File;

/**
 * Provides locations.
 */
public final class Locations
{
    /** User directory. */
    static final File USER_DIR;

    static
    {
        final String userDir = System.getProperty("user.dir");
        USER_DIR = new File(userDir);

        System.out.println("USER_DIR = [" + USER_DIR + "]");
    }

    /** Trained neural network filename. */
    static final String NEURAL_NETWORK_FILENAME = "neuralNetworkAppliance.txt";

    /** Market data directory. */
    static final File MARKET_DATA_DIR = new File(USER_DIR, "marketData");

    /** Market data captured images directory. */
    static final File CAPTURED_IMAGES_DIR = new File(MARKET_DATA_DIR, "capturedImages");

    /** Market data price images directory. */
    static final File ROWS_DIR = new File(MARKET_DATA_DIR, "rows");

    /** Market data price images directory. */
    static final File PRICES_DIR = new File(MARKET_DATA_DIR, "prices");

    /** Market data digit images directory. */
    static final File DIGITS_DIR = new File(MARKET_DATA_DIR, "digits");

    /** Market data filepath. */
    static final File MARKET_DATA_FILEPATH = new File(MARKET_DATA_DIR, "marketData.txt");

    /** Market data reports directory. */
    static final File REPORTS_DIR = MARKET_DATA_DIR;

    /** Market data trained neural network input directory. */
    private static final File NEURAL_NETWORK_INPUT_DIR = new File(USER_DIR, "illyriad/src/main/resources/marketData");

    /** Market data trained neural network input filepath. */
    static final File NEURAL_NETWORK_INPUT_FILEPATH = new File(NEURAL_NETWORK_INPUT_DIR, NEURAL_NETWORK_FILENAME);
}
