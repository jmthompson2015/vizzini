package org.vizzini.illyriad.robot.inventory;

import java.io.File;

import org.vizzini.illyriad.FileUtilities;

/**
 * Provides location constants.
 */
public final class Locations
{
    /** User directory. */
    static final File USER_DIR;

    static
    {
        final FileUtilities fileUtils = new FileUtilities();
        final String userDir = fileUtils.getUserDir();

        USER_DIR = new File(userDir);

        System.out.println("USER_DIR = [" + USER_DIR + "]");
    }

    /** Trained neural network filename. */
    private static final String NEURAL_NETWORK_FILENAME = "neuralNetworkAppliance.txt";

    /** Inventory data trained neural network input directory. */
    private static final File NEURAL_NETWORK_INPUT_DIR = new File(USER_DIR, "illyriad/src/main/resources/inventoryData");

    /** Inventory data trained neural network input filepath. */
    static final File NEURAL_NETWORK_INPUT_FILEPATH = new File(NEURAL_NETWORK_INPUT_DIR, NEURAL_NETWORK_FILENAME);

    /** Inventory data directory. */
    static final File INVENTORY_DATA_DIR = new File(USER_DIR, "inventoryData");

    /** Captured images directory. */
    static final File CAPTURED_IMAGES_DIR = new File(INVENTORY_DATA_DIR, "capturedImages");

    /** Count image rows directory. */
    static final File ROWS_DIR = new File(INVENTORY_DATA_DIR, "rows");

    /** Inventory data count images directory. */
    static final File COUNTS_DIR = new File(INVENTORY_DATA_DIR, "counts");

    /** Digit images directory. */
    static final File DIGITS_DIR = new File(INVENTORY_DATA_DIR, "digits");

    /** Trained neural network output directory. */
    private static final File NEURAL_NETWORK_OUTPUT_DIR = INVENTORY_DATA_DIR;

    /** Trained neural network output filepath. */
    static final File NEURAL_NETWORK_OUTPUT_FILEPATH = new File(NEURAL_NETWORK_OUTPUT_DIR, NEURAL_NETWORK_FILENAME);

    /** Inventory data filepath. */
    static final File INVENTORY_DATA_FILEPATH = new File(INVENTORY_DATA_DIR, "inventory.txt");
}
