/*
 * Provides a color axis for each fundamental color as a unit vector in RGB
 * space. Note that these axes differ from the CSS named colors (even though
 * some of the names are the same).
 */
var Axis =
{
    // Primary
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
    // Secondary
    YELLOW: "yellow",
    MAGENTA: "magenta",
    CYAN: "cyan",
    // Tertiary
    ORANGE: "orange",
    ROSE: "rose",
    CHARTREUSE: "chartreuse",
    SPRING_GREEN: "springGreen",
    VIOLET: "violet",
    AZURE: "azure",
    // Other
    GRAY: "gray",

    properties:
    {
        "red":
        {
            r: 1.0,
            g: 0.0,
            b: 0.0,
        },
        "green":
        {
            r: 0.0,
            g: 1.0,
            b: 0.0,
        },
        "blue":
        {
            r: 0.0,
            g: 0.0,
            b: 1.0,
        },
        "yellow":
        {
            r: 0.7071,
            g: 0.7071,
            b: 0.0,
        },
        "magenta":
        {
            r: 0.7071,
            g: 0.0,
            b: 0.7071,
        },
        "cyan":
        {
            r: 0.0,
            g: 0.7071,
            b: 0.7071,
        },
        "orange":
        {
            r: 0.8944,
            g: 0.4472,
            b: 0.0,
        },
        "rose":
        {
            r: 0.8944,
            g: 0.0,
            b: 0.4472,
        },
        "chartreuse":
        {
            r: 0.4472,
            g: 0.8944,
            b: 0.0,
        },
        "springGreen":
        {
            r: 0.0,
            g: 0.8944,
            b: 0.4472,
        },
        "violet":
        {
            r: 0.4472,
            g: 0.0,
            b: 0.8944,
        },
        "azure":
        {
            r: 0.0,
            g: 0.4472,
            b: 0.8944,
        },
        "gray":
        {
            r: 0.5774,
            g: 0.5774,
            b: 0.5774,
        },
    },

    /*
     * Return the magnitude of the cross product vector.
     */
    crossMag: function(axis, color)
    {
        var answer;

        var myAxis = Axis.properties[axis];

        if (myAxis)
        {
            var u1 = myAxis.r;
            var u2 = myAxis.g;
            var u3 = myAxis.b;

            var myColor = this.unit(CssNamedColor.properties[color]);

            var v1 = myColor.r;
            var v2 = myColor.g;
            var v3 = myColor.b;

            var x = u2 * v3 - u3 * v2;
            var y = u3 * v1 - u1 * v3;
            var z = u1 * v2 - u2 * v1;

            answer = Math.sqrt(x * x + y * y + z * z);

            answer = this.round2(answer);
        }
        else
        {
            answer = "&nbsp;";
        }

        return answer;
    },

    /*
     * Return the dot product.
     */
    dot: function(axis, color)
    {
        var answer;

        var myAxis = Axis.properties[axis];

        if (myAxis)
        {
            var myColor = this.unit(CssNamedColor.properties[color]);

            answer = myAxis.r * myColor.r;
            answer += myAxis.g * myColor.g;
            answer += myAxis.b * myColor.b;
            answer = this.round2(answer);
        }
        else
        {
            answer = "&nbsp;";
        }

        return answer;
    },

    round2: function(value)
    {
        return Math.round(100.0 * value) / 100.0;
    },

    round4: function(value)
    {
        return Math.round(10000.0 * value) / 10000.0;
    },

    /*
     * Return the unit vector.
     */
    unit: function(color)
    {
        var answer;

        var mag2 = (color.r * color.r) + (color.g * color.g)
                + (color.b * color.b);

        if (mag2 === 0)
        {
            answer =
            {
                r: 0,
                g: 0,
                b: 0,
            }
        }
        else
        {
            var mag = Math.sqrt(mag2);

            answer =
            {
                r: this.round4(color.r / mag),
                g: this.round4(color.g / mag),
                b: this.round4(color.b / mag),
            }
        }

        return answer;
    }
};

if (Object.freeze)
{
    Object.freeze(Axis);
};
