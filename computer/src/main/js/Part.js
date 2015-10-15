var Part = {};

Part.motherboard =
{
    GA_H97N_WIFI: "ga_h97n_wifi",
    GA_Z97_D3H_ATX: "ga_z97_d3h_atx",
    GA_Z97M_D3H_MATX: "ga_z97m_d3h_matx",
    GA_Z97MX_GAMING_5_MATX: "ga_z97mx_gaming_5_matx",
    GA_Z97N_WIFI: "ga_z97n_wifi",
    GA_Z97X_UD3H_BK_ATX: "ga_z97x_ud3h_bk_atx",
    GA_Z97X_UD5H_ATX: "ga_z97x_ud5h_atx",
    GA_Z97X_UD7_TH_ATX: "ga_z97x_ud7_th_atx",
    properties:
    {
        "ga_h97n_wifi":
        {
            name: "Gigabyte GA-H97N-WiFi mini-ITX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00KATHCD4/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_h97n_wifi",
        },
        "ga_z97_d3h_atx":
        {
            name: "Gigabyte GA-Z97-D3H ATX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00K2RQDLQ/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_z97_d3h_atx",
        },
        "ga_z97m_d3h_matx":
        {
            name: "Gigabyte GA-Z97M-D3H mATX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00K8HNFIO/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_z97m_d3h_matx",
        },
        "ga_z97mx_gaming_5_matx":
        {
            name: "Gigabyte GA-Z97MX-GAMING 5 mATX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00K8HNGXS/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_z97mx_gaming_5_matx",
        },
        "ga_z97n_wifi":
        {
            name: "Gigabyte GA-Z97N-WiFi mini-ITX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00K8HNGYW/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_z97n_wifi",
        },
        "ga_z97x_ud3h_bk_atx":
        {
            name: "Gigabyte GA-Z97X-UD3H-BK ATX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00KLJ3F6Q/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_z97x_ud3h_bk_atx",
        },
        "ga_z97x_ud5h_atx":
        {
            name: "Gigabyte GA-Z97X-UD5H ATX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00JKCHDKY/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_z97x_ud5h_atx",
        },
        "ga_z97x_ud7_th_atx":
        {
            name: "Gigabyte GA-Z97X-UD7-TH ATX",
            type: "motherboard",
            url: "http://www.amazon.com/dp/B00JKCHENK/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ga_z97x_ud7_th_atx",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.motherboard.properties);
    },
}

