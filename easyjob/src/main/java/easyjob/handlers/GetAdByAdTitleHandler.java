package easyjob.handlers;

import easyjob.repositories.ads.AdRepository;
import org.springframework.stereotype.Component;
import spark.Request;
import spark.Response;
import spark.Route;

import javax.inject.Inject;

@Component
public class GetAdByAdTitleHandler implements Route {

    private final AdRepository adRepository;

    @Inject
    public GetAdByAdTitleHandler(AdRepository adRepository) {
        this.adRepository = adRepository;
    }

    @Override
    public Object handle(Request request, Response response) throws Exception {

        String title = request.params(":title");

        return adRepository.findAdByTitleLike(title);

    }
}
