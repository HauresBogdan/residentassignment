import styled from "styled-components";

export default styled.div`
  .project-tag {
    border: 1px solid grey;
    margin-right: 10px;
    padding: 0px 15px;
    border-radius: 0.25em;
    margin-top: 20px;
    line-height: 30px;
    white-space: nowrap;
  }

  .name-input {
    display: block;
    width: 100%;
    margin: 10px 0;
  }

  .close-tag {
    height: 17px;
    margin-left: 10px;
    position: relative;
    top: 2px;
  }

  .error-msg {
    color: red;
  }

  .tags-and-proj-input {
    padding: 10px 0;
  }

  .form-container {
    padding: 50px 5% 100px 5%;
    max-width: 500px;
    margin: 100px auto 0 auto;
  }

  .add-icon {
    transform: rotate(45deg);
    height: 20px;
    margin-left: 10px;
    position: relative;
    top: 4px;
  }

  .display-none {
    display: none;
  }

  .json-container {
    padding: 50px 5% 100px 5%;
    max-width: 500px;
    margin: 100px auto 0 auto;
  }

  .json-data {
    margin: 70px auto 0 auto;
    border: 1px dashed lightgray;
    background-color: white;
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 1;
    height: auto !important; /* real browsers */
    min-height: 100%; /* real browsers */
  }

  .toggle-JSON {
    display: none;
  }

  .proj-item {
    color: blue;
  }

  .json-string {
    margin-top: 20px;
    font-size: 11px;
  }

  .individual-project {
    padding: 1em;
    margin: 10px 0;
    border: 1px dashed gray;
  }
`;
