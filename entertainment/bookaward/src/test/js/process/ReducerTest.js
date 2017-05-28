define(["Assessment", "Award", "Book", "InitialState", "Nomination", "process/Action", "process/Reducer"],
   function(Assessment, Award, Book, InitialState, Nomination, Action, Reducer)
   {
      "use strict";
      QUnit.module("Reducer");

      QUnit.test("addBook()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var length = 101;
         assert.equal(state.books.length, length);
         var book = createBook1();
         var action = Action.addBook(book);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.books.length, length + 1);
      });

      QUnit.test("addNomination()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var book = createBook1();
         state = Reducer.root(state, Action.addBook(book));
         var nomination = createNomination1();
         assert.ok(state.bookToNomination[book]);
         assert.ok(Array.isArray(state.bookToNomination[book]));
         assert.equal(state.bookToNomination[book].length, 0);
         var action = Action.addNomination(book, nomination);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.ok(result.bookToNomination[book]);
         assert.ok(Array.isArray(result.bookToNomination[book]));
         assert.equal(result.bookToNomination[book].length, 1);
         assert.equal(result.bookToNomination[book][0], nomination);
      });

      QUnit.test("setAssessment()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var book = createBook1();
         state = Reducer.root(state, Action.addBook(book));
         var assessment = Assessment.POSSIBLE_PICK;
         assert.equal(state.bookToAssessment[book], Assessment.NONE);
         var action = Action.setAssessment(book, assessment);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.bookToAssessment[book], assessment);
      });

      QUnit.test("setAssessments()", function(assert)
      {
         // Setup.
         var state = new InitialState();
         var book = createBook1();
         state = Reducer.root(state, Action.addBook(book));
         assert.equal(state.bookToAssessment[book], Assessment.NONE);

         var assessment = Assessment.POSSIBLE_PICK;
         var bookToAssessment = {};
         bookToAssessment[book] = assessment;
         var action = Action.setAssessments(bookToAssessment);

         // Run.
         var result = Reducer.root(state, action);

         // Verify.
         assert.ok(result);
         assert.equal(result.bookToAssessment[book], assessment);
      });

      function createBook1()
      {
         var title = "A Dark and Stormy Night";
         var author = "Noah Boddy";

         return new Book(title, author);
      }

      function createNomination1()
      {
         var awardKey = Award.AGATHA;
         var award = Award.properties[awardKey];
         var categoryKey = award.categories.CONTEMPORARY;
         var category = award.categories.properties[categoryKey];
         var year = 2016;

         return new Nomination(award, category, year);
      }
   });
