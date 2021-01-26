import Style from "./StyledFormFooter";

export default function FormFooter() {
  return (
    <Style>
      <div className="form-footer">
        <div className="form-footer-container">
          <button>See Json</button>
          <div className="footer-buttons">
            <button>Cancel</button>
            <input type="submit" value="SAVE" />
          </div>
        </div>
      </div>
    </Style>
  );
}
