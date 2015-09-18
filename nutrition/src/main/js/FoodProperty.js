var FoodProperty =
{
    ACTION: "action",
    BRAND: "brand",
    NAME: "name",
    TYPE: "type",
    SERVING_SIZE: "servingSize",
    SERVINGS_PER_CONTAINER: "servingsPerContainer",
    CALORIES: "calories",
    CALORIES_FROM_FAT: "caloriesFromFat",
    FAT: "fat",
    FAT_SATURATED: "fatSaturated",
    FAT_TRANS: "fatTrans",
    FAT_POLYUNSAT: "fatPolyunsat",
    FAT_MONOUNSAT: "fatMonounsat",
    CHOLESTEROL: "cholesterol",
    SODIUM: "sodium",
    POTASSIUM: "potassium",
    CARBS: "carbs",
    CARBS_DIETARY_FIBER: "carbsDietaryFiber",
    CARBS_SUGARS: "carbsSugars",
    PROTEIN: "protein",
    HEALTH_RATING: "healthRating",

    properties:
    {
        "action":
        {
            displayName: "Action",
            className: "actionCell",
        },
        "type":
        {
            displayName: "Type",
            className: "textCell",
        },
        "brand":
        {
            displayName: "Brand",
            className: "textCell",
        },
        "name":
        {
            displayName: "Name",
            className: "textCell",
        },
        "servingSize":
        {
            displayName: "Serving Size",
            className: "textCell",
        },
        "servingsPerContainer":
        {
            displayName: "Servings per Container",
            className: "numberCell",
        },
        "calories":
        {
            displayName: "Calories",
            className: "numberCell",
        },
        "caloriesFromFat":
        {
            displayName: "Calories from Fat",
            className: "numberCell",
        },
        "fat":
        {
            displayName: "Fat",
            className: "numberCell",
        },
        "fatSaturated":
        {
            displayName: "Saturated Fat",
            className: "numberCell",
        },
        "fatTrans":
        {
            displayName: "Trans Fat",
            className: "numberCell",
        },
        "fatPolyunsat":
        {
            displayName: "Polyunsat. Fat",
            className: "numberCell",
        },
        "fatMonounsat":
        {
            displayName: "Monounsat. Fat",
            className: "numberCell",
        },
        "cholesterol":
        {
            displayName: "Cholesterol",
            className: "numberCell",
        },
        "sodium":
        {
            displayName: "Sodium",
            className: "numberCell",
        },
        "potassium":
        {
            displayName: "Potassium",
            className: "numberCell",
        },
        "carbs":
        {
            displayName: "Carbs",
            className: "numberCell",
        },
        "carbsDietaryFiber":
        {
            displayName: "Dietary Fiber",
            className: "numberCell",
        },
        "carbsSugars":
        {
            displayName: "Sugars",
            className: "numberCell",
        },
        "protein":
        {
            displayName: "Protein",
            className: "numberCell",
        },
        "healthRating":
        {
            displayName: "Health Rating",
            className: "numberCell",
        },
    },

    createColumnsArray: function()
    {
        var answer = [];
        var values = this.values();

        answer = values.map(function(value)
        {
            var properties = FoodProperty.properties[value];
            var column =
            {
                key: value,
                label: properties.displayName,
                className: properties.className,
            };

            return column;
        });

        return answer;
    },

    numberValues: function()
    {
        var values = this.values();

        return values.filter(function(value)
        {
            var properties = FoodProperty.properties[value];
            return properties.className === "numberCell";
        });
    },

    values: function()
    {
        return Object.getOwnPropertyNames(FoodProperty.properties);
    },
}
