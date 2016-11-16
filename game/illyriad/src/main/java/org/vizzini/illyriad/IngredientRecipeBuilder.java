package org.vizzini.illyriad;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.Reader;
import java.io.StringReader;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.vizzini.core.crafting.Component;
import org.vizzini.core.crafting.DefaultComponent;

/**
 * Provides a builder for ingredients and recipes.
 */
public final class IngredientRecipeBuilder
{
    /** Basic numbers. */
    private static final List<Integer> BASICS = Arrays.asList(new Integer[] { 183, // Gold
            17, // Wood
            1000, // Clay?
            21, // Iron
            1001, // Stone?
            1002, // Food?
            295, // Mana
            296, // Research
            1003, // Livestock?
            1004, // Saddle?
            1005, // Book?
            1007, // Siege Block?
    });

    /** Beverage numbers. */
    private static final List<Integer> BEVERAGES = Arrays.asList(new Integer[] { 1006, // Beer?
            420, // Wine
    });

    /** Bow numbers. */
    private static final List<Integer> BOWS = new ArrayList<Integer>();

    /** Herb numbers. */
    private static final List<Integer> HERBS = Arrays.asList(new Integer[] {
            416, // Herb
            246, 231, 227, 250, 243, 252, 233, 232, 239, 251, 235, 226, 225, 229, 236, 224, 230, 248, 247, 241, 245,
            244, 237, 249, 242, 238, 240, 234, 228, // original
            253, // Grapes
    });

    /** Mineral numbers. */
    private static final List<Integer> MINERALS = Arrays.asList(new Integer[] { 417, // Mineral
            202, 205, 211, 193, 199, 203, 195, 194, 200, 204, 208, 210, 209, 207, 196, 198, 206, 212, 201, 197 });

    /** Mount numbers. */
    private static final List<Integer> MOUNTS = Arrays.asList(new Integer[] { 1, // Horse
            33, 36, 34, 37, 35, 422, 423, 424, 425 });

    /** Plural ingredient names. */
    private static final List<String> PLURAL_INGREDIENT_NAMES = Arrays.asList(new String[] { "Bows", "Horses",
            "Spears", "Swords", });

    /** Sword numbers. */
    private static final List<Integer> SWORDS = new ArrayList<Integer>();

    static
    {
        BOWS.add(4); // Bow
        BOWS.add(67);
        BOWS.add(68);
        BOWS.add(76);

        for (int i = 69; i < 90; i++)
        {
            if (i != 76)
            {
                BOWS.add(i);
            }
        }
    }

    static
    {
        SWORDS.add(3); // Sword

        for (int i = 40; i < 66; i++)
        {
            if (i != 49)
            {
                SWORDS.add(i);
            }
        }

        SWORDS.add(49);
        SWORDS.add(1100); // Soul-Forged Blade?
    }

    /**
     * Application method.
     * 
     * @param args Application arguments.
     */
    public static void main(final String[] args)
    {
        final IngredientRecipeBuilder builder = new IngredientRecipeBuilder();

        builder.build();
    }

    /** Resource ingredient registry. */
    private final ResourceIngredientRegistry ingredientRegistry = new ResourceIngredientRegistry();

    /** .js file reader. */
    private final Reader jsFileReader;

    /** Resource recipe registry. */
    private final ResourceRecipeRegistry recipeRegistry = new ResourceRecipeRegistry();

    /**
     * Construct this object.
     */
    public IngredientRecipeBuilder()
    {
        this(new InputStreamReader(IngredientRecipeBuilder.class.getClassLoader().getResourceAsStream("crafting.js")));
    }

    /**
     * Construct this object.
     * 
     * @param jsFileReader .js file reader.
     */
    @SuppressWarnings("hiding")
    public IngredientRecipeBuilder(final Reader jsFileReader)
    {
        this.jsFileReader = jsFileReader;
    }

    /**
     * Build.
     * 
     * @return this object.
     */
    public IngredientRecipeBuilder build()
    {
        return build(false);
    }

