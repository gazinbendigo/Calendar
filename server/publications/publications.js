/**
 * Created by holly on 30/04/16.
 */

Meteor.publish('onCallPeriod', function(){
	return OnCallPeriod.find({});
});