package org.vizzini.starfightersquadrons;

import java.awt.Polygon;
import java.awt.geom.PathIterator;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Set;

import org.apache.commons.lang3.builder.ToStringBuilder;
import org.apache.commons.lang3.builder.ToStringStyle;
import org.vizzini.core.InputValidator;

/**
 * Provides an enumeration of ships for Starfighter Squadrons.
 */
public enum Ship
{
    /** Ship. */
    A_WING("A-Wing", "An A-Wing.", SSTeam.REBEL, Wave.TWO, ShipBase.STANDARD, ManeuverSet.A_WING_MANEUVERS,
            ShipAction.A_WING_ACTIONS),

            /** Ship. */
            B_WING("B-Wing", "A B-Wing.", SSTeam.REBEL, Wave.THREE, ShipBase.STANDARD, ManeuverSet.B_WING_MANEUVERS,
                    ShipAction.B_WING_ACTIONS),

                    /** Ship. */
                    E_WING("E-Wing", "An E-Wing.", SSTeam.REBEL, Wave.FOUR, ShipBase.STANDARD, ManeuverSet.E_WING_MANEUVERS,
                            ShipAction.E_WING_ACTIONS),

                            /** Ship. */
                            FIRESPRAY_31("Firespray-31", "A Firespray-31.", SSTeam.IMPERIAL, Wave.TWO, ShipBase.LARGE,
                                    FiringArc.FORWARD_AND_AFT, ManeuverSet.FIRESPRAY_31_MANEUVERS, ShipAction.FIRESPRAY_31_ACTIONS),

                                    /** Ship. */
                                    HWK_290("HWK-290", "An HWK-290.", SSTeam.REBEL, Wave.THREE, ShipBase.STANDARD, ManeuverSet.HWK_290_MANEUVERS,
                                            ShipAction.HWK_290_ACTIONS),

                                            /** Ship. */
                                            LAMBDA_CLASS_SHUTTLE("Lambda-class Shuttle", "A Lambda-class shuttle.", SSTeam.IMPERIAL, Wave.THREE,
                                                    ShipBase.LARGE, ManeuverSet.LAMBDA_CLASS_SHUTTLE_MANEUVERS, ShipAction.LAMBDA_CLASS_SHUTTLE_ACTIONS),

                                                    /** Ship. */
                                                    ROYAL_GUARD_TIE("Royal Guard TIE", "A Royal Guard TIE interceptor.", SSTeam.IMPERIAL, Wave.THREE_FIVE,
                                                            ShipBase.STANDARD, ManeuverSet.TIE_INTERCEPTOR_MANEUVERS, ShipAction.TIE_INTERCEPTOR_ACTIONS),

                                                            /** Ship. */
                                                            SABER_SQUADRON_TIE("Saber Squadron TIE", "A Saber Squadron TIE interceptor.", SSTeam.IMPERIAL, Wave.THREE_FIVE,
                                                                    ShipBase.STANDARD, ManeuverSet.TIE_INTERCEPTOR_MANEUVERS, ShipAction.TIE_INTERCEPTOR_ACTIONS),

                                                                    /** Ship. */
                                                                    TIE_ADVANCED("TIE Advanced", "A TIE advanced.", SSTeam.IMPERIAL, Wave.ONE, ShipBase.STANDARD,
                                                                            ManeuverSet.TIE_ADVANCED_MANEUVERS, ShipAction.TIE_ADVANCED_ACTIONS),

                                                                            /** Ship. */
                                                                            TIE_BOMBER("TIE Bomber", "A TIE bomber.", SSTeam.IMPERIAL, Wave.THREE, ShipBase.STANDARD,
                                                                                    ManeuverSet.TIE_BOMBER_MANEUVERS, ShipAction.TIE_BOMBER_ACTIONS),

                                                                                    /** Ship. */
                                                                                    TIE_DEFENDER("TIE Defender", "A TIE defender.", SSTeam.IMPERIAL, Wave.FOUR, ShipBase.STANDARD,
                                                                                            ManeuverSet.TIE_DEFENDER_MANEUVERS, ShipAction.TIE_DEFENDER_ACTIONS),

