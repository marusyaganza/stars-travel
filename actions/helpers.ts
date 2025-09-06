import { ACTION_INITIAL_STATE } from "./constants";
import { ActionResponse } from "./types";

export function createActionResponse(
  response: Partial<ActionResponse>
): ActionResponse {
  return { ...ACTION_INITIAL_STATE, ...response };
}
