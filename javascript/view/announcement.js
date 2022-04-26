let announcementsContainer = document.querySelector('.announcements-container');

export function showAnnoucementsFromChannel(announcements) {
    announcementsContainer.innerHTML = '';
    announcements.forEach(announcement => {
        let announcementContainer = document.createElement('div');
        announcementContainer.innerHTML = `
            ${announcement.author} : ${announcement.content}
        `
        announcementsContainer.appendChild(announcementContainer);
    });
}