function set_page_info_verifier_cms_modify(){
  // Params
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  var task = urlParams.get("task")

  var obj_task = get_task_info(task);
  console.log(JSON.stringify(obj_task));
}

// Params
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
var uuid = urlParams.get("task")


let settings = {
  "url": `${HOST_URL_TPLANET_DAEMON}/tasks/get/${uuid}`,
  "method": "GET",
  "timeout": 0,
  "processData": false,
  "mimeType": "multipart/form-data",
  "contentType": false,
};

$.ajax(settings).done(async function (res) {
  const obj = JSON.parse(res);
  await renderTask(obj);
});

function renderTask(taskData){

  console.log(JSON.stringify(taskData));
  const cover = document.getElementById('cover');
  const taskName = document.getElementById('taskName');
  const taskContent = document.getElementById('taskContent');
  const coverContent = `<img class="img-fluid" src=${HOST_URL_TPLANET_DAEMON}${taskData.thumbnail} alt="">`
  cover.innerHTML = coverContent;
  taskName.value = taskData.name;
  taskContent.textContent = taskData.overview;
  document.getElementById('token').value = taskData.token;
}