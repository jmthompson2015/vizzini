define(["UpgradeHeader", "UpgradeType", "process/ui/FactionUI", "process/ui/UpgradeTypeUI"],
    function(UpgradeHeader, UpgradeType, FactionUI, UpgradeTypeUI)
    {
        var AbilityUI = {};

        AbilityUI.Damage = React.createClass(
        {
            propTypes:
            {
                damage: React.PropTypes.object.isRequired,
                imageBase: React.PropTypes.string.isRequired,

                // default: damage value
                myKey: React.PropTypes.string,
            },

            render: function()
            {
                var damage = this.props.damage;
                var imageBase = this.props.imageBase;

                var myKey = (this.props.myKey !== undefined ? this.props.myKey : damage.value);
                var filename = imageBase + "pilotCard/CriticalDamage24.jpg";
                var icon = React.DOM.img(
                {
                    src: filename,
                    className: "damageAbilityUIImage",
                    title: "Critical Damage",
                });

                var title = damage.description;

                if (damage.hasAction)
                {
                    title += " Action: ";
                    title += damage.actionDescription;
                }

                var label = React.DOM.span(
                {
                    title: title,
                }, damage.name);

                return React.DOM.span(
                {
                    key: myKey,
                }, icon, " ", label);
            },
        });

        AbilityUI.Pilot = React.createClass(
        {
            propTypes:
            {
                pilot: React.PropTypes.object.isRequired,
                imageBase: React.PropTypes.string.isRequired,

                // default: pilot value
                myKey: React.PropTypes.string,
            },

            render: function()
            {
                var pilot = this.props.pilot;
                var imageBase = this.props.imageBase;

                var myKey = (this.props.myKey !== undefined ? this.props.myKey : pilot.value);
                var icon = React.createElement(FactionUI,
                {
                    faction: pilot.shipTeam.team,
                    imageBase: imageBase,
                    isSmall: true,
                });

                var title = pilot.description;

                var label = React.DOM.span(
                {
                    title: pilot.description,
                }, pilot.name);

                return React.DOM.span(
                {
                    key: myKey,
                    className: this.props.panelClass,
                    style: this.props.panelStyle,
                }, icon, " ", label);
            },
        });

        AbilityUI.Upgrade = React.createClass(
        {
            propTypes:
            {
                upgrade: React.PropTypes.object.isRequired,
                imageBase: React.PropTypes.string.isRequired,

                // default: upgrade value
                myKey: React.PropTypes.string,
            },

            render: function()
            {
                var upgrade = this.props.upgrade;
                var imageBase = this.props.imageBase;

                var myKey = (this.props.myKey !== undefined ? this.props.myKey : upgrade.value);
                var icon = React.createElement(UpgradeTypeUI,
                {
                    upgradeType: UpgradeType.properties[upgrade.type],
                    imageBase: imageBase,
                });

                var title = "";

                if (upgrade.header)
                {
                    title = UpgradeHeader.properties[upgrade.header].name + ": ";
                }

                title += upgrade.description;

                var label = React.DOM.span(
                {
                    title: title,
                }, upgrade.name);

                return React.DOM.span(
                {
                    key: myKey,
                    className: this.props.panelClass,
                    style: this.props.panelStyle,
                }, icon, " ", label);
            },
        });

        return AbilityUI;
    });
