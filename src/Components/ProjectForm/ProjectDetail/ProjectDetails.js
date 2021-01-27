import Style from "./StyledProjectDetails";
import closeIcon from "../../../media/close.png";
import { useState } from "react";
import classNames from "classnames";

export default function ProjectDetails({ projectId, remove, projects, setProjectsArr, projectsArr, setJsonData, submitClicked }) {
  const [selectedPoject, setSelectedProj] = useState("");
  const [details, setDetails] = useState("");
  const [duration, setDuration] = useState("");
  const [units, setUnits] = useState("");
  const [isDetailsFocused, setIsDetailsFocused] = useState(false);
  const [isDurationFocused, setIsDurationFocused] = useState(false);

  function selectHandle(e) {
    setSelectedProj(e.target.value);
    const newProjectList = projectsArr.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            selectedproject: e.target.value,
          }
    );
    setProjectsArr(newProjectList);
    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function textareaHandle(e) {
    setDetails(e.target.value);
    const newProjectList = projectsArr.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            details: e.target.value,
          }
    );
    setProjectsArr(newProjectList);
    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function durationHandle(e) {
    setDuration(e.target.value);
    const newProjectList = projectsArr.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            duration: e.target.value,
          }
    );
    setProjectsArr(newProjectList);
    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function unitHandling(e) {
    setUnits(e.target.value);
    const newProjectList = projectsArr.map((project) =>
      project.uniqId !== projectId
        ? project
        : {
            ...project,
            units: e.target.value,
          }
    );
    setProjectsArr(newProjectList);
    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function textareaFocus() {
    setIsDetailsFocused(true);
  }

  function textareaBlur() {
    setIsDetailsFocused(false);
  }

  function durationFocus() {
    setIsDurationFocused(true);
  }

  function durationBlur() {
    setIsDurationFocused(false);
  }

  return (
    <Style>
      <div className="added-projects">
        <p>Projects</p>
        <div>
          <select value={selectedPoject} onChange={selectHandle}>
            <option value="" disabled hidden>
              Select Project
            </option>
            {projects.map((project) => (
              <option key={project}>{project}</option>
            ))}
          </select>
          <p
            className={classNames("error-msg", {
              "display-none": selectedPoject !== "" || submitClicked === false,
            })}
          >
            Select a project
          </p>
        </div>

        <p>Details</p>
        <div>
          <textarea
            onFocus={textareaFocus}
            onBlur={textareaBlur}
            onChange={textareaHandle}
            value={details}
            className="details-textarea"
            name="details"
            id="details"
          ></textarea>
          <p
            className={classNames("error-msg", {
              "display-none": details !== "" || submitClicked === false || isDetailsFocused,
            })}
          >
            Add some details
          </p>
        </div>

        <p>Duration</p>
        <div className="duration-inputs">
          <div>
            <input onFocus={durationFocus} onBlur={durationBlur} type="text" onChange={durationHandle} value={duration} />
            <p
              className={classNames("error-msg", {
                "display-none": duration !== "" || submitClicked === false || isDurationFocused,
              })}
            >
              Set duration
            </p>
            <p
              className={classNames("error-msg", {
                "display-none": submitClicked === false || isDurationFocused || isNaN(duration) === false,
              })}
            >
              Must be nr
            </p>
            <p
              className={classNames("error-msg", {
                "display-none": submitClicked === false || isDurationFocused || duration !== "0",
              })}
            >
              Can't be zero
            </p>
          </div>

          <div>
            <select value={units} onChange={unitHandling}>
              <option value="" disabled hidden>
                Select Units
              </option>
              <option>days</option>
              <option>weeks</option>
              <option>months</option>
              <option>years</option>
            </select>
            <p
              className={classNames("error-msg", {
                "display-none": units !== "" || submitClicked === false,
              })}
            >
              Select time unit
            </p>
          </div>
        </div>
        <img className="close-projects" src={closeIcon} alt="close-projects" onClick={remove} value={projectId} value1={selectedPoject} />
      </div>
    </Style>
  );
}
