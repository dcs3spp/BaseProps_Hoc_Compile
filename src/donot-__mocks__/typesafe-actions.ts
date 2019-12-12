// __mocks__/typesafe-actions.ts
'use strict';

const typesafe = jest.requireActual('typesafe-actions');

(typesafe as any).createAsyncAction = jest.fn();

module.exports = typesafe;
