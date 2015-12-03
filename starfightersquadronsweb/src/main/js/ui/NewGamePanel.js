/*
 * Provides a user interface to gather new game information.
 */
var NewGamePanel = React.createClass(
{
    getInitialState: function()
    {
        var agent1 = new SimpleAgent("Agent 1", Team.IMPERIAL, CoreSetImperialSquadBuilder);
        var imageUtils = new ImageUtilities();
        var agent2 = new HumanAgent("Agent 2", Team.REBEL, CoreSetRebelSquadBuilder, imageUtils);

        return (
        {
            agent1: agent1,
            agent2: agent2,
        });
    },

    render: function()
    {
        var agentPanel1 = React.createElement(NewGamePanel.AgentPanel,
        {
            agentNumber: 1,
            onChange: this.handleAgentChange,
        });
        var agentPanel2 = React.createElement(NewGamePanel.AgentPanel,
        {
            agentNumber: 2,
            initialTeam: Team.REBEL,
            initialType: "HumanAgent",
            onChange: this.handleAgentChange,
        });
        var cell1 = React.DOM.td(
        {
            className: "newGamePanel",
        }, agentPanel1);
        var cell2 = React.DOM.td(
        {
            className: "newGamePanel",
        }, agentPanel2);

        var message = React.DOM.table({}, React.DOM.tbody({}, React.DOM.tr({}, cell1, cell2)));
        var initialInput;
        var okButton = React.DOM.button(
        {
            key: 0,
            onClick: this.ok,
        }, "OK");
        var buttons = React.DOM.span({}, [ okButton ]);

        return React.createElement(OptionPane,
        {
            panelClass: "optionPane",
            title: "New Game",
            titleClass: "optionPaneTitle",
            message: message,
            messageClass: "optionPaneMessage",
            initialInput: initialInput,
            buttons: buttons,
            buttonsClass: "optionPaneButtons",
        });
    },

    handleAgentChange: function(agent, agentNumber)
    {
        LOGGER.trace("handleAgentChange() agent = " + agent + " agentNumber = " + agentNumber);

        switch (agentNumber)
        {
        case 1:
            this.setState(
            {
                agent1: agent,
            });
            break;
        case 2:
            this.setState(
            {
                agent2: agent,
            });
            break;
        default:
            throw "Unknown agentNumber: " + agentNumber;
        }
    },

    ok: function()
    {
        LOGGER.debug("ok() this.state.agent1 = " + this.state.agent1);
        LOGGER.debug("ok() this.state.agent2 = " + this.state.agent2);
        this.props.callback([ this.state.agent1, this.state.agent2 ]);
    },
});

/*
 * Provides an agent panel.
 * 
 * @param agentNumber Agent number. (required)
 * 
 * @param initialTeam Initial team. (optional; default: Team.IMPERIAL)
 * 
 * @param initialType Initial type. (optional; default: SimpleAgent)
 * 
 * @param onChange Change method. (optional)
 */
