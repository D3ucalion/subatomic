auth = {
  controller: function(){
    var ctrl = this;
    ctrl.signUp = false;
    ctrl.login = function(e){
			e.preventDefault();
			if (ctrl.signUp == true){
            if(document.getElementById('password2') == null) return;
  			if (document.getElementById('password').value 
                != document.getElementById('password2').value) {
                let toaster = document.getElementById("toaster");
                toaster.style.color = '#c8b40a';
                toaster.textContent = "Password Mismatch";
                  Meteor.sharedFunctions.fade("in", 350, toaster, true);
                setTimeout (function(){
                      Meteor.sharedFunctions.fade("out", 350, toaster, true)
                  }, 4000)
                return;
            };	
  			let auth = {
              username: document.getElementById('username').value,
  			  email: document.getElementById('email').value,
  			  password: document.getElementById('password').value
  			};
			  Accounts.createUser(auth, function(err) {
  			  if (err){
                  ctrl.toast(err);
                  console.log(err);
  			  }else{
  			      console.log('success!');
				  m.redraw(true);
				  m.route('/')
			    }

        });
			}else if (ctrl.signUp == false){
				Meteor.loginWithPassword(document.getElementById('email').value, document.getElementById('password').value, function(err) {
				  if (err){
				    console.log(err);
                      ctrl.toast(err);
				  }else{
				    console.log('success!');
				    m.redraw(true);
				    m.route('/')
				  }});
			  }
        console.log(Meteor.user());
      }
      ctrl.toast = function (err) {
          let toaster = document.getElementById("toaster");
          Meteor.sharedFunctions.fade("in", 350, toaster, true);

          toaster.textContent = err.reason;
          if(err.error > 500){
              toaster.style.color = '#c22929';
          }else if (err.error < 500 && err.error > 400){
              toaster.style.color = '#c8b40a';
          }else{
              toaster.style.color = '#2d81bc';
          }
          console.log(err);
          setTimeout (function(){
              Meteor.sharedFunctions.fade("out", 350, toaster, true)
          }, 5000)
      }
      ctrl.resetPwd = function (e){
          console.log(document.getElementById('email').value)
          let auth = {
  			  email: document.getElementById('email').value
  			};
          Accounts.forgotPassword(auth, function(err) {
				  if (err){
				    console.log(err);
                      ctrl.toast(err);
				  }else{
				    console.log('success!');
				    m.redraw(true);
				    //m.route('/')
				  }})
      }
    },
    view: function(ctrl){
        return m('.container.center', [
            m("div.signin.center", [ 
          			m("div.row", [
            			m(".col.s12.form-box", [
            				m(".row", [
          						m(".col.s12.center", [
          							m("h3.mono", ctrl.signUp == true ? 'Create Account' : 'Sign in')
						          ])
					          ]),
        					m("form.col.s12.center[action='']", {onsubmit: ctrl.login}, [
                                ctrl.signUp == true ? m(".input-field", [
                                    m("label.mono#label[for='username']", [
                                        "Username "
                                    ]),
                                    m("input.validate.white[name='username'][type='text'][id='username'][required][minlength='4']")
                                ]) : '',
        						m(".input-field", [
				      			  m("label.mono#label[for='email']", [
                                    "Email Address "
                                  ]),
                              m("input.validate.white[name='email'][type='email'][id='email'][required]")
                            ]),
                            m(".input-field", [
                                m("label.mono#label[for='password']", ["Password "]),
                                m("input.validate.white[name='password'][type='password'][id='password'][minlength='4'][required]")
                            ]),
        		  			ctrl.signUp == true ? [
                          m(".input-field", [
                                        m("label.mono#label[for='password2']", [
                              "Password Confirm "
                            ]),
                                m("input.validate.white[name='password'][type='password'][id='password2'][minlength='4'][required]")
                      ])
                    ] : '',
      						  m(".col.s4.center", [
          						m("button.createBtn[type='submit']",
                        ctrl.signUp == true ? "sign up" : "sign in"),
      						  ]),
      							m(".col.s4.center", [
      						  	m("a.Pointer.mono", {onclick: ctrl.resetPwd}, "Forgot Password?")
			      			  ]),  
      							m(".col.s4.center", [
      							  m("button.createBtn", {
                        onclick: function(){
                          ctrl.signUp == true ? ctrl.signUp = false : ctrl.signUp = true
                        }
                      }, 
      							  ctrl.signUp == true ? "sign in" : "sign up")
						        ])
					        ]),
				        ]),
                        [
                            m(".row", [
                                m(".col.s3.m4", [
                                    m("div.card-panel.toaster#toaster", "Err")
                                ])
                            ])
                        ]
			        ])
  	      ])
      ])
    }
}
