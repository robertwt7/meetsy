import { MeetsyBackendError } from "./model";

export const isMeetsyBackendError = (e: any): e is MeetsyBackendError =>
  e?.detail !== undefined;
