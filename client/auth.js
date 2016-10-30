auth = {
  controller: function(){
    var ctrl = this;
    ctrl.signUp = false;
    ctrl.login = function(e){
			e.preventDefault();
			if (ctrl.signUp == true){
  			if (e.target[1].value != e.target[2].value) return;	
  			let auth = {
  			  email: e.target[0].value,
  			  password: e.target[1].value
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
			}else{
				Meteor.loginWithPassword(e.target[0].value, e.target[1].value, function(err) {
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
    },
    view: function(ctrl){
        return m('.container', [
          m('div', [
            m("section.signin", [ 
          		m(".container.text-center", [
          			m("div.row", [
            			m(".col.s8.form-box", [
            				m(".row", [
          						m(".col", [
          							m("h3.mono", ctrl.signUp == true ? 'Create Account' : 'Sign in')
						          ])
					          ]),
        					m("form.col.s12[action='']", {onsubmit: ctrl.login}, [
        						m(".input-field", [
				      			  m("label.mono[for='username']", [
                                    "Email Address "
                                  ]),
                              m("input.validate.white[name='email'][type='email'][id='username'][required]")
                            ]),
                            m(".input-field", [
                                m("label.mono[for='password']", ["Password "]),
                                m("input.validate.white[name='password'][type='password'][id='password'][minlength='4'][required]")
                            ]),
        		  			ctrl.signUp == true ? [
                          m(".input-field", [
                                        m("label.mono[for='password2']", [
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
      						  	m("a.Pointer.mono", {onclick: function(){m.route('/forgot-password')}}, "Forgot Password?")
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
        ])
      ])
    }
}
