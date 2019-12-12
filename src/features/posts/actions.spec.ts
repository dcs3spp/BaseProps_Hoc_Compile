/** from jest docs https://jestjs.io/docs/en/jest-object#jestrequireactualmodulename */
// jest.mock('typesafe-actions', () => {
//     const originalModule = jest.requireActual('typesafe-actions');
  
//     return {
//       __esModule: true,
//       ...originalModule,
//       createAsyncAction: jest.fn().mockReturnValue({}),
//     };
//   });

import * as typ from 'typesafe-actions';
import { factoryAllPostsAction } from './actions';
describe('action test', ()=>{
    test('test factoryAllPostsAction', ()=>{
        const mockCreateAsync = jest.spyOn(typ, 'createAsyncAction');
      
        // example wrapper method that calls createAsyncAction
        // in this case it creates an instance of allPosts action
        const asyncAction = factoryAllPostsAction();

        expect(mockCreateAsync).toHaveBeenCalled();
    });
});
