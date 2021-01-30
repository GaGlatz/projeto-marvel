const keyPublic = '957d8f2a43c00923fd34c24674ec038b';
const keyPrivate = '725ceac1279acebcd092b3e404533bcaabc0bbdb';
const currentTime = new Date().getTime().toString();
const hash = md5(currentTime + keyPrivate + keyPublic);
const pageSize = 12;
let offset = 0;
let totalPages = 0;
let lastOffset = 0;
let amoutLast = 0;//quantidade de personagens da ultima página.

function firstPage() {
        if (offset >= pageSize) {
                if (offset == lastOffset) {
                        for (let i = 0; i < amoutLast; i++) {
                                let cardEl = document.getElementById(`card${i}`);
                                
                                cardEl.parentNode.removeChild(cardEl);
                        }      
                } else {
                        for (let i = 0; i < pageSize; i++) {
                                let cardEl = document.getElementById(`card${i}`);
                                
                                cardEl.parentNode.removeChild(cardEl);
                        }     
                }

                offset = 0;
                fetch(`http://gateway.marvel.com/v1/public/characters?ts=${currentTime}&apikey=${keyPublic}&hash=${hash}&limit=${pageSize}&orderBy=-modified&offset=${offset}`)
                        .then(async (res) => (await res.json()).data)
                        .then(function({ results }) {
                                for (let i = 0; i < results.length; i++) {
                                        let { description, name, thumbnail } = results[i];
                                        let imageSrc = `${thumbnail.path}.${thumbnail.extension}`;

                                        createNewCard(imageSrc, name, description, i);
                                }
                        });
        }
}

function previousPage() {
        if (offset >= pageSize) {
                if (offset == lastOffset) {
                        for (let i = 0; i < amoutLast; i++) {
                                let cardEl = document.getElementById(`card${i}`);
                                
                                cardEl.parentNode.removeChild(cardEl);
                        }      
                } else {
                        for (let i = 0; i < pageSize; i++) {
                                let cardEl = document.getElementById(`card${i}`);
                                
                                cardEl.parentNode.removeChild(cardEl);
                        }     
                }

                offset -= pageSize;
                fetch(`http://gateway.marvel.com/v1/public/characters?ts=${currentTime}&apikey=${keyPublic}&hash=${hash}&limit=${pageSize}&orderBy=-modified&offset=${offset}`)
                        .then(async (res) => (await res.json()).data)
                        .then(function({ results }) {
                                for (let i = 0; i < results.length; i++) {
                                        let { description, name, thumbnail } = results[i];
                                        let imageSrc = `${thumbnail.path}.${thumbnail.extension}`;

                                        createNewCard(imageSrc, name, description, i);
                                }
                        });
        }
}

function nextPage() {
        if (offset < lastOffset) {
                if (offset == lastOffset) {
                        for (let i = 0; i < amoutLast; i++) {
                                let cardEl = document.getElementById(`card${i}`);
                                
                                cardEl.parentNode.removeChild(cardEl);
                        }      
                } else {
                        for (let i = 0; i < pageSize; i++) {
                                let cardEl = document.getElementById(`card${i}`);
                                
                                cardEl.parentNode.removeChild(cardEl);
                        }     
                }

                offset += pageSize;
                fetch(`http://gateway.marvel.com/v1/public/characters?ts=${currentTime}&apikey=${keyPublic}&hash=${hash}&limit=${pageSize}&orderBy=-modified&offset=${offset}`)
                        .then(async (res) => (await res.json()).data)
                        .then(function({ results }) {
                                for (let i = 0; i < results.length; i++) {
                                        let { description, name, thumbnail } = results[i];
                                        let imageSrc = `${thumbnail.path}.${thumbnail.extension}`;

                                        createNewCard(imageSrc, name, description, i);
                                }
                        });
        }
}

function lastPage() {
        if (offset < lastOffset) {
                for (let i = 0; i < pageSize; i++) {
                        let cardEl = document.getElementById(`card${i}`);

                        cardEl.parentNode.removeChild(cardEl);
                }

                offset = lastOffset;
                fetch(`http://gateway.marvel.com/v1/public/characters?ts=${currentTime}&apikey=${keyPublic}&hash=${hash}&limit=${pageSize}&orderBy=-modified&offset=${offset}`)
                        .then(async (res) => (await res.json()).data)
                        .then(function({ results }) {
                                for (let i = 0; i < results.length; i++) {
                                        let { description, name, thumbnail } = results[i];
                                        let imageSrc = `${thumbnail.path}.${thumbnail.extension}`;

                                        createNewCard(imageSrc, name, description, i);
                                }
                        });
        }
}

function createNewCard(imageSrc, name, description, index) {
        const containerEl = document.getElementById('container');
        let cardEl = document.createElement('div');
        let contentEl = document.createElement('div');
        let imageEl = document.createElement('img');
        let nameEl = document.createElement('p');
        let descriptionEl = document.createElement('p');

        imageEl.src = imageSrc;
        nameEl.textContent = name;
        descriptionEl.textContent = description;

        cardEl.appendChild(imageEl);
        cardEl.appendChild(contentEl);
        contentEl.appendChild(nameEl);
        contentEl.appendChild(descriptionEl);
        containerEl.appendChild(cardEl);

        cardEl.setAttribute('class', 'card');
        imageEl.setAttribute('class', 'card__image');
        contentEl.setAttribute('class', 'card__content');
        nameEl.setAttribute('class', 'card__title');
        descriptionEl.setAttribute('class', 'card__description');
        cardEl.setAttribute('id', 'card' + index);
        imageEl.setAttribute('id', 'card__image' + index);
        nameEl.setAttribute('id', 'card__title' + index);
        descriptionEl.setAttribute('id', 'card__description' + index);
}

fetch(`http://gateway.marvel.com/v1/public/characters?ts=${currentTime}&apikey=${keyPublic}&hash=${hash}&limit=${pageSize}&orderBy=-modified&offset=0`)
        .then(async (res) => (await res.json()).data)
        .then(function({ results, total }) {                
                totalPages = Math.ceil(total / pageSize);
                lastOffset = (totalPages - 1) * pageSize;
                amoutLast = total - lastOffset;

                for (let i = 0; i < results.length; i++) {
                        let { description, name, thumbnail } = results[i];
                        let imageSrc = `${thumbnail.path}.${thumbnail.extension}`;

                        createNewCard(imageSrc, name, description, i);      
                }
        });
