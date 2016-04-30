/**
 * Created by holly on 30/04/16.
 */

OnCallPeriod = new Mongo.Collection('onCallPeriod');


/**
 * Apply security and block all Client side database calls
 */
OnCallPeriod.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

/**
 * Apply security and block all Client side database calls as per above
 */
OnCallPeriod.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});


let OnCallSchema = new SimpleSchema({
	'title': {
		type: String,
		label: 'The title of this on call period.'
	},
	'start': {
		type: String,
		label: 'When this oncall period will start.'
	},
	'end': {
		type: String,
		label: 'When this oncall period will end.'
	},
	'type': {
		type: String,
		label: 'What type of event is this?',
		allowedValues: [ 'Birthday', 'Corporate', 'Wedding', 'Miscellaneous' ]
	},
	'guests': {
		type: Number,
		label: 'The number of guests expected at this event.'
	}
});

OnCallPeriod.attachSchema(OnCallSchema);