const tag = document.getElementsByClassName("accordion__content");
// タイトルフォントとのサイズの倍率
var tag_fontsize = 0.75
for(i=0; i<tag.length; i++){
    tag[i].style.color = "black";
    tag[i].style.fontSize = tag_fontsize + "em";
}

const title = document.querySelectorAll('.accordion__title');
function toggle(){
    const content = this.nextElementSibling;
    this.classList.toggle('is-active');
    content.classList.toggle('is-open');
}
for (let i = 0; i < title.length; i ++){
    title[i].addEventListener('click', toggle)
}