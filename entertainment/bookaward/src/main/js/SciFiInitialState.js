define(["Assessment", "SciFiAward", "Book", "Nomination"], function(Assessment, SciFiAward, Book, Nomination)
{
    "use strict";

    function SciFiInitialState()
    {
        this.books = [];
        this.bookToNomination = {};
        this.bookToAssessment = {};

        var britishFantasy = SciFiAward.properties.britishFantasy;
        var britishSf = SciFiAward.properties.britishSf;
        var hugo = SciFiAward.properties.hugo;
        var locus = SciFiAward.properties.locus;
        var nebula = SciFiAward.properties.nebula;

        this.books.push(new Book("A Borrowed Man", "Gene Wolfe"));
        this.books.push(new Book("A Cold Silence", "Alison Littlewood"));
        this.books.push(new Book("Ancillary Mercy", "Ann Leckie"));
        this.books.push(new Book("Aurora", "Kim Stanley Robinson"));
        this.books.push(new Book("Barsk: The Elephants' Graveyard", "Lawrence M. Schoen"));
        this.books.push(new Book("Europe at Midnight", "Dave Hutchinson"));
        this.books.push(new Book("Glorious Angels", "Justina Robson"));
        this.books.push(new Book("Guns of the Dawn", "Adrian Tchaikovsky"));
        this.books.push(new Book("Half a War", "Joe Abercrombie"));
        this.books.push(new Book("Karen Memory", "Elizabeth Bear"));
        this.books.push(new Book("Lost Girl", "Adam Nevill"));
        this.books.push(new Book("Luna: New Moon", "Ian McDonald"));
        this.books.push(new Book("Mother of Eden", "Chris Beckett"));
        this.books.push(new Book("Raising Caine", "Charles E. Gannon"));
        this.books.push(new Book("Rawblood", "Catriona Ward"));
        this.books.push(new Book("Seveneves", "Neal Stephenson"));
        this.books.push(new Book("Signal to Noise", "Silvia Moreno-Garcia"));
        this.books.push(new Book("Sorcerer to the Crown", "Zen Cho"));
        this.books.push(new Book("The Aeronaut's Windlass", "Jim Butcher"));
        this.books.push(new Book("The Death House", "Sarah Pinborough"));
        this.books.push(new Book("The Fifth Season", "N. K. Jemisin"));
        this.books.push(new Book("The Grace of Kings", "Ken Liu"));
        this.books.push(new Book("The House of Shattered Wings", "Aliette de Bodard"));
        this.books.push(new Book("The Iron Ghost", "Jen Williams"));
        this.books.push(new Book("The Silence", "Tim Lebbon"));
        this.books.push(new Book("The Sorcerer of the Wildeeps", "Kai Ashante Wilson"));
        this.books.push(new Book("The Watchmaker of Filigree Street", "Natasha Pulley"));
        this.books.push(new Book("The Water Knife", "Paolo Bacigalupi"));
        this.books.push(new Book("Updraft", "Fran Wilde"));
        this.books.push(new Book("Uprooted", "Naomi Novik"));
        this.books.push(new Book("Welcome to Night Vale", "Joseph Fink & Jeffrey Cranor"));
        this.books.push(new Book("Wylding Hall", "Elizabeth Hand"));

        this.initializeBookToNomination();

        this.bookToNomination[this.books[0]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
        this.bookToNomination[this.books[1]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
        this.bookToNomination[this.books[2]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[2]].push(new Nomination(locus, locus.categories.properties.sf, 2016, true));
        this.bookToNomination[this.books[2]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[3]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
        this.bookToNomination[this.books[4]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[5]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[6]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[7]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[8]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[9]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[10]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
        this.bookToNomination[this.books[11]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[12]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[13]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[14]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, true));
        this.bookToNomination[this.books[15]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[15]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
        this.bookToNomination[this.books[16]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[16]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[17]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[17]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[18]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[19]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
        this.bookToNomination[this.books[20]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, true));
        this.bookToNomination[this.books[20]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[20]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[21]].push(new Nomination(locus, locus.categories.properties.first, 2016, true));
        this.bookToNomination[this.books[21]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[22]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, true));
        this.bookToNomination[this.books[22]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[23]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
        this.bookToNomination[this.books[24]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
        this.bookToNomination[this.books[25]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[26]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
        this.bookToNomination[this.books[27]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
        this.bookToNomination[this.books[28]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[29]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, true));
        this.bookToNomination[this.books[29]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
        this.bookToNomination[this.books[29]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, true));
        this.bookToNomination[this.books[29]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, true));
        this.bookToNomination[this.books[30]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
        this.bookToNomination[this.books[31]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));

        this.initializeBookToAssessment();
        this.loadBookToAssessment();
    }

    SciFiInitialState.prototype.initializeBookToAssessment = function()
    {
        this.books.forEach(function(book)
        {
            this.bookToAssessment[book] = Assessment.NONE;
        }, this);
    };

    SciFiInitialState.prototype.initializeBookToNomination = function()
    {
        this.books.forEach(function(book)
        {
            this.bookToNomination[book] = [];
        }, this);
    };

    SciFiInitialState.prototype.loadBookToAssessment = function()
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
        Object.freeze(SciFiInitialState);
    }

    return SciFiInitialState;
});
