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
            //TODO - Setup a "Toaster"
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
				  }else{
				    console.log('success!');
				    m.redraw(true);
				    m.route('/')
				  }});
			  }
        console.log(Meteor.user());
      }  
    },
    view: function(ctrl){
        return m('.jumbotron', [
          m('div', [
            m("section.signin", [ 
          		m(".container.text-center", [
          			m("div.row", [
        			    m(".col-md-3.offset-md-3.form-box"),
            			m(".col-md-6.offset-md-3.form-box", [
            				m(".row", [
          						m(".col-md-12", [
          							m("h2", ctrl.signUp == true ? 'Sign up' : 'Sign in')
						          ])
					          ]),
        					m("form.col.s9[action='']", {onsubmit: ctrl.login}, [
        						m(".input-field", [
				      			  m("label[for='username']", [
                                    "Email Address "
                                  ]),
                              m("input.validate.white[name='email'][type='email'][id='username'][required]")
                            ]),
                            m(".input-field", [
                                m("label[for='password']", ["Password "]),
                                m("input.validate.white[name='password'][type='password'][id='password'][minlength='4'][required]")
                            ]),
        		  			ctrl.signUp == true ? [
                          m(".input-field", [
                                        m("label[for='password2']", [
                              "Password Confirm "
                            ]),
                                m("input.validate.white[name='password'][type='password'][id='password2'][minlength='4'][required]")
                      ])
                    ] : '',
      						  m(".col-md-4", [
          						m("button.btn.btn-primary.expand[type='submit']", 
                        ctrl.signUp == true ? "Sign up" : "Sign in"),
      						  ]),
      							m(".col-md-4", [
      						  	m("a.Pointer", {onclick: function(){m.route('/forgot-password')}}, "Forgot Password?")
			      			  ]),  
      							m(".col-md-6", [
      							  m("a.Pointer", {
                        onclick: function(){
                          ctrl.signUp == true ? ctrl.signUp = false : ctrl.signUp = true
                        }
                      }, 
      							  ctrl.signUp == true ? "Already have an account?" : "Don't have an account?")
						        ])
					        ]),
				        ])
			        ])
		        ])
  	      ])
        ])
      ])
    }
}
