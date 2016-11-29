chat = {
    controller: function () {
        var ctrl = this;

        ctrl.loadResults = false;
        ctrl.selectedRoom = "Default";
        console.log(ctrl.loadResults);
        ctrl.chatSub = [];
        ctrl.rooms = [];
        ctrl.roomsFiltered = () => {
            return ctrl.rooms.filter((elem, index, arr) => {
                console.log(elem.room);
                arr.indexOf(elem.room) !== -1
            });
        };

        ctrl.limitActive = false;
        ctrl.debounce = (x) => {
            if (!ctrl.limitActive) {
                document.getElementById('logo').className = "responsive-img circle logo-spin";
                Meteor.sharedFunctions.debounceLimiter(x)();
                ctrl.limitActive = true;
                console.log('debouncing with a runLimit of 1');
                setTimeout(() => {
                    ctrl.limitActive = false;
                    document.getElementById('logo').className = "responsive-img circle";
                }, 300)
            }
        }

        let queryRooms = Rooms.find();
        let handleRooms = queryRooms.observeChanges({
            changed: (id, roomAttr) => {
                console.log("changed");
            },
            added: (id, roomAttr) => {

                ctrl.rooms.push(roomAttr);
                let debounce = Meteor.sharedFunctions.debounce(() => {
                    console.log('redrawing');
                    ctrl.loadResults = true;
                    m.redraw(true);
                }, 500, false);

                ctrl.debounce(debounce);
            },
            removed: (id, chatAttr) => {

                console.log("removed");
            }
        });
        
        ctrl.msgQuery;
        ctrl.msgHandle;
        
        ctrl.chatBot = (m, x) => {
            console.log("Chat BoT initialized." + m.toLowerCase());

            let response;
            switch (m.toLowerCase()) {
                case "hello":
                    response = x.seed == true ? "Welcome to a chat about " + x.roomToSeed : "Greetings.";
                    break;
                case "help":
                    response = "I see you were able to send a message. To change channels use the menu on the left.";
                    break;
                case "who are you?":
                case "who are you":
                    response = "I am the moderator of this chat.";
                    break;
                default:
                    response = "ZZZ"
            }
            let msg = {
                text: response,
                userName: "chatbot",
                userId: Meteor.uuid(),
                timestamp: Date.now(),
                room: x.seed == true ? x.roomToSeed : ctrl.selectedRoom,
                id: Meteor.uuid(),
                edited: false,
                photo: Meteor.sharedFunctions.defaultChatbotPhoto()
            }
            console.log(msg);
            Meteor.call('addMessages', msg, (error, response) => {
                if (error) {
                    //TODO Add Error Logging 
                } else if (response) {

                    console.log(response);

                    return response;
                }
            })
        }
        ctrl.sendMessage = (e) => {
            let msgTxt = document.getElementById('chatSend').value;

            console.log('|' + msgTxt.length)
            if (msgTxt == "") return;
            if (msgTxt.length < 3) return;
            document.getElementById('chatSend').value = "";
            let msg = {
                text: msgTxt,
                userName: Meteor.user().username,
                userId: Meteor.user()._id,
                timestamp: Date.now(),
                room: ctrl.selectedRoom,
                id: Meteor.uuid(),
                edited: false,
                photo: Session.get('photo')
            }
            console.log(msg);
            Meteor.call('addMessages', msg, (error, response) => {
                if (error) {
                    //TODO Add Error Logging 
                } else if (response) {

                    console.log(response);
                    if (msgTxt.substring(0, 8) == "#chatbot") {
                        let msg = msgTxt.substring(9);
                        ctrl.chatBot(msg, {
                            roomToSeed: ctrl.selectedRoom,
                            seed: false
                        });

                    }
                    return response;
                }
            })
        }
        ctrl.sendRoom = (e) => {
            let roomTxt = document.getElementById('roomSend').value;
            console.log(roomTxt)
            console.log('|' + roomTxt.length)
            if (roomTxt == "") return;
            if (roomTxt.length < 3) return;
            document.getElementById('roomSend').value = "";
            let room = {
                room: roomTxt,
                ownerName: Meteor.user().username,
                owner: Meteor.user()._id,
                timestamp: Date.now(),
                isPrivate: false
            }
            console.log(room);
            Meteor.call('addRoom', room, (error, response) => {
                if (error) {
                    //TODO Add Error Logging 
                } else if (response) {

                    ctrl.chatBot("hello", {
                        roomToSeed: room.room,
                        seed: true
                    });
                    ctrl.selectedRoom = room.room;
                    ctrl.selectRoom(ctrl.selectedRoom);
                    console.log(response);

                    return response;
                }
            })
        }
        ctrl.messageEditId = '';

        ctrl.saveChanges = (res) => {
            console.log(res);
            let newText = document.getElementById('editMessageTxt').value;
            console.log(newText);
            ctrl.messageEditId = '';
            let msg = {
                id: res.id,
                text: newText
            }
            Meteor.call('updateMessage', msg, (error, response) => {
                if (error) {
                    //TODO Add Error Logging 
                } else if (response) {


                    //document.getElementById(res.id).textContent = newText;

                    console.log(response);

                    return response;
                }
            })
        }
        ctrl.selectRoom = (r) => {

            ctrl.selectedRoom = r == null || r == undefined ? "Default" : r.target.id;
            console.log(ctrl.selectedRoom);
            r == null || r == undefined ? "" : ctrl.msgHandle.stop();
            ctrl.chatSub = [];
            ctrl.msgQuery = Messages.find({
                room: ctrl.selectedRoom
            });
            ctrl.msgHandle = ctrl.msgQuery.observeChanges({
            changed: (id, chatAttr) => {
                console.log('changed');
                for (let value of ctrl.chatSub) {
                    console.log(value.id);
                    value.cid == id ? value.text = chatAttr.text : '';
                    value.cid == id ? value.edited = true : '';

                }
                m.redraw(true);
            },
            added: (id, chatAttr) => {
                chatAttr.cid = id;
                ctrl.chatSub.push(chatAttr);
                console.log('added');
                let debounce = Meteor.sharedFunctions.debounce(() => {
                    console.log('redrawing');
                    ctrl.loadResults = true;
                    m.redraw(true);
                }, 200, false);

                ctrl.debounce(debounce);
            },
            removed: (id, chatAttr) => {

                console.log("removed");
            }
        })
        }
        ctrl.selectRoom();
        ctrl.editMessage = (e) => {
            console.log(e.target.parentNode.id);
            ctrl.messageEditId = e.target.parentNode.id;
            let editMsg = document.getElementById(e.target.parentNode.id);
        }
        ctrl.msgEditCtr = (res) => {

            return res.id == ctrl.messageEditId ? m('span', {
                id: res.id
            }, [m('input.mono.glow-font#editMessageTxt[minlength="3"][type="text"]', {
                placeholder: res.text,
                onchange: () => {
                    console.log("saving");
                    ctrl.saveChanges({
                        id: res.id
                    });
                }
            })]) : m('span', {
                id: res.id
            }, res.text + " ", [res.user == Meteor.userId() ? m('i.tiny.material-icons.prefix.glow-font.active.Pointer', {
                onclick: ctrl.editMessage
            }, 'mode_edit') : '']);
        }
        ctrl.editingRoom = false
        ctrl.editRoom = (e) => {
            console.log(e);
            ctrl.editingRoom = ctrl.editingRoom == false ? true : false;
        };
        ctrl.PrivateChkBxChange = (e) => {
            console.log(e)
        }
        $(document).keypress((e) => {
            if (e.which == 13) {
                ctrl.sendMessage();
            }
        });

        //document.getElementById("nav").className = "transparent";
    },
    view: (ctrl) => {

        return m('.section', [
      m(".row", [
        m(".col.s2.#chatWell.card", ctrl.loadResults ? ctrl.rooms.map((res) => {
                    return [
              m("tr.mono.light-blue-text.text-lighten-5", [m('td', [m('span', {
                            class: ctrl.selectedRoom == res.room ? "active mono Pointer glow-font" : "mono Pointer",
                            id: res.room,
                            onclick: ctrl.selectRoom
                        }, res.room + " ", [res.owner == Meteor.userId() ? m('i.tiny.material-icons.prefix.glow-font.active.Pointer', {
                            id: res.room,
                            onclick: ctrl.editRoom
                        }, 'settings') : ''])])])

            ]
                }) : [m('span.mono', ' Loading...')], m('div.input-field', [m('i.small.material-icons.prefix.mono.glow-font.Pointer', {
                    onclick: ctrl.sendRoom
                }, '+')], [m('label.mono#label[for="roomSend"]', "channel name")], [m('input.mono.glow-font#roomSend[name="roomSend"][minlength="3"][type="text"]')])),
        ctrl.editingRoom == false ? m(".col.s10", [
          m(".card.hoverable.grey.darken-4", [
            m(".card-content#chatWell", [m('span.card-title.mono', "General Chat")],
                            m('table', [m('thead', [m('tr', [m('th[data-field="name"]')], [m('th[data-field="message"]')])])], [m('tbody#chatLog', {
                                    config: () => {
                                        let dbncScroll = Meteor.sharedFunctions.debounce(() => {
                                            let chatLog = document.getElementById("chatLog");
                                            chatLog.scrollTop = chatLog.scrollHeight
                                        }, 300)
                                        dbncScroll();
                                    }
                                },
                                ctrl.loadResults ? ctrl.chatSub.map((res) => {
                                    return [
              m("tr.mono.light-blue-text.text-lighten-5", [m('td', {
                                            class: res.name == "chatbot" ? "mono active glow-font" : "mono"
                                        }, [m('img.small.responsive-img.circle', {
                                            src: res.photo
                                        })], " " + res.name, [m('i.timestamp', " " + moment(res.timestamp).fromNow()), m('i.timestamp.glow-font', res.edited == true ? " *edited*" : '')], [m('br'), new ctrl.msgEditCtr({
                                            text: res.text,
                                            id: res.id,
                                            user: res.user
                                        })])])

            ]
                                }) : [m('span.mono', ' Loading...')])], [m('br'),
                                    ], m('div.input-field', [m('button.btn.sendBtn.right', {
                                onclick: ctrl.sendMessage
                            }, [m('i.small.material-icons', 'play_arrow')])], [m('i.material-icons.prefix.mono.glow-font', 'chat_bubble')], [m('label.mono#label[for="chatSend"]', "Type a message")], [m('input.mono#chatSend[name="chatSend"][minlength="3"][type="text"]')])))
          ])
      ]) : m(".col.s10", [
          m(".card.hoverable.grey.darken-4", [
            m(".card-content", [m('span.card-title.mono', "Channel settings")],
                            m('table', [m('thead', [m('tr', [m('th[data-field="name"]')], [m('th[data-field="message"]')])])], [m('tbody#chatLog',

                                m("tr.mono.light-blue-text.text-lighten-5", [m('td', [m('p', [m('input#isPrivate.glow-font[type="checkbox"]', {
                                    onchange: (e) => {
                                        e.target.checked ? ctrl.PrivateChkBxChange(e.target.checked) : '';
                                    }
                                }), m('label.mono[for="isPrivate"]', "Set channel to private.")])], m('div.input-field', [m('i.tiny.material-icons.prefix.mono.glow-font.Pointer', {
                                    onclick: ''
                                }, 'edit_mode')], [m('label.mono#label[for="roomEdit"]', "channel name")], [m('input.mono.glow-font#roomEdit[name="roomEdit"][minlength="3"][type="text"]')]), m('br'), m('button.createBtn', {
                                    onclick: () => {
                                        ctrl.editingRoom = false
                                    }
                                }, "Done"))])

            )]))
          ])
      ])])])
    }
}