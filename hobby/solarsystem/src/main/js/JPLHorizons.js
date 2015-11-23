/*
 * @see <a href="http://ssd.jpl.nasa.gov/horizons_batch.cgi">HORIZONS Batch-Interface</a>
 * @see <a href="ftp://ssd.jpl.nasa.gov/pub/ssd/horizons_batch_example.long">JPL/Horizons Execution Control VARLIST</a>
 */
function JPLHorizons(body)
{
    var that = this;

    this.fetchData = function()
    {
        LOGGER.trace("fetchData() start");

        var url = "http://ssd.jpl.nasa.gov/horizons_batch.cgi";
        // TODO: create start and stop time.
        var data =
        {
            batch: 1,
            COMMAND: body.id,
            CENTER: '500@0',
            START_TIME: '2015-10-30',
            STOP_TIME: '2015-10-31',
            STEP_SIZE: '1',
            TABLE_TYPE: 'VECTORS',
            CSV_FORMAT: 'YES',
        };

        var success = this.receiveData;
        var dataType = "text";

        $.post(url, data, success, dataType);

        LOGGER.trace("fetchData() end");
    }

    this.receiveData = function(textDocument)
    {
        LOGGER.trace("receiveData() start");

        LOGGER.trace("textDocument = " + textDocument);

        // Parse radius and mass.
        if (!body.radius)
        {
            parseRadius(textDocument)
        };

        if (!body.mass)
        {
            parseMass(textDocument)
        };

        // Parse timestamp, position vector, and velocity vector.
        parsePositionAndVelocity(textDocument);

        that.trigger("dataLoaded", that);

        LOGGER.trace("receiveData() end");
    }

    function indexOfNonNumeric(text)
    {
        var answer = -1;
        var numerics = [ "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", ".", " " ];
        var isDone = false;

        while (answer < text.length && !isDone)
        {
            var ch = text.charAt(answer + 1);

            if (numerics.vizziniContains(ch))
            {
                answer++;
            }
            else
            {
                answer++;
                isDone = true;
            }
        }

        return answer;
    }

    function parseMass(textDocument)
    {
        var index0 = textDocument.indexOf("Mass");

        if (index0 >= 0)
        {
            var index1 = textDocument.indexOf("^", index0);
            var index2 = textDocument.indexOf(" ", index1);
            var exponent;

            if (index1 >= 0 && index2 >= 0)
            {
                exponent = textDocument.substring(index1 + 1, index2).trim();
            }

            var index3 = textDocument.indexOf("=", index2);
            var index4 = textDocument.indexOf("~", index2);
            LOGGER.trace("index3 = " + index3 + " index4 = " + index4);

            if (index3 >= 0)
            {
                if (index4 >= 0)
                {
                    index3 = Math.min(index3, index4);
                }
            }
            else if (index4 >= 0)
            {
                index3 = index4;
            }

            var text = textDocument.substring(index3 + 1);
            var index4 = indexOfNonNumeric(text);
            LOGGER.trace("index3 = " + index3 + " index4 = " + index4);

            if (index3 >= 0 && index4 >= 0)
            {
                coefficient = text.substring(0, index4).trim();
            }

            LOGGER.debug("exponent = _" + exponent + "_");
            LOGGER.debug("coefficient = _" + coefficient + "_");
            body.mass = parseFloat(coefficient + "E+" + exponent);
        }
    }

    function parsePositionAndVelocity(textDocument)
    {
        body.position = Vector.ZERO;
        body.velocity = Vector.ZERO;

        var index0 = textDocument.indexOf("$$SOE");
        var index1 = textDocument.indexOf("$$EOE", index0 + 1);

        if (index0 >= 0 && index1 >= 0)
        {
            var myText = textDocument.substring(index0 + 6, index1);
            var parts = myText.split(",");

            var x = parseFloat(parts[2].trim());
            var y = parseFloat(parts[3].trim());
            var z = parseFloat(parts[4].trim());
            body.position = new Vector(x, y, z);

            var vx = parseFloat(parts[5].trim());
            var vy = parseFloat(parts[6].trim());
            var vz = parseFloat(parts[7].trim());
            body.velocity = new Vector(vx, vy, vz);
        }
    }

    function parseRadius(textDocument)
    {
        var index0 = textDocument.indexOf("Equ. radius");

        if (index0 < 0)
        {
            index0 = textDocument.indexOf("Radius,");
        }

        if (index0 >= 0)
        {
            var index1 = textDocument.indexOf("=", index0);
            var index2 = textDocument.indexOf("+", index1);

            if (index1 >= 0 && index2 >= 0)
            {
                var value = textDocument.substring(index1 + 1, index2).trim();
                body.radius = parseFloat(value);
            }
        }
        else
        {
            index0 = textDocument.indexOf("Radius");

            if (index0 >= 0)
            {
                var index1 = textDocument.indexOf("=", index0);
                var index2 = textDocument.indexOf("(", index1);
                var index3 = textDocument.indexOf("^", index2);
                var index4 = textDocument.indexOf(")", index3);

                if (index1 >= 0 && index2 >= 0 && index3 >= 0 && index4 >= 0)
                {
                    var coefficient = textDocument.substring(index1 + 1, index2).trim();
                    var exponent = textDocument.substring(index3 + 1, index4).trim();
                    body.radius = parseFloat(coefficient + "E+" + exponent);
                }
            }
        }
    }
}

MicroEvent.mixin(JPLHorizons);
