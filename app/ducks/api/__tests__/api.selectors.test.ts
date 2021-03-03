import api from "..";

let state = {};

const initialState = {
  token: "token",
  devices: []
};

describe("API selector should", () => {
  beforeEach(() => {
    state = {
      [api.namespace]: initialState,
    };
  });

  test("return the token", () =>
    expect(api.selectors.getToken(state)).toEqual(
      initialState.token
    ));

  test("return the devices", () =>
    expect(api.selectors.getDevices(state)).toEqual(
      initialState.devices
    ));
});
