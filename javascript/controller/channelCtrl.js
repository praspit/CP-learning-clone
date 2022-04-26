import { getAllChannels } from "../model/channel.js";
import {showAllChannels} from "../view/channel.js";

export async function showAllChannelCtrl() {
    let channels = await getAllChannels();
    showAllChannels(channels);
    return channels;
}