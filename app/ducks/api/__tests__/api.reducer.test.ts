import api from "..";

describe("Api reducer should", () => {
  it("return the initial state", () => {
    expect(api.reducer(undefined, {} as any)).toEqual({
      token: "",
      devices: [],
      loading: 'idle'
    });
  });

  it("handle logout", () => {

    const expectedAction = {
      type: api.actions.logout.toString(),
      payload: undefined,
    };

    expect(api.reducer(undefined, expectedAction)).toEqual(
      {
        token: "",
        devices: [],
        loading: 'idle'
      }
    );
  });
});
