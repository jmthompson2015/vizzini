/*
 * Provides a code generator for an enumeration of rarities.
 */
var RarityCodeGenerator =
{
    generate: function(results)
    {
        var answer = "\n";

        if (results)
        {
            var properties = Object.getOwnPropertyNames(results);

            // Keys.
            for (var i = 0; i < properties.length; i++)
            {
                var property = properties[i];
                var result = results[property];

                if (result.name)
                {
                    answer += RarityCodeGenerator.createName(result.name);
                    answer += ": \"";
                    answer += RarityCodeGenerator.createValue(result.name);
                    answer += "\",\n";
                }
            }

            // Properties.
            answer += "properties:\n{\n";

            for (var i = 0; i < properties.length; i++)
            {
                var property = properties[i];
                var result = results[property];

                if (result.name)
                {
                    answer += "\"";
                    answer += RarityCodeGenerator.createValue(result.name);
                    answer += "\":\n{\n";
                    answer += "id: ";
                    answer += result.id;
                    answer += ",\n";
                    answer += "name: \"";
                    answer += result.name;
                    answer += "\",\n";
                    answer += "},\n"
                }
            }

            answer += "},\n";

            // Values.
            answer += "values: [";

            for (var i = 0; i < properties.length; i++)
            {
                var property = properties[i];
                var result = results[property];

                if (result.name)
                {
                    answer += "\"";
                    answer += RarityCodeGenerator.createValue(result.name);
                    answer += "\", ";
                }
            }

            answer += "],";
        }

        LOGGER.info(answer);
        $("#code").html(answer);

        return answer;
    },

    createName: function(name)
    {
        var answer = name;

        if (name)
        {
            answer = name.toUpperCase();
        }

        return answer;
    },

    createValue: function(name)
    {
        var answer = name;

        if (name)
        {
            answer = name.toLowerCase();
        }

        return answer;
    },
}
