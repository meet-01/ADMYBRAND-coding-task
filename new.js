const formElement = document.querySelector("form");
const form = {
  title: "",
  body: "",
  selectedUserId: 0,
  users: [],
};

formElement.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (form.selectedUserId === 0) {
    alert("Select a user or die");
    return;
  }
  // const { users, title, body } = formElement.elements;
  const dataToSend = {
    title: form.title,
    body: form.body,
    userId: form.selectedUserId,
  };
  const response = await createPost(dataToSend);
  console.log(response);
});

document.querySelector("#title").addEventListener("change", (e) => {
  form.title = e.target.value;
});

document.querySelector("#body").addEventListener("change", (e) => {
  form.body = e.target.value;
});

document.querySelector("#users").addEventListener("change", (e) => {
  console.log(e.target.value);
  form.selectedUserId = Number(e.target.value);
  console.log(form);
});

const API_URL = "https://jsonplaceholder.typicode.com/";

const fetchJson = async (endpoint = "", options = {}) => {
  try {
    const response = await fetch(API_URL + endpoint, options);
    console.log(response);
    const data = await response.json();
    return [data, null];
  } catch (error) {
    console.error(error);
    return [null, error];
  }
};

const createPost = async ({ title = "", body = "", userId = 0 }) => {
  const [data, error] = await fetchJson("posts", {
    method: "POST",
    body: JSON.stringify({
      title,
      body,
      userId,
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
  return data;
};

const fetchUsers = async () => {
  const [data, error] = await fetchJson("users");
  console.log({ data, error });
  return data || [];
};

const updateUsers = async () => {
  const fetchedUsers = await fetchUsers();
  const filteredUsers = fetchedUsers.map(({ id, name }) => ({ id, name }));
  form.users = filteredUsers;

  const usersElement = document.querySelector("#users");
  filteredUsers.forEach((user) => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    usersElement.appendChild(option);
  });
};
updateUsers();
