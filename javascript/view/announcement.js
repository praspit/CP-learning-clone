let announcementsContainer = document.querySelector('.announcements-container');

export function showAnnoucementsFromChannel(announcements) {
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