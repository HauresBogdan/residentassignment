import Style from "./StyledFormHeader";
import { CONSTANTS } from "../../constants/Constants";

export default function FormHeader() {
  return (
    <Style>
      <div className="form-header">
        <div className="header-container">
          <h1>{CONSTANTS.HEADER_SECTION.TITLE}</h1>
        </div>
      </div>
    </Style>
  );
}
