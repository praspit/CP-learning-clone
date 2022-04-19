import { getChannelsFromList } from "./model/channel.js"
import { getOnePost, getOnePostInChannel, getPostListInChannel, incrementPostUpvote, uploadPost, uploadAnswer } from "./model/post.js"
import { getUser, getTime } from "./model/user.js"
import { User, Post, Answer, Reply } from "./model/schema.js"

import {showAllChannelCtrl} from "./controller/channelCtrl.js"


//getOnePost("BODLFokdmxix53c7ooIz")
//getOnePostInChannel("q6HTTRc61ieJv6qcpVns", "BODLFokdmxix53c7ooIz")
//getUser("somying#1234")
//getPostListInChannel("q6HTTRc61ieJv6qcpVns")
// getChannelsFromList(["q6HTTRc61ieJv6qcpVns"])
//getOnePost("BODLFokdmxix53c7ooIz")
//incrementPostUpvote("BODLFokdmxix53c7ooIz")
//getTime()
//uploadPost("q6HTTRc61ieJv6qcpVns", new Post("somying#1234", "Can you be my friends?", "I'm so lonely", "q6HTTRc61ieJv6qcpVns"))
//uploadAnswer("q6HTTRc61ieJv6qcpVns", "ymz9b1QgttJQa0gMx3I0", new Answer("TA#1234", "no u", "ymz9b1QgttJQa0gMx3I0", true))
getPostListInChannel("q6HTTRc61ieJv6qcpVns", "timestamp")

showAllChannelCtrl();
