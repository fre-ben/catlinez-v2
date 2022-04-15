import { cleanup, fireEvent, render, screen } from "@testing-library/svelte";
import { describe, it, expect, afterEach } from "vitest";
import Catline from "../lib/Catline.svelte";

describe("Catline component", () => {
  afterEach(() => cleanup());

  it("should render", () => {
    const { container } = render(Catline);
    expect(container).toBeTruthy();
  });
});
