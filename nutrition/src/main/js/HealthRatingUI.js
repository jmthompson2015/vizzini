var ExpandingContainer = React.createClass(
{
    getInitialState: function()
    {
        return (
        {
            isExpanded: false
        });
    },

    render: function()
    {
        var myOnClick = function(event)
        {
            this.setState(
            {
                isExpanded: !this.state.isExpanded
            });
        }.bind(this);

        var link = React.DOM.a(
        {
            key: "0",
            className: "expandingContainerTitle",
            href: "#",
            onClick: myOnClick
        }, "Configure Health Rating");

        var answer;
        LOGGER.debug("this.state.isExpanded ? " + this.state.isExpanded);

        if (this.state.isExpanded)
        {
            var healthRatingUI = React.createElement(HealthRatingUI,
            {
                key: "1",
                initialGood: this.props.initialGood,
                initialBad: this.props.initialBad,
                onChange: this.props.onChange,
            });

            answer = React.DOM.div(null, [ link, healthRatingUI ]);
        }
        else
        {
            answer = link;
        }

        return answer;
    },
});

var HealthRatingUI = React.createClass(
{

    getInitialState: function()
    {
        return (
        {
            good: this.props.initialGood,
            bad: this.props.initialBad
        });
    },

    render: function()
    {
        var rows = [];
        var properties = FoodProperty.numberValues();
        var good = this.state.good;
        var bad = this.state.bad;
        var self = this;

        properties.forEach(function(property, i)
        {
            var isGood = good.vizziniContains(property);
            var isBad = bad.vizziniContains(property);
            var isNeutral = !isGood && !isBad;
            rows.push(React.createElement(HealthRatingUI.Row,
            {
                key: i,
                property: property,
                isGood: isGood,
                isNeutral: isNeutral,
                isBad: isBad,
                goodClicked: self.goodClicked,
                neutralClicked: self.neutralClicked,
                badClicked: self.badClicked,
            }));
        });

        var headCols = [];
        headCols.push(React.DOM.th(
        {
            key: "0"
        }, "Good"));
        headCols.push(React.DOM.th(
        {
            key: "1"
        }, "Neutral"));
        headCols.push(React.DOM.th(
        {
            key: "2"
        }, "Bad"));
        headCols.push(React.DOM.th(
        {
            key: "3"
        }, "Property"));

        var thead = React.DOM.tr(
        {
            key: "thead"
        }, headCols);
        var tbody = React.DOM.tr(
        {
            key: "tbody"
        }, rows);

        return React.DOM.table(
        {
            className: "healthRatingUI"
        }, [ thead, tbody ]);
    },

    badClicked: function(event)
    {
        LOGGER.debug("badClicked()");
        LOGGER.debug("event.currentTarget.name = " + event.currentTarget.name);
        this.radioButtonClicked("bad", event.currentTarget.name);
    },

    goodClicked: function(event)
    {
        LOGGER.debug("goodClicked()");
        LOGGER.debug("event.currentTarget.name = " + event.currentTarget.name);
        this.radioButtonClicked("good", event.currentTarget.name);
    },

    neutralClicked: function(event)
    {
        LOGGER.debug("neutralClicked()");
        LOGGER.debug("event.currentTarget.name = " + event.currentTarget.name);
        this.radioButtonClicked("neutral", event.currentTarget.name);
    },

    radioButtonClicked: function(type, property)
    {
        LOGGER.debug("type = " + type + " property = " + property);

        var good = this.state.good;
        var bad = this.state.bad;

        if (type === "good")
        {
            bad.vizziniRemove(property);
            good.push(property);
        }
        else if (type === "neutral")
        {
            good.vizziniRemove(property);
            bad.vizziniRemove(property);
        }
        else if (type === "bad")
        {
            good.vizziniRemove(property);
            bad.push(property);
        }
        else
        {
            throw "Unknown type: " + type;
        }

        LOGGER.debug("good = " + good);
        LOGGER.debug("bad  = " + bad);
        this.setState(
        {
            good: good,
            bad: bad
        });

        this.props.onChange(this.state.good, this.state.bad);
    }
});

HealthRatingUI.Row = React.createClass(
{
    render: function()
    {
        var property = this.props.property;
        var propertyName = FoodProperty.properties[property].displayName;

        var columns = [];

        var radio0 = React.DOM.input(
        {
            checked: this.props.isGood,
            name: property,
            onChange: this.props.goodClicked,
            type: "radio",
        });
        columns.push(React.DOM.td(
        {
            key: "0",
            className: "healthRadio"
        }, radio0));

        var radio1 = React.DOM.input(
        {
            checked: this.props.isNeutral,
            name: property,
            onChange: this.props.neutralClicked,
            type: "radio",
        });
        columns.push(React.DOM.td(
        {
            key: "1",
            className: "healthRadio"
        }, radio1));

        var radio2 = React.DOM.input(
        {
            checked: this.props.isBad,
            name: property,
            onChange: this.props.badClicked,
            type: "radio",
        });
        columns.push(React.DOM.td(
        {
            key: "2",
            className: "healthRadio"
        }, radio2));

        columns.push(React.DOM.td(
        {
            key: "3"
        }, propertyName));

        return React.DOM.tr(null, columns);
    },
});
