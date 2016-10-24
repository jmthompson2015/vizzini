define(
        [ "MediumAgent", "SimpleAgent", "SquadBuilder", "Team", "ui/HumanAgent", "ui/SquadBuilderUI", "ui/SquadChooser" ],
        function(MediumAgent, SimpleAgent, SquadBuilder, Team, HumanAgent, SquadBuilderUI, SquadChooser)
        {
            "use strict";
            var NewGamePanel = React.createClass(
            {
                getInitialState: function()
                {
                    var agent1 = new MediumAgent("Agent 1", Team.IMPERIAL);
                    var squad1 = SquadBuilder.findByTeam(agent1.teamKey())[0].buildSquad(agent1);
                    var agent2 = new HumanAgent("Agent 2", Team.REBEL);
                    var squad2 = SquadBuilder.findByTeam(agent2.teamKey())[0].buildSquad(agent2);

                    return (
                    {
                        agent1: agent1,
                        squad1: squad1,
                        agent2: agent2,
                        squad2: squad2,
                    });
                },

                render: function()
                {
                    var agentPanel1 = React.createElement(NewGamePanel.AgentPanel,
                    {
                        agentNumber: 1,
                        initialType: "MediumAgent",
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

                handleAgentChange: function(agent, agentNumber, squad)
                {
                    LOGGER.trace("handleAgentChange() agent = " + agent + " agentNumber = " + agentNumber);

                    switch (agentNumber)
                    {
                    case 1:
                        this.setState(
                        {
                            agent1: agent,
                            squad1: squad,
                        });
                        break;
                    case 2:
                        this.setState(
                        {
                            agent2: agent,
                            squad2: squad,
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
                    this.props.callback(this.state.agent1, this.state.squad1, this.state.agent2, this.state.squad2);
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
                CUSTOM: "Custom",
                PREFABRICATED: "Prefabricated",

                getInitialState: function()
                {
                    InputValidator.validateNotNull("agentNumber", this.props.agentNumber);
                    var initialTeam = (this.props.initialTeam ? this.props.initialTeam : Team.IMPERIAL);
                    var initialName = "Agent " + this.props.agentNumber;
                    var initialType = (this.props.initialType ? this.props.initialType : "SimpleAgent");
                    var squadBuilders = SquadBuilder.findByTeam(initialTeam);
                    var initialSquadBuilder = squadBuilders[0];
                    var agent = new SimpleAgent(initialName, initialTeam);
                    var squad = initialSquadBuilder.buildSquad(agent);

                    return (
                    {
                        team: initialTeam,
                        name: initialName,
                        type: initialType,
                        squadBuilderType: this.PREFABRICATED,
                        squad: squad,
                    });
                },

                render: function()
                {
                    var team = this.state.team;
                    var name = this.state.name;
                    var type = this.state.type;

                    var teamValues = [ Team.IMPERIAL, Team.REBEL, Team.SCUM ];
                    var teamLabelFunction = function(value)
                    {
                        var answer = Team.properties[value].name;
                        var friend = Team.friend(value);
                        if (friend)
                        {
                            answer += " + " + Team.properties[friend].name;
                        }
                        return answer;
                    };
                    var teamUI = React.createElement(Select,
                    {
                        values: teamValues,
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

                    var types = [ "SimpleAgent", "MediumAgent", "HumanAgent" ];
                    var typeUI = React.createElement(Select,
                    {
                        values: types,
                        initialSelectedValue: type,
                        onChange: this.handleTypeChange,
                    });

                    var squadBuilderTypes = [ this.PREFABRICATED, this.CUSTOM ];
                    var squadBuilderTypeUI = React.createElement(Select,
                    {
                        values: squadBuilderTypes,
                        initialSelectedValue: squadBuilderTypes[0],
                        onChange: this.handleSquadBuilderTypeChange,
                    });

                    var squadChooserPanel;
                    var squadBuilderType = this.state.squadBuilderType;

                    if (squadBuilderType === this.PREFABRICATED)
                    {
                        var squadIdFunction = function(value)
                        {
                            return value.year() + "_" + value.name();
                        };
                        var squadLabelFunction = function(value)
                        {
                            return value.toString();
                        };
                        var squadBuilders = SquadBuilder.findByTeam(team);
                        squadChooserPanel = React.createElement(SquadChooser,
                        {
                            name: "agent" + this.props.agentNumber,
                            squadBuilders: squadBuilders,
                            onChange: this.handleSquadBuilderChange,
                        });
                    }
                    else if (squadBuilderType === this.CUSTOM)
                    {
                        squadChooserPanel = React.createElement(SquadBuilderUI,
                        {
                            team: team,
                            onChange: this.handleSquadChange,
                        });
                    }
                    else
                    {
                        throw "Unknown squadBuilderType: " + squadBuilderType;
                    }

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
                    }, squadBuilderTypeUI)));

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

                createAgent: function(type, name, team)
                {
                    var answer;

                    switch (type)
                    {
                    case "SimpleAgent":
                        answer = new SimpleAgent(name, team);
                        break;
                    case "MediumAgent":
                        answer = new MediumAgent(name, team);
                        break;
                    case "HumanAgent":
                        answer = new HumanAgent(name, team);
                        break;
                    default:
                        throw "Unknown agent type: " + type;
                    }

                    return answer;
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
                        this.notifyNewAgent();
                    });
                },

                handleSquadBuilderChange: function(squadBuilder)
                {
                    LOGGER.trace("handleBuilderSquadChange() squadBuilder = " + squadBuilder);
                    var agent = new SimpleAgent(this.state.name, this.state.team);
                    var squad = squadBuilder.buildSquad(agent);

                    this.setState(
                    {
                        squad: squad,
                    }, function()
                    {
                        this.notifyNewAgent();
                    });
                },

                handleSquadBuilderTypeChange: function(event)
                {
                    var selected = event.target.value;
                    LOGGER.debug("handleSquadBuilderTypeChange() selected = " + selected);

                    this.setState(
                    {
                        squadBuilderType: selected,
                    }, function()
                    {
                        this.notifyNewAgent();
                    });
                },

                handleSquadChange: function(squad)
                {
                    LOGGER.trace("handleSquadChange() squad = " + squad);

                    this.setState(
                    {
                        squad: squad,
                    }, function()
                    {
                        this.notifyNewAgent();
                    });
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
                        this.notifyNewAgent();
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
                        this.notifyNewAgent();
                    });
                },

                notifyNewAgent: function()
                {
                    if (this.props.onChange)
                    {
                        var type = this.state.type;
                        var name = this.state.name;
                        var team = this.state.team;
                        var squadBuilderType = this.state.squadBuilderType;
                        LOGGER.trace("type = " + type);
                        LOGGER.trace("name = " + name);
                        LOGGER.trace("team = " + team);
                        LOGGER.trace("squadBuilderType = " + squadBuilderType);

                        var agent = this.createAgent(type, name, team);
                        LOGGER.trace("notifyNewAgent() agent = " + agent);
                        var squad = this.state.squad;
                        LOGGER.trace("squad = " + squad);
                        this.props.onChange(agent, this.props.agentNumber, squad);
                    }
                },
            });

            return NewGamePanel;
        });
