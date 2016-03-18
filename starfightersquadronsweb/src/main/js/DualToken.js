define([ "ActivationState", "Maneuver", "Pilot", "Token" ],
        function(ActivationState, Maneuver, Pilot, Token)
        {
            "use strict";
            function DualToken(pilotKey, agent, upgradeKeysFore, upgradeKeysAft)
            {
                InputValidator.validateNotNull("pilotKey", pilotKey);
                InputValidator.validateNotNull("agent", agent);

                this.pilotKey = function()
                {
                    return pilotKey;
                };

                this.agent = function()
                {
                    return agent;
                };

                var that = this;
                var id = Token.nextId();
                var pilot = Pilot.properties[pilotKey];
                var shipTeam = pilot.shipTeam;
                var ship = shipTeam.ship;

                var pilotFore = pilot.fore;
                pilotFore.shipTeam = pilot.shipTeam;
                var pilotAft = pilot.aft;
                pilotAft.shipTeam = pilot.shipTeam;
                var tokenFore = new Token(pilotFore, agent, upgradeKeysFore);
                tokenFore.parent = this;
                var tokenAft = new Token(pilotAft, agent, upgradeKeysAft);
                tokenAft.parent = this;

                var myCrippledPilotFore, myCrippledPilotAft;
                var myCrippledTokenFore, myCrippledTokenAft;

                var activationState = new ActivationState();

                this.activationState = function()
                {
                    return activationState;
                };

                this.id = function()
                {
                    return id;
                };

                this.isDestroyed = function()
                {
                    this.tokenFore();
                    this.tokenAft();

                    return !(myCrippledTokenFore === undefined || myCrippledTokenAft === undefined);
                };

                this.newInstance = function(agent)
                {
                    var answer = new DualToken(pilotKey, agent, tokenFore.upgradeKeys().slice(), tokenAft.upgradeKeys()
                            .slice());

                    return answer;
                };

                this.pilot = function()
                {
                    return pilot;
                };

                this.pilotAft = function()
                {
                    var answer = pilotAft;

                    if (tokenAft.isDestroyed())
                    {
                        answer = crippledPilotAft();
                    }

                    return answer;
                };

                this.pilotFore = function()
                {
                    var answer = pilotFore;

                    if (tokenFore.isDestroyed())
                    {
                        answer = crippledPilotFore();
                    }

                    return answer;
                };

                this.removeAllTargetLocks = function()
                {
                    tokenFore.removeAllTargetLocks();
                    tokenAft.removeAllTargetLocks();

                    if (myCrippledTokenFore !== undefined)
                    {
                        myCrippledTokenFore.removeAllTargetLocks();
                    }

                    if (myCrippledTokenAft)
                    {
                        myCrippledTokenAft.removeAllTargetLocks();
                    }
                };

                this.ship = function()
                {
                    return ship;
                };

                this.tokenAft = function()
                {
                    var answer = tokenAft;

                    if (tokenAft.isDestroyed())
                    {
                        answer = crippledTokenAft();
                    }

                    return answer;
                };

                this.tokenFore = function()
                {
                    var answer = tokenFore;

                    if (tokenFore.isDestroyed())
                    {
                        answer = crippledTokenFore();
                    }

                    return answer;
                };

                function crippledPilotAft()
                {
                    if (myCrippledPilotAft === undefined)
                    {
                        myCrippledPilotAft = pilot.crippledAft;
                        myCrippledPilotAft.shipTeam = pilot.shipTeam;
                    }

                    return myCrippledPilotAft;
                }

                function crippledPilotFore()
                {
                    if (myCrippledPilotFore === undefined)
                    {
                        myCrippledPilotFore = pilot.crippledFore;
                        myCrippledPilotFore.shipTeam = pilot.shipTeam;
                    }

                    return myCrippledPilotFore;
                }

                function crippledTokenAft()
                {
                    if (myCrippledTokenAft === undefined)
                    {
                        var upgradeKeys = [];
                        myCrippledTokenAft = new Token(crippledPilotAft(), agent, upgradeKeys);
                        myCrippledTokenAft.parent = that;
                    }

                    return myCrippledTokenAft;
                }

                function crippledTokenFore()
                {
                    if (myCrippledTokenFore === undefined)
                    {
                        var upgradeKeys = [];
                        myCrippledTokenFore = new Token(crippledPilotFore(), agent, upgradeKeys);
                        myCrippledTokenFore.parent = that;
                    }

                    return myCrippledTokenFore;
                }
            }

            DualToken.prototype.isStressed = function()
            {
                return false;
            };

            DualToken.prototype.isUpgradedWith = function(upgradeKey)
            {
                return false;
            };

            DualToken.prototype.maneuverEffect = function(maneuverKey)
            {
                LOGGER.trace("Token.maneuverEffect() start");
                InputValidator.validateNotNull("maneuverKey", maneuverKey);

                var maneuver = Maneuver.properties[maneuverKey];

                if (maneuver.energy)
                {
                    // Gain energy up to the energy limit.
                    var energyLimit = this.tokenAft().energyLimit();
                    LOGGER.trace(this.pilotName() + " energyLimit = " + energyLimit);

                    for (var i = 0; i < maneuver.energy; i++)
                    {
                        if (this.tokenAft().energy().count() < energyLimit)
                        {
                            this.tokenAft().energy().increase();
                        }
                    }
                }

                LOGGER.trace("Token.maneuverEffect() end");
            };

            DualToken.prototype.maneuverKeys = function()
            {
                return this.pilot().shipTeam.ship.maneuverKeys.slice();
            };

            DualToken.prototype.name = function()
            {
                return this.id() + " " + this.pilot().name;
            };

            DualToken.prototype.phaseEffect = function(environment, phase)
            {
                this.tokenFore().phaseEffect(environment, phase);
                this.tokenAft().phaseEffect(environment, phase);
            };

            DualToken.prototype.pilotName = function()
            {
                var properties = this.pilot();
                var isUnique = properties.isUnique;
                var answer = this.id() + " ";

                if (isUnique)
                {
                    answer += "\u25CF ";
                }

                answer += properties.name;

                return answer;
            };

            DualToken.prototype.primaryWeapon = function()
            {
                return this.tokenFore().primaryWeapon();
            };

            DualToken.prototype.shipName = function()
            {
                return this.pilot().shipTeam.ship.name;
            };

            DualToken.prototype.toString = function()
            {
                return this.name();
            };

            MicroEvent.mixin(DualToken);

            return DualToken;
        });
