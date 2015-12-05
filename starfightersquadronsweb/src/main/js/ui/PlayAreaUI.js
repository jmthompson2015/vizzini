/*
 * Provides a user interface for an explosion.
 */
function ExplosionUI(fromPosition, shipBase, explosionImage)
{
    this.paintComponent = function(context)
    {
        LOGGER.trace("ExplosionUI.paintComponent() start");

        var size = ShipBase.properties[shipBase].width;
        var x = fromPosition.getX() - size / 2;
        var y = fromPosition.getY() - size / 2;
        context.drawImage(explosionImage, x, y, size, size);

        var element = document.getElementById("explosionAudio");
        element.play();

        LOGGER.trace("ExplosionUI.paintComponent() end");
    }
}

/*
 * Provides a user interface for a laser beam.
 */
function LaserBeamUI(fromPosition, toPosition, strokeStyle, audioClip)
{
    InputValidator.validateNotNull("fromPosition", fromPosition);
    InputValidator.validateNotNull("toPosition", toPosition);

    this.paintComponent = function(context)
    {
        LOGGER.trace("LaserBeamUI.paintComponent() start");

        context.beginPath();
        context.moveTo(fromPosition.getX(), fromPosition.getY());
        context.lineTo(toPosition.getX(), toPosition.getY());
        context.lineWidth = 3;
        context.strokeStyle = strokeStyle;
        context.stroke();

        audioClip.play();

        LOGGER.trace("LaserBeamUI.paintComponent() end");
    }
}

/*
 * Provides a user interface for a maneuver.
 */
function ManeuverUI(maneuver, fromPosition, shipBase)
{
    var FOREGROUND_COLOR = "white";

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
        context.arc(fromPosition.getX(), fromPosition.getY(), radius, 0, 2 * Math.PI);
        context.fill();

        // Draw from ship base.
        fromPolygon.paintComponent(context, FOREGROUND_COLOR);

        // Draw to ship base.
        toPolygon.paintComponent(context, FOREGROUND_COLOR);

        // Draw maneuver path.
        // FIXME: color path by difficulty.
        path.paintComponent(context, FOREGROUND_COLOR);

        LOGGER.trace("ManeuverUI.paintComponent() end");
    }
}

/*
 * Provides a play area user interface for Starfighter Squadrons.
 */
function PlayAreaUI(environment, imageUtils)
{
    var DEG_TO_RADIANS = Math.PI / 180;
    var SHIP_BACKGROUND = "rgba(255,255,255,0.4)";

    var that = this;

    var backgroundImage;
    var explosionImage;
    var tokenToImage = {};

    // Preload the images.
    {
        var tokens = environment.getTokens();
        LOGGER.info("Loading images...");
        preload(tokens, 5000, function()
        {
            LOGGER.info("Images loaded.");
            environment.fireUpdateTrigger();
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

    /*
     * @param action Ship destroyed action.
     */
    function createExplosionUI(shipDestroyedAction)
    {
        var answer;

        var token = shipDestroyedAction.getToken();
        var fromPosition = shipDestroyedAction.getFromPosition();

        if (fromPosition)
        {
            var shipBase = token.getShipBase();
            answer = new ExplosionUI(fromPosition, shipBase, explosionImage);
        }

        return answer;
    }

    /*
     * @param action Combat action.
     */
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
                var strokeStyle = imageUtils.getTeamColor(attacker);
                var audioClip = getLaserAudioClip(attacker);
                answer = new LaserBeamUI(fromPosition, toPosition, strokeStyle, audioClip);
            }
        }

        return answer;
    }

    /*
     * @param action Maneuver action.
     */
    function createManeuverUI(maneuverAction)
    {
        var maneuver = maneuverAction.getManeuver();
        var fromPosition = maneuverAction.getFromPosition();
        var shipBase = maneuverAction.getShipBase();

        return new ManeuverUI(maneuver, fromPosition, shipBase);
    }

    function drawTokens(context, playState)
    {
        LOGGER.trace("PlayAreaUI.drawTokens() start");

        if (playState)
        {
            var tokenPositions = playState.getTokenPositions();

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
            var shipDestroyedAction = playState.getShipDestroyedAction();

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
            var combatAction = playState.getCombatAction();

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
            var maneuverAction = playState.getManeuverAction();

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
        var x = position.getX();
        var y = position.getY();
        var angle = position.getHeading() * DEG_TO_RADIANS;
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

        backgroundImage = imageUtils.createBackgroundImage(imageDone);
        explosionImage = imageUtils.createExplosionImage(imageDone);

        for (var i = 0; i < tokens.length; i++)
        {
            var token = tokens[i];
            tokenToImage[token] = imageUtils.createShipIcon(token, imageDone);
        }

        timer = setTimeout(timerExpired, timeout);
    }
}
