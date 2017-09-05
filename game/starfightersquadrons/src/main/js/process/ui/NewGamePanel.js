define(["Team",
  "process/MediumAgent", "process/SimpleAgent", "process/SquadBuilder",
  "process/ui/HumanAgent", "process/ui/SquadChooser",
  "squadbuilder/ui/SquadBuilderUI"],
   function(Team,
      MediumAgent, SimpleAgent, SquadBuilder,
      HumanAgent, SquadChooser,
      SquadBuilderUI)
   {
      "use strict";
      var NewGamePanel = React.createClass(
      {
         propTypes:
         {
            iconBase: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,
         },

         getInitialState: function()
         {
            var agent1 = new HumanAgent("Agent 2", Team.IMPERIAL, "firstPilotInputArea", this.props.imageBase);
            var squad1 = SquadBuilder.findByTeam(agent1.teamKey())[0].buildSquad(agent1);
            var agent2 = new MediumAgent("Agent 1", Team.REBEL);
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
               iconBase: this.props.iconBase,
               inputAreaId: "firstPilotInputArea",
               imageBase: this.props.imageBase,
               initialType: "HumanAgent",
               onChange: this.handleAgentChange,
            });
            var agentPanel2 = React.createElement(NewGamePanel.AgentPanel,
            {
               agentNumber: 2,
               iconBase: this.props.iconBase,
               inputAreaId: "secondPilotInputArea",
               imageBase: this.props.imageBase,
               initialTeamKey: Team.REBEL,
               initialType: "MediumAgent",
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

            var message = React.DOM.table(
            {}, React.DOM.tbody(
            {}, React.DOM.tr(
            {}, cell1, cell2)));
            var initialInput;
            var okButton = React.DOM.button(
            {
               key: 0,
               onClick: this.ok,
            }, "OK");
            var buttons = React.DOM.span(
            {}, [okButton]);

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

      NewGamePanel.AgentPanel = React.createClass(
      {
         CUSTOM: "Custom",
         PREFABRICATED: "Prefabricated",

         propTypes:
         {
            agentNumber: PropTypes.number.isRequired,
            iconBase: PropTypes.string.isRequired,
            inputAreaId: PropTypes.string.isRequired,
            imageBase: PropTypes.string.isRequired,

            // default: Team.IMPERIAL
            initialTeamKey: PropTypes.string,
            // default: SimpleAgent
            initialType: PropTypes.string,
            onChange: PropTypes.func,
         },

         getInitialState: function()
         {
            var initialTeamKey = (this.props.initialTeamKey ? this.props.initialTeamKey : Team.IMPERIAL);
            var initialName = "Agent " + this.props.agentNumber;
            var initialType = (this.props.initialType ? this.props.initialType : "SimpleAgent");
            var squadBuilders = SquadBuilder.findByTeam(initialTeamKey);
            var initialSquadBuilder = squadBuilders[0];
            var agent = new SimpleAgent(initialName, initialTeamKey);
            var squad = initialSquadBuilder.buildSquad(agent);

            return (
            {
               teamKey: initialTeamKey,
               name: initialName,
               type: initialType,
               squadBuilderType: this.PREFABRICATED,
               squad: squad,
            });
         },

         render: function()
         {
            var teamKey = this.state.teamKey;
            var team = Team.properties[teamKey];
            var name = this.state.name;
            var type = this.state.type;

            var teamValues = [Team.IMPERIAL, Team.REBEL, Team.SCUM];
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
               initialSelectedValue: teamKey,
               onChange: this.handleTeamChange,
            });

            var nameUI = React.DOM.input(
            {
               type: "text",
               defaultValue: name,
               onChange: this.handleNameChange,
            });

            var types = ["SimpleAgent", "MediumAgent", "HumanAgent"];
            var typeUI = React.createElement(Select,
            {
               values: types,
               initialSelectedValue: type,
               onChange: this.handleTypeChange,
            });

            var squadBuilderTypes = [this.PREFABRICATED, this.CUSTOM];
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
               var squadBuilders = SquadBuilder.findByTeam(teamKey);
               squadChooserPanel = React.createElement(SquadChooser,
               {
                  key: squadBuilderType + teamKey,
                  iconBase: this.props.iconBase,
                  imageBase: this.props.imageBase,
                  name: "agent" + this.props.agentNumber,
                  onChange: this.handleSquadBuilderChange,
                  squadBuilders: squadBuilders,
               });
            }
            else if (squadBuilderType === this.CUSTOM)
            {
               squadChooserPanel = React.createElement(SquadBuilderUI,
               {
                  key: squadBuilderType + teamKey,
                  imageBase: this.props.imageBase,
                  onChange: this.handleSquadChange,
                  team: team,
               });
            }
            else
            {
               throw "Unknown squadBuilderType: " + squadBuilderType;
            }

            var rows = [];

            rows.push(React.DOM.tr(
            {
               key: "agentRow",
            }, React.DOM.td(
            {
               className: "agentTitle",
               colSpan: 2,
            }, "Agent " + this.props.agentNumber)));

            rows.push(React.DOM.tr(
            {
               key: "factionRow",
            }, React.DOM.td(
            {
               key: "factionLabel",
            }, "Faction:"), React.DOM.td(
            {
               key: "factionValue",
            }, teamUI)));

            rows.push(React.DOM.tr(
            {
               key: "agentNameRow",
            }, React.DOM.td(
            {
               key: "agentNameLabel",
            }, "Agent Name:"), React.DOM.td(
            {
               key: "agentNameValue",
            }, nameUI)));

            rows.push(React.DOM.tr(
            {
               key: "agentTypeRow",
            }, React.DOM.td(
            {
               key: "agentTypeLabel",
            }, "Agent Type:"), React.DOM.td(
            {
               key: "agentTypeValue",
            }, typeUI)));

            rows.push(React.DOM.tr(
            {
               key: "squadTypeRow",
            }, React.DOM.td(
            {
               key: "squadTypeLabel",
            }, "Squad Type:"), React.DOM.td(
            {
               key: "squadTypeValue",
            }, squadBuilderTypeUI)));

            rows.push(React.DOM.tr(
            {
               key: "squadChooserRow",
            }, React.DOM.td(
            {
               colSpan: 2,
            }, squadChooserPanel)));

            return React.DOM.table(
            {
               className: "agentPanel",
            }, React.DOM.tbody(
            {}, rows));
         },

         createAgent: function(type, name, teamKey, inputAreaId)
         {
            var answer;

            switch (type)
            {
               case "SimpleAgent":
                  answer = new SimpleAgent(name, teamKey);
                  break;
               case "MediumAgent":
                  answer = new MediumAgent(name, teamKey);
                  break;
               case "HumanAgent":
                  answer = new HumanAgent(name, teamKey, inputAreaId, this.props.imageBase);
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
            var agent = new SimpleAgent(this.state.name, this.state.teamKey);
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
               teamKey: selected,
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
               var teamKey = this.state.teamKey;
               var inputAreaId = this.props.inputAreaId;
               var squadBuilderType = this.state.squadBuilderType;
               LOGGER.trace("type = " + type);
               LOGGER.trace("name = " + name);
               LOGGER.trace("teamKey = " + teamKey);
               LOGGER.trace("squadBuilderType = " + squadBuilderType);

               var agent = this.createAgent(type, name, teamKey, inputAreaId);
               LOGGER.trace("notifyNewAgent() agent = " + agent);
               var squad = this.state.squad;
               LOGGER.trace("squad = " + squad);
               this.props.onChange(agent, this.props.agentNumber, squad);
            }
         },
      });

      return NewGamePanel;
   });
