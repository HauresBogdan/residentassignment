import Style from "./StyledProjectForm";
import { useState } from "react";
import uuid from "react-uuid";
import closeIcon from "../../media/close.png";
import classNames from "classnames";
import ProjectDetails from "./ProjectDetail/ProjectDetails";
import FormFooter from "./FormFooter/FormFooter";

export default function ProjectForm() {
  const [projectsInput, setProjectsInput] = useState("");
  const [errors, setErrors] = useState({ nameInputEr: "", projectInputEr: "" });
  const [showError, setShowError] = useState(false);
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

    let canBeSubmited = 0;

    if (jsonData.name === "") {
      canBeSubmited++;
    }
    if (jsonData.projects.length === 0) {
      canBeSubmited++;
    }

    if (jsonData.actualProjects.length === 0) {
      canBeSubmited++;
    }

    jsonData.actualProjects.forEach((proj) => {
      if (proj.selectedproject === "") {
        canBeSubmited++;
      }
      if (proj.details === "") {
        canBeSubmited++;
      }
      if (proj.duration === "") {
        canBeSubmited++;
      }
      if (proj.units === "") {
        canBeSubmited++;
      }
      if (isNaN(proj.duration)) {
        canBeSubmited++;
      }
    });

    if (canBeSubmited === 0) {
      setSubmit(true);
    } else setSubmit(false);
  }

  function cancelSubmit() {
    window.location.reload();
  }

  function addingToProjects(e) {
    if (e.key === "Enter") {
      if (projectsInput === "") {
        setShowError(true);
        setTimeout(function () {
          setShowError(false);
        }, 2000);
        return setErrors({
          ...errors,
          projectInputEr: "You didn't introduced any project name",
        });
      }

      if (jsonData.projects.includes(projectsInput)) {
        setShowError(true);
        setTimeout(function () {
          setShowError(false);
        }, 2000);
        setErrors({
          ...errors,
          projectInputEr: "You already added this project",
        });
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
    const newProjectList = jsonData.projects.filter((project) => project !== toBeDeleted);

    setJsonData((prevValues) => ({
      ...prevValues,
      projects: newProjectList,
    }));

    const newProjectDetailList = jsonData.actualProjects.filter((project) => project.selectedproject !== toBeDeleted);

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
    const newProjectList = jsonData.actualProjects.filter((project) => project.uniqId !== toBeDeleted);

    setJsonData((prevValues) => ({
      ...prevValues,
      actualProjects: newProjectList,
    }));
  }

  function toggleView() {
    setToggleJSON(!toggleJSON);
  }

  function nameFocus() {
    setNameInputIsFocused(true);
  }

  function nameBlur() {
    setNameInputIsFocused(false);
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
        {submit && <h1 className="success">ALL GOOD</h1>}
        <label>
          Name:
          <input
            onFocus={nameFocus}
            onBlur={nameBlur}
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
              "display-none": jsonData.name !== "" || nameInputIsFocused || submitClicked === false,
            })}
          >
            Name is requiered
          </p>
        </label>
        <label>
          Projects:
          <br />
          <div className="tags-and-proj-input">
            {jsonData.projects.map((project) => (
              <span key={uuid()} className="project-tag">
                {project}
                <img className="close-tag" src={closeIcon} alt="close-tag" onClick={removeFromProjects} value={project} />
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
        <p
          className={classNames("error-msg", {
            "display-none": showError === false,
          })}
        >
          {errors.projectInputEr}
        </p>
        <p>
          Project Details{" "}
          <span>
            <img className="add-icon" src={closeIcon} alt="add-icon" onClick={addProject} />
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
        <FormFooter cancel={cancelSubmit} toggle={toggleView} handleSubmit={handleSubmit} />
      </form>

      <div
        className={classNames("json-data", {
          "toggle-JSON": toggleJSON,
        })}
      >
        <div className="json-container">
          <h1>JSON</h1>
          <br />

          <h2>
            Name: <span className="proj-item">{jsonData.name}</span>
          </h2>
          <br />
          <p>Projects:</p>
          {jsonData.projects.map((proj) => (
            <p key={uuid()} className="proj-item">
              {proj}
            </p>
          ))}

          <p>Projects Detail:</p>

          {jsonData.actualProjects.map((proj) => (
            <div className="individual-project" key={uuid()}>
              <p>
                Selected: <span className="proj-item"> {proj.selectedproject}</span>{" "}
              </p>
              <p>
                Details: <span className="proj-item"> {proj.details} </span>{" "}
              </p>
              <p>
                Duration: <span className="proj-item"> {proj.duration} </span>{" "}
              </p>
              <p>
                Units: <span className="proj-item"> {proj.units} </span>{" "}
              </p>
              <p>
                UniqId: <span className="proj-item"> {proj.uniqId} </span>{" "}
              </p>
            </div>
          ))}
          <br />
          <p>THE JSON String</p>
          <p className="json-string proj-item">{JSON.stringify(jsonData)}</p>
          <FormFooter cancel={cancelSubmit} toggle={toggleView} handleSubmit={handleSubmit} />
        </div>
      </div>
    </Style>
  );
}
