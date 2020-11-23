
// Class for handling the manipulation of the html DOM
class Renderer {
    static setProfile(data) {
        document.getElementById('avatar').src = data.avatar_url;
        document.getElementById('full-name').innerHTML = data.name;
        document.getElementById('login').innerHTML = data.login;
        document.getElementById('bio').innerHTML = data.bio;

        document.getElementById('mini-avatar').src = data.avatar_url
        document.getElementById('mini-login').innerHTML = data.login
    }

    static setRepos(arrayOfRepos) {
        const parentDiv = document.getElementById('repo-section');

        arrayOfRepos.forEach(element => {
            parentDiv.appendChild(Renderer.setchildElement(element));
        });
    }

    static setchildElement(repoData) {
        // The first container
        const container = document.createElement('div');
        container.classList.add('repo-overview', 'row');

        // create first div inside the containe
        const firstDiv = document.createElement('div');
        firstDiv.classList.add('col-s-9');

        // create first span that contains title of repo
        const titleOfRepo = document.createElement('span');
        titleOfRepo.classList.add('h5', 'repo-title');
        titleOfRepo.innerHTML = repoData.name;
        firstDiv.appendChild(titleOfRepo);

        // create first span that contains title of repo
        const descripotionOfRepo = document.createElement('small');
        descripotionOfRepo.classList.add('d-block', 'repo-description');
        descripotionOfRepo.innerHTML = repoData.description;
        firstDiv.appendChild(descripotionOfRepo);

        // language icon and name
        const languageIcon = document.createElement('i')
        languageIcon.classList.add('fas', 'fa-circle');
        firstDiv.appendChild(languageIcon);

        // Language
        const languageName = document.createElement('small')
        languageName.classList.add('language');
        languageName.innerHTML = repoData.language
        firstDiv.appendChild(languageName);

        // date created
        const dateCreated = document.createElement('small');
        const dateCreatedObj = new Date(repoData.created_at);
        dateCreated.innerHTML = 'updated ' + dateCreatedObj.toDateString();
        firstDiv.appendChild(dateCreated);

        // second div
        const seconDiv = document.createElement('div');
        seconDiv.classList.add('col-s-3', 'star');

        // button for the start
        const starButton = document.createElement('button');

        // Word to
        const starWord = document.createElement('span')
        starWord.innerHTML = 'star '

        // Star icon
        const starIcon = document.createElement('i')
        starIcon.classList.add('fas', 'fa-star');

        starButton.appendChild(starWord);
        starButton.appendChild(starIcon);

        seconDiv.appendChild(starButton);

        container.appendChild(firstDiv);
        container.appendChild(seconDiv);

        return container;
    }

    static listenAndToggleMobileMenu() {
        const menuIcon = document.getElementById('mobile-menu');
        const dropDownMenu = document.getElementById('mobile-dropdown-menu');

        menuIcon.onclick = () => {
            if (dropDownMenu.style.display === 'none') {
                dropDownMenu.style.display = 'block'
            } else {
                dropDownMenu.style.display = 'none'
            }
        };
    }
}

// Class for making request to the front
class HttpClient {
    username = 'perez247'
    apiUrl = 'https://api.github.com';

    getAndSetUserProfile() {
        fetch(`${this.apiUrl}/users/${this.username}`)
        .then((res) => {
            res.json().then(x => {
                console.log(x)
                Renderer.setProfile(x);
            })
        })
        .catch((error => {
            console.log(error);
        }));
    }

    getAndSetRepos() {
        fetch(`${this.apiUrl}/users/${this.username}/repos`)
        .then((res) => {
            // console.log(res.json())
            const response = res.json().then(x => {
                Renderer.setRepos(x);
            })
        })
        .catch((error => {
            console.log(error);
        }));
    }
}

// Class to start the javascript application
class Bootstrap {

    static initialize() {
        // create the new instant
        const http = new  HttpClient();

        // Get the user profile
        http.getAndSetUserProfile();

        // Get and set repos
        http.getAndSetRepos();

        // Listen to mobile menu
        Renderer.listenAndToggleMobileMenu();
    }

    static onReady(action){/in/.test(document.readyState)?setTimeout('r('+action+')',9):action()}

}


Bootstrap.onReady(Bootstrap.initialize());



