package api.controllers;

import api.config;
import api.tables.Location;
//import org.hibernate.HibernateException;
import api.tables.User;
import com.sun.prism.shader.Solid_TextureYV12_AlphaTest_Loader;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.annotations.Table;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.persistence.TypedQuery;
import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
//import javax.ws.rs.core.Response;
import java.util.List;

import static api.controllers.TokenController.validToken;

@RestController
public class LocationController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Holidayz");
    private EntityManager manager;
    UserController uc = new UserController();

    public LocationController(){
        manager = EMF.createEntityManager();

    }

    // GET location id;
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/user/{id}/map", produces = "application/json")
    public ResponseEntity<TokenResponse> returnLocation(@PathVariable("id") Integer id, @RequestHeader String token) {
        TokenResponse tr = validToken(token);
        User c = uc.get(tr.getUserId());
        if(tr.isTokenValid()) {
            if (c.isAdmin() || c.getId() == id) {
                List<Location> locations = get(id);
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
    public Message createLocation(@RequestBody Location newLocation){
        return create(newLocation);
    }

    // GET all locations of user;
    @CrossOrigin(origins = "*")
    @GetMapping(value = "/locations/{id}", produces = "application/json")
    public Message returnUserLocation(@PathVariable("id") Integer user_id) {
        return getUserLocations(user_id);
    }

    private Message create(Location l){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            manager.clear();
            transaction.begin();
            manager.persist(l);
            transaction.commit();
            return new Message(201, "Created", "New location created", l);
        } catch (RuntimeException re) {
            transaction.rollback();
            throw re;
        } catch (Exception ex){
            if(transaction != null || transaction.isActive()){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "Location not created");
        }
        finally {

        }
    }



    private List<Location> get(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            String sql = "\n SELECT * FROM maps WHERE user_id = "+id+"\n";
            if(manager.createNativeQuery(sql, Location.class) != null){
                List<Location> t = manager.createNativeQuery(sql, Location.class).getResultList();
                transaction.commit();
                return t;
            } else {
                transaction.rollback();
                return null;
            }


        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return null;
        }
    }

    private Message update(Location l){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            if(manager.find(Location.class, l.getId()) != null){
                l = manager.merge(l);
                transaction.commit();
                return new Message(200, "OK", "Location updated", l);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "No location found with this id");
            }
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "Location not updated");
        }
    }

    private Message delete(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            Location l = manager.find(Location.class, id);
            manager.remove(l);
            transaction.commit();
            return new Message(200, "OK", "Location deleted");
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "Location not deleted");
        }
    }


    private Message getUserLocations(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            String sql = "\n SELECT * FROM locations WHERE user_id = "+id+"\n";
            if(manager.createNativeQuery(sql, Location.class) != null){
                List<Location> t = manager.createNativeQuery(sql, Location.class).getResultList();
                transaction.commit();
                return new Message(200, "OK", "Location found", t);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "Location not found");
            }


        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return new Message(503, "Server Error", "Score not found");
        }
    }

    public Message getAll(){
        return new Message(200, "OK", "All locations returned", readAll());
    }

    private List<?> readAll(){
        Session session = manager.unwrap(Session.class);
        return session.createQuery("from Location").list();
    }

}
