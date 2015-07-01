/*
 * Provides a user interface for an upgrade card.
 * 
 * @param upgradeCard Upgrade card.
 */
var UpgradeCardUI = React.createClass(
{
    render: function()
    {
        var upgradeCard = this.props.upgradeCard;
        var upgradeProps = UpgradeCard.properties[upgradeCard];

        var rows = [];
        
        rows[rows.length] = <tr key={upgradeCard+"0"} className="upgradeCardUIName">
            <td colSpan="2">{upgradeProps.name}</td>
            </tr>;
            
        rows[rows.length] = <tr key={upgradeCard+"1"}>
            <td colSpan="2">{upgradeProps.description}</td>
            </tr>;
        
        rows[rows.length] = <tr key={upgradeCard+"2"}>
            <td className="upgradeCardUIImage">{UpgradeCardUI.createUpgradeImage(upgradeProps.type)}</td>
            <td className="upgradeCardUISquadPoints" title="Squad Point cost">{upgradeProps.squadPointCost}</td>
            </tr>;
        
        return <table className="upgradeCardUI">
            <tbody>{rows}</tbody>
            </table>;
    },
});

UpgradeCardUI.ImagesUrl = "http://rawgit.com/jmthompson2015/vizzini/master/starfightersquadronsweb/src/main/resources/images/upgrade/"

UpgradeCardUI.createUpgradeImage = function(upgradeType)
{
    var typeName = UpgradeType.properties[upgradeType].displayName;
    var fileString = UpgradeCardUI.ImagesUrl + typeName + "24.png";
    
    return <img className="upgradeCardUIImage" src={fileString} title={typeName} />;
}
