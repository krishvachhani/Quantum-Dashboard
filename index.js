import cards from './data/cardData.js';
import announcement from './data/announcementData.js'
import alert from './data/alertData.js'



const menu=document.querySelector('.dropdown__container');
const hamburger=document.querySelector('#hamburger__icon');

const announcement_container=document.querySelector('.announcement__menu');
const announcement_icon=document.querySelector('.announcement__icon');

const alert_container=document.querySelector('.alert__menu');
const alert_icon=document.querySelector('.alert__icon');


//----------------------------------------------Hamburger Menu------------------------------------------



const toggleHamburger = () =>{
    if(menu.style.display==='inline') {
        menu.style.display='none';
        hamburger.style.filter='brightness(100%)'
    }
    else{
        alert_container.style.display='none';
        alert_icon.style.filter='brightness(100%)'

        announcement_container.style.display='none';
        announcement_icon.style.filter='brightness(100%)'

        menu.style.display='inline';
        hamburger.style.filter='brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7455%) hue-rotate(46deg) brightness(99%) contrast(111%)'
    }
}



hamburger.addEventListener("click", toggleHamburger);

const updateMediaQuery = () => {
    if(window.innerWidth > 768){
        menu.style.display='none';
    }
}

window.addEventListener('resize', updateMediaQuery);


//-------------------------------------------------submenu----------------------------------------------

const content = document.querySelector('#content');
const users = document.querySelector('#users');
const reports = document.querySelector('#reports');
const admin = document.querySelector('#admin');

const toggleSubmenu = (divEle) => {
    divEle.classList.toggle("active");
}

content.addEventListener('click', ()=>{
    toggleSubmenu(content)
});
users.addEventListener('click', ()=>{
    toggleSubmenu(users)
});
reports.addEventListener('click', ()=>{
    toggleSubmenu(reports)
});
admin.addEventListener('click', ()=>{
    toggleSubmenu(admin)
});

//-------------------------------------------------Card section-----------------------------------------

const card_html = document.querySelector(".course__cards");

