define([ "Maneuver", "ManeuverAction", "ShipAction", "TargetLock" ], function(Maneuver, ManeuverAction, ShipAction,
        TargetLock)
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

    function Cloak(token)
    {
        InputValidator.validateNotNull("token", token);

        this.shipActionKey = function()
        {
            return ShipAction.CLOAK;
        };

        this.token = function()
        {
            return token;
        };
    }

    Cloak.prototype.doIt = function()
    {
        this.token().cloak().increase();
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
        this.token().cloak().decrease();
    };

    Decloak.prototype.toString = function()
    {
        var maneuver = Maneuver.properties[this.maneuverKey()];

        return "Decloak: " + maneuver.bearing.name + " " + maneuver.speed;
    };

    function Evade(token)
    {
        InputValidator.validateNotNull("token", token);

        this.shipActionKey = function()
        {
            return ShipAction.EVADE;
        };

        this.token = function()
        {
            return token;
        };
    }

    Evade.prototype.doIt = function()
    {
        this.token().evade().increase();
    };

    Evade.prototype.toString = function()
    {
        return "Evade";
    };

    function Focus(token)
    {
        InputValidator.validateNotNull("token", token);

        this.shipActionKey = function()
        {
            return ShipAction.FOCUS;
        };

        this.token = function()
        {
            return token;
        };
    }

    Focus.prototype.doIt = function()
    {
        this.token().focus().increase();
    };

    Focus.prototype.toString = function()
    {
        return "Focus";
    };

    function Jam(defender)
    {
        InputValidator.validateNotNull("defender", defender);

        this.shipActionKey = function()
        {
            return ShipAction.JAM;
        };

        this.defender = function()
        {
            return defender;
        };
    }

    Jam.prototype.doIt = function()
    {
        var stress = this.defender().stress();

        if (stress.count() < 2)
        {
            stress.increase();
        }
        if (stress.count() < 2)
        {
            stress.increase();
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
        return "Recover: " + this.token().name();
    };

    function Reinforce(token)
    {
        InputValidator.validateNotNull("token", token);

        this.shipActionKey = function()
        {
            return ShipAction.REINFORCE;
        };

        this.token = function()
        {
            return token;
        };
    }

    Reinforce.prototype.doIt = function()
    {
        this.token().reinforce().increase();
    };

    Reinforce.prototype.toString = function()
    {
        return "Reinforce: " + this.token().name();
    };

    function SAATargetLock(attacker, defender)
    {
        InputValidator.validateNotNull("attacker", attacker);
        InputValidator.validateNotNull("defender", defender);

        this.shipActionKey = function()
        {
            return ShipAction.TARGET_LOCK;
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
        var attacker = this.attacker();
        var defender = this.defender();
        var targetLock = new TargetLock(attacker, defender);
        attacker.addAttackerTargetLock(targetLock);
        defender.addDefenderTargetLock(targetLock);
    };

    SAATargetLock.prototype.toString = function()
    {
        return "Target Lock: " + this.defender().name();
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
        this.token().weaponsDisabled().increase();
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
        SAATargetLock: SAATargetLock,
        Slam: Slam,
    });
});