NewGamePanel.AgentPanel = React.createClass(
{
    getInitialState: function()
    {
        InputValidator.validateNotNull("agentNumber", this.props.agentNumber);
        var initialTeam = (this.props.initialTeam ? this.props.initialTeam : Team.IMPERIAL);
        var initialName = "Agent " + this.props.agentNumber;
        var initialType = (this.props.initialType ? this.props.initialType : "SimpleAgent");
        var squadBuilders = SquadBuilder.findByTeam(initialTeam);
        var initialSquadBuilder = squadBuilders[0];

        return (
        {
            team: initialTeam,
            name: initialName,
            type: initialType,
            squadBuilder: initialSquadBuilder,
        });
    },

    render: function()
    {
        var team = this.state.team;
        var name = this.state.name;
        var type = this.state.type;

        var teamLabelFunction = function(value)
        {
            return Team.properties[value].name;
        }
        var teamUI = React.createElement(Select,
        {
            values: Team.values,
            labelFunction: teamLabelFunction,
            initialSelectedValue: team,
            onChange: this.handleTeamChange,
        });

        var nameUI = React.DOM.input(
        {
            type: "text",
            defaultValue: name,
            onChange: this.handleNameChange,
        });

        var types = [ "SimpleAgent", "HumanAgent" ];
        var typeUI = React.createElement(Select,
        {
            values: types,
            initialSelectedValue: type,
            onChange: this.handleTypeChange,
        });

        var squadIdFunction = function(value)
        {
            return value.getYear() + "_" + value.getName();
        };
        var squadLabelFunction = function(value)
        {
            return value.toString();
        };
        var squadBuilders = SquadBuilder.findByTeam(team);
        var squadChooserPanel = React.createElement(SquadChooser,
        {
            squadBuilders: squadBuilders,
            onChange: this.handleSquadChange,
        });
        var selectedSquadBuilder = this.state.squadBuilder;
        var agent = new SimpleAgent(name, team, selectedSquadBuilder);
        var mySquad = selectedSquadBuilder.buildSquad(agent);

        var rows = [];

        rows.push(React.DOM.tr(
        {
            key: rows.length,
        }, React.DOM.td(
        {
            className: "agentTitle",
            colSpan: 2,
        }, "Agent " + this.props.agentNumber)));

        rows.push(React.DOM.tr(
        {
            key: rows.length,
        }, React.DOM.td(
        {
            key: 0,
        }, "Faction:"), React.DOM.td(
        {
            key: 1,
        }, teamUI)));

        rows.push(React.DOM.tr(
        {
            key: rows.length,
        }, React.DOM.td(
        {
            key: 0,
        }, "Name:"), React.DOM.td(
        {
            key: 1,
        }, nameUI)));

        rows.push(React.DOM.tr(
        {
            key: rows.length,
        }, React.DOM.td(
        {
            key: 0,
        }, "Type:"), React.DOM.td(
        {
            key: 1,
        }, typeUI)));

        rows.push(React.DOM.tr(
        {
            key: rows.length,
        }, React.DOM.td(
        {
            key: 0,
        }, "Squad:"), React.DOM.td(
        {
            key: 1,
        }, " ")));

        rows.push(React.DOM.tr(
        {
            key: rows.length,
        }, React.DOM.td(
        {
            colSpan: 2,
        }, squadChooserPanel)));

        return React.DOM.table(
        {
            className: "agentPanel",
        }, React.DOM.tbody({}, rows));
    },

    createAgent: function(type, name, team, squadBuilder)
    {
        var answer;

        switch (type)
        {
        case "SimpleAgent":
            answer = new SimpleAgent(name, team, squadBuilder);
            break;
        case "HumanAgent":
            var imageUtils = new ImageUtilities();
            answer = new HumanAgent(name, team, squadBuilder, imageUtils);
            break;
        default:
            throw "Unknown agent type: " + type;
        }

        return answer;
    },

    handleTeamChange: function(event)
    {
        var selected = event.target.value;
        LOGGER.debug("handleTeamChange() selected = " + selected);
        var squadBuilders = SquadBuilder.findByTeam(selected);
        var squadBuilder = squadBuilders[0];

        this.setState(
        {
            team: selected,
            squadBuilder: squadBuilder,
        }, function()
        {
            this.notifyNewAgent()
        });
    },

    handleNameChange: function(event)
    {
        var name = event.target.value;
        LOGGER.debug("handleNameChange() name = " + name);

        this.setState(
        {
            name: name,
        }, function()
        {
            this.notifyNewAgent()
        });
    },

    handleSquadChange: function(squadBuilder)
    {
        LOGGER.debug("handleSquadChange() squadBuilder = " + squadBuilder);

        this.setState(
        {
            squadBuilder: squadBuilder,
        }, function()
        {
            this.notifyNewAgent()
        });
    },

    handleTypeChange: function(event)
    {
        var selected = event.target.value;
        LOGGER.debug("handleTypeChange() selected = " + selected);

        this.setState(
        {
            type: selected,
        }, function()
        {
            this.notifyNewAgent()
        });
    },

    notifyNewAgent: function()
    {
        if (this.props.onChange)
        {
            var type = this.state.type;
            var name = this.state.name;
            var team = this.state.team;
            var squadBuilder = this.state.squadBuilder;
            LOGGER.trace("type = " + type);
            LOGGER.trace("name = " + name);
            LOGGER.trace("team = " + team);
            LOGGER.trace("squadBuilder = " + squadBuilder);

            var agent = this.createAgent(type, name, team, squadBuilder);
            LOGGER.debug("notifyNewAgent() agent = " + agent);
            this.props.onChange(agent, this.props.agentNumber);
        }
    },
});
