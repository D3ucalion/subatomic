accountSettings = {
    controller: function () {
        var ctrl = this;
        /**Bound to the clear log button to clear the upload log, most likely used in a case where an upload may fail   **/
        ctrl.clearLog = function () {
            var completed = $('#uploader').children();
            $(completed).remove();
        }
        ctrl.maxuploadsize = 12310;
        ctrl.canDrop = true;
        ctrl.imgPrev = '';

        ctrl.toast = function (res) {
            let toaster = document.getElementById("toaster");
            Meteor.sharedFunctions.fade("in", 350, toaster, true);
            console.log(res);
            toaster.textContent = res == 1 ? "Success!" : res.reason;
            if (res.error > 500) {
                toaster.style.color = '#c22929';
            } else if (res.error < 500 && res.error > 400) {
                toaster.style.color = '#c8b40a';
            } else {
                toaster.style.color = '#81b3d6';
            }

            setTimeout(function () {
                Meteor.sharedFunctions.fade("out", 350, toaster, true);
                ctrl.clearLog();
                ctrl.canDrop = true;
                document.getElementById('uploaderStep2').style.display = 'none';
                document.getElementById('uploaderStep1').style.display = 'block';
                ctrl.imgPrev = '';
                document.getElementById('FileUploadButton').disabled = false;
                m.redraw(true);
            }, 5000)
        }

        ctrl.updateUsername = (e) => {

            let username = e.target.value;
            console.log(username);
            let user = {
                user: Meteor.userId(),
                username: username
            }

            Meteor.call('UpdateUsername', user, (error, response) => {
                if (error) {
                    //TODO Add Error Logging 
                    ctrl.toast(error);
                } else if (response) {
                    Session.setAuth('user', username);
                    m.redraw(true);
                    ctrl.toast(response);
                    return response
                }
            });
        }

        /*  THe event listeners here are bound to the .uploader element above to listen for drop events */
        ctrl.dragdrop = (element, options) => {

            options = options || {}
            let dropZone = document.getElementById('global-dropzone1');
            element.addEventListener("dragover", activate);
            //element.addEventListener("dragleave", dragLeave);
            dropZone.onclick = function () {
                dropZone.className = ""
            }
            element.addEventListener("dragend", deactivate);
            element.addEventListener("drop", deactivate);
            element.addEventListener("drop", update);

            function activate(e) {
                e.preventDefault();
                let dropZone = document.getElementById('global-dropzone1');
                dropZone.className = "visible";
            }

            function deactivate(e) {
                e.preventDefault();
                let dropZone = document.getElementById('global-dropzone1');
                dropZone.className = "";

            }

            function dragLeave(e) {
                e.preventDefault();
                let dropZone = document.getElementById('global-dropzone1');
                dropZone.className = "";
            }

            function update(e) {
                e.preventDefault();
                // totalFileSize(e)
                if (typeof options.onchange == "function") {
                    options.onchange((e.dataTransfer || e.target).files);
                }
            }

        }

        ctrl.addProfilePhoto = (e) => {
                let photo = {
                    user: Meteor.userId(),
                    photo: e
                }

                Meteor.call('UpdatePhoto', photo, (error, response) => {
                    if (error) {
                        //TODO Add Error Logging 
                        ctrl.toast(error);
                    } else if (response) {
                        Session.setAuth('photo', ctrl.imgPrev);
                        m.redraw(true);
                        ctrl.toast(response);
                        return response
                    }
                });
            }
            /* Called on file drop to process dropped files */
        ctrl.onchange = (e) => {
            if (ctrl.canDrop == false) return;
            for (let i = 0; i < 1; i++) {
                this.well = document.getElementById('uploader');
                this.wellorig = document.getElementById('uploaderStep1');
                this.wellorig.style.display = 'none';
                this.wellParent = document.getElementById('uploaderStep2');
                this.wellParent.style.display = 'block';
                this.file = document.createElement('li');
                this.uploadButton = document.getElementById('FileUploadButton');

                let name = e[i].name;
                let type = e[i].type;

                if (type != 'image/png' && type != 'image/jpeg') {

                    let resultForm = document.getElementById('failmsg');
                    let node = document.createElement("li");
                    let textnode = document.createTextNode('This is not a supported file format. Please try again.');
                    this.wellParent.style.display = 'none';
                    this.wellorig.style.display = 'block';
                    node.appendChild(textnode);

                    resultForm.appendChild(node);
                } else if (e[i].size > ctrl.maxuploadsize) {
                    let resultForm = document.getElementById('failmsg');
                    let node = document.createElement("li");
                    let textnode = document.createTextNode('This file is too large. Please try again.');
                    this.wellParent.style.display = 'none';
                    this.wellorig.style.display = 'block';
                    node.appendChild(textnode);

                    resultForm.appendChild(node);
                } else {
                    /*** setup array buffer to pass into the pdf preview function ***/
                    let reader = new FileReader();
                    reader.onload = function () {
                        var arrayBuffer = reader.result;
                        console.log(arrayBuffer);
                        ctrl.imgPrev = arrayBuffer;
                        m.redraw(true);
                    };
                    reader.readAsDataURL(e[i]);
                    /*** Create file entry element and display it ***/
                    let size = Meteor.sharedFunctions.humanReadableFileSize(e[i].size);
                    let resultForm = this.well;
                    let node = document.createElement("LI");
                    let textnode = document.createTextNode('Selected File: ' + name + '  ' + 'Size: ' + size + ' ');
                    let progressNode = document.createElement('div');
                    progressNode.className = "noload1";

                    let progressLoad = document.createElement('div');
                    //progressLoad.className = "progress-bar progress-bar-striped";
                    progressLoad.className = "load1";
                    let idx = 'X' + Math.floor((Math.random() * 99) + 1);
                    progressLoad.id = idx;

                    progressNode.appendChild(progressLoad);
                    node.appendChild(textnode);
                    node.appendChild(progressNode);
                    resultForm.appendChild(node);
                    ctrl.canDrop = false;

                    $(progressNode).parent().append($('<i class="Pointer material-icons" id="' + idx + '">settings_backup_restore</i>').on('click', function () {
                        $(node).remove();
                        ctrl.canDrop = true;
                        document.getElementById('uploaderStep2').style.display = 'none';
                        document.getElementById('uploaderStep1').style.display = 'block';
                        ctrl.imgPrev = '';
                        m.redraw(true);
                    }));
                    this.uploadButton.onclick = function () {
                        document.getElementById('FileUploadButton').disabled = true;
                        //uploadAllFiles(e[0], idx);
                        ctrl.addProfilePhoto(ctrl.imgPrev);
                    };

                }
            }

        };
        /* Called when files are added via the file chooser button to process added files */
        ctrl.chooseFile = (e) => {

            let files = e.target.files[0];
            console.log(files);
            if (files == null || undefined) return;

            this.well = document.getElementById('uploader');
            this.wellorig = document.getElementById('uploaderStep1');
            this.wellorig.style.display = 'none';
            this.wellParent = document.getElementById('uploaderStep2');
            this.wellParent.style.display = 'block';
            this.file = document.createElement('li');
            this.uploadButton = document.getElementById('FileUploadButton');

            let name = files.name;
            let type = files.type;
            if (type != 'image/png' && type != 'image/jpeg') {

                let resultForm = document.getElementById('failmsg');
                let node = document.createElement("li");
                let textnode = document.createTextNode('This is not a supported file format. Please try again.');
                this.wellParent.style.display = 'none';
                this.wellorig.style.display = 'block';
                node.appendChild(textnode);

                resultForm.appendChild(node);
            } else if (files > ctrl.maxuploadsize) {
                let resultForm = document.getElementById('failmsg');
                let node = document.createElement("li");
                let textnode = document.createTextNode('This file is too large. Please try again.');
                this.wellParent.style.display = 'none';
                this.wellorig.style.display = 'block';
                node.appendChild(textnode);

                resultForm.appendChild(node);
            } else {
                /*** setup array buffer to pass into the pdf preview function ***/
                let reader = new FileReader();
                reader.onload = function () {
                    var arrayBuffer = reader.result;
                    console.log(arrayBuffer);
                    ctrl.imgPrev = arrayBuffer;
                    m.redraw(true);
                };

                reader.readAsDataURL(files);
                /*** Create file entry element and display it ***/
                let size = Meteor.sharedFunctions.humanReadableFileSize(files.size);
                let resultForm = this.well;
                let node = document.createElement("LI");
                let clear = document.createElement("li");

                let textnode = document.createTextNode('Selected File: ' + name + '  ' + 'Size: ' + size + ' ');
                let progressNode = document.createElement('div');
                progressNode.className = "noload1";

                let progressLoad = document.createElement('div');
                //progressLoad.className = "progress-bar progress-bar-striped";
                progressLoad.className = "load1";
                let idx = 'X' + Math.floor((Math.random() * 99) + 1);
                progressLoad.id = idx;
                progressNode.appendChild(progressLoad);
                node.appendChild(textnode);
                node.appendChild(progressNode);

                resultForm.appendChild(node);
                $(progressNode).parent().append($('<i class="Pointer material-icons" id="' + idx + '">settings_backup_restore</i>').on('click', function () {
                    $(node).remove();
                    document.getElementById('uploaderStep2').style.display = 'none';
                    document.getElementById('uploaderStep1').style.display = 'block';
                    ctrl.imgPrev = '';
                    m.redraw(true);
                }));
                this.uploadButton.onclick = function () {
                    document.getElementById('FileUploadButton').disabled = true;
                    //uploadAllFiles(files, idx)
                    ctrl.addProfilePhoto(ctrl.imgPrev);
                };

            }
        }
    },
    view: function (ctrl) {
        return m(".container", [ m('section.upload.section.center', [m(".row", [
        m(".col.s12", {
                    config: function (element, isInitialized) {
                        if (!isInitialized) {
                            ctrl.canDrop == true ? ctrl.dragdrop(element, {
                                onchange: ctrl.onchange
                            }) : '';
                        }
                    }
                }, [m("[id='global-dropzone1']", [m("h2", "Drop files to upload")])], [
          m(".card.hoverable.grey.darken-4", [

            m(".card-content", [
              m("h3.mono.light-blue-text.text-lighten-5", ["Account settings"

              ]),
              m('hr'),
              m(".mono.light-blue-text.text-lighten-5#limitEditField", [m('h5.mono', "Change user name"), m('div.input-field', {
                                    onchange: ctrl.updateUsername
                                }, [m('i.tiny.material-icons.prefix.mono.glow-font.Pointer', 'edit_mode')], [m('label.mono#label[for="nameEdit"]', "user name")], [m('input.mono.glow-font#nameEdit[name="nameEdit"][minlength="3"][type="text"]', {
                                    onchange: ''
                                })])

              ]),
              m("div.mono.light-blue-text.text-lighten-5#limitEditField", m("h5.mono", "Upload a profile photo"), m('h5.mono', 'Max file size: ' + Meteor.sharedFunctions.humanReadableFileSize(ctrl.maxuploadsize)), m(".uploader", [m(".buffer.text-xs-center", {
                                    id: 'uploaderStep1'
                                }, [
                                    m("h5.mono", "Drag and drop photo to upload"),
                                    m("h5.mono", "- OR -"),
                                    m("h5", {
                                        id: 'failmsg'
                                    }, ""),
                                    m("button.fileUpload.createBtn[data-toggle='tooltip'][title='click here to select a file'][type='button']", "Browse Files", [
                                      m("input.upload[type='file']", {
                                            onchange: ctrl.chooseFile
                                        })
                                     ])
                                   ]),
                                  m(".buffer.step-2.text-xs-center", {
                                    id: 'uploaderStep2',
                                    style: {
                                        "display": " none"
                                    }
                                }, [
                                    m("h5", {
                                        id: 'uploader'
                                    }),
                                    m("button.createBtn[type='button'][id='FileUploadButton']", "Upload Photo")
                                   ])], m('img.responsive-img', {
                                src: ctrl.imgPrev
                            }), m("div", [
                    m("span", [
                        m("div.card-panel.toaster#toaster", "")
                    ])
                ])))
            ]),
            m(".card-action", [
              //m("button.createBtn[type='button']", "Save")

            ])
          ])
        ])

      ])

    ])])
    }
}