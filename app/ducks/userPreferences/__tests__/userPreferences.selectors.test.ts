import userPreferences from "../";

let state = {};

const initialState = {
  username: "username", 
  password: "password", 
  serverAddress: "http://192.1.1.111",
};

describe("userPreferences selector should", () => {
  beforeEach(() => {
    state = {
      [userPreferences.namespace]: initialState,
    };
  });

  test("return the monthly userPreferences", () =>
    expect(
      userPreferences.selectors.getServerAddress(state)
    ).toEqual(initialState.serverAddress));

});
