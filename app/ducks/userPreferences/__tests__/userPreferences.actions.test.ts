import userPreferences from "../";

describe("userPreferences actions should", () => {
  it("export expected actions", () =>
    expect(userPreferences.actions).toMatchSnapshot());

  it("be able to update to a new term of use version", () => {
    const username = "username";
    const password = "password";
    const serverAddress = "http://192.168.1.111";

    const expectedAction = {
      type: userPreferences.actions.userLoggedIn.toString(),
      payload: {username, password, serverAddress},
    };
    expect(
      userPreferences.actions.userLoggedIn({username, password, serverAddress})
    ).toEqual(expectedAction);
  });

});
