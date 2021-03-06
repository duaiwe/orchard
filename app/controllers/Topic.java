package controllers;

import be.objectify.deadbolt.java.actions.SubjectPresent;
import com.google.inject.Inject;
import io.rampant.orchard.mongo.dao.ThreadDAO;
import io.rampant.orchard.mongo.dao.UserDAO;
import io.rampant.orchard.play.Controller;
import play.mvc.Result;

/**
 * @author jonathan
 */
public class Topic extends Controller {
	ThreadDAO threads;
	UserDAO users;

	@Inject
	public Topic(ThreadDAO threadDAO, UserDAO userDAO) {
		threads = threadDAO;
		users = userDAO;
	}

	@SubjectPresent
	public Result create() {
		addComponent("createTopic");
		return ok(views.html.thread.create.render(users.current(), getPageData()));
	}

	public Result get(String slug) {
		addComponent("viewTopic");
		models.Topic t = threads.findBySlug(slug);
		if( null == t ) {
			return notFound("Unknown thread.");
		}
		addData("topic", t);
		return ok(views.html.thread.view.render(users.current(), t, getPageData()));
	}
}
