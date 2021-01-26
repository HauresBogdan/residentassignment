import Style from "./StyledProjectForm";
import { useState } from "react";
import uuid from "react-uuid";
import closeIcon from "../../media/close.png";
import classNames from "classnames";
import ProjectDetails from "./ProjectDetail/ProjectDetails";
import FormFooter from "./FormFooter/FormFooter";

export default function ProjectForm() {
  const [projects, setProjects] = useState([]);
  const [projectsInput, setProjectsInput] = useState("");
  const [errors, setErrors] = useState({ nameInputEr: "", projectInputEr: "" });
  const [nameInput, setNameInput] = useState("");
  const [projectsArr, setProjectsArr] = useState([]);
  const [showError, setShowError] = useState(false);

  function handleProjectsInputChange(e) {
    const projectsInputValue = e.target.value;
    setProjectsInput(projectsInputValue);
  }

  function handleNameInputChange(e) {
    const nameInputValue = e.target.value;
    setNameInput(nameInputValue);
  }

  function addingToProjects(e) {
    if (e.key === "Enter") {
      if (projectsInput === "") {
        setShowError(true);
        setTimeout(function () {
          setShowError(false);
        }, 2000);
        return setErrors({ ...errors, projectInputEr: "You didn't introduced any project name" });
      }

      if (projects.includes(projectsInput)) {
        setShowError(true);
        setTimeout(function () {
          setShowError(false);
        }, 2000);
        setErrors({ ...errors, projectInputEr: "You already added this project" });
      } else {
        setProjects((prevValues) => [...prevValues, projectsInput]);
      }

      setProjectsInput("");
    }
  }

  function removeFromProjects(e) {
    const toBeDeleted = e.target.getAttribute("value");
    const newProjectList = projects.filter((project) => project !== toBeDeleted);
    setProjects(newProjectList);

    const newProjectDetailList = projectsArr.filter((project) => project.selectedproject !== toBeDeleted);
    setProjectsArr(newProjectDetailList);
  }

  function addProject() {
    const uniqId = uuid();
    setProjectsArr((prevValues) => [...prevValues, { uniqId: uniqId, selectedproject: "" }]);
  }

  function removeFromProjectsSection(e) {
    const toBeDeleted = e.target.getAttribute("value");
    const newProjectList = projectsArr.filter((project) => project.uniqId !== toBeDeleted);
    setProjectsArr(newProjectList);
  }

  return (
    <Style>
      <form className="form-container">
        <label>
          Name:
          <input className="name-input" type="text" name="name" onChange={handleNameInputChange} value={nameInput} />
        </label>
        <label>
          Projects:
          <br />
          <div className="tags-and-proj-input">
            {projects.map((project) => (
              <span key={uuid()} className="project-tag">
                {project}
                <img className="close-tag" src={closeIcon} alt="close-tag" onClick={removeFromProjects} value={project} />
              </span>
            ))}
            <input className="tag-input" type="text" name="name" onChange={handleProjectsInputChange} value={projectsInput} onKeyDown={addingToProjects} />
          </div>
        </label>
        <p className={classNames("error-msg", { "display-none": showError === false })}>{errors.projectInputEr}</p>
        <p>
          Project Details{" "}
          <span>
            <img className="add-icon" src={closeIcon} alt="add-icon" onClick={addProject} />
          </span>
        </p>

        <div className="projects-section">
          {projectsArr.map((project) => (
            <ProjectDetails
              key={project.uniqId}
              projects={projects}
              projectId={project.uniqId}
              remove={removeFromProjectsSection}
              setProjectsArr={setProjectsArr}
              projectsArr={projectsArr}
            />
          ))}
        </div>
        <FormFooter />
      </form>
    </Style>
  );
}
