import userPreferences from "../";

describe("userPreferences reducer should", () => {
  it("return the initial state", () => {
    expect(userPreferences.reducer(undefined, {} as any)).toEqual({
      username: "",
      password: "",
      serverAddress: "",
    });
  });

  it("handle a userPreferences change", () => {
    const username = "username";
    const password = "password";
    const serverAddress = "http://192.168.1.111";

    const expectedAction = {
      type: userPreferences.actions.userLoggedIn.toString(),
      payload: {username, password, serverAddress},
    };

    expect(userPreferences.reducer(undefined, expectedAction)).toEqual({
      username: "username",
      password: "password",
      serverAddress: "http://192.168.1.111",
    });
  });

});
