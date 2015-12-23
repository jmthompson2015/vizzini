define([ "Difficulty", "Environment", "Maneuver", "Ship", "ShipBase", "ShipTeam", "Team" ], function(Difficulty,
        Environment, Maneuver, Ship, ShipBase, ShipTeam, Team)
{
    function ExplosionUI(fromPosition, shipBase, explosionImage)
    {
        this.paintComponent = function(context)
        {
            LOGGER.trace("ExplosionUI.paintComponent() start");

            var size = ShipBase.properties[shipBase].width;
            var x = fromPosition.x() - size / 2;
            var y = fromPosition.y() - size / 2;
            context.drawImage(explosionImage, x, y, size, size);

            var element = document.getElementById("explosionAudio");
            element.play();

            LOGGER.trace("ExplosionUI.paintComponent() end");
        }
    }

    function LaserBeamUI(fromPosition, toPosition, strokeStyle, audioClip)
    {
        InputValidator.validateNotNull("fromPosition", fromPosition);
        InputValidator.validateNotNull("toPosition", toPosition);

        this.paintComponent = function(context)
        {
            LOGGER.trace("LaserBeamUI.paintComponent() start");

            context.beginPath();
            context.moveTo(fromPosition.x(), fromPosition.y());
            context.lineTo(toPosition.x(), toPosition.y());
            context.lineWidth = 3;
            context.strokeStyle = strokeStyle;
            context.stroke();

            audioClip.play();

            LOGGER.trace("LaserBeamUI.paintComponent() end");
        }
    }

    function ManeuverUI(maneuver, fromPosition, shipBase)
    {
        var FOREGROUND_COLOR = "white";
        var EASY_COLOR = "lime";
        var HARD_COLOR = "red";

        var toPosition = Maneuver.computeToPosition(maneuver, fromPosition, shipBase);

        var fromPolygon = Maneuver.computeFromPolygon(fromPosition, shipBase);
        var path = Maneuver.computePath(maneuver, fromPosition, shipBase);
        var toPolygon = Maneuver.computeToPolygon(maneuver, fromPosition, shipBase);

        this.paintComponent = function(context)
        {
            LOGGER.trace("ManeuverUI.paintComponent() start");

            // Mark the center.
            context.fillStyle = FOREGROUND_COLOR;
            var radius = 4;
            context.beginPath();
            context.arc(fromPosition.x(), fromPosition.y(), radius, 0, 2 * Math.PI);
            context.fill();

            // Draw from ship base.
            fromPolygon.paintComponent(context, FOREGROUND_COLOR);

            // Draw to ship base.
            toPolygon.paintComponent(context, FOREGROUND_COLOR);

            // Draw maneuver path.
            var difficulty = Maneuver.properties[maneuver].difficulty;
            path.paintComponent(context, getColor(difficulty));

            LOGGER.trace("ManeuverUI.paintComponent() end");
        }

        function getColor(difficulty)
        {
            var answer;

            switch (difficulty)
            {
            case Difficulty.EASY:
                answer = EASY_COLOR;
                break;
            case Difficulty.HARD:
                answer = HARD_COLOR;
                break;
            default:
                answer = FOREGROUND_COLOR;
            }

            return answer;
        }
    }

    function PlayAreaUI(environment)
    {
        var DEG_TO_RADIANS = Math.PI / 180;
        var SHIP_BACKGROUND = "rgba(255,255,255,0.4)";

        var backgroundImage;
        var explosionImage;
        var tokenToImage = {};

        // Preload the images.
        {
            var tokens = environment.tokens();
            LOGGER.info("Loading images...");
            preload(tokens, 5000, function()
            {
                LOGGER.info("Images loaded.");
                environment.trigger(Environment.UPDATE_TRIGGER_EVENT);
            });
        }

        this.paintComponent = function(context, playState)
        {
            context.drawImage(backgroundImage, 0, 0, 915, 915);
            drawTokens(context, playState);
            drawManeuver(context, playState);
            drawLaserBeam(context, playState);
            drawExplosion(context, playState);
        }

        function createBackgroundImage(callback)
        {
            var image = new Image();
            image.onload = function()
            {
                callback();
            };

            image.src = imageBase + "pia13845.jpg";

            return image;
        }

        function createExplosionImage(callback)
        {
            var image = new Image();
            image.onload = function()
            {
                callback();
            };

            image.src = imageBase + "Explosion64.png";

            return image;
        }

        function createExplosionUI(shipDestroyedAction)
        {
            var answer;

            var token = shipDestroyedAction.token();
            var fromPosition = shipDestroyedAction.fromPosition();

            if (fromPosition)
            {
                var shipBase = token.getShipBase();
                answer = new ExplosionUI(fromPosition, shipBase, explosionImage);
            }

            return answer;
        }

        function createLaserBeamUI(combatAction)
        {
            var answer;

            var attacker = combatAction.getAttacker();
            var fromPosition = combatAction.getAttackerPosition();

            if (fromPosition)
            {
                var toPosition = combatAction.getDefenderPosition();

                if (toPosition)
                {
                    var strokeStyle = Team.properties[attacker.getTeam()].color;
                    var audioClip = getLaserAudioClip(attacker);
                    answer = new LaserBeamUI(fromPosition, toPosition, strokeStyle, audioClip);
                }
            }

            return answer;
        }

        function createManeuverUI(maneuverAction)
        {
            var maneuver = maneuverAction.maneuver();
            var fromPosition = maneuverAction.fromPosition();
            var shipBase = maneuverAction.shipBase();

            return new ManeuverUI(maneuver, fromPosition, shipBase);
        }

        function createShipIcon(token, callback)
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

        function drawTokens(context, playState)
        {
            LOGGER.trace("PlayAreaUI.drawTokens() start");

            if (playState)
            {
                var tokenPositions = playState.tokenPositions();

                for (var i = 0; i < tokenPositions.length; i++)
                {
                    var tokenPosition = tokenPositions[i];
                    var token = tokenPosition.token;
                    var position = tokenPosition.position;
                    var image = tokenToImage[token];
                    if (image)
                    {
                        image.position = position;
                        drawShipImage(context, image);
                    }
                    else
                    {
                        LOGGER.error("Missing image for token " + token);
                    }
                }
            }

            LOGGER.trace("PlayAreaUI.drawTokens() end");
        }

        function drawExplosion(context, playState)
        {
            LOGGER.trace("PlayAreaUI.drawExplosion() start");

            if (playState)
            {
                var shipDestroyedAction = playState.shipDestroyedAction();

                if (shipDestroyedAction)
                {
                    var explosionUI = createExplosionUI(shipDestroyedAction);

                    if (explosionUI)
                    {
                        explosionUI.paintComponent(context);
                    }
                }
            }

            LOGGER.trace("PlayAreaUI.drawExplosion() end");
        }

        function drawLaserBeam(context, playState)
        {
            LOGGER.trace("PlayAreaUI.drawLaserBeam() start");

            if (playState)
            {
                var combatAction = playState.combatAction();

                if (combatAction)
                {
                    var laserBeamUI = createLaserBeamUI(combatAction);

                    if (laserBeamUI)
                    {
                        laserBeamUI.paintComponent(context);
                    }
                }
            }

            LOGGER.trace("PlayAreaUI.drawLaserBeam() end");
        }

        function drawManeuver(context, playState)
        {
            LOGGER.trace("PlayAreaUI.drawManeuver() start");

            if (playState)
            {
                var maneuverAction = playState.maneuverAction();

                if (maneuverAction)
                {
                    var maneuverUI = createManeuverUI(maneuverAction);
                    maneuverUI.paintComponent(context);
                }
            }

            LOGGER.trace("PlayAreaUI.drawManeuver() end");
        }

        function drawShipImage(context, image)
        {
            LOGGER.trace("PlayAreaUI.drawShipImage() start");

            // Setup.
            var position = image.position;
            var teamColor = image.teamColor;
            var id = image.id;
            var width = image.width;
            var height = image.height;
            var x = position.x();
            var y = position.y();
            var angle = position.heading() * DEG_TO_RADIANS;
            context.translate(x, y);
            context.rotate(angle);

            // Draw background square.
            context.fillStyle = SHIP_BACKGROUND;
            context.fillRect(-width / 2, -height / 2, width, height);

            // Draw ship image.
            context.drawImage(image, -width / 2, -height / 2, width, height);

            // Draw the token ID.
            context.rotate(90 * DEG_TO_RADIANS);
            context.fillStyle = teamColor;
            context.font = "14px sans-serif";
            context.fillText(id, -width / 2, height / 2);
            context.rotate(-90 * DEG_TO_RADIANS);

            // Cleanup.
            context.rotate(-angle);
            context.translate(-x, -y);

            LOGGER.trace("PlayAreaUI.drawShipImage() end");
        }

        function getLaserAudioClip(token)
        {
            var answer;

            var ship = token.getShip();

            if (ship === Ship.YT_1300 || ship === Ship.YT_2400)
            {
                answer = document.getElementById("millenniumFalconLaserAudio");
            }
            else if (ship === Ship.FIRESPRAY_31)
            {
                answer = document.getElementById("slave1LaserAudio");
            }
            else
            {
                var team = token.getTeam();

                if (team === Team.IMPERIAL)
                {
                    answer = document.getElementById("tieFighterLaserAudio");
                }
                else
                {
                    answer = document.getElementById("xWingLaserAudio");
                }
            }

            return answer;
        }

        function preload(tokens, timeout, callback)
        {
            // Background plus explosion plus tokens.
            var remaining = 2 + tokens.length;
            var callbackFired = false;
            var timer = null;

            function imageDone()
            {
                remaining--;

                if (remaining === 0 && !callbackFired)
                {
                    callbackFired = true;
                    clearTimeout(timer);
                    callback();
                }
            }

            function timerExpired()
            {
                if (callbackFired) { return; }

                callbackFired = true;
                callback();
            }

            backgroundImage = createBackgroundImage(imageDone);
            explosionImage = createExplosionImage(imageDone);

            for (var i = 0; i < tokens.length; i++)
            {
                var token = tokens[i];
                tokenToImage[token] = createShipIcon(token, imageDone);
            }

            timer = setTimeout(timerExpired, timeout);
        }
    }

    return PlayAreaUI;
});
