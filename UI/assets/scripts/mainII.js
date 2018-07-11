const modal = document.getElementById('page-modal');
const btn = document.getElementById('edit-btn');
const mainDiv = document.getElementById('main-div');
const closeBtn = this.document.getElementById('close');
btn.onclick = function () {
  modal.style.display = "block";
  mainDiv.style.backgroundColor = "rgba(210, 200, 200, 0.6)";
}

closeBtn.onclick = function () {
  modal.style.display = "none";
  mainDiv.style.backgroundColor = "#266189"
}
