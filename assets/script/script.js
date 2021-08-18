$(document).ready(function () {
    var submit = document.getElementById("submit");
    var openRegister = document.getElementById("open-register");
    var participationBlock = document.getElementById("participation-block");
    if (openRegister)
        openRegister.onclick = function () {
            participationBlock.style.display = "flex";
            openRegister.style.display = "none";
        }
    if (submit)
        submit.onclick = function () {
            $('form')?.submit(function (e) {
                e.preventDefault();
                var $form = $(this);

                var x = document.forms["Form-request"]["description"].value;
                var y = document.forms["Form-request"]["upload-photo"].value;
                if (x == "" || y=='') {
                    alert("Все поля должны быть заполнены");
                    return false;
                }else {
                    $.ajax({
                        type: $form.attr('method'),
                        url: $form.attr('action'),
                        data: $form.serialize()
                    }).done(function () {
                        alert('Заявка успешно отправлена');
                    }).fail(function () {
                        alert('Произошла ошибка');
                    });
                    //отмена действия по умолчанию для кнопки submit
                }
            });
        }
    if(document.getElementById('editor'))
        var quill = new Quill('#editor', {
            theme: 'snow'
        });
});


function toggleAuth() {
    let container = $(".auth-container")[0];
    container.classList.toggle('open');
    container.classList.toggle('closed');
    $('.auth-form').slideToggle();
}



const mobBurgerButton = document.querySelector('#mobBurgerIco');
const mobBurgerMenu = document.querySelector('.mobHeaderWrapper')
const mobBurgerMenuNav = document.querySelector('.mobHeader')
const header = document.querySelector('.header')
mobBurgerButton?.addEventListener('click', () => {
    mobBurgerButton.classList.toggle('open')
    if (mobBurgerButton.classList.contains('open')) {
        mobBurgerMenu.classList.remove('hide')
        mobBurgerMenuNav.classList.add('slide-right');
        mobBurgerMenuNav.classList.remove('slide-left');
    }
    else{
        mobBurgerMenu.classList.add('hide')
        mobBurgerMenuNav.classList.add('slide-left');
        mobBurgerMenuNav.classList.remove('slide-right');
    }
})
mobBurgerMenu?.addEventListener('click', () => {
    mobBurgerButton.classList.toggle('open')
    if (mobBurgerButton.classList.contains('open')) {
        mobBurgerMenu.classList.remove('hide')
        mobBurgerMenuNav.classList.add('slide-right');
        mobBurgerMenuNav.classList.remove('slide-left');
    }
    else{
        mobBurgerMenu.classList.add('hide')
        mobBurgerMenuNav.classList.add('slide-left');
        mobBurgerMenuNav.classList.remove('slide-right');
    }
})


