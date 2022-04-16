import { cleanup, render } from "@testing-library/svelte";
import { describe, it, expect, afterEach } from "vitest";
import Catline from "../lib/Catline.svelte";

describe("Catline component", () => {
  afterEach(() => cleanup());

  it("should render", () => {
    const { container } = render(Catline);
    expect(container).toBeTruthy();
  });

  it("should contain two buttons", () => {
    const component = render(Catline);
    expect(component.getAllByRole("button")).toHaveLength(2);
  });

  it("should contain buttons for german and english catline", () => {
    const component = render(Catline);
    const germanBtn = component.getByRole("button", { name: /German Catline/i });
    const englishBtn = component.getByRole("button", { name: /English Catline/i });
    expect(germanBtn).toBeTruthy();
    expect(englishBtn).toBeTruthy();
  });

  it("should have a container for displaying images", () => {
    const component = render(Catline);
    expect(component.getByTestId("catlineContainer")).toBeTruthy();
  });
});
