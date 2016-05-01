/**
 * Created by holly on 30/04/16.
 */

Meteor.publish('events', function(){
	return Events.find({});
});