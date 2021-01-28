import Style from "./StyledFormFooter";
import SubmitButton from "./SubmitButton/SubmitButton";

export default function FormFooter({ cancel, toggle, handleSubmit }) {
  return (
    <Style>
      <div className="form-footer">
        <div className="form-footer-container">
          <button onMouseDown={toggle}>toggle Json</button>
          <div className="footer-buttons">
            <button onClick={cancel}>Cancel</button>
            <SubmitButton handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Style>
  );
}
