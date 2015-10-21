var Game =
{
    ARK_SURVIVAL_EVOLVED: "arkSurvivalEvolved",
    ELITE_DANGEROUS: "eliteDangerous",
    FALLEN_EARTH: "fallenEarth",
    GUILD_WARS_2: "guildWars2",
    LOTRO: "lotro",
    RUNESCAPE: "runescape",
    SECRET_WORLD: "secretWorld",
    SHROUD_AVATAR: "shroudAvatar",
    STAR_TREK_ONLINE: "starTrekOnline",
    SWTOR: "swtor",
    TROVE: "trove",
    WILDSTAR: "wildstar",

    properties:
    {
        "arkSurvivalEvolved":
        {
            name: "Ark: Survival Evolved",
            os: "Mac OS X 10.9 Mavericks",
            processor: "dual core 64-bit",
            processorSpeed: 2,
            ram: 4,
            graphics: "OpenGL 3 compatible 1GB",
            url: undefined,
        },
        "eliteDangerous":
        {
            name: "Elite: Dangerous",
            os: "Mac OS X 10.11 El Capitan",
            processor: "Intel Core i7 quad core",
            processorSpeed: 3.4,
            ram: 8,
            graphics: "NVIDIA GeForce GTX 775M 2GB",
            url: "https://support.frontier.co.uk/kb/faq.php?id=85",
        },
        "guildWars2":
        {
            name: "Guild Wars 2",
            os: "Mac OS X 10.7 Lion",
            processor: "Intel Core i5",
            processorSpeed: 2,
            ram: 4,
            graphics: "NVIDIA GeForce 320M",
            url: "https://help.guildwars2.com/entries/25390756-Minimum-System-Requirements",
        },
        "lotro":
        {
            name: "Lord of the Rings Online",
            os: "Mac OS X 10.7 Lion",
            processor: "Intel Core i7",
            processorSpeed: 2.0,
            ram: 4,
            graphics: "NVIDIA GeForce GT 650M",
            url: "https://lotro-wiki.com/index.php/Mac_Client",
        },
        "runescape":
        {
            name: "RuneScape",
            os: "Java 1.6 update 10",
            processor: "Intel i5",
            processorSpeed: 1,
            ram: 4,
            graphics: "NVIDIA GeForce 1xx/2xx/3xx/4xx/5xx/6xx (excluding M / Mobile or Go)",
            url: "http://services.runescape.com/m=rswiki/en/Minimum_requirements",
        },
        "secretWorld":
        {
            name: "The Secret World",
            os: "Window XP SP3",
            processor: "Intel Core 2 Duo",
            processorSpeed: 2.4,
            ram: 2,
            graphics: "NVIDIA 8600 GT 512MB",
            url: "https://help.ea.com/en/article/the-secret-world-minimum-system-requirements/",
        },
        "shroudAvatar":
        {
            name: "Shroud of the Avatar",
            os: "Mac OS X 10.8.5 Mountain Lion",
            processor: "Intel Core 2 Duo dual core",
            processorSpeed: 2.2,
            ram: 6,
            graphics: "NVIDIA GeForce 640M",
            url: "https://www.shroudoftheavatar.com/",
        },
        "starTrekOnline":
        {
            name: "Star Trek Online",
            os: "Mac OS X 10.7.5 Lion",
            processor: "Intel Core 2 Duo",
            processorSpeed: 1.8,
            ram: 4,
            graphics: "Intel HD 3000",
            url: "http://www.arcgames.com/en/games/star-trek-online/news/detail/3037203-sto-mac-is-officially-live_",
        },
        "swtor":
        {
            name: "Star Wars: The Old Republic",
            os: "Windows XP SP3",
            processor: "Intel Core 2 Duo",
            processorSpeed: 2.0,
            ram: 2,
            graphics: "NVIDIA 7800",
            url: "http://www.swtor.com/info/faq",
        },
        "trove":
        {
            name: "Trove",
            os: "Mac OS X 10.7.5 Lion",
            processor: "Intel Core i5-2XXX",
            processorSpeed: 2.0,
            ram: 1,
            graphics: "Intel HD 4000",
            url: "http://support.trionworlds.com/hc/en-us/articles/203372558-Trove-Minimum-System-Requirements",
        },
        "wildstar":
        {
            name: "WildStar: Reloaded",
            os: "Windows Vista",
            processor: "Intel Core i5 Quad Core",
            processorSpeed: 2.66,
            ram: 8,
            graphics: "NVIDIA GeForce GTX 460",
            url: "http://support.wildstar-online.com/hc/en-us/articles/204709385-System-Requirements",
        },
    },

    values: function()
    {
        return Object.getOwnPropertyNames(Game.properties);
    },
}

Game.createColumnsArray = function()
{
    var answer = [];

    answer.push(
    {
        key: "name",
        label: "Game",
    });
    answer.push(
    {
        key: "os",
        label: "OS",
    });
    answer.push(
    {
        key: "processor",
        label: "Processor",
    });
    answer.push(
    {
        key: "processorSpeed",
        label: "Speed (GHz)",
    });
    answer.push(
    {
        key: "ram",
        label: "RAM (GB)",
    });
    answer.push(
    {
        key: "graphics",
        label: "Graphics",
    });

    return answer;
}

Game.createDataArray = function()
{
    var answer = [];

    var games = Game.values();

    games.forEach(function(game)
    {
        answer.push(Game.properties[game]);
    });

    return answer;
}

if (Object.freeze)
{
    Object.freeze(Game);
};