const uploadArea = document.querySelector(".uploadArea"),
form = document.querySelector("form"),
fileInput = document.querySelector(".file-input"),
progressArea = document.querySelector(".progress-area"),
uploadedArea = document.querySelector(".uploaded-area");
uploadArea?.addEventListener("click", () =>{
  fileInput.click();
});
if(fileInput)
fileInput.onchange = ({target})=>{
  let file = target.files[0];
  if(file){
    let fileName = file.name;
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
}
function uploadFile(name){
  let xhr = new XMLHttpRequest();
  xhr.open("POST", "php/upload.php");
  xhr.upload?.addEventListener("progress", ({loaded, total}) =>{
    let fileLoaded = Math.floor((loaded / total) * 100);
    let fileTotal = Math.floor(total / 1000);
    let fileSize;
    (fileTotal < 1024) ? fileSize = fileTotal + " KB" : fileSize = (loaded / (1024*1024)).toFixed(2) + " MB";
    let progressHTML = `<div class="uploadedFile">
                        <div class="progressWrapper">
                          <div class="fileWrapper">
                            <img src="images/file.svg" alt="">
                            <p>${name}</p>
                            
                          </div>
                          <div class="progressCheck">
                            <img src="images/fileUpload.svg" alt="">
                            <p>${fileLoaded}%</p>
                          </div>
                        </div>
                        <div class="progressBar">
                          <div class="fillProgress" style="width: ${fileLoaded}%">
                            
                          </div>
                        </div>
                      </div>`;
                        console.log(fileLoaded)
    uploadedArea.classList.add("onprogress");
    progressArea.innerHTML = progressHTML;
    if(loaded == total){
      progressArea.innerHTML = "";
      let uploadedHTML = `<div class="uploadedFile">
                        <div class="progressWrapper">
                          <div class="fileWrapper">
                            <img src="images/file.svg" alt="">
                            <p>${name}</p>
                            
                          </div>
                          <div class="progressCheck">
                            <img src="images/fileUpload.svg" alt="">
                            <img src="images/checkUpload.svg" alt="">
                          </div>
                        </div>
                        <div class="progressBar">
                          <div class="fillProgress" style="width: ${fileLoaded}%">
                            
                          </div>
                        </div>
                      </div>`;
      uploadedArea.classList.remove("onprogress");
      uploadedArea.insertAdjacentHTML("afterbegin", uploadedHTML);
    }
  });
  let data = new FormData(form);
  xhr.send(data);
}
let draggedFile;
uploadArea?.addEventListener('dragover', (event) => {
  event.preventDefault()
  console.log('File is over DragArea')
})
uploadArea?.addEventListener('dragleave', (event) => {
  console.log('File is left DragArea')
})
uploadArea?.addEventListener('drop', (event) => {
  event.preventDefault()
  console.log('File is dropped DragArea')
  draggedFile = event.dataTransfer.files[0]
  console.log(draggedFile)
  let fileType = draggedFile.type;
  const validExtensions = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf']
  if (validExtensions.includes(fileType)) {
  if(draggedFile){
    let fileName = draggedFile.name;
    if(fileName.length >= 12){
      let splitName = fileName.split('.');
      fileName = splitName[0].substring(0, 13) + "... ." + splitName[1];
    }
    uploadFile(fileName);
  }
  }
  else{
    alert('Расширение файла не соответствует')
  }
})

const subCategories = 
['Тексты и переводы','Разработка', 'Дизайн', 'Аудио, видео монтаж', 'SEO и оптимизация', 'Бизнес и жизнь', 'Соцсети и реклама']
/*
const wait = (timeToDelay) => new Promise((resolve) => setTimeout(resolve, timeToDelay));
const buttonsOfCategories = document.querySelectorAll("#categoryOfWork")
buttonsOfCategories.forEach(function(buttonOfCategorie){
    buttonOfCategorie?.addEventListener('click', function(event){
        for (let i = 0; i < subCategories.length; i++) {
            if (buttonOfCategorie.value.localeCompare(subCategories[i][0]) == 0) {
                let subCategoryNav = document.querySelector('.subCategoryFixed')
                subCategoryNav.style.display = "inline-block"
                let categories = document.getElementById('categoriesFixed').style.display = "none"
                subCategoryNav.innerHTML = ""
                subCategoryNav.classList.remove('hiddenSubCategory')
                subCategoryNav.classList.add('animateCategory')
                for (let l = 0; l < subCategories[i].length; l++) {
                    if (l == 0) {
                        subCategoryNav.innerHTML = subCategoryNav.innerHTML + "<button onclick=\"hideSubCategory()\" class=\"categoryOfWorkChoosen animateFirstElement\" id=\"categoryOfWorkChoosen\" ><svg class=\"arrowLeft\"><use xlink:href=\"#arrowLeft\"></use></svg>" + subCategories[i][l] + "</button>"
                    }
                    else{
                        subCategoryNav.innerHTML = subCategoryNav.innerHTML + "<button class=\"categoryOfWork ableToChoose\" href=\"\">" + subCategories[i][l] + "</a>"
                    }
                }
            }
        }
    })
})*/

function hideSubCategory () {
    let subCategory = document.getElementById('subCategoryFixed')
    subCategory.classList.remove('hiddenSubCategory')
    subCategory.classList.add('hiddenSubCategory')
    subCategory.style.display = "none"
    let categories = document.getElementById('categoriesFixed')
    categories.classList.remove('animateCategory')
    categories.classList.add('animateCategory')
    categories.style.display = "inline-block"

}

const openDropdown = document.querySelector('.openDropdown')
openDropdown?.addEventListener('click', () => {
    const dropdown = document.querySelector('.dropdownFixed')
    dropdown.classList.toggle('hide')
})
const openDropdownNotFixed = document.querySelector('.openDropdownNotFixed')
openDropdownNotFixed?.addEventListener('click', () => {
    const dropdown = document.querySelector('.dropdownNotFixed')
    dropdown.classList.toggle('hide')
})
const buttonOfCategoriOfWorks = document.querySelectorAll('#categoryOfWork')
buttonOfCategoriOfWorks.forEach(function(buttonOfCategoriOfWork){
    buttonOfCategoriOfWork?.addEventListener('click', (element) => {
        for (let i = 0; i < subCategories.length; i++) {
            if (buttonOfCategoriOfWork.value.localeCompare(subCategories[i]) == 0) {
                let indexOfNav = i + 1;
                const subCategorieToShow = document.querySelector('.subCategory' + indexOfNav)
                subCategorieToShow.classList.remove('hide')
            }
        }
    })
})
const fastSearchButton = document.querySelector('.fastSearchButton');
const fastSearch = document.querySelector('.fastSearch')
const closeFastSearchButton = document.querySelector('.closeFastSearchButton')
fastSearchButton?.addEventListener('click', () => {
        fastSearch.classList.add('slide-right-fast-search');
        fastSearch.classList.remove('slide-left-fast-search');
        console.log('open')
})
closeFastSearchButton?.addEventListener('click', () => {
        fastSearch.classList.add('slide-left-fast-search');
        fastSearch.classList.remove('slide-right-fast-search');
        console.log('close')
})
const showMoreButton = document.querySelector('.showMoreButton')
showMoreButton?.addEventListener('click', () => {
    const moreInfoAboutUser = document.querySelector('.moreInfoAboutUser')
    moreInfoAboutUser.classList.toggle('hide')
})
const sortByPriceButton = document.querySelector('.sortByPriceButton')
sortByPriceButton?.addEventListener('click', () => {
    const dropdownOfSort = document.querySelector('.dropdownOfSort') 
    dropdownOfSort.classList.toggle('hide')
})
const typeOfSortByPrice = document.querySelectorAll('input[name="typeOfSorting"]')
typeOfSortByPrice.forEach((element) => {
    element?.addEventListener('change', (event) => {
        let typeOfSort = event.target.value
        console.log(typeOfSort)
        sortByPriceButton.innerHTML = event.target.value + ' <img src="images/arrowDown.svg" alt="">';
        const dropdownOfSort = document.querySelector('.dropdownOfSort') 
        dropdownOfSort.classList.toggle('hide')
    })
})
