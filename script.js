document.getElementById('getDataButton').addEventListener('click', getDataFromExternalAPI);


function getDataFromExternalAPI() {
  fetch('https://randomuser.me/api/?results=20')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response problem');
      }
      return response.json();
    })
    .then(data => {
      if (Array.isArray(data.results)) {
        displayData(data.results);
        showSuccessMessage();
      } else {
        throw new Error('Дані не масив');
      }
    })
    .catch(error => {
      console.error('Виникла помилка:', error);
    });
}

function displayData(users) {
    const usersContainer = document.querySelector('.usersContainer');
    usersContainer.innerHTML = '';

    let usersRow;

    users.forEach((user, index) => {
      if (index % 5 === 0) {
        usersRow = document.createElement('div');
        usersRow.classList.add('usersRow');
      }

      const userCard = document.createElement('div');
      userCard.classList.add('userCard');
      userCard.innerHTML = `
        <img src="${user.picture.large}" alt="Avatar">
        <p>Ім'я: ${user.name.first} ${user.name.last}</p>
        <p>Місто: ${user.location.city}</p>
        <p>Поштовий індекс: ${user.location.postcode}</p>
        <p>Номер телефону: ${user.cell}</p>
      `;

      usersRow.appendChild(userCard);

      if ((index + 1) % 5 === 0 || index === users.length - 1) {
        usersContainer.appendChild(usersRow);
      }
    });
  }
function showSuccessMessage() {
    const successMessage = document.querySelector('.successMessage');
    successMessage.style.display = 'block';
  }