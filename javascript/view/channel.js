let channelContainer = document.querySelector(".nav-bar");

export function showAllChannels(channels) {
    let html = '';
    channels.forEach(channel=> {
        html += `<button class="channel-container">${channel.channel_name}</button>`;
    });
    channelContainer.innerHTML = html;
}