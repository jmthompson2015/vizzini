define(["Operator"],
    function(Operator)
    {
        "use strict";
        var WillShortzKenKen = {
            EASY_2010_01_01: "easy20100101",
            EASY_2010_01_02: "easy20100102",

            properties:
            {
                "easy20100101":
                {
                    // Will Shortz Ken Ken, 2010.01.01, Easy
                    name: "Easy 2010.01.01",
                    N: 3,
                    blocks: [
                        {
                            answer: 1,
                            operatorKey: Operator.SUBTRACT,
                            indices: [0, 1],
                        },
                        {
                            answer: 2,
                            operatorKey: Operator.SUBTRACT,
                            indices: [2, 5],
                        },
                        {
                            answer: 6,
                            operatorKey: Operator.ADD,
                            indices: [3, 4, 6],
                        },
                        {
                            answer: 3,
                            operatorKey: Operator.ADD,
                            indices: [7, 8],
                        },
                    ],
                    value: "easy20100101",
                },
                "easy20100102":
                {
                    // Will Shortz Ken Ken, 2010.01.02, Easy
                    name: "Easy 2010.01.02",
                    N: 4,
                    blocks: [
                        {
                            answer: 2,
                            operatorKey: Operator.SUBTRACT,
                            indices: [0, 1],
                        },
                        {
                            answer: 3,
                            operatorKey: Operator.SUBTRACT,
                            indices: [2, 6],
                        },
                        {
                            answer: 4,
                            operatorKey: Operator.ADD,
                            indices: [3, 7],
                        },
                        {
                            answer: 3,
                            operatorKey: Operator.ADD,
                            indices: [4, 8],
                        },
                        {
                            answer: 3,
                            indices: [5],
                        },
                        {
                            answer: 3,
                            operatorKey: Operator.SUBTRACT,
                            indices: [9, 13],
                        },
                        {
                            answer: 5,
                            operatorKey: Operator.ADD,
                            indices: [10, 14],
                        },
                        {
                            answer: 6,
                            operatorKey: Operator.ADD,
                            indices: [11, 15],
                        },
                        {
                            answer: 3,
                            indices: [12],
                        },
                    ],
                    value: "easy20100102",
                },
            },

            values: function()
            {
                return Object.getOwnPropertyNames(WillShortzKenKen.properties);
            },
        };

        WillShortzKenKen.values().forEach(function(puzzleKey)
        {
            var puzzle = WillShortzKenKen.properties[puzzleKey];
            puzzle.operator = Operator.properties[puzzle.operatorKey];
        });

        if (Object.freeze)
        {
            Object.freeze(WillShortzKenKen);
        }

        return WillShortzKenKen;
    });
