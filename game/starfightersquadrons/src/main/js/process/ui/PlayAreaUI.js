define(["Difficulty", "ManeuverComputer", "ShipTeam", "process/ui/ShipImage"],
   function(Difficulty, ManeuverComputer, ShipTeam, ShipImage)
   {
      "use strict";
      var PlayAreaUI = React.createClass(
      {
         propTypes:
         {
            height: PropTypes.number.isRequired,
            image: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
            playFormatKey: PropTypes.string.isRequired,
            scale: PropTypes.number.isRequired,
            tokenPositions: PropTypes.array.isRequired,
            width: PropTypes.number.isRequired,

            explosion: PropTypes.object,
            laserBeam: PropTypes.object,
            maneuver: PropTypes.object,
         },

         explosionImage: undefined,
         shipTeamToImage:
         {},

         componentDidMount: function()
         {
            this.loadImages();
            this.paint();
         },

         componentDidUpdate: function()
         {
            this.paint();
         },

         render: function()
         {
            var imageSrc = this.props.imageBase + this.props.image;

            return React.DOM.canvas(
            {
               id: "playAreaCanvas",
               style:
               {
                  backgroundImage: "url(" + imageSrc + ")",
                  backgroundSize: "100%",
               },
               width: this.props.width,
               height: this.props.height,
            });
         },

         createExplosionImage: function()
         {
            var image = new Image();
            image.src = this.props.imageBase + "Explosion64.png";

            return image;
         },

         createShipIcon: function(shipTeam)
         {
            InputValidator.validateNotNull("shipTeam", shipTeam);

            var image = new Image();
            image.onload = function()
            {
               this.forceUpdate();
            }.bind(this);

            var filename = shipTeam.image;
            image.src = this.props.imageBase + "ship/" + filename;

            return image;
         },

         drawExplosion: function(context)
         {
            var explosion = this.props.explosion;

            if (explosion)
            {
               InputValidator.validateNotNull("scale", this.props.scale);
               InputValidator.validateNotNull("explosion.position", explosion.position);
               InputValidator.validateNotNull("explosion.shipBase", explosion.shipBase);
               InputValidator.validateNotNull("explosion.audioClip", explosion.audioClip);

               var position = explosion.position;
               var shipBase = explosion.shipBase;
               var audioClip = explosion.audioClip;

               var x = position.x();
               var y = position.y();
               var width = shipBase.width;
               var height = shipBase.height;

               context.save();
               context.scale(this.props.scale, this.props.scale);
               context.translate(x, y);
               context.drawImage(this.explosionImage, -width / 2, -height / 2, width, height);

               audioClip.play();

               // Cleanup.
               context.restore();
            }
         },

         drawLaserBeam: function(context)
         {
            var laserBeam = this.props.laserBeam;

            if (laserBeam)
            {
               InputValidator.validateNotNull("scale", this.props.scale);
               InputValidator.validateNotNull("laserBeam.fromPosition", laserBeam.fromPosition);
               InputValidator.validateNotNull("laserBeam.toPosition", laserBeam.toPosition);
               InputValidator.validateNotNull("laserBeam.isPrimary", laserBeam.isPrimary);
               InputValidator.validateNotNull("laserBeam.teamColor", laserBeam.teamColor);
               // audioClip optional.

               var fromPosition = laserBeam.fromPosition;
               var toPosition = laserBeam.toPosition;
               var isPrimary = laserBeam.isPrimary;
               var teamColor = laserBeam.teamColor;
               var audioClip = laserBeam.audioClip;

               var strokeStyle = teamColor;
               var lineDashSegments = (isPrimary ? undefined : [10, 5]);

               context.save();
               context.scale(this.props.scale, this.props.scale);
               context.lineWidth = 3;
               context.strokeStyle = strokeStyle;

               if (lineDashSegments)
               {
                  context.setLineDash(lineDashSegments);
               }

               context.beginPath();
               context.moveTo(fromPosition.x(), fromPosition.y());
               context.lineTo(toPosition.x(), toPosition.y());
               context.stroke();

               if (audioClip)
               {
                  audioClip.play();
               }

               // Cleanup.
               context.restore();
            }
         },

         drawManeuver: function(context)
         {
            var maneuverObj = this.props.maneuver;

            if (maneuverObj)
            {
               InputValidator.validateNotNull("playFormatKey", this.props.playFormatKey);
               InputValidator.validateNotNull("scale", this.props.scale);
               InputValidator.validateNotNull("maneuver.maneuver", maneuverObj.maneuver);
               InputValidator.validateNotNull("maneuver.fromPosition", maneuverObj.fromPosition);
               InputValidator.validateNotNull("maneuver.shipBase", maneuverObj.shipBase);

               var playFormatKey = this.props.playFormatKey;
               var maneuver = maneuverObj.maneuver;
               var fromPosition = maneuverObj.fromPosition;
               var shipBase = maneuverObj.shipBase;

               var FOREGROUND_COLOR = "white";
               var EASY_COLOR = "lime";
               var HARD_COLOR = "red";

               var toPosition = ManeuverComputer.computeToPosition(playFormatKey, maneuver, fromPosition, shipBase);

               var fromPolygon = ManeuverComputer.computeFromPolygon(fromPosition, shipBase);
               var path = ManeuverComputer.computePath(maneuver, fromPosition, shipBase);
               var toPolygon = ManeuverComputer.computeToPolygon(playFormatKey, maneuver, fromPosition, shipBase);

               context.save();
               context.scale(this.props.scale, this.props.scale);

               // Mark the center.
               context.fillStyle = FOREGROUND_COLOR;
               var radius = 4;
               context.beginPath();
               context.arc(fromPosition.x(), fromPosition.y(), radius, 0, 2 * Math.PI);
               context.fill();

               // Draw from ship base.
               fromPolygon.paintComponent(context, FOREGROUND_COLOR);

               if (toPolygon)
               {
                  // Draw to ship base.
                  toPolygon.paintComponent(context, FOREGROUND_COLOR);
               }

               // Draw maneuver path.
               var difficulty = maneuver.difficultyKey;
               path.paintComponent(context, getColor(difficulty));

               // Cleanup.
               context.restore();
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
         },

         // drawShipImage: function(context, id, image, position, shipTeam)
         // {
         //     var scale = this.props.scale;
         //
         //     ShipImage.draw(context, scale, id, image, position, shipTeam);
         // },

         drawTokens: function(context)
         {
            InputValidator.validateNotNull("context", context);
            InputValidator.validateNotNull("tokenPositions", this.props.tokenPositions);

            var scale = this.props.scale;
            var tokenPositions = this.props.tokenPositions;

            if (tokenPositions)
            {
               tokenPositions.forEach(function(tokenPosition)
               {
                  var token = tokenPosition.token;
                  var shipTeamKey = token.pilot().shipTeamKey;
                  var id = token.id();
                  var image = this.shipTeamToImage[shipTeamKey];
                  var position = tokenPosition.position;
                  var shipTeam = ShipTeam.properties[shipTeamKey];

                  // this.drawShipImage(context, id, image, position, shipTeam);
                  ShipImage.draw(context, scale, id, image, position, shipTeam);
               }, this);
            }
         },

         loadImages: function()
         {
            InputValidator.validateNotNull("tokenPositions", this.props.tokenPositions);

            var tokenPositions = this.props.tokenPositions;
            var shipTeams = [];

            tokenPositions.forEach(function(tokenPosition)
            {
               var shipTeam = tokenPosition.token.pilot().shipTeam;
               if (!shipTeams.includes(shipTeam))
               {
                  shipTeams.push(shipTeam);
               }
            });

            for (var i = 0; i < shipTeams.length; i++)
            {
               var shipTeam = shipTeams[i];
               this.shipTeamToImage[shipTeam.value] = this.createShipIcon(shipTeam);
            }

            this.explosionImage = this.createExplosionImage();
         },

         paint: function()
         {
            InputValidator.validateNotNull("width", this.props.width);
            InputValidator.validateNotNull("height", this.props.height);

            var canvas = document.getElementById("playAreaCanvas");
            var context = canvas.getContext("2d");

            context.clearRect(0, 0, this.props.width, this.props.height);

            this.drawTokens(context);
            this.drawManeuver(context);
            this.drawLaserBeam(context);
            this.drawExplosion(context);
         },
      });

      return PlayAreaUI;
   });
