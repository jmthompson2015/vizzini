/*
 * Provides a color table.
 */
var ColorTable =
{
    createColorTable: function(axis)
    {
        var answer = "";

        var propertyNames = Object.getOwnPropertyNames(CssNamedColor);
        var properties = CssNamedColor.properties;

        for (var i = 0; i < propertyNames.length; i++)
        {
            var propertyName = propertyNames[i];
            var colorName = CssNamedColor[propertyName];
            var color = properties[colorName];

            if (properties[CssNamedColor[propertyName]])
            {
                answer += "<tr>";
                answer += "<td style=\"background-color: ";
                answer += colorName;
                answer += ";\">&nbsp;</td>";
                answer += "<td>";
                answer += CssNamedColor.displayName(colorName);
                answer += "</td>";
                answer += "<td>";
                answer += color.hex;
                answer += "</td>";
                answer += "<td>";
                answer += color.r;
                answer += ",";
                answer += color.g;
                answer += ",";
                answer += color.b;
                answer += "</td>";
                answer += "<td>";

                if (axis)
                {
                    answer += Axis.dot(axis, colorName);
                }
                else
                {
                    answer += "&nbsp;";
                }

                answer += "</td>";
                answer += "<td>";

                if (axis)
                {
                    answer += Axis.crossMag(axis, colorName);
                }
                else
                {
                    answer += "&nbsp;";
                }

                answer += "</td>";
                answer += "</tr>";
            }
        }

        return answer;
    }
}

if (Object.freeze)
{
    Object.freeze(ColorTable);
};
