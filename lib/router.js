/**
 * Created by holly on 30/04/16.
 */

//BlazeLayout.setRoot('body');

FlowRouter.route('/', {
	name: 'index',
	action: function() {
		BlazeLayout.render("baseLayout", {header: "header", main: "calendar", footer: "footer"});
	}
})