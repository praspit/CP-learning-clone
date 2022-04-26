let announcementsContainer = document.querySelector('.announcements-container');

export function showAnnoucementsFromChannel(announcements) {
    showAnnouncementForm();

    announcementsContainer.innerHTML = '';
    announcementsContainer.setAttribute('index', 0);
    announcements.forEach(announcement => {
        let announcementContainer = document.createElement('div');
        announcementContainer.className = 'announcement-container';
        announcementContainer.classList.add('hide');

        let ann_author_container = document.createElement('div');
        let ann_content_container = document.createElement('div');
        ann_author_container.className = 'ann-author-container';
        ann_content_container.className = 'ann-content-container';
        ann_author_container.innerHTML = announcement.author + ' says:';
        ann_content_container.innerHTML = announcement.content;
        announcementContainer.appendChild(ann_author_container);
        announcementContainer.appendChild(ann_content_container);
        announcementsContainer.appendChild(announcementContainer);
    });
    
    let btn_container = document.createElement('div');
    let btn_prev = document.createElement('button');
    let btn_next = document.createElement('button');
    btn_container.className = 'announcement-btn-container';
    btn_prev.className = 'announcement-btn';
    btn_next.className = 'announcement-btn';
    btn_prev.innerText = 'Prev';
    btn_next.innerText = 'Next';
    if(announcements.length > 0){
        announcementsContainer.children[0].classList.remove('hide');
        btn_prev.onclick = function(){
            let index = parseInt(announcementsContainer.getAttribute('index'));
            if(index > 0){
                announcementsContainer.children[index].classList.add('hide');
                announcementsContainer.children[index-1].classList.remove('hide');
                announcementsContainer.setAttribute('index', index-1);
            }
        }
        btn_next.onclick = function(){  
            let index = parseInt(announcementsContainer.getAttribute('index'));
            if(index < announcements.length-1){
                announcementsContainer.children[index].classList.add('hide');
                announcementsContainer.children[index+1].classList.remove('hide');
                announcementsContainer.setAttribute('index', index+1);
            }
        }
    }
    
    btn_container.appendChild(btn_prev);
    btn_container.appendChild(btn_next);
    announcementsContainer.appendChild(btn_container);
}

export function showAnnouncementForm() {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if(user.role === 'teacher'){
        document.querySelector('.announcement-form-title').innerHTML = `
            <h2>Post Announcement Here...<h2>
        `

        let announcementFormContainer = document.querySelector('.announcement-form-container');
        announcementFormContainer.innerHTML = `
            <textarea rows="1" type="text" id="announcement-form-content-input" name="content" placeholder="Write your announcement" maxlength=200" spellcheck="false"></textarea>
        `;

        let announcementInputArea = document.getElementById(`announcement-form-content-input`);
        announcementInputArea.addEventListener('input', autoInputH, false);
        function autoInputH(){
            this.style.height = 'auto';
            this.style.height = this.scrollHeight + 'px';
        }

        let announcementSubmitBtn = document.createElement('button');
        announcementSubmitBtn.classList = 'announcement-submit-btn';
        announcementSubmitBtn.innerText = 'Announce';
        announcementFormContainer.appendChild(announcementSubmitBtn);   
    }
}