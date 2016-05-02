/**
 * Created by holly on 1/05/16.
 */

/**
 * Add an Event
 */
Meteor.methods({
	addEvent( event ) {
		check( event, {
			title: String,
			start: String,
			end: String,
			type: String,
			duration: Number,
			guests: Number
		});

		try {
			return Events.insert( event );
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	}
});

/**
 * Update an existing Event
 */
Meteor.methods({
	editEvent( event ) {
		check( event, {
			_id: String,
			title: Match.Optional( String ),
			start: String,
			end: String,
			type: Match.Optional( String ),
			duration: Number,
			guests: Match.Optional( Number )
		});

		try {
			return Events.update( event._id, {
				$set: event
			});
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	}
});

/**
 * Delete an Event
 */
Meteor.methods({
	removeEvent(eventId) {
		check(eventId, String );

		try {
			return Events.remove(eventId);
		} catch ( exception ) {
			throw new Meteor.Error( '500', `${ exception }` );
		}
	}
});