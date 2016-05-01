/**
 * Created by holly on 1/05/16.
 */


if(Events.find().count() === 1) {
	Events.insert({ title: 'Corp Event', start: '2016-05-05', end: '2016-05-06', editable: true, type: 'Corporate', guests: 50 });
	Events.insert({title: 'Wedding', start: '2016-05-11', end: '2016-05-11', editable: false, type: 'Wedding', guests: 200});
}
