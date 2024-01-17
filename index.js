import cards from "./data/data.js";

//----------------------------------------------Hamburger Menu------------------------------------------

const menu = document.querySelector(".dropdown__container");

const toggle = () => {
  if (menu.style.display === "inline") {
    menu.style.display = "none";
  } else {
    menu.style.display = "inline";
  }
};

const hamburger = document.querySelector("#hamburger__icon");

hamburger.addEventListener("click", toggle);

const updateMediaQuery = () => {
  if (window.innerWidth > 768) {
    menu.style.display = "none";
  }
};

window.addEventListener("resize", updateMediaQuery);

//-------------------------------------------------Card section-----------------------------------------

const card_html = document.querySelector(".course__cards");

for (let i = 0; i < 4; i++) {
  const card = document.createElement("div");
  card.className = `cards card__${i + 1}`;

  const lessons = cards[i].unit
    ? ` <b>${cards[i].unit}</b> Units <b>${cards[i].lesson}</b> Lessons <b>${cards[i].nooftopic}</b> Topics `
    : ` `;
  const students = cards[i].number_of_students
    ? ` <p>${cards[i].number_of_students} Students</p> `
    : ` `;
  const dates =
    cards[i].date === ""
      ? ` `
      : ` 
        <div style="border: 1px solid rgba(0,0,0,0.12);"></div>
        <p>${cards[i].date}</p>
    `;

  const dropDownStyle = cards[i].class.length ? "" : "color: rgba(0,0,0,0.4);";

  let classesOptions = ``;

  for (let j = 0; j < cards[i].class.length; j++) {
    classesOptions += `<option value="Course_name">${cards[i].class[j]}</option>`;
    classesOptions += "\n";
  }

  classesOptions =
    classesOptions == ""
      ? `<option value="" disabled selected hidden style="color: rgba(0,0,0,0.4);">No Classes</option>`
      : classesOptions;

  const icon2Opacity = cards[i].manage_course ? "1" : "0.4";
  const icon3Opacity = cards[i].grade_submission ? "1" : "0.4";
  const starFilter = cards[i].favorite
    ? "brightness(100%)"
    : "brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(986%) hue-rotate(231deg) brightness(117%) contrast(87%);";
  const expireTxt = cards[i].expiry
    ? `<div class="expired__txt">EXPIRED</div>`
    : "";

  card.innerHTML = `
    ${expireTxt}
    <div class="card__data">
        
        <img src=${cards[i].image} alt="">
        <div class="card__texts">
            <div class="card__heading">
                <p>${cards[i].topic}</p>
                <img style="filter:${starFilter}"" src="./Assets/icons/favourite.svg" alt="">
            </div>
            <br>
            <div class="subject">
                <p>${cards[i].subject}</p>
                <div style="border: 1px solid rgba(0,0,0,0.12);"></div>
                <p>${cards[i].grade} <span style="color: #1F7A54;">${cards[i].kt}</span></p>
            </div>
            <br>
            <div class="topics">
                ${lessons}
            </div>
            <br>
            <form class="card__droupdown"action="">
                <select name="course__name" style=${dropDownStyle} id="">
                    ${classesOptions}
                </select>
            </form>
            <br>
            <div class="subject">
                ${students}
                ${dates}
            </div>
        </div>
    </div>
    <br>
    <hr>
    <br>
    <div class="card__icons">
        <img src="./Assets/icons/preview.svg" alt="">
        <img style="opacity:${icon2Opacity};" src="./Assets/icons/manage_course.svg" alt="">
        <img style="opacity:${icon3Opacity};" src="./Assets/icons/grade_submissions.svg" alt="">
        <img src="./Assets/icons/reports.svg" alt="">
    </div>

    `;

  card_html.appendChild(card);
}
