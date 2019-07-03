package api.model;

import api.config;
import api.controllers.TokenResponse;
import api.controllers.LocationController;
import api.controllers.UserController;
import api.tables.Location;
import api.tables.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static api.controllers.TokenController.validToken;

@RestController
public class LocationModel {

    UserController uc = new UserController();
    LocationController lc = new LocationController();

    public LocationModel(){

    }

    // GET location id;
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/user/{id}/map", produces = "application/json")
    public ResponseEntity<TokenResponse> returnLocation(@PathVariable("id") Integer id, @RequestHeader String token) {
        TokenResponse tr = validToken(token);
        User c = uc.get(tr.getUserId());
        if(tr.isTokenValid()) {
            if (c.isAdmin() || c.getId() == id) {
                List<Location> locations = lc.get(id);
                return ResponseEntity.ok()
                        .headers(config.getInstance().getHeaders())
                        .body(new TokenResponse(c.getId(), true, c.isAdmin(), locations));
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .headers(config.getInstance().getHeaders())
                        .body(new TokenResponse(false, "No permission"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(false, "token invalid"));
        }
    }

    // POST create new location;
    @CrossOrigin(origins = "*")
    @PostMapping(value = "/user/{id}/map", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<TokenResponse> createLocation(@RequestBody Location newLocation, @RequestHeader String token){
        TokenResponse tr = validToken(token);
        User c = uc.get(tr.getUserId());
        if(tr.isTokenValid()) {
            Location l = lc.create(newLocation);
            if(l != null) {
                return ResponseEntity.ok()
                        .headers(config.getInstance().getHeaders())
                        .body(new TokenResponse(c.getId(), true, c.isAdmin(), l));
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .headers(config.getInstance().getHeaders())
                        .body(new TokenResponse(false, "Something went wrong"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(false, "token invalid"));
        }
    }


}
