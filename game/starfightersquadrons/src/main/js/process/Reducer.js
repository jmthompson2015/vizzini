define(["Count", "DamageCard", "Event", "InitialState", "Phase", "Pilot", "UpgradeCard", "Value", "process/Action", "process/Selector"],
    function(Count, DamageCard, Event, InitialState, Phase, Pilot, UpgradeCard, Value, Action, Selector)
    {
        "use strict";
        var Reducer = {};

        Reducer.counts = function(state, action)
        {
            LOGGER.debug("counts() type = " + action.type);

            var newCounts;

            switch (action.type)
            {
                case Action.ADD_COUNT:
                    var oldValue = (state[action.property] ? state[action.property] : 0);
                    newCounts = Object.assign(
                    {}, state);
                    newCounts[action.property] = Math.max(oldValue + action.value, 0);
                    return newCounts;
                case Action.SET_COUNT:
                    newCounts = Object.assign(
                    {}, state);
                    newCounts[action.property] = action.value;
                    return newCounts;
                default:
                    LOGGER.warn("Reducer.counts: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.damages = function(state, action)
        {
            LOGGER.debug("damages() type = " + action.type);

            var newDamages;

            switch (action.type)
            {
                case Action.ADD_TOKEN_CRITICAL_DAMAGE:
                case Action.ADD_TOKEN_DAMAGE:
                    newDamages = (state ? state.slice() : []);
                    newDamages.push(action.damageKey);
                    return newDamages;
                case Action.REMOVE_TOKEN_CRITICAL_DAMAGE:
                case Action.REMOVE_TOKEN_DAMAGE:
                    newDamages = (state ? state.slice() : []);
                    newDamages.vizziniRemove(action.damageKey);
                    return newDamages;
                default:
                    LOGGER.warn("Reducer.damages: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.damageDeck = function(state, action)
        {
            LOGGER.debug("positionToToken() type = " + action.type);

            var newDamageDeck;

            switch (action.type)
            {
                case Action.DRAW_DAMAGE:
                    newDamageDeck = state.slice();
                    newDamageDeck.vizziniRemove(action.damage);
                    return newDamageDeck;
                case Action.SET_DAMAGE_DECK:
                    newDamageDeck = action.damageDeck.slice();
                    return newDamageDeck;
                default:
                    LOGGER.warn("Reducer.damageDeck: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.damageDiscardPile = function(state, action)
        {
            LOGGER.debug("positionToToken() type = " + action.type);

            var newDamageDiscardPile;

            switch (action.type)
            {
                case Action.DISCARD_DAMAGE:
                    newDamageDiscardPile = state.slice();
                    newDamageDiscardPile.push(action.damage);
                    return newDamageDiscardPile;
                default:
                    LOGGER.warn("Reducer.damageDiscardPile: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.pilotPerRound = function(state, action)
        {
            LOGGER.debug("pilotPerRound() type = " + action.type);

            var newPilotPerRound;

            switch (action.type)
            {
                case Action.ADD_TOKEN_PILOT_PER_ROUND:
                    var oldValue = (state[action.property] ? state[action.property] : 0);
                    newPilotPerRound = Object.assign(
                    {}, state);
                    newPilotPerRound[action.upgradeKey] = Math.max(oldValue + action.value, 0);
                    return newPilotPerRound;
                case Action.SET_TOKEN_PILOT_PER_ROUND:
                    newPilotPerRound = Object.assign(
                    {}, state);
                    newPilotPerRound[action.upgradeKey] = action.value;
                    return newPilotPerRound;
                default:
                    LOGGER.warn("Reducer.pilotPerRound: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.positionToTokenId = function(state, action)
        {
            LOGGER.debug("positionToTokenId() type = " + action.type);

            var newPositionToTokenId;

            switch (action.type)
            {
                case Action.MOVE_TOKEN:
                    newPositionToTokenId = Object.assign(
                    {}, state);
                    delete newPositionToTokenId[action.fromPosition];
                    newPositionToTokenId[action.toPosition] = action.token.id();
                    return newPositionToTokenId;
                case Action.PLACE_TOKEN:
                    newPositionToTokenId = Object.assign(
                    {}, state);
                    newPositionToTokenId[action.position] = action.token.id();
                    return newPositionToTokenId;
                case Action.REMOVE_TOKEN_AT:
                    newPositionToTokenId = Object.assign(
                    {}, state);
                    delete newPositionToTokenId[action.position];
                    return newPositionToTokenId;
                default:
                    LOGGER.warn("Reducer.positionToTokenId: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.targetLocks = function(state, action)
        {
            LOGGER.debug("targetLocks() type = " + action.type);

            var newTargetLocks;

            switch (action.type)
            {
                case Action.ADD_TARGET_LOCK:
                    newTargetLocks = state.slice();
                    newTargetLocks.push(action.targetLock);
                    return newTargetLocks;
                case Action.REMOVE_TARGET_LOCK:
                    newTargetLocks = state.slice();
                    newTargetLocks.vizziniRemove(action.targetLock);
                    return newTargetLocks;
                default:
                    LOGGER.warn("Reducer.targetLocks: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToActivationState = function(state, action)
        {
            return Reducer.tokenIdToData(state, Action.SET_TOKEN_ACTIVATION_STATE, action.type, action.token.id(), action.activationState);
        };

        Reducer.tokenIdToCombatState = function(state, action)
        {
            return Reducer.tokenIdToData(state, Action.SET_TOKEN_COMBAT_STATE, action.type, action.token.id(), action.combatState);
        };

        Reducer.tokenIdToCounts = function(state, action)
        {
            LOGGER.debug("tokenIdToCounts() type = " + action.type);

            var newTokenIdToCounts;

            switch (action.type)
            {
                case Action.ADD_COUNT:
                case Action.SET_COUNT:
                    var oldTokenIdToCounts = (state[action.token.id()] ? state[action.token.id()] :
                    {});
                    newTokenIdToCounts = Object.assign(
                    {}, state);
                    newTokenIdToCounts[action.token.id()] = Reducer.counts(oldTokenIdToCounts, action);
                    return newTokenIdToCounts;
                default:
                    LOGGER.warn("Reducer.tokenIdToCounts: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToCriticalDamages = function(state, action)
        {
            LOGGER.debug("tokenIdToCriticalDamages() type = " + action.type);

            var newTokenIdToCriticalDamages;

            switch (action.type)
            {
                case Action.ADD_TOKEN_CRITICAL_DAMAGE:
                case Action.REMOVE_TOKEN_CRITICAL_DAMAGE:
                    newTokenIdToCriticalDamages = Object.assign(
                    {}, state);
                    newTokenIdToCriticalDamages[action.token.id()] = Reducer.damages(state[action.token.id()], action);
                    return newTokenIdToCriticalDamages;
                default:
                    LOGGER.warn("Reducer.tokenIdToCriticalDamages: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToDamages = function(state, action)
        {
            LOGGER.debug("tokenIdToDamages() type = " + action.type);

            var newTokenIdToDamages;

            switch (action.type)
            {
                case Action.ADD_TOKEN_DAMAGE:
                case Action.REMOVE_TOKEN_DAMAGE:
                    newTokenIdToDamages = Object.assign(
                    {}, state);
                    newTokenIdToDamages[action.token.id()] = Reducer.damages(state[action.token.id()], action);
                    return newTokenIdToDamages;
                default:
                    LOGGER.warn("Reducer.tokenIdToDamages: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToData = function(state, type, actionType, actionTokenId, actionData)
        {
            LOGGER.debug("tokenIdToData() type = " + actionType);

            switch (actionType)
            {
                case type:
                    var newTokenIdToData = Object.assign(
                    {}, state);
                    newTokenIdToData[actionTokenId] = actionData;
                    return newTokenIdToData;
                default:
                    LOGGER.warn("Reducer.tokenIdToData: Unhandled action type: " + actionType);
                    return state;
            }
        };

        Reducer.tokenIdToManeuver = function(state, action)
        {
            return Reducer.tokenIdToData(state, Action.SET_TOKEN_MANEUVER, action.type, action.token.id(), action.maneuver);
        };

        Reducer.tokenIdToPilotPerRound = function(state, action)
        {
            LOGGER.debug("tokenIdToPilotPerRound() type = " + action.type);

            var newTokenIdToPilotPerRound;

            switch (action.type)
            {
                case Action.ADD_TOKEN_PILOT_PER_ROUND:
                case Action.SET_TOKEN_PILOT_PER_ROUND:
                    var oldTokenIdToPilotPerRound = (state[action.token.id()] ? state[action.token.id()] :
                    {});
                    newTokenIdToPilotPerRound = Object.assign(
                    {}, state);
                    newTokenIdToPilotPerRound[action.token.id()] = Reducer.pilotPerRound(oldTokenIdToPilotPerRound, action);
                    return newTokenIdToPilotPerRound;
                default:
                    LOGGER.warn("Reducer.tokenIdToPilotPerRound: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToPosition = function(state, action)
        {
            LOGGER.debug("tokenIdToPosition() type = " + action.type);

            var newTokenIdToPosition;

            switch (action.type)
            {
                case Action.MOVE_TOKEN:
                    newTokenIdToPosition = Object.assign(
                    {}, state);
                    newTokenIdToPosition[action.token.id()] = action.toPosition;
                    return newTokenIdToPosition;
                case Action.PLACE_TOKEN:
                    newTokenIdToPosition = Object.assign(
                    {}, state);
                    newTokenIdToPosition[action.token.id()] = action.position;
                    return newTokenIdToPosition;
                case Action.REMOVE_TOKEN:
                    newTokenIdToPosition = Object.assign(
                    {}, state);
                    delete newTokenIdToPosition[action.token.id()];
                    return newTokenIdToPosition;
                default:
                    LOGGER.warn("Reducer.tokenIdToPosition: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToUpgradeEnergy = function(state, action)
        {
            LOGGER.debug("tokenIdToUpgradeEnergy() type = " + action.type);

            var newTokenIdToUpgradeEnergy;

            switch (action.type)
            {
                case Action.ADD_TOKEN_UPGRADE_ENERGY:
                case Action.SET_TOKEN_UPGRADE_ENERGY:
                    var oldTokenIdToUpgradeEnergy = (state[action.token.id()] ? state[action.token.id()] :
                    {});
                    newTokenIdToUpgradeEnergy = Object.assign(
                    {}, state);
                    newTokenIdToUpgradeEnergy[action.token.id()] = Reducer.upgradeEnergy(oldTokenIdToUpgradeEnergy, action);
                    return newTokenIdToUpgradeEnergy;
                default:
                    LOGGER.warn("Reducer.tokenIdToUpgradeEnergy: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToUpgradePerRound = function(state, action)
        {
            LOGGER.debug("tokenIdToUpgradePerRound() type = " + action.type);

            var newTokenIdToUpgradePerRound;

            switch (action.type)
            {
                case Action.ADD_TOKEN_UPGRADE_PER_ROUND:
                case Action.SET_TOKEN_UPGRADE_PER_ROUND:
                    var oldTokenIdToUpgradePerRound = (state[action.token.id()] ? state[action.token.id()] :
                    {});
                    newTokenIdToUpgradePerRound = Object.assign(
                    {}, state);
                    newTokenIdToUpgradePerRound[action.token.id()] = Reducer.upgradePerRound(oldTokenIdToUpgradePerRound, action);
                    return newTokenIdToUpgradePerRound;
                default:
                    LOGGER.warn("Reducer.tokenIdToUpgradePerRound: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToUpgrades = function(state, action)
        {
            LOGGER.debug("tokenIdToUpgrades() type = " + action.type);

            var newTokenIdToUpgrades;

            switch (action.type)
            {
                case Action.ADD_TOKEN_UPGRADE:
                case Action.REMOVE_TOKEN_UPGRADE:
                    newTokenIdToUpgrades = Object.assign(
                    {}, state);
                    newTokenIdToUpgrades[action.token.id()] = Reducer.upgrades(state[action.token.id()], action);
                    return newTokenIdToUpgrades;
                default:
                    LOGGER.warn("Reducer.tokenIdToUpgrades: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokenIdToValues = function(state, action)
        {
            LOGGER.debug("tokenIdToValues() type = " + action.type);

            var newTokenIdToValues;

            switch (action.type)
            {
                case Action.SET_VALUE:
                    var oldTokenIdToValues = (state[action.token.id()] ? state[action.token.id()] :
                    {});
                    newTokenIdToValues = Object.assign(
                    {}, state);
                    newTokenIdToValues[action.token.id()] = Reducer.values(oldTokenIdToValues, action);
                    return newTokenIdToValues;
                default:
                    LOGGER.warn("Reducer.tokenIdToValues: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.tokens = function(state, action)
        {
            LOGGER.debug("tokens() type = " + action.type);

            var newTokens;

            switch (action.type)
            {
                case Action.PLACE_TOKEN:
                    newTokens = Object.assign(
                    {}, state);
                    newTokens[action.token.id()] = action.token;
                    return newTokens;
                case Action.REMOVE_TOKEN:
                    newTokens = Object.assign(
                    {}, state);
                    delete newTokens[action.token.id()];
                    return newTokens;
                default:
                    LOGGER.warn("Reducer.tokens: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.upgradeEnergy = function(state, action)
        {
            LOGGER.debug("upgradeEnergy() type = " + action.type);

            var newUpgradeEnergy;

            switch (action.type)
            {
                case Action.ADD_TOKEN_UPGRADE_ENERGY:
                    var oldValue = (state[action.property] ? state[action.property] : 0);
                    newUpgradeEnergy = Object.assign(
                    {}, state);
                    newUpgradeEnergy[action.upgradeKey] = Math.max(oldValue + action.value, 0);
                    return newUpgradeEnergy;
                case Action.SET_TOKEN_UPGRADE_ENERGY:
                    newUpgradeEnergy = Object.assign(
                    {}, state);
                    newUpgradeEnergy[action.upgradeKey] = action.value;
                    return newUpgradeEnergy;
                default:
                    LOGGER.warn("Reducer.upgradeEnergy: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.upgradePerRound = function(state, action)
        {
            LOGGER.debug("upgradePerRound() type = " + action.type);

            var newUpgradePerRound;

            switch (action.type)
            {
                case Action.ADD_TOKEN_UPGRADE_PER_ROUND:
                    var oldValue = (state[action.property] ? state[action.property] : 0);
                    newUpgradePerRound = Object.assign(
                    {}, state);
                    newUpgradePerRound[action.upgradeKey] = Math.max(oldValue + action.value, 0);
                    return newUpgradePerRound;
                case Action.SET_TOKEN_UPGRADE_PER_ROUND:
                    newUpgradePerRound = Object.assign(
                    {}, state);
                    newUpgradePerRound[action.upgradeKey] = action.value;
                    return newUpgradePerRound;
                default:
                    LOGGER.warn("Reducer.upgradePerRound: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.upgrades = function(state, action)
        {
            LOGGER.debug("upgrades() type = " + action.type);

            var newUpgrades;

            switch (action.type)
            {
                case Action.ADD_TOKEN_UPGRADE:
                    newUpgrades = (state ? state.slice() : []);
                    newUpgrades.push(action.upgradeKey);
                    return newUpgrades;
                case Action.REMOVE_TOKEN_UPGRADE:
                    newUpgrades = (state ? state.slice() : []);
                    newUpgrades.vizziniRemove(action.upgradeKey);
                    return newUpgrades;
                default:
                    LOGGER.warn("Reducer.upgrades: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.values = function(state, action)
        {
            LOGGER.debug("values() type = " + action.type);

            var newValues;

            switch (action.type)
            {
                case Action.SET_VALUE:
                    newValues = Object.assign(
                    {}, state);
                    newValues[action.property] = action.value;
                    return newValues;
                default:
                    LOGGER.warn("Reducer.values: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer.root = function(state, action)
        {
            LOGGER.debug("root() type = " + action.type);

            if (typeof state === 'undefined')
            {
                return new InitialState();
            }

            var newPositionToTokenId, newTokenIdToActivationState, newTokenIdToCombatState, newTokenIdToManeuver, newTokenIdToPosition, newTokenIdToValues, newTokens, action2, tokenId;

            switch (action.type)
            {
                case Action.ADD_COUNT:
                case Action.SET_COUNT:
                    var newTokenIdToCounts = Reducer.tokenIdToCounts(state.tokenIdToCounts, action);
                    newTokenIdToValues = Object.assign(
                    {}, state.tokenIdToValues);
                    newTokenIdToValues = Reducer._recomputeValues(state, newTokenIdToCounts, newTokenIdToValues, action.token);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToCounts: newTokenIdToCounts,
                        tokenIdToValues: newTokenIdToValues,
                    });
                case Action.ADD_ROUND:
                    LOGGER.info("Round: " + (state.round + action.value));
                    return Object.assign(
                    {}, state,
                    {
                        round: state.round + action.value,
                    });
                case Action.ADD_TARGET_LOCK:
                case Action.REMOVE_TARGET_LOCK:
                    return Object.assign(
                    {}, state,
                    {
                        targetLocks: Reducer.targetLocks(state.targetLocks, action),
                    });
                case Action.ADD_TOKEN_CRITICAL_DAMAGE:
                case Action.REMOVE_TOKEN_CRITICAL_DAMAGE:
                    var newTokenIdToCriticalDamages = Reducer.tokenIdToCriticalDamages(state.tokenIdToCriticalDamages, action);
                    newTokenIdToValues = Object.assign(
                    {}, state.tokenIdToValues);
                    var damage = DamageCard.properties[action.damageKey];
                    newTokenIdToValues = Reducer._recomputeValues(state, state.tokenIdToCounts, newTokenIdToValues, action.token, damage);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToCriticalDamages: newTokenIdToCriticalDamages,
                        tokenIdToValues: newTokenIdToValues,
                    });
                case Action.ADD_TOKEN_DAMAGE:
                case Action.REMOVE_TOKEN_DAMAGE:
                    var newTokenIdToDamages = Reducer.tokenIdToDamages(state.tokenIdToDamages, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToDamages: newTokenIdToDamages,
                    });
                case Action.ADD_TOKEN_PILOT_PER_ROUND:
                case Action.SET_TOKEN_PILOT_PER_ROUND:
                    var newTokenIdToPilotPerRound = Reducer.tokenIdToPilotPerRound(state.tokenIdToPilotPerRound, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToPilotPerRound: newTokenIdToPilotPerRound,
                    });
                case Action.ADD_TOKEN_UPGRADE:
                case Action.REMOVE_TOKEN_UPGRADE:
                    var newTokenIdToUpgrades = Reducer.tokenIdToUpgrades(state.tokenIdToUpgrades, action);
                    newTokenIdToValues = Object.assign(
                    {}, state.tokenIdToValues);
                    var upgrade = UpgradeCard.properties[action.upgradeKey];
                    newTokenIdToValues = Reducer._recomputeValues(state, state.tokenIdToCounts, newTokenIdToValues, action.token, undefined, upgrade);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToUpgrades: newTokenIdToUpgrades,
                        tokenIdToValues: newTokenIdToValues,
                    });
                case Action.ADD_TOKEN_UPGRADE_ENERGY:
                case Action.SET_TOKEN_UPGRADE_ENERGY:
                    var newTokenIdToUpgradeEnergy = Reducer.tokenIdToUpgradeEnergy(state.tokenIdToUpgradeEnergy, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToUpgradeEnergy: newTokenIdToUpgradeEnergy,
                    });
                case Action.ADD_TOKEN_UPGRADE_PER_ROUND:
                case Action.SET_TOKEN_UPGRADE_PER_ROUND:
                    var newTokenIdToUpgradePerRound = Reducer.tokenIdToUpgradePerRound(state.tokenIdToUpgradePerRound, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToUpgradePerRound: newTokenIdToUpgradePerRound,
                    });
                case Action.CLEAR_EVENT:
                    LOGGER.info("Event: (cleared)");
                    return Object.assign(
                    {}, state,
                    {
                        eventKey: undefined,
                        eventToken: undefined,
                        eventCallback: undefined,
                    });
                case Action.DISCARD_DAMAGE:
                    return Object.assign(
                    {}, state,
                    {
                        damageDiscardPile: Reducer.damageDiscardPile(state.damageDiscardPile, action),
                    });
                case Action.DRAW_DAMAGE:
                case Action.SET_DAMAGE_DECK:
                    return Object.assign(
                    {}, state,
                    {
                        damageDeck: Reducer.damageDeck(state.damageDeck, action),
                    });
                case Action.INCREMENT_NEXT_TARGET_LOCK_ID:
                    var newNextTargetLockId = state.nextTargetLockId + 1;
                    if (newNextTargetLockId > 51)
                    {
                        newNextTargetLockId = 0;
                    }
                    return Object.assign(
                    {}, state,
                    {
                        nextTargetLockId: newNextTargetLockId,
                    });
                case Action.INCREMENT_NEXT_TOKEN_ID:
                    return Object.assign(
                    {}, state,
                    {
                        nextTokenId: state.nextTokenId + 1,
                    });
                case Action.MOVE_TOKEN:
                    tokenId = state.positionToTokenId[action.fromPosition];
                    action.token = state.tokens[tokenId];
                    newPositionToTokenId = Reducer.positionToTokenId(state.positionToTokenId, action);
                    newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action);
                    return Object.assign(
                    {}, state,
                    {
                        positionToTokenId: newPositionToTokenId,
                        tokenIdToPosition: newTokenIdToPosition,
                    });
                case Action.PLACE_TOKEN:
                    newPositionToTokenId = Reducer.positionToTokenId(state.positionToTokenId, action);
                    newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action);
                    newTokens = Reducer.tokens(state.tokens, action);
                    return Object.assign(
                    {}, state,
                    {
                        positionToTokenId: newPositionToTokenId,
                        tokenIdToPosition: newTokenIdToPosition,
                        tokens: newTokens,
                    });
                case Action.REMOVE_TOKEN:
                    var position = state.tokenIdToPosition[action.token.id()];
                    action2 = Action.removeTokenAt(position);
                    newPositionToTokenId = Reducer.positionToTokenId(state.positionToTokenId, action2);
                    newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action);
                    newTokens = Reducer.tokens(state.tokens, action);
                    return Object.assign(
                    {}, state,
                    {
                        positionToTokenId: newPositionToTokenId,
                        tokenIdToPosition: newTokenIdToPosition,
                        tokens: newTokens,
                    });
                case Action.REMOVE_TOKEN_AT:
                    tokenId = state.positionToTokenId[action.position];
                    var token = state.tokens[tokenId];
                    action2 = Action.removeToken(token);
                    newPositionToTokenId = Reducer.positionToTokenId(state.positionToTokenId, action);
                    newTokenIdToPosition = Reducer.tokenIdToPosition(state.tokenIdToPosition, action2);
                    newTokens = Reducer.tokens(state.tokens, action2);
                    return Object.assign(
                    {}, state,
                    {
                        positionToTokenId: newPositionToTokenId,
                        tokenIdToPosition: newTokenIdToPosition,
                        tokens: newTokens,
                    });
                case Action.REPLENISH_DAMAGE_DECK:
                    var newDamageDeck = state.damageDiscardPile.slice();
                    newDamageDeck.vizziniShuffle();
                    return Object.assign(
                    {}, state,
                    {
                        damageDeck: newDamageDeck,
                        damageDiscardPile: [],
                    });
                case Action.RESET_NEXT_TOKEN_ID:
                    return Object.assign(
                    {}, state,
                    {
                        nextTokenId: 1,
                    });
                case Action.SET_ACTIVE_TOKEN:
                    LOGGER.info("Active Token: " + action.token);
                    return Object.assign(
                    {}, state,
                    {
                        activeTokenId: action.token.id(),
                    });
                case Action.SET_ADJUDICATOR:
                    return Object.assign(
                    {}, state,
                    {
                        adjudicator: action.adjudicator,
                    });
                case Action.SET_ENVIRONMENT:
                    return Object.assign(
                    {}, state,
                    {
                        environment: action.environment,
                    });
                case Action.SET_EVENT:
                    LOGGER.info("Event: " + Event.properties[action.eventKey].name);
                    var newEventData = Event.createData(action.eventKey, action.eventToken, action.eventCallback);
                    return Object.assign(
                    {}, state,
                    {
                        eventData: newEventData,
                    });
                case Action.SET_FIRST_AGENT:
                    return Object.assign(
                    {}, state,
                    {
                        firstAgent: action.agent,
                    });
                case Action.SET_PHASE:
                    LOGGER.info("Phase: " + Phase.properties[action.phaseKey].name);
                    return Object.assign(
                    {}, state,
                    {
                        phaseKey: action.phaseKey,
                    });
                case Action.SET_PLAY_AREA_SCALE:
                    return Object.assign(
                    {}, state,
                    {
                        playAreaScale: action.scale,
                    });
                case Action.SET_PLAY_FORMAT:
                    return Object.assign(
                    {}, state,
                    {
                        playFormatKey: action.playFormatKey,
                    });
                case Action.SET_SECOND_AGENT:
                    return Object.assign(
                    {}, state,
                    {
                        secondAgent: action.agent,
                    });
                case Action.SET_TOKEN_ACTIVATION_STATE:
                    newTokenIdToActivationState = Reducer.tokenIdToActivationState(state.tokenIdToActivationState, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToActivationState: newTokenIdToActivationState,
                    });
                case Action.SET_TOKEN_COMBAT_STATE:
                    newTokenIdToCombatState = Reducer.tokenIdToCombatState(state.tokenIdToCombatState, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToCombatState: newTokenIdToCombatState,
                    });
                case Action.SET_TOKEN_MANEUVER:
                    newTokenIdToManeuver = Reducer.tokenIdToManeuver(state.tokenIdToManeuver, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToManeuver: newTokenIdToManeuver,
                    });
                case Action.SET_USER_MESSAGE:
                    return Object.assign(
                    {}, state,
                    {
                        userMessage: action.userMessage,
                    });
                case Action.SET_VALUE:
                    newTokenIdToValues = Reducer.tokenIdToValues(state.tokenIdToValues, action);
                    return Object.assign(
                    {}, state,
                    {
                        tokenIdToValues: newTokenIdToValues,
                    });
                default:
                    LOGGER.warn("Reducer.root: Unhandled action type: " + action.type);
                    return state;
            }
        };

        Reducer._recomputeValues = function(state, newTokenIdToCounts, newTokenIdToValues, token, damage, upgrade)
        {
            InputValidator.validateNotNull("state", state);
            InputValidator.validateNotNull("newTokenIdToCounts", newTokenIdToCounts);
            InputValidator.validateNotNull("newTokenIdToValues", newTokenIdToValues);
            InputValidator.validateNotNull("token", token);
            // damage is optional.
            // upgrade is optional.

            var isCloaked;
            var counts = newTokenIdToCounts[token.id()];

            if (counts)
            {
                var cloakCount = counts[Count.CLOAK];
                isCloaked = (cloakCount > 0);
            }

            Value.values().forEach(
                function(property)
                {
                    newTokenIdToValues = Reducer._recomputeValue(state, newTokenIdToValues, token, property,
                        damage, upgrade, isCloaked);
                });

            return newTokenIdToValues;
        };

        Reducer._recomputeValue = function(state, newTokenIdToValues, token, property, damage, upgrade, isCloaked)
        {
            InputValidator.validateNotNull("state", state);
            InputValidator.validateNotNull("newTokenIdToValues", newTokenIdToValues);
            InputValidator.validateNotNull("token", token);
            InputValidator.validateNotNull("property", property);
            // damage is optional.
            // upgrade is optional.
            // isCloaked is optional.

            var tokenId = token.id();
            var newValue = (token.shipState ? token.shipState(property) : undefined);

            if (newValue !== null)
            {
                var propertyName = property + "Value";

                if (token.criticalDamages)
                {
                    var damageKeys = token.criticalDamages().slice();

                    if (damage)
                    {
                        damageKeys.push(damage.value);
                    }

                    damageKeys.forEach(function(damageKey)
                    {
                        var myDamage = DamageCard.properties[damageKey];

                        if (myDamage && myDamage[propertyName])
                        {
                            newValue += myDamage[propertyName];
                        }
                    });
                }

                if (token.upgradeKeys)
                {
                    var upgradeKeys = token.upgradeKeys().slice();

                    if (upgrade)
                    {
                        upgradeKeys.push(upgrade.value);
                    }

                    upgradeKeys.forEach(function(upgradeKey)
                    {
                        var myUpgrade = UpgradeCard.properties[upgradeKey];

                        if (myUpgrade && myUpgrade[propertyName])
                        {
                            newValue += myUpgrade[propertyName];
                        }
                    });
                }

                switch (property)
                {
                    case Value.PILOT_SKILL:
                        if (token && token.pilotKey() === Pilot.EPSILON_ACE)
                        {
                            var damageCount = Selector.damages(state, tokenId).length;
                            var criticalDamageCount = Selector.criticalDamages(state, tokenId).length;
                            if (damageCount === 0 && criticalDamageCount === 0)
                            {
                                newValue = 12;
                            }
                        }
                        if (damage && [DamageCard.DAMAGED_COCKPIT, DamageCard.INJURED_PILOT].vizziniContains(damage.value))
                        {
                            newValue = 0;
                        }
                        break;
                    case Value.PRIMARY_WEAPON:
                        if (token && token.activationState && token.activationState() && token.activationState().usedUpgrades().vizziniContains(UpgradeCard.EXPOSE))
                        {
                            newValue++;
                        }
                        if (token && token.isUpgradedWith(UpgradeCard.PUNISHING_ONE))
                        {
                            newValue++;
                        }
                        break;
                    case Value.AGILITY:
                        if (isCloaked)
                        {
                            newValue += 2;
                        }
                        if (token && token.isUpgradedWith(UpgradeCard.COMMANDER_KENKIRK) && token.shieldCount() === 0 && (token.damageCount() > 0 || token.criticalDamageCount() > 0))
                        {
                            newValue++;
                        }
                        if (token && token.activationState && token.activationState() && token.activationState().usedUpgrades().vizziniContains(UpgradeCard.EXPOSE))
                        {
                            newValue--;
                        }
                        if (token && token.activationState && token.activationState() && token.activationState().usedUpgrades().vizziniContains(UpgradeCard.R2_F2))
                        {
                            newValue++;
                        }
                        if (token.tractorBeamCount)
                        {
                            var tractorBeamCount = token.tractorBeamCount();
                            if (tractorBeamCount !== undefined)
                            {
                                newValue -= tractorBeamCount;
                            }
                        }
                        break;
                }

                newValue = Math.max(newValue, 0);
            }

            var action = Action.setValue(token, property, newValue);

            return Reducer.tokenIdToValues(newTokenIdToValues, action);
        };

        if (Object.freeze)
        {
            Object.freeze(Reducer);
        }

        return Reducer;
    });
