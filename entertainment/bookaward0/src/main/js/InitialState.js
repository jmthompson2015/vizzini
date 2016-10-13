define(["Award", "Nominee"], function(Award, Nominee)
{
    "use strict";

    function InitialState()
    {
        this.nominees = [];

        var agatha = Award.properties.agatha;
        var barry = Award.properties.barry;
        var edgar = Award.properties.edgar;
        var shamus = Award.properties.shamus;
        this.nominees.push(new Nominee("A Song of Shadows", "John Connolly", barry, barry.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("Badlands", "C.J. Box", barry, barry.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("Blessed Are Those Who Weep", "Kristi Belcamino", barry, barry.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("Brute Force", "Marc Cameron", barry, barry.categories.properties.thriller, 2016));
        this.nominees.push(new Nominee("Bull Mountain", "Brian Panowich", barry, barry.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Canary", "Duane Swierczynski", edgar, edgar.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("Devil of Delphi", "Jeffrey Siger", barry, barry.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("Foreign and Domestic", "A.J. Tata", barry, barry.categories.properties.thriller, 2016));
        this.nominees.push(new Nominee("Gun Street Girl", "Adrian McKinty", edgar, edgar.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("Hostage Taker", "Stefanie Pintoff", barry, barry.categories.properties.thriller, 2016));
        this.nominees.push(new Nominee("Jade Dragon Mountain", "Elsa Hart", barry, barry.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Let Me Die in His Footsteps", "Lori Roy", edgar, edgar.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("Life or Death", "Michael Robotham", barry, barry.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("Life or Death", "Michael Robotham", edgar, edgar.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("Luckiest Girl Alive", "Jessica Knoll", edgar, edgar.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Night Life", "David C. Taylor", edgar, edgar.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("No Other Darkness", "Sarah Hilary", barry, barry.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("Past Crimes", "Glen Erik Hamilton", barry, barry.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Past Crimes", "Glen Erik Hamilton", edgar, edgar.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Quarry’s Choice", "Max Allan Collins", barry, barry.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("Ruins of War", "John A. Connell", barry, barry.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Snowblind", "Ragnar Jónasson", barry, barry.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("Stone Cold Dead", "James W. Ziskin", barry, barry.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("The Cartel", "Don Winslow", barry, barry.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("The Daughter", "Jane Shemilt", edgar, edgar.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("The Girl on the Train", "Paula Hawkins", barry, barry.categories.properties.first, 2016));
        this.nominees.push(new Nominee("The Killing Kind", "Chris Holm", barry, barry.categories.properties.thriller, 2016));
        this.nominees.push(new Nominee("The Lady from Zagreb", "Philip Kerr", edgar, edgar.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("The Long and Faraway Gone", "Lou Berney", barry, barry.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("The Long and Faraway Gone", "Lou Berney", edgar, edgar.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("The Mask", "Taylor Stevens", barry, barry.categories.properties.thriller, 2016));
        this.nominees.push(new Nominee("The Necessary Death of Lewis Winter", "Malcolm Mackay", edgar, edgar.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("The Stolen Ones", "Owen Laukkanen", barry, barry.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("The Strangler Vine", "M.J. Carter", edgar, edgar.categories.properties.novel, 2016));
        this.nominees.push(new Nominee("The Sympathizer", "Viet Thanh Nguyen", edgar, edgar.categories.properties.first, 2016));
        this.nominees.push(new Nominee("The Unquiet Dead", "Ausma Zehanat Khan", barry, barry.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Unbecoming", "Rebecca Scherm", edgar, edgar.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Viking Bay", "M.A. Lawson", barry, barry.categories.properties.thriller, 2016));
        this.nominees.push(new Nominee("What She Knew", "Gilly Macmillan", edgar, edgar.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("Where All Light Tends to Go", "David Joy", edgar, edgar.categories.properties.first, 2016));
        this.nominees.push(new Nominee("Woman with a Blue Pencil", "Gordon McAlpine", edgar, edgar.categories.properties.paperback, 2016));
        this.nominees.push(new Nominee("Bridges Burned", "Annette Dashofy", agatha, agatha.categories.properties.contemporary, 2015));
        this.nominees.push(new Nominee("Death of a Dishonorable Gentleman", "Tessa Arlen", agatha, agatha.categories.properties.first, 2015));
        this.nominees.push(new Nominee("Dreaming Spies", "Laurie R. King", agatha, agatha.categories.properties.historical, 2015));
        this.nominees.push(new Nominee("Just Killing Time", "Julianne Holmes", agatha, agatha.categories.properties.first, 2015));
        this.nominees.push(new Nominee("Long Upon the Land", "Margaret Maron", agatha, agatha.categories.properties.contemporary, 2015));
        this.nominees.push(new Nominee("MacDeath", "Cindy Brown", agatha, agatha.categories.properties.first, 2015));
        this.nominees.push(new Nominee("Malice at the Palace", "Rhys Bowen", agatha, agatha.categories.properties.historical, 2015));
        this.nominees.push(new Nominee("Mrs. Roosevelt’s Confidante", "Susan Elia MacNeal", agatha, agatha.categories.properties.historical, 2015));
        this.nominees.push(new Nominee("Murder on Amsterdam Avenue", "Victoria Thompson", agatha, agatha.categories.properties.historical, 2015));
        this.nominees.push(new Nominee("On the Road with Del and Louise", "Art Taylor", agatha, agatha.categories.properties.first, 2015));
        this.nominees.push(new Nominee("Plantation Shudders", "Ellen Byron", agatha, agatha.categories.properties.first, 2015));
        this.nominees.push(new Nominee("The Child Garden", "Catriona McPherson", agatha, agatha.categories.properties.contemporary, 2015));
        this.nominees.push(new Nominee("The Masque of a Murderer", "Susanna Calkins", agatha, agatha.categories.properties.historical, 2015));
        this.nominees.push(new Nominee("The Nature of the Beast", "Louise Penny", agatha, agatha.categories.properties.contemporary, 2015));
        this.nominees.push(new Nominee("What You See", "Hank Phillippi Ryan", agatha, agatha.categories.properties.contemporary, 2015));
    }

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
