import { CONSTANTS } from "../../../constants/Constants";
import Styles from "./StyledJsonSection";
import uuid from "react-uuid";

export default function JsonSection({ jsonData }) {
  return (
    <Styles>
      <div className="json-container">
        <h1>{CONSTANTS.JSON_SECTION.TITLE}</h1>
        <br />

        <h2>
          {CONSTANTS.JSON_SECTION.NAME_LABEL}
          <span className="proj-item">{jsonData.name}</span>
        </h2>
        <br />
        <p>{CONSTANTS.JSON_SECTION.PROJECTS_LABEL}</p>
        {jsonData.projects.map((proj) => (
          <p key={uuid()} className="proj-item">
            {proj}
          </p>
        ))}

        <p>{CONSTANTS.JSON_SECTION.PROJECTS_DETAILS_LABEL}</p>

        {jsonData.actualProjects.map((proj) => (
          <div className="individual-project" key={uuid()}>
            <p>
              {CONSTANTS.JSON_SECTION.SELECTED_PROJECT_LABEL}
              <span className="proj-item"> {proj.selectedproject}</span>{" "}
            </p>
            <p>
              {CONSTANTS.JSON_SECTION.SELECTED_DETAILS_LABEL}{" "}
              <span className="proj-item"> {proj.details} </span>{" "}
            </p>
            <p>
              {CONSTANTS.JSON_SECTION.SELECTED_DURATION_LABEL}{" "}
              <span className="proj-item"> {proj.duration} </span>{" "}
            </p>
            <p>
              {CONSTANTS.JSON_SECTION.SELECTED_UNITS_LABEL}
              <span className="proj-item"> {proj.units} </span>{" "}
            </p>
            <p>
              {CONSTANTS.JSON_SECTION.SELECTED_ID_LABEL}{" "}
              <span className="proj-item"> {proj.uniqId} </span>{" "}
            </p>
          </div>
        ))}
        <br />
        <p>{CONSTANTS.JSON_SECTION.STRINGIFY_JSON_TEXT}</p>
        <p className="json-string proj-item">{JSON.stringify(jsonData)}</p>
      </div>
    </Styles>
  );
}
