define(["Assessment", "Award", "Book", "Nomination"], function(Assessment, Award, Book, Nomination)
{
    "use strict";

    function InitialState()
    {
        this.books = [];
        this.bookToNomination = {};
        this.bookToAssessment = {};

        var agatha = Award.properties.agatha;
        var anthony = Award.properties.anthony;
        var barry = Award.properties.barry;
        var crimeAndBeyond = Award.properties.crimeAndBeyond;
        var dagger = Award.properties.dagger;
        var edgar = Award.properties.edgar;
        var shamus = Award.properties.shamus;

        this.books.push(new Book("A Book of Scars", "William Shaw"));
        this.books.push(new Book("A Song of Shadows", "John Connolly"));
        this.books.push(new Book("Badlands", "C.J. Box"));
        this.books.push(new Book("Black Widow", "Christopher Brookmyre"));
        this.books.push(new Book("Blessed Are Those Who Weep", "Kristi Belcamino"));
        this.books.push(new Book("Blood On Snow", "Jo Nesbø"));
        this.books.push(new Book("Blood, Salt, Water", "Denise Mina"));
        this.books.push(new Book("Bridges Burned", "Annette Dashofy"));
        this.books.push(new Book("Brush Back", "Sara Paretsky"));
        this.books.push(new Book("Brutality", "Ingrid Thoft"));
        this.books.push(new Book("Brute Force", "Marc Cameron"));
        this.books.push(new Book("Bull Mountain", "Brian Panowich"));
        this.books.push(new Book("Canary", "Duane Swierczynski"));
        this.books.push(new Book("Circling the Runway", "J.L. Abramo"));
        this.books.push(new Book("Concrete Angel", "Patricia Abbott"));
        this.books.push(new Book("Crazy Love You", "Lisa Unger"));
        this.books.push(new Book("Dance of the Bones", "J.A. Jance"));
        this.books.push(new Book("Death of a Dishonorable Gentleman", "Tessa Arlen"));
        this.books.push(new Book("Depth", "Lev AC Rosen"));
        this.books.push(new Book("Devil of Delphi", "Jeffrey Siger"));
        this.books.push(new Book("Dodgers", "Bill Beverly"));
        this.books.push(new Book("Dreaming Spies", "Laurie R. King"));
        this.books.push(new Book("Eileen", "Ottessa Moshfegh"));
        this.books.push(new Book("Fever City", "Tim Baker"));
        this.books.push(new Book("Fool Me Once", "Harlan Coben"));
        this.books.push(new Book("Foreign and Domestic", "A.J. Tata"));
        this.books.push(new Book("Freedom’s Child", "Jax Miller"));
        this.books.push(new Book("Gumshoe", "Rob Leininger"));
        this.books.push(new Book("Gun Street Girl", "Adrian McKinty"));
        this.books.push(new Book("Hostage Taker", "Stefanie Pintoff"));
        this.books.push(new Book("Icarus", "Deon Meyer"));
        this.books.push(new Book("Ink & Bone", "Lisa Unger"));
        this.books.push(new Book("Jade Dragon Mountain", "Elsa Hart"));
        this.books.push(new Book("Just Killing Time", "Julianne Holmes"));
        this.books.push(new Book("Let Me Die in His Footsteps", "Lori Roy"));
        this.books.push(new Book("Life or Death", "Michael Robotham"));
        this.books.push(new Book("Little Pretty Things", "Lori Rader-Day"));
        this.books.push(new Book("Long Upon the Land", "Margaret Maron"));
        this.books.push(new Book("Luckiest Girl Alive", "Jessica Knoll"));
        this.books.push(new Book("MacDeath", "Cindy Brown"));
        this.books.push(new Book("Make Me", "Lee Child"));
        this.books.push(new Book("Malice at the Palace", "Rhys Bowen"));
        this.books.push(new Book("Mrs. Roosevelt’s Confidante", "Susan Elia MacNeal"));
        this.books.push(new Book("Murder on Amsterdam Avenue", "Victoria Thompson"));
        this.books.push(new Book("New Yorked", "Rob Hart"));
        this.books.push(new Book("Night Life", "David C. Taylor"));
        this.books.push(new Book("Night Tremors", "Matt Coyle"));
        this.books.push(new Book("No Other Darkness", "Sarah Hilary"));
        this.books.push(new Book("On the Road with Del & Louise", "Art Taylor"));
        this.books.push(new Book("Past Crimes", "Glen Erik Hamilton"));
        this.books.push(new Book("Plantation Shudders", "Ellen Byron"));
        this.books.push(new Book("Quarry’s Choice", "Max Allan Collins"));
        this.books.push(new Book("Rain Dogs", "Adrian McKinty"));
        this.books.push(new Book("Real Tigers", "Mick Herron"));
        this.books.push(new Book("Red Desert", "Clive Rosengren"));
        this.books.push(new Book("Redemption Road", "John Hart"));
        this.books.push(new Book("Ruins of War", "John A. Connell"));
        this.books.push(new Book("Six Four", "Hideo Yokoyama"));
        this.books.push(new Book("Snowblind", "Ragnar Jónasson"));
        this.books.push(new Book("Split to Splinters", "Max Everhart"));
        this.books.push(new Book("Stasi Child", "David Young"));
        this.books.push(new Book("Stone Cold Dead", "James W. Ziskin"));
        this.books.push(new Book("Striking Murder", "A.J. Wright"));
        this.books.push(new Book("The Cartel", "Don Winslow"));
        this.books.push(new Book("The Child Garden", "Catriona McPherson"));
        this.books.push(new Book("The Crossing", "Michael Connelly"));
        this.books.push(new Book("The Daughter", "Jane Shemilt"));
        this.books.push(new Book("The Do-Right", "Lisa Sandlin"));
        this.books.push(new Book("The English Spy", "Daniel Silva"));
        this.books.push(new Book("The Girl on the Train", "Paula Hawkins"));
        this.books.push(new Book("The Good Liar", "Nicholas Searle"));
        this.books.push(new Book("The Great Swindle", "Pierre Lemaître"));
        this.books.push(new Book("The Guilty", "David Baldacci"));
        this.books.push(new Book("The House at Baker Street", "Michelle Birkby"));
        this.books.push(new Book("The Jazz Files", "Fiona Veitch Smith"));
        this.books.push(new Book("The Killer Next Door", "Alex Marwood"));
        this.books.push(new Book("The Killing Kind", "Chris Holm"));
        this.books.push(new Book("The Lady from Zagreb", "Philip Kerr"));
        this.books.push(new Book("The Last Painting of Sara de Vos", "Dominic Smith"));
        this.books.push(new Book("The Long Cold", "O’Neil De Noux"));
        this.books.push(new Book("The Long and Faraway Gone", "Lou Berney"));
        this.books.push(new Book("The Man in the Window", "Dana King"));
        this.books.push(new Book("The Mask", "Taylor Stevens"));
        this.books.push(new Book("The Masque of a Murderer", "Susanna Calkins"));
        this.books.push(new Book("The Murderer in Ruins", "Cay Rademacher"));
        this.books.push(new Book("The Nature of the Beast", "Louise Penny"));
        this.books.push(new Book("The Necessary Death of Lewis Winter", "Malcolm Mackay"));
        this.books.push(new Book("The Other Side of Silence", "Philip Kerr"));
        this.books.push(new Book("The Promise", "Robert Crais"));
        this.books.push(new Book("The Red Storm", "Grant Bywaters"));
        this.books.push(new Book("The Stolen Ones", "Owen Laukkanen"));
        this.books.push(new Book("The Stranger", "Harlan Coben"));
        this.books.push(new Book("The Strangler Vine", "M.J. Carter"));
        this.books.push(new Book("The Sympathizer", "Viet Thanh Nguyen"));
        this.books.push(new Book("The Travelers", "Chris Pavone"));
        this.books.push(new Book("The Truth and Other Lies", "Sascha Arango"));
        this.books.push(new Book("The Unquiet Dead", "Ausma Zehanat Khan"));
        this.books.push(new Book("Trouble in Rooster Paradise", "T.W. Emory"));
        this.books.push(new Book("Unbecoming", "Rebecca Scherm"));
        this.books.push(new Book("Vanishing Games", "Roger Hobbs"));
        this.books.push(new Book("Viking Bay", "M.A. Lawson"));
        this.books.push(new Book("What She Knew", "Gilly Macmillan"));
        this.books.push(new Book("What You See", "Hank Phillippi Ryan"));
        this.books.push(new Book("Where All Light Tends to Go", "David Joy"));
        this.books.push(new Book("Woman with a Blue Pencil", "Gordon McAlpine"));
        this.books.push(new Book("Young Americans", "Josh Stallings"));

        this.initializeBookToNomination();

        this.bookToNomination[this.books[0]].push(new Nomination(dagger, dagger.categories.properties.historical, 2016, false));
        this.bookToNomination[this.books[1]].push(new Nomination(barry, barry.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[2]].push(new Nomination(barry, barry.categories.properties.novel, 2016, true));
        this.bookToNomination[this.books[3]].push(new Nomination(dagger, dagger.categories.properties.gold, 2016, false));
        this.bookToNomination[this.books[4]].push(new Nomination(barry, barry.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[5]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[6]].push(new Nomination(dagger, dagger.categories.properties.gold, 2016, false));
        this.bookToNomination[this.books[7]].push(new Nomination(agatha, agatha.categories.properties.contemporary, 2015, false));
        this.bookToNomination[this.books[8]].push(new Nomination(shamus, shamus.categories.properties.hardcover, 2016, false));
        this.bookToNomination[this.books[9]].push(new Nomination(shamus, shamus.categories.properties.hardcover, 2016, true));
        this.bookToNomination[this.books[10]].push(new Nomination(barry, barry.categories.properties.thriller, 2016, false));
        this.bookToNomination[this.books[11]].push(new Nomination(anthony, anthony.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[11]].push(new Nomination(barry, barry.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[12]].push(new Nomination(edgar, edgar.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[13]].push(new Nomination(shamus, shamus.categories.properties.paperback, 2016, true));
        this.bookToNomination[this.books[14]].push(new Nomination(anthony, anthony.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[15]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[16]].push(new Nomination(shamus, shamus.categories.properties.hardcover, 2016, false));
        this.bookToNomination[this.books[17]].push(new Nomination(agatha, agatha.categories.properties.first, 2015, false));
        this.bookToNomination[this.books[18]].push(new Nomination(shamus, shamus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[19]].push(new Nomination(barry, barry.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[20]].push(new Nomination(dagger, dagger.categories.properties.gold, 2016, true));
        this.bookToNomination[this.books[20]].push(new Nomination(dagger, dagger.categories.properties.first, 2016, true));
        this.bookToNomination[this.books[21]].push(new Nomination(agatha, agatha.categories.properties.historical, 2015, true));
        this.bookToNomination[this.books[22]].push(new Nomination(dagger, dagger.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[23]].push(new Nomination(dagger, dagger.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[24]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2017, false));
        this.bookToNomination[this.books[25]].push(new Nomination(barry, barry.categories.properties.thriller, 2016, false));
        this.bookToNomination[this.books[26]].push(new Nomination(dagger, dagger.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[27]].push(new Nomination(shamus, shamus.categories.properties.hardcover, 2016, false));
        this.bookToNomination[this.books[28]].push(new Nomination(anthony, anthony.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[28]].push(new Nomination(edgar, edgar.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[29]].push(new Nomination(barry, barry.categories.properties.thriller, 2016, false));
        this.bookToNomination[this.books[30]].push(new Nomination(dagger, dagger.categories.properties.international, 2016, false));
        this.bookToNomination[this.books[31]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[32]].push(new Nomination(barry, barry.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[33]].push(new Nomination(agatha, agatha.categories.properties.first, 2015, false));
        this.bookToNomination[this.books[34]].push(new Nomination(edgar, edgar.categories.properties.novel, 2016, true));
        this.bookToNomination[this.books[35]].push(new Nomination(barry, barry.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[35]].push(new Nomination(edgar, edgar.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[36]].push(new Nomination(anthony, anthony.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[37]].push(new Nomination(agatha, agatha.categories.properties.contemporary, 2015, true));
        this.bookToNomination[this.books[38]].push(new Nomination(edgar, edgar.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[39]].push(new Nomination(agatha, agatha.categories.properties.first, 2015, false));
        this.bookToNomination[this.books[40]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[40]].push(new Nomination(dagger, dagger.categories.properties.steel, 2016, false));
        this.bookToNomination[this.books[41]].push(new Nomination(agatha, agatha.categories.properties.historical, 2015, false));
        this.bookToNomination[this.books[42]].push(new Nomination(agatha, agatha.categories.properties.historical, 2015, false));
        this.bookToNomination[this.books[43]].push(new Nomination(agatha, agatha.categories.properties.historical, 2015, false));
        this.bookToNomination[this.books[44]].push(new Nomination(anthony, anthony.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[45]].push(new Nomination(edgar, edgar.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[46]].push(new Nomination(anthony, anthony.categories.properties.mystery, 2016, false));
        this.bookToNomination[this.books[46]].push(new Nomination(shamus, shamus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[47]].push(new Nomination(barry, barry.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[48]].push(new Nomination(agatha, agatha.categories.properties.first, 2015, true));
        this.bookToNomination[this.books[48]].push(new Nomination(anthony, anthony.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[49]].push(new Nomination(anthony, anthony.categories.properties.first, 2016, true));
        this.bookToNomination[this.books[49]].push(new Nomination(barry, barry.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[49]].push(new Nomination(edgar, edgar.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[50]].push(new Nomination(agatha, agatha.categories.properties.first, 2015, false));
        this.bookToNomination[this.books[51]].push(new Nomination(barry, barry.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[52]].push(new Nomination(dagger, dagger.categories.properties.steel, 2016, false));
        this.bookToNomination[this.books[53]].push(new Nomination(dagger, dagger.categories.properties.gold, 2016, false));
        this.bookToNomination[this.books[53]].push(new Nomination(dagger, dagger.categories.properties.steel, 2016, false));
        this.bookToNomination[this.books[54]].push(new Nomination(shamus, shamus.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[55]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[56]].push(new Nomination(barry, barry.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[57]].push(new Nomination(dagger, dagger.categories.properties.international, 2016, false));
        this.bookToNomination[this.books[58]].push(new Nomination(barry, barry.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[59]].push(new Nomination(shamus, shamus.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[60]].push(new Nomination(dagger, dagger.categories.properties.historical, 2016, true));
        this.bookToNomination[this.books[61]].push(new Nomination(anthony, anthony.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[61]].push(new Nomination(barry, barry.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[62]].push(new Nomination(dagger, dagger.categories.properties.historical, 2016, false));
        this.bookToNomination[this.books[63]].push(new Nomination(barry, barry.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[63]].push(new Nomination(dagger, dagger.categories.properties.steel, 2016, true));
        this.bookToNomination[this.books[64]].push(new Nomination(agatha, agatha.categories.properties.contemporary, 2015, false));
        this.bookToNomination[this.books[64]].push(new Nomination(anthony, anthony.categories.properties.mystery, 2016, false));
        this.bookToNomination[this.books[65]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[66]].push(new Nomination(edgar, edgar.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[67]].push(new Nomination(shamus, shamus.categories.properties.first, 2016, true));
        this.bookToNomination[this.books[68]].push(new Nomination(dagger, dagger.categories.properties.steel, 2016, false));
        this.bookToNomination[this.books[69]].push(new Nomination(barry, barry.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[70]].push(new Nomination(dagger, dagger.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[71]].push(new Nomination(dagger, dagger.categories.properties.international, 2016, true));
        this.bookToNomination[this.books[72]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[73]].push(new Nomination(dagger, dagger.categories.properties.historical, 2016, false));
        this.bookToNomination[this.books[74]].push(new Nomination(dagger, dagger.categories.properties.historical, 2016, false));
        this.bookToNomination[this.books[75]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[76]].push(new Nomination(anthony, anthony.categories.properties.mystery, 2016, true));
        this.bookToNomination[this.books[76]].push(new Nomination(barry, barry.categories.properties.thriller, 2016, false));
        this.bookToNomination[this.books[77]].push(new Nomination(edgar, edgar.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[78]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2017, false));
        this.bookToNomination[this.books[79]].push(new Nomination(shamus, shamus.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[80]].push(new Nomination(anthony, anthony.categories.properties.paperback, 2016, true));
        this.bookToNomination[this.books[80]].push(new Nomination(barry, barry.categories.properties.paperback, 2016, true));
        this.bookToNomination[this.books[80]].push(new Nomination(edgar, edgar.categories.properties.paperback, 2016, true));
        this.bookToNomination[this.books[81]].push(new Nomination(shamus, shamus.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[82]].push(new Nomination(barry, barry.categories.properties.thriller, 2016, true));
        this.bookToNomination[this.books[83]].push(new Nomination(agatha, agatha.categories.properties.historical, 2015, false));
        this.bookToNomination[this.books[84]].push(new Nomination(dagger, dagger.categories.properties.international, 2016, false));
        this.bookToNomination[this.books[85]].push(new Nomination(agatha, agatha.categories.properties.contemporary, 2015, false));
        this.bookToNomination[this.books[85]].push(new Nomination(anthony, anthony.categories.properties.mystery, 2016, false));
        this.bookToNomination[this.books[86]].push(new Nomination(edgar, edgar.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[87]].push(new Nomination(dagger, dagger.categories.properties.historical, 2016, false));
        this.bookToNomination[this.books[88]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[88]].push(new Nomination(shamus, shamus.categories.properties.hardcover, 2016, false));
        this.bookToNomination[this.books[89]].push(new Nomination(shamus, shamus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[90]].push(new Nomination(barry, barry.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[91]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[92]].push(new Nomination(edgar, edgar.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[93]].push(new Nomination(edgar, edgar.categories.properties.first, 2016, true));
        this.bookToNomination[this.books[94]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[95]].push(new Nomination(dagger, dagger.categories.properties.international, 2016, false));
        this.bookToNomination[this.books[96]].push(new Nomination(barry, barry.categories.properties.first, 2016, true));
        this.bookToNomination[this.books[97]].push(new Nomination(shamus, shamus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[98]].push(new Nomination(edgar, edgar.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[99]].push(new Nomination(crimeAndBeyond, crimeAndBeyond.categories.properties.case, 2016, false));
        this.bookToNomination[this.books[100]].push(new Nomination(barry, barry.categories.properties.thriller, 2016, false));
        this.bookToNomination[this.books[101]].push(new Nomination(edgar, edgar.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[102]].push(new Nomination(agatha, agatha.categories.properties.contemporary, 2015, false));
        this.bookToNomination[this.books[102]].push(new Nomination(anthony, anthony.categories.properties.mystery, 2016, false));
        this.bookToNomination[this.books[103]].push(new Nomination(edgar, edgar.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[104]].push(new Nomination(edgar, edgar.categories.properties.paperback, 2016, false));
        this.bookToNomination[this.books[105]].push(new Nomination(anthony, anthony.categories.properties.paperback, 2016, false));

        this.initializeBookToAssessment();

        // FIXME
        // localStorage.removeItem("bookToAssessment");
        // FIXME

        this.loadBookToAssessment();
    }

    InitialState.prototype.initializeBookToAssessment = function()
    {
        this.books.forEach(function(book)
        {
            var nominations = this.bookToNomination[book];

            var clubNominations = nominations.filter(function(nomination)
            {
                return nomination.award().value === Award.CRIME_AND_BEYOND;
            });

            if (clubNominations.length > 0)
            {
                this.bookToAssessment[book] = Assessment.BOOK_CLUB_PICK;
            }
            else
            {
                this.bookToAssessment[book] = Assessment.NONE;
            }
        }, this);
    };

    InitialState.prototype.initializeBookToNomination = function()
    {
        this.books.forEach(function(book)
        {
            this.bookToNomination[book] = [];
        }, this);
    };

    InitialState.prototype.loadBookToAssessment = function()
    {
        if (localStorage.bookToAssessment)
        {
            var myBookToAssessment = JSON.parse(localStorage.bookToAssessment);

            if (myBookToAssessment)
            {
                Object.vizziniMerge(this.bookToAssessment, myBookToAssessment);
            }
        }
    };

    if (Object.freeze)
    {
        Object.freeze(InitialState);
    }

    return InitialState;
});
