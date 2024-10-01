import { createSelectorHooks } from "auto-zustand-selectors-hook";
import { create } from "zustand";

export type CounterState = {
  counter: number;
  actions: {
    increment: () => void;
    decrement: () => void;
  };
};

const useCounterStoreBase = create<CounterState>()((set) => ({
  counter: 0,
  actions: {
    increment: () => set((state) => ({ counter: state.counter + 1 })),
    decrement: () => set((state) => ({ counter: state.counter - 1 })),
  },
}));

export const useCounterStore = createSelectorHooks(useCounterStoreBase);
