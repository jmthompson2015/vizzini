/*
 * @see <a href="http://ssd.jpl.nasa.gov/horizons_batch.cgi">HORIZONS Batch-Interface</a>
 * @see <a href="ftp://ssd.jpl.nasa.gov/pub/ssd/horizons_batch_example.long">JPL/Horizons Execution Control VARLIST</a>
 */
define([ "Quaternion", "State", "Vector" ], function(Quaternion, State, Vector)
{
    "use strict";
    function JPLHorizons(body, startTime, stopTime, callback)
    {
        InputValidator.validateNotNull("body", body);
        InputValidator.validateNotNull("startTime", startTime);
        InputValidator.validateNotNull("stopTime", stopTime);
        InputValidator.validateNotNull("callback", callback);

        this.fetchData = function()
        {
            var url = createUrl();
            $.ajax(url).done(this.receiveData).fail(function(jqXHR, textStatus, errorThrown)
            {
                LOGGER.error(errorThrown);
            });
        };

        this.receiveData = function(myDocument)
        {
            var textDocument = myDocument.documentElement.textContent;

            // LOGGER.trace("textDocument = " + textDocument);
            // LOGGER.trace("textDocument = " + textDocument.substring(0, 160));

            var state = parseState(textDocument);

            callback(state);
        };

        function createUrl()
        {
            var baseUrl = "http://query.yahooapis.com/v1/public/yql?q=";
            var sourceUrl = "http://ssd.jpl.nasa.gov/horizons_batch.cgi";

            var postdata = "\"";
            postdata += "batch=1";
            postdata += "&COMMAND=";
            postdata += body.id;
            postdata += "&CENTER=500@0";
            postdata += "&START_TIME=";
            postdata += startTime;
            postdata += "&STOP_TIME=";
            postdata += stopTime;
            postdata += "&STEP_SIZE=1";
            postdata += "&TABLE_TYPE=VECTORS";
            postdata += "&CSV_FORMAT=YES";
            postdata += "\"";

            var query = "use 'http://isithackday.com/hacks/htmlpost/htmlpost.xml' as htmlpost;";
            query += " select * from htmlpost where url='";
            query += sourceUrl;
            query += "' and postdata=";
            query += postdata;
            query += " and xpath='/'";

            var answer = baseUrl + encodeURIComponent(query);
            LOGGER.debug("url = _" + answer + "_");

            return answer;
        }

        function parseState(textDocument)
        {
            var answer;
            var index0 = textDocument.indexOf("$$SOE");
            var index1 = textDocument.indexOf("$$EOE", index0 + 1);

            if (index0 >= 0 && index1 >= 0)
            {
                var myText = textDocument.substring(index0 + 6, index1);
                var parts = myText.split(",");

                // Remove the A.D. prefix.
                var part1 = parts[1].trim().substring(5);
                var date = moment(part1, "YYYY-MMM-DD HH:mm:ss.SSS");

                var x = parseFloat(parts[2].trim());
                var y = parseFloat(parts[3].trim());
                var z = parseFloat(parts[4].trim());
                var position = new Vector(x, y, z);

                var orientation = Quaternion.ZERO;

                var vx = parseFloat(parts[5].trim());
                var vy = parseFloat(parts[6].trim());
                var vz = parseFloat(parts[7].trim());
                var velocity = new Vector(vx, vy, vz);

                var angularVelocity = Quaternion.ZERO;

                if (body.rotationRate !== undefined)
                {
                    angularVelocity = Quaternion.newInstance(body.rotationRate, Vector.Z_AXIS);
                }

                answer = new State.State(date, position, orientation, velocity, angularVelocity);
            }

            return answer;
        }
    }

    return JPLHorizons;
});
