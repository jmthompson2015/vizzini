define(["Phase", "PlayFormat", "Ship", "Team", "process/Selector"],
    function(Phase, PlayFormat, Ship, Team, Selector)
    {
        "use strict";
        var Connector = {};

        Connector.MessageAreaUI = {
            mapStateToProps: function(state, ownProps)
            {
                var userMessage = state.userMessage;

                return (
                {
                    userMessage: userMessage,
                });
            },
        };

        Connector.PilotCardUI = {
            mapStateToProps: function(state, ownProps)
            {
                InputValidator.validateNotNull("token", ownProps.token);
                InputValidator.validateNotNull("imageBase", ownProps.imageBase);
                // isCompact is optional.

                var token = ownProps.token;

                return (
                {
                    // key: token.id(),
                    imageBase: ownProps.imageBase,
                    initialToken: token,
                    isCompact: ownProps.isCompact,
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
                    var pilotSkill0 = (token0.tokenFore ? token0.tokenFore().pilotSkillValue() : token0
                        .pilotSkillValue());
                    var pilotSkill1 = (token1.tokenFore ? token1.tokenFore().pilotSkillValue() : token1
                        .pilotSkillValue());
                    var answer = pilotSkill1 - pilotSkill0;

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
            EXPLOSION_PHASES: [Phase.COMBAT_DEAL_DAMAGE],
            LASER_AUDIO_PHASES: [Phase.COMBAT_ROLL_ATTACK_DICE, ],
            LASER_BEAM_PHASES: [Phase.COMBAT_DECLARE_TARGET, Phase.COMBAT_ROLL_ATTACK_DICE,
                        Phase.COMBAT_MODIFY_ATTACK_DICE, Phase.COMBAT_ROLL_DEFENSE_DICE,
                        Phase.COMBAT_MODIFY_DEFENSE_DICE, Phase.COMBAT_COMPARE_RESULTS, Phase.COMBAT_DEAL_DAMAGE, ],
            MANEUVER_PHASES: [Phase.ACTIVATION_REVEAL_DIAL, Phase.ACTIVATION_SET_TEMPLATE,
                        Phase.ACTIVATION_EXECUTE_MANEUVER, Phase.ACTIVATION_CHECK_PILOT_STRESS,
                        Phase.ACTIVATION_CLEAN_UP, ],

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

                var activeToken = Selector.activeToken(state);
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
                    if (Connector.PlayAreaUI.EXPLOSION_PHASES.vizziniContains(state.phaseKey))
                    {
                        var combatAction = activeToken.combatState().combatAction();

                        if (combatAction)
                        {
                            var attacker = combatAction.attacker();
                            var fromPosition = combatAction.attackerPosition();

                            if (fromPosition)
                            {
                                var toPosition = combatAction.defenderPosition();

                                if (toPosition)
                                {
                                    var isPrimary = combatAction.weapon().isPrimary();
                                    var teamColor = attacker.pilot().shipTeam.team.color;

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
                    if (Connector.PlayAreaUI.LASER_BEAM_PHASES.vizziniContains(state.phaseKey))
                    {
                        var combatAction = activeToken.combatState().combatAction();
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

                                    if (Connector.PlayAreaUI.LASER_AUDIO_PHASES.vizziniContains(state.phaseKey))
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
                    if (Connector.PlayAreaUI.MANEUVER_PHASES.vizziniContains(state.phaseKey))
                    {
                        var maneuverAction = activeToken.activationState().maneuverAction();

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
                });
            },
        };

        if (Object.freeze)
        {
            Object.freeze(Connector);
        }

        return Connector;
    });
