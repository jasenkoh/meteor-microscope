Template.postEdit.events({
	'submit form': function (e) {
		e.preventDefault();

		var postId = this._id;

		var postProperties = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val()
		}

		Posts.update(postId, {$set: postProperties}, function(error) {
			if (error) {
				alert(error.reason);
			} else {
				Router.go(POST_PAGE, {_id: postId});
			};
		});
	},

	'click .delete': function(e) {
		e.preventDefault();

		var postId = this._id;

		if (confirm('Delete this post?')) {
			Posts.remove(postId, function(error) {
				if (error) {
					alert(error.reason);
				} else {
					Router.go(POST_LIST);
				};
			});
		};
	}
});