    /**
     * @param isVerbose Flag indicating whether to provide output.
     * 
     * @return this object.
     */
    public IngredientRecipeBuilder build(final boolean isVerbose)
    {
        // Read js file.
        final FileUtilities fileUtils = new FileUtilities();
        final String jsFileContent = fileUtils.readContent(jsFileReader);

        // Create ingredients.
        loadResourceIngredients(isVerbose, jsFileContent);

        // Create recipes.
        loadResourceRecipes(isVerbose, jsFileContent);

        return this;
    }

    /**
     * @return the ingredientCollection
     */
    public ResourceIngredientCollection getIngredientCollection()
    {
        return ingredientRegistry.getCollection();
    }

    /**
     * @return the recipeCollection
     */
    public ResourceRecipeCollection getRecipeCollection()
    {
        return recipeRegistry.getCollection();
    }

    /**
     * Add additional ingredients.
     */
    private void addAdditionalIngredients()
    {
        ingredientRegistry.getInstance(1000, "Clay", ResourceType.BASIC);
        ingredientRegistry.getInstance(1001, "Stone", ResourceType.BASIC);
        ingredientRegistry.getInstance(1002, "Food", ResourceType.BASIC);
        ingredientRegistry.getInstance(1003, "Livestock", ResourceType.BASIC);
        ingredientRegistry.getInstance(1004, "Saddle", ResourceType.BASIC);
        ingredientRegistry.getInstance(1005, "Book", ResourceType.BASIC);
        ingredientRegistry.getInstance(1006, "Beer", ResourceType.BEVERAGE);
        ingredientRegistry.getInstance(1007, "Siege Block", ResourceType.BASIC);
        ingredientRegistry.getInstance(1100, "Soul-Forged Blade", ResourceType.SWORD);
    }

