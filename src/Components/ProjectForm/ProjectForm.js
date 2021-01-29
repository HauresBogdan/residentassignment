import Style from "./StyledProjectForm";
import { useState } from "react";
import uuid from "react-uuid";
import closeIcon from "../../media/close.png";
import classNames from "classnames";
import ProjectDetails from "./ProjectDetail/ProjectDetails";
import FormFooter from "./FormFooter/FormFooter";
import Validation from "../../services/Validation";
import { CONSTANTS } from "../../constants/Constants";
import JsonSection from "./JsonSection/JsonSection";

export default function ProjectForm() {
  const [projectsInput, setProjectsInput] = useState("");
  const [projEr, setProjEr] = useState("");
  const [toggleJSON, setToggleJSON] = useState(true);
  const [nameInputIsFocused, setNameInputIsFocused] = useState(false);
  const [submitClicked, setSubmitClicked] = useState(false);
  const [submit, setSubmit] = useState(false);

  const [jsonData, setJsonData] = useState({
    name: "",
    projects: [],
    actualProjects: [],
  });

  function handleProjectsInputChange(e) {
    const projectsInputValue = e.target.value;
    setProjectsInput(projectsInputValue);
  }

  function handleNameInputChange(e) {
    const nameInputValue = e.target.value;
    setJsonData((prevValues) => ({ ...prevValues, name: nameInputValue }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();
    setSubmitClicked(true);
    if (Validation(jsonData)) {
      setSubmit(true);
    } else setSubmit(false);
  }

  function cancelSubmit() {
    window.location.reload();
  }

  function addingToProjects(e) {
    if (e.key === "Enter") {
      if (projectsInput.trim() === "") {
        setProjEr(CONSTANTS.PROJECTS_INPUT.REQ_ERROR);
        setTimeout(function () {
          setProjEr("");
        }, 2000);
      } else if (jsonData.projects.includes(projectsInput)) {
        setProjEr(CONSTANTS.PROJECTS_INPUT.EXISTS_ERROR);
        setTimeout(function () {
          setProjEr("");
        }, 2000);
      } else {
        setJsonData((prevValues) => ({
          ...prevValues,
          projects: [...jsonData.projects, projectsInput],
        }));
      }
      setProjectsInput("");
    }
  }

  function removeFromProjects(e) {
    const toBeDeleted = e.target.getAttribute("value");
    const newProjectList = jsonData.projects.filter(
      (project) => project !== toBeDeleted
    );

    setJsonData((prevValues) => ({
      ...prevValues,
      projects: newProjectList,
    }));

    const newProjectDetailList = jsonData.actualProjects.filter(
      (project) => project.selectedproject !== toBeDeleted
    );

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectDetailList,
    }));
  }

  function addProject() {
    const uniqId = uuid();

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: [
        ...jsonData.actualProjects,
        {
          selectedproject: "",
          details: "",
          duration: "",
          units: "",
          uniqId: uniqId,
        },
      ],
    }));
  }

  function removeFromProjectsSection(e) {
    const toBeDeleted = e.target.getAttribute("value");
    const newProjectList = jsonData.actualProjects.filter(
      (project) => project.uniqId !== toBeDeleted
    );

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  return (
    <Style>
      <form
        className={classNames("form-container", {
          "display-none": toggleJSON === false,
        })}
        onSubmit={handleSubmit}
        data-testid="form-test"
      >
        {submit && <h1 className="success">{CONSTANTS.SUCCESS_MESSAGE}</h1>}
        <label>
          {CONSTANTS.NAME_INPUT.LABEL}
          <input
            onFocus={() => setNameInputIsFocused(true)}
            onBlur={() => setNameInputIsFocused(false)}
            className="name-input"
            type="text"
            name="name"
            onKeyPress={(e) => {
              e.key === "Enter" && e.preventDefault();
            }}
            onChange={handleNameInputChange}
            value={jsonData.name}
          />
          <p
            className={classNames("error-msg", {
              "display-none":
                jsonData.name.trim() !== "" ||
                nameInputIsFocused ||
                submitClicked === false,
            })}
          >
            {CONSTANTS.NAME_INPUT.REQ_ERROR}
          </p>
        </label>
        <label>
          {CONSTANTS.PROJECTS_INPUT.LABEL}
          <br />
          <div className="tags-and-proj-input">
            {jsonData.projects.map((project) => (
              <span key={uuid()} className="project-tag">
                {project}
                <img
                  className="close-tag"
                  src={closeIcon}
                  alt="close-tag"
                  onClick={removeFromProjects}
                  value={project}
                />
              </span>
            ))}
            <input
              className="tag-input"
              type="text"
              name="name"
              onChange={handleProjectsInputChange}
              value={projectsInput}
              onKeyDown={addingToProjects}
              onKeyPress={(e) => {
                e.key === "Enter" && e.preventDefault();
              }}
            />
          </div>
        </label>
        <p className={"error-msg"}>{projEr}</p>
        <p>
          {CONSTANTS.PROJECT_DETAILS.NAME}
          <span>
            <img
              className="add-icon"
              src={closeIcon}
              alt="add-icon"
              onClick={addProject}
            />
          </span>
        </p>

        <div className="projects-section">
          {jsonData.actualProjects.map((project) => (
            <ProjectDetails
              key={project.uniqId}
              projectId={project.uniqId}
              remove={removeFromProjectsSection}
              jsonData={jsonData}
              setJsonData={setJsonData}
              submitClicked={submitClicked}
            />
          ))}
        </div>
        <FormFooter
          cancel={cancelSubmit}
          toggle={() => setToggleJSON(!toggleJSON)}
          handleSubmit={handleSubmit}
        />
      </form>

      <div
        className={classNames("json-data", {
          "toggle-JSON": toggleJSON,
        })}
      >
        <JsonSection jsonData={jsonData} />
        <FormFooter
          cancel={cancelSubmit}
          toggle={() => setToggleJSON(!toggleJSON)}
          handleSubmit={handleSubmit}
        />
      </div>
    </Style>
  );
}
