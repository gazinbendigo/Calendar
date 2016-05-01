/**
 * Created by holly on 30/04/16.
 */

let isPast = ( date ) => {
	let today = moment().format();
	return moment( today ).isAfter( date );
};

Template.events.onCreated( () => {
	let template = Template.instance();
	template.subscribe( 'events' );
});

Template.events.onRendered( () => {
	$( '#events-calendar' ).fullCalendar({
		//Create rosta view for next 14 days
		views: {
			//javascript does not allow numbers in variables
			timelineSevenDays: {
				type: 'timeline',
				duration: { days: 7 }
			},
			timelineFourteenDays: {
				type: 'timeline',
				duration: { days: 14 }
			}
		},
		events( start, end, timezone, callback ) {
			let data = Events.find().fetch().map( ( event ) => {
				event.editable = !isPast( event.start );
				return event;
			});

			if ( data ) {
				callback( data );
			}
		},
		eventRender( event, element ) {
			element.find( '.fc-content' ).html(`<h4>${event.title}</h4><p class="guest-count">${event.guests} Guests</p><p class="type-${event.type}">#${event.type}</p>`);
		},
		eventDrop( event, delta, revert ) {
			let date = event.start.format();
			console.log(date);
			let end = moment(date).add(14, 'days').format("YYYY-MM-DD");
			console.log(end);
			if (!isPast( date)) {
				let update = {
					_id: event._id,
					start: date,
					end: end
				};

				Meteor.call( 'editEvent', update, ( error ) => {
					if ( error ) {
						Bert.alert( error.reason, 'danger' );
					}
				});
			} else {
				revert();
				Bert.alert( 'Sorry, you can\'t move items to the past!', 'danger' );
			}
		},
		dayClick( date ) {
			Session.set( 'eventModal', { type: 'add', date: date.format() } );
			$( '#add-edit-event-modal' ).modal( 'show' );
		},
		eventClick( event ) {
			Session.set( 'eventModal', { type: 'edit', event: event._id } );
			$( '#add-edit-event-modal' ).modal( 'show' );
		}
	});

	Tracker.autorun( () => {
		Events.find().fetch();
		$( '#events-calendar' ).fullCalendar( 'refetchEvents' );
	});
});