    /**
     * Add additional recipes.
     */
    private void addAdditionalRecipes()
    {
        final ResourceIngredientCollection ingredients = getIngredientCollection();

        final ResourceIngredient gold = ingredients.findByName("Gold");
        final ResourceIngredient wood = ingredients.findByName("Wood");
        final ResourceIngredient clay = ingredients.findByName("Clay");
        final ResourceIngredient iron = ingredients.findByName("Iron");
        final ResourceIngredient stone = ingredients.findByName("Stone");
        final ResourceIngredient food = ingredients.findByName("Food");
        final ResourceIngredient livestock = ingredients.findByName("Livestock");

        {
            // Livestock
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(20, wood));
            list.add(new DefaultComponent<ResourceIngredient>(40, food));
            list.add(new DefaultComponent<ResourceIngredient>(5, gold));
            recipeRegistry.getInstance(1003, "Livestock", list);
        }
        {
            // Saddle
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(10, wood));
            list.add(new DefaultComponent<ResourceIngredient>(5, clay));
            list.add(new DefaultComponent<ResourceIngredient>(10, iron));
            list.add(new DefaultComponent<ResourceIngredient>(2, livestock));
            list.add(new DefaultComponent<ResourceIngredient>(5, gold));
            recipeRegistry.getInstance(1004, "Saddle", list);
        }
        {
            // Book
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(30, wood));
            list.add(new DefaultComponent<ResourceIngredient>(25, ingredients.findByName("Research")));
            list.add(new DefaultComponent<ResourceIngredient>(5, gold));
            recipeRegistry.getInstance(1005, "Book", list);
        }
        {
            // Beer
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(10, wood));
            list.add(new DefaultComponent<ResourceIngredient>(5, clay));
            list.add(new DefaultComponent<ResourceIngredient>(5, iron));
            list.add(new DefaultComponent<ResourceIngredient>(20, food));
            list.add(new DefaultComponent<ResourceIngredient>(1, gold));
            recipeRegistry.getInstance(1006, "Beer", list);
        }
        {
            // Wine
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(3960, ingredients.findByName("Grapes")));
            recipeRegistry.getInstance(420, "Wine", list);
        }
        {
            // Horse
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(20, wood));
            list.add(new DefaultComponent<ResourceIngredient>(5, iron));
            list.add(new DefaultComponent<ResourceIngredient>(60, food));
            list.add(new DefaultComponent<ResourceIngredient>(7, gold));
            recipeRegistry.getInstance(1, "Horse", list);
        }
        {
            // Siege Block
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(100, wood));
            list.add(new DefaultComponent<ResourceIngredient>(40, clay));
            list.add(new DefaultComponent<ResourceIngredient>(70, iron));
            list.add(new DefaultComponent<ResourceIngredient>(100, stone));
            list.add(new DefaultComponent<ResourceIngredient>(12, gold));
            list.add(new DefaultComponent<ResourceIngredient>(2, livestock));
            list.add(new DefaultComponent<ResourceIngredient>(1, ingredients.findByName("Book")));
            recipeRegistry.getInstance(1007, "Siege Block", list);
        }
        {
            // Spear
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(30, wood));
            list.add(new DefaultComponent<ResourceIngredient>(5, clay));
            list.add(new DefaultComponent<ResourceIngredient>(20, iron));
            list.add(new DefaultComponent<ResourceIngredient>(1, gold));
            recipeRegistry.getInstance(5, "Spear", list);
        }
        {
            // Sword
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(30, wood));
            list.add(new DefaultComponent<ResourceIngredient>(15, clay));
            list.add(new DefaultComponent<ResourceIngredient>(40, iron));
            list.add(new DefaultComponent<ResourceIngredient>(5, stone));
            list.add(new DefaultComponent<ResourceIngredient>(2, gold));
            recipeRegistry.getInstance(3, "Sword", list);
        }
        {
            // Bow
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(50, wood));
            list.add(new DefaultComponent<ResourceIngredient>(5, clay));
            list.add(new DefaultComponent<ResourceIngredient>(15, iron));
            list.add(new DefaultComponent<ResourceIngredient>(2, gold));
            recipeRegistry.getInstance(4, "Bow", list);
        }
        {
            // Leather Armour
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(10, wood));
            list.add(new DefaultComponent<ResourceIngredient>(5, clay));
            list.add(new DefaultComponent<ResourceIngredient>(15, iron));
            list.add(new DefaultComponent<ResourceIngredient>(1, livestock));
            list.add(new DefaultComponent<ResourceIngredient>(3, gold));
            recipeRegistry.getInstance(8, "Leather Armour", list);
        }
        {
            // Chainmail Armour
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(30, wood));
            list.add(new DefaultComponent<ResourceIngredient>(15, clay));
            list.add(new DefaultComponent<ResourceIngredient>(40, iron));
            list.add(new DefaultComponent<ResourceIngredient>(5, stone));
            list.add(new DefaultComponent<ResourceIngredient>(2, gold));
            recipeRegistry.getInstance(9, "Chainmail Armour", list);
        }
        {
            // Plate Armour
            final List<Component<ResourceIngredient>> list = new ArrayList<Component<ResourceIngredient>>();
            list.add(new DefaultComponent<ResourceIngredient>(60, wood));
            list.add(new DefaultComponent<ResourceIngredient>(20, clay));
            list.add(new DefaultComponent<ResourceIngredient>(80, iron));
            list.add(new DefaultComponent<ResourceIngredient>(7, gold));
            recipeRegistry.getInstance(10, "Plate Armour", list);
        }
    }

    /**
     * @param name Raw name.
     * 
     * @return a resource ingredient name.
     */
    private String determineIngredientName(final String name)
    {
        String answer = name;

        answer = StringUtils.replace(answer, "\\'", "'");
        answer = StringUtils.replace(answer, "Suits of ", "");

        if (PLURAL_INGREDIENT_NAMES.contains(answer))
        {
            answer = StringUtils.removeEnd(answer, "s");
        }

        return answer;
    }

    /**
     * @param number Number.
     * 
     * @return a resource type.
     */
    private ResourceType determineType(final int number)
    {
        ResourceType answer = null;

        if (isAnatomy(number))
        {
            answer = ResourceType.ANATOMY;
        }
        else if (isBasic(number))
        {
            answer = ResourceType.BASIC;
        }
        else if (isBeverage(number))
        {
            answer = ResourceType.BEVERAGE;
        }
        else if (isBow(number))
        {
            answer = ResourceType.BOW;
        }
        else if (isChainmailArmour(number))
        {
            answer = ResourceType.CHAINMAIL_ARMOUR;
        }
        else if (isElemental(number))
        {
            answer = ResourceType.ELEMENTAL;
        }
        else if (isExotic(number))
        {
            answer = ResourceType.EXOTIC;
        }
        else if (isHerb(number))
        {
            answer = ResourceType.HERB;
        }
        else if (isLeatherArmour(number))
        {
            answer = ResourceType.LEATHER_ARMOUR;
        }
        else if (isMineral(number))
        {
            answer = ResourceType.MINERAL;
        }
        else if (isMount(number))
        {
            answer = ResourceType.MOUNT;
        }
        else if (isPlateArmour(number))
        {
            answer = ResourceType.PLATE_ARMOUR;
        }
        else if (isSpear(number))
        {
            answer = ResourceType.SPEAR;
        }
        else if (isSword(number))
        {
            answer = ResourceType.SWORD;
        }
        else
        {
            throw new IllegalArgumentException("Unrecognized resource type number: " + number);
        }

        return answer;
    }

    /**
     * @param number Number.
     * 
     * @return true if this is an anatomy.
     */
    private boolean isAnatomy(final int number)
    {
        return (number == 186) // Hides
                || ((298 <= number) && (number < 416));
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a basic resource.
     */
    private boolean isBasic(final int number)
    {
        return BASICS.contains(number);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a beverage.
     */
    private boolean isBeverage(final int number)
    {
        return BEVERAGES.contains(number);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a bow.
     */
    private boolean isBow(final int number)
    {
        return BOWS.contains(number);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a chainmail armour.
     */
    private boolean isChainmailArmour(final int number)
    {
        return (number == 9) // Chainmail
                || ((141 <= number) && (number < 160));
    }

    /**
     * @param number Number.
     * 
     * @return true if this is an ingrediental.
     */
    private boolean isElemental(final int number)
    {
        return (290 <= number) && (number <= 293);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is an exotic.
     */
    private boolean isExotic(final int number)
    {
        return (255 <= number) && (number <= 258);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is an herb.
     */
    private boolean isHerb(final int number)
    {
        return HERBS.contains(number);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a leather armour.
     */
    private boolean isLeatherArmour(final int number)
    {
        return (number == 8) // Leather armour
                || ((120 <= number) && (number < 140));
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a mineral.
     */
    private boolean isMineral(final int number)
    {
        return MINERALS.contains(number);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a horse.
     */
    private boolean isMount(final int number)
    {
        return MOUNTS.contains(number);
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a plate armour.
     */
    private boolean isPlateArmour(final int number)
    {
        return (number == 10) // Plate armour
                || ((161 <= number) && (number < 180));
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a spear.
     */
    private boolean isSpear(final int number)
    {
        return (number == 5) // Spear
                || ((91 <= number) && (number < 117));
    }

    /**
     * @param number Number.
     * 
     * @return true if this is a sword.
     */
    private boolean isSword(final int number)
    {
        return SWORDS.contains(number);
    }

    /**
     * Load the resource ingredients.
     * 
     * @param isVerbose Flag indicating whether to provide output.
     * @param jsFileContent JavaScript file content.
     */
    private void loadResourceIngredients(final boolean isVerbose, final String jsFileContent)
    {
        final long start = System.currentTimeMillis();

        final BufferedReader reader = new BufferedReader(new StringReader(jsFileContent));
        String line;

        try
        {
            while ((line = reader.readLine()) != null)
            {
                if (StringUtils.isNotEmpty(line) && line.contains("g_Span[") && line.contains("] = '"))
                {
                    final String numberString = StringUtils.substringBetween(line, "'");

                    if (StringUtils.isNotEmpty(numberString))
                    {
                        try
                        {
                            final int number = Integer.parseInt(numberString);
                            final String nameString = StringUtils.substringBetween(line, "title=\"", "\"");
                            final String name = determineIngredientName(nameString);
                            final ResourceType type = determineType(number);
                            ingredientRegistry.getInstance(number, name, type);
                        }
                        catch (final NumberFormatException e)
                        {
                            System.err.println("line = [" + line + "]");
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        // Additional ingredients.
        addAdditionalIngredients();

        final long end = System.currentTimeMillis();

        if (isVerbose)
        {
            System.out.println("Loaded " + getIngredientCollection().size() + " resource ingredients in "
                    + (end - start) + " msec.");
        }
    }

    /**
     * Load the resource recipes.
     * 
     * @param isVerbose Flag indicating whether to provide output.
     * @param jsFileContent JavaScript file content.
     */
    private void loadResourceRecipes(final boolean isVerbose, final String jsFileContent)
    {
        final long start = System.currentTimeMillis();

        final BufferedReader reader = new BufferedReader(new StringReader(jsFileContent));
        String line;
        final ResourceIngredientCollection ingredients = getIngredientCollection();

        try
        {
            while ((line = reader.readLine()) != null)
            {
                if (StringUtils.isNotEmpty(line) && line.contains("g_Recipes[") && line.contains("] = '"))
                {
                    final String numberString = StringUtils.substringBetween(line, "'");

                    if (StringUtils.isNotEmpty(numberString))
                    {
                        try
                        {
                            final long number = Long.parseLong(numberString);
                            final String recipeString = StringUtils.substringBetween(line, "] = '", "'");
                            final List<Component<ResourceIngredient>> components = parseComponents(recipeString);
                            final ResourceIngredient ingredient = ingredients.findById(number);
                            recipeRegistry.getInstance(number, ingredient.getName(), components);
                        }
                        catch (final NumberFormatException e)
                        {
                            System.err.println("line = [" + line + "]");
                            e.printStackTrace();
                        }
                    }
                }
            }
        }
        catch (final IOException e)
        {
            throw new RuntimeException(e);
        }

        // Additional recipes.
        addAdditionalRecipes();

        final long end = System.currentTimeMillis();

        if (isVerbose)
        {
            System.out.println("Loaded " + getRecipeCollection().size() + " resource recipes in " + (end - start)
                    + " msec.");
        }
    }

    /**
     * @param recipeString Recipe string.
     * 
     * @return a new list of components.
     */
    private List<Component<ResourceIngredient>> parseComponents(final String recipeString)
    {
        final List<Component<ResourceIngredient>> answer = new ArrayList<Component<ResourceIngredient>>();

        final String[] parts = recipeString.split("[|]");

        for (int i = 0; i < parts.length; i++)
        {
            final Component<ResourceIngredient> ingredient = valueOf(parts[i]);
            answer.add(ingredient);
        }

        return answer;
    }

    /**
     * @param componentString Component string.
     * 
     * @return a new component.
     */
    private Component<ResourceIngredient> valueOf(final String componentString)
    {
        Component<ResourceIngredient> answer = null;

        final ResourceIngredientCollection ingredients = getIngredientCollection();
        final String[] parts = componentString.split(":");
        final String quantityString = parts[0].trim();

        try
        {
            final int quantity = Integer.parseInt(quantityString);
            final String ingredientNumberString = parts[1].trim();
            final long ingredientNumber = Long.parseLong(ingredientNumberString);
            final ResourceIngredient ingredient = ingredients.findById(ingredientNumber);
            answer = new DefaultComponent<ResourceIngredient>(quantity, ingredient);
        }
        catch (final NumberFormatException e)
        {
            System.err.println("ingredientString = [" + componentString + "]");
            e.printStackTrace();
        }

        return answer;
    }
}
