var Computer =
{
    CustoMac_Mini:
    {
        name: "CustoMac Mini",
        value: "CustoMac_Mini",
        motherboard: "ga_h97n_wifi",
        cpu: [ "core_i3_4360", "core_i3_4370" ],
        ram: [ "budget_08gb", "budget_16gb" ],
        systemDrive: [ "samsung_850_evo_120gb", "samsung_850_evo_250gb" ],
        storageDrive: [ "barracuda_1_tb", "barracuda_2_tb", "barracuda_3_tb" ],
        enclosure: "mi_008",
        cpuCooler: "slim_x3_low_profile_air",
        accessory: [ "*none*", "pci_express_wifi_adapter_n" ],
    },

    CustoMac_Mini_Deluxe:
    {
        name: "CustoMac Mini Deluxe",
        value: "CustoMac_Mini_Deluxe",
        motherboard: "ga_z97n_wifi",
        cpu: [ "core_i3_4370", "core_i5_4690k", "core_i7_4790k" ],
        ram: [ "ballistix_tactical_08gb", "ballistix_tactical_16gb" ],
        systemDrive: [ "samsung_850_evo_120gb", "samsung_850_evo_250gb" ],
        storageDrive: [ "barracuda_1_tb", "barracuda_2_tb", "barracuda_3_tb" ],
        powerSupply: "cs_550_watt",
        enclosure: [ "phenom_black", "phenom_white" ],
        graphicsCard: [ "*none*", "evga_gt_740_sc_2gb", "evga_gt_740_sc_4gb" ],
    },

    CustoMac_mATX:
    {
        name: "CustoMac mATX",
        value: "CustoMac_mATX",
        motherboard: [ "ga_z97m_d3h_matx", "ga_z97mx_gaming_5_matx" ],
        cpu: [ "core_i5_4690k", "core_i7_4790k" ],
        ram: [ "ballistix_tactical_08gb", "ballistix_tactical_16gb",
                "ballistix_tactical_32gb" ],
        systemDrive: [ "samsung_850_evo_120gb", "samsung_850_evo_250gb" ],
        storageDrive: [ "barracuda_1_tb", "barracuda_2_tb", "barracuda_3_tb" ],
        powerSupply: "cs_550_watt",
        enclosure: "core_1000",
        graphicsCard: [ "*none*", "evga_gt_740_sc_2gb", "evga_gt_740_sc_4gb" ],
        accessory: [ "*none*", "pci_express_wifi_adapter_n" ],
    },

    CustoMac_Budget_ATX:
    {
        name: "CustoMac Budget ATX",
        value: "CustoMac_Budget_ATX",
        motherboard: "ga_z97_d3h_atx",
        cpu: [ "core_i3_4360", "core_i5_4460" ],
        ram: [ "ballistix_tactical_08gb", "ballistix_tactical_16gb",
                "ballistix_tactical_32gb" ],
        systemDrive: [ "samsung_850_evo_120gb", "samsung_850_evo_250gb" ],
        storageDrive: [ "barracuda_1_tb", "barracuda_2_tb", "barracuda_3_tb" ],
        powerSupply: "cs_550_watt",
        enclosure: "carbide_300r",
        accessory: [ "*none*", "pci_express_wifi_adapter_n" ],
    },

    CustoMac_Pro:
    {
        name: "CustoMac Pro",
        value: "CustoMac_Pro",
        motherboard: [ "ga_z97x_ud3h_bk_atx", "ga_z97x_ud5h_atx",
                "ga_z97x_ud7_th_atx" ],
        cpu: [ "core_i5_4690k", "core_i7_4790k" ],
        ram: [ "ballistix_tactical_08gb", "ballistix_tactical_16gb",
                "ballistix_tactical_32gb" ],
        systemDrive: [ "samsung_850_evo_120gb", "samsung_850_evo_250gb" ],
        storageDrive: [ "barracuda_1_tb", "barracuda_2_tb", "barracuda_3_tb" ],
        powerSupply: "rm_650_watt",
        enclosure: "carbide_500r",
        graphicsCard: [ "*none*", "evga_gt_740_sc_2gb", "evga_gt_740_sc_4gb" ],
        accessory: [ "*none*", "pci_express_wifi_adapter_n" ],
    },

    values: function()
    {
        return [ "CustoMac_Mini", "CustoMac_Mini_Deluxe", "CustoMac_mATX",
                "CustoMac_Budget_ATX", "CustoMac_Pro" ];
    },
}

Computer.computeTotalCost = function(computer)
{
    var answer = 0;
    var values = ComputerProperty.values();

    values.forEach(function(property)
    {
        if (computer[property] && computer[property] !== "*none*")
        {
            var partRef = Part[property];
            var part;

            if (Array.isArray(computer[property]))
            {
                part = partRef.properties[computer[property][0]];
            }
            else
            {
                part = partRef.properties[computer[property]];
            }

            if (part)
            {
                if (part.cost && !isNaN(part.cost))
                {
                    answer += part.cost;
                }
            }
            else
            {
                LOGGER.error("Undefined property = " + property + " part = "
                        + part);
            }
        }
    });

    return Math.round(answer * 100.0) / 100.0;
}

Computer.createInstance = function(computer)
{
    var answer = {};

    answer.name = computer.name;
    answer.value = computer.value;

    ComputerProperty.values().forEach(function(computerProperty)
    {
        var partKeys = computer[computerProperty];

        if (Array.isArray(partKeys))
        {
            answer[computerProperty] = partKeys[0];
        }
        else
        {
            answer[computerProperty] = partKeys;
        }
    });

    return answer;
}
