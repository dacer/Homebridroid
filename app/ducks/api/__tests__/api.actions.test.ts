import api from "..";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

describe("Api actions should", () => {
  it("export expected actions", () => expect(api.actions).toMatchSnapshot());

  it("be able to logout", () => {
    const expectedAction = {
      type: api.actions.logout.toString(),
      payload: undefined,
    };

    expect(
      api.actions.logout()
    ).toEqual(expectedAction);
  });
});
