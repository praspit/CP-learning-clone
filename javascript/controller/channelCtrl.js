import { getAllChannels } from "../model/channel.js";
import {showAllChannels} from "../view/channel.js";

export async function showAllChannelCtrl() {
    let channels = await getAllChannels();
    console.log(channels);
    showAllChannels(channels);
    return channels;
}