package api.controllers;

import api.config;
import api.tables.User;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;

import static api.controllers.TokenController.validToken;
import static api.controllers.TokenController.createNewToken;

@RestController
public class LoginController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Holidayz");
    private EntityManager manager;
    UserController uc = new UserController();

    public LoginController(){
        manager = EMF.createEntityManager();
    }

    // POST
    @CrossOrigin(origins = "*")
    @PostMapping(value = "/login", produces = "application/json")
    public ResponseEntity<TokenResponse> createToken(@RequestBody newUserToken u) {
        String token = createNewToken(u.getEmail(), u.getPassword());
        User c = uc.get(uc.getId(u.getEmail()));
        if(c.getPassword().equals(u.getPassword())){
            System.out.println(c.getName() + " " + c.getLastname() + " is ingelogd");
            return ResponseEntity.ok()
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(c.getId(), true, token, c.isAdmin()));
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .headers(config.getInstance().getHeaders())
                    .body(new TokenResponse(false, "email or password is wrong"));
        }

    }

    @CrossOrigin(origins = "*")
    @PostMapping(value = "/validate", produces = "application/json")
    public Message validateToken(@RequestHeader String token) {
        if(validToken(token).isTokenValid()){
            return new Message(200, "OK", "Token valid");
        } else {
            return new Message(403, "No Access", "Token invalid");
        }
    }
}
