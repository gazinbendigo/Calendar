/**
 * Created by holly on 1/05/16.
 */



if(Events.find().count() === 0) {
	Events.insert({ title: 'Corp Event', start: '2016-05-01', end: '2016-05-15', editable: true, duration: 14, type: 'Corporate', guests: 50 });
	Events.insert({title: 'Wedding', start: '2016-05-15', end: '2016-05-29', editable: true,  duration: 14, type: 'Wedding', guests: 200});
}
