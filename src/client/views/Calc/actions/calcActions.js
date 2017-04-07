import {UPDATE_FIELD} from "../types/calcTypes";

export const updateField = (name, value) =>
    ({
        type: UPDATE_FIELD,
        name,
        value,
    });