                                                                                            /** Ship. */
                                                                                            TIE_FIGHTER("TIE Fighter", "A TIE fighter.", SSTeam.IMPERIAL, Wave.CORE, ShipBase.STANDARD,
                                                                                                    ManeuverSet.TIE_FIGHTER_MANEUVERS, ShipAction.TIE_FIGHTER_ACTIONS),

                                                                                                    /** Ship. */
                                                                                                    TIE_INTERCEPTOR("TIE Interceptor", "A TIE interceptor.", SSTeam.IMPERIAL, Wave.TWO, ShipBase.STANDARD,
                                                                                                            ManeuverSet.TIE_INTERCEPTOR_MANEUVERS, ShipAction.TIE_INTERCEPTOR_ACTIONS),

                                                                                                            /** Ship. */
                                                                                                            TIE_PHANTOM("TIE Phantom", "A TIE phantom.", SSTeam.IMPERIAL, Wave.FOUR, ShipBase.STANDARD,
                                                                                                                    ManeuverSet.TIE_PHANTOM_MANEUVERS, ShipAction.TIE_PHANTOM_ACTIONS),

                                                                                                                    /** Ship. */
                                                                                                                    X_WING("X-Wing", "An X-Wing.", SSTeam.REBEL, Wave.CORE, ShipBase.STANDARD, ManeuverSet.X_WING_MANEUVERS,
                                                                                                                            ShipAction.X_WING_ACTIONS),

                                                                                                                            /** Ship. */
                                                                                                                            Y_WING("Y-Wing", "A Y-Wing.", SSTeam.REBEL, Wave.ONE, ShipBase.STANDARD, ManeuverSet.Y_WING_MANEUVERS,
                                                                                                                                    ShipAction.Y_WING_ACTIONS),

                                                                                                                                    /** Ship. */
                                                                                                                                    YT_1300("YT-1300", "A YT-1300.", SSTeam.REBEL, Wave.TWO, ShipBase.LARGE, ManeuverSet.YT_1300_MANEUVERS,
                                                                                                                                            ShipAction.YT_1300_ACTIONS)
                                                                                                                                            {
        @Override
        public boolean isVulnerableToPrimary(final SSPosition attackerPosition, final Ship defender,
                final SSPosition defenderPosition)
        {
            return true;
        }
                                                                                                                                            },

                                                                                                                                            /** Ship. */
                                                                                                                                            Z_95_HEADHUNTER("Z-95 Headhunter", "A Z-95 headhunter.", SSTeam.REBEL, Wave.FOUR, ShipBase.STANDARD,
                                                                                                                                                    ManeuverSet.Z_95_HEADHUNTER_MANEUVERS, ShipAction.Z_95_HEADHUNTER_ACTIONS);

                                                                                                                                            /** Provides an enumeration of firing arcs for Starfighter Squadrons. */
                                                                                                                                            public enum FiringArc
                                                                                                                                            {
                                                                                                                                                /** Firing arc. */
                                                                                                                                                FORWARD()
                                                                                                                                                {
                                                                                                                                                    @Override
                                                                                                                                                    public boolean isInFiringArc(final int bearing)
                                                                                                                                                    {
                                                                                                                                                        return (315 <= bearing) || (bearing <= 45);
                                                                                                                                                    }
                                                                                                                                                },
                                                                                                                                                /** Firing arc. */
                                                                                                                                                FORWARD_AND_AFT()
                                                                                                                                                {
                                                                                                                                                    @Override
                                                                                                                                                    public boolean isInFiringArc(final int bearing)
                                                                                                                                                    {
                                                                                                                                                        return ((315 <= bearing) || (bearing <= 45)) || ((135 <= bearing) && (bearing <= 225));
                                                                                                                                                    }
                                                                                                                                                };

