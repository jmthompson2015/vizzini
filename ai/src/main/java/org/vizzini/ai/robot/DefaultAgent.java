package org.vizzini.ai.robot;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Provides a default implementation of an agent.
 */
public final class DefaultAgent implements Agent
{
    /** Name. */
    private final String name;

    /** Actuators. */
    private final List<Actuator<?, ?>> actuators = new ArrayList<Actuator<?, ?>>();

    /** Map of actuator name to actuator. */
    private final Map<String, Actuator<?, ?>> nameToActuatorMap = new HashMap<String, Actuator<?, ?>>();

    /** Sensors. */
    private final List<Sensor<?, ?>> sensors = new ArrayList<Sensor<?, ?>>();

    /** Map of sensor name to sensor. */
    private final Map<String, Sensor<?, ?>> nameToSensorMap = new HashMap<String, Sensor<?, ?>>();

    /**
     * Construct this object.
     * 
     * @param name Name.
     * @param actuators Actuators.
     * @param sensors Sensors.
     */
    @SuppressWarnings("hiding")
    public DefaultAgent(final String name, final List<Actuator<?, ?>> actuators, final List<Sensor<?, ?>> sensors)
    {
        this.name = name;

        this.actuators.addAll(actuators);

        for (final Actuator<?, ?> actuator : actuators)
        {
            nameToActuatorMap.put(actuator.getName(), actuator);
        }

        this.sensors.addAll(sensors);

        for (final Sensor<?, ?> sensor : sensors)
        {
            nameToSensorMap.put(sensor.getName(), sensor);
        }
    }

    @Override
    public Actuator<?, ?> getActuatorByName(final String actuatorName)
    {
        return nameToActuatorMap.get(actuatorName);
    }

    @Override
    public List<Actuator<?, ?>> getActuators()
    {
        return actuators;
    }

    @Override
    public String getName()
    {
        return name;
    }

    @Override
    public Sensor<?, ?> getSensorByName(final String sensorName)
    {
        return nameToSensorMap.get(sensorName);
    }

    @Override
    public List<Sensor<?, ?>> getSensors()
    {
        return sensors;
    }

    @Override
    public Agent performTask()
    {
        // Loop through the sensors, firing applicable rules, until done.

        return this;
    }
}
