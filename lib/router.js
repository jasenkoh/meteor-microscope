POST_SUBMIT = 'postSubmit';
POST_PAGE = 'postPage';
POST_LIST = 'postsList';
POST_EDIT = 'postEdit';
ACCESS_DENIED = 'accessDenied';
LAYOUT = 'layout';
LOADING = 'loading';

Router.configure({
	layoutTemplate: LAYOUT,
	loadingTemplate: LOADING,
	waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: POST_LIST});

Router.route('/posts/:_id', {
  name: POST_PAGE,
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id/edit', {
	name: POST_EDIT,
  	data: function() { return Posts.findOne(this.params._id); }
})

Router.route('/submit', { name: POST_SUBMIT });

var requireLogin = function() {
	if (! Meteor.user()) {
		this.render(ACCESS_DENIED)
	} else {
		this.next();
	};
};

Router.onBeforeAction(requireLogin, {only: POST_SUBMIT});