import styled from "styled-components";

export default styled.div`
  .form-footer {
    min-height: 100px;
    background: lightgray;
    position: fixed;
    bottom: 0px;
    width: 100%;
    left: 0px;
    z-index: 2;
  }

  .form-footer-container {
    padding: 30px 5% 35px 5%;
    max-width: 500px;
    margin: 0 auto;
  }

  .footer-buttons {
    display: flex;
    justify-content: space-between;
  }

  .footer-buttons button,
  .footer-buttons input {
    padding: 10px 20px;
    margin-top: 10px;
  }
`;