Part.cpu =
{
    CORE_I3_4360: "core_i3_4360",
    CORE_I3_4370: "core_i3_4370",
    CORE_I5_4460: "core_i5_4460",
    CORE_I5_4690K: "core_i5_4690k",
    CORE_I7_4790K: "core_i7_4790k",
    properties:
    {
        "core_i3_4360":
        {
            name: "Core i3-4360",
            type: "cpu",
            url: "http://www.amazon.com/dp/B00J2LIFDC/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "core_i3_4360",
        },
        "core_i3_4370":
        {
            name: "Core i3-4370",
            type: "cpu",
            url: "http://www.amazon.com/dp/B00LV8TZLU/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "core_i3_4370",
        },
        "core_i5_4460":
        {
            name: "Core i5-4460",
            type: "cpu",
            url: "http://www.amazon.com/dp/B00JIJUBAS/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "core_i5_4460",
        },
        "core_i5_4690k":
        {
            name: "Core i5-4690K",
            type: "cpu",
            url: "http://www.amazon.com/dp/B00KPRWB9G/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "core_i5_4690k",
        },
        "core_i7_4790k":
        {
            name: "Core i7-4790K",
            type: "cpu",
            url: "http://www.amazon.com/dp/B00KPRWAX8/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "core_i7_4790k",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.cpu.properties);
    },
}

Part.ram =
{
    BALLISTIX_TACTICAL_08GB: "ballistix_tactical_08gb",
    BALLISTIX_TACTICAL_16GB: "ballistix_tactical_16gb",
    BALLISTIX_TACTICAL_32GB: "ballistix_tactical_32gb",
    BUDGET_08GB: "budget_08gb",
    BUDGET_16GB: "budget_16gb",
    properties:
    {
        "ballistix_tactical_08gb":
        {
            name: "Crucial Ballistix Tactical (8GB)",
            type: "ram",
            url: "http://www.amazon.com/dp/B006YG96KO/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ballistix_tactical_08gb",
        },
        "ballistix_tactical_16gb":
        {
            name: "Crucial Ballistix Tactical (16GB)",
            type: "ram",
            url: "http://www.amazon.com/dp/B006YG9C6C/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ballistix_tactical_16gb",
        },
        "ballistix_tactical_32gb":
        {
            name: "Crucial Ballistix Tactical (32GB)",
            type: "ram",
            url: "http://www.amazon.com/dp/B00ID2GPR4/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "ballistix_tactical_32gb",
        },
        "budget_08gb":
        {
            name: "Crucial Budget (8GB)",
            type: "ram",
            url: "http://www.amazon.com/dp/B00683X4PQ/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "budget_08gb",
        },
        "budget_16gb":
        {
            name: "Crucial Budget (16GB)",
            type: "ram",
            url: "http://www.amazon.com/dp/B00AZGZFF4/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "budget_16gb",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.ram.properties);
    },
}

Part.systemDrive =
{
    SAMSUNG_850_EVO_120GB: "samsung_850_evo_120gb",
    SAMSUNG_850_EVO_250GB: "samsung_850_evo_250gb",
    properties:
    {
        "samsung_850_evo_120gb":
        {
            name: "Samsung 850 EVO 120GB",
            type: "systemDrive",
            url: "http://www.amazon.com/dp/B00OAJ5N6I/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "samsung_850_evo_120gb",
        },
        "samsung_850_evo_250gb":
        {
            name: "Samsung 850 EVO 250GB",
            type: "systemDrive",
            url: "http://www.amazon.com/dp/B00OAJ412U/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "samsung_850_evo_250gb",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.systemDrive.properties);
    },
}

Part.storageDrive =
{
    BARRACUDA_1_TB: "barracuda_1_tb",
    BARRACUDA_2_TB: "barracuda_2_tb",
    BARRACUDA_3_TB: "barracuda_3_tb",
    properties:
    {
        "barracuda_1_tb":
        {
            name: "Seagate Barracuda 1 TB",
            type: "storageDrive",
            url: "http://www.amazon.com/dp/B005T3GRNW/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "barracuda_1_tb",
        },
        "barracuda_2_tb":
        {
            name: "Seagate Barracuda 2 TB",
            type: "storageDrive",
            url: "http://www.amazon.com/dp/B005T3GRN2/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "barracuda_2_tb",
        },
        "barracuda_3_tb":
        {
            name: "Seagate Barracuda 3 TB",
            type: "storageDrive",
            url: "http://www.amazon.com/dp/B005T3GRLY/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "barracuda_3_tb",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.storageDrive.properties);
    },
}

Part.powerSupply =
{
    CS_550_WATT: "cs_550_watt",
    RM_650_WATT: "rm_650_watt",
    properties:
    {
        "cs_550_watt":
        {
            name: "Corsair CS 550 Watt",
            type: "powerSupply",
            url: "http://www.amazon.com/dp/B00GH9NA6O/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "cs_550_watt",
        },
        "rm_650_watt":
        {
            name: "Corsair RM 650 Watt",
            type: "powerSupply",
            url: "http://www.amazon.com/dp/B00EB7UIRS/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "rm_650_watt",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.powerSupply.properties);
    },
}

Part.enclosure =
{
    CARBIDE_300R: "carbide_300r",
    CARBIDE_500R: "carbide_500r",
    CORE_1000: "core_1000",
    MI_008: "mi_008",
    PHENOM_BLACK: "phenom_black",
    PHENOM_WHITE: "phenom_white",
    properties:
    {
        "carbide_300r":
        {
            name: "Corsair Carbide 300R",
            type: "enclosure",
            url: "http://www.amazon.com/dp/B006I2H0YS/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "carbide_300r",
        },
        "carbide_500r":
        {
            name: "Corsair Carbide 500R",
            type: "enclosure",
            url: "http://www.amazon.com/dp/B005E983JW/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "carbide_500r",
        },
        "core_1000":
        {
            name: "Fractal Design Core 1000",
            type: "enclosure",
            url: "http://www.amazon.com/dp/B00CUSUV0O/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "core_1000",
        },
        "mi_008":
        {
            name: "Apex MI-008 (w/ 250W Power Supply)",
            type: "enclosure",
            url: "http://www.amazon.com/dp/B001H0BA24/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "mi_008",
        },
        "phenom_black":
        {
            name: "BitFenix Phenom (Black)",
            type: "enclosure",
            url: "http://www.amazon.com/dp/B00G47WG9G/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "phenom_black",
        },
        "phenom_white":
        {
            name: "BitFenix Phenom (White)",
            type: "enclosure",
            url: "http://www.amazon.com/dp/B00G47W7CM/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "phenom_white",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.enclosure.properties);
    },
}

Part.graphicsCard =
{
    EVGA_GT_740_SC_2GB: "evga_gt_740_sc_2gb",
    EVGA_GT_740_SC_4GB: "evga_gt_740_sc_4gb",
    properties:
    {
        "evga_gt_740_sc_2gb":
        {
            name: "EVGA GT 740 SC 2GB",
            type: "graphicsCard",
            url: "http://www.amazon.com/dp/B00KK8MEU6/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "evga_gt_740_sc_2gb",
        },
        "evga_gt_740_sc_4gb":
        {
            name: "EVGA GT 740 SC 4GB",
            type: "graphicsCard",
            url: "http://www.amazon.com/dp/B00KJGYOGG/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "evga_gt_740_sc_4gb",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.graphicsCard.properties);
    },
}

Part.cpuCooler =
{
    SLIM_X3_LOW_PROFILE_AIR: "slim_x3_low_profile_air",
    properties:
    {
        "slim_x3_low_profile_air":
        {
            name: "Thermaltake Slim X3 Low Profile (Air)",
            type: "cpuCooler",
            url: "http://www.amazon.com/dp/B003WOL4UG/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "slim_x3_low_profile_air",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.cpuCooler.properties);
    },
}

Part.accessory =
{
    PCI_EXPRESS_WIFI_ADAPTER_N: "pci_express_wifi_adapter_n",
    properties:
    {
        "pci_express_wifi_adapter_n":
        {
            name: "TP-Link PCI Express Wifi Adapter (N)",
            type: "accessory",
            url: "http://www.amazon.com/dp/B007GMPZ0A/ref=as_li_ss_tl?ie=UTF8&tag=tonymacx86com-20",
            value: "pci_express_wifi_adapter_n",
        },
    },
    values: function()
    {
        return Object.getOwnPropertyNames(Part.accessory.properties);
    },
}
