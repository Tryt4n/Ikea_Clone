import { describe, expect, it, vi } from "vitest";
import { startViewTransition, getPrice } from "./helpers";
import type { ShoppingCartType } from "../context/AppContext/types/ShoppingCartType";

describe("helper functions", () => {
  describe("#startViewTransition", () => {
    it("should call the callback function if the user's system prefers reduced motion", () => {
      const callback = vi.fn();
      window.matchMedia = vi.fn().mockReturnValue({ matches: true });

      startViewTransition(callback);

      expect(callback).toHaveBeenCalled();
    });

    it("should call the callback function if the startViewTransition method doesn't exist on the document object", () => {
      const callback = vi.fn();
      document.startViewTransition = undefined;

      startViewTransition(callback);

      expect(callback).toHaveBeenCalled();
    });

    it("should call the callback function after starting the view transition", () => {
      const callback = vi.fn();
      document.startViewTransition = vi.fn().mockImplementation((cb) => {
        cb();
      });
      window.matchMedia = vi.fn().mockReturnValue({ matches: false });

      startViewTransition(callback);

      expect(document.startViewTransition).toHaveBeenCalled();
      expect(callback).toHaveBeenCalled();
    });
  });

  describe("#getPrice", () => {
    it("should calculate the price when the product has integer and decimal parts", () => {
      const price: ShoppingCartType["price"] = {
        integer: 10,
        decimal: 50,
      };

      const result = getPrice(price);

      expect(result).toBe(10.5);
    });

    it("should calculate the price when the product has only integer part", () => {
      const price: ShoppingCartType["price"] = {
        integer: 20,
      };

      const result = getPrice(price);

      expect(result).toBe(20);
    });
  });
});
