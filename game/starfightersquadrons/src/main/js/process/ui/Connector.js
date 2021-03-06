"use strict";

define(["Phase", "PlayFormat", "Ship", "Team", "process/ManeuverAction", "process/Selector"],
   function(Phase, PlayFormat, Ship, Team, ManeuverAction, Selector)
   {
      var Connector = {};

      Connector.PilotCardCompactUI = {
         mapStateToProps: function(state, ownProps)
         {
            InputValidator.validateNotNull("token", ownProps.token);
            InputValidator.validateNotNull("imageBase", ownProps.imageBase);

            var token = ownProps.token;

            return (
            {
               imageBase: ownProps.imageBase,
               token: token,
            });
         },
      };

      Connector.PilotCardUI = {
         mapStateToProps: function(state, ownProps)
         {
            InputValidator.validateNotNull("token", ownProps.token);
            InputValidator.validateNotNull("imageBase", ownProps.imageBase);

            var token = ownProps.token;

            return (
            {
               imageBase: ownProps.imageBase,
               initialToken: token,
            });
         },
      };

      Connector.PilotsUI = {
         mapStateToProps: function(state, ownProps)
         {
            InputValidator.validateNotNull("environment", ownProps.environment);
            InputValidator.validateNotNull("team", ownProps.team);

            var environment = ownProps.environment;
            var team = ownProps.team;
            var tokens = environment.getTokensForTeam(team);
            tokens.sort(function(token0, token1)
            {
               var pilotSkill0 = token0.pilotSkillValue();
               var pilotSkill1 = token1.pilotSkillValue();
               var answer = pilotSkill0 - pilotSkill1;

               if (answer === 0)
               {
                  answer = token0.id() - token1.id();
               }

               return answer;
            });

            return (
            {
               tokens: tokens,
            });
         },
      };

      Connector.PlayAreaUI = {
         EXPLOSION_PHASES: [Phase.COMBAT_AFTER_DEAL_DAMAGE],
         LASER_AUDIO_PHASES: [Phase.COMBAT_ROLL_ATTACK_DICE, ],
         LASER_BEAM_PHASES: [Phase.COMBAT_DECLARE_TARGET, Phase.COMBAT_ROLL_ATTACK_DICE, Phase.COMBAT_MODIFY_ATTACK_DICE, Phase.COMBAT_ROLL_DEFENSE_DICE, Phase.COMBAT_MODIFY_DEFENSE_DICE, Phase.COMBAT_COMPARE_RESULTS, Phase.COMBAT_NOTIFY_DAMAGE, Phase.COMBAT_DEAL_DAMAGE, Phase.COMBAT_AFTER_DEAL_DAMAGE],
         MANEUVER_PHASES: [Phase.ACTIVATION_REVEAL_DIAL, Phase.ACTIVATION_SET_TEMPLATE, Phase.ACTIVATION_EXECUTE_MANEUVER, Phase.ACTIVATION_CHECK_PILOT_STRESS, Phase.ACTIVATION_CLEAN_UP],

         mapStateToProps: function(state, ownProps)
         {
            LOGGER.trace("Connector.PlayAreaUI.mapStateToProps()");

            InputValidator.validateNotNull("environment", ownProps.environment);

            var environment = ownProps.environment;
            var scale = state.playAreaScale;
            var image = (state.playFormatKey === PlayFormat.STANDARD ? "pia13845.jpg" :
               "horsehead_nebula_02092008.jpg");
            var width = (state.playFormatKey === PlayFormat.STANDARD ? 915 : 1830);
            var tokenPositions = environment.createTokenPositions();

            var answer = {
               playFormatKey: state.playFormatKey,
               scale: state.playAreaScale,
               width: scale * width,
               height: scale * 915,
               image: image,
               tokenPositions: tokenPositions,
            };

            var activeToken = environment.activeToken();
            LOGGER.debug("activeToken = " + activeToken);

            if (activeToken)
            {
               checkManeuver(state, activeToken, answer);
               checkLaserBeam(state, activeToken, answer);
               checkExplosion(state, activeToken, answer);
            }

            return answer;

            function checkExplosion(state, activeToken, answer)
            {
               if (Connector.PlayAreaUI.EXPLOSION_PHASES.includes(state.phaseKey))
               {
                  var combatAction = Selector.combatAction(state, activeToken);

                  if (combatAction)
                  {
                     var fromPosition = combatAction.attackerPosition();

                     if (fromPosition)
                     {
                        var toPosition = combatAction.defenderPosition();

                        if (toPosition)
                        {
                           var defender = combatAction.defender();

                           if (defender && defender.isDestroyed())
                           {
                              LOGGER.debug("setting explosion data");

                              answer.explosion = {
                                 position: toPosition,
                                 shipBase: defender.pilot().shipTeam.ship.shipBase,
                                 audioClip: document.getElementById("explosionAudio"),
                              };
                           }
                        }
                     }
                  }
               }
            }

            function checkLaserBeam(state, activeToken, answer)
            {
               if (Connector.PlayAreaUI.LASER_BEAM_PHASES.includes(state.phaseKey))
               {
                  var combatAction = Selector.combatAction(state, activeToken);
                  LOGGER.debug("combatAction = " + combatAction);

                  if (combatAction)
                  {
                     var attacker = combatAction.attacker();
                     var fromPosition = combatAction.attackerPosition();
                     LOGGER.debug("fromPosition = " + fromPosition);

                     if (fromPosition)
                     {
                        var defender = combatAction.defender();
                        var toPosition = combatAction.defenderPosition();
                        LOGGER.debug("toPosition = " + toPosition);

                        if (toPosition && !defender.isDestroyed())
                        {
                           var isPrimary = combatAction.weapon().isPrimary();
                           var teamColor = attacker.pilot().shipTeam.team.color;
                           var audioClip;

                           if (Connector.PlayAreaUI.LASER_AUDIO_PHASES.includes(state.phaseKey))
                           {
                              audioClip = getLaserAudioClip(attacker);
                           }
                           LOGGER.debug("setting laser beam data");

                           answer.laserBeam = {
                              fromPosition: fromPosition,
                              toPosition: toPosition,
                              isPrimary: isPrimary,
                              teamColor: teamColor,
                              audioClip: audioClip,
                           };
                        }
                     }
                  }
               }
            }

            function checkManeuver(state, activeToken, answer)
            {
               if (Connector.PlayAreaUI.MANEUVER_PHASES.includes(state.phaseKey))
               {
                  var maneuverAction = ManeuverAction.get(activeToken.store(), activeToken.id());

                  if (maneuverAction)
                  {
                     var maneuver = maneuverAction.maneuver();
                     var fromPosition = maneuverAction.fromPosition();
                     var shipBase = maneuverAction.shipBase();
                     LOGGER.debug("setting maneuver data");

                     answer.maneuver = {
                        maneuver: maneuver,
                        fromPosition: fromPosition,
                        shipBase: shipBase,
                     };
                  }
               }
            }

            function getLaserAudioClip(token)
            {
               var answer;

               var shipKey = token.pilot().shipTeam.shipKey;

               if (shipKey === Ship.YT_1300 || shipKey === Ship.YT_2400)
               {
                  answer = document.getElementById("millenniumFalconLaserAudio");
               }
               else if (shipKey === Ship.FIRESPRAY_31)
               {
                  answer = document.getElementById("slave1LaserAudio");
               }
               else
               {
                  var teamKey = token.pilot().shipTeam.teamKey;

                  if (teamKey === Team.IMPERIAL)
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
         },
      };

      Connector.StatusBarUI = {
         mapStateToProps: function(state, ownProps)
         {
            InputValidator.validateNotNull("environment", ownProps.environment);

            var environment = ownProps.environment;
            var activeToken = environment.getTokenById(state.activeTokenId);
            var activeShipName = (activeToken ? activeToken.name() : "");

            return (
            {
               round: state.round,
               phase: Phase.properties[state.phaseKey],
               activeShipName: activeShipName,
               userMessage: state.userMessage,
            });
         },
      };

      if (Object.freeze)
      {
         Object.freeze(Connector);
      }

      return Connector;
   });
