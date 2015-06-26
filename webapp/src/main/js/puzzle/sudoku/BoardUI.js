var BoardUI = React.createClass(
{
    getInitialState: function() 
    {
        return {puzzle: this.props.puzzle};
    },
    
    componentDidMount: function() 
    {  
        this.state.puzzle.bind("change", this.puzzleChanged);
    },
    
    componentWillUnmount: function() 
    {  
        this.state.puzzle.unbind("change", this.puzzleChanged);
    },

    render: function()
    {
        var rows=[];
        
        for (var j=0; j<9; j++)
        {
            var cells=[];
            
            for (var i=0; i<9; i++)
            {
                var index = Unit.coordinatesToIndex(i,j);
                var cellName = Unit.indexToCellName(index);
                var value = this.state.puzzle.get(cellName);
                
                if (value.length === 1)
                {
                    cells[i] = <td key={i} id={cellName} className="valueCell">
                        <BoardUI.CellUI value={value} /></td>;
                }
                else
                {
                    cells[i] = <td key={i} id={cellName} className="valuesCell">
                        <BoardUI.CandidatesCellUI values={value} /></td>;
                }
            }
            
            rows[j] = <tr key={j}>{cells}</tr>;
        }
        
        return <table id="boardTable">{rows}</table>;
    },
    
    puzzleChanged: function() 
    {
        this.setState({puzzle: this.state.puzzle});
    },
});

BoardUI.CellUI = React.createClass(
{
    render: function()
    {
        return <span>{this.props.value}</span>;
    }
});

BoardUI.CandidatesCellUI = React.createClass(
{
    render: function()
    {
        var rows = [];
        
        for (var j=0; j<3; j++)
        {
            var cells = [];
            
            for (var i=0; i<3; i++)
            {
                var index = (j * 3) + i;
                var value = Number(index+1).toString();
                
                if (this.props.values.indexOf(value) >= 0)
                {
                    cells[i] = <td key={i}>{value}</td>;
                }
                else
                {
                    cells[i] = <td key={i}>&nbsp;</td>;
                }
            }
            
            rows[j] = <tr key={j}>{cells}</tr>
        }
        
        return <table>{rows}</table>;
    }
});
