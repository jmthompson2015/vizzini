package org.vizzini.ai.robot;

import java.util.List;

/**
 * Defines methods required by an agent.
 */
public interface Agent
{
    /**
     * @param actuatorName Actuator name.
     * 
     * @return the actuator with the given name, if any.
     */
    Actuator<?, ?> getActuatorByName(String actuatorName);

    /**
     * @return actuators.
     */
    List<Actuator<?, ?>> getActuators();

    /**
     * @return name.
     */
    String getName();

    /**
     * @param sensorName Sensor name.
     * 
     * @return the sensor with the given name, if any.
     */
    Sensor<?, ?> getSensorByName(String sensorName);

    /**
     * @return sensors.
     */
    List<Sensor<?, ?>> getSensors();

    /**
     * Perform task.
     * 
     * @return this object.
     */
    Agent performTask();
}
