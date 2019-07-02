package api;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;

import java.util.ArrayList;
import java.util.List;

public class config {

    private static config instance = null;

    public static config getInstance() {
        if (instance == null) {
            instance = new config();
        }
        return  instance;
    }

    final static HttpHeaders rh = new HttpHeaders();

    public config(){
        List<String> headers = new ArrayList<>();
        headers.add("Origin");
        headers.add("Content-Type");
        headers.add("Authorization");

        //rh.set("Access-Control-Allow-Origin", "*");
        rh.setAccessControlAllowOrigin("*");

        //rh.set("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
        //rh.setAccessControlRequestMethod(HttpMethod.GET);
        //rh.setAccessControlRequestMethod(HttpMethod.POST);
        rh.add("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        //rh.add("Access-Control-Allow-Origin", "*");
        //rh.setAccessControlRequestMethod(HttpMethod.OPTIONS);
        //rh.setAccessControlRequestMethod(HttpMethod.PUT);
        //rh.setAccessControlRequestMethod(HttpMethod.PATCH);
        //rh.setAccessControlRequestMethod(HttpMethod.DELETE);

        //rh.set("Access-Control-Allow-Credentials", "true");
        rh.setAccessControlAllowCredentials(true);

        //rh.set("Access-Control-Allow-Headers", "*");
        rh.setAccessControlAllowHeaders(headers);
    }

    public HttpHeaders getHeaders() {
        return rh;
    }
}
