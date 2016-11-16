package org.vizzini.illyriad.robot.inventory;

import java.awt.AWTException;
import java.awt.Toolkit;

import org.vizzini.illyriad.IngredientRecipeBuilder;
import org.vizzini.illyriad.ResourceIngredientCollection;

/**
 * Provides an inventory data agent.
 * <ul>
 * <li>Phase One: Capture data images.
 * <ol>
 * <li>Capture inventory data images from Illyriad.</li>
 * <li>Split images into digits. (needed for Phase Two)</li>
 * </ol>
 * </li>
 * <li>Phase Two (manual): Train neural network for OCR. (not always needed)
 * <ol>
 * <li>Classify digit images.</li>
 * <li>Train neural network on digit images.</li>
 * </ol>
 * </li>
 * <li>Phase Three: Process data images.
 * <ol>
 * <li>Perform OCR on inventory data images.</li>
 * <li>Write inventory report.</li>
 * </ol>
 * </li>
 * <li>Phase Four (manual): Process inventory data.
 * <ol>
 * <li>Use genetic algorithm to find best shipping routes.</li>
 * <li>Write shipping report.</li>
 * </ol>
 * </li>
 * </ul>
 */
public final class InventoryDataAgent
{
    /**
     * Application method.
     * 
     * @param args Application arguments.
     * @throws AWTException if the robot cannot be constructed.
     */
    public static void main(final String args[]) throws AWTException
    {
        final IngredientRecipeBuilder builder = new IngredientRecipeBuilder();
        builder.build();

        final InventoryDataAgent agent = new InventoryDataAgent(builder.getIngredientCollection());

        agent.run();

        Toolkit.getDefaultToolkit().beep();
    }

    /** Resource ingredient collection. */
    private final ResourceIngredientCollection ingredients;

    /**
     * Construct this object.
     * 
     * @param ingredients Resource ingredient collection.
     */
    @SuppressWarnings("hiding")
    public InventoryDataAgent(final ResourceIngredientCollection ingredients)
    {
        if (ingredients == null)
        {
            throw new IllegalArgumentException("ingredients is null");
        }

        this.ingredients = ingredients;
    }

    /**
     * Run.
     */
    public void run()
    {
        final PhaseOneAgent phaseOneAgent = new PhaseOneAgent(ingredients);
        phaseOneAgent.run();

        // Skip phase two. (assumes we have a trained neural network)

        final PhaseThreeAgent phaseThreeAgent = new PhaseThreeAgent(ingredients);
        phaseThreeAgent.run();
    }
}
