define(["FiringArc"], function(FiringArc)
{
    var ShipImage = {};

    var DEG_TO_RADIANS = Math.PI / 180;

    ShipImage.draw = function(context, scale, id, image, position, shipTeam)
    {
        InputValidator.validateNotNull("context", context);
        InputValidator.validateNotNull("scale", scale);
        // id optional.
        InputValidator.validateNotNull("image", image);
        InputValidator.validateNotNull("position", position);
        InputValidator.validateNotNull("shipTeam", shipTeam);

        // Setup.
        var primaryFiringArc = shipTeam.ship.primaryFiringArc;
        var auxiliaryFiringArc = shipTeam.ship.auxiliaryFiringArc;
        var teamColor = shipTeam.team.color;
        var shipBase = shipTeam.ship.shipBase;
        var width = shipBase.width;
        var height = shipBase.height;
        var x = position.x();
        var y = position.y();
        var angle = position.heading() * DEG_TO_RADIANS;

        context.save();
        context.scale(scale, scale);
        context.translate(x, y);
        context.rotate(angle);

        // Draw background square.
        context.fillStyle = "rgba(255,255,255,0.4)";
        context.fillRect(-width / 2, -height / 2, width, height);

        // Draw the auxiliary firing arc.
        if (auxiliaryFiringArc)
        {
            context.strokeStyle = teamColor;
            context.setLineDash([5, 4]);

            switch (auxiliaryFiringArc.value)
            {
                case FiringArc.AFT:
                    context.beginPath();
                    context.moveTo(-width / 2, -height / 2);
                    context.lineTo(0, 0);
                    context.lineTo(-width / 2, height / 2);
                    context.stroke();
                    break;
                case FiringArc.FULL_AFT:
                    context.beginPath();
                    context.moveTo(0, -height / 2);
                    context.lineTo(0, 0);
                    context.lineTo(0, height / 2);
                    context.stroke();
                    break;
                default:
                    throw "Unknown auxiliaryFiringArc: " + auxiliaryFiringArc;
            }
            context.setLineDash([]);
        }

        // Draw the primary firing arc.
        if (primaryFiringArc)
        {
            context.strokeStyle = teamColor;

            switch (primaryFiringArc.value)
            {
                case FiringArc.FORWARD:
                    context.beginPath();
                    context.moveTo(width / 2, -height / 2);
                    context.lineTo(0, 0);
                    context.lineTo(width / 2, height / 2);
                    context.stroke();
                    break;
                default:
                    throw "Unknown primaryFiringArc: " + primaryFiringArc;
            }
        }

        // Draw ship image.
        context.drawImage(image, -image.width / 2, -image.height / 2, image.width, image.height);

        if (id !== undefined)
        {
            // Draw the token ID.
            context.rotate(90 * DEG_TO_RADIANS);
            context.fillStyle = teamColor;
            context.font = "14px sans-serif";
            context.fillText(id, -height / 2, width / 2);
            context.rotate(-90 * DEG_TO_RADIANS);
        }

        // Cleanup.
        context.restore();
    };

    return ShipImage;
});
