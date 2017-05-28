define(["Assessment", "Award", "Book", "Nomination", "UserSettings"],
   function(Assessment, Award, Book, Nomination, UserSettings)
   {
      "use strict";
      QUnit.module("UserSettings");

      QUnit.test("loadBookToAssessment()", function(assert)
      {
         // Setup.
         var books = createBooks();
         var bookToAssessment = createBookToAssessment();
         UserSettings.storeBookToAssessment(bookToAssessment);

         // Run.
         var result = UserSettings.loadBookToAssessment();

         // Verify.
         verifyBookToAssessment1(assert, result);

         // Cleanup.
         localStorage.removeItem("bookToAssessment");
      });

      QUnit.test("resetBookToAssessment()", function(assert)
      {
         // Setup.
         var bookToAssessment = {};
         var books = createBooks();
         var bookToDclUrl = createBookToDclUrl();
         var bookToNomination = createBookToNomination();

         // Run.
         var result = UserSettings.resetBookToAssessment(bookToAssessment, books, bookToDclUrl, bookToNomination);

         // Verify.
         verifyBookToAssessment0(assert, result);

         // Cleanup.
         localStorage.removeItem("bookToAssessment");
      });

      QUnit.test("storeBookToAssessment()", function(assert)
      {
         // Setup.
         var books = createBooks();
         var bookToAssessment = createBookToAssessment();

         // Run.
         UserSettings.storeBookToAssessment(bookToAssessment);
         var result = UserSettings.loadBookToAssessment();

         // Verify.
         verifyBookToAssessment1(assert, result);

         // Cleanup.
         localStorage.removeItem("bookToAssessment");
      });

      function createBook0()
      {
         var title = "The Wrong Side of Goodbye";
         var author = "Michael Connelly";

         return new Book(title, author);
      }

      function createBook1()
      {
         var title = "Make Me";
         var author = "Lee Child";

         return new Book(title, author);
      }

      function createBook2()
      {
         var title = "In a Dark, Dark Wood";
         var author = "Ruth Ware";

         return new Book(title, author);
      }

      function createBooks()
      {
         var answer = [];

         answer.push(createBook0());
         answer.push(createBook1());
         answer.push(createBook2());

         return answer;
      }

      function createBookToAssessment()
      {
         var answer = {};

         answer[createBook0()] = Assessment.NONE;
         answer[createBook1()] = Assessment.NOT_ENOUGH_COPIES;
         answer[createBook2()] = Assessment.NOT_AVAILABLE;

         return answer;
      }

      function createBookToDclUrl()
      {
         var answer = {};

         answer[createBook0()] = "https://dcl.bibliocommons.com/item/show/1337567114_the_wrong_side_of_goodbye";
         answer[createBook1()] = "https://dcl.bibliocommons.com/item/show/1264991114_make_me";
         // answer[createBook2()] = "";

         return answer;
      }

      function createBookToNomination()
      {
         var answer = {};

         var book0 = createBook1();
         answer[book0] = [];
         answer[book0].push(createNomination0());

         var book1 = createBook2();
         answer[book1] = [];
         answer[book1].push(createNomination1_1());
         answer[book1].push(createNomination1_2());

         var book2 = createBook2();
         answer[book2] = [];

         return answer;
      }

      function createNomination0()
      {
         var awardKey = Award.BARRY;
         var award = Award.properties[awardKey];
         var categoryKey = award.categories.NOVEL;
         var category = award.categories.properties[categoryKey];

         return new Nomination(award, category, 2017);
      }

      function createNomination1_1()
      {
         var awardKey = Award.CRIME_AND_BEYOND;
         var award = Award.properties[awardKey];
         var categoryKey = award.categories.CASE;
         var category = award.categories.properties[categoryKey];

         return new Nomination(award, category, 2016);
      }

      function createNomination1_2()
      {
         var awardKey = Award.DAGGER;
         var award = Award.properties[awardKey];
         var categoryKey = award.categories.STEEL;
         var category = award.categories.properties[categoryKey];

         return new Nomination(award, category, 2017);
      }

      function verifyBookToAssessment0(assert, bookToAssessment)
      {
         assert.ok(bookToAssessment);
         assert.equal(Object.keys(bookToAssessment).length, 3);
         assert.equal(bookToAssessment[createBook0()], Assessment.NONE);
         assert.equal(bookToAssessment[createBook1()], Assessment.NONE);
         assert.equal(bookToAssessment[createBook2()], Assessment.NOT_AVAILABLE);
      }

      function verifyBookToAssessment1(assert, bookToAssessment)
      {
         assert.ok(bookToAssessment);
         assert.equal(Object.keys(bookToAssessment).length, 3);
         assert.equal(bookToAssessment[createBook0()], Assessment.NONE);
         assert.equal(bookToAssessment[createBook1()], Assessment.NOT_ENOUGH_COPIES);
         assert.equal(bookToAssessment[createBook2()], Assessment.NOT_AVAILABLE);
      }
   });
