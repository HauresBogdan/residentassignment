import Style from "./StyledProjectDetails";
import closeIcon from "../../../media/close.png";
import { useState } from "react";
import classNames from "classnames";
import { CONSTANTS } from "../../../constants/Constants";

export default function ProjectDetails({
  projectId,
  remove,
  jsonData,
  setJsonData,
  submitClicked,
}) {
  const [selectedPoject, setSelectedProj] = useState("");
  const [details, setDetails] = useState("");
  const [duration, setDuration] = useState("");
  const [units, setUnits] = useState("");
  const [isDetailsFocused, setIsDetailsFocused] = useState(false);
  const [isDurationFocused, setIsDurationFocused] = useState(false);

  function selectHandle(e) {
    setSelectedProj(e.target.value);
    const newProjectList = jsonData.actualProjects.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            selectedproject: e.target.value,
          }
    );

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function textareaHandle(e) {
    setDetails(e.target.value);
    const newProjectList = jsonData.actualProjects.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            details: e.target.value,
          }
    );

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function durationHandle(e) {
    setDuration(e.target.value);
    const newProjectList = jsonData.actualProjects.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            duration: e.target.value,
          }
    );

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function unitHandling(e) {
    setUnits(e.target.value);
    const newProjectList = jsonData.actualProjects.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            units: e.target.value,
          }
    );

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  return (
    <Style>
      <div className="added-projects">
        <p>{CONSTANTS.PROJECT_DETAIL.PROJECT_LABEL}</p>
        <div>
          <select
            value={selectedPoject}
            onChange={selectHandle}
            className="project-select"
          >
            <option value="" disabled hidden>
              {CONSTANTS.PROJECT_DETAIL.PROJECT_NAME}
            </option>
            {jsonData.projects.map((project) => (
              <option key={project}>{project}</option>
            ))}
          </select>
          <p
            className={classNames("error-msg", {
              "display-none": selectedPoject !== "" || submitClicked === false,
            })}
          >
            {CONSTANTS.PROJECT_DETAIL.PROJECT_REQ_ERROR}
          </p>
        </div>

        <p>{CONSTANTS.PROJECT_DETAIL.DETAILS_LABEL}</p>
        <div>
          <textarea
            onFocus={() => setIsDetailsFocused(true)}
            onBlur={() => setIsDetailsFocused(false)}
            onChange={textareaHandle}
            value={details}
            className="details-textarea"
            name="details"
            id="details"
          ></textarea>
          <p
            className={classNames("error-msg", {
              "display-none":
                details.trim() !== "" ||
                submitClicked === false ||
                isDetailsFocused,
            })}
          >
            {CONSTANTS.PROJECT_DETAIL.DETAILS_REQ_ERROR}
          </p>
        </div>

        <p>{CONSTANTS.PROJECT_DETAIL.DURATION_LABEL}</p>
        <div className="duration-inputs">
          <div>
            <input
              className="duration-input"
              onFocus={() => setIsDurationFocused(true)}
              onBlur={() => setIsDurationFocused(false)}
              type="text"
              onChange={durationHandle}
              value={duration}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
            <p
              className={classNames("error-msg", {
                "display-none":
                  duration.trim() !== "" ||
                  submitClicked === false ||
                  isDurationFocused,
              })}
            >
              {CONSTANTS.PROJECT_DETAIL.DURATION_INPUT_REQ_ERROR}
            </p>
            <p
              className={classNames("error-msg", {
                "display-none":
                  submitClicked === false ||
                  isDurationFocused ||
                  isNaN(duration) === false,
              })}
            >
              {CONSTANTS.PROJECT_DETAIL.DURATION_INPUT_ISNUM_ERROR}
            </p>
            <p
              className={classNames("error-msg", {
                "display-none":
                  submitClicked === false ||
                  isDurationFocused ||
                  duration !== "0",
              })}
            >
              {CONSTANTS.PROJECT_DETAIL.DURATION_INPUT_ZERO_ERROR}
            </p>
          </div>

          <div>
            <select
              value={units}
              onChange={unitHandling}
              className="duration-select"
            >
              <option value="" disabled hidden>
                {CONSTANTS.PROJECT_DETAIL.SELECT_UNITS_NAME}
              </option>
              {CONSTANTS.PROJECT_DETAIL.TIME_FRAME_ARRAY.map((timeFrame) => (
                <option key={timeFrame}>{timeFrame}</option>
              ))}
            </select>
            <p
              className={classNames("error-msg", {
                "display-none": units !== "" || submitClicked === false,
              })}
            >
              {CONSTANTS.PROJECT_DETAIL.SELECT_UNITS_REQ_ERROR}
            </p>
          </div>
        </div>
        <img
          className="close-projects"
          src={closeIcon}
          alt="close-projects"
          onClick={remove}
          value={projectId}
          value1={selectedPoject}
        />
      </div>
    </Style>
  );
}
