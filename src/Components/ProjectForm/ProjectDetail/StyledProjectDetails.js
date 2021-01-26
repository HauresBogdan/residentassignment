import styled from "styled-components";

export default styled.div`
  .added-projects {
    display: grid;
    grid-template-columns: 15% 85%;
    padding: 1em;
    border: 1px dashed lightgray;
    margin: 30px 0;
    position: relative;

    @media (max-width: 470px) {
      grid-template-columns: 1fr;
    }
  }

  .added-projects > * {
    margin: 7px 0;
  }
  .details-textarea {
    min-height: 100px;
  }

  .close-projects {
    position: absolute;
    top: -18px;
    right: -10px;
    height: 20px;
  }

  .duration-inputs {
    display: flex;
    justify-content: center;
  }

  .duration-inputs input,
  .duration-inputs select {
    width: 110px;
    margin: 0 1%;
  }
`;
