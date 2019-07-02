package api;

import api.User;
import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

//import javax.persistence.TypedQuery;
import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
import javax.ws.rs.core.Response;
import java.util.List;

@RestController
public class UserController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Memory");
    private EntityManager manager;

    public UserController(){
        manager = EMF.createEntityManager();
    }

    @GetMapping(value = "/user")
    public String welkom() {
        return "dit is de pagina /user";
    }

    @GetMapping(value = "user/{id}", produces = "application/json")
    public Message returnUser(@PathVariable("id") Integer id) {
        return get(id);

    }

    @PostMapping(value = "/user", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Message createUser(@RequestBody User newUser){
        return create(newUser);
    }

    @PostMapping(value = "/login", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Message login(){
            return new Message(200, "OK","User returned");
    }

    @PutMapping(value = "/user/{id}", produces = "application/json")
    public Message updateUser(@RequestBody User updatedUser){
        return update(updatedUser);
    }

//    @DeleteMapping(value = "user/{id}", produces = "application/json")
//    public Message deleteUser(@PathVariable int id){
//        return delete(id);
//    }

//    @GetMapping(value = "myscores")
//    public Message returnScores(@RequestBody int id){
//        return new Message(200, "OK", "scores opgehaald", 3);
//    }


    private Message create(User u){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            manager.persist(u);
            transaction.commit();
            return new Message(201, "Created", "New user created", u);
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "User not created");
        }
    }



    private Message get(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            if(manager.find(User.class, id) != null){
                User u = manager.find(User.class, id);
                transaction.commit();
                return new Message(200, "OK", "User found", u);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "User not found");
            }


        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return new Message(503, "Server Error", "User not found");
        }
    }

    private Message update(User u){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            if(manager.find(User.class, u.getId()) != null){
                u = manager.merge(u);
                transaction.commit();
                return new Message(200, "OK", "User updated", u);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "No user found with this id");
            }
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "User not updated");
        }
    }

    private Message delete(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            User u = manager.find(User.class, id);
            manager.remove(u);
            transaction.commit();
            return new Message(200, "OK", "User deleted");
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "User not deleted");
        }
    }

    private List<?> readAll(){
        Session session = manager.unwrap(Session.class);
        return session.createQuery("from User").list();
    }

    private void printUsers(List<User> users, String comment){
        System.out.println(comment);
        if(!users.isEmpty()) {
            for (User u : users){
                System.out.println(u);
            }
        } else {
            System.out.println("Empty");
        }
    }

}
