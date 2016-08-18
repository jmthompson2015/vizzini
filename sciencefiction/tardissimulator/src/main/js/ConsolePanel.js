define(function()
{
    "use strict";
    var ConsolePanel =
    {
        PANEL_1: "panel1",
        PANEL_2: "panel2",
        PANEL_3: "panel3",
        PANEL_4: "panel4",
        PANEL_5: "panel5",
        PANEL_6: "panel6",

        properties:
        {
            "panel1":
            {
                name: "Fabrication & Information Systems",
                image: "panel1.jpg",
                value: "panel1",
            },
            "panel2":
            {
                name: "Navigation",
                image: "panel2.jpg",
                value: "panel2",
            },
            "panel3":
            {
                name: "Mechanical & Master Control",
                image: "panel3.jpg",
                value: "panel3",
            // scanner switch
            },
            "panel4":
            {
                name: "Communications & Exterior Monitor",
                image: "panel4.jpg",
                value: "panel4",
            // radiation read-outs
            },
            "panel5":
            {
                name: "Helm & Dematerialisation Systems",
                image: "panel5.jpg",
                value: "panel5",
            // auxiliary power control
            // main power bus levers
            },
            "panel6":
            {
                name: "Diagnostic & Internal Ship Systems",
                image: "panel6.jpg",
                value: "panel6",
            // door switch
            // scanner control
            // chameleon circuit
            },
        },

        values: function()
        {
            return Object.getOwnPropertyNames(ConsolePanel.properties);
        },
    };

    if (Object.freeze)
    {
        Object.freeze(ConsolePanel);
    }

    return ConsolePanel;
});
