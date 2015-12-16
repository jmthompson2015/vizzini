/*
 * Provides utilities for working with images.
 */
define([ "ShipTeam", "Team" ], function(ShipTeam, Team)
{
    function ImageUtilities(imageBase)
    {
        InputValidator.validateNotNull("imageBase", imageBase);

        this.createBackgroundImage = function(callback)
        {
            var image = new Image();
            image.onload = function()
            {
                callback();
            };

            image.src = imageBase + "pia13845.jpg";

            return image;
        }

        this.createExplosionImage = function(callback)
        {
            var image = new Image();
            image.onload = function()
            {
                callback();
            };

            image.src = imageBase + "Explosion64.png";

            return image;
        }

        /**
         * @param bearing
         *            Bearing.
         * @param difficulty
         *            Difficulty.
         * 
         * @return a new image icon.
         */
        this.createManeuverIconSource = function(bearing, difficulty)
        {
            var answer;

            if (bearing)
            {
                var bearingName = bearing.replace(/L/g, "_l");
                bearingName = bearingName.replace(/R/g, "_r");
                bearingName = bearingName.replace("kTurn", "koiogran_turn");
                answer = imageBase + "maneuver/" + bearingName + "_" + difficulty + "16.png";
            }
            else
            {
                answer = imageBase + "maneuver/stationary_" + difficulty + "16.png";
            }

            return answer;
        }

        this.createShipIcon = function(token, callback)
        {
            var image = new Image();
            image.id = token.getId();
            image.teamColor = Team.properties[token.getTeam()].color;
            image.onload = function()
            {
                callback();
            };

            var filename = ShipTeam.properties[token.getShipTeam()].image;
            image.src = imageBase + "ship/" + filename;

            return image;
        }
    };

    return ImageUtilities;
});
