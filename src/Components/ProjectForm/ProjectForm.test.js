import React from "react";
import Enzyme, { mount, shallow, configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
Enzyme.configure({ adapter: new Adapter() });
import ProjectForm from "./ProjectForm";
import { render, fireEvent } from "@testing-library/react";

import ReactDOM from "react-dom";
//import ReactTestUtils from "react-dom/test-utils";
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