for (let i = 0; i < 4; i++) {
    const card = document.createElement("div");
    card.className = `cards card__${i+1}`;

    const lessons = cards[i].unit ? ` <b>${cards[i].unit}</b> Units <b>${cards[i].lesson}</b> Lessons <b>${cards[i].nooftopic}</b> Topics ` : ` ` ;
    const students = cards[i].number_of_students ? ` <p>${cards[i].number_of_students} Students</p> ` : ` `;
    const dates = cards[i].date==="" ? ` ` : ` 
        <div style="border: 1px solid rgba(0,0,0,0.12);"></div>
        <p>${cards[i].date}</p>
    `;

    const dropDownStyle=cards[i].class.length ? "":"color: rgba(0,0,0,0.4);";

    let classesOptions=``;

    for(let j=0;j<cards[i].class.length;j++){
        classesOptions+=`<option value="Course_name">${cards[i].class[j]}</option>`
        classesOptions+="\n";
    }

    classesOptions= classesOptions==""?`<option value="" disabled selected hidden style="color: rgba(0,0,0,0.4);">No Classes</option>` : classesOptions;

    const icon2Opacity = cards[i].manage_course ? "1" : "0.4";
    const icon3Opacity = cards[i].grade_submission ? "1" : "0.4";
    const starFilter=cards[i].favorite ? "brightness(100%)" : "brightness(0) saturate(100%) invert(100%) sepia(2%) saturate(986%) hue-rotate(231deg) brightness(117%) contrast(87%);";
    const expireTxt=cards[i].expiry? `<div class="expired__txt">EXPIRED</div>` : "";

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


//---------------------------------------------------announcement--------------------------------------



for(let i=0;i<announcement.length;i++){

    const announcement_card = document.createElement("div");
    announcement_card.className = `announcement__card`;

    const courseEle = announcement[i].course_name==="" ? "" : `<div class="course">Course: ${announcement[i].course_name}</div>`;
    const attachmentEle = announcement[i].filesAttached ? `<div class="attchments">
                    <i class="fa-solid fa-paperclip upin"></i>
                    ${announcement[i].filesAttached} files are attached
                </div>` : `<div></div>`;

    const seenEle = announcement[i].checked ? `<img src="./Assets/icons/correct.png" alt="">` : `<img src="./Assets/icons/dnd.png" alt="">`;

    if(!announcement[i].checked){
        announcement_card.style.backgroundColor='#FFFFEE'
    }
    announcement_card.innerHTML=`
    <div class="sender">
        <div>
            <span>PA:</span> <p>${announcement[i].personalAssistant}</p>
        </div>
        ${seenEle}
    </div>
    <div class="message">
        ${announcement[i].message}
    </div>
    ${courseEle}
    <div class="attachments__date">
        ${attachmentEle}
        ${announcement[i].dateTime}
    </div>
    `;

    const linebreak = document.createElement("hr")
    const referenceElementAnnoucement = document.querySelector('.announcement__button');

    announcement_container.insertBefore(announcement_card, referenceElementAnnoucement);
    announcement_container.insertBefore(linebreak, referenceElementAnnoucement);
}


const toggleAnnouncement = () =>{
    if(announcement_container.style.display==='inline') {
        announcement_container.style.display='none';
        announcement_icon.style.filter='brightness(100%)'
    }
    else{
        menu.style.display='none';
        hamburger.style.filter='brightness(100%)'

        alert_container.style.display='none';
        alert_icon.style.filter='brightness(100%)'



        announcement_container.style.display='inline';
        announcement_icon.style.filter='brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7455%) hue-rotate(46deg) brightness(99%) contrast(111%)'
    }
}

announcement_icon.addEventListener('click',()=>{
    toggleAnnouncement();
})


//------------------------------------------------------alert--------------------------------------------------


for(let i=0;i<alert.length;i++){

    const alert_card = document.createElement("div");
    alert_card.className = `alert__card`;

    const courseEle = alert[i].course_name==="" ? "" : `<div class="alert__course">Course: ${alert[i].course_name}</div>`;

    const seenEle = alert[i].checked ? `<img src="./Assets/icons/correct.png" alt="">` : `<img src="./Assets/icons/dnd.png" alt="">`;

    if(!alert[i].checked){
        alert_card.style.backgroundColor='#FFFFEE'
    }

    alert_card.innerHTML=`
        <div class="alert__message">
            ${alert[i].message}
            ${seenEle}
        </div>
        ${courseEle}
        <div class="alert__date">
            ${alert[i].dateTime}
        </div>
    `;


    const referenceElementAlert = document.querySelector('.alert__button');


    const linebreak = document.createElement("hr")
    alert_container.insertBefore(alert_card,referenceElementAlert)
    alert_container.insertBefore(linebreak,referenceElementAlert)
}



const toggleAlert = () =>{
    if(alert_container.style.display==='inline') {
        alert_container.style.display='none';
        alert_icon.style.filter='brightness(100%)'
    }
    else{
        
        announcement_container.style.display='none';
        announcement_icon.style.filter='brightness(100%)'

        menu.style.display='none';
        hamburger.style.filter='brightness(100%)'

        alert_container.style.display='inline';
        alert_icon.style.filter='brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7455%) hue-rotate(46deg) brightness(99%) contrast(111%)'
    }
}

alert_icon.addEventListener('click',()=>{
    toggleAlert();
})


//---------------------


document.addEventListener('click',(event)=>{
    if(!event.target.matches('.alert__icon')){
        alert_container.style.display='none';
        alert_icon.style.filter='brightness(100%)'
    }
    if(!event.target.matches('#announcement__icon__id')){
        announcement_container.style.display='none';
        announcement_icon.style.filter='brightness(100%)'
    }
    if(!event.target.matches('#hamburger__icon')){
        menu.style.display='none';
        hamburger.style.filter='brightness(100%)'
    }
})
