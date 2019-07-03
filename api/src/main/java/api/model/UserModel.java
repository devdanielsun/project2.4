package api.model;

import api.config;
import api.controllers.TokenResponse;
import api.controllers.UserController;
import api.tables.Friend;
import api.tables.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.HashMap;
import java.util.List;

import static api.controllers.TokenController.createNewToken;
import static api.controllers.TokenController.validToken;

@RestController
public class UserModel {

    UserController uc = new UserController();

    public UserModel(){
    }

    // GET
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/user/{id}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TokenResponse> returnUser(@PathVariable("id") Integer id, @RequestHeader String token){
        if(token != null) {
            TokenResponse tr = validToken(token);
            try {
                User u = uc.get(id);
                User c = uc.get(tr.getUserId());

                if (tr.isTokenValid()) {
                    if (u.getId() == id || c.isAdmin()) {
                        return ResponseEntity.ok()
                                .headers(config.getInstance().getHeaders())
                                .body(new TokenResponse(c.getId(), true, c.isAdmin(), u));
                    } else {
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                .headers(config.getInstance().getHeaders())
                                .body(new TokenResponse(false, "Oeps, something went wrong"));
                    }
                } else {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN)
                            .headers(config.getInstance().getHeaders())
                            .body(new TokenResponse(false, "No permission"));
                }
            } catch (NullPointerException ne) {
                ne.printStackTrace();
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .headers(config.getInstance().getHeaders())
                        .body(new TokenResponse(false, "User not found"));
            } catch (Exception e){
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                        .headers(config.getInstance().getHeaders())
                        .body(new TokenResponse(false, "User not found"));
            }
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(false, "No token"));
        }
    }

    // POST
    @CrossOrigin(origins = "*")
    @PostMapping(value = "/registration", produces = "application/json", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TokenResponse> createUser(@RequestBody User newUser){
        int huh = uc.getId(newUser.getEmail());
        if(huh == 0){
            User m = uc.create(newUser);
            String token = createNewToken(m.getEmail(), m.getPassword());
            TokenResponse tk = new TokenResponse(m.getId(),validToken(token).isTokenValid(), token, m.isAdmin());
            String uri = "user/"+m.getId();
            System.out.println(m.getName() + " " + m.getLastname() + "heeft zich geregistreerd");
            return ResponseEntity.created(URI.create(uri))
                    .headers(config.getInstance().getHeaders())
                    .body(tk);
        } else {
            return ResponseEntity.status(HttpStatus.IM_USED)
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(false, "Emailadres already used"));
        }

    }

    // GET
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/user/{id}/friends", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TokenResponse> returnFriends(@PathVariable("id") Integer id, @RequestHeader String token){
        TokenResponse tr = validToken(token);
        if(tr.isTokenValid()){
            User u = uc.get(id);
            User c = uc.get(tr.getUserId());
            List<User> following = uc.getFollowing(u.getId());
            List<User> followers = uc.getFollowers(u.getId());
            HashMap<String, List<User>> vrienden = new HashMap<>();
            vrienden.put("following", followers);
            vrienden.put("followers", following);
            return ResponseEntity.ok()
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(c.getId(), true, c.isAdmin(), vrienden));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(false, "No permission"));
        }
    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/user/{uid}/friends/{fid}", produces = "application/json")
    @ResponseStatus(HttpStatus.OK)
    public ResponseEntity<TokenResponse> makeFriend(@PathVariable("uid") Integer uid, @PathVariable("fid") Integer fid, @RequestHeader String token){
        TokenResponse tr = validToken(token);
        if(tr.isTokenValid()){
            User u = uc.get(uid);
            if(u.getId() == tr.getUserId()){
                User f = uc.get(fid);
                if (u.getId() != f.getId()) {
                    if (!uc.checkIfFollowing(u.getId(), f.getId())) {
                        Friend newFriend = new Friend(u.getId(), f.getId());
                        uc.createFriend(newFriend);
                        System.out.println(u.getEmail() + " volgt nu " + f.getEmail());
                        return ResponseEntity.ok()
                                .headers(config.getInstance().getHeaders())
                                .body(new TokenResponse(u.getId(), true, u.isAdmin(), newFriend));
                    } else {
                        return ResponseEntity.status(HttpStatus.ALREADY_REPORTED)
                                .headers(config.getInstance().getHeaders())
                                .body(new TokenResponse(u.getId(), true, u.isAdmin(), "Already following"));
                    }
                } else {
                    System.out.println("Lonely?");
                    return ResponseEntity.status(HttpStatus.NOT_ACCEPTABLE)
                            .headers(config.getInstance().getHeaders())
                            .body(new TokenResponse(u.getId(), true, u.isAdmin(), "A bit lonely, ain't ya?"));
                }
            } else {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .headers(config.getInstance().getHeaders())
                        .body(new TokenResponse(u.getId(), false, u.isAdmin()));
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(false, "Not allowed"));
        }
    }

}
