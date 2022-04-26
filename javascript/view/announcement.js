let announcementsContainer = document.querySelector('.announcements-container');

export function showAnnoucementsFromChannel(announcements) {
    showAnnouncementForm();

    announcementsContainer.innerHTML = '';
    announcements.forEach(announcement => {
        let announcementContainer = document.createElement('div');
        announcementContainer.innerHTML = `
            ${announcement.author} : ${announcement.content}
        `
        announcementsContainer.appendChild(announcementContainer);
    });
}

export function showAnnouncementForm() {
    let user = JSON.parse(sessionStorage.getItem('user'));

    if(user.role === 'teacher'){
        document.querySelector('.announcement-title').innerHTML = `
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