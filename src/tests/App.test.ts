import { cleanup, render } from "@testing-library/svelte";
import { describe, it, expect, afterEach } from "vitest";
import App from "../App.svelte";

describe("App", () => {
  afterEach(() => cleanup());

  it("should render", () => {
    const { container } = render(App);
    expect(container).toBeTruthy();
  });

  it("should render h1 element", () => {
    const component = render(App);
    expect(component.getAllByRole("heading")).toHaveLength(1);
    expect(component.getByText(/CATLINEZ/i)).toBeTruthy();
  });

  it("should render Catlinez component", () => {
    const component = render(App);
    expect(component.getAllByRole("button")).toHaveLength(2);
  });

  it("should render Footer", () => {
    const component = render(App);
    const footerLink = component.getByRole("link", { name: /fre-ben/i });
    expect(component.getByText(/made by/i)).toBeTruthy();
    expect(footerLink).toBeTruthy();
  });
});
