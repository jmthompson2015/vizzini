/*
 * Provides a user interface to choose a ship action.
 */
function ShipActionChooser(environment, attacker, shipActions)
{
    this.okActionPerformed = function()
    {
        var answer = getShipAction();

        callback(answer);
    }

    this.paintComponent = function()
    {
        var answer = "";

        answer += "<table class='shipActionPanel'>";

        answer += "<tr>";
        answer += "<td class='shipActionPanel' colspan='2'>";
        answer += "Select Action";
        answer += "</td>";
        answer += "</tr>";

        if (attacker)
        {
            answer += "<tr>";
            answer += "<td colspan='2'>";
            answer += "Active Ship: ";
            answer += attacker.getName();
            answer += "</td>";
            answer += "</tr>";
        }

        answer += "<tr>";
        answer += "<td>";
        answer += createShipActionTable();
        answer += "</td>";

        answer += "<td class='shipActionOk'>";
        answer += "<button type='button' onclick='ShipActionChooser.instance.okActionPerformed()'>OK</button>";
        answer += "</td>";

        answer += "</tr>";
        answer += "</table>";

        return answer;
    }

    function createShipActionTable()
    {
        var answer = "";

        answer += "<table id='shipActionTable'>";

        for (var i = 0; i < shipActions.length; i++)
        {
            var shipAction = shipActions[i];

            answer += "<tr>";
            answer += "<td class='shipActionCell'>";
            answer += "<input type='radio' name='shipActionRadio' value=";
            answer += i;
            answer += ">";
            answer += ShipAction.properties[shipAction].displayName;
            answer += "</input>";
            answer += "</td>";
            answer += "</tr>";
        }

        answer += "</table>";

        return answer;
    }

    function getShipAction()
    {
        // HTMLTableElement
        var element = document.getElementById("shipActionTable");

        var answer;

        // Walk the table rows to find the selected element.
        var rows = element.rows;

        for (var i = 0; i < rows.length; i++)
        {
            // HTMLTableRowElement
            var row = rows[i];
            // HTMLTableCellElement
            var cell = row.cells[0];
            // HTMLInputElement
            var radio = cell.firstElementChild;

            if (radio.checked)
            {
                answer = shipActions[radio.value];
                break;
            }
        }

        return answer;
    }

    ShipActionChooser.instance = this;
}
