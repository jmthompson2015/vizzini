var CoreSetImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.MAULER_MITHEL, agent,
                UpgradeCard.MARKSMANSHIP);
        answer[answer.length] = new Token(Pilot.DARK_CURSE, agent);

        return answer;
    },
    getDescription: function(agent)
    {
        return "TIE Fighters x2";
    },
    getName: function(agent)
    {
        return "Core Set Imperial: 36 Points";
    }
}

var CoreSetRebelSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.LUKE_SKYWALKER, agent,
                UpgradeCard.PROTON_TORPEDOES, UpgradeCard.R2_D2);

        return answer;
    },
    getDescription: function(agent)
    {
        return "X-Wing";
    },
    getName: function(agent)
    {
        return "Core Set Rebel: 36 Points";
    }
}

var JMTImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.WHISPER, agent,
                UpgradeCard.VETERAN_INSTINCTS,
                UpgradeCard.ADVANCED_CLOAKING_DEVICE, UpgradeCard.REBEL_CAPTIVE);

        for (var i = 0; i < 5; i++)
        {
            answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);
        }

        return answer;
    },
    getDescription: function(agent)
    {
        return "TIE Fighters x5/TIE Phantom";
    },
    getName: function(agent)
    {
        return "JMT Imperial";
    }
}

var JMTRebelSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.CHEWBACCA, agent,
                UpgradeCard.MILLENNIUM_FALCON, UpgradeCard.GUNNER);

        for (var i = 0; i < 4; i++)
        {
            answer[answer.length] = new Token(Pilot.TALA_SQUADRON_PILOT, agent);
        }

        return answer;
    },
    getDescription: function(agent)
    {
        return "YT-1300/Z-95 Headhunters x4";
    },
    getName: function(agent)
    {
        return "JMT Rebel";
    }
}

var Tournament2013DallasParkerImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.HOWLRUNNER, agent,
                UpgradeCard.STEALTH_DEVICE, UpgradeCard.DETERMINATION);
        answer[answer.length] = new Token(Pilot.DARK_CURSE, agent);

        for (var i = 0; i < 5; i++)
        {
            answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);
        }

        return answer;
    },
    getDescription: function(agent)
    {
        return "TIE Fighters x7";
    },
    getName: function(agent)
    {
        return "Dallas Parker Imperial";
    }
}

var Tournament2013DanielDeBruijnImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.TURR_PHENNIR, agent,
                UpgradeCard.DAREDEVIL);
        answer[answer.length] = new Token(Pilot.DARK_CURSE, agent);
        answer[answer.length] = new Token(Pilot.DARTH_VADER, agent,
                UpgradeCard.SQUAD_LEADER);
        answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);
        answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);

        return answer;
    },
    getDescription: function(agent)
    {
        return "TIE Advanced/Fighters x3/Interceptor";
    },
    getName: function(agent)
    {
        return "Daniel de Bruijn";
    }
}

var Tournament2013DavidBergstromImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.HOWLRUNNER, agent,
                UpgradeCard.STEALTH_DEVICE);
        answer[answer.length] = new Token(Pilot.BACKSTABBER, agent);
        answer[answer.length] = new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent);
        answer[answer.length] = new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent);
        answer[answer.length] = new Token(Pilot.OBSIDIAN_SQUADRON_PILOT, agent);
        answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);
        answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);

        return answer;
    },
    getDescription: function(agent)
    {
        return "TIE Fighters x7";
    },
    getName: function(agent)
    {
        return "David Bergstrom";
    }
}

var Tournament2013IainHampImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        for (var i = 0; i < 8; i++)
        {
            answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);
        }

        return answer;
    },
    getDescription: function(agent)
    {
        return "TIE Fighters x8";
    },
    getName: function(agent)
    {
        return "Iain Hamp";
    }
}

var Tournament2013JipImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.KRASSIS_TRELIX, agent,
                UpgradeCard.HEAVY_LASER_CANNON);
        answer[answer.length] = new Token(Pilot.HOWLRUNNER, agent,
                UpgradeCard.STEALTH_DEVICE);
        answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);
        answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);
        answer[answer.length] = new Token(Pilot.ACADEMY_PILOT, agent);

        return answer;
    },
    getDescription: function(agent)
    {
        return "Firespray-31/TIE Fighters x4";
    },
    getName: function(agent)
    {
        return "Jip";
    }
}

var Tournament2013JosseImperialSquadBuilder =
{
    buildSquad: function(agent)
    {
        InputValidator.validateNotNull("agent", agent);

        var answer = [];

        answer[answer.length] = new Token(Pilot.KRASSIS_TRELIX, agent,
                UpgradeCard.HEAVY_LASER_CANNON, UpgradeCard.INTELLIGENCE_AGENT,
                UpgradeCard.ANTI_PURSUIT_LASERS);
        answer[answer.length] = new Token(Pilot.SOONTIR_FEL, agent,
                UpgradeCard.PUSH_THE_LIMIT, UpgradeCard.STEALTH_DEVICE);
        answer[answer.length] = new Token(Pilot.ALPHA_SQUADRON_PILOT, agent,
                UpgradeCard.STEALTH_DEVICE);

        return answer;
    },
    getDescription: function(agent)
    {
        return "Firespray-31/TIE Interceptors x2";
    },
    getName: function(agent)
    {
        return "Josse";
    }
}

SquadBuilder = {};

SquadBuilder.getImperial = function()
{
    return [ CoreSetImperialSquadBuilder, JMTImperialSquadBuilder,
            Tournament2013DallasParkerImperialSquadBuilder,
            Tournament2013DanielDeBruijnImperialSquadBuilder,
            Tournament2013DavidBergstromImperialSquadBuilder,
            Tournament2013IainHampImperialSquadBuilder,
            Tournament2013JipImperialSquadBuilder,
            Tournament2013JosseImperialSquadBuilder ];
}

SquadBuilder.getRebel = function()
{
    return [ CoreSetRebelSquadBuilder, JMTRebelSquadBuilder ];
}
