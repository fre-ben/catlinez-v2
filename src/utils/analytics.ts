// @ts-nocheck
import Plausible from "plausible-tracker";

export const initPlausible = () => {
  const plausible = Plausible({
    domain: import.meta.env.VITE_PLAUSIBLE_DOMAIN as string,
    apiHost: import.meta.env.VITE_PLAUSIBLE_APIHOST as string,
  });
  plausible.enableAutoPageviews();
};
