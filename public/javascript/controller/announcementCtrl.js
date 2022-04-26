import { getChannel } from "../model/channel.js";
import { showAnnoucementsFromChannel} from "../view/announcement.js"

export async function showAnnoucementsFromChannelCtrl(channel_id) {
    let channel = await getChannel(channel_id);
    showAnnoucementsFromChannel(channel.announcements);
}