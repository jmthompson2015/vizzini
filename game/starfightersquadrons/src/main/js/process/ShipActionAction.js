define(["DamageCard", "Event", "Maneuver", "Phase", "UpgradeCard", "UpgradeType", "process/ManeuverAction", "ShipAction", "process/Action", "process/DamageAbility2", "process/TargetLock", "process/UpgradeAbility2"],
    function(DamageCard, Event, Maneuver, Phase, UpgradeCard, UpgradeType, ManeuverAction, ShipAction, Action, DamageAbility2, TargetLock, UpgradeAbility2)
    {
        "use strict";

        function BarrelRoll(environment, token, maneuverKey)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            this.shipActionKey = function()
            {
                return ShipAction.BARREL_ROLL;
            };

            this.environment = function()
            {
                return environment;
            };

            this.token = function()
            {
                return token;
            };

            this.maneuverKey = function()
            {
                return maneuverKey;
            };
        }

        BarrelRoll.prototype.doIt = function()
        {
            var maneuverAction = new ManeuverAction(this.environment(), this.token(), this.maneuverKey());
            maneuverAction.doIt();
        };

        BarrelRoll.prototype.toString = function()
        {
            return Maneuver.properties[this.maneuverKey()].bearing.name;
        };

        function Boost(environment, token, maneuverKey)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            this.shipActionKey = function()
            {
                return ShipAction.BOOST;
            };

            this.environment = function()
            {
                return environment;
            };

            this.token = function()
            {
                return token;
            };

            this.maneuverKey = function()
            {
                return maneuverKey;
            };
        }

        Boost.prototype.doIt = function()
        {
            var maneuverAction = new ManeuverAction(this.environment(), this.token(), this.maneuverKey());
            maneuverAction.doIt();
        };

        Boost.prototype.toString = function()
        {
            var parts = Maneuver.properties[this.maneuverKey()].bearing.name.split(" ");

            return "Boost " + parts[parts.length - 1];
        };

        function Cloak(store, token)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);

            this.shipActionKey = function()
            {
                return ShipAction.CLOAK;
            };

            this.store = function()
            {
                return store;
            };

            this.token = function()
            {
                return token;
            };
        }

        Cloak.prototype.doIt = function()
        {
            this.store().dispatch(Action.addCloakCount(this.token()));
        };

        Cloak.prototype.toString = function()
        {
            return "Cloak";
        };

        function Coordinate(token)
        {
            InputValidator.validateNotNull("token", token);

            this.shipActionKey = function()
            {
                return ShipAction.COORDINATE;
            };

            this.token = function()
            {
                return token;
            };
        }

        Coordinate.prototype.doIt = function()
        {
            LOGGER.warn("Coordinate.doIt() not yet implemented.");
        };

        Coordinate.prototype.toString = function()
        {
            return "Coordinate: " + this.token().name();
        };

        function Decloak(environment, token, maneuverKey)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            this.shipActionKey = function()
            {
                return ShipAction.DECLOAK;
            };

            this.environment = function()
            {
                return environment;
            };

            this.token = function()
            {
                return token;
            };

            this.maneuverKey = function()
            {
                return maneuverKey;
            };
        }

        Decloak.prototype.doIt = function()
        {
            var maneuverAction = new ManeuverAction(this.environment(), this.token(), this.maneuverKey());
            maneuverAction.doIt();
            var store = this.environment().store();
            store.dispatch(Action.addCloakCount(this.token(), -1));
        };

        Decloak.prototype.toString = function()
        {
            var maneuver = Maneuver.properties[this.maneuverKey()];

            return "Decloak: " + maneuver.bearing.name + " " + maneuver.speed;
        };

        function Evade(store, token)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);

            this.shipActionKey = function()
            {
                return ShipAction.EVADE;
            };

            this.store = function()
            {
                return store;
            };

            this.token = function()
            {
                return token;
            };
        }

        Evade.prototype.doIt = function()
        {
            var store = this.store();
            this.store().dispatch(Action.addEvadeCount(this.token()));
            store.dispatch(Action.setEvent(Event.EVADE_ACTION_PERFORMED, this.token()));
        };

        Evade.prototype.toString = function()
        {
            return "Evade";
        };

        function Focus(store, token)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);

            this.shipActionKey = function()
            {
                return ShipAction.FOCUS;
            };

            this.store = function()
            {
                return store;
            };

            this.token = function()
            {
                return token;
            };
        }

        Focus.prototype.doIt = function()
        {
            var store = this.store();
            store.dispatch(Action.addFocusCount(this.token()));
            store.dispatch(Action.setEvent(Event.FOCUS_ACTION_PERFORMED, this.token()));
        };

        Focus.prototype.toString = function()
        {
            return "Focus";
        };

        function Jam(store, defender)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("defender", defender);

            this.shipActionKey = function()
            {
                return ShipAction.JAM;
            };

            this.store = function()
            {
                return store;
            };

            this.defender = function()
            {
                return defender;
            };
        }

        Jam.prototype.doIt = function()
        {
            var store = this.store();
            var defender = this.defender();

            if (defender.stressCount() < 2)
            {
                defender.receiveStress();
            }
            if (defender.stressCount() < 2)
            {
                defender.receiveStress();
            }
        };

        Jam.prototype.toString = function()
        {
            return "Jam: " + this.defender().name();
        };

        function Recover(token)
        {
            InputValidator.validateNotNull("token", token);

            this.shipActionKey = function()
            {
                return ShipAction.RECOVER;
            };

            this.token = function()
            {
                return token;
            };
        }

        Recover.prototype.doIt = function()
        {
            LOGGER.warn("Recover.doIt() not yet implemented.");
        };

        Recover.prototype.toString = function()
        {
            var answer = "Recover";

            if (this.token().parent !== undefined)
            {
                answer += ": " + this.token().name();
            }

            return answer;
        };

        function Reinforce(store, token)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);

            this.shipActionKey = function()
            {
                return ShipAction.REINFORCE;
            };

            this.store = function()
            {
                return store;
            };

            this.token = function()
            {
                return token;
            };
        }

        Reinforce.prototype.doIt = function()
        {
            this.store().dispatch(Action.addReinforceCount(this.token()));
        };

        Reinforce.prototype.toString = function()
        {
            var answer = "Reinforce";

            if (this.token().parent !== undefined)
            {
                answer += ": " + this.token().name();
            }

            return answer;
        };

        function SAADamageCard(store, token, damageKey)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("damageKey", damageKey);

            this.shipActionKey = function()
            {
                return "criticalDamage";
            };

            this.store = function()
            {
                return store;
            };

            this.token = function()
            {
                return token;
            };

            this.damageKey = function()
            {
                return damageKey;
            };

            var damage = DamageCard.properties[damageKey];

            this.damage = function()
            {
                return damage;
            };

            var damageAbility = (DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION] !== undefined ? DamageAbility2[Phase.ACTIVATION_PERFORM_ACTION][damageKey] : undefined);

            this.damageAbility = function()
            {
                return damageAbility;
            };
        }

        SAADamageCard.prototype.doIt = function()
        {
            var store = this.store();
            var token = this.token();
            var damageAbility = this.damageAbility();

            if (damageAbility && damageAbility.consequent)
            {
                damageAbility.consequent(store, token);
            }
        };

        SAADamageCard.prototype.toString = function()
        {
            var damage = this.damage();

            return "Damage Action: " + damage.name;
        };

        function SAATargetLock(store, attacker, defender)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("attacker", attacker);
            InputValidator.validateNotNull("defender", defender);

            this.shipActionKey = function()
            {
                return ShipAction.TARGET_LOCK;
            };

            this.store = function()
            {
                return store;
            };

            this.attacker = function()
            {
                return attacker;
            };

            this.defender = function()
            {
                return defender;
            };
        }

        SAATargetLock.prototype.doIt = function()
        {
            var store = this.store();
            var attacker = this.attacker();
            var defender = this.defender();
            var targetLock = new TargetLock(store, attacker, defender);
            attacker.addAttackerTargetLock(targetLock);
            store.dispatch(Action.setEvent(Event.TARGET_LOCK_ACQUIRED, attacker));
        };

        SAATargetLock.prototype.toString = function()
        {
            return "Target Lock: " + this.defender().name();
        };

        function SAAUpgradeCard(store, token, upgradeKey)
        {
            InputValidator.validateNotNull("store", store);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("upgradeKey", upgradeKey);

            this.shipActionKey = function()
            {
                return "upgrade";
            };

            this.store = function()
            {
                return store;
            };

            this.token = function()
            {
                return token;
            };

            this.upgradeKey = function()
            {
                return upgradeKey;
            };

            var upgrade = UpgradeCard.properties[upgradeKey];

            this.upgrade = function()
            {
                return upgrade;
            };

            var upgradeType = UpgradeType.properties[upgrade.type];

            this.upgradeType = function()
            {
                return upgradeType;
            };

            var upgradeAbility = (UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION] !== undefined ? UpgradeAbility2[Phase.ACTIVATION_PERFORM_ACTION][upgradeKey] : undefined);

            this.upgradeAbility = function()
            {
                return upgradeAbility;
            };
        }

        SAAUpgradeCard.prototype.doIt = function()
        {
            var store = this.store();
            var token = this.token();
            var upgradeAbility = this.upgradeAbility();

            if (upgradeAbility && upgradeAbility.consequent)
            {
                upgradeAbility.consequent(store, token);
            }
        };

        SAAUpgradeCard.prototype.toString = function()
        {
            var upgrade = this.upgrade();

            return "Upgrade Action: " + upgrade.name;
        };

        function Slam(environment, token, maneuverKey)
        {
            InputValidator.validateNotNull("environment", environment);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("maneuverKey", maneuverKey);

            this.shipActionKey = function()
            {
                return ShipAction.SLAM;
            };

            this.environment = function()
            {
                return environment;
            };

            this.token = function()
            {
                return token;
            };

            this.maneuverKey = function()
            {
                return maneuverKey;
            };
        }

        Slam.prototype.doIt = function()
        {
            var maneuverAction = new ManeuverAction(this.environment(), this.token(), this.maneuverKey());
            maneuverAction.doIt();
            var store = this.environment().store();
            store.dispatch(Action.addWeaponsDisabledCount(this.token()));
        };

        Slam.prototype.toString = function()
        {
            var maneuver = Maneuver.properties[this.maneuverKey()];

            return "SLAM: " + maneuver.bearing.name + " " + maneuver.speed;
        };

        return (
        {
            BarrelRoll: BarrelRoll,
            Boost: Boost,
            Cloak: Cloak,
            Coordinate: Coordinate,
            Decloak: Decloak,
            Evade: Evade,
            Focus: Focus,
            Jam: Jam,
            Recover: Recover,
            Reinforce: Reinforce,
            SAADamageCard: SAADamageCard,
            SAATargetLock: SAATargetLock,
            SAAUpgradeCard: SAAUpgradeCard,
            Slam: Slam,
        });
    });
