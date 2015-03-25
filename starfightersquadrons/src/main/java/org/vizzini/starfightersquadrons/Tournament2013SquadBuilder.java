package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

import org.vizzini.starfightersquadrons.UpgradeCard.SecondaryWeaponUpgradeCard;

/**
 * Provides a group of squad builders using tournament lists.
 * 
 * @see <a
 *      href="http://www.xwingminiaturesgame.com/squad-list-rebels/tournament-lists-theyre-the-best-of-the-best/">Tournament
 *      Lists: The Best Of The Best!</a>
 */
public class Tournament2013SquadBuilder extends DefaultSquadBuilder
{
    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialDallasParker()
    {
        return new Tournament2013SquadBuilder("Dallas Parker (TIE Fighters x7)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.HOWLRUNNER, agent, UpgradeCard.STEALTH_DEVICE,
                        UpgradeCard.DETERMINATION));
                answer.add(new SSToken(Pilot.DARK_CURSE, agent));

                for (int i = 0; i < 5; i++)
                {
                    answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialDanielDeBruijn()
    {
        return new Tournament2013SquadBuilder("Daniel de Bruijn (TIE Advanced/Fighters x3/Interceptor)",
                SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.TURR_PHENNIR, agent, UpgradeCard.DAREDEVIL));
                answer.add(new SSToken(Pilot.DARK_CURSE, agent));
                answer.add(new SSToken(Pilot.DARTH_VADER, agent, UpgradeCard.SQUAD_LEADER));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialDavidBergstrom()
    {
        return new Tournament2013SquadBuilder("David Bergstrom (TIE Fighters x7)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.HOWLRUNNER, agent, UpgradeCard.STEALTH_DEVICE));
                answer.add(new SSToken(Pilot.BACKSTABBER, agent));
                answer.add(new SSToken(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.OBSIDIAN_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialIainHamp()
    {
        return new Tournament2013SquadBuilder("Iain Hamp (TIE Fighters x8)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                for (int i = 0; i < 8; i++)
                {
                    answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                }

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialJip()
    {
        return new Tournament2013SquadBuilder("Jip (Firespray-31/TIE Fighters x4)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.KRASSIS_TRELIX, agent, SecondaryWeaponUpgradeCard.HEAVY_LASER_CANNON));
                answer.add(new SSToken(Pilot.HOWLRUNNER, agent, UpgradeCard.STEALTH_DEVICE));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialJosse()
    {
        return new Tournament2013SquadBuilder("Josse (Firespray-31/TIE Interceptors x2)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.KRASSIS_TRELIX, agent, SecondaryWeaponUpgradeCard.HEAVY_LASER_CANNON,
                        UpgradeCard.INTELLIGENCE_AGENT, UpgradeCard.ANTI_PURSUIT_LASERS));
                answer.add(new SSToken(Pilot.SOONTIR_FEL, agent, UpgradeCard.PUSH_THE_LIMIT,
                        UpgradeCard.STEALTH_DEVICE));
                answer.add(new SSToken(Pilot.ALPHA_SQUADRON_PILOT, agent, UpgradeCard.STEALTH_DEVICE));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperialNeilHoward()
    {
        return new Tournament2013SquadBuilder("Neil Howard (TIE Bombers x3/TIE Fighters x2)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.CAPTAIN_JONUS, agent, UpgradeCard.SQUAD_LEADER,
                        UpgradeCard.SEISMIC_CHARGES));
                answer.add(new SSToken(Pilot.SCIMITAR_SQUADRON_PILOT, agent,
                        SecondaryWeaponUpgradeCard.CLUSTER_MISSILES, SecondaryWeaponUpgradeCard.CONCUSSION_MISSILES));
                answer.add(new SSToken(Pilot.SCIMITAR_SQUADRON_PILOT, agent,
                        SecondaryWeaponUpgradeCard.ADVANCED_PROTON_TORPEDOES,
                        SecondaryWeaponUpgradeCard.PROTON_TORPEDOES));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));
                answer.add(new SSToken(Pilot.ACADEMY_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelBrandonBarthel()
    {
        return new Tournament2013SquadBuilder("Brandon Barthel (X-Wings x4)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.WEDGE_ANTILLES, agent, UpgradeCard.PUSH_THE_LIMIT,
                        UpgradeCard.R2_ASTROMECH));
                answer.add(new SSToken(Pilot.BIGGS_DARKLIGHTER, agent));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelIvanPastor()
    {
        return new Tournament2013SquadBuilder("Ivan Pastor (YT-1300/X-Wings x2)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.HAN_SOLO, agent, UpgradeCard.GUNNER, UpgradeCard.MARKSMANSHIP,
                        UpgradeCard.CHEWBACCA));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelJimBlakley()
    {
        return new Tournament2013SquadBuilder("Jim Blakley (X-Wings x2/B-Wing/Y-Wings x2)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));
                answer.add(new SSToken(Pilot.BLUE_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.GOLD_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.GOLD_SQUADRON_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelJonathanGomes()
    {
        return new Tournament2013SquadBuilder("Jonathan Gomes (X-Wings x4)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.LUKE_SKYWALKER, agent, UpgradeCard.SHIELD_UPGRADE, UpgradeCard.R2_D2,
                        UpgradeCard.DRAW_THEIR_FIRE));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));

                return answer;
            }
        };
    }

    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createRebelPaulHeaver()
    {
        return new Tournament2013SquadBuilder("Paul Heaver (X-Wings x2/B-Wings x2)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.BIGGS_DARKLIGHTER, agent));
                answer.add(new SSToken(Pilot.ROOKIE_PILOT, agent));
                answer.add(new SSToken(Pilot.DAGGER_SQUADRON_PILOT, agent, UpgradeCard.ADVANCED_SENSORS));
                answer.add(new SSToken(Pilot.DAGGER_SQUADRON_PILOT, agent, UpgradeCard.ADVANCED_SENSORS));

                return answer;
            }
        };
    }

    /**
     * Construct this object.
     * 
     * @param description Description.
     * @param team Team.
     */
    private Tournament2013SquadBuilder(final String description, final SSTeam team)
    {
        super(description, team);
    }
}
