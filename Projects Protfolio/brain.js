
// Initilize global variable
const target_Div = document.querySelector(".appendable-div");
const project_Count = document.querySelector("#project-count");
let project_number = 0;


// create Project class
class Project {
    constructor(projectName, AuthorName, Technology, githubLink, Description) {
        this.projectName = projectName;
        this.AuthorName = AuthorName;
        this.Technology = Technology;
        this.Github = githubLink;
        this.Description = Description;
    }
}








class UI {


    static UpdateLocalProjectCount() {
        project_number = JSON.parse(localStorage.getItem("pro"));
        if (project_number === null) {
            project_Count.innerHTML = 0;
        }
        else {
            project_Count.innerHTML = project_number;
        }

    }


    static UpdataProjectCount(project_number) {
        // console.log(pro_number)
    //    console.log(project_number)
        localStorage.setItem("pro", JSON.stringify(project_number));
        UI.UpdateLocalProjectCount();
    }




    static DisplayProjects() {
        target_Div.innerHTML = ""
        let extracted_projects = setLocalStorage.getLocal();
        extracted_projects.forEach(element => {
            UI.addProject(element);
        });
    }


    static addProject(ProjectObject) {
        let div = document.createElement("div");
        div.className = "project-card";
        div.innerHTML = `<div class="card-head">
        <h1 class="about-project">${ProjectObject.projectName}</h1>
        <p class="Authorname">${ProjectObject.AuthorName}</p>
        <p class="technology">${ProjectObject.Technology}</p>
        <p class="github"><a href="${ProjectObject.Github}" target="_blank">${ProjectObject.Github}</a></p>
        <p class="about">${ProjectObject.Description}</p>
    </div>
    <div class="card-foot">
        <button id="edit" data-toggle="modal" data-target="#addproject" type="submit">Edit</button>
        <button id="delete" type="delete">Delete</button>
    </div>`

        target_Div.appendChild(div)
    }


    static clearInputfields() {
        document.querySelector("#projectName").value = "";
        document.querySelector("#authorName").value = "";
        document.querySelector("#technology").value = "";
        document.querySelector("#github").value = "";
        document.querySelector("#descep").value = "";
    }


    static deleteProjectCard(data) {
        // console.log(data)
        data.remove();
    }

}


class setLocalStorage {
    static getLocal() {
        let projects;
        if (localStorage.getItem("project") === null) {
            projects = [];
        }
        else {
            projects = JSON.parse(localStorage.getItem("project"));

        }
        return projects;
    }

    static addLocalProjects(pro) {
        let projects = setLocalStorage.getLocal();
        // console.log(projects)
        projects.push(pro);
        localStorage.setItem("project", JSON.stringify(projects));

    }
    
    static deletFromLocal(key) {
        let getLocalStorageData = setLocalStorage.getLocal();
        // console.log(getLocalStorageData)
        getLocalStorageData.forEach((element,index) => {
           if(element.projectName === key) {
                getLocalStorageData.splice(index,1);
           }
        });
        localStorage.setItem("project",JSON.stringify(getLocalStorageData));
    }

}

document.addEventListener("DOMContentLoaded", UI.DisplayProjects);
document.addEventListener("DOMContentLoaded", UI.UpdateLocalProjectCount);




function addProjectIntheGallryList(e) {
    let P_name = document.querySelector("#projectName").value;
    let A_name = document.querySelector("#authorName").value;
    let Technology = document.querySelector("#technology").value;
    let Github = document.querySelector("#github").value;
    let Description = document.querySelector("#descep").value;

    if (P_name === "" || A_name === "" || Technology === "" || Github === "" || Description === "") {
        alert("Opps there is no data to add");
    }
    else {
        let ProjectObj = new Project(P_name, A_name, Technology, Github, Description);
        // console.log(ProjectObj)
        UI.addProject(ProjectObj);

        setLocalStorage.addLocalProjects(ProjectObj);

        UI.UpdataProjectCount(++project_number);

        UI.clearInputfields();

    }

}







document.querySelector("#add-project").addEventListener("click", addProjectIntheGallryList);




function addDescription() {


    let div = document.createElement("div");
    div.className = "paragraph";
    div.innerHTML = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, explicabo. Earum aliquid quos, a ipsam sit aut fugiat molestiae atque dignissimos officia reiciendis nostrum. Enim minus ratione velit suscipit nulla consequuntur excepturi repudiandae dolore reprehenderit inventore molestias voluptas error blanditiis reiciendis pariatur aliquid libero itaque, veritatis asperiores facilis aut aspernatur? Iste architecto modi cumque iure nostrum! Odit repudiandae optio illum debitis numquam nemo est iusto nulla fuga, perspiciatis officiis consequuntur accusantium porro pariatur quaerat facere! Et molestiae debitis ex impedit facere quae voluptatum voluptatibus eius eaque suscipit dolorem accusantium dignissimos obcaecati nesciunt quod sit, repellat error labore doloribus maiores esse!z`

    target_Div.innerHTML = "";

    target_Div.appendChild(div);
}


function addAboutMeSection() {
    let div = document.createElement("div");
    div.className = "paragraph";
    div.innerHTML = `Lorem ipsum dolor sit, amet consectetur adipisicing elit. Harum, explicabo. Earum aliquid quos, a ipsam sit aut fugiat molestiae atque dignissimos officia reiciendis nostrum. Enim minus ratione velit suscipit nulla consequuntur excepturi repudiandae dolore reprehenderit inventore `;

    target_Div.innerHTML = "";

    target_Div.appendChild(div);

}



document.querySelector(".dashbord").addEventListener("click", function (e) {
    if (e.target.classList.contains("descrip")) {
        addDescription();
    }
    else if (e.target.classList.contains("pro_gallry")) {
        UI.DisplayProjects()
    }
    else if (e.target.classList.contains("about-Me")) {
        addAboutMeSection();
    }
})





document.querySelector(".appendable-div").addEventListener("click", function (e) {
    // console.log(e.target)
    if (e.target.id === "edit") {

        let heading = e.target.parentElement.parentElement.children[0].children[0].textContent;
        let name = e.target.parentElement.parentElement.children[0].children[1].textContent;
        let tech = e.target.parentElement.parentElement.children[0].children[2].textContent;
        let git = e.target.parentElement.parentElement.children[0].children[3].textContent;
        let p_info = e.target.parentElement.parentElement.children[0].children[4].textContent;

        document.querySelector("#projectName").value = heading;
        document.querySelector("#authorName").value = name;
        document.querySelector("#technology").value = tech;
        document.querySelector("#github").value = git;
        document.querySelector("#descep").value = p_info;
        // console.log(project_number);
        UI.UpdataProjectCount(--project_number)
        UI.deleteProjectCard(e.target.parentElement.parentElement);
        setLocalStorage.deletFromLocal(e.target.parentElement.parentElement.children[0].children[0].textContent);


    }
    else if (e.target.id === "delete") {
        UI.deleteProjectCard(e.target.parentElement.parentElement);
        UI.UpdataProjectCount(--project_number)
       setLocalStorage.deletFromLocal(e.target.parentElement.parentElement.children[0].children[0].textContent);
    }
})