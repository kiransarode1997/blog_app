function addBlogPost() {
  var title = document.getElementById("title").value;
  var description = document.getElementById("description").value;

  // Get the image URL or handle file upload
  var imageInput = document.getElementById("image");
  var imageUrl = imageInput.value;

  var fileInput = document.getElementById("file");
  var file = fileInput.files[0];

  if (!imageUrl && !file) {
    alert("Please enter an image URL or upload an image.");
    return;
  }

  var imageUrlToUse = imageUrl;

  if (file) {
    imageUrlToUse = URL.createObjectURL(file);
  }

  var postId = "post_" + Date.now();
  var post = {
    title: title,
    image: imageUrlToUse,
    description: description,
  };

  localStorage.setItem(postId, JSON.stringify(post));
  document.getElementById("title").value = "";
  document.getElementById("image").value = "";
  document.getElementById("description").value = "";
  document.getElementById("file").value = "";

  displayBlogPosts();
}

function displayBlogPosts() {
  var blogPostsDiv = document.getElementById("blog-posts");
  blogPostsDiv.innerHTML = "";

  for (var i = 0; i < localStorage.length; i++) {
    var postId = localStorage.key(i);
    var post = JSON.parse(localStorage.getItem(postId));

    var postDiv = document.createElement("div");
    postDiv.classList.add("blog-post");

    var titleHeading = document.createElement("h2");
    titleHeading.textContent = post.title;

    var imageElement = document.createElement("img");
    imageElement.src = post.image;
    imageElement.alt = post.title;

    var descriptionParagraph = document.createElement("p");
    descriptionParagraph.textContent = post.description;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn");
    deleteButton.onclick = function () {
      deleteBlogPost(postId);
    };

    var editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn");
    editButton.onclick = function () {
      editBlogPost(postId);
    };

    var btnGroup = document.createElement("div");
    btnGroup.classList.add("btn-group");
    btnGroup.appendChild(deleteButton);
    btnGroup.appendChild(editButton);

    postDiv.appendChild(titleHeading);
    postDiv.appendChild(imageElement);
    postDiv.appendChild(descriptionParagraph);
    postDiv.appendChild(btnGroup);

    blogPostsDiv.appendChild(postDiv);
  }
}

function deleteBlogPost(postId) {
  localStorage.removeItem(postId);
  displayBlogPosts();
}

function editBlogPost(postId) {
  var post = JSON.parse(localStorage.getItem(postId));
  var newTitle = prompt("Enter a new title:", post.title);
  var newDescription = prompt("Enter a new description:", post.description);

  if (newTitle !== null && newDescription !== null) {
    post.title = newTitle;
    post.description = newDescription;
    localStorage.setItem(postId, JSON.stringify(post));
    displayBlogPosts();
  }
}

displayBlogPosts();
