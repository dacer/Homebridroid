import { pathOr } from "ramda";

import { namespace } from "./userPreferences.slice";

const getServerAddress = (state: any) =>
pathOr("", [namespace, "serverAddress"], state);

export default {
  getServerAddress
};
