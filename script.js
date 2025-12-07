const forumLatest =
  'https://cdn.freecodecamp.org/curriculum/forum-latest/latest.json';
const forumTopicUrl = 'https://forum.freecodecamp.org/t/';
const forumCategoryUrl = 'https://forum.freecodecamp.org/c/';
const avatarUrl = 'https://cdn.freecodecamp.org/curriculum/forum-latest';

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

// const timestamp = new Date().toISOString();
// console.log(timestamp); 
// Example output: "2025-12-07T17:25:00.000Z"


function timeAgo(timestamp) {
  const timeDif = Date.now() - timestamp; //différence en ms
  const min = Math.floor(timeDif/1000/60);
  const hours = Math.floor(min/60);
  const days = Math.floor(hours/24);

  if(min < 60) {
    return `${min}m ago`;
  } else if(hours < 24) {
    return `${hours}h ago`;
  } else {
    return `${days}d ago`;
  }
}

function viewCount(numberOfViews) {
  if(numberOfViews >= 1000) {
    return `${Math.floor(numberOfViews/1000)}k`
  } else {
    return numberOfViews;
  }
}

function forumCategory(selectedCategoryId) {
  if (allCategories.hasOwnProperty(selectedCategoryId)) {
    const categoryObj = allCategories[selectedCategoryId];
    return `<a class="category ${categoryObj.className}" href="${forumCategoryUrl}${categoryObj.className}/${selectedCategoryId}">${categoryObj.category}</a>`;
;
  } else {
    return `<a class="category general" href="${forumCategoryUrl}general/${selectedCategoryId}">General</a>`;
  }
}

function avatars(postersArray, usersArray) {
  
}
