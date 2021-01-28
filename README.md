# Building user projects form

Context
Let's build a form for people who needs to fill in info about previous projects.
Users should be able to use this form to save the information about themself
and project which he/she worked on.

## Project assignment located at:

https://github.com/HauresBogdan/residentassignment/blob/master/assignment.pdf

### LIVE web deployment:

https://residentassignment.netlify.app/

### Remarks

# npm run start
# npm run tests

Inputs, textareas, selects validated to pe required/selected.
Projects can be added while typing on projects input and hitting enter.
First, it checks if the project name already exists before adding it.
If it exists then a message will appear for a short amount of time notifying that you already added this project.
Also if no name added before pressing enter a validation message will appear for a short notice saying that "You didn't introduce any project name".
Duration inbox validated to be required number and not 0.

The project selector in project details gets options from entered Projects section.
Users can have more project details about the same project for example a user worked on a project "Resident Website" as a front-end developer with a duration of 4 months and on the same project as a back-end developer for 5 months. Also in this example, if the tag associated with project "Resident Website" is deleted all 2 positions associated with this project will also be deleted.    
