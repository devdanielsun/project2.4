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

        rh.setAccessControlAllowOrigin("*");
        rh.add("Access-Control-Allow-Methods", "GET, POST, PUT, PATCH, DELETE");
        rh.setAccessControlAllowCredentials(true);
        rh.setAccessControlAllowHeaders(headers);
    }

    public HttpHeaders getHeaders() {
        return rh;
    }
}
