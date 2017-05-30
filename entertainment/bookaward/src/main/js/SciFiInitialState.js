define(["Assessment", "SciFiAward", "Book", "Nomination", "UserSettings"],
   function(Assessment, Award, Book, Nomination, UserSettings)
   {
      "use strict";

      function SciFiInitialState()
      {
         this.books = [];
         this.bookToDclUrl = {};
         this.bookToNomination = {};
         this.bookToAssessment = {};

         var britishFantasy = Award.properties.britishFantasy;
         var britishSf = Award.properties.britishSf;
         var hugo = Award.properties.hugo;
         var locus = Award.properties.locus;
         var nebula = Award.properties.nebula;

         this.books.push(new Book("The Aeronaut's Windlass", "Jim Butcher"));
         this.books.push(new Book("Ancillary Mercy", "Ann Leckie"));
         this.books.push(new Book("Aurora", "Kim Stanley Robinson"));
         this.books.push(new Book("Barsk: The Elephants' Graveyard", "Lawrence M. Schoen"));
         this.books.push(new Book("A Borrowed Man", "Gene Wolfe"));
         this.books.push(new Book("A Cold Silence", "Alison Littlewood"));
         this.books.push(new Book("The Death House", "Sarah Pinborough"));
         this.books.push(new Book("Europe at Midnight", "Dave Hutchinson"));
         this.books.push(new Book("The Fifth Season", "N. K. Jemisin"));
         this.books.push(new Book("Glorious Angels", "Justina Robson"));
         this.books.push(new Book("The Grace of Kings", "Ken Liu"));
         this.books.push(new Book("Guns of the Dawn", "Adrian Tchaikovsky"));
         this.books.push(new Book("Half a War", "Joe Abercrombie"));
         this.books.push(new Book("The House of Shattered Wings", "Aliette de Bodard"));
         this.books.push(new Book("The Iron Ghost", "Jen Williams"));
         this.books.push(new Book("Karen Memory", "Elizabeth Bear"));
         this.books.push(new Book("Lost Girl", "Adam Nevill"));
         this.books.push(new Book("Luna: New Moon", "Ian McDonald"));
         this.books.push(new Book("Mother of Eden", "Chris Beckett"));
         this.books.push(new Book("Raising Caine", "Charles E. Gannon"));
         this.books.push(new Book("Rawblood", "Catriona Ward"));
         this.books.push(new Book("Seveneves", "Neal Stephenson"));
         this.books.push(new Book("Signal to Noise", "Silvia Moreno-Garcia"));
         this.books.push(new Book("The Silence", "Tim Lebbon"));
         this.books.push(new Book("The Sorcerer of the Wildeeps", "Kai Ashante Wilson"));
         this.books.push(new Book("Sorcerer to the Crown", "Zen Cho"));
         this.books.push(new Book("Updraft", "Fran Wilde"));
         this.books.push(new Book("Uprooted", "Naomi Novik"));
         this.books.push(new Book("The Watchmaker of Filigree Street", "Natasha Pulley"));
         this.books.push(new Book("The Water Knife", "Paolo Bacigalupi"));
         this.books.push(new Book("Welcome to Night Vale", "Joseph Fink & Jeffrey Cranor"));
         this.books.push(new Book("Wylding Hall", "Elizabeth Hand"));

         this.bookToDclUrl[this.books[0]] = "https://dcl.bibliocommons.com/item/show/1283248114_the_aeronauts_windlass";
         this.bookToDclUrl[this.books[1]] = "https://dcl.bibliocommons.com/item/show/1285414114_ancillary_mercy";
         this.bookToDclUrl[this.books[2]] = "https://dcl.bibliocommons.com/item/show/1275871114_aurora";
         this.bookToDclUrl[this.books[4]] = "https://dcl.bibliocommons.com/item/show/1293191114_a_borrowed_man";
         this.bookToDclUrl[this.books[8]] = "https://dcl.bibliocommons.com/item/show/1281167114_the_fifth_season";
         this.bookToDclUrl[this.books[10]] = "https://dcl.bibliocommons.com/item/show/1263769114_the_grace_of_kings";
         this.bookToDclUrl[this.books[12]] = "https://dcl.bibliocommons.com/item/show/1281023114_half_a_war";
         this.bookToDclUrl[this.books[13]] = "https://dcl.bibliocommons.com/item/show/1283849114_the_house_of_shattered_wings";
         this.bookToDclUrl[this.books[15]] = "https://dcl.bibliocommons.com/item/show/1249360114_karen_memory";
         this.bookToDclUrl[this.books[18]] = "https://dcl.bibliocommons.com/item/show/1264846114_mother_of_eden";
         this.bookToDclUrl[this.books[19]] = "https://dcl.bibliocommons.com/item/show/1294767114_raising_caine";
         this.bookToDclUrl[this.books[20]] = "https://dcl.bibliocommons.com/item/show/1380027114_the_girl_from_rawblood";
         this.bookToDclUrl[this.books[21]] = "https://dcl.bibliocommons.com/item/show/1262334114_seveneves";
         this.bookToDclUrl[this.books[22]] = "https://dcl.bibliocommons.com/item/show/1275866114_signal_to_noise";
         this.bookToDclUrl[this.books[23]] = "https://dcl.bibliocommons.com/item/show/1269118114_the_silence";
         this.bookToDclUrl[this.books[24]] = "https://dcl.bibliocommons.com/item/show/1288127114_the_sorcerer_of_the_wildeeps";
         this.bookToDclUrl[this.books[25]] = "https://dcl.bibliocommons.com/item/show/1281512114_sorcerer_to_the_crown";
         this.bookToDclUrl[this.books[26]] = "https://dcl.bibliocommons.com/item/show/1277391114_updraft";
         this.bookToDclUrl[this.books[27]] = "https://dcl.bibliocommons.com/item/show/1262337114_uprooted";
         this.bookToDclUrl[this.books[28]] = "https://dcl.bibliocommons.com/item/show/1262914114_the_watchmaker_of_filigree_street";
         this.bookToDclUrl[this.books[29]] = "https://dcl.bibliocommons.com/item/show/1256448114_the_water_knife";
         this.bookToDclUrl[this.books[30]] = "https://dcl.bibliocommons.com/item/show/1273614114_welcome_to_night_vale";

         this.initializeBookToNomination();

         this.bookToNomination[this.books[0]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[1]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[1]].push(new Nomination(locus, locus.categories.properties.sf, 2016, true));
         this.bookToNomination[this.books[1]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[2]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
         this.bookToNomination[this.books[3]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[4]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
         this.bookToNomination[this.books[5]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
         this.bookToNomination[this.books[6]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
         this.bookToNomination[this.books[7]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[8]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, true));
         this.bookToNomination[this.books[8]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[8]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[9]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[10]].push(new Nomination(locus, locus.categories.properties.first, 2016, true));
         this.bookToNomination[this.books[10]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[11]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[12]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[13]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, true));
         this.bookToNomination[this.books[13]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[14]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[15]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[16]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
         this.bookToNomination[this.books[17]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[18]].push(new Nomination(britishSf, britishSf.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[19]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[20]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, true));
         this.bookToNomination[this.books[21]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[21]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
         this.bookToNomination[this.books[22]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[22]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
         this.bookToNomination[this.books[23]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
         this.bookToNomination[this.books[24]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
         this.bookToNomination[this.books[25]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, false));
         this.bookToNomination[this.books[25]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
         this.bookToNomination[this.books[26]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[27]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.fantasy, 2016, true));
         this.bookToNomination[this.books[27]].push(new Nomination(hugo, hugo.categories.properties.novel, 2016, false));
         this.bookToNomination[this.books[27]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, true));
         this.bookToNomination[this.books[27]].push(new Nomination(nebula, nebula.categories.properties.novel, 2016, true));
         this.bookToNomination[this.books[28]].push(new Nomination(locus, locus.categories.properties.first, 2016, false));
         this.bookToNomination[this.books[29]].push(new Nomination(locus, locus.categories.properties.sf, 2016, false));
         this.bookToNomination[this.books[30]].push(new Nomination(britishFantasy, britishFantasy.categories.properties.horror, 2016, false));
         this.bookToNomination[this.books[31]].push(new Nomination(locus, locus.categories.properties.fantasy, 2016, false));

         this.initializeBookToAssessment();
         this.loadBookToAssessment();
      }

      SciFiInitialState.prototype.initializeBookToAssessment = function()
      {
         this.bookToAssessment = UserSettings.resetBookToAssessment(this.bookToAssessment, this.books, this.bookToDclUrl, this.bookToNomination);
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
         var myBookToAssessment = UserSettings.loadBookToAssessment();
         Object.vizziniMerge(this.bookToAssessment, myBookToAssessment);
      };

      if (Object.freeze)
      {
         Object.freeze(SciFiInitialState);
      }

      return SciFiInitialState;
   });
