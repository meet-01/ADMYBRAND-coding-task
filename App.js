const formvalues = {
  title: "",
  body: "",
  selectedUserId: 0,
};

const title = document.getElementById("title");
const body = document.getElementById("body");
const form = document.getElementById("form");
const submit = document.getElementById("submitbutton");
const selectoption = document.getElementById("selectuser");

selectoption.addEventListener("change", (e) => {
  formvalues.selectedUserId = Number(e.target.value);
});

form.addEventListener("change", function (e) {
  e.preventDefault();
});

title.addEventListener("change", function (e) {
  e.preventDefault();

  formvalues.title = title.value;
});

body.addEventListener("change", function (e) {
  e.preventDefault();

  formvalues.body = body.value;
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  if (formvalues.selectedUserId === 0) {
    alert("Select a user in order to create a Post");
    return;
  }

  const dataToSend = {
    title: formvalues.title,
    body: formvalues.body,
    userId: formvalues.selectedUserId,
  };
  const response = await createPost(dataToSend);
  console.log(response);
});

//getting users for select option
const fetchedUsers = async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    alert("failed HTTPs request for fetching users");
  }
};

let fetchedusers2;

const updateUsers = async () => {
  fetchedusers2 = await fetchedUsers();
  fetchedusers2.forEach((user) => {
    const option = document.createElement("option");

    option.value = user.id;
    option.textContent = user.name;
    selectoption.appendChild(option);
  });
};

updateUsers();

//removing id

//fteching json data for creating post

const createPost = async ({ title = "", body = "", userId = 0 }) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
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
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    alert("failed HTTPs request for creating Post");
  }
};
