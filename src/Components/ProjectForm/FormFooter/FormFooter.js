import Style from "./StyledFormFooter";
import SubmitButton from "./SubmitButton";
import { CONSTANTS } from "../../../constants/Constants";

export default function FormFooter({ cancel, toggle, handleSubmit }) {
  return (
    <Style>
      <div className="form-footer">
        <div className="form-footer-container">
          <button onMouseDown={toggle}>
            {CONSTANTS.FOOTER_SECTION.TOGGLE_VIEW_TEXT}
          </button>
          <div className="footer-buttons">
            <button onClick={cancel}>
              {CONSTANTS.FOOTER_SECTION.CANCEL_BUTTON_TEXT}
            </button>
            <SubmitButton handleSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </Style>
  );
}
