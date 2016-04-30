/**
 * Created by holly on 30/04/16.
 */

let isPast = ( date ) => {
	let today = moment().format();
	return moment( today ).isAfter( date );
};

Template.calendar.onCreated( () => {
	let template = Template.instance();
	template.subscribe('onCallPeriod');
});

Template.calendar.onRendered( () => {
	$( '#oncall-calendar' ).fullCalendar({
		onCallPeriod(start, end, timezone, callback){
			let data = OnCallPeriod.find().fetch().map((onCallPeriod) => {
				onCallPeriod.editable = !isPast(onCallPeriod.start);
				return onCallPeriod;
			});
			if(data){
				callback(data);
			}
		},
		eventRender(onCallPeriod, element) {
			element.find('.fc-content').html(
				'<h4>${onCallPeriod.title}</h4>' +
				'<p class="guest-count">${onCallPeriod.guests}Guests</p>' +
				'<p class="type-${onCallPeriod.type}">#${onCallPeriod.type}</p>'
			);
		},
		dayClick( date ) {
			Session.set( 'onCallModal', { type: 'add', date: date.format() } );
			$( '#add-edit-onCall-modal' ).modal( 'show' );
		},
		eventClick( event ) {
			Session.set( 'onCallModal', { type: 'edit', onCallPeriod: onCallPeriod._id } );
			$( '#add-edit-onCall-modal' ).modal( 'show' );
		}
	});
	Tracker.autorun( () => {
		OnCallPeriod.find().fetch();
		$( '#oncall-calendar' ).fullCalendar('refetchEvents');
	});
});

