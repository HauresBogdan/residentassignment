import { CONSTANTS } from "../../../constants/Constants";

export default function SubmitButton({ handleSubmit }) {
  return (
    <button
      className="submit-btn"
      type="submit"
      onClick={handleSubmit}
      value="SAVE"
    >
      {CONSTANTS.FOOTER_SECTION.SUBMIT_BUTTON_TEXT}
    </button>
  );
}
