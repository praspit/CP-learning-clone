import { getChannelsFromList } from "./model/channel.js"
import { getPostRef, getOnePost, getOnePostInChannel, getPostListInChannel, incrementPostUpvote } from "./model/post.js"
import { getUser } from "./model/user.js"
import { getDoc, getDocs } from "./model/firestore-init.js"
import {showAllChannelCtrl} from "./controller/channelCtrl.js"

//getOnePost("BODLFokdmxix53c7ooIz")
//getOnePostInChannel("q6HTTRc61ieJv6qcpVns", "BODLFokdmxix53c7ooIz")
//getUser("somying#1234")
//getPostListInChannel("q6HTTRc61ieJv6qcpVns")
// getChannelsFromList(["q6HTTRc61ieJv6qcpVns"])
//getOnePost("BODLFokdmxix53c7ooIz")
//incrementPostUpvote("BODLFokdmxix53c7ooIz")
showAllChannelCtrl();
