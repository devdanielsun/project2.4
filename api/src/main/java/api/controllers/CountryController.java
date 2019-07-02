package api.controllers;

import api.tables.Country;
//import org.hibernate.HibernateException;
import org.hibernate.Session;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

//import javax.persistence.TypedQuery;
import javax.persistence.Persistence;
import javax.persistence.EntityManager;
import javax.persistence.EntityTransaction;
import javax.persistence.EntityManagerFactory;
//import javax.ws.rs.core.Response;
import java.util.List;

@RestController
public class CountryController {

    private static final EntityManagerFactory EMF = Persistence.createEntityManagerFactory("Holidayz");
    private EntityManager manager;

    public CountryController(){
        manager = EMF.createEntityManager();
    }



    // GET
    @GetMapping(value = "/country/{id}", produces = "application/json")
    public Message returnCountry(@PathVariable("id") Integer id) {
        return get(id);
    }

    // GET all countries
    @GetMapping(value = "/countries", produces = "application/json")
    public Message returnAllCountry() {
        return getAll();
    }

    // POST
    @PostMapping(value = "/country", produces = "application/json")
    @ResponseStatus(HttpStatus.CREATED)
    public Message createCountry(@RequestBody Country newCountry){
        return create(newCountry);
    }
    // PUT
    @PutMapping(value = "/country/{id}", produces = "application/json")
    public Message updateCountry(@RequestBody Country updatedCountry){
        return update(updatedCountry);
    }
    // DELETE
    @DeleteMapping(value = "/country/{id}", produces = "application/json")
    public Message deleteCountry(@PathVariable int id){
        return delete(id);
    }

    //    @GetMapping(value = "/country")
    //    public Message welkom() {
    //        return new Message(200,"OK","page loaded", "This is page /country");
    //    }

    private Message create(Country c){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            manager.persist(c);
            transaction.commit();
            return new Message(201, "Created", "New country created", c);
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "Country not created");
        }
    }



    private Message get(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            if(manager.find(Country.class, id) != null){
                Country c = manager.find(Country.class, id);
                transaction.commit();
                return new Message(200, "OK", "Country found", c);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "Country not found");
            }

        } catch (Exception e){
            if(transaction != null){
                transaction.rollback();
            }
            e.printStackTrace();
            return new Message(503, "Server Error", "Country not found");
        }
    }

    private Message update(Country c){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            if(manager.find(Country.class, c.getId()) != null){
                c = manager.merge(c);
                transaction.commit();
                return new Message(200, "OK", "Country updated", c);
            } else {
                transaction.rollback();
                return new Message(404, "Not Found", "No country found with this id");
            }
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "Country not updated");
        }
    }

    private Message delete(int id){
        EntityTransaction transaction = null;
        try {
            transaction = manager.getTransaction();
            transaction.begin();
            Country c = manager.find(Country.class, id);
            manager.remove(c);
            transaction.commit();
            return new Message(200, "OK", "Country deleted");
        } catch (Exception ex){
            if(transaction != null){
                transaction.rollback();
            }
            ex.printStackTrace();
            return new Message(500, "Internal Server Error", "Country not deleted");
        }
    }

    public Message getAll(){
        return new Message(200, "OK", "All countries returned", readAll());
    }

    private List<?> readAll(){
        Session session = manager.unwrap(Session.class);
        return session.createQuery("from Country").list();
    }

}
