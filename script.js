// URL de l'API qui fournit les derniers posts du forum freeCodeCamp
const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';

// URL de base pour accéder à un topic du forum
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';

// URL de base pour accéder à une catégorie du forum
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';

// URL de base pour les avatars des utilisateurs
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

// Objet qui mappe les IDs de catégories à leur nom et classe CSS
const allCategories = {
  299: { category: 'Career Advice', className: 'career' },
  409: { category: 'Project Feedback', className: 'feedback' },
  417: { category: 'freeCodeCamp Support', className: 'support' },
  421: { category: 'JavaScript', className: 'javascript' },
  423: { category: 'HTML - CSS', className: 'html-css' },
  424: { category: 'Python', className: 'python' },
  432: { category: 'You Can Do This!', className: 'motivation' },
  560: { category: 'Backend Development', className: 'backend' }
};

// Élément HTML où seront injectés les posts
const postsContainer = document.getElementById('posts-container');

// Exemple pour générer un timestamp ISO
// const timestamp = new Date().toISOString();
// console.log(timestamp); // Exemple : "2025-12-07T17:25:00.000Z"

// Fonction qui calcule le temps écoulé depuis une date donnée
function timeAgo(timestamp) {
  // Convertir en nombre si c'est une chaîne ISO
  const time = typeof timestamp === "string" ? new Date(timestamp).getTime() : timestamp;

  const timeDif = Date.now() - time; // différence en ms
  const min = Math.floor(timeDif / 1000 / 60);
  const hours = Math.floor(min / 60);
  const days = Math.floor(hours / 24);

  if (min < 60) {
    return `${min}m ago`; // moins d'une heure
  } else if (hours < 24) {
    return `${hours}h ago`; // moins d'un jour
  } else {
    return `${days}d ago`; // sinon en jours
  }
}

// Fonction qui formate le nombre de vues (ex: 2730 → "2k")
function viewCount(numberOfViews) {
  if (numberOfViews >= 1000) {
    return `${Math.floor(numberOfViews / 1000)}k`;
  } else {
    return numberOfViews;
  }
}

// Fonction qui génère un lien HTML vers la catégorie du post
function forumCategory(selectedCategoryId) {
  if (allCategories.hasOwnProperty(selectedCategoryId)) {
    const categoryObj = allCategories[selectedCategoryId];
    return `<a class="category ${categoryObj.className}" href="${forumCategoryUrl}${categoryObj.className}/${selectedCategoryId}">${categoryObj.category}</a>`;
  } else {
    // Catégorie par défaut si l'ID n'est pas reconnu
    return `<a class="category general" href="${forumCategoryUrl}general/${selectedCategoryId}">General</a>`;
  }
}

// Fonction qui génère les avatars des posters d'un topic
function avatars(postersArray, usersArray) {
  // Crée une map des utilisateurs par leur ID
  const userMap = Object.fromEntries(usersArray.map(u => [u.id, u]));

  return postersArray.map(p => {
    const user = userMap[p.user_id];
    if (!user) return '';

    // Remplacer {size} par 30 dans le template d'avatar
    let template = user.avatar_template.replace('{size}', 30);

    // Si le chemin est relatif, on ajoute avatarUrl devant
    const src = template.startsWith('/')
      ? `${avatarUrl}${template}`
      : template;

    // Retourne une balise <img> avec src et alt
    return `<img src="${src}" alt="${user.name}" />`;
  }).join('');
};

// Fonction qui construit le tableau HTML des derniers posts
function showLatestPosts(object) {
  const { users, topic_list } = object;
  const topics = topic_list.topics;

  const rows = topics.map(topic => {
    return `
      <tr>
        <td>
          <a class="post-title" href="${forumTopicUrl}${topic.slug}/${topic.id}">
            ${topic.title}
          </a>
          ${forumCategory(topic.category_id)}
        </td>
        <td>
          <div class="avatar-container">${avatars(topic.posters, users)}</div>
        </td>
        <td>${topic.posts_count - 1}</td> <!-- nombre de réponses -->
        <td>${viewCount(topic.views)}</td> <!-- nombre de vues -->
        <td>${timeAgo(topic.bumped_at)}</td> <!-- temps écoulé -->
      </tr>
    `;
  }).join('');

  // Injecte toutes les lignes dans le container
  postsContainer.innerHTML = rows;
}

// Fonction asynchrone qui récupère les données du forum
async function fetchData() {
  try {
    const response = await fetch(forumLatest); // requête HTTP
    const data = await response.json();        // parse en JSON
    showLatestPosts(data);                     // affiche les posts
  } catch (error) {
    console.log(error);                        // log en cas d'erreur
  }
}
