import { pathOr } from "ramda";

import { DeviceLayout, namespace } from "./api.slice";

const getToken = (state: any) =>
  pathOr("", [namespace, "token"], state);

const getDevices = (state: any) =>
  pathOr([], [namespace, "devices"], state) as DeviceLayout[];

export default {
  getToken, getDevices
};
