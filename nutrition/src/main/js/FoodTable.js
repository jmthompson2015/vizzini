var Table = Reactable.Table;
var Tr = Reactable.Tr;
var Td = Reactable.Td;

var FoodTable = React.createClass(
{
    columns: FoodProperty.createColumnsArray(),
    
    displayValue: function(value)
    {
        return (value === undefined ? "" : value);
    },
    
    createAddAction: function(food)
    {
        var addFunction = this.props.addFunction;
        
        return <a href="#" className="addButton" onClick={function(event)
                    {
                        LOGGER.debug("food = "+food.brand+" "+food.name);
                        addFunction(food);
                    }
                }><img src="../resources/add.png" />
            </a>;
    },
    
    createCell: function(food, column, i, actionFunction)
    {
        var col = column.key;
        
        if (col === "action")
        {
            return <Td key={"col-"+i} className={column.className} column={col}>
                    {actionFunction}
                </Td>;
        }
        else
        {
            return <Td key={"col-"+i} className={column.className} column={col}>
                    {this.displayValue(food[col])}
                </Td>;
        }
    },
    
    createRemoveAction: function(food)
    {
        var removeFunction = this.props.removeFunction;
        
        return <a href="#" className="removeButton" onClick={function(event)
                    {
                        LOGGER.debug("food = "+food.brand+" "+food.name);
                        removeFunction(food);
                    }
                }><img src="../resources/delete.png" />
            </a>;
    },
    
    createRow: function(food, i)
    {
        var isAdding = this.props.isAdding;
        var actionFunction = (isAdding ? food["addAction"] : food["removeAction"]);
        var self = this;
        var cells = this.columns.map(function(column, j) { return self.createCell(food, column, j, actionFunction); });

        return (<Tr key={"row-"+i}>{cells}</Tr>);
    },

    createTotalsRow: function()
    {
        var sums = {};
        var values = FoodProperty.numberValues();
        
        values.forEach(function(property){
            sums[property] = 0;
        });        
        
        var foods = this.props.foods;

        foods.forEach(function(food)
        {
            values.forEach(function(property){
                sums[property] += FoodUtilities.safeNumber(food[property]);
            });        
        });        
        
        return (<tr>
                <td colSpan="6">Totals</td>
                <td>{sums[FoodProperty.CALORIES]}</td>
                <td>{sums[FoodProperty.CALORIES_FROM_FAT]}</td>
                <td>{sums[FoodProperty.FAT]}</td>
                <td>{sums[FoodProperty.FAT_SATURATED]}</td>
                <td>{sums[FoodProperty.FAT_TRANS]}</td>
                <td>{sums[FoodProperty.FAT_POLYUNSAT]}</td>
                <td>{sums[FoodProperty.FAT_MONOUNSAT]}</td>
                <td>{sums[FoodProperty.CHOLESTEROL]}</td>
                <td>{sums[FoodProperty.SODIUM]}</td>
                <td>{sums[FoodProperty.POTASSIUM]}</td>
                <td>{sums[FoodProperty.CARBS]}</td>
                <td>{sums[FoodProperty.CARBS_DIETARY_FIBER]}</td>
                <td>{sums[FoodProperty.CARBS_SUGARS]}</td>
                <td>{sums[FoodProperty.PROTEIN]}</td>
                <td>&nbsp;</td>
            </tr>);
    },
    
    render: function()
    {
        var isAdding = this.props.isAdding;
        var foods = this.props.foods;
        var showTotals = this.props.showTotals;
        var self = this;

        // Assign actions.
        foods.forEach(function(food)
            {
                if (isAdding && !food.addAction)
                {
                    food.addAction = self.createAddAction(food);
                }
                
                if (!isAdding && !food.removeAction)
                {
                    food.removeAction = self.createRemoveAction(food);
                }
            });
        
        LOGGER.debug("foods.length = " + foods.length);
        var rows = foods.map(function(food, i) { return self.createRow(food, i); });
        
        LOGGER.debug("rows.length = " + rows.length);
        LOGGER.debug("showTotals ? "+showTotals);
        
        if (showTotals)
        {
            return (<Table className="foodTable" columns={this.columns} sortable={true}>
                    {rows}
                    <Reactable.Tfoot>{this.createTotalsRow()}</Reactable.Tfoot>
                </Table>);
        }
        else
        {
            return (<Table className="foodTable" columns={this.columns} sortable={true} filterable={["type"]}>{rows}</Table>);
        }
    },
});