                                                                                                                                                /**
                                                                                                                                                 * @param bearing Bearing to target.
                                                                                                                                                 *
                                                                                                                                                 * @return true if the target is in this ship's firing arc.
                                                                                                                                                 */
                                                                                                                                                public abstract boolean isInFiringArc(int bearing);
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @param team Team.
                                                                                                                                             *
                                                                                                                                             * @return values.
                                                                                                                                             */
                                                                                                                                            public static Ship[] valuesByTeam(final SSTeam team)
                                                                                                                                            {
                                                                                                                                                final List<Ship> answer = new ArrayList<Ship>();

                                                                                                                                                for (final Ship ship : values())
                                                                                                                                                {
                                                                                                                                                    if (ship.getTeam() == team)
                                                                                                                                                    {
                                                                                                                                                        answer.add(ship);
                                                                                                                                                    }
                                                                                                                                                }

                                                                                                                                                return answer.toArray(new Ship[answer.size()]);
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @param wave Wave.
                                                                                                                                             *
                                                                                                                                             * @return values.
                                                                                                                                             */
                                                                                                                                            public static Ship[] valuesByWave(final Wave wave)
                                                                                                                                            {
                                                                                                                                                final List<Ship> answer = new ArrayList<Ship>();

                                                                                                                                                for (final Ship ship : values())
                                                                                                                                                {
                                                                                                                                                    if (ship.getWave() == wave)
                                                                                                                                                    {
                                                                                                                                                        answer.add(ship);
                                                                                                                                                    }
                                                                                                                                                }

                                                                                                                                                return answer.toArray(new Ship[answer.size()]);
                                                                                                                                            }

                                                                                                                                            /** Description. */
                                                                                                                                            private final String description;

                                                                                                                                            /** Maneuvers. */
                                                                                                                                            private final ManeuverSet maneuvers;

                                                                                                                                            /** Name. */
                                                                                                                                            private final String name;

                                                                                                                                            /** Primary firing arc. */
                                                                                                                                            private final FiringArc primaryFiringArc;

                                                                                                                                            /** Ship actions. */
                                                                                                                                            private final Set<ShipAction> shipActions;

                                                                                                                                            /** Ship base. */
                                                                                                                                            private final ShipBase shipBase;

                                                                                                                                            /** Team. */
                                                                                                                                            private final SSTeam team;

                                                                                                                                            /** Wave. */
                                                                                                                                            private final Wave wave;

                                                                                                                                            /**
                                                                                                                                             * Construct this object.
                                                                                                                                             *
                                                                                                                                             * @param name Name.
                                                                                                                                             * @param description Description.
                                                                                                                                             * @param team Team.
                                                                                                                                             * @param wave Wave.
                                                                                                                                             * @param shipBase Ship base.
                                                                                                                                             * @param primaryFiringArc Primary firing arc.
                                                                                                                                             * @param maneuvers Possible maneuvers.
                                                                                                                                             * @param shipActions Ship actions.
                                                                                                                                             */
                                                                                                                                            @SuppressWarnings("hiding")
                                                                                                                                            private Ship(final String name, final String description, final SSTeam team, final Wave wave,
                                                                                                                                                    final ShipBase shipBase, final FiringArc primaryFiringArc, final ManeuverSet maneuvers,
                                                                                                                                                    final Set<ShipAction> shipActions)
                                                                                                                                            {
                                                                                                                                                InputValidator.validateNotEmpty("name", name);
                                                                                                                                                InputValidator.validateNotEmpty("description", description);
                                                                                                                                                InputValidator.validateNotNull("team", team);
                                                                                                                                                InputValidator.validateNotNull("wave", wave);
                                                                                                                                                InputValidator.validateNotNull("shipBase", shipBase);
                                                                                                                                                InputValidator.validateNotNull("primaryFiringArc", primaryFiringArc);
                                                                                                                                                InputValidator.validateNotEmpty("maneuvers", maneuvers);
                                                                                                                                                InputValidator.validateNotEmpty("shipActions", shipActions);

                                                                                                                                                this.name = name;
                                                                                                                                                this.description = description;
                                                                                                                                                this.team = team;
                                                                                                                                                this.wave = wave;
                                                                                                                                                this.shipBase = shipBase;
                                                                                                                                                this.primaryFiringArc = primaryFiringArc;
                                                                                                                                                this.maneuvers = maneuvers;
                                                                                                                                                this.shipActions = Collections.unmodifiableSet(shipActions);
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * Construct this object.
                                                                                                                                             *
                                                                                                                                             * @param name Name.
                                                                                                                                             * @param description Description.
                                                                                                                                             * @param team Team.
                                                                                                                                             * @param wave Wave.
                                                                                                                                             * @param shipBase Ship base.
                                                                                                                                             * @param maneuvers Possible maneuvers.
                                                                                                                                             * @param shipActions Ship actions.
                                                                                                                                             */
                                                                                                                                            @SuppressWarnings("hiding")
                                                                                                                                            private Ship(final String name, final String description, final SSTeam team, final Wave wave,
                                                                                                                                                    final ShipBase shipBase, final ManeuverSet maneuvers, final Set<ShipAction> shipActions)
                                                                                                                                            {
                                                                                                                                                this(name, description, team, wave, shipBase, FiringArc.FORWARD, maneuvers, shipActions);
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the description
                                                                                                                                             */
                                                                                                                                            public String getDescription()
                                                                                                                                            {
                                                                                                                                                return description;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the maneuvers
                                                                                                                                             */
                                                                                                                                            public ManeuverSet getManeuvers()
                                                                                                                                            {
                                                                                                                                                return maneuvers;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the name
                                                                                                                                             */
                                                                                                                                            public String getName()
                                                                                                                                            {
                                                                                                                                                return name;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the primaryFiringArc
                                                                                                                                             */
                                                                                                                                            public FiringArc getPrimaryFiringArc()
                                                                                                                                            {
                                                                                                                                                return primaryFiringArc;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the shipActions
                                                                                                                                             */
                                                                                                                                            public Set<ShipAction> getShipActions()
                                                                                                                                            {
                                                                                                                                                return shipActions;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the shipBase
                                                                                                                                             */
                                                                                                                                            public ShipBase getShipBase()
                                                                                                                                            {
                                                                                                                                                return shipBase;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the team
                                                                                                                                             */
                                                                                                                                            public SSTeam getTeam()
                                                                                                                                            {
                                                                                                                                                return team;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @return the wave
                                                                                                                                             */
                                                                                                                                            public Wave getWave()
                                                                                                                                            {
                                                                                                                                                return wave;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @param attackerPosition Attacker position.
                                                                                                                                             * @param defender Defender.
                                                                                                                                             * @param defenderPosition Defender position.
                                                                                                                                             *
                                                                                                                                             * @return true if the defender is in this ship's firing arc.
                                                                                                                                             */
                                                                                                                                            public boolean isInPrimaryFiringArc(final SSPosition attackerPosition, final Ship defender,
                                                                                                                                                    final SSPosition defenderPosition)
                                                                                                                                            {
                                                                                                                                                boolean answer = false;

                                                                                                                                                answer = primaryFiringArc.isInFiringArc(attackerPosition.computeBearing(defenderPosition));

                                                                                                                                                if (!answer)
                                                                                                                                                {
                                                                                                                                                    final ShipBase defenderBase = defender.getShipBase();
                                                                                                                                                    final Polygon polygon = defenderBase.computePolygon(defenderPosition);
                                                                                                                                                    final double[] coords = new double[6];

                                                                                                                                                    for (final PathIterator iter = polygon.getPathIterator(null); !iter.isDone(); iter.next())
                                                                                                                                                    {
                                                                                                                                                        iter.currentSegment(coords);
                                                                                                                                                        final int bearing = attackerPosition.computeBearing(coords[0], coords[1]);

                                                                                                                                                        if (primaryFiringArc.isInFiringArc(bearing))
                                                                                                                                                        {
                                                                                                                                                            answer = true;
                                                                                                                                                            break;
                                                                                                                                                        }
                                                                                                                                                    }
                                                                                                                                                }

                                                                                                                                                return answer;
                                                                                                                                            }

                                                                                                                                            /**
                                                                                                                                             * @param attackerPosition Attacker position.
                                                                                                                                             * @param defender Defender.
                                                                                                                                             * @param defenderPosition Defender position.
                                                                                                                                             *
                                                                                                                                             * @return true if the defender is vulnerable to this ship's weapons.
                                                                                                                                             */
                                                                                                                                            public boolean isVulnerableToPrimary(final SSPosition attackerPosition, final Ship defender,
                                                                                                                                                    final SSPosition defenderPosition)
                                                                                                                                            {
                                                                                                                                                return isInPrimaryFiringArc(attackerPosition, defender, defenderPosition);
                                                                                                                                            }

                                                                                                                                            @Override
                                                                                                                                            public String toString()
                                                                                                                                            {
                                                                                                                                                return ToStringBuilder.reflectionToString(this, ToStringStyle.SHORT_PREFIX_STYLE);
                                                                                                                                            }
}
