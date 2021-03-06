/**
 * Created by holly on 30/04/16.
 */

Events = new Mongo.Collection( 'events' );

Events.allow({
	insert: () => false,
	update: () => false,
	remove: () => false
});

Events.deny({
	insert: () => true,
	update: () => true,
	remove: () => true
});

let EventsSchema = new SimpleSchema({
	'title': {
		type: String,
		label: 'The title of this event.'
	},
	'duration': {
		type: Number,
		label: 'The number of days this oncall period is for.',
		allowedValues: [1, 7, 14]
	},
	'start': {
		type: String,
		label: 'When this event will start.'
	},
	'end': {
		type: String,
		label: 'When this event will end.'
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

Events.attachSchema( EventsSchema );