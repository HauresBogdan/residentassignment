import React from "react";
import Enzyme, { mount, shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });
import ProjectForm from "./ProjectForm";
import { render, fireEvent } from "@testing-library/react";

import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import TestUtils from "react-dom";

import SubmitButton from "./FormFooter/SubmitButton/SubmitButton";

it("form component can be mounted and form element is found", () => {
  const projectForm = mount(<ProjectForm />);

  expect(projectForm.find("form").length).toBe(1);
});

it("form can be submitted", () => {
  const handleSubmit = jest.fn();

  mount(<ProjectForm onSubmit={handleSubmit()} />);
  expect(handleSubmit).toHaveBeenCalledTimes(1);
});

it("form can be and is getting rendered", () => {
  const { getByTestId } = render(<ProjectForm />);

  expect(getByTestId("form-test")).toBeTruthy();
});

describe("ProjectForm", () => {
  it("form is being submitted when submit event fires while pressing submit button", () => {
    const callback = jest.fn();
    const wrapper = mount(<SubmitButton handleSubmit={callback} />);

    wrapper.find('[type="submit"]').at(0).simulate("click");
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

it("as form starts rendering the input field is blank as it should be (anti spam robots technique)", () => {
  const wrapper = document.createElement("div");

  ReactDOM.render(<ProjectForm />, wrapper);

  const input = wrapper.querySelector(".name-input");

  expect(input.value).toEqual("");
});

it("testing that name input value can be controlled with onChange event and the value is being changed ", () => {
  const wrapper = document.createElement("div");
  ReactDOM.render(<ProjectForm />, wrapper);
  const input = wrapper.querySelector(".name-input");
  const form = wrapper.querySelector("form");

  ReactTestUtils.Simulate.change(input, { target: { value: "Test" } });
  ReactTestUtils.Simulate.submit(form);

  expect(input.value).toEqual("Test");
});

it("success message should not appear if submitting a blank form", () => {
  const wrapper = mount(<ProjectForm />);
  const form = wrapper.find("form");

  form.simulate("submit");
  expect(form.find(".success").exists()).toBeFalsy();
});

it("success message should no appear if only the name is added while submitting", () => {
  const wrapper = mount(<ProjectForm />);
  const form = wrapper.find("form");

  const input = form.find(".name-input");
  input.simulate("change", { target: { value: "Jhon Doe" } });

  form.simulate("submit");
  expect(form.find(".success").exists()).toBeFalsy();
});

it("Form adds projects correctly after entering a project name and pressing enter", () => {
  const wrapper = document.createElement("div");
  ReactDOM.render(<ProjectForm />, wrapper);
  const tagInput = wrapper.querySelector(".tag-input");

  ReactTestUtils.Simulate.change(tagInput, { target: { value: "Test" } });

  expect(tagInput.value).toEqual("Test");

  expect(wrapper.querySelector(".project-tag")).toBeFalsy();

  ReactTestUtils.Simulate.change(tagInput, { target: { value: "Test" } });
  ReactTestUtils.Simulate.keyDown(tagInput, { key: "Enter" });

  expect(wrapper.querySelector(".project-tag")).toBeTruthy();
});
