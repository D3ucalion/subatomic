base64 = {
  controller: function(){
    var ctrl = this;
       /**Bound to the clear log button to clear the upload log, most likely used in a case where an upload may fail   **/                
    ctrl.clearLog = function(){
        var completed = $('#uploader').children();
            $(completed).remove();
    }
    ctrl.maxuploadsize = 260100;
    ctrl.canDrop = true;
    ctrl.imgPrev = '';
      
   
    
    /*  THe event listeners here are bound to the .uploader element above to listen for drop events */
       ctrl.dragdrop=(element, options)=> {

                    options = options || {}
                    let dropZone = document.getElementById('global-dropzone1');
                    element.addEventListener("dragover", activate);
                    //element.addEventListener("dragleave", dragLeave);
                    dropZone.onclick = function(){dropZone.className = ""}
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
                    function dragLeave(e){
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

                   /* Called on file drop to process dropped files */    
    ctrl.onchange = (e)=>{
                    if (ctrl.canDrop == false) return;
                    for (let i = 0; i<1; i++){
                    this.well = document.getElementById('uploader');
                    this.wellorig = document.getElementById('uploaderStep1');
                    this.wellorig.style.display = 'none';
                    this.wellParent = document.getElementById('uploaderStep2');
                    this.wellParent.style.display = 'block';
                    this.file = document.createElement('li');

                    let name = e[i].name;
                    let type = e[i].type;
                    
                    if(type != 'image/png' && type != 'image/jpeg' ){
                        
                	let resultForm = document.getElementById('failmsg');
	                let node = document.createElement("li"); 
	                let textnode = document.createTextNode('This is not a supported file format. Please try again.');  
	                this.wellParent.style.display = 'none';
	                this.wellorig.style.display = 'block';
	                node.appendChild(textnode);
	                
	                resultForm.appendChild(node);
                    }else if(e[i].size > ctrl.maxuploadsize){
                        let resultForm = document.getElementById('failmsg');
	                    let node = document.createElement("li"); 
	                    let textnode = document.createTextNode('This file is too large. Please try again.'); 
	                    this.wellParent.style.display = 'none';
	                    this.wellorig.style.display = 'block';
	                    node.appendChild(textnode);
	                
	                resultForm.appendChild(node);
                    }
                    else{
                    /*** setup array buffer to pass into the pdf preview function ***/     
                    let reader = new FileReader();    
                    reader.onload = function(){
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
	                let textnode = document.createTextNode('Selected File: ' +name +'  '+'Size: '+ size+' ');  
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
	                
	                $(progressNode).parent().append($('<i class="Pointer material-icons" id="' + idx + '">settings_backup_restore</i>').on('click', function(){ $(node).remove(); ctrl.canDrop = true;
	                    document.getElementById('uploaderStep2').style.display = 'none';
	                    document.getElementById('uploaderStep1').style.display = 'block';
                        ctrl.imgPrev = '';
                        m.redraw(true);
	                }));
                        
                    }}
    
};
/* Called when files are added via the file chooser button to process added files */    
    ctrl.chooseFile = (e)=>{
        
                    let files = e.target.files[0];
                    console.log(files);
                    if(files == null || undefined) return; 
                    
                    this.well = document.getElementById('uploader');
                    this.wellorig = document.getElementById('uploaderStep1');
                    this.wellorig.style.display = 'none';
                    this.wellParent = document.getElementById('uploaderStep2');
                    this.wellParent.style.display = 'block';
                    this.file = document.createElement('li');

                    let name = files.name;
                    let type = files.type;
                    if(type != 'image/png' && type != 'image/jpeg'){
                        
                	let resultForm = document.getElementById('failmsg');
	                let node = document.createElement("li"); 
	                let textnode = document.createTextNode('This is not a supported file format. Please try again.');
	                this.wellParent.style.display = 'none';
	                this.wellorig.style.display = 'block';
	                node.appendChild(textnode);
	                
	                resultForm.appendChild(node);
                    }else if(files > ctrl.maxuploadsize){
                        let resultForm = document.getElementById('failmsg');
	                    let node = document.createElement("li"); 
	                    let textnode = document.createTextNode('This file is too large. Please try again.'); 
	                    this.wellParent.style.display = 'none';
	                    this.wellorig.style.display = 'block';
	                    node.appendChild(textnode);
	                
	                resultForm.appendChild(node);
                    }
                    else{
                /*** setup array buffer to pass into the pdf preview function ***/        
                    let reader = new FileReader();    
                    reader.onload = function(){
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
	                
	                let textnode = document.createTextNode('Selected File: ' +name +'  '+'Size: '+ size+' ');  
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
	                $(progressNode).parent().append($('<i class="Pointer material-icons" id="' + idx + '">settings_backup_restore</i>').on('click', function(){$(node).remove();
	                    document.getElementById('uploaderStep2').style.display = 'none';
	                    document.getElementById('uploaderStep1').style.display = 'block';
                        ctrl.imgPrev = '';
                        m.redraw(true);
	                }));
                    }
    }
  },
  view: function(ctrl){
    return m('section.upload.section.center', [m(".row", [
        m(".col.s12",{
            		config: function(element, isInitialized) {
            			if (!isInitialized) {
            				ctrl.canDrop == true ? ctrl.dragdrop(element, {onchange: ctrl.onchange}) : '';
            			}}},[m("[id='global-dropzone1']", 
            			[m("h2", "Drop files to upload")])], [
          m(".card.hoverable.grey.darken-4", [
            
            m(".card-content", [
              m("h3.mono.light-blue-text.text-lighten-5", ["Base64 converter"

              ]),
              m('hr'),
              m("div.mono.light-blue-text.text-lighten-5#limitEditField",m("h5.mono", ""), m('h5.mono', 'Max file size: '+Meteor.sharedFunctions.humanReadableFileSize(ctrl.maxuploadsize) ), m(".uploader", [m(".buffer.text-xs-center",{id: 'uploaderStep1'}, [
                                    m("h5.mono", "Drag and drop photo here to convert"),
                                    m("h5.mono", "- OR -"),
                                    m("h5", {id: 'failmsg'}, ""),
                                    m("button.fileUpload.createBtn[data-toggle='tooltip'][title='click here to select a file'][type='button']", "Browse Files", [
                                      m("input.upload[type='file']", {onchange: ctrl.chooseFile})
                                     ])
                                   ]),
                                  m(".buffer.step-2.text-xs-center", {id: 'uploaderStep2', style: {"display": " none"}}, [
                                    m("h5", {id: 'uploader'})
                                   ])], m('img.responsive-img', {src: ctrl.imgPrev}), m("div", [
                    m("span", [
                        m("pre", [m('code.lang-css#base64target', ctrl.imgPrev)])
                    ], "For use in <img> elements:"),
                  m("span", [
                        m("pre", [m('code.lang-css#base64target', "url('"+ctrl.imgPrev+"')")])
                    ], "For use as CSS background:")
                ])) )
            ]),
            m(".card-action", [
              //m("button.createBtn[type='button']", "Save")
                         
            ])
          ])
        ])
        
      ])

    ])
  }
}