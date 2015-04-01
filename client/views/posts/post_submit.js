Template.postSubmit.events({
	'submit form': function(e) {
		e.preventDefault();

		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val()
		}

		Meteor.call('postInsert', post, function (error, result) {
			if (error) {
				return alert(error.reason);
			};

			Router.go(POST_PAGE, {_id: result._id});
		});
	}
});