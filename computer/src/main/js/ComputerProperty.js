var ComputerProperty =
{
    ACCESSORY: "accessory",
    CPU: "cpu",
    CPU_COOLER: "cpuCooler",
    ENCLOSURE: "enclosure",
    GRAPHICS_CARD: "graphicsCard",
    MOTHERBOARD: "motherboard",
    POWER_SUPPLY: "powerSupply",
    RAM: "ram",
    STORAGE_DRIVE: "storageDrive",
    SYSTEM_DRIVE: "systemDrive",

    properties:
    {
        "motherboard":
        {
            displayName: "Motherboard",
        },
        "cpu":
        {
            displayName: "CPU",
        },
        "ram":
        {
            displayName: "RAM",
        },
        "systemDrive":
        {
            displayName: "System Drive",
        },
        "storageDrive":
        {
            displayName: "Storage Drive",
        },
        "powerSupply":
        {
            displayName: "Power Supply",
        },
        "enclosure":
        {
            displayName: "Case",
        },
        "graphicsCard":
        {
            displayName: "Graphics Card",
        },
        "cpuCooler":
        {
            displayName: "CPU Cooler",
        },
        "accessory":
        {
            displayName: "Accessory",
        },
    },

    values: function()
    {
        return Object.getOwnPropertyNames(ComputerProperty.properties);
    },
}

if (Object.freeze)
{
    Object.freeze(ComputerProperty);
};
