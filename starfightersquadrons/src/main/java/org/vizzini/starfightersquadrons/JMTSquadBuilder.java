package org.vizzini.starfightersquadrons;

import java.util.ArrayList;
import java.util.List;

/**
 * Provides a squad builder to create my squads.
 */
public class JMTSquadBuilder extends DefaultSquadBuilder
{
    /**
     * @return a new squad builder.
     */
    @SuppressWarnings("synthetic-access")
    public static final SquadBuilder createImperial()
    {
        return new JMTSquadBuilder("JMT Imperial (TIE Fighters x5/TIE Phantom)", SSTeam.IMPERIAL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.WHISPER, agent, UpgradeCard.VETERAN_INSTINCTS,
                        UpgradeCard.ADVANCED_CLOAKING_DEVICE, UpgradeCard.REBEL_CAPTIVE));

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
    public static final SquadBuilder createRebel()
    {
        return new JMTSquadBuilder("JMT Rebel (YT-1300/Z-95 Headhunters x4)", SSTeam.REBEL)
        {
            @Override
            public List<SSToken> buildSquad(final SSAgent agent)
            {
                final List<SSToken> answer = new ArrayList<SSToken>();

                answer.add(new SSToken(Pilot.CHEWBACCA, agent, UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.GUNNER));
                answer.add(new SSToken(Pilot.TALA_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.TALA_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.TALA_SQUADRON_PILOT, agent));
                answer.add(new SSToken(Pilot.TALA_SQUADRON_PILOT, agent));

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
    private JMTSquadBuilder(final String description, final SSTeam team)
    {
        super(description, team);
    }
}
