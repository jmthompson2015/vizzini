define([ "Quaternion", "Vector", "ship/Computer", "ship/Conduit", "ship/Power", "ship/Propulsion", "ship/Sensor",
        "ship/Storage" ], function(Quaternion, Vector, Computer, Conduit, Power, Propulsion, Sensor, Storage)
{
    "use strict";
    function ObserverSatellite(name, environment)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("environment", environment);

        // Power.
        var power = new Power.RTG("RTG", environment, name, Vector.ZERO, Quaternion.ZERO, 2);

        // Sensor.
        var sensor = new Sensor.Camera("Camera", environment, name, Vector.X_AXIS, Quaternion.ZERO, 1);

        var devices = [];
        devices.push(power);
        devices.push(sensor);

        var propulsionGroups = {};

        var conduit = new Conduit(name, power.produceType(), power, sensor);
        power.addProduceConduit(conduit);
        sensor.addConsumeConduit(conduit);

        return new Ship(name, devices, propulsionGroups);
    }

    function ReferenceShip(name, environment)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("environment", environment);

        var length = 0.040; // 40 m
        var width = 0.030; // 30 m
        var height = 0.010; // 10 m

        var forward = Vector.X_AXIS.multiply(length / 2.0);
        var aft = Vector.X_AXIS.multiply(-length / 2.0);
        var port = Vector.Y_AXIS.multiply(width / 2.0);
        var starboard = Vector.Y_AXIS.multiply(-width / 2.0);
        var dorsal = Vector.Z_AXIS.multiply(height / 2.0);
        var ventral = Vector.Z_AXIS.multiply(-height / 2.0);

        var forwardQ = Quaternion.ZERO;
        var portQ = Quaternion.newInstance(90.0, Vector.Z_AXIS);
        var aftQ = Quaternion.newInstance(180.0, Vector.Z_AXIS);
        var starboardQ = Quaternion.newInstance(270.0, Vector.Z_AXIS);
        var dorsalQ = Quaternion.newInstance(-90.0, Vector.Y_AXIS);
        var ventralQ = Quaternion.newInstance(90.0, Vector.Y_AXIS);

        // Fuel.
        var storage = new Storage.FuelTank("FuelTank", environment, name, Vector.X_AXIS.multiply(-length / 4.0),
                Quaternion.ZERO, 10000);

        // Power.
        var power = new Power.FusionReactor("FusionReactor", environment, name, Vector.ZERO, Quaternion.ZERO, 1, 200);

        // Computer.
        var computer = new Computer.AlignmentAutopilot("AlignmentAutopilot", environment, name, Vector.ZERO,
                Quaternion.ZERO, 1);

        // Sensors.
        var forwardSensor = new Sensor.Camera("ForwardCamera", environment, name, forward, forwardQ, 1);
        var aftSensor = new Sensor.Camera("AftCamera", environment, name, aft, aftQ, 1);
        var portSensor = new Sensor.Camera("PortCamera", environment, name, port, portQ, 1);
        var starboardSensor = new Sensor.Camera("StarboardCamera", environment, name, starboard, starboardQ, 1);
        var dorsalSensor = new Sensor.Camera("DorsalCamera", environment, name, dorsal, dorsalQ, 1);
        var ventralSensor = new Sensor.Camera("VentralCamera", environment, name, ventral, ventralQ, 1);

        // Propulsion (aft cluster).
        var mainProducePerTick = 1000;
        var retroProducePerTick = 10;
        var mainEngine = new Propulsion.IonEngine("MainEngine", environment, name, aft, forwardQ, 2, 1,
                mainProducePerTick);
        var portYawAftEngine = new Propulsion.IonEngine("PortYawAftEngine", environment, name, aft, starboardQ, 2, 1,
                retroProducePerTick);
        var starboardYawAftEngine = new Propulsion.IonEngine("StarboardYawAftEngine", environment, name, aft, portQ, 2,
                1, retroProducePerTick);
        var dorsalPitchAftEngine = new Propulsion.IonEngine("DorsalPitchAftEngine", environment, name, aft, ventralQ,
                2, 1, retroProducePerTick);
        var ventralPitchAftEngine = new Propulsion.IonEngine("VentralPitchAftEngine", environment, name, aft, dorsalQ,
                2, 1, retroProducePerTick);

        // Propulsion (forward cluster).
        var brakingEngine = new Propulsion.IonEngine("BrakingEngine", environment, name, forward, aftQ, 2, 1,
                mainProducePerTick / 2.0);
        var portYawForwardEngine = new Propulsion.IonEngine("PortYawForwardEngine", environment, name, forward, portQ,
                2, 1, retroProducePerTick);
        var starboardYawForwardEngine = new Propulsion.IonEngine("StarboardYawForwardEngine", environment, name,
                forward, starboardQ, 2, 1, retroProducePerTick);
        var dorsalPitchForwardEngine = new Propulsion.IonEngine("DorsalPitchForwardEngine", environment, name, forward,
                dorsalQ, 2, 1, retroProducePerTick);
        var ventralPitchForwardEngine = new Propulsion.IonEngine("VentralPitchForwardEngine", environment, name,
                forward, ventralQ, 2, 1, retroProducePerTick);

        // Propulsion (roll).
        var dorsalRollPortEngine = new Propulsion.IonEngine("DorsalRollPortEngine", environment, name, port, dorsalQ,
                2, 1, retroProducePerTick);
        var ventralRollPortEngine = new Propulsion.IonEngine("VentralRollPortEngine", environment, name, port,
                ventralQ, 2, 1, retroProducePerTick);
        var dorsalRollStarboardEngine = new Propulsion.IonEngine("DorsalRollStarboardEngine", environment, name,
                starboard, ventralQ, 2, 1, retroProducePerTick);
        var ventralRollStarboardEngine = new Propulsion.IonEngine("VentralRollStarboardEngine", environment, name,
                starboard, dorsalQ, 2, 1, retroProducePerTick);

        var devices = [];
        devices.push(storage);
        devices.push(power);
        devices.push(computer);
        devices.push(forwardSensor);
        devices.push(aftSensor);
        devices.push(portSensor);
        devices.push(starboardSensor);
        devices.push(dorsalSensor);
        devices.push(ventralSensor);
        devices.push(mainEngine);
        devices.push(portYawAftEngine);
        devices.push(starboardYawAftEngine);
        devices.push(dorsalPitchAftEngine);
        devices.push(ventralPitchAftEngine);
        devices.push(brakingEngine);
        devices.push(portYawForwardEngine);
        devices.push(starboardYawForwardEngine);
        devices.push(dorsalPitchForwardEngine);
        devices.push(ventralPitchForwardEngine);
        devices.push(dorsalRollPortEngine);
        devices.push(ventralRollPortEngine);
        devices.push(dorsalRollStarboardEngine);
        devices.push(ventralRollStarboardEngine);

        var propulsionGroups = {};
        propulsionGroups.portYaw = [ portYawAftEngine, portYawForwardEngine ];
        propulsionGroups.starboardYaw = [ starboardYawAftEngine, starboardYawForwardEngine ];
        propulsionGroups.dorsalPitch = [ dorsalPitchAftEngine, dorsalPitchForwardEngine ];
        propulsionGroups.ventralPitch = [ ventralPitchAftEngine, ventralPitchForwardEngine ];
        propulsionGroups.dorsalRoll = [ dorsalRollPortEngine, dorsalRollStarboardEngine ];
        propulsionGroups.ventralRoll = [ ventralRollPortEngine, ventralRollStarboardEngine ];
        propulsionGroups.forwardThrust = [ mainEngine ];
        propulsionGroups.reverseThrust = [ brakingEngine ];

        var i = 1;

        // Fuel to power.
        connect((i++).toString(), storage, power);

        // Power to computer.
        connect((i++).toString(), power, computer);

        // Power to sensors.
        connect((i++).toString(), power, forwardSensor);
        connect((i++).toString(), power, aftSensor);
        connect((i++).toString(), power, portSensor);
        connect((i++).toString(), power, starboardSensor);
        connect((i++).toString(), power, dorsalSensor);
        connect((i++).toString(), power, ventralSensor);

        // Fuel to propulsion.
        connect((i++).toString(), storage, mainEngine);
        connect((i++).toString(), storage, portYawAftEngine);
        connect((i++).toString(), storage, starboardYawAftEngine);
        connect((i++).toString(), storage, dorsalPitchAftEngine);
        connect((i++).toString(), storage, ventralPitchAftEngine);
        connect((i++).toString(), storage, brakingEngine);
        connect((i++).toString(), storage, portYawForwardEngine);
        connect((i++).toString(), storage, starboardYawForwardEngine);
        connect((i++).toString(), storage, dorsalPitchForwardEngine);
        connect((i++).toString(), storage, ventralPitchForwardEngine);
        connect((i++).toString(), storage, dorsalRollPortEngine);
        connect((i++).toString(), storage, ventralRollPortEngine);
        connect((i++).toString(), storage, dorsalRollStarboardEngine);
        connect((i++).toString(), storage, ventralRollStarboardEngine);

        // Power to propulsion.
        connect((i++).toString(), power, mainEngine);
        connect((i++).toString(), power, portYawAftEngine);
        connect((i++).toString(), power, starboardYawAftEngine);
        connect((i++).toString(), power, dorsalPitchAftEngine);
        connect((i++).toString(), power, ventralPitchAftEngine);
        connect((i++).toString(), power, brakingEngine);
        connect((i++).toString(), power, portYawForwardEngine);
        connect((i++).toString(), power, starboardYawForwardEngine);
        connect((i++).toString(), power, dorsalPitchForwardEngine);
        connect((i++).toString(), power, ventralPitchForwardEngine);
        connect((i++).toString(), power, dorsalRollPortEngine);
        connect((i++).toString(), power, ventralRollPortEngine);
        connect((i++).toString(), power, dorsalRollStarboardEngine);
        connect((i++).toString(), power, ventralRollStarboardEngine);

        return new Ship(name, devices, propulsionGroups);

        function connect(name, producer, consumer)
        {
            var conduit = new Conduit(name, producer.produceType(), producer, consumer);
            producer.addProduceConduit(conduit);
            consumer.addConsumeConduit(conduit);
        }
    }

    function Ship(name, devices, propulsionGroups)
    {
        InputValidator.validateNotNull("name", name);
        InputValidator.validateNotNull("devices", devices);
        InputValidator.validateNotNull("propulsionGroups", propulsionGroups);

        this.name = function()
        {
            return name;
        };

        this.device = function(deviceKey)
        {
            InputValidator.validateNotNull("deviceKey", deviceKey);

            var answer;

            for (var i = 0; i < devices.length; i++)
            {
                var device = devices[i];

                if (device.name() === deviceKey)
                {
                    answer = device;
                    break;
                }
            }
            return answer;
        };

        this.devices = function()
        {
            return devices.slice();
        };

        this.maneuverChanged = function(maneuver, isOn)
        {
            LOGGER.info("Ship.maneuverChanged() maneuver = " + maneuver + " isOn ? " + isOn);

            var propulsionGroup = propulsionGroups[maneuver];

            if (propulsionGroup)
            {
                propulsionGroup.forEach(function(engine)
                {
                    engine.isActive(isOn);
                });
            }
            else
            {
                throw "No propulsion group found for maneuver: " + maneuver + " on ship: " + name;
            }
        };

        this.propulsionGroup = function(groupKey)
        {
            return propulsionGroups[groupKey];
        };

        this.propulsionGroups = function()
        {
            return propulsionGroups;
        };
    }

    Ship.prototype.mass = function()
    {
        var answer = 1.0e+03;

        // FIXME: add up the mass of all the devices

        return answer;
    };

    Ship.prototype.momentOfInertia = function()
    {
        var answer = 1.0e+02;

        // FIXME: calculate the moment of inertia of the ship

        return answer;
    };

    Ship.prototype.tick = function(isSilent)
    {
        this.devices().forEach(function(device)
        {
            device.tick(isSilent);
        });
    };

    return (
    {
        ObserverSatellite: ObserverSatellite,
        ReferenceShip: ReferenceShip,
        Ship: Ship
    });
});
