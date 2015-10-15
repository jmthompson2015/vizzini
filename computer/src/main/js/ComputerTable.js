var ComputerTable = React
        .createClass(
        {
            // Factories.
            Table: React.createFactory(Reactable.Table),
            Tr: React.createFactory(Reactable.Tr),
            Td: React.createFactory(Reactable.Td),
            Tfoot: React.createFactory(Reactable.Tfoot),

            getInitialState: function()
            {
                var answer = {};

                Computer.values().forEach(function(computerKey)
                {
                    var computer = Computer[computerKey];
                    answer[computerKey] = Computer.createInstance(computer);
                });

                return answer;
            },

            createComponentCell: function(computerProperty)
            {
                var type = ComputerProperty.properties[computerProperty].displayName;

                return this.Td(
                {
                    key: -1,
                    column: "component"
                }, type)
            },

            createPartCell: function(computer, computerProperty, partKeys, i)
            {
                var partRef = Part[computerProperty];
                var child;

                if (Array.isArray(partKeys))
                {
                    var selectedValue = computer[computerProperty];
                    var labelFunction = function(partKey)
                    {
                        var answer = partKey;
                        if (partKey !== "*none*")
                        {
                            answer = partRef.properties[partKey].name;
                            var selectedCost;
                            if (selectedValue && selectedValue !== "*none*")
                            {
                                selectedCost = partRef.properties[selectedValue].cost
                            }
                            var cost = partRef.properties[partKey].cost;
                            if (selectedCost && cost)
                            {
                                var diff = Math
                                        .round((cost - selectedCost) * 100.0) / 100.0;
                                if (diff > 0)
                                {
                                    answer += " + $" + Math.abs(diff);
                                }
                                else if (diff < 0)
                                {
                                    answer += " - $" + Math.abs(diff);
                                }
                            }
                            else if (cost)
                            {
                                answer += " $" + cost;
                            }
                        }
                        return answer;
                    }
                    child = new Select(partKeys, labelFunction, selectedValue,
                            this.myOnChange1,
                            {
                                "data-computerkey": computer.value,
                                "data-component": computerProperty
                            });
                }
                else
                {
                    var component = (partKeys ? (Array.isArray(partKeys) ? partRef.properties[partKeys[0]]
                            : partRef.properties[partKeys])
                            :
                            {
                                name: ""
                            });
                    child = component.name;
                }

                return this.Td(
                {
                    key: (2 * i),
                    className: "textCell",
                    column: "part" + i
                }, child);
            },

            createCostCell: function(computer, computerProperty, partKeys, i)
            {
                var partRef = Part[computerProperty];
                var cost;

                if (Array.isArray(partKeys))
                {
                    var selectedValue = computer[computerProperty];
                    if (selectedValue !== "*none*")
                    {
                        cost = partRef.properties[selectedValue].cost;
                    }
                }
                else
                {
                    var component = (partKeys ? (Array.isArray(partKeys) ? partRef.properties[partKeys[0]]
                            : partRef.properties[partKeys])
                            : {});
                    cost = component.cost;
                }

                var element = "";

                if (cost)
                {
                    var selectedValue = computer[computerProperty];
                    var url = partRef.properties[selectedValue].url;
                    element = React.DOM.span({}, "$", React.DOM.a(
                    {
                        href: url,
                        target: "_blank",
                    }, cost));
                }

                return this.Td(
                {
                    key: (2 * i) + 1,
                    className: "numberCell",
                    column: "cost" + i
                }, element);
            },

            createRows: function(computerKeys)
            {
                var answer = [];
                var computerProperties = ComputerProperty.values();
                var self = this;
                computerProperties.forEach(function(computerProperty)
                {
                    var cells = [];
                    cells.push(self.createComponentCell(computerProperty));

                    computerKeys.forEach(function(computerKey, i)
                    {
                        var computer = self.state[computerKey];
                        var partKeys = Computer[computerKey][computerProperty];
                        cells.push(self.createPartCell(computer,
                                computerProperty, partKeys, i));
                        cells.push(self.createCostCell(computer,
                                computerProperty, partKeys, i));
                    });

                    answer.push(self.Tr(
                    {
                        key: 0
                    }, cells));
                });

                return answer;
            },

            createFoot: function(computerKeys)
            {
                var cells = [];
                cells.push(React.DOM.td(
                {
                    key: -1,
                    column: "component"
                }, "Ref. Build"));
                var self = this;

                computerKeys.forEach(function(computerKey, i)
                {
                    var computer = self.state[computerKey];
                    var totalCost = Computer.computeTotalCost(computer);
                    if (isNaN(totalCost))
                    {
                        LOGGER.info("For computerKey = " + computerKey
                                + " not a number totalCost = " + totalCost);
                    }

                    cells.push(React.DOM.td(
                    {
                        key: (2 * i),
                        className: "footTextCell",
                        column: "part" + i
                    }, computer.name));
                    cells.push(React.DOM.td(
                    {
                        key: (2 * i) + 1,
                        className: "footNumberCell",
                        column: "cost" + i
                    }, "$" + totalCost));
                });

                var answer = this.Tfoot(
                {
                    key: 100
                }, cells);

                return answer;
            },

            myOnChange1: function(event)
            {
                var selected = event.currentTarget.value;
                var computerKey = event.currentTarget.dataset.computerkey;
                var component = event.currentTarget.dataset.component;
                var computer = this.state[computerKey];
                computer[component] = selected;
                var obj = {};
                obj[computerKey] = computer;
                this.setState(obj);
            },

            render: function()
            {
                var computerKeys = Computer.values();

                var columns = [];
                columns.push(
                {
                    key: "component",
                    label: "Component"
                });
                computerKeys.forEach(function(computerKey, i)
                {
                    var computer = Computer[computerKey];
                    columns.push(
                    {
                        key: "part" + i,
                        label: "Part"
                    });
                    columns.push(
                    {
                        key: "cost" + i,
                        label: "Cost"
                    });
                });

                var rows = this.createRows(computerKeys);
                var tfoot = this.createFoot(computerKeys);

                return this.Table(
                {
                    className: "computerTable",
                    columns: columns,
                    sortable: true,
                }, rows, tfoot);
            },
        